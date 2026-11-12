// ===== auto-marquee — pas, który płynie sam w pętli i daje się przewijać ręcznie =====
// Reużywalny: autoMarquee(viewport, track, { speed }) — track zawiera zestaw elementów
// i jego kopię ([data-clone]); pozycja zawija się co długość jednego zestawu.
//
// Ruch automatyczny = Web Animations API (transform na kompozytorze/GPU), więc pas jedzie
// płynnie nawet gdy główny wątek jest zajęty (telefony). JS pracuje tylko przy ręcznym ruchu.
// Ręcznie: przeciąganie (mysz/palec), poziomy gest gładzika, klawiatura (fokus na karcie).
// Pauza: fokus, przeciąganie, karta odwrócona, chwilę po ręcznym ruchu, poza ekranem.
// Hover = zwolnienie. Reduced motion = połowa prędkości.
export function autoMarquee(viewport, track, { speed = 60, hoverSpeed = 0.35, resumeDelay = 1200 } = {}) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const firstClone = track.querySelector("[data-clone]");
  if (!firstClone || !track.animate) return;

  let period = 0, anim = null, dur = 1;
  let hover = false, focus = false, drag = null, visible = false, flipped = false;
  let resumeTimer = 0, inertiaRaf = 0, rampRaf = 0, rate = 0;
  const baseRate = reduce ? 0.5 : 1;

  // --- pozycja ↔ czas animacji
  const getX = () => (anim ? ((Number(anim.currentTime) || 0) % dur) / dur * period : 0);
  const setX = (x) => {
    if (!anim || period <= 0) return;
    const w = ((x % period) + period) % period;
    anim.currentTime = (w / period) * dur;
  };

  function build() {
    const x = getX();
    period = firstClone.offsetLeft - track.firstElementChild.offsetLeft;
    if (period <= 0) return;
    dur = (period / speed) * 1000;
    anim?.cancel();
    anim = track.animate(
      [{ transform: "translate3d(0,0,0)" }, { transform: `translate3d(${-period}px,0,0)` }],
      { duration: dur, iterations: Infinity, easing: "linear" }
    );
    anim.pause();
    setX(x);
    sync(true);
  }

  // --- prędkość: łagodny start/zwolnienie (kilka klatek updatePlaybackRate, potem znów sam GPU)
  const target = () => (focus || drag || flipped || !visible ? 0 : baseRate * (hover ? hoverSpeed : 1));
  function rampTo(to) {
    cancelAnimationFrame(rampRaf);
    const from = rate, t0 = performance.now(), ms = to === 0 ? 250 : 700;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      rate = from + (to - from) * (1 - Math.pow(1 - k, 3));
      // prędkość ~0 → pauza (play() przy rate 0 rzuca wyjątek)
      if (rate < 0.01) { anim.pause(); if (to === 0) { rate = 0; return; } }
      else { anim.updatePlaybackRate(rate); if (anim.playState !== "running") anim.play(); }
      if (k < 1) rampRaf = requestAnimationFrame(step);
    };
    rampRaf = requestAnimationFrame(step);
  }
  function sync(immediate) {
    if (!anim || resumeTimer || inertiaRaf) return;
    const to = target();
    if (immediate) {
      cancelAnimationFrame(rampRaf);
      rate = to;
      if (to === 0) anim.pause();
      else { anim.updatePlaybackRate(to); anim.play(); }
      return;
    }
    if (Math.abs(to - rate) > 0.001) rampTo(to);
  }

  // ręczny ruch: zatrzymaj auto, po chwili bezczynności wznów
  function manual() {
    cancelAnimationFrame(rampRaf);
    anim?.pause();
    rate = 0;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { resumeTimer = 0; sync(); }, resumeDelay);
  }

  // --- przeciąganie (Pointer Events: mysz + dotyk; touch-action: pan-y zostawia pionowy scroll stronie)
  let moved = false, vel = 0;
  viewport.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(inertiaRaf); inertiaRaf = 0;
    drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, lt: e.timeStamp, x0: getX(), active: false };
    moved = false; vel = 0;
  });
  viewport.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.active) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // to był scroll pionowy
      drag.active = moved = true;
      drag.x0 = getX();
      drag.sx = e.clientX;
      try { viewport.setPointerCapture(e.pointerId); } catch {}
      viewport.classList.add("is-dragging");
      manual();
    }
    const dt = Math.max(1, e.timeStamp - drag.lt);
    vel = vel * 0.6 + (-(e.clientX - drag.lx) / dt) * 1000 * 0.4;
    drag.lx = e.clientX; drag.lt = e.timeStamp;
    setX(drag.x0 - (e.clientX - drag.sx));
    manual();
  });
  const end = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const wasActive = drag.active;
    drag = null;
    viewport.classList.remove("is-dragging");
    if (!wasActive) { sync(); return; }
    // bezwładność po puszczeniu
    let last = performance.now();
    const coast = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      setX(getX() + vel * dt);
      vel *= Math.pow(0.04, dt);
      if (Math.abs(vel) > 8) inertiaRaf = requestAnimationFrame(coast);
      else { inertiaRaf = 0; manual(); }
    };
    inertiaRaf = requestAnimationFrame(coast);
  };
  viewport.addEventListener("pointerup", end);
  viewport.addEventListener("pointercancel", end);
  // po przeciągnięciu klik nie obraca karty
  viewport.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  viewport.addEventListener("dragstart", (e) => e.preventDefault());

  // --- poziomy gest gładzika / shift+kółko; pionowe kółko zostaje dla strony
  viewport.addEventListener("wheel", (e) => {
    const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation(); // nie oddajemy zdarzenia Lenisowi
    cancelAnimationFrame(inertiaRaf); inertiaRaf = 0;
    setX(getX() + dx);
    manual();
  }, { passive: false });

  // --- hover / fokus / odwrócona karta
  viewport.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && fine.matches) { hover = true; sync(); } });
  viewport.addEventListener("pointerleave", () => { hover = false; sync(); });
  viewport.addEventListener("focusin", (e) => {
    focus = true; sync(true);
    const card = e.target.closest("li");
    if (!card) return;
    // fokus z klawiatury: dosuń kartę do widoku
    const x = getX(), vw = viewport.clientWidth, left = card.offsetLeft - x;
    if (left < 0) setX(x + left - 16);
    else if (left + card.offsetWidth > vw) setX(x + left + card.offsetWidth - vw + 16);
  });
  viewport.addEventListener("focusout", (e) => { if (!viewport.contains(e.relatedTarget)) { focus = false; manual(); } });
  // obrócona karta płynnie wjeżdża na środek pasa
  function centerFlipped() {
    const card = track.querySelector(".is-flipped");
    if (!card || drag) return;
    const from = getX();
    let to = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
    // najkrótsza droga w pętli
    let d = to - from;
    d -= Math.round(d / period) * period;
    if (Math.abs(d) < 4) return;
    cancelAnimationFrame(inertiaRaf);
    const t0 = performance.now(), ms = 520;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      setX(from + d * (1 - Math.pow(1 - k, 3)));
      if (k < 1) inertiaRaf = requestAnimationFrame(step);
      else inertiaRaf = 0;
    };
    inertiaRaf = requestAnimationFrame(step);
  }
  new MutationObserver(() => {
    const f = !!track.querySelector(".is-flipped");
    if (f !== flipped) { flipped = f; f ? (sync(true), centerFlipped()) : manual(); }
  }).observe(track, { subtree: true, attributes: true, attributeFilter: ["class"] });

  // --- tylko gdy widać
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(!visible); }, { rootMargin: "100px" }).observe(viewport);
  document.addEventListener("visibilitychange", () => { if (document.hidden) anim?.pause(); else sync(true); });
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 150); });
  window.addEventListener("load", build);
  build();
}

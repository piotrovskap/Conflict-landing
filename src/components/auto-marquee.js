// ===== auto-marquee — pas, który płynie sam w pętli i daje się przewijać ręcznie =====
// Reużywalny: autoMarquee(viewport, track, { speed }) — track zawiera zestaw elementów
// i jego kopię ([data-clone]); pozycja zawija się co długość jednego zestawu.
// Ręcznie: przeciąganie (mysz/palec), poziomy gest gładzika, klawiatura (fokus na karcie).
// Pauza: fokus, przeciąganie, karta odwrócona, chwilę po ręcznym ruchu, poza ekranem. Hover = zwolnienie.
export function autoMarquee(viewport, track, { speed = 60, hoverSpeed = 0.35, resumeDelay = 1200 } = {}) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const firstClone = track.querySelector("[data-clone]");
  if (!firstClone) return;

  let period = 0, x = 0, vel = 0, cur = 0; // cur = aktualna prędkość auto (łagodny start/stop)
  let hover = false, focus = false, drag = null, visible = false, lastManual = -1e9, last = 0, raf = 0;

  const measure = () => { period = firstClone.offsetLeft - track.firstElementChild.offsetLeft; };
  const wrap = () => { if (period > 0) x = ((x % period) + period) % period; };
  const render = () => { track.style.transform = `translate3d(${(-x).toFixed(2)}px,0,0)`; };
  const manual = () => { lastManual = performance.now(); };
  // stop tylko przy interakcji; hover = zwolnienie (pas nie staje, gdy kursor po prostu na nim leży)
  const paused = () =>
    focus || drag || track.querySelector(".is-flipped") ||
    performance.now() - lastManual < resumeDelay;
  const autoSpeed = () => (paused() ? 0 : speed * (hover ? hoverSpeed : 1) * (reduce ? 0.5 : 1));

  function tick(t) {
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    const target = autoSpeed();
    cur += (target - cur) * Math.min(1, dt * 3);
    if (!drag) {
      x += vel * dt;                     // bezwładność po puszczeniu
      vel *= Math.pow(0.04, dt);         // wygaszanie
      if (Math.abs(vel) < 4) vel = 0;
    }
    x += cur * dt;
    wrap();
    render();
    raf = visible ? requestAnimationFrame(tick) : 0;
  }
  const start = () => { if (!raf && visible) { last = 0; raf = requestAnimationFrame(tick); } };

  // --- przeciąganie (Pointer Events: mysz + dotyk; touch-action: pan-y zostawia pionowy scroll stronie)
  let moved = false;
  viewport.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, lt: e.timeStamp, x0: x, active: false };
    moved = false;
    vel = 0;
  });
  viewport.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.active) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // to był scroll pionowy
      drag.active = moved = true;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("is-dragging");
    }
    const dt = Math.max(1, e.timeStamp - drag.lt);
    vel = vel * 0.6 + (-(e.clientX - drag.lx) / dt) * 1000 * 0.4;
    drag.lx = e.clientX; drag.lt = e.timeStamp;
    x = drag.x0 - dx;
    wrap();
    render();
    manual();
  });
  const end = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.active) vel = 0;
    drag = null;
    viewport.classList.remove("is-dragging");
    manual();
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
    x += dx; vel = 0;
    wrap(); render(); manual();
  }, { passive: false });

  // --- hover / fokus
  viewport.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && fine.matches) hover = true; });
  viewport.addEventListener("pointerleave", () => { hover = false; });
  viewport.addEventListener("focusin", (e) => {
    focus = true;
    const card = e.target.closest("li");
    if (!card) return;
    // fokus z klawiatury: dosuń kartę do widoku
    const vw = viewport.clientWidth, left = card.offsetLeft - x;
    if (left < 0) x += left - 16;
    else if (left + card.offsetWidth > vw) x += left + card.offsetWidth - vw + 16;
    wrap(); render();
  });
  viewport.addEventListener("focusout", (e) => { if (!viewport.contains(e.relatedTarget)) { focus = false; manual(); } });

  // --- tylko gdy widać
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : 0; }, { rootMargin: "100px" }).observe(viewport);
  document.addEventListener("visibilitychange", () => { visible = !document.hidden && visible; start(); });
  window.addEventListener("resize", () => { measure(); wrap(); render(); });
  window.addEventListener("load", measure);

  measure();
  render();
}

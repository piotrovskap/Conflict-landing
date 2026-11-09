// ===== PODSTRONA (single page) — mikrointerakcje komponentów sp- =====
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// ---------- Tor „Zero → Production." — pikselowy kursor skacze krokami ----------
const track = document.querySelector(".sp-track");
if (track) {
  if (reduce) {
    track.style.setProperty("--t", "1");
  } else {
    const STEPS = 16;       // pikselowy, „schodkowy" ruch
    const RUN = 2600;       // przejazd 0 → 1 (ms)
    const HOLD = 1600;      // postój na „Production."
    let start = performance.now() + 600;
    const tick = (now) => {
      const e = now - start;
      if (e > RUN + HOLD) start = now;
      const raw = clamp(e / RUN);
      const t = Math.round(raw * STEPS) / STEPS;
      track.style.setProperty("--t", t.toFixed(3));
      track.classList.toggle("is-done", raw >= 1);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

// ---------- Terminale CRT — „wpisywanie" linii po wejściu w kadr ----------
document.querySelectorAll(".sp-term").forEach((term) => {
  const lines = [...term.querySelectorAll(".sp-term__line")];
  lines.forEach((l) => {
    const t = l.textContent.trim();
    if (t.startsWith("✓") || t.startsWith("{")) l.dataset.kind = "ok";
    else if (t.startsWith("↳")) l.dataset.kind = "flow";
  });
  if (reduce || !("IntersectionObserver" in window)) return;

  term.classList.add("is-typing");
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    lines.forEach((l, i) => setTimeout(() => l.classList.add("is-on"), 350 + i * 420));
  }, { threshold: 0.4 });
  io.observe(term);
});

// ---------- Hasło słowo po słowie (reużywalne: [data-words-reveal]) ----------
// Tekst dzieli się sam na <span class="sp-word"> — w HTML zostaje zwykłe zdanie.
document.querySelectorAll("[data-words-reveal]").forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute("aria-label", el.textContent.trim());
  el.innerHTML = words.map((w) => `<span class="sp-word" aria-hidden="true">${w}</span>`).join(" ");
  const spans = [...el.querySelectorAll(".sp-word")];
  if (reduce) { spans.forEach((s) => s.classList.add("is-lit")); return; }

  let ticking = false;
  const update = () => {
    ticking = false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const start = vh * 0.85, end = vh * 0.3; // jak manifest na głównej
    const p = clamp((start - r.top) / (start - end));
    const lit = Math.round(p * spans.length);
    spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
});

// ---------- Pasy tekstu przesuwane scrollem (reużywalne: [data-scroll-marquee="1|-1"]) ----------
const marquees = [...document.querySelectorAll("[data-scroll-marquee]")];
if (marquees.length && !reduce) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 1;
    marquees.forEach((m) => {
      const r = m.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = clamp((vh - r.top) / (vh + r.height));      // 0 → wchodzi od dołu, 1 → wychodzi górą
      const span = m.scrollWidth - m.parentElement.clientWidth;
      const dir = Number(m.dataset.scrollMarquee) || -1;
      const x = dir < 0 ? -p * span * 0.5 : -(1 - p) * span * 0.5; // przeciwne kierunki
      m.style.setProperty("--mx", `${x.toFixed(1)}px`);
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

// ---------- Trzy warstwy — diagram 3D rozsuwany scrollem (reużywalne: [data-layers]) ----------
document.querySelectorAll("[data-layers]").forEach((sec) => {
  const planes = [...sec.querySelectorAll(".sp-plane")];
  const items = [...sec.querySelectorAll(".sp-layers__item")];
  const N = items.length || 3;
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = sec.getBoundingClientRect();
    const range = sec.offsetHeight - window.innerHeight;
    // pin (desktop): postęp po wysokości sekcji; bez pinu (mobile): wejście w ekran
    const p = range > 50 ? clamp(-r.top / range) : clamp((window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.7));
    sec.style.setProperty("--lp", (reduce ? 1 : p).toFixed(3));
    const active = Math.min(N - 1, Math.floor(p * N * 0.999));
    const set = (el) => el.classList.toggle("is-active", Number(el.dataset.layer) === active);
    items.forEach(set);
    planes.forEach(set);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
});

// ---------- Postęp przewijania elementu → --p 0…1 (reużywalne: [data-scroll-progress]) ----------
const progressEls = [...document.querySelectorAll("[data-scroll-progress]")];
if (progressEls.length) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 1;
    progressEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      // 0 gdy element wchodzi od dołu (90% ekranu), 1 gdy jego góra dojdzie do 25% ekranu
      const p = reduce ? 1 : clamp((vh * 0.9 - r.top) / (vh * 0.65));
      el.style.setProperty("--p", p.toFixed(3));
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

// ---------- Spis usług — scroll-spy + pasek postępu każdej usługi ----------
const index = document.getElementById("sp-index");
if (index) {
  const links = [...index.querySelectorAll(".sp-index__item")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  let active = -1;
  let ticking = false;

  function update() {
    ticking = false;
    const line = window.innerHeight * 0.4; // „linia odczytu" — 40% wysokości ekranu
    let current = -1;
    sections.forEach((sec, i) => {
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const prog = clamp((line - r.top) / r.height);
      links[i].style.setProperty("--prog", prog.toFixed(3));
      if (r.top <= line && r.bottom > line) current = i;
    });
    if (current !== active) {
      active = current;
      links.forEach((a, i) => {
        a.classList.toggle("is-active", i === active);
        if (i === active) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      // telefon: poziomy pasek przewija się do aktywnej usługi
      const a = links[active];
      if (a && index.scrollWidth > index.clientWidth) {
        index.scrollTo({ left: a.offsetLeft - (index.clientWidth - a.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      }
    }
  }

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

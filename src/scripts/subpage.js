// ===== PODSTRONA (single page) — mikrointerakcje komponentów sp- =====
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
// dźwięk przez sound.js (jedno miejsce z mute/unlock)
const cue = (name, volume = 0.2) => window.dispatchEvent(new CustomEvent("cue:play", { detail: { name, volume } }));

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
    lines.forEach((l, i) => setTimeout(() => { l.classList.add("is-on"); cue(l.dataset.kind === "ok" ? "success" : "type", l.dataset.kind === "ok" ? 0.12 : 0.16); }, 350 + i * 420));
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
    if (active !== sec._active) { if (sec._active !== undefined) cue("select", 0.18); sec._active = active; }
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
      if (current >= 0) cue("tick", 0.12);
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

// ---------- Zakładki (reużywalne: [data-tabs] > .sp-tabs__list > button[role=tab] + [role=tabpanel]) ----------
// Strzałki ←/→ przełączają, podkreślenie jedzie pod aktywną zakładką (--tx, --tw).
document.querySelectorAll("[data-tabs]").forEach((root) => {
  const list = root.querySelector(".sp-tabs__list");
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
  const select = (i, focus = false) => {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (panels[k]) panels[k].hidden = !on;
    });
    const t = tabs[i];
    // telefon: wybrana zakładka zawsze w widoku paska
    if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: t.offsetLeft - (list.clientWidth - t.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    list.style.setProperty("--tx", `${t.offsetLeft}px`);
    list.style.setProperty("--tw", `${t.offsetWidth}px`);
    if (focus) t.focus();
    if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: t.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
    cue("select", 0.22);
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
  const first = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
  // pierwsze ustawienie bez dźwięku
  tabs.forEach((t, k) => { t.setAttribute("aria-selected", String(k === first)); t.tabIndex = k === first ? 0 : -1; if (panels[k]) panels[k].hidden = k !== first; });
  const place = () => { const t = tabs[tabs.findIndex((x) => x.getAttribute("aria-selected") === "true")]; list.style.setProperty("--tx", `${t.offsetLeft}px`); list.style.setProperty("--tw", `${t.offsetWidth}px`); };
  requestAnimationFrame(place);
  window.addEventListener("resize", place);
  window.addEventListener("load", place);
});

// ---------- Kroki przypięte i sterowane scrollem (reużywalne: [data-steps] > [data-step] + [data-step-panel]) ----------
// Desktop: sekcja przypięta, przewijanie przełącza krok i jego panel; --sp = postęp 0…1.
// Wąski ekran / reduced-motion: CSS pokazuje wszystkie panele jeden pod drugim.
document.querySelectorAll("[data-steps]").forEach((sec) => {
  const steps = [...sec.querySelectorAll("[data-step]")];
  const panels = [...sec.querySelectorAll("[data-step-panel]")];
  const N = steps.length;
  let active = -1, ticking = false;
  const set = (i) => {
    if (i === active) return;
    if (active >= 0) cue("tick", 0.14);
    active = i;
    steps.forEach((s, k) => { s.classList.toggle("is-active", k === i); s.classList.toggle("is-done", k < i); });
    panels.forEach((p, k) => p.classList.toggle("is-active", k === i));
  };
  const update = () => {
    ticking = false;
    const range = sec.offsetHeight - window.innerHeight;
    const p = range > 50 ? clamp(-sec.getBoundingClientRect().top / range) : 1;
    sec.style.setProperty("--sp", p.toFixed(3));
    set(range > 50 ? Math.min(N - 1, Math.floor(p * N * 0.999)) : 0);
  };
  // klik w krok → przewiń do jego fragmentu
  steps.forEach((s, k) => s.addEventListener("click", () => {
    const range = sec.offsetHeight - window.innerHeight;
    if (range <= 50) return;
    const y = sec.getBoundingClientRect().top + scrollY + range * ((k + 0.5) / N);
    window.__lenis ? window.__lenis.scrollTo(y) : scrollTo({ top: y, behavior: "smooth" });
  }));
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
});

// ---------- Stała pigułka „pilna pomoc" (reużywalne: [data-urgent-pill] + data-target="#sekcja") ----------
// Widoczna po zjechaniu z hero; chowa się, gdy sekcja docelowa lub stopka są na ekranie.
document.querySelectorAll("[data-urgent-pill]").forEach((pill) => {
  const target = document.querySelector(pill.dataset.target);
  const hero = document.querySelector(".sp-hero");
  const footer = document.querySelector(".footer");
  let pastHero = false, targetIn = false, footerIn = false;
  const sync = () => pill.classList.toggle("is-on", pastHero && !targetIn && !footerIn);
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.target === hero) pastHero = !e.isIntersecting;
      if (e.target === target) targetIn = e.isIntersecting;
      if (e.target === footer) footerIn = e.isIntersecting;
    });
    sync();
  }, { threshold: 0 });
  [hero, target, footer].forEach((el) => el && io.observe(el));
});


// ---------- Wskazówka „jest więcej →" na poziomo przewijanych paskach (zakładki, spis usług) ----------
document.querySelectorAll(".sp-tabs__list, #sp-index").forEach((bar) => {
  const upd = () => bar.classList.toggle("is-more", bar.scrollWidth - bar.clientWidth - bar.scrollLeft > 4);
  bar.addEventListener("scroll", upd, { passive: true });
  window.addEventListener("resize", upd);
  if (window.ResizeObserver) new ResizeObserver(upd).observe(bar);
  upd();
});

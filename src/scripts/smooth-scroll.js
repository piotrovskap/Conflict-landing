// ===== Smooth scroll z inercją (Lenis) — kółko „rzuca" scrollem, strona dojeżdża z wyhamowaniem =====
import Lenis from "/node_modules/lenis/dist/lenis.mjs";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// odstęp kotwicy = scroll-margin-top elementu (np. pod przyklejonym nav)
const margin = (el) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
// pozycja w dokumencie bez transformacji (reveal przesuwa elementy translateY — rect by kłamał)
const docTop = (el) => { let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };
const hashTarget = () => { try { return location.hash.length > 1 ? document.querySelector(decodeURIComponent(location.hash)) : null; } catch { return null; } };

if (!reduce) {
  const lenis = new Lenis({
    lerp: 0.09,          // niżej = gładziej/wolniej dogania (inercja)
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // płynne przewijanie do kotwic (dock, nav, CTA)
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(docTop(el) - margin(el), { duration: 1.2 });
  });

  window.__lenis = lenis;
}

// wejście z innej strony na adres z #kotwicą: przeglądarka skacze, zanim układ się ustabilizuje
// (fonty, obrazy, reveal) — po load dociągamy jeszcze raz, z uwzględnieniem scroll-margin-top
// (Chrome potrafi wykonać własny skok do #kotwicy już po load — dlatego krótkie opóźnienie)
const settleHash = () => {
  const el = hashTarget();
  if (!el) return;
  const y = docTop(el) - margin(el);
  if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
  else scrollTo(0, y);
};
if (hashTarget()) {
  // CSS scroll-behavior: smooth animowałby natywny skok i nadpisywał korekty — na czas wejścia wyłączamy
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";
  addEventListener("load", () => setTimeout(() => { html.style.scrollBehavior = ""; }, 1300));
  // kilka korekt, aż układ się ustabilizuje; pierwsza interakcja użytkownika przerywa
  let user = false;
  const stop = () => { user = true; };
  ["wheel", "touchstart", "keydown", "pointerdown"].forEach((t) => addEventListener(t, stop, { once: true, passive: true }));
  addEventListener("load", () => [150, 600, 1200].forEach((ms) => setTimeout(() => { if (!user) settleHash(); }, ms)));
}

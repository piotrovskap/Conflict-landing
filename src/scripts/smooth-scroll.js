// ===== Smooth scroll z inercją (Lenis) — kółko „rzuca" scrollem, strona dojeżdża z wyhamowaniem =====
import Lenis from "/node_modules/lenis/dist/lenis.mjs";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  });

  window.__lenis = lenis;
}

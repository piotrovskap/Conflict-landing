// ===== Tytuły SVG: viewBox = bbox tekstu → skalują się do 100% szerokości =====
// + zrównanie wysokości obu tytułów, żeby linia pod nimi była na tej samej wysokości.
const svgs = [...document.querySelectorAll(".hero__title-svg")];

function fit(svg) {
  const text = svg.querySelector(".hero__title-text");
  if (!text) return;
  svg.setAttribute("preserveAspectRatio", "xMinYMax meet"); // tekst przy dolnej krawędzi
  let b = null;
  try { b = text.getBBox(); } catch (e) {}
  if (b && b.width > 0 && b.height > 0) {
    svg.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
    svg.dataset.fitted = "1";
  } else if (!svg.dataset.fitted) {
    // fallback: oszacuj proporcje z długości tekstu (Unica One ≈ 0.52em/znak)
    const len = (text.textContent || "").trim().length || 1;
    svg.setAttribute("viewBox", `0 0 ${Math.round(len * 52)} 104`);
  }
}

function equalize() {
  if (svgs.length < 2) return;
  svgs.forEach((s) => (s.style.minHeight = ""));        // reset → naturalna wysokość
  const max = Math.max(...svgs.map((s) => s.getBoundingClientRect().height));
  if (max > 0) svgs.forEach((s) => (s.style.minHeight = `${Math.ceil(max)}px`));
}

function run() { svgs.forEach(fit); equalize(); }

run();
requestAnimationFrame(run);
window.addEventListener("load", run);
window.addEventListener("resize", run);
if (document.fonts?.ready) document.fonts.ready.then(run);
window.addEventListener("scroll", () => requestAnimationFrame(run), { passive: true, once: true });

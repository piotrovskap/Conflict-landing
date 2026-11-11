// ===== Strona 404 — prawdziwa ścieżka w terminalu + oczy podążają za kursorem / przechyleniem =====
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const path = document.getElementById("nf-path");
if (path) path.textContent = decodeURIComponent(location.pathname + location.search) || "/";

const scope = document.getElementById("nf-scope");
if (scope && !reduce) {
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const loop = () => {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    scope.style.setProperty("--ex", x.toFixed(3));
    scope.style.setProperty("--ey", y.toFixed(3));
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(loop) : 0;
  };
  const aim = (nx, ny) => { tx = Math.max(-1, Math.min(1, nx)); ty = Math.max(-1, Math.min(1, ny)); if (!raf) raf = requestAnimationFrame(loop); };
  window.addEventListener("pointermove", (e) => aim((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1), { passive: true });
  window.addEventListener("deviceorientation", (e) => { if (e.gamma != null) aim(e.gamma / 30, (e.beta - 45) / 30); });
}

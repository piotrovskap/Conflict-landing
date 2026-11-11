// ===== Reużywalny komponent: wideo ładowane dopiero przy zbliżeniu do ekranu =====
// <video data-lazy-video muted loop playsinline preload="none"><source data-src="…" type="…"></video>
// Źródło podpinane ~1 ekran przed wejściem w viewport; poza ekranem pauza (oszczędza CPU/baterię).
const vids = document.querySelectorAll("video[data-lazy-video]");
const load = (v) => {
  if (v.dataset.loaded) return;
  v.querySelectorAll("source[data-src]").forEach((s) => { s.src = s.dataset.src; s.removeAttribute("data-src"); });
  v.dataset.loaded = "1";
  v.load();
};
if (!("IntersectionObserver" in window)) vids.forEach((v) => { load(v); v.play?.().catch(() => {}); });
else {
  const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(e.target); near.unobserve(e.target); } }), { rootMargin: "100% 0px" });
  const vis = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { load(v); v.play?.().catch(() => {}); } else v.pause?.();
  }), { threshold: 0.01 });
  vids.forEach((v) => { near.observe(v); vis.observe(v); });
}

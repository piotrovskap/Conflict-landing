// ===== visibleLoop — pętla requestAnimationFrame, która działa tylko gdy element jest na ekranie =====
// Reużywalny: visibleLoop(el, (t) => { …klatka… }, { margin }) — poza ekranem i w tle karty
// pętla w ogóle się nie kręci (zero pracy CPU), po powrocie rusza od nowa.
export function visibleLoop(el, frame, { margin = "150px" } = {}) {
  let raf = 0, onScreen = true;
  const tick = (t) => { raf = requestAnimationFrame(tick); frame(t); };
  const sync = () => {
    const run = onScreen && !document.hidden;
    if (run && !raf) raf = requestAnimationFrame(tick);
    else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  if ("IntersectionObserver" in window) {
    onScreen = false;
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }, { rootMargin: margin }).observe(el);
  }
  document.addEventListener("visibilitychange", sync);
  sync();
}

// ===== Case studies: pinowany poziomy scroll (scroll w pionie → karty jadą w bok) =====
const scrollEl = document.getElementById("cases-scroll");
const track = document.getElementById("cases-track");
const desktop = window.matchMedia("(min-width: 861px)");
let ticking = false;

function update() {
  ticking = false;
  if (!scrollEl || !track) return;
  if (!desktop.matches) { track.style.transform = ""; return; }
  const total = scrollEl.offsetHeight - window.innerHeight;
  const scrolled = Math.min(Math.max(-scrollEl.getBoundingClientRect().top, 0), total);
  const p = total > 0 ? scrolled / total : 0;
  const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
  track.style.transform = `translateX(${-p * maxX}px)`;
}

function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => requestAnimationFrame(update));
window.addEventListener("load", update);
desktop.addEventListener?.("change", update);
update();

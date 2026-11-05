// ===== HERO: pin + poziomy scroll-jack (slajd 1 → slajd 2) =====
// Scroll w pionie przesuwa track w poziomie o 100vw; po slajdzie 2 strona scrolluje dalej.
const scrollEl = document.getElementById("hero-scroll");
const track = document.getElementById("hero-track");
const hint = document.getElementById("hero-hint");
const desktop = window.matchMedia("(min-width: 861px)");

let ticking = false;

function update() {
  ticking = false;
  if (!scrollEl || !track || !desktop.matches) return;
  const total = scrollEl.offsetHeight - window.innerHeight; // zakres „przypięcia"
  const scrolled = Math.min(Math.max(-scrollEl.getBoundingClientRect().top, 0), total);
  const p = total > 0 ? scrolled / total : 0; // 0 → slajd 1, 1 → slajd 2
  const n = track.querySelectorAll(".hero-slide").length || 1;
  const shift = n > 1 ? ((n - 1) / n) * 100 : 0; // % tracku do ostatniego slajdu
  track.style.transform = `translateX(${-p * shift}%)`;
  if (hint) hint.style.opacity = `${Math.max(0, 1 - p * 2.2)}`;
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

function reset() {
  // na mobile layout jest pionowy (CSS) — zdejmij transformy
  if (!desktop.matches && track) track.style.transform = "";
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => { reset(); update(); });
desktop.addEventListener?.("change", () => { reset(); update(); });
update();

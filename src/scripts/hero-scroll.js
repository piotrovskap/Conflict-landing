// ===== HERO: pin + poziomy scroll-jack (slajd 1 → slajd 2) =====
// Scroll w pionie przesuwa track w poziomie o 100vw; po slajdzie 2 strona scrolluje dalej.
const scrollEl = document.getElementById("hero-scroll");
const track = document.getElementById("hero-track");
const hint = document.getElementById("hero-hint");
const desktop = window.matchMedia("(min-width: 861px)");

let ticking = false;
let snapTimer;
let isSnapping = false;
let snapTarget = null;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
  if (!isSnapping) scheduleSnap();
}

function scheduleSnap() {
  clearTimeout(snapTimer);
  if (!scrollEl || !desktop.matches) return;
  snapTimer = setTimeout(snapToSlide, 180);
}

function snapToSlide() {
  if (isSnapping || !desktop.matches) return;
  const start = scrollEl.getBoundingClientRect().top + window.scrollY;
  const range = scrollEl.offsetHeight - window.innerHeight;
  const progress = window.scrollY - start;
  // Poza przejściem hero strona przewija się normalnie.
  if (range <= 0 || progress <= 2 || progress >= range - 2) return;

  scrollToSlide(start + (progress < range / 2 ? 0 : range));
}

function scrollToSlide(target) {
  if (snapTarget === target) return;
  isSnapping = true;
  snapTarget = target;
  if (window.__lenis && !reducedMotion.matches) {
    window.__lenis.scrollTo(target, {
      lerp: 0,
      duration: 1.35,
      easing: (t) => (1 - Math.cos(Math.PI * t)) / 2,
      onComplete: () => {
        if (snapTarget === target) {
          isSnapping = false;
          snapTarget = null;
        }
      },
    });
  } else {
    window.scrollTo({ top: target, behavior: reducedMotion.matches ? "instant" : "smooth" });
    if (reducedMotion.matches) {
      isSnapping = false;
      snapTarget = null;
    }
  }
}

function interruptSnap() {
  clearTimeout(snapTimer);
  isSnapping = false;
  snapTarget = null;
}

// Już pierwszy ruch kółkiem wybiera slajd; nie pokazujemy pośredniego zatrzymania.
window.addEventListener("wheel", (e) => {
  if (!scrollEl || !desktop.matches || e.ctrlKey || !e.deltaY) return;
  const start = scrollEl.getBoundingClientRect().top + window.scrollY;
  const range = scrollEl.offsetHeight - window.innerHeight;
  const progress = window.scrollY - start;
  const goingForward = e.deltaY > 0;
  const target = goingForward ? start + range : start;
  const shouldSnap = range > 0 && (goingForward
    ? (progress >= -window.innerHeight / 2 && progress < range - 2) || snapTarget === start
    : (progress > 2 && progress <= range + 2) || snapTarget === start + range);
  if (!shouldSnap) return;

  e.preventDefault();
  e.stopImmediatePropagation(); // Lenis nie powinien równolegle przesuwać strony o deltaY.
  clearTimeout(snapTimer);
  scrollToSlide(target);
}, { capture: true, passive: false });
window.addEventListener("touchstart", interruptSnap, { passive: true });
window.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) interruptSnap();
});
window.addEventListener("scrollend", () => {
  isSnapping = false;
  snapTarget = null;
}, { passive: true });

function reset() {
  // na mobile layout jest pionowy (CSS) — zdejmij transformy
  if (!desktop.matches) {
    interruptSnap();
    if (track) track.style.transform = "";
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => { reset(); update(); });
desktop.addEventListener?.("change", () => { reset(); update(); });
update();

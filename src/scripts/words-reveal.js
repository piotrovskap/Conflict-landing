// ===== Reveal słowo-po-słowie przy scrollu (manifest LAB) =====
const stmt = document.getElementById("lab-statement");

if (stmt) {
  const words = [...stmt.querySelectorAll(".lab__word")];
  let ticking = false;

  function update() {
    ticking = false;
    const rect = stmt.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // 0 gdy napis wchodzi od dołu, 1 gdy przewinie się do górnej strefy
    const start = vh * 0.85;
    const end = vh * 0.3;
    const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

// ===== PLACES → TEAM: reveal miast + wyłaniający się czerwony gradient =====
const places = document.getElementById("places-statement");
const placesSection = document.querySelector(".places");
const teamWord = document.querySelector(".place__word--team");

if (places && placesSection) {
  const words = [...places.querySelectorAll(".place__word")];
  let ticking = false;

  function update() {
    ticking = false;
    const rect = places.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const start = vh * 0.9;
    const end = vh * 0.22;
    const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
    placesSection.style.setProperty("--p", p.toFixed(3));
    // słowo „team" zapala się na końcu, razem z pełnym gradientem
    if (teamWord) teamWord.classList.toggle("is-lit", p > 0.78);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

// ===== Poziomy pas kart zespołu przesuwany scrollem =====
const marquee = document.getElementById("team-marquee");
const track = document.getElementById("team-cards");

if (marquee && track) {
  let ticking = false;

  function update() {
    ticking = false;
    const maxShift = track.scrollWidth - marquee.clientWidth;
    if (maxShift <= 0) {
      track.style.transform = "none";
      return;
    }
    const rect = marquee.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = vh + rect.height;
    const p = Math.max(0, Math.min(1, (vh - rect.top) / total));
    track.style.transform = `translate3d(${(-p * maxShift).toFixed(1)}px, 0, 0)`;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

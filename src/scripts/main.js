// ===== Reveal on scroll (reużywalny) =====
const revealEls = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// bezpiecznik: elementy widoczne przy starcie pokaż od razu (nie znikają)
requestAnimationFrame(() => {
  revealEls.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0 && !el.classList.contains("is-visible")) {
      el.classList.add("is-visible");
      io.unobserve(el);
    }
  });
});

// ===== Parallax myszy (reużywalny: [data-parallax="siła"]) =====
const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
let mouseX = 0,
  mouseY = 0,
  rafId = null;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  if (!rafId) rafId = requestAnimationFrame(applyParallax);
});

function applyParallax() {
  parallaxEls.forEach((el) => {
    const s = parseFloat(el.dataset.parallax) * 100;
    el.style.transform = `translate(${mouseX * s}px, ${mouseY * s}px)`;
  });
  rafId = null;
}

// ===== Postać w hero: myszka STERUJE obrotem (scrubbing klatek wideo) =====
// obie postacie (slajd 1 i slajd 2); tylko na precyzyjnym kursorze — na dotyku grają w pętli
const heroVids = [...document.querySelectorAll("#hero-follow video")];
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (heroVids.length && finePointer) {
  const DIR = 1; // zmień na -1, jeśli strony są odwrócone
  const states = heroVids.map((v) => {
    const s = { v, dur: 0, cur: 0 };
    v.removeAttribute("loop");
    v.pause();
    const grab = () => { s.dur = v.duration || s.dur; v.pause(); };
    // serwer bez obsługi Range (np. python http.server) → wideo nie jest „seekable" i każde
    // przewinięcie wraca na 0. Wtedy pobieramy plik raz w całości i gramy z pamięci (blob).
    const ensureSeekable = () => {
      if (s.blob || (v.seekable.length && v.seekable.end(0) > 0)) return;
      s.blob = true;
      const src = v.currentSrc;
      fetch(src).then((r) => r.blob()).then((b) => {
        v.src = URL.createObjectURL(b);
        v.pause();
      }).catch(() => {});
    };
    v.addEventListener("loadedmetadata", () => setTimeout(ensureSeekable, 300));
    if (v.readyState >= 1) setTimeout(ensureSeekable, 300); // metadane mogły przyjść przed tym skryptem
    v.addEventListener("loadedmetadata", grab);
    v.addEventListener("loadeddata", grab);
    v.addEventListener("canplay", grab);
    return s;
  });

  function scrubLoop() {
    requestAnimationFrame(scrubLoop);
    for (const s of states) {
      if (!s.dur) { s.dur = s.v.duration || 0; if (!s.dur) continue; }
      if (!s.v.paused) s.v.pause(); // wymuś pauzę — klatkę ustawia kursor
      // mysz skrajnie lewo/prawo → pełny obrót; środek = na wprost
      const target = s.dur * 0.5 + mouseX * (s.dur * 0.25) * DIR;
      s.cur += (target - s.cur) * 0.14; // płynne przewijanie
      // nowe przewinięcie dopiero po zakończeniu poprzedniego — inaczej każde kolejne
      // przerywa poprzednie i obraz stoi w miejscu; ruchy mniejsze niż ~1 klatka pomijamy
      if (s.v.seeking) continue;
      const t = Math.max(0, Math.min(s.dur - 0.05, s.cur));
      if (Math.abs(s.v.currentTime - t) < 0.03) continue;
      try { s.v.currentTime = t; } catch (e) {}
    }
  }
  requestAnimationFrame(scrubLoop);
}


// ===== Testimonials — scroll strzałkami =====
const testiTrack = document.getElementById("testi-track");
if (testiTrack) {
  document.querySelectorAll(".testi__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = testiTrack.querySelector(".testi__card");
      const w = card ? card.getBoundingClientRect().width : 320;
      testiTrack.scrollBy({ left: w * parseInt(btn.dataset.dir, 10), behavior: "smooth" });
    });
  });
}

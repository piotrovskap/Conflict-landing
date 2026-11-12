// ===== Karuzela coverflow NIESKOŃCZONA (klony po bokach) — na każdym .carousel =====
document.querySelectorAll(".carousel").forEach(initCarousel);

function initCarousel(carousel) {
  const viewport = carousel.querySelector(".carousel__viewport");
  const track = carousel.querySelector(".carousel__track");
  const originals = [...carousel.querySelectorAll(".carousel__slide")];
  const N = originals.length;
  if (!track || N === 0) return;

  // klonujemy zestaw przed i po oryginałach → [klony][oryginały][klony]
  originals.slice().reverse().forEach((s) => track.insertBefore(s.cloneNode(true), track.firstChild));
  originals.forEach((s) => track.appendChild(s.cloneNode(true)));

  const slides = [...track.children]; // 3N
  slides.slice(0, N).concat(slides.slice(2 * N)).forEach((s) => s.setAttribute("aria-hidden", "true")); // klony
  const reduceMotionNav = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let index = N; // pierwsza realizacja jest aktywna po wejściu na stronę
  let animating = false;

  function center(withTransition) {
    const vw = viewport.clientWidth;
    if (!vw) { requestAnimationFrame(() => center(withTransition)); return; }
    const active = slides[index];
    slides.forEach((s, i) => {
      const on = i === index;
      s.classList.toggle("is-active", on);
      if (s.dataset.href) { // tylko aktywny slajd jest linkiem dla klawiatury i czytnika
        if (on) { s.tabIndex = 0; s.setAttribute("role", "link"); s.setAttribute("aria-label", `${s.querySelector("strong")?.textContent || "Project"} — open project`); }
        else { s.removeAttribute("tabindex"); s.removeAttribute("role"); s.removeAttribute("aria-label"); }
      }
    });
    const offset = vw / 2 - (active.offsetLeft + active.offsetWidth / 2);
    track.style.transition = withTransition ? "" : "none";
    track.style.transform = `translateX(${offset}px)`;
    if (!withTransition) void track.offsetWidth;
  }

  function go(dir) {
    if (animating) return;
    animating = true;
    index += dir;
    center(true);
  }

  track.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    if (index < N) index += N;
    else if (index >= 2 * N) index -= N;
    center(false);
    animating = false;
  });

  carousel.querySelectorAll(".carousel__btn").forEach((btn) =>
    btn.addEventListener("click", () => go(parseInt(btn.dataset.dir, 10)))
  );
  // klik w boczny slajd → przewiń do niego; klik w aktywny slajd z data-href → otwórz projekt
  const open = (s) => {
    if (!s.dataset.href || s.classList.contains("is-opening")) return;
    s.classList.add("is-opening");
    setTimeout(() => { location.href = s.dataset.href; }, reduceMotionNav ? 0 : 420);
  };
  slides.forEach((s, i) => {
    s.addEventListener("click", () => {
      if (animating) return;
      if (i === index) { open(s); return; }
      animating = true;
      index = i;
      center(true);
    });
    s.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && i === index) { e.preventDefault(); open(s); } });
  });

  const recenter = () => center(false);
  requestAnimationFrame(recenter);
  window.addEventListener("load", recenter);
  if (document.fonts?.ready) document.fonts.ready.then(recenter);
  if (window.ResizeObserver) {
    new ResizeObserver(() => { if (!animating) recenter(); }).observe(viewport);
  } else {
    window.addEventListener("resize", recenter);
  }

  // ===== Auto-przewijanie (pauza na hover) =====
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let populatedCount = 0;
  const DELAY = 3500;
  let timer = null;
  const play = () => { if (reduceMotion || populatedCount < 2) return; stop(); timer = setInterval(() => go(1), DELAY); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

  originals.forEach((slide) => {
    const img = slide.querySelector("img");
    if (!img) return;
    const countLoaded = () => {
      if (!img.naturalWidth) return;
      populatedCount += 1;
      if (populatedCount === 2) play();
    };
    if (img.complete) countLoaded();
    else img.addEventListener("load", countLoaded, { once: true });
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", play);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));
  play();
}

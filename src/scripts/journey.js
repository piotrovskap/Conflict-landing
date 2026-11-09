// ===== WORK — scroll-journey (dwie dłonie) =====
const scroll = document.getElementById("journey-scroll");

if (scroll) {
  const section = scroll.closest(".journey");
  const handA = scroll.querySelector(".journey__hand--a");
  const handB = scroll.querySelector(".journey__hand--b");
  const spark = scroll.querySelector(".journey__spark");
  const glow = scroll.querySelector(".journey__glow");
  const intro = scroll.querySelector(".journey__phase--intro");
  const center = scroll.querySelector(".journey__center");

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ss = (t) => t * t * (3 - 2 * t); // smoothstep

  let ticking = false;

  function update() {
    ticking = false;
    const total = scroll.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const top = scroll.getBoundingClientRect().top;
    const p = clamp(-top / total, 0, 1);
    section.style.setProperty("--p", p.toFixed(3));

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Opuszki palców w obrazkach — frac (x,y)
    const FA = { x: 0.937, y: 0.525 }; // ręka A (czerwona) — wskazujący (prawy)
    const FB = { x: 0.108, y: 0.217 }; // ręka B (kremowa) — wskazujący (górny palec)
    const AR = 1122 / 1402; // proporcje obu PNG (szer./wys.)
    const HAND_TOP_A = 0.35, HAND_BOTTOM_B = 0.62;

    // Dłonie wychodzą zza krawędzi i stykają się na środku.
    const OVER = 1.06;
    const h = Math.max(
      (0.5 * W) / (FA.x * AR),
      (0.5 * W) / ((1 - FB.x) * AR),
      0.6 * H
    ) * OVER;
    const w = h * AR;
    handA.style.height = handB.style.height = `${h.toFixed(1)}px`;

    // Punkt styku: środek w poziomie; w pionie wyśrodkowujemy widoczne fragmenty grafik.
    const Tx = 0.5 * W;
    const above = (FA.y - HAND_TOP_A) * h;
    const below = (HAND_BOTTOM_B - FB.y) * h;
    const Ty = clamp(0.5 * H + (above - below) / 2, 0.25 * H, 0.6 * H);

    // pozycja obrazka z opuszkiem w (fx, Ty) — ruch WYŁĄCZNIE poziomy, bez skali:
    // ręce wysuwają się zza krawędzi i przez cały czas są do nich przyczepione
    const place = (el, F, fx) => {
      const tx = fx - F.x * w;
      const ty = Ty - F.y * h;
      el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
    };

    // RĘKA A — z lewej krawędzi ku centrum (styk gotowy ~p=0.82)
    const ar = ss(clamp(p / 0.82, 0, 1));
    place(handA, FA, lerp(Tx - 0.32 * W, Tx, ar));

    // Ręka B — z prawej krawędzi ku centrum (styk gotowy ~p=0.8)
    const bp = ss(clamp((p - 0.12) / 0.68, 0, 1));
    place(handB, FB, lerp(Tx + 0.5 * W, Tx, bp));
    handB.classList.toggle("is-touching", p >= 0.80);

    // ISKRA — dokładnie w punkcie styku opuszków
    const sp = clamp((p - 0.78) / 0.12, 0, 1);
    spark.style.opacity = sp.toFixed(3);
    spark.style.transform = `translate(-50%, -50%) translate(0, ${(Ty - 0.5 * H).toFixed(1)}px) scale(${lerp(0.4, 1.3, sp).toFixed(3)})`;

    glow.style.top = `${Ty.toFixed(1)}px`;

    // TEKSTY — intro gaśnie, centralny się pojawia
    intro.style.opacity = clamp(1 - p / 0.32, 0, 1).toFixed(3);
    center.style.opacity = clamp((p - 0.6) / 0.28, 0, 1).toFixed(3);
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

// ===== WORK — scroll-journey (dwie ręce, Creation of Adam) =====
const scroll = document.getElementById("journey-scroll");

if (scroll) {
  const section = scroll.closest(".journey");
  const handA = scroll.querySelector(".journey__hand--a");
  const handB = scroll.querySelector(".journey__hand--b");
  const spark = scroll.querySelector(".journey__spark");
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

    // TŁO — rozjaśnia się już przy WJEŻDŻANIU sekcji (pełna jasność gdy pin się zapina),
    // i wraca do ciemnego przy wyjściu
    const vh = window.innerHeight || 1;
    const enter = clamp((vh * 0.75 - top) / (vh * 0.75), 0, 1); // 0 gdy sekcja wchodzi, 1 gdy top=0
    let bgT = ss(enter);
    if (p > 0.9) bgT = 1 - ss((p - 0.9) / 0.1); // powrót do ciemności przy wyjściu
    const dark = [6, 7, 5];
    const light = [237, 233, 225];
    const bg = dark.map((d, i) => Math.round(lerp(d, light[i], bgT)));
    section.style.backgroundColor = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
    section.style.setProperty("--bgT", bgT.toFixed(3)); // do koloru tekstu/iskry

    const W = window.innerWidth;
    const H = window.innerHeight;

    // opuszki palców w obrazkach (zmierzone) — frac (x,y)
    const FA = { x: 0.937, y: 0.525 }; // ręka A (czerwona) — wskazujący (prawy)
    const FB = { x: 0.108, y: 0.217 }; // ręka B (kremowa) — wskazujący (górny palec)
    const wA = handA.offsetWidth, hAh = handA.offsetHeight;
    const wB = handB.offsetWidth, hBh = handB.offsetHeight;

    // punkt styku opuszków (lekko pod środkiem, żeby nie zasłonił napisu)
    const Tx = 0.5 * W, Ty = 0.54 * H;

    // RĘKA A (czerwony rękaw) — opuszek wskazującego od lewej ku centrum
    const ar = ss(clamp(p / 0.82, 0, 1)); // styk gotowy ~p=0.82, potem trzymany
    const sA = lerp(1.0, 0.98, ar);
    const fxA = lerp(0.6 * W, Tx, ar);
    const fyA = lerp(0.4 * H, Ty, ar);
    const txA = fxA - 0.5 * W - (FA.x - 0.5) * wA * sA;
    const tyA = fyA - 0.5 * H - (FA.y - 0.5) * hAh * sA;
    handA.style.transform = `translate(-50%,-50%) translate(${txA.toFixed(1)}px, ${tyA.toFixed(1)}px) scale(${sA.toFixed(3)})`;

    // RĘKA B (kremowy rękaw) — wchodzi z prawej-dołu, opuszek wskazującego ku centrum
    const bp = ss(clamp((p - 0.18) / 0.62, 0, 1)); // styk gotowy ~p=0.8
    const sB = lerp(0.9, 1.0, bp);
    const fxB = lerp(1.35 * W, Tx, bp);
    const fyB = lerp(0.68 * H, Ty, bp);
    const txB = fxB - 0.5 * W - (FB.x - 0.5) * wB * sB;
    const tyB = fyB - 0.5 * H - (FB.y - 0.5) * hBh * sB;
    handB.style.opacity = clamp((p - 0.2) / 0.12, 0, 1).toFixed(3);
    handB.style.transform = `translate(-50%,-50%) translate(${txB.toFixed(1)}px, ${tyB.toFixed(1)}px) scale(${sB.toFixed(3)})`;

    // ISKRA — dokładnie w punkcie styku opuszków
    const sp = clamp((p - 0.78) / 0.12, 0, 1);
    spark.style.opacity = sp.toFixed(3);
    spark.style.transform = `translate(-50%, -50%) translate(0, ${(Ty - 0.5 * H).toFixed(1)}px) scale(${lerp(0.4, 1.3, sp).toFixed(3)})`;

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

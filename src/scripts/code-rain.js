import { visibleLoop } from "../components/visible-loop.js?v=20261115q";
// ===== Lecący kod (matrix) + czerwona fraza spadająca w dół — na każdym .code-rain =====
const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (!reduce) document.querySelectorAll(".code-rain").forEach(initRain);

function initRain(canvas) {
  const ctx = canvas.getContext("2d");
  const CHARS = "01<>/{}[]();=+*%$#&?:ABCDEF0123456789";
  const MESSAGE = "INNOVATION DOESN'T GROW IN COMFORT   "; // zapętlona, na czerwono
  const FONT = 14;
  const STEP_MS = 120; // im większe, tym wolniej leci kod
  let cols = 0;
  let drops = [];
  let isMsg = [];  // czy kolumna niesie frazę
  let msgIdx = []; // pozycja w MESSAGE dla danej kolumny
  let last = 0;

  function resize() {
    canvas.width = Math.max(1, canvas.clientWidth);
    canvas.height = Math.max(1, canvas.clientHeight);
    cols = Math.ceil(canvas.width / FONT);
    drops = Array.from({ length: cols }, () => Math.floor((Math.random() * canvas.height) / FONT));
    isMsg = Array.from({ length: cols }, () => Math.random() < 0.22); // ~1/5 kolumn z frazą
    msgIdx = Array.from({ length: cols }, () => (Math.random() * MESSAGE.length) | 0);
  }

  function frame(t) {
    if (t - last < STEP_MS) return; // throttling → wolniejszy spadek
    last = t;

    ctx.fillStyle = "rgba(6, 7, 5, 0.14)"; // ślad/smużenie
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT}px "SF Mono", Menlo, monospace`;

    for (let i = 0; i < cols; i++) {
      const x = i * FONT;
      const y = drops[i] * FONT;
      let ch;
      if (isMsg[i]) {
        ch = MESSAGE[msgIdx[i] % MESSAGE.length];
        ctx.fillStyle = "rgba(219,57,76,0.95)"; // brandowy czerwony
        msgIdx[i]++;
      } else {
        ch = CHARS[(Math.random() * CHARS.length) | 0];
        ctx.fillStyle = "rgba(200,205,215,0.4)";
      }
      ctx.fillText(ch, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        if (Math.random() < 0.5) isMsg[i] = Math.random() < 0.22;
      }
      drops[i]++;
    }
  }

  resize();
  visibleLoop(canvas, frame); // poza ekranem nie rysuje (hero znika przy scrollu)
  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
}

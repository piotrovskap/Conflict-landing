// ===== Dźwięk tła — bg.mp3 w pętli =====
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const LEVEL = 0.35; // głośność tła

const audio = new Audio("materials/bg.mp3");
audio.loop = true;
audio.preload = "metadata"; // pełny plik dociąga się dopiero przy odtwarzaniu
audio.volume = 0;
// (bez wymuszonego load — oszczędza ~8 MB na wejściu)

// ciągłość między podstronami: zapamiętaj pozycję przy wyjściu, wznów przy wejściu
const POS_KEY = "conflict:bg-pos";
try {
  const pos = parseFloat(sessionStorage.getItem(POS_KEY));
  if (pos > 0) audio.addEventListener("loadedmetadata", () => { audio.currentTime = pos % (audio.duration || pos + 1); }, { once: true });
} catch (e) {}
window.addEventListener("pagehide", () => {
  try { if (playing) sessionStorage.setItem(POS_KEY, String(audio.currentTime)); } catch (e) {}
});

let playing = false;
let ambMuted = false;
let fadeTimer;

function fadeTo(target, ms) {
  clearInterval(fadeTimer);
  const steps = 30;
  const start = audio.volume;
  const dt = Math.max(16, ms / steps);
  let i = 0;
  fadeTimer = setInterval(() => {
    i++;
    const v = start + (target - start) * (i / steps);
    audio.volume = Math.max(0, Math.min(1, v));
    if (i >= steps) clearInterval(fadeTimer);
  }, dt);
}

// Próba startu — wywoływana przy każdym geście aż audio naprawdę ruszy.
function tryStart() {
  if (reduce || playing) return;
  const p = audio.play();
  if (p && typeof p.then === "function") {
    p.then(() => {
      playing = true;
      if (!ambMuted) fadeTo(LEVEL, 3000);
    }).catch(() => {
      // nie udało się (brak user-activation / nie gotowe) — spróbujemy przy kolejnym geście
      playing = false;
    });
  }
}

// start po każdym geście (polityka autoplay); listenery zostają, więc ponawiamy
["pointerdown", "pointerup", "click", "keydown", "touchstart"].forEach((ev) =>
  window.addEventListener(ev, tryStart, { passive: true })
);

// gdy karta wraca na pierwszy plan — dołóż próbę (np. po przełączeniu zakładek)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) tryStart();
});

// jeśli element się wybudzi/zbuforuje, a mamy już gest — ruszy automatycznie
audio.addEventListener("canplay", tryStart);

// sync ze stanem z przełącznika (jedno źródło prawdy w sound.js)
window.addEventListener("cue:mute", (e) => {
  ambMuted = !!e.detail?.muted;
  audio.muted = ambMuted;        // twarde wyciszenie na wszelki wypadek
  tryStart();                    // klik to też gest — odblokowuje, jeśli jeszcze nie gra
  if (playing) fadeTo(ambMuted ? 0 : LEVEL, 600);
});

// ===== Rzadki glitch całej strony (wizual) + dźwięk glitchu na hover =====
const el = document.getElementById("page-glitch");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- dźwięk glitchu: plik z materials ---
let gmuted = false;
const glitchAudio = new Audio("materials/virtual_vibes-glitch-sound-effect-hd-379466.mp3");
glitchAudio.preload = "auto";
glitchAudio.volume = 0.08;

function glitchSound() {
  if (gmuted || reduce) return;
  try {
    glitchAudio.currentTime = 0;
    glitchAudio.play();
  } catch (e) {}
}

// sync ze stanem z przełącznika (jedno źródło prawdy w sound.js)
window.addEventListener("cue:mute", (e) => {
  gmuted = !!e.detail?.muted;
  if (gmuted) { try { glitchAudio.pause(); } catch (err) {} } // utnij, jeśli właśnie gra
});

// dźwięk glitchu odpala się tylko przy najechaniu na video w hero lub na case study
if (!reduce) {
  const targets = document.querySelectorAll(".hero__figure, .cs");
  targets.forEach((t) =>
    t.addEventListener("pointerenter", glitchSound, { passive: true })
  );
}

// wizualny glitch całej strony — co 14–32 s (bez dźwięku)
if (el && !reduce) {
  const fire = () => {
    el.classList.remove("on");
    void el.offsetWidth; // restart animacji
    el.classList.add("on");
    setTimeout(() => el.classList.remove("on"), 350);
    setTimeout(fire, 14000 + Math.random() * 18000);
  };
  setTimeout(fire, 9000);
}

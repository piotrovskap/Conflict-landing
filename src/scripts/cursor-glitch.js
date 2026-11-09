// ===== Glitch kursora — krótkie serie klatek (g1/g2) co kilka sekund i przy kliknięciu =====
// Kursora nie da się animować w CSS, więc podmieniamy klatkę atrybutem na <html>.
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fine && !reduce) {
  const root = document.documentElement;
  // wczytaj klatki z góry — bez mignięcia przy pierwszej serii
  const dpr = window.devicePixelRatio > 1 ? "@2x" : "";
  ["white-g1", "white-g2", "red-g1", "red-g2"].forEach((n) => { new Image().src = `materials/cursor/${n}${dpr}.png`; });

  let busy = false;
  const SEQ = [["g1", 70], ["g2", 60], ["g1", 50], ["", 0]];

  function burst() {
    if (busy || document.hidden) return;
    busy = true;
    let t = 0;
    SEQ.forEach(([frame, dur]) => {
      setTimeout(() => {
        if (frame) root.dataset.cursorGlitch = frame;
        else { delete root.dataset.cursorGlitch; busy = false; }
      }, t);
      t += dur;
    });
  }

  // losowe serie: co 2,5–5,5 s
  (function loop() {
    setTimeout(() => { burst(); loop(); }, 2500 + Math.random() * 3000);
  })();

  // kliknięcie = natychmiastowa seria (mikrointerakcja)
  window.addEventListener("pointerdown", burst, { passive: true });
}

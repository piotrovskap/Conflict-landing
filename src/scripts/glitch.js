// ===== Cykliczne przełączanie trybów glitcha (reużywalne) =====
// Każdy element .fx-glitch dostaje naprzemiennie is-mode-a / is-mode-b.
const MODES = ["is-mode-a", "is-mode-b"];
const DURATIONS = [6000, 4500]; // jak długo trwa tryb A / tryb B (ms)

document.querySelectorAll(".fx-glitch").forEach((el) => {
  let i = 0;

  function next() {
    MODES.forEach((m) => el.classList.remove(m));
    const mode = MODES[i % MODES.length];
    el.classList.add(mode);

    // krótki „burst" przy przełączeniu
    el.classList.add("is-switching");
    setTimeout(() => el.classList.remove("is-switching"), 260);

    const dur = DURATIONS[i % DURATIONS.length];
    i++;
    setTimeout(next, dur);
  }

  // start od bieżącego trybu z HTML, potem cykl
  i = el.classList.contains("is-mode-b") ? 1 : 0;
  setTimeout(next, DURATIONS[i % DURATIONS.length]);
});

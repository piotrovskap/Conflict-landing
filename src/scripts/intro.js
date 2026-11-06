// ===== Intro — pełnoekranowy sygnet, znika po chwili =====
const intro = document.getElementById("intro");

if (intro) {
  // blokada scrolla na czas intro
  const html = document.documentElement;
  const prevOverflow = html.style.overflow;
  html.style.overflow = "hidden";

  const DURATION = 2000; // jak długo widać sygnet (ms)

  const dismiss = () => {
    if (intro.classList.contains("is-done")) return;
    intro.classList.add("is-done");
    html.style.overflow = prevOverflow;
    setTimeout(() => intro.remove(), 800); // usuń po zakończeniu fade
  };

  setTimeout(dismiss, DURATION);
  // awaryjnie: klik/klawisz pomija intro
  intro.addEventListener("click", dismiss);
  window.addEventListener("keydown", dismiss, { once: true });
}

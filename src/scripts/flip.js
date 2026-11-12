// ===== flip — karta obraca się po kliknięciu / Enter / Spacji (reużywalne: [data-flip] + [data-flip-back]) =====
document.querySelectorAll("[data-flip]").forEach((card) => {
  const back = card.querySelector("[data-flip-back]");
  const links = back ? [...back.querySelectorAll("a, button")] : [];

  // skan przelatujący przez kartę w trakcie obrotu
  const sweep = document.createElement("span");
  sweep.className = "flip-sweep";
  sweep.setAttribute("aria-hidden", "true");
  card.append(sweep);
  let flipT;

  const set = (on) => {
    if (card.classList.contains("is-flipped") === on) return;
    card.style.setProperty("--sweep-h", `${card.offsetHeight}px`);
    card.classList.remove("is-flipping");
    void card.offsetWidth; // restart animacji przy szybkim ponownym tapnięciu
    card.classList.add("is-flipping");
    clearTimeout(flipT);
    flipT = setTimeout(() => card.classList.remove("is-flipping"), 800);
    if (window.matchMedia("(hover: none)").matches) navigator.vibrate?.(12); // lekki haptyk (Android)
    card.classList.toggle("is-flipped", on);
    card.setAttribute("aria-pressed", String(on));
    back?.setAttribute("aria-hidden", String(!on));
    links.forEach((l) => (on ? l.removeAttribute("tabindex") : l.setAttribute("tabindex", "-1")));
  };
  const toggle = () => set(!card.classList.contains("is-flipped"));

  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // klik w link na odwrocie — bez obrotu
    toggle();
  });
  card.addEventListener("keydown", (e) => {
    if (e.target !== card) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    if (e.key === "Escape") set(false);
  });
});

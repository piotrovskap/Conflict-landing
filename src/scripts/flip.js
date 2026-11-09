// ===== flip — karta obraca się po kliknięciu / Enter / Spacji (reużywalne: [data-flip] + [data-flip-back]) =====
document.querySelectorAll("[data-flip]").forEach((card) => {
  const back = card.querySelector("[data-flip-back]");
  const links = back ? [...back.querySelectorAll("a, button")] : [];

  const set = (on) => {
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

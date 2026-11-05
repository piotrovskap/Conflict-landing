// ===== Dock nawigacji sekcji — scroll-spy =====
const dock = document.getElementById("dock");

if (dock) {
  const items = [...dock.querySelectorAll(".dock__item")];
  // mapuj href → item
  const byId = new Map(
    items.map((a) => [a.getAttribute("href").slice(1), a])
  );
  const sections = [...byId.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    items.forEach((a) =>
      a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`)
    );
  }

  // obserwuj, która sekcja jest w centrum ekranu
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
}

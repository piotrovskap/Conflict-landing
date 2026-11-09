// ===== Akordeon usług (jeden otwarty naraz) =====
const acc = document.getElementById("svc-acc");

if (acc) {
  const items = [...acc.querySelectorAll(".svc__item")];

  // wideo gra tylko w otwartym panelu — zwinięte nie obciążają strony
  const syncVideos = () => items.forEach((i) => {
    i.querySelectorAll("video").forEach((v) => {
      if (i.classList.contains("is-open")) v.play().catch(() => {});
      else v.pause();
    });
  });
  items.forEach((item) => {
    const btn = item.querySelector(".svc__row");
    btn?.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      items.forEach((i) => {
        i.classList.remove("is-open");
        i.querySelector(".svc__row")?.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
      syncVideos();
    });
  });
  syncVideos();
}

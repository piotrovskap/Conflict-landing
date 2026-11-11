// ===== Strona Problems — grupy i karty z src/data/problems.js (układ jak Services/Industries) =====
import { PROBLEMS, PROBLEM_GROUPS } from "../data/problems.js";

const pad = (n) => String(n).padStart(2, "0");
const jump = document.getElementById("ph-jump");
const panels = document.getElementById("ph-panels");

PROBLEM_GROUPS.forEach((g, gi) => {
  const items = PROBLEMS.filter((p) => p.group === g.id);
  const num = pad(gi + 1);

  if (jump) {
    const a = document.createElement("a");
    a.className = "sp-jump";
    a.href = `#${g.id}`;
    a.innerHTML = `<span class="sp-jump__num">${num}</span><span class="sp-jump__name"></span><span class="sp-jump__tag">${items.length} problems</span>`;
    a.querySelector(".sp-jump__name").textContent = g.name;
    jump.appendChild(a);
  }

  if (panels) {
    const art = document.createElement("article");
    art.className = "sp-svc";
    art.id = g.id;
    art.setAttribute("aria-labelledby", `${g.id}-title`);
    art.innerHTML = `
      <div class="sp-svc__text">
        <span class="sp-svc__num" aria-hidden="true">${num}</span>
        <h2 class="sp-svc__title" id="${g.id}-title" data-reveal></h2>
      </div>
      <ul class="sp-caps"></ul>`;
    art.querySelector(".sp-svc__title").textContent = g.name;
    const list = art.querySelector(".sp-caps");
    items.forEach((p, k) => {
      const li = document.createElement("li");
      li.className = "sp-caps__item";
      li.dataset.reveal = "";
      li.dataset.revealDelay = String((k % 3) * 70);
      li.innerHTML = `<a class="sp-cap" href="problem.html?id=${p.id}"><span class="sp-cap__num">${num}.${k + 1}</span><span class="sp-cap__go" aria-hidden="true">→</span><h3 class="sp-cap__title"></h3><p class="sp-cap__desc"></p><span class="sp-cap__more">Learn more</span></a>`;
      li.querySelector(".sp-cap__title").textContent = p.name;
      li.querySelector(".sp-cap__desc").textContent = p.tag;
      list.appendChild(li);
    });
    panels.appendChild(art);
  }
});

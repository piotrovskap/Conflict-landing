// ===== Strona Industries — ten sam układ co Services, treść z src/data/industries.js =====
import { INDUSTRIES, ICONS } from "../data/industries.js";

const pad = (n) => String(n).padStart(2, "0");
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

const jump = document.getElementById("ih-jump");
const panels = document.getElementById("ih-panels");

INDUSTRIES.forEach((ind, i) => {
  const num = pad(i + 1);
  const anchor = ind.id;

  // skróty w hero (komponent .sp-jump)
  if (jump) {
    const a = el("a", "sp-jump");
    a.href = `#${anchor}`;
    a.append(el("span", "sp-jump__num", num), el("span", "sp-jump__name", ind.card));
    jump.appendChild(a);
  }

  // panel branży (komponent .sp-svc)
  if (panels) {
    const art = el("article", "sp-svc");
    art.id = anchor;
    art.setAttribute("aria-labelledby", `${anchor}-title`);
    art.innerHTML = `
      <div class="sp-svc__top">
        <div class="sp-svc__text">
          <span class="sp-svc__num" aria-hidden="true">${num}</span>
          <h2 class="sp-svc__title" id="${anchor}-title" data-reveal></h2>
          <p class="sp-svc__desc" data-reveal data-reveal-delay="160"></p>
          <a class="sp-svc__cta" href="industry.html?id=${ind.id}" data-reveal data-reveal-delay="220">Learn more <em aria-hidden="true">→</em></a>
        </div>
        <div class="sp-ind-badge sp-ind-badge--panel" aria-hidden="true" data-reveal data-reveal-delay="120">
          <span class="sp-ind-badge__icon">${ICONS[ind.icon] || ""}</span>
          <span class="sp-ind-badge__num"><b>${num}</b> / ${pad(INDUSTRIES.length)}</span>
          <span class="sp-ind-badge__scan"></span>
        </div>
      </div>
      <ul class="sp-caps${ind.shine.some((x) => x.desc) ? "" : " sp-caps--compact"}"></ul>`;
    art.querySelector(".sp-svc__title").textContent = ind.card;
    art.querySelector(".sp-svc__desc").textContent = ind.intro;
    const caps = art.querySelector(".sp-caps");
    caps.setAttribute("aria-label", `${ind.card} — where we shine`);
    ind.shine.forEach((it, k) => {
      const li = el("li", "sp-caps__item");
      li.dataset.reveal = "";
      li.dataset.revealDelay = String((k % 6) * 70);
      li.innerHTML = `<a class="sp-cap" href="industry.html?id=${ind.id}"><span class="sp-cap__num">${num}.${k + 1}</span><span class="sp-cap__go" aria-hidden="true">→</span><h3 class="sp-cap__title"></h3>${it.desc ? '<p class="sp-cap__desc"></p>' : ""}<span class="sp-cap__more">Explore</span></a>`;
      li.querySelector(".sp-cap__title").textContent = it.title;
      if (it.desc) li.querySelector(".sp-cap__desc").textContent = it.desc;
      caps.appendChild(li);
    });
    panels.appendChild(art);
  }
});

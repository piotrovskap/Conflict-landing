// ===== Success Stories — karty z src/data/cases.js, filtr po kliencie w zakładkach =====
// Moduł buduje znaczniki zakładek PRZED subpage.js (który podpina logikę [data-tabs]).
import { CASES } from "../data/cases.js";

const pad = (n) => String(n).padStart(2, "0");
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const tabsRoot = document.getElementById("ss-tabs");
const jump = document.getElementById("ss-jump");
const clients = [...new Set(CASES.map((c) => c.client))];
const groups = [{ id: "all", name: "All", list: CASES }, ...clients.map((cl) => ({ id: slugify(cl), name: cl, list: CASES.filter((c) => c.client === cl) }))];

const card = (c) => {
  const i = CASES.indexOf(c);
  const li = document.createElement("li");
  li.className = "sp-caps__item";
  li.innerHTML = `<a class="sp-cap sp-story" href="case.html?id=${c.id}"><span class="sp-cap__num">${pad(i + 1)}</span><span class="sp-cap__go" aria-hidden="true">→</span><span class="sp-story__client"></span><h3 class="sp-cap__title"></h3><p class="sp-cap__desc"></p><span class="sp-cap__more">Learn more</span></a>`;
  li.querySelector(".sp-story__client").textContent = c.client;
  li.querySelector(".sp-cap__title").textContent = c.title;
  li.querySelector(".sp-cap__desc").textContent = c.intro;
  return li;
};

if (tabsRoot) {
  const list = document.createElement("div");
  list.className = "sp-tabs__list";
  list.setAttribute("role", "tablist");
  list.setAttribute("aria-label", "Filter by client");
  groups.forEach((g, k) => {
    const b = document.createElement("button");
    b.className = "sp-tab";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.id = `ss-${g.id}-tab`;
    b.setAttribute("aria-controls", `ss-${g.id}`);
    b.setAttribute("aria-selected", String(k === 0));
    b.innerHTML = `${g.name}<sup>${g.list.length}</sup>`;
    list.appendChild(b);
  });
  const ink = document.createElement("span");
  ink.className = "sp-tabs__ink";
  ink.setAttribute("aria-hidden", "true");
  list.appendChild(ink);
  tabsRoot.appendChild(list);

  groups.forEach((g, k) => {
    const panel = document.createElement("div");
    panel.className = "sp-tabs__panel";
    panel.setAttribute("role", "tabpanel");
    panel.id = `ss-${g.id}`;
    panel.setAttribute("aria-labelledby", `ss-${g.id}-tab`);
    if (k) panel.hidden = true;
    const ul = document.createElement("ul");
    ul.className = "sp-caps sp-caps--3";
    g.list.forEach((c) => ul.appendChild(card(c)));
    panel.appendChild(ul);
    tabsRoot.appendChild(panel);
  });
}

if (jump) {
  clients.forEach((cl, k) => {
    const n = CASES.filter((c) => c.client === cl).length;
    const a = document.createElement("a");
    a.className = "sp-jump";
    a.href = "#stories";
    a.innerHTML = `<span class="sp-jump__num">${pad(k + 1)}</span><span class="sp-jump__name"></span><span class="sp-jump__tag">${n} stories</span>`;
    a.querySelector(".sp-jump__name").textContent = cl;
    a.addEventListener("click", () => document.getElementById(`ss-${slugify(cl)}-tab`)?.click());
    jump.appendChild(a);
  });
}

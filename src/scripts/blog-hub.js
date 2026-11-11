// ===== Blog — lista wpisów: wyróżniony najnowszy, zakładki lat, „Show more”, wyszukiwarka =====
// Buduje znaczniki [data-tabs] PRZED subpage.js (który podpina logikę zakładek).
// Źródło nie ma kategorii — grupujemy po roku publikacji (wynika wprost z dat).
import { POSTS, postYear } from "../data/posts.js";
import { postCard } from "../components/post-card.js";

const PAGE = 12;
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

// najnowszy wpis w bocznym slocie hero
document.getElementById("b-featured")?.appendChild(postCard(posts[0], { featured: true, cta: "Read the latest" }));

const years = [...new Set(posts.map(postYear))];
const groups = [{ id: "all", name: "All", list: posts }, ...years.map((y) => ({ id: y, name: y, list: posts.filter((p) => postYear(p) === y) }))];

const root = document.getElementById("b-tabs");
const search = document.getElementById("b-search");
const empty = document.getElementById("b-empty");

// stronicowanie w panelu: pokazuj `shown` kart, przycisk dokłada kolejne PAGE
function paginate(panel) {
  const items = [...panel.querySelectorAll(".sp-posts > li")];
  const more = panel.querySelector(".sp-more");
  const shown = Number(panel.dataset.shown);
  items.forEach((li, i) => { li.hidden = i >= shown; });
  const left = items.length - shown;
  more.hidden = left <= 0;
  more.querySelector(".sp-more__count").textContent = `${Math.min(PAGE, left)} of ${left}`;
}

if (root) {
  const list = el("div", "sp-tabs__list");
  list.setAttribute("role", "tablist");
  list.setAttribute("aria-label", "Filter by year");
  groups.forEach((g, k) => {
    const b = el("button", "sp-tab");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.id = `b-${g.id}-tab`;
    b.setAttribute("aria-controls", `b-${g.id}`);
    b.setAttribute("aria-selected", String(k === 0));
    b.innerHTML = `${g.name}<sup>${g.list.length}</sup>`;
    list.appendChild(b);
  });
  const ink = el("span", "sp-tabs__ink"); ink.setAttribute("aria-hidden", "true"); list.appendChild(ink);
  root.appendChild(list);

  groups.forEach((g, k) => {
    const panel = el("div", "sp-tabs__panel");
    panel.setAttribute("role", "tabpanel");
    panel.id = `b-${g.id}`;
    panel.setAttribute("aria-labelledby", `b-${g.id}-tab`);
    panel.dataset.shown = String(PAGE);
    if (k) panel.hidden = true;
    const ul = el("ul", "sp-posts");
    g.list.forEach((p) => { const li = el("li"); li.appendChild(postCard(p)); ul.appendChild(li); });
    const more = el("button", "btn btn--ghost sp-more");
    more.type = "button";
    more.innerHTML = `Show more <span class="sp-more__count"></span>`;
    more.addEventListener("click", () => {
      const first = Number(panel.dataset.shown);
      panel.dataset.shown = String(first + PAGE);
      paginate(panel);
      // nowe karty wjeżdżają kaskadą; fokus na pierwszą z nich (klawiatura)
      const fresh = [...ul.children].slice(first, first + PAGE);
      fresh.forEach((li, i) => { li.classList.add("is-new"); li.style.setProperty("--i", i); });
      fresh[0]?.querySelector("a")?.focus({ preventScroll: true });
    });
    panel.append(ul, more);
    root.appendChild(panel);
    paginate(panel);
  });
}

// wyszukiwarka — przeszukuje wszystkie wpisy (ignoruje stronicowanie); „/" ustawia kursor w polu
search?.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  let visible = 0;
  root.querySelectorAll(".sp-tabs__panel").forEach((panel) => {
    if (!q) { paginate(panel); return; }
    panel.querySelector(".sp-more").hidden = true;
    panel.querySelectorAll(".sp-posts > li").forEach((li) => {
      const hit = li.firstElementChild.dataset.search.includes(q);
      li.hidden = !hit;
      if (hit && !panel.hidden) visible++;
    });
  });
  if (empty) empty.hidden = !q || visible > 0;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== search && !/input|textarea/i.test(document.activeElement?.tagName || "")) { e.preventDefault(); search?.focus(); }
});

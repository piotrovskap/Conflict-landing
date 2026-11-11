// ===== Partnerstwa: partnerships.html (hub) i partner.html?id=aws|google =====
import { PARTNERS, PARTNERS_INTRO } from "../data/partners.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const pad = (n) => String(n).padStart(2, "0");

// --- hub ---
const hub = $("pt-cards");
if (hub) {
  $("pt-intro").textContent = PARTNERS_INTRO;
  PARTNERS.forEach((p, i) => {
    const a = el("a", "sp-partner-card");
    a.href = `partner.html?id=${p.id}`;
    a.innerHTML = `<span class="sp-partner-card__num">${pad(i + 1)}</span><span class="sp-partner-card__logo"><img alt="" /></span><span class="sp-partner-card__crumb"></span><h2 class="sp-partner-card__title"></h2><p class="sp-partner-card__desc"></p><span class="sp-partner-card__go">Explore <em aria-hidden="true">→</em></span>`;
    a.querySelector("img").src = p.badge;
    a.querySelector("img").alt = p.crumb;
    a.querySelector(".sp-partner-card__crumb").textContent = p.crumb;
    a.querySelector(".sp-partner-card__title").textContent = p.name;
    a.querySelector(".sp-partner-card__desc").textContent = p.intro[0];
    a.dataset.reveal = ""; a.dataset.revealDelay = String(i * 120);
    hub.appendChild(a);
  });
}

// --- strona partnera ---
const title = $("pr-title");
if (title) {
  const at = PARTNERS.findIndex((x) => x.id === new URLSearchParams(location.search).get("id"));
  if (at < 0) location.replace("partnerships.html");
  else {
    const p = PARTNERS[at];
    setSEO({ title: `${p.name} Partner`, description: p.intro, path: `/partner.html?id=${p.id}`, crumbs: [["Partnerships", "/partnerships.html"], [`${p.name} Partner`, `/partner.html?id=${p.id}`]] });
    contextCTAs({ topic: `${p.name} Partner`, from: `partner.html?id=${p.id}` });
    document.querySelector('meta[name="description"]')?.setAttribute("content", p.intro[0]);
    $("pr-crumb").textContent = p.crumb;
    title.textContent = p.h1;
    $("pr-intro").textContent = p.intro[0];
    $("pr-badge").src = p.badge;
    $("pr-badge").alt = p.crumb;
    const host = $("pr-sections");
    p.sections.forEach((s) => {
      const sec = el("section", "sp-do sp-svc-sec");
      const h = el("h2", "sp-h2", s.heading); h.dataset.reveal = ""; sec.appendChild(h);
      if (s.intro) { const x = el("p", "sp-lead", s.intro); x.dataset.reveal = ""; sec.appendChild(x); }
      (s.text || []).forEach((t) => { const x = el("p", "sp-lead", t); x.dataset.reveal = ""; sec.appendChild(x); });
      if (s.kind === "cards") {
        const ul = el("ul", "sp-caps");
        s.items.forEach((it, k) => {
          const li = el("li", "sp-caps__item"); li.dataset.reveal = ""; li.dataset.revealDelay = String((k % 3) * 70);
          const c = el("div", "sp-cap sp-cap--static");
          c.append(el("span", "sp-cap__num", pad(k + 1)), el("h3", "sp-cap__title", it.title), el("p", "sp-cap__desc", it.desc));
          li.appendChild(c); ul.appendChild(li);
        });
        sec.appendChild(ul);
      } else if (s.kind === "list") {
        const ul = el("ul", "sp-checklist");
        s.items.forEach((t) => ul.appendChild(el("li", null, t)));
        sec.appendChild(ul);
      }
      host.appendChild(sec);
    });
    $("pr-contact").textContent = p.contact.heading;
    $("pr-contact-text").textContent = p.contact.text;
    const other = PARTNERS[(at + 1) % PARTNERS.length];
    $("pr-other").href = `partner.html?id=${other.id}`;
    $("pr-other-name").textContent = other.crumb;
  }
}

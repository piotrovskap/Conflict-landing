// ===== Strona kategorii usług: service-category.html?id=<ai|apps|ecommerce|platform|shared-consulting> =====
import { SERVICE_PAGES, SERVICE_CATEGORIES } from "../data/service-pages.js";
import { SERVICES } from "../data/services.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const id = new URLSearchParams(location.search).get("id");
const at = SERVICE_CATEGORIES.findIndex((c) => c.id === id || c.legacy === id);

if (at < 0) {
  location.replace("services.html");
} else {
  const c = SERVICE_CATEGORIES[at];
  const pages = SERVICE_PAGES.filter((p) => p.category === c.id);
  const legacy = SERVICES.find((s) => s.id === c.legacy);
  setSEO({ title: `${c.name} — Services`, description: c.intro, path: `/service-category.html?id=${c.id}`, crumbs: [["Services", "/services.html"], [c.name, `/service-category.html?id=${c.id}`]], ld: { "@type": "Service", name: c.name, description: [].concat(c.intro).join(" "), provider: { "@id": "https://weareconflict.com/#org" } } });
  contextCTAs({ topic: c.name, from: `service-category.html?id=${c.id}`, service: c.legacy });
  document.querySelector('meta[name="description"]')?.setAttribute("content", c.intro[0] || c.name);

  $("k-num").textContent = c.num;
  $("k-title").textContent = c.h1 || c.name;
  const lead = $("k-intro");
  lead.textContent = c.intro[0] || "";
  let last = lead;
  c.intro.slice(1).forEach((t) => { const x = el("p", "sp-hero__lead sp-hero__lead--2", t); last.after(x); last = x; });
  if (c.tagline) last.after(el("p", "sp-hero__tagline", c.tagline));
  $("k-cta").href = `contact.html?service=${c.legacy}#contact-form`;

  $("k-term-host").textContent = `conflict@${c.legacy}`;
  const screen = $("k-term");
  const caret = screen.querySelector(".sp-term__caret");
  (legacy?.term || []).forEach((line) => screen.insertBefore(el("span", "sp-term__line", line), caret));

  // karty podusług — opis z karty na stronie kategorii (cards), inaczej pierwszy akapit podusługi
  $("k-list-title").textContent = c.listHeading || c.name;
  const caps = $("k-caps");
  pages.forEach((p, k) => {
    const li = el("li", "sp-caps__item");
    li.dataset.reveal = "";
    li.dataset.revealDelay = String((k % 3) * 70);
    li.innerHTML = `<a class="sp-cap" href="service.html?id=${p.id}"><span class="sp-cap__num">${c.num}.${k + 1}</span><span class="sp-cap__go" aria-hidden="true">→</span><h3 class="sp-cap__title"></h3><p class="sp-cap__desc"></p><span class="sp-cap__more">Explore</span></a>`;
    li.querySelector(".sp-cap__title").textContent = p.name;
    li.querySelector(".sp-cap__desc").textContent = c.cards?.[p.id]?.desc || p.tagline || p.excerpt || "";
    caps.appendChild(li);
  });

  // dodatkowe sekcje kategorii (tekst / lista)
  const host = $("k-sections");
  (c.sections || []).forEach((s) => {
    const sec = el("section", "sp-do sp-svc-sec");
    const h = el("h2", "sp-h2", s.heading); h.dataset.reveal = ""; sec.appendChild(h);
    if (s.intro) { const x = el("p", "sp-lead", s.intro); x.dataset.reveal = ""; sec.appendChild(x); }
    (s.text || []).forEach((t) => { const x = el("p", "sp-lead", t); x.dataset.reveal = ""; sec.appendChild(x); });
    if (s.items?.length) {
      const ul = el("ul", "sp-checklist");
      s.items.forEach((t) => ul.appendChild(el("li", null, typeof t === "string" ? t : `${t.title}${t.desc ? " — " + t.desc : ""}`)));
      sec.appendChild(ul);
    }
    host.appendChild(sec);
  });

  if (c.contact?.heading) $("k-contact").textContent = c.contact.heading;
  if (c.contact?.text) $("k-contact-text").textContent = c.contact.text; else $("k-contact-text").remove();

  const prev = SERVICE_CATEGORIES[(at - 1 + SERVICE_CATEGORIES.length) % SERVICE_CATEGORIES.length];
  const next = SERVICE_CATEGORIES[(at + 1) % SERVICE_CATEGORIES.length];
  $("k-prev").href = `service-category.html?id=${prev.id}`;
  $("k-prev-name").textContent = prev.name;
  $("k-next").href = `service-category.html?id=${next.id}`;
  $("k-next-name").textContent = next.name;
}

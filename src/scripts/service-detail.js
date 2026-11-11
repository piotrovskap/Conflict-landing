// ===== Szablon strony podusługi: service.html?id=<slug> =====
// Treść 1:1 z src/data/service-pages.js (weareconflict.com/services/<kategoria>/<slug>).
// Stare slugi z pierwszej wersji strony działają dalej przez ALIASES.
import { SERVICE_PAGES, SERVICE_CATEGORIES, ALIASES } from "../data/service-pages.js";
import { SERVICES } from "../data/services.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const raw = new URLSearchParams(location.search).get("id");
const slug = ALIASES[raw] || raw;
const at = SERVICE_PAGES.findIndex((p) => p.id === slug);

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

if (at < 0) {
  location.replace("services.html");
} else {
  if (raw !== slug) history.replaceState(null, "", `service.html?id=${slug}`);
  const p = SERVICE_PAGES[at];
  const cat = SERVICE_CATEGORIES.find((c) => c.id === p.category);
  const siblings = SERVICE_PAGES.filter((x) => x.category === p.category);
  const idx = siblings.indexOf(p);
  const legacy = SERVICES.find((s) => s.id === cat.legacy); // terminal kategorii z pierwszej wersji

  setSEO({ title: `${p.name} — ${cat.name}`, description: p.intro, path: `/service.html?id=${p.id}`, crumbs: [["Services", "/services.html"], [cat.name, `/service-category.html?id=${cat.id}`], [p.name, `/service.html?id=${p.id}`]], ld: { "@type": "Service", name: p.name, serviceType: cat.name, description: [].concat(p.intro).join(" "), provider: { "@id": "https://weareconflict.com/#org" }, areaServed: "Worldwide" } });
  contextCTAs({ topic: p.name, from: `service.html?id=${p.id}`, service: cat.legacy });
  document.querySelector('meta[name="description"]')?.setAttribute("content", p.intro[0] || p.h1);

  // --- hero ---
  $("d-title").textContent = p.h1;
  const lead = $("d-desc");
  lead.textContent = p.intro[0] || "";
  let last = lead;
  p.intro.slice(1).forEach((t) => { const x = el("p", "sp-hero__lead sp-hero__lead--2", t); last.after(x); last = x; });
  if (p.tagline) { const x = el("p", "sp-hero__tagline", p.tagline); last.after(x); }
  $("d-parent").href = `service-category.html?id=${cat.id}`;
  $("d-parent-num").textContent = `${cat.num}.${idx + 1}`;
  $("d-parent-name").textContent = p.crumb || `Part of ${cat.name}`;
  $("d-cta").href = `contact.html?service=${cat.legacy}#contact-form`;

  // terminal kategorii
  $("d-term-host").textContent = `conflict@${cat.legacy}`;
  const screen = $("d-term");
  const caret = screen.querySelector(".sp-term__caret");
  (legacy?.term || []).forEach((line) => screen.insertBefore(el("span", "sp-term__line", line), caret));

  // --- sekcje ze źródła (karty / lista / tekst) ---
  const host = $("d-sections");
  p.sections.forEach((s, i) => {
    const sec = el("section", "sp-do sp-svc-sec");
    sec.setAttribute("aria-label", s.heading);
    const h = el("h2", "sp-h2", s.heading);
    h.dataset.reveal = "";
    sec.appendChild(h);
    if (s.intro) { const x = el("p", "sp-lead", s.intro); x.dataset.reveal = ""; sec.appendChild(x); }
    (s.text || []).forEach((t) => { const x = el("p", "sp-lead", t); x.dataset.reveal = ""; sec.appendChild(x); });
    if (s.kind === "cards" && s.items?.length) {
      const ul = el("ul", "sp-caps");
      s.items.forEach((it, k) => {
        const li = el("li", "sp-caps__item");
        li.dataset.reveal = "";
        li.dataset.revealDelay = String((k % 3) * 70);
        const card = el("div", "sp-cap sp-cap--static");
        card.append(el("span", "sp-cap__num", pad(k + 1)), el("h3", "sp-cap__title", it.title));
        if (it.desc) card.appendChild(el("p", "sp-cap__desc", it.desc));
        li.appendChild(card);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
    } else if (s.kind === "list" && s.items?.length) {
      const ul = el("ul", "sp-checklist");
      s.items.forEach((t, k) => { const li = el("li", null, typeof t === "string" ? t : t.title); li.dataset.reveal = ""; li.dataset.revealDelay = String((k % 4) * 50); ul.appendChild(li); });
      sec.appendChild(ul);
    }
    host.appendChild(sec);
  });

  // --- kontakt ---
  if (p.contact?.heading) $("d-contact").textContent = p.contact.heading;
  if (p.contact?.text) $("d-contact-text").textContent = p.contact.text; else $("d-contact-text").remove();

  // --- więcej w kategorii ---
  $("d-more-svc").textContent = cat.name;
  const more = $("d-more");
  siblings.forEach((s, k) => {
    if (s === p) return;
    const li = el("li", "sp-caps__item");
    li.dataset.reveal = "";
    li.dataset.revealDelay = String((more.children.length % 3) * 80);
    li.innerHTML = `<a class="sp-cap" href="service.html?id=${s.id}"><span class="sp-cap__num">${cat.num}.${k + 1}</span><span class="sp-cap__go" aria-hidden="true">→</span><h3 class="sp-cap__title"></h3><span class="sp-cap__more">Explore</span></a>`;
    li.querySelector(".sp-cap__title").textContent = s.name;
    more.appendChild(li);
  });

  // --- poprzednia / następna (przez wszystkie podusługi) ---
  const prev = SERVICE_PAGES[(at - 1 + SERVICE_PAGES.length) % SERVICE_PAGES.length];
  const next = SERVICE_PAGES[(at + 1) % SERVICE_PAGES.length];
  $("d-prev").href = `service.html?id=${prev.id}`;
  $("d-prev-name").textContent = prev.name;
  $("d-next").href = `service.html?id=${next.id}`;
  $("d-next-name").textContent = next.name;
}

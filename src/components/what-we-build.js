// ===== Reużywalny komponent: „What we build” (akordeon usług na stronie głównej) =====
// Jedno źródło prawdy: src/data/service-pages.js — te same kategorie, nazwy, kolejność i podstrony
// co strony kategorii (service-category.html) i podusług (service.html).
// HTML jest wpiekany w index.html między <!-- wwb:start --> / <!-- wwb:end --> przez `node tools/seo-build.mjs`
// (linki w kodzie strony = widoczne dla Google bez JS). Akordeon obsługuje src/scripts/accordion.js.
import { SERVICE_PAGES, SERVICE_CATEGORIES } from "../data/service-pages.js";

// krótkie opisy kategorii ze strony głównej (tekst źródłowy), klucz = id kategorii
const BLURB = {
  platform: "Resilient platforms, built to run. Cloud-native architecture, DevOps and SRE that keep serious products online.",
  ai: "Smarter systems, faster outcomes — applied AI without the fluff. From data foundations to autonomous agents running in production.",
  apps: "Apps that work, code that lasts. Web, mobile and desktop products engineered to ship fast and scale cleanly.",
  ecommerce: "Commerce that scales under load. Headless storefronts, resilient payments and fulfilment built for billion-dollar volume.",
  "shared-consulting": "Elite engineering, on your terms. Strategic advisory, embedded teams and on-call support when it matters most.",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function whatWeBuildHTML(indent = "      ") {
  return SERVICE_CATEGORIES.map((c, i) => {
    const pages = SERVICE_PAGES.filter((p) => p.category === c.id);
    const open = i === 0;
    const items = pages.map((p) => `${indent}      <li><a class="svc__link" href="service.html?id=${p.id}">${esc(p.name)}</a></li>`).join("\n");
    return `${indent}<article class="svc__item${open ? " is-open" : ""}">
${indent}  <button class="svc__row" aria-expanded="${open}">
${indent}    <span class="svc__num">${String(i + 1).padStart(2, "0")}</span>
${indent}    <span class="svc__name">${esc(c.name)}</span>
${indent}    <span class="svc__count" aria-hidden="true">${pages.length}</span>
${indent}    <span class="svc__plus" aria-hidden="true"></span>
${indent}  </button>
${indent}  <div class="svc__panel"><div class="svc__inner"><div class="svc__content">
${indent}    <div class="svc__desc">
${indent}      <p>${esc(BLURB[c.id] || c.tagline || "")}</p>
${indent}      <a href="service-category.html?id=${c.id}" class="svc__cta">Explore ${esc(c.name)} <em>→</em></a>
${indent}    </div>
${indent}    <ul class="svc__list">
${items}
${indent}    </ul>
${indent}  </div></div></div>
${indent}</article>`;
  }).join("\n\n");
}

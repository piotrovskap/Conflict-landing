// ===== SEO w runtime — dla szablonów ?id= (service, problem, case…) =====
// Ustawia: <title>, description, canonical, robots, Open Graph, Twitter, JSON-LD (BreadcrumbList + typ strony).
// Statyczne strony mają te same znaczniki wpieczone przez tools/seo-build.mjs (blok <!-- seo:start/end -->).
import { SITE, abs, metaText, ORG_LD, breadcrumbLD } from "../data/site.js";

function meta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", value);
}
function link(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.rel = rel; document.head.appendChild(el); }
  el.href = href;
}

/**
 * @param {object} o
 * @param {string} o.title       tytuł bez sufiksu marki
 * @param {string|string[]} o.description
 * @param {string} o.path        ścieżka kanoniczna, np. "/service.html?id=devops"
 * @param {[string,string][]} [o.crumbs]  okruszki [nazwa, ścieżka] (bez Home — dodawany automatycznie)
 * @param {string} [o.type]      og:type (website | article)
 * @param {object} [o.ld]        dodatkowy węzeł JSON-LD (Service, BlogPosting…)
 * @param {boolean} [o.noindex]
 * @param {string} [o.image]
 */
export function setSEO(o) {
  const title = `${o.title} — ${SITE.name}`;
  const desc = metaText(o.description || SITE.description);
  const url = abs(o.path);
  const img = abs(o.image || SITE.ogImage);
  document.title = title;
  meta("name", "description", desc);
  meta("name", "robots", o.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
  link("canonical", url);
  meta("property", "og:title", title);
  meta("property", "og:description", desc);
  meta("property", "og:url", url);
  meta("property", "og:type", o.type || "website");
  meta("property", "og:image", img);
  meta("name", "twitter:title", title);
  meta("name", "twitter:description", desc);
  meta("name", "twitter:image", img);

  const graph = [ORG_LD, breadcrumbLD([["Home", "/"], ...(o.crumbs || [])])];
  graph.push({ "@type": "WebPage", "@id": url, url, name: title, description: desc, isPartOf: { "@id": `${SITE.url}/#website` }, inLanguage: SITE.lang });
  if (o.ld) graph.push({ ...o.ld, url, mainEntityOfPage: url });
  let s = document.getElementById("ld-page");
  if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = "ld-page"; document.head.appendChild(s); }
  s.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

// nieznane ?id= → nie indeksuj
export const notFoundSEO = (title) => setSEO({ title, description: SITE.description, path: location.pathname, noindex: true });

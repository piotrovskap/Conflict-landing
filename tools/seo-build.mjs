// ===== SEO build — uruchom: node tools/seo-build.mjs =====
// 1) wpieka do <head> każdej strony blok <!-- seo:start --> … <!-- seo:end --> (description, robots, canonical, OG, Twitter, JSON-LD)
// 2) generuje sitemap.xml (strony statyczne + wszystkie ?id= z src/data)
// 3) generuje robots.txt
// 4) generuje _redirects (Netlify / Cloudflare Pages) + redirects.json — 301 ze starych adresów weareconflict.com
// Szablony ?id= dostają tylko wspólne znaczniki; tytuł/canonical/JSON-LD ustawia src/scripts/seo.js w runtime.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (f) => import(pathToFileURL(path.join(ROOT, f)).href);
const { SITE, abs, metaText, ORG_LD, breadcrumbLD } = await load("src/data/site.js");
const { INDUSTRIES } = await load("src/data/industries.js");
const { PROBLEMS } = await load("src/data/problems.js");
const { CASES } = await load("src/data/cases.js");
const { SERVICE_PAGES, SERVICE_CATEGORIES, ALIASES } = await load("src/data/service-pages.js");
const { PARTNERS } = await load("src/data/partners.js");
const { LEGAL } = await load("src/data/legal.js");
const { POSTS } = await load("src/data/posts.js");

// --- strony statyczne: plik → okruszki (Home dodawany automatycznie), priorytet w sitemap ---
const STATIC = {
  "index.html":            { crumbs: [], priority: "1.0", home: true },
  "about.html":            { crumbs: [["About", "/about.html"]] },
  "approach.html":         { crumbs: [["Our approach", "/approach.html"]] },
  "outcome.html":          { crumbs: [["Outcome Engineering", "/outcome.html"]] },
  "services.html":         { crumbs: [["Services", "/services.html"]], priority: "0.9" },
  "problems.html":         { crumbs: [["Problems", "/problems.html"]] },
  "industries.html":       { crumbs: [["Industries", "/industries.html"]] },
  "showcase.html":         { crumbs: [["Showcase", "/showcase.html"]] },
  "success-stories.html":  { crumbs: [["Success Stories", "/success-stories.html"]] },
  "team.html":             { crumbs: [["Our team", "/team.html"]] },
  "team-spartan.html":     { crumbs: [["Team Spartan", "/team-spartan.html"]], priority: "0.9" },
  "partnerships.html":     { crumbs: [["Partnerships", "/partnerships.html"]] },
  "career.html":           { crumbs: [["Careers", "/career.html"]] },
  "blog.html":             { crumbs: [["Blog", "/blog.html"]] },
  "contact.html":          { crumbs: [["Contact", "/contact.html"]], priority: "0.9" },
  "404.html":              { noindex: true, nositemap: true },
  // szablony — runtime SEO (src/scripts/seo.js)
  "service.html": { template: true }, "service-category.html": { template: true }, "problem.html": { template: true },
  "industry.html": { template: true }, "case.html": { template: true }, "partner.html": { template: true }, "legal.html": { template: true }, "post.html": { template: true },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let changed = 0;
for (const [file, cfg] of Object.entries(STATIC)) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");
  // istniejący opis strony (tekst źródłowy) → do bloku; strona główna → opis witryny
  const oldDesc = html.match(/<meta name="description" content="([^"]*)"\s*\/?>/)?.[1];
  const title = (cfg.home ? `${SITE.name} — AI-Native Engineering` : html.match(/<title>([^<]*)<\/title>/)?.[1] || SITE.name).trim();
  const desc = metaText(cfg.home ? SITE.description : (oldDesc || SITE.description).replace(/&amp;/g, "&").replace(/&quot;/g, '"'));
  const pagePath = cfg.home ? "/" : "/" + file;
  const url = abs(pagePath);
  const img = abs(SITE.ogImage);

  html = html.replace(/\s*<meta name="description" content="[^"]*"\s*\/?>/, "");
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${SITE.lang}"`);

  const L = [
    `<meta name="description" content="${esc(desc)}" />`,
    `<meta name="robots" content="${cfg.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<meta name="theme-color" content="${SITE.themeColor}" />`,
  ];
  if (!cfg.template && !cfg.noindex) L.push(`<link rel="canonical" href="${url}" />`);
  L.push(
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
  );
  if (!cfg.template && !cfg.noindex) L.push(`<meta property="og:url" content="${url}" />`);
  L.push(
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE.name} — AI-Native Engineering" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  );
  if (!cfg.template && !cfg.noindex) {
    const graph = [ORG_LD];
    if (cfg.home) graph.push({ "@type": "WebSite", "@id": `${SITE.url}/#website`, url: SITE.url + "/", name: SITE.name, description: SITE.description, publisher: { "@id": `${SITE.url}/#org` }, inLanguage: SITE.lang });
    else graph.push(breadcrumbLD([["Home", "/"], ...cfg.crumbs]));
    graph.push({ "@type": file === "contact.html" ? "ContactPage" : file === "about.html" ? "AboutPage" : "WebPage", "@id": url, url, name: title, description: desc, isPartOf: { "@id": `${SITE.url}/#website` }, inLanguage: SITE.lang });
    L.push(`<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`);
  }
  const block = `<!-- seo:start (generowane: node tools/seo-build.mjs) -->\n  ${L.join("\n  ")}\n  <!-- seo:end -->`;
  if (html.includes("<!-- seo:start")) html = html.replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, block);
  else html = html.replace(/(<title>[^<]*<\/title>)/, `$1\n  ${block}`);
  fs.writeFileSync(fp, html);
  changed++;
}

// --- sitemap.xml ---
const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const [file, cfg] of Object.entries(STATIC)) {
  if (cfg.template || cfg.nositemap) continue;
  urls.push([cfg.home ? "/" : "/" + file, cfg.priority || "0.8"]);
}
SERVICE_CATEGORIES.forEach((c) => urls.push([`/service-category.html?id=${c.id}`, "0.8"]));
SERVICE_PAGES.forEach((p) => urls.push([`/service.html?id=${p.id}`, "0.7"]));
PROBLEMS.forEach((p) => urls.push([`/problem.html?id=${p.id}`, "0.7"]));
INDUSTRIES.forEach((p) => urls.push([`/industry.html?id=${p.id}`, "0.7"]));
CASES.forEach((p) => urls.push([`/case.html?id=${p.id}`, "0.7"]));
PARTNERS.forEach((p) => urls.push([`/partner.html?id=${p.id}`, "0.6"]));
// strony prawne trafiają do mapy dopiero, gdy mają treść (placeholder = noindex)
LEGAL.filter((d) => d.body.length && !d.draft).forEach((d) => urls.push([`/legal.html?id=${d.id}`, "0.2"]));
POSTS.filter((p) => !p.mock).forEach((p) => urls.push([`/post.html?id=${p.id}`, "0.6"]));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(([u, pr]) => `  <url><loc>${esc(abs(u))}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);

// --- robots.txt ---
fs.writeFileSync(path.join(ROOT, "robots.txt"),
`User-agent: *
Allow: /
# materiały robocze — nie publikować na produkcji
Disallow: /ref/
Disallow: /Podstrony/
Disallow: /tools/
Disallow: /content/

Sitemap: ${abs("/sitemap.xml")}
`);

// --- „What we build” na stronie głównej: wpiekany z src/data/service-pages.js ---
{
  const { whatWeBuildHTML } = await load("src/components/what-we-build.js");
  const f = path.join(ROOT, "index.html");
  const html = fs.readFileSync(f, "utf8");
  const next = html.replace(/(<!-- wwb:start[^>]*-->)[\s\S]*?(\n[ \t]*<!-- wwb:end -->)/, (_, a, b) => `${a}\n${whatWeBuildHTML()}${b}`);
  if (next !== html) fs.writeFileSync(f, next);
}

// --- 301 ze starych adresów weareconflict.com ---
const STATIC_OLD = {
  "/about/": "/about.html", "/approach/": "/approach.html", "/career/": "/career.html", "/contact/": "/contact.html",
  "/industries/": "/industries.html", "/outcome-engineering/": "/outcome.html", "/partnerships/": "/partnerships.html",
  "/problems/": "/problems.html", "/services/": "/services.html", "/services/_index-old/": "/services.html",
  "/showcase/": "/showcase.html", "/success-stories/": "/success-stories.html", "/team-spartan/": "/team-spartan.html",
  "/team-spartan/account-portal/": "/team-spartan.html",
  "/privacy/": "/legal.html?id=privacy", "/tos/": "/legal.html?id=tos",
};
const old = fs.readFileSync(path.join(ROOT, "ref/weareconflict/_lists/all.txt"), "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
const redirects = [], unmapped = [];
for (const u of old) {
  if (u === "/") continue;
  const p = u.split("/").filter(Boolean);
  let to = STATIC_OLD[u];
  if (!to && p.length === 2) {
    if (p[0] === "industries") to = `/industry.html?id=${p[1]}`;
    if (p[0] === "problems") to = `/problem.html?id=${p[1]}`;
    if (p[0] === "success-stories") to = `/case.html?id=${p[1]}`;
    if (p[0] === "partnerships") to = `/partner.html?id=${p[1]}`;
    if (p[0] === "services") { const c = SERVICE_CATEGORIES.find((c) => c.id === p[1] || c.legacy === p[1]); if (c) to = `/service-category.html?id=${c.id}`; }
  }
  if (!to && p[0] === "services" && p.length === 3) {
    const s = SERVICE_PAGES.find((x) => x.id === p[2] || x.id === ALIASES[p[2]]);
    if (s) to = `/service.html?id=${s.id}`;
  }
  if (to) redirects.push([u, to]); else unmapped.push(u);
}
// wariant bez końcowego „/” też przekierowujemy
const lines = redirects.flatMap(([from, to]) => [`${from} ${to} 301`, `${from.replace(/\/$/, "")} ${to} 301`]);
fs.writeFileSync(path.join(ROOT, "_redirects"), `# 301 — stare adresy weareconflict.com → nowa strona (generowane: node tools/seo-build.mjs)\n${lines.join("\n")}\n`);
fs.writeFileSync(path.join(ROOT, "redirects.json"), JSON.stringify(redirects.map(([from, to]) => ({ from, to, status: 301 })), null, 2) + "\n");

console.log(`head: ${changed} stron | sitemap: ${urls.length} URL | 301: ${redirects.length} | bez mapy: ${unmapped.join(", ") || "—"}`);

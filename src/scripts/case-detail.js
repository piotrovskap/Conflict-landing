// ===== Szablon case study: case.html?id=<slug> =====
// Treść 1:1 z src/data/cases.js (weareconflict.com/success-stories/*).
import { CASES } from "../data/cases.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const slug = new URLSearchParams(location.search).get("id");
const at = CASES.findIndex((x) => x.id === slug);

if (at < 0) {
  location.replace("success-stories.html");
} else {
  const c = CASES[at];
  setSEO({ title: `${c.title} — Success Stories`, description: c.intro, path: `/case.html?id=${c.id}`, type: "article", crumbs: [["Success Stories", "/success-stories.html"], [c.title, `/case.html?id=${c.id}`]], ld: { "@type": "Article", headline: c.title, description: [].concat(c.intro).join(" "), author: { "@id": "https://weareconflict.com/#org" }, publisher: { "@id": "https://weareconflict.com/#org" }, about: c.client } });
  contextCTAs({ topic: c.title, from: `case.html?id=${c.id}` });
  document.querySelector('meta[name="description"]')?.setAttribute("content", c.intro);

  $("c-num").textContent = pad(at + 1);
  $("c-title").textContent = c.title;
  $("c-intro").textContent = c.intro;
  $("c-client").textContent = c.client || "";
  $("c-count").textContent = `${pad(at + 1)} / ${pad(CASES.length)}`;

  if (c.parent) {
    const parent = document.querySelector(".sp-detail__parent");
    if (parent && c.parent.href) parent.href = c.parent.href;
    if (c.parent.label) $("c-parent-name").textContent = c.parent.label;
  }

  if (c.visuals?.items?.length) {
    const section = $("c-visuals");
    const grid = $("c-visuals-grid");
    section.hidden = false;
    $("c-visuals-title").textContent = c.visuals.heading || "Product views";
    if (c.visuals.intro) $("c-visuals-intro").textContent = c.visuals.intro;
    else $("c-visuals-intro").remove();

    c.visuals.items.forEach((item, i) => {
      const figure = document.createElement("figure");
      figure.className = `sp-case-visual${item.live ? " sp-case-visual--live" : ""}`;
      figure.dataset.reveal = "";
      figure.dataset.revealDelay = String(Math.min(i * 80, 240));

      const frame = document.createElement("span");
      frame.className = "sp-case-visual__frame";
      const iframe = document.createElement("iframe");
      iframe.src = item.src;
      iframe.title = item.title || "Product interface";
      iframe.loading = i === 0 ? "eager" : "lazy";
      iframe.tabIndex = -1;
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.setAttribute("aria-hidden", "true");
      frame.appendChild(iframe);

      const caption = document.createElement("figcaption");
      const title = document.createElement("strong");
      title.textContent = item.title || "Product interface";
      caption.appendChild(title);
      if (item.caption) {
        const text = document.createElement("span");
        text.textContent = item.caption;
        caption.appendChild(text);
      }

      figure.append(frame, caption);
      grid.appendChild(figure);
    });
  }

  // narracja: nagłówek po lewej, treść po prawej
  const body = $("c-sections");
  c.sections.forEach((s, i) => {
    const block = document.createElement("article");
    block.className = "sp-case-block";
    block.dataset.reveal = "";
    block.innerHTML = `<div class="sp-case-block__head"><span class="sp-case-block__num">${pad(i + 1)}</span><h2 class="sp-case-block__title"></h2></div><div class="sp-case-block__body"></div>`;
    block.querySelector(".sp-case-block__title").textContent = s.heading;
    const bd = block.querySelector(".sp-case-block__body");
    (s.text || []).forEach((t) => { const p = document.createElement("p"); p.className = "sp-lead"; p.textContent = t; bd.appendChild(p); });
    if (s.items?.length) {
      const ul = document.createElement("ul");
      ul.className = "sp-ctx__notes sp-case-block__list";
      s.items.forEach((t) => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
      bd.appendChild(ul);
    }
    body.appendChild(block);
  });

  // wyniki
  if (c.results?.stats?.length) {
    if (c.results.heading) $("c-results").textContent = c.results.heading;
    if (c.results.cta) {
      const label = $("c-results-link");
      label.firstChild.textContent = `${c.results.cta} `;
    }
    if (c.results.intro) $("c-results-intro").textContent = c.results.intro; else $("c-results-intro").remove();
    c.results.stats.forEach((r, i) => {
      const li = document.createElement("li");
      li.className = "sp-stat";
      li.dataset.reveal = "";
      li.dataset.revealDelay = String(i * 90);
      li.innerHTML = `<span class="sp-stat__value sp-glitch"></span><span class="sp-stat__desc"></span>`;
      li.querySelector(".sp-stat__value").textContent = r.value;
      li.querySelector(".sp-stat__value").dataset.text = r.value;
      li.querySelector(".sp-stat__desc").textContent = r.label;
      $("c-stats").appendChild(li);
    });
  } else {
    $("results").remove();
    document.querySelector('a[href="#results"]')?.remove();
  }

  if (c.quote) {
    $("c-quote-sec").hidden = false;
    $("c-quote").textContent = c.quote;
    if (c.quoteAuthor) $("c-quote-author").textContent = c.quoteAuthor; else $("c-quote-author").remove();
  } else {
    $("c-quote-sec").remove();
  }

  if (c.contact?.heading) $("c-contact").textContent = c.contact.heading;
  if (c.contact?.text) $("c-contact-text").textContent = c.contact.text; else $("c-contact-text").remove();
  const actions = $("c-contact-actions");
  (c.contact?.buttons?.length ? c.contact.buttons : ["Contact form", "Talk to an expert"]).forEach((label, i) => {
    const a = document.createElement("a");
    a.className = `btn ${i ? "btn--ghost" : "btn--primary"}`;
    a.href = "contact.html#contact-form";
    a.textContent = label;
    actions.appendChild(a);
  });

  const prev = CASES[(at - 1 + CASES.length) % CASES.length];
  const next = CASES[(at + 1) % CASES.length];
  $("c-prev").href = `case.html?id=${prev.id}`;
  $("c-prev-name").textContent = prev.title;
  $("c-next").href = `case.html?id=${next.id}`;
  $("c-next-name").textContent = next.title;
}

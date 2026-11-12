// ===== Szablon case study: case.html?id=<slug> =====
// Treść 1:1 z src/data/cases.js (weareconflict.com/success-stories/*).
import { CASES, FAMILIES } from "../data/cases.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";
import { icon } from "../components/icons.js";
import { loopDiagram } from "../components/diagram-loop.js";

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
// linki w treści: c.links = [["słowo", "https://…"], …] — pierwsze wystąpienie słowa w akapicie staje się linkiem (bez innerHTML)
const linkify = (el, text, links = []) => {
  const hit = links.map(([w, href]) => ({ w, href, i: text.indexOf(w) })).filter((x) => x.i >= 0).sort((a, b) => a.i - b.i)[0];
  if (!hit) { el.append(text); return; }
  const a = document.createElement("a");
  a.href = hit.href;
  a.textContent = hit.w;
  a.className = "sp-inline-link";
  if (/^https?:/.test(hit.href)) { a.target = "_blank"; a.rel = "noopener"; }
  el.append(text.slice(0, hit.i), a);
  linkify(el, text.slice(hit.i + hit.w.length), links.filter((l) => l[0] !== hit.w));
};
// okno aplikacji (pasek z kropkami + zrzut) — wspólne dla hero i sekcji
const windowFrame = (src, alt, eager) => {
  const win = document.createElement("span");
  win.className = "sp-case-window";
  win.innerHTML = `<span class="sp-case-window__bar" aria-hidden="true"><i></i><i></i><i></i></span>`;
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "";
  img.loading = eager ? "eager" : "lazy";
  img.decoding = "async";
  win.appendChild(img);
  return win;
};
const slug = new URLSearchParams(location.search).get("id");
const at = CASES.findIndex((x) => x.id === slug);

if (at < 0) {
  location.replace("success-stories.html");
} else {
  const c = CASES[at];
  // SEO: krótki meta description (≤160 znaków) jeśli podany, słowa kluczowe i obraz w schemacie Article
  const metaDesc = c.metaDescription || [].concat(c.intro).join(" ");
  const ldArticle = { "@type": "Article", headline: c.title, description: metaDesc, author: { "@id": "https://weareconflict.com/#org" }, publisher: { "@id": "https://weareconflict.com/#org" }, about: c.client };
  if (c.keywords?.length) ldArticle.keywords = c.keywords.join(", ");
  if (c.hero?.image) ldArticle.image = new URL(c.hero.image, "https://weareconflict.com/").href;
  setSEO({ title: `${c.title} — Success Stories`, description: metaDesc, image: c.hero?.image, path: `/case.html?id=${c.id}`, type: "article", crumbs: [["Success Stories", "/success-stories.html"], [c.title, `/case.html?id=${c.id}`]], ld: ldArticle });
  contextCTAs({ topic: c.title, from: `case.html?id=${c.id}` });
  document.querySelector('meta[name="description"]')?.setAttribute("content", metaDesc);

  $("c-num").textContent = pad(at + 1);
  $("c-title").textContent = c.title;
  $("c-intro").textContent = c.intro;
  $("c-client").textContent = c.client || "";
  $("c-count").textContent = `${pad(at + 1)} / ${pad(CASES.length)}`;

  if (c.hero?.image) {
    const side = document.querySelector(".sp-hero__side");
    side.removeAttribute("aria-hidden");
    side.classList.add("sp-case-hero-shot");
    side.replaceChildren(windowFrame(c.hero.image, c.hero.alt, true));
  }

  // pasek kluczowych faktów pod hero
  if (c.facts?.length) {
    const dl = document.createElement("dl");
    dl.className = "sp-case-facts";
    dl.setAttribute("aria-label", "Project facts");
    c.facts.forEach(([k, v, ic], i) => {
      const d = document.createElement("div");
      d.dataset.reveal = "";
      d.dataset.revealDelay = String(i * 60);
      d.innerHTML = `${icon(ic)}<dt></dt><dd></dd>`;
      d.querySelector("dt").textContent = k;
      d.querySelector("dd").textContent = v;
      dl.appendChild(d);
    });
    document.querySelector(".sp-page-case .sp-hero").after(dl);
  }

  // duże liczby — przed narracją
  if (c.highlights?.length) {
    const sec = document.createElement("section");
    sec.className = "sp-case-highlights";
    sec.setAttribute("aria-label", "Key numbers");
    c.highlights.forEach((h, i) => {
      const d = document.createElement("div");
      d.className = "sp-case-highlight";
      d.dataset.reveal = "";
      d.dataset.revealDelay = String(i * 90);
      d.innerHTML = `${icon(h.icon)}<span class="sp-case-highlight__value sp-glitch"></span><span class="sp-case-highlight__label"></span>`;
      d.querySelector(".sp-case-highlight__value").textContent = h.value;
      d.querySelector(".sp-case-highlight__value").dataset.text = h.value;
      d.querySelector(".sp-case-highlight__label").textContent = h.label;
      sec.appendChild(d);
    });
    $("c-sections").before(sec);
  }

  if (c.parent) {
    const parent = document.querySelector(".sp-detail__parent");
    if (parent && c.parent.href) parent.href = c.parent.href;
    if (c.parent.label) $("c-parent-name").textContent = c.parent.label;
  }

  const usedImages = new Set([c.hero?.image, ...(c.sections || []).map((x) => x.image)].filter(Boolean));
  if (c.visuals?.items) c.visuals.items = c.visuals.items.filter((it) => !it.image || !usedImages.has(it.image));
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
      if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title || "DAS product interface";
        img.loading = i === 0 ? "eager" : "lazy";
        frame.appendChild(img);
      } else {
        const iframe = document.createElement("iframe");
        iframe.src = item.src;
        iframe.title = item.title || "Product interface";
        iframe.loading = i === 0 ? "eager" : "lazy";
        iframe.tabIndex = -1;
        iframe.setAttribute("sandbox", "allow-scripts");
        iframe.setAttribute("aria-hidden", "true");
        frame.appendChild(iframe);
      }

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
  let mediaIdx = 0;
  c.sections.forEach((s, i) => {
    const block = document.createElement("article");
    block.className = "sp-case-block" + (s.image ? ` sp-case-block--media${mediaIdx++ % 2 ? " sp-case-block--flip" : ""}` : "");
    block.dataset.reveal = "";
    block.innerHTML = `<div class="sp-case-block__head"><span class="sp-case-block__num">${pad(i + 1)}</span><h2 class="sp-case-block__title"></h2></div><div class="sp-case-block__body"></div>`;
    block.querySelector(".sp-case-block__title").textContent = s.heading;
    const bd = block.querySelector(".sp-case-block__body");
    (s.text || []).forEach((t) => { const p = document.createElement("p"); p.className = "sp-lead"; linkify(p, t, c.links); bd.appendChild(p); });
    const items = (s.items || []).filter((t) => t && t.trim());
    if (items.length) {
      const ul = document.createElement("ul");
      ul.className = "sp-case-cards";
      items.forEach((t, k) => {
        const li = document.createElement("li");
        li.className = "sp-case-card";
        li.dataset.reveal = "";
        li.dataset.revealDelay = String(k * 80);
        li.innerHTML = `<span class="sp-case-card__num">${pad(k + 1)}</span><p></p>`;
        li.querySelector("p").textContent = t;
        ul.appendChild(li);
      });
      bd.appendChild(ul);
    }
    if (s.diagram === "calliope-loop") {
      block.classList.add("sp-case-block--diagram");
      const fig = document.createElement("figure");
      fig.className = "sp-case-diagram";
      fig.dataset.reveal = "";
      fig.innerHTML = `<div class="sp-case-diagram__scroll">${loopDiagram(c.id)}</div><figcaption>Build with Calliope AI, run on Astrolift, govern with Zentinelle — one private perimeter.</figcaption>`;
      block.appendChild(fig);
    }
    if (s.image) {
      const figure = document.createElement("figure");
      figure.className = "sp-case-media";
      figure.dataset.reveal = "";
      figure.appendChild(windowFrame(s.image, s.imageAlt || s.heading));
      block.appendChild(figure);
    }
    body.appendChild(block);
  });

  // problem statements: zwalidowane (karty z wierszami) + kandydaci + faza
  if (c.problems?.validated?.length) {
    const P = c.problems;
    const sec = document.createElement("section");
    sec.className = "sp-case-ps";
    sec.setAttribute("aria-labelledby", "c-ps-title");
    sec.innerHTML = `<h2 class="sp-h2" id="c-ps-title" data-reveal></h2><div class="sp-case-ps__grid"></div>`;
    sec.querySelector("h2").textContent = P.heading || "Problem statements";
    const grid = sec.querySelector(".sp-case-ps__grid");
    P.validated.forEach((v, i) => {
      const card = document.createElement("article");
      card.className = "sp-case-ps__card";
      card.dataset.reveal = "";
      card.dataset.revealDelay = String(i * 100);
      card.innerHTML = `<header><span class="sp-case-ps__id"></span><span class="sp-case-ps__tag">${icon("check")}Core need</span></header><h3 class="sp-case-ps__title"></h3><dl></dl>`;
      card.querySelector(".sp-case-ps__id").textContent = v.id;
      card.querySelector(".sp-case-ps__title").textContent = v.title;
      const dl = card.querySelector("dl");
      v.rows.forEach(([k, t]) => {
        const row = document.createElement("div");
        row.className = "sp-case-ps__row" + (/open/i.test(k) ? " sp-case-ps__row--open" : "");
        const ROW_ICON = { "need": "target", "what we built": "cube", "what is built": "cube", "result": "check", "proof": "check" };
        row.innerHTML = `<dt>${icon(ROW_ICON[k.toLowerCase()])}<span></span></dt><dd></dd>`;
        row.querySelector("dt span").textContent = k;
        row.querySelector("dd").textContent = t;
        dl.appendChild(row);
      });
      grid.appendChild(card);
    });
    if (P.candidates?.length) {
      const wrap = document.createElement("div");
      wrap.className = "sp-case-ps__cands";
      wrap.innerHTML = `<h3 class="sp-case-ps__sub" data-reveal></h3><ol></ol>`;
      wrap.querySelector("h3").textContent = P.candidatesHeading || "Candidate needs";
      P.candidates.forEach(([id, t, ic], i) => {
        const li = document.createElement("li");
        li.dataset.reveal = "";
        li.dataset.revealDelay = String(i * 60);
        li.innerHTML = `<div class="sp-case-ps__cand-top">${id ? '<span class="sp-case-ps__id sp-case-ps__id--ghost"></span>' : ""}${icon(ic)}</div><p></p>`;
        if (id) li.querySelector("span").textContent = id;
        li.querySelector("p").textContent = t;
        wrap.querySelector("ol").appendChild(li);
      });
      sec.appendChild(wrap);
    }
    if (P.phase) {
      const ph = document.createElement("div");
      ph.className = "sp-case-ps__phase";
      ph.dataset.reveal = "";
      ph.innerHTML = `<h3 class="sp-case-ps__sub">${icon("flag")}<span></span></h3>`;
      ph.querySelector("h3 span").textContent = P.phase.heading;
      (P.phase.text || []).forEach((t) => { const p = document.createElement("p"); p.className = "sp-lead"; p.textContent = t; ph.appendChild(p); });
      sec.appendChild(ph);
    }
    body.after(sec);
  }

  // wyniki
  if (c.results?.stats?.length || c.results?.intro) {
    if (c.results.heading) $("c-results").textContent = c.results.heading;
    if (c.results.cta) {
      const label = $("c-results-link");
      label.firstChild.textContent = `${c.results.cta} `;
    }
    if (c.results.intro) $("c-results-intro").textContent = c.results.intro; else $("c-results-intro").remove();
    c.results.stats?.forEach((r, i) => {
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

  // FAQ (+ schema FAQPage dla wyszukiwarek i asystentów AI)
  if (c.faq?.length) {
    const sec = document.createElement("section");
    sec.className = "sp-case-faq";
    sec.setAttribute("aria-labelledby", "c-faq-title");
    sec.innerHTML = `<h2 class="sp-h2" id="c-faq-title" data-reveal>Questions &amp; answers</h2><div class="sp-case-faq__list"></div>`;
    const list = sec.querySelector(".sp-case-faq__list");
    c.faq.forEach(([q, a], i) => {
      const d = document.createElement("details");
      d.className = "sp-case-faq__item";
      d.dataset.reveal = "";
      d.dataset.revealDelay = String(i * 60);
      if (i === 0) d.open = true;
      d.innerHTML = `<summary>${icon("help")}<span></span><i aria-hidden="true"></i></summary><p></p>`;
      d.querySelector("summary span").textContent = q;
      d.querySelector("p").textContent = a;
      list.appendChild(d);
    });
    document.querySelector(".sp-page-case .sp-contact").before(sec);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
    document.head.appendChild(ld);
  }

  // rodzina produktów (np. Calliope AI: Build · Run · Govern) — wzajemne linki między case study
  const fam = c.family && FAMILIES?.[c.family];
  if (fam?.items?.length) {
    const sec = document.createElement("section");
    sec.className = "sp-case-family";
    sec.setAttribute("aria-labelledby", "c-family-title");
    sec.innerHTML = `<div class="sp-case-family__head"><h2 class="sp-h2" id="c-family-title" data-reveal></h2><p class="sp-lead" data-reveal data-reveal-delay="80"></p></div><div class="sp-case-family__grid"></div>`;
    sec.querySelector("h2").textContent = fam.heading;
    sec.querySelector(".sp-lead").textContent = fam.intro || "";
    const grid = sec.querySelector(".sp-case-family__grid");
    fam.items.forEach((it, i) => {
      const here = it.id === c.id;
      const card = document.createElement(here ? "div" : "a");
      card.className = "sp-case-family__card" + (here ? " is-here" : "");
      if (!here) card.href = `case.html?id=${it.id}`;
      card.dataset.reveal = "";
      card.dataset.revealDelay = String(i * 90);
      card.innerHTML = `<span class="sp-case-family__role"></span><strong></strong><p></p><span class="sp-case-family__cta"></span>`;
      card.querySelector(".sp-case-family__role").textContent = it.role;
      card.querySelector("strong").textContent = it.name;
      card.querySelector("p").textContent = it.text;
      card.querySelector(".sp-case-family__cta").textContent = here ? "You are here" : "Read the case study →";
      grid.appendChild(card);
    });
    const cta = document.createElement("div");
    cta.className = "sp-case-family__cta-box";
    cta.dataset.reveal = "";
    cta.innerHTML = `<div><strong></strong><p>Talk to our team — we’ll show you how it fits your stack.</p></div><a class="btn btn--primary" href="contact.html#contact-form">Talk to our team <span class="btn__arrow" aria-hidden="true">→</span></a>`;
    cta.querySelector("strong").textContent = `Interested in ${c.client}?`;
    sec.appendChild(cta);
    document.querySelector(".sp-page-case .sp-contact").before(sec);
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

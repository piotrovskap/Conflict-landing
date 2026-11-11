// ===== Szablon strony problemu: problem.html?id=<slug> =====
// Jedna strona, 22 adresy — treść 1:1 z src/data/problems.js.
import { PROBLEMS } from "../data/problems.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";

const $ = (id) => document.getElementById(id);
const slug = new URLSearchParams(location.search).get("id");
const at = PROBLEMS.findIndex((x) => x.id === slug);
const li = (text, cls) => { const el = document.createElement("li"); if (cls) el.className = cls; el.textContent = text; return el; };

if (at < 0) {
  location.replace("problems.html");
} else {
  const p = PROBLEMS[at];
  setSEO({ title: `${p.name} — Problems`, description: p.intro, path: `/problem.html?id=${p.id}`, crumbs: [["Problems", "/problems.html"], [p.name, `/problem.html?id=${p.id}`]] });
  contextCTAs({ topic: p.name, from: `problem.html?id=${p.id}` });
  document.querySelector('meta[name="description"]')?.setAttribute("content", p.intro.join(" "));

  $("p-title").textContent = p.title;
  // wstęp: 1+ akapitów (pierwszy w hero, kolejne pod nim, w tej samej kolumnie)
  const intro = $("p-intro");
  intro.textContent = p.intro[0];
  let last = intro;
  p.intro.slice(1).forEach((t) => {
    const el = document.createElement("p");
    el.className = "sp-hero__lead sp-hero__lead--2";
    el.textContent = t;
    last.after(el);
    last = el;
  });
  $("p-cta").href = "contact.html#contact-form";

  // terminal: objawy jako wykryte usterki (tekst objawów 1:1)
  $("p-term-host").textContent = `conflict@${p.id}`;
  const screen = $("p-term");
  const caret = screen.querySelector(".sp-term__caret");
  p.symptoms.forEach((s) => {
    const line = document.createElement("span");
    line.className = "sp-term__line sp-term__line--warn";
    line.textContent = `✗ ${s}`;
    screen.insertBefore(line, caret);
  });

  p.symptoms.forEach((s) => $("p-symptoms").appendChild(li(s)));
  p.help.forEach((s) => $("p-help").appendChild(li(s)));

  $("p-quote").textContent = p.quote;

  const call = $("p-callus");
  p.callUs.forEach((t, i) => {
    const item = document.createElement("li");
    item.className = "sp-caps__item";
    item.dataset.reveal = "";
    item.dataset.revealDelay = String((i % 4) * 70);
    item.innerHTML = `<div class="sp-cap sp-cap--static"><span class="sp-cap__num">${String(i + 1).padStart(2, "0")}</span><h3 class="sp-cap__title"></h3></div>`;
    item.querySelector(".sp-cap__title").textContent = t;
    call.appendChild(item);
  });

  if (p.contact?.heading) $("p-contact").textContent = p.contact.heading;
  if (p.contact?.text) $("p-contact-text").textContent = p.contact.text;
  else $("p-contact-text").remove();
  const actions = $("p-contact-actions");
  ["Contact form", "Talk to an expert"].forEach((label, i) => {
    const a = document.createElement("a");
    a.className = `btn ${i ? "btn--ghost" : "btn--primary"}`;
    a.href = "contact.html#contact-form";
    a.textContent = label;
    actions.appendChild(a);
  });

  const prev = PROBLEMS[(at - 1 + PROBLEMS.length) % PROBLEMS.length];
  const next = PROBLEMS[(at + 1) % PROBLEMS.length];
  $("p-prev").href = `problem.html?id=${prev.id}`;
  $("p-prev-name").textContent = prev.name;
  $("p-next").href = `problem.html?id=${next.id}`;
  $("p-next-name").textContent = next.name;
}

// ===== Szablon strony branży: industry.html?id=<slug> =====
// Jedna strona, 7 adresów — treść 1:1 z src/data/industries.js.
import { INDUSTRIES, ICONS } from "../data/industries.js";
import { setSEO } from "./seo.js";
import { contextCTAs } from "./cta-context.js";

const $ = (id) => document.getElementById(id);
const slug = new URLSearchParams(location.search).get("id");
const at = INDUSTRIES.findIndex((x) => x.id === slug);

if (at < 0) {
  location.replace("industries.html");
} else {
  const ind = INDUSTRIES[at];
  setSEO({ title: `${ind.title} — Industries`, description: ind.intro, path: `/industry.html?id=${ind.id}`, crumbs: [["Industries", "/industries.html"], [ind.title, `/industry.html?id=${ind.id}`]] });
  contextCTAs({ topic: ind.title, from: `industry.html?id=${ind.id}` });
  document.querySelector('meta[name="description"]')?.setAttribute("content", ind.intro);

  $("i-title").textContent = ind.title;
  $("i-intro").textContent = ind.intro;
  $("i-icon").innerHTML = ICONS[ind.icon] || "";
  $("i-num").textContent = String(at + 1).padStart(2, "0");
  $("i-total").textContent = String(INDUSTRIES.length).padStart(2, "0");

  // karty „Where we shine" — te same co na Services, bez linku
  const list = $("i-items");
  ind.shine.forEach((it, i) => {
    const li = document.createElement("li");
    li.className = "sp-caps__item";
    li.dataset.reveal = "";
    li.dataset.revealDelay = String((i % 3) * 80);
    li.innerHTML = `<div class="sp-cap sp-cap--static"><span class="sp-cap__num">${String(i + 1).padStart(2, "0")}</span><h3 class="sp-cap__title"></h3>${it.desc ? '<p class="sp-cap__desc"></p>' : ""}</div>`;
    li.querySelector(".sp-cap__title").textContent = it.title;
    if (it.desc) li.querySelector(".sp-cap__desc").textContent = it.desc;
    list.appendChild(li);
  });
  if (!ind.shine.some((x) => x.desc)) list.classList.add("sp-caps--compact");

  // cytat — words-reveal w subpage.js dzieli go na słowa (ten skrypt ładuje się wcześniej)
  $("i-quote").textContent = ind.quote;

  $("i-contact").textContent = ind.contact.heading;
  $("i-contact-text").textContent = ind.contact.text;

  const prev = INDUSTRIES[(at - 1 + INDUSTRIES.length) % INDUSTRIES.length];
  const next = INDUSTRIES[(at + 1) % INDUSTRIES.length];
  $("i-prev").href = `industry.html?id=${prev.id}`;
  $("i-prev-name").textContent = prev.title;
  $("i-next").href = `industry.html?id=${next.id}`;
  $("i-next-name").textContent = next.title;
}

// ---------- intro2 + case study (tylko gdy branża je ma) ----------
{
  const ind = INDUSTRIES.find((x) => x.id === slug);
  if (ind?.intro2) { const p = $("i-intro2"); p.textContent = ind.intro2; p.hidden = false; }
  if (ind?.story) {
    const st = ind.story;
    $("i-story").hidden = false;
    $("i-story-title").textContent = st.heading;
    st.text.forEach((t, i) => {
      const p = document.createElement("p");
      p.className = "sp-lead";
      p.dataset.reveal = "";
      p.dataset.revealDelay = String(i * 80);
      p.textContent = t;
      $("i-story-text").appendChild(p);
    });
    st.steps.forEach((s, i) => {
      const li = document.createElement("li");
      li.className = "sp-frame__step";
      li.dataset.reveal = "";
      li.dataset.revealDelay = String(i * 120);
      li.innerHTML = `<span class="sp-frame__dot" aria-hidden="true"></span><span class="sp-frame__num">${String(i + 1).padStart(2, "0")}</span><h3></h3><p></p>`;
      li.querySelector("h3").textContent = s.title;
      li.querySelector("p").textContent = s.desc;
      $("i-story-steps").appendChild(li);
    });
    $("i-story-outro").textContent = st.outro;
    st.results.forEach((r, i) => {
      const li = document.createElement("li");
      li.className = "sp-stat";
      li.dataset.reveal = "";
      li.dataset.revealDelay = String(i * 90);
      li.innerHTML = `<span class="sp-stat__value sp-glitch"></span><span class="sp-stat__desc"></span>`;
      li.querySelector(".sp-stat__value").textContent = r.value;
      li.querySelector(".sp-stat__value").dataset.text = r.value;
      li.querySelector(".sp-stat__desc").textContent = r.desc;
      $("i-story-results").appendChild(li);
    });
  }
}

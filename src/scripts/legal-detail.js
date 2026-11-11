// ===== Strony prawne: legal.html?id=privacy|tos =====
import { LEGAL } from "../data/legal.js";
import { setSEO } from "./seo.js";
import { renderProse, readingSpy, rich } from "../components/prose.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const at = LEGAL.findIndex((x) => x.id === new URLSearchParams(location.search).get("id"));

if (at < 0) location.replace("legal.html?id=privacy");
else {
  const d = LEGAL[at];
  const pending = !d.body.length;
  const draft = Boolean(d.draft);
  setSEO({ title: d.title, description: d.title, path: `/legal.html?id=${d.id}`, noindex: pending || draft, crumbs: [[d.title, `/legal.html?id=${d.id}`]] });
  $("lg-title").textContent = d.title;
  $("lg-file").textContent = `conflict@legal:${d.file}`;
  if (d.updated) $("lg-updated").replaceWith(rich("span", null, `Last updated: ${d.updated}`)); else $("lg-updated").remove();

  const body = $("lg-body"), toc = $("lg-toc");
  const heads = renderProse(body, toc, d.body);
  if (pending) $("lg-pending").hidden = false;
  else if (draft) { const b = $("lg-draft"); b.hidden = false; body.prepend(b); }

  // terminal: „cat" pliku → spis rozdziałów albo status
  const screen = $("lg-term"), caret = screen.querySelector(".sp-term__caret");
  [`$ cat ${d.file} | grep "^##"`, ...(pending ? ["… awaiting final text"] : heads.map((h) => `## ${h.textContent}`)), ...(draft ? [`! ${body.querySelectorAll(".sp-tbc").length} gaps to confirm`] : [])]
    .forEach((t) => screen.insertBefore(el("span", "sp-term__line", t), caret));

  // druga strona prawna
  const other = LEGAL[(at + 1) % LEGAL.length];
  $("lg-other").href = `legal.html?id=${other.id}`;
  $("lg-other-name").textContent = other.title;

  readingSpy(body, toc, heads, $("lg-readbar"));
}

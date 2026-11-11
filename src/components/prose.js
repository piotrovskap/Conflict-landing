// ===== Reużywalny komponent: treść długa (blog, strony prawne) =====
// renderProse(body, toc, blocks, {rich}) — bloki {p|h2|h3|quote|list|olist|code|hr|table|img|video|timeline} → .sp-prose, h2 trafiają do spisu treści.
// readingSpy(body, toc, heads, bar) — pasek postępu czytania + aktywny rozdział (scroll-spy).
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
// tekst z lukami „[TBC: …]” → węzły tekstowe + <mark class="sp-tbc">
const rich = (tag, cls, text) => {
  const e = el(tag, cls);
  String(text).split(/(\[TBC:[^\]]*\])/).forEach((part) => {
    if (!part) return;
    if (part.startsWith("[TBC:")) e.appendChild(el("mark", "sp-tbc", part.slice(5, -1).trim()));
    else e.appendChild(document.createTextNode(part));
  });
  return e;
};
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export { rich };
// opts.rich = true → teksty bloków to zaufany, oczyszczony przy imporcie inline HTML (strong/em/code/a/br)
export function renderProse(body, toc, blocks, opts = {}) {
  const heads = [];
  const txt = (tag, cls, t) => { if (!opts.rich) return rich(tag, cls, t); const e = el(tag, cls); e.innerHTML = t; return e; };
  blocks.forEach((b) => {
    if (b.p) body.appendChild(txt("p", null, b.p));
    else if (b.h2) {
      const h = txt("h2", null, b.h2); h.id = slug(h.textContent) || `s-${heads.length + 1}`; body.appendChild(h); heads.push(h);
      if (toc) { const li = el("li"); const a = el("a", null, h.textContent); a.href = `#${h.id}`; li.appendChild(a); toc.appendChild(li); }
    } else if (b.h3) body.appendChild(txt("h3", null, b.h3));
    else if (b.quote) { const q = el("blockquote", "sp-prose__quote", b.quote); q.dataset.wordsReveal = ""; body.appendChild(q); }
    else if (b.list || b.olist) { const ul = el(b.olist ? "ol" : "ul"); (b.list || b.olist).forEach((t) => ul.appendChild(txt("li", null, t))); body.appendChild(ul); }
    else if (b.code) { const pre = el("pre", "sp-prose__code"); pre.dataset.lang = b.lang || "code"; pre.appendChild(el("code", null, b.code)); body.appendChild(pre); }
    else if (b.hr) body.appendChild(el("hr", "sp-prose__hr"));
    else if (b.table) {
      const wrap = el("div", "sp-prose__table"); const t = el("table");
      if (b.table.head?.length) { const tr = el("tr"); b.table.head.forEach((c) => tr.appendChild(txt("th", null, c))); t.appendChild(el("thead")).appendChild(tr); }
      const tb = el("tbody"); b.table.rows.forEach((r) => { const tr = el("tr"); r.forEach((c) => tr.appendChild(txt("td", null, c))); tb.appendChild(tr); }); t.appendChild(tb);
      wrap.appendChild(t); body.appendChild(wrap);
    } else if (b.img) {
      const fig = el("figure", "sp-prose__fig"); const img = el("img"); img.src = b.img; img.alt = b.alt || ""; img.loading = "lazy"; img.decoding = "async";
      fig.appendChild(img); body.appendChild(fig);
    } else if (b.video) {
      // YouTube: bez osadzania (cookies Google) — link do filmu w nowej karcie
      const a = el("a", "sp-prose__video"); a.href = `https://www.youtube.com/watch?v=${encodeURIComponent(b.video)}`; a.target = "_blank"; a.rel = "noopener";
      a.append(el("span", "sp-prose__play"), el("span", "sp-prose__video-t", b.title || "Watch the video"), el("span", "sp-prose__video-s", "YouTube ↗"));
      a.querySelector(".sp-prose__play").setAttribute("aria-hidden", "true");
      body.appendChild(a);
    } else if (b.timeline) {
      const ol = el("ol", "sp-prose__timeline");
      b.timeline.forEach((t) => {
        const li = el("li");
        if (t.badge) li.appendChild(el("span", "sp-prose__tl-badge", t.badge));
        li.append(el("span", "sp-prose__tl-date", t.date), el("strong", "sp-prose__tl-title", t.title), el("p", null, t.desc));
        ol.appendChild(li);
      });
      body.appendChild(ol);
    }
  });
  if (toc && !heads.length) toc.closest(".sp-toc")?.remove();
  return heads;
}

export function readingSpy(body, toc, heads, bar) {
  const links = toc ? [...toc.querySelectorAll("a")] : [];
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = body.getBoundingClientRect();
    const total = r.height - innerHeight * 0.6;
    const pr = Math.max(0, Math.min(1, (innerHeight * 0.3 - r.top) / Math.max(1, total)));
    if (bar) bar.style.transform = `scaleX(${pr.toFixed(3)})`;
    let cur = -1;
    heads.forEach((h, i) => { if (h.getBoundingClientRect().top < innerHeight * 0.35) cur = i; });
    links.forEach((a, i) => a.classList.toggle("is-active", i === cur));
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

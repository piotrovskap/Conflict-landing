// ===== Artykuł bloga: post.html?id=<slug> =====
// Indeks: src/data/posts.js; treść: src/data/posts/<id>.json (ładowana na żądanie).
// Spis treści z nagłówków h2 + scroll-spy i pasek postępu czytania (src/components/prose.js).
import { POSTS, readTime, fmtDate, thumbHTML } from "../data/posts.js";
import { setSEO } from "./seo.js";
import { renderProse, readingSpy } from "../components/prose.js";
import { postCard } from "../components/post-card.js";
import { abs } from "../data/site.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
const at = posts.findIndex((p) => p.id === new URLSearchParams(location.search).get("id"));

if (at < 0) {
  location.replace("blog.html");
} else {
  const p = posts[at];
  setSEO({
    title: p.title, description: p.excerpt, path: `/post.html?id=${p.id}`, type: "article", image: p.cover ? `/${p.cover}` : undefined,
    crumbs: [["Blog", "/blog.html"], [p.title, `/post.html?id=${p.id}`]],
    ld: { "@type": "BlogPosting", headline: p.title, description: p.excerpt, datePublished: p.date, image: p.cover ? abs(`/${p.cover}`) : undefined,
      author: p.author === "CONFLICT" ? { "@id": "https://weareconflict.com/#org" } : { "@type": "Person", name: p.author }, publisher: { "@id": "https://weareconflict.com/#org" } },
  });

  $("a-cat").textContent = "Blog";
  $("a-title").textContent = p.title;
  $("a-excerpt").textContent = p.excerpt;
  $("a-date").textContent = fmtDate(p.date);
  $("a-read").textContent = `${readTime(p)} min read`;
  $("a-author").textContent = p.author;
  $("a-cover").innerHTML = thumbHTML(p, "21 / 9", p.cover);
  $("a-cover").querySelector("img")?.setAttribute("alt", p.title);
  $("a-cover").querySelector("img")?.removeAttribute("loading");

  // terminal: „cat" pliku (synchronicznie — animacja pisania w subpage.js zbiera linie przy starcie)
  $("a-file").textContent = `conflict@blog:${p.id.slice(0, 18)}…`;
  const screen = $("a-term");
  const caret = screen.querySelector(".sp-term__caret");
  [`$ cat ${p.id}.md | head -1`, `# ${p.title}`, `$ stat --date ${p.id}.md`, fmtDate(p.date), `✓ ${readTime(p)} min read`].forEach((t) => screen.insertBefore(el("span", "sp-term__line", t), caret));

  // „Keep reading” — 3 kolejne wpisy (starsze; na końcu listy zawija)
  const rel = $("a-related");
  [1, 2, 3].map((k) => posts[(at + k) % posts.length]).forEach((x) => { const li = el("li"); li.appendChild(postCard(x)); rel.appendChild(li); });

  const prev = posts[(at - 1 + posts.length) % posts.length];
  const next = posts[(at + 1) % posts.length];
  $("a-prev").href = `post.html?id=${prev.id}`; $("a-prev-name").textContent = prev.title;
  $("a-next").href = `post.html?id=${next.id}`; $("a-next-name").textContent = next.title;

  // treść
  const body = $("a-body");
  const toc = $("a-toc");
  body.setAttribute("aria-busy", "true");
  fetch(`src/data/posts/${p.id}.json`)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((blocks) => {
      const heads = renderProse(body, toc, blocks, { rich: true });
      body.removeAttribute("aria-busy");
      readingSpy(body, toc, heads, $("p-readbar"));
      // wejście z #kotwicą rozdziału
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    })
    .catch(() => {
      body.removeAttribute("aria-busy");
      body.appendChild(el("p", null, "This article could not be loaded. Please refresh the page."));
    });
}

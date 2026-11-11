// ===== Reużywalny komponent: karta wpisu bloga (lista na blog.html, „Keep reading” na post.html) =====
import { readTime, fmtDate, thumbHTML } from "../data/posts.js";

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

export function postCard(p, { featured = false, cta = "Read" } = {}) {
  const a = el("a", `sp-post${featured ? " sp-post--featured" : ""}`);
  a.href = `post.html?id=${p.id}`;
  a.dataset.search = `${p.title} ${p.excerpt} ${p.author}`.toLowerCase();
  const meta = el("span", "sp-post__meta");
  meta.append(el("b", null, fmtDate(p.date)), el("span", null, `${readTime(p)} min read`));
  a.insertAdjacentHTML("beforeend", thumbHTML(p));
  a.append(meta, el("h3", "sp-post__title", p.title), el("p", "sp-post__excerpt", p.excerpt));
  const go = el("span", "sp-post__go", cta);
  go.appendChild(el("em", null, "→")).setAttribute("aria-hidden", "true");
  a.appendChild(go);
  return a;
}

# ===== Import bloga conflict.blog → nowa strona =====
# Użycie: python3 tools/blog-import.py <katalog z zapisanymi HTML wpisów conflict.blog>
#   (HTML: https://conflict.blog/blog/<slug>/ zapisane jako <slug>.html; okładki w materials/blog/<slug>.*)
# Wynik:  src/data/posts.js (indeks: tytuł, opis, data, autor, okładka, czas czytania)
#         src/data/posts/<slug>.json (treść wpisu jako bloki: p/h2/h3/list/olist/code/table/hr/img/video/timeline)
# Treść 1:1 ze źródła; inline HTML ograniczony do strong/em/code/a/br. Linki do weareconflict.com → nowe adresy (redirects.json).
import re, json, glob, html, sys, os
from html.parser import HTMLParser

INLINE = {"strong": "strong", "b": "strong", "em": "em", "i": "em", "code": "code", "a": "a", "br": "br"}

def map_href(h):
    h = html.unescape(h or "").strip()
    m = re.match(r"https?://conflict\.blog/blog/([a-z0-9-]+)/?$", h) or re.match(r"^/blog/([a-z0-9-]+)/?$", h)
    if m: return f"post.html?id={m.group(1)}", False
    if re.match(r"https?://(www\.)?weareconflict\.com/?$", h): return "index.html", False
    return h, h.startswith("http")

class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.blocks = []; s.cur = None; s.kind = None; s.stack = []; s.list = None; s.pre = None
        s.table = None; s.row = None; s.cell = None; s.author = None; s.skip = 0; s.h6 = None
        s.tl = None; s.tlf = None; s.depth_tl = 0; s.video = None; s.img = []
    def flush(s):
        if s.cur is None: return
        t = re.sub(r"\s+", " ", s.cur).strip()
        if t and s.kind:
            if s.kind == "li": s.list["items"].append(t)
            elif s.kind in ("th", "td"): s.row.append(t)
            else: s.blocks.append({s.kind: t})
        s.cur = None; s.kind = None
    def handle_starttag(s, tag, a):
        a = dict(a); cls = a.get("class", "") or ""
        if tag in ("style", "script"): s.skip += 1; return
        if s.skip: return
        if s.pre is not None:
            return
        # timeline (the-ai-hype-cycle)
        if "timeline-item" in cls: s.tl = {"date": "", "title": "", "desc": "", "badge": ""}; return
        if s.tl is not None and any(k in cls for k in ("timeline-date", "timeline-title", "timeline-description", "era-badge")):
            s.tlf = {"timeline-date": "date", "timeline-title": "title", "timeline-description": "desc", "era-badge": "badge"}[[k for k in ("timeline-date", "timeline-title", "timeline-description", "era-badge") if k in cls][0]]; return
        if tag == "h6": s.h6 = ""; return
        if tag == "iframe":
            src = a.get("src", "")
            m = re.search(r"youtube(?:-nocookie)?\.com/embed/([\w-]+)", src)
            if m: s.flush(); s.blocks.append({"video": m.group(1), "title": a.get("title", "Video")})
            return
        if tag == "img":
            s.flush(); s.blocks.append({"img": a.get("src", ""), "alt": a.get("alt", "")}); return
        if tag == "pre": s.flush(); s.pre = ""; return
        if tag == "hr": s.flush(); s.blocks.append({"hr": True}); return
        if tag in ("ul", "ol"): s.flush(); s.list = {"list" if tag == "ul" else "olist": None, "items": [], "tag": tag}; return
        if tag == "table": s.flush(); s.table = {"head": [], "rows": []}; return
        if tag == "tr" and s.table is not None: s.row = []; return
        if tag in ("th", "td") and s.table is not None: s.flush(); s.cur = ""; s.kind = tag; return
        if tag in ("p", "h2", "h3", "h4", "h5"):
            if s.list is not None and s.kind == "li":  # <p> wewnątrz <li>
                return
            s.flush(); s.cur = ""; s.kind = {"h4": "h3", "h5": "h3"}.get(tag, tag); return
        if tag == "h1": s.flush(); s.cur = ""; s.kind = "h2"; return  # h1 w treści → h2 (tytuł strony jest jeden)
        if tag == "li" and s.list is not None: s.flush(); s.cur = ""; s.kind = "li"; return
        if tag in INLINE and s.cur is not None:
            t = INLINE[tag]
            if t == "br": s.cur += "<br>"; return
            if t == "a":
                href, ext = map_href(a.get("href"))
                s.cur += f'<a href="{html.escape(href, True)}"' + (' target="_blank" rel="noopener"' if ext else "") + ">"
            else: s.cur += f"<{t}>"
            s.stack.append(t)
        if s.h6 is not None: pass
    def handle_endtag(s, tag):
        if tag in ("style", "script"): s.skip = max(0, s.skip - 1); return
        if s.skip: return
        if tag == "pre" and s.pre is not None:
            s.blocks.append({"code": s.pre.rstrip("\n"), "lang": "code"}); s.pre = None; return
        if s.pre is not None: return
        if s.tl is not None:
            if s.tlf: s.tlf = None
            if tag == "div" and s.tl and s.tl.get("desc") and s.tlf is None:
                pass
        if tag == "h6" and s.h6 is not None:
            m = re.search(r"Written by\s+(.+)", s.h6.strip())
            if m: s.author = m.group(1).strip()
            s.h6 = None; return
        if tag in ("p", "h1", "h2", "h3", "h4", "h5", "th", "td") and s.cur is not None and s.kind not in ("li",):
            s.flush(); return
        if tag == "li" and s.kind == "li": s.flush(); return
        if tag in ("ul", "ol") and s.list is not None:
            s.flush()
            key = "list" if s.list["tag"] == "ul" else "olist"
            if s.list["items"]: s.blocks.append({key: s.list["items"]})
            s.list = None; return
        if tag == "tr" and s.row is not None:
            if s.table is not None:
                if not s.table["head"] and not s.table["rows"] and s._th: s.table["head"] = s.row
                else: s.table["rows"].append(s.row)
            s.row = None; return
        if tag == "table" and s.table is not None:
            s.blocks.append({"table": s.table}); s.table = None; return
        if tag in INLINE and s.stack and s.cur is not None and INLINE[tag] == s.stack[-1]:
            s.cur += f"</{s.stack.pop()}>"
    _th = False
    def handle_data(s, d):
        if s.skip: return
        if s.pre is not None: s.pre += d; return
        if s.tl is not None and s.tlf:
            s.tl[s.tlf] += d
            if s.tlf == "desc":
                s.tl["desc"] = s.tl["desc"].strip(); s.blocks.append({"tl": s.tl}); s.tl = None; s.tlf = None
            return
        if s.h6 is not None: s.h6 += d; return
        if s.cur is not None: s.cur += html.escape(d, False)

def parse(path):
    raw = open(path, encoding="utf-8").read()
    slug = os.path.basename(path)[:-5]
    meta = lambda k: (re.search(r'<meta (?:name|property)="?%s"? content="([^"]*)"' % re.escape(k), raw) or [None, ""])[1]
    title = html.unescape(re.search(r'<h1 class="blog-title[^"]*">(.*?)</h1>', raw, re.S).group(1)).strip()
    i = raw.find('<h1 class="blog-title'); i = raw.find("</h1>", i) + 5
    j = raw.find('<div class="bg-author', i)
    if j < 0: j = raw.find('class="d-flex align-items-center"', i)
    seg = raw[i:j]
    p = P(); p._th = "<th" in seg
    p.feed(seg); p.flush()
    # timeline: zgrupuj kolejne {tl}
    blocks = []
    for b in p.blocks:
        if "tl" in b:
            if blocks and "timeline" in blocks[-1]: blocks[-1]["timeline"].append(b["tl"])
            else: blocks.append({"timeline": [b["tl"]]})
        else: blocks.append(b)
    cover = re.search(r'<img src=([^ >]+) class="blog-image', raw)
    cover = cover.group(1).strip('"') if cover else ""
    return {
        "id": slug, "title": title,
        "excerpt": html.unescape(meta("description")),
        "date": meta("article:published_time")[:10],
        "author": p.author or "CONFLICT",
        "cover": cover,
        "body": blocks,
    }


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REDIR = {r["from"]: r["to"] for r in json.load(open(os.path.join(ROOT, "redirects.json")))}

def local_link(m):
    href = html.unescape(m.group(1))
    mm = re.match(r"https?://(?:www\.)?weareconflict\.com(/[^?#]*)?", href)
    if mm:
        p = mm.group(1) or "/"
        if not p.endswith("/"): p += "/"
        to = REDIR.get(p)
        if p == "/": to = "/index.html"
        if to: return f'<a href="{to.lstrip("/")}">'
    return m.group(0)

def fix_inline(s):
    return re.sub(r'<a href="([^"]*)" target="_blank" rel="noopener">', local_link, s)

def words(b):
    out = []
    for k in ("p", "h2", "h3", "code"):
        if k in b: out.append(b[k])
    for k in ("list", "olist"): out += b.get(k, [])
    if "table" in b: out += [c for r in [b["table"]["head"]] + b["table"]["rows"] for c in r]
    if "timeline" in b: out += [t["title"] + " " + t["desc"] for t in b["timeline"]]
    return re.sub(r"<[^>]+>", " ", " ".join(out)).split()

def cover_path(slug):
    for ext in ("webp", "jpg", "png"):
        f = f"materials/blog/{slug}.{ext}"
        if os.path.exists(os.path.join(ROOT, f)): return f
    return ""

if __name__ == "__main__":
    posts = [parse(f) for f in sorted(glob.glob(sys.argv[1] + "/*.html"))]
    os.makedirs(os.path.join(ROOT, "src/data/posts"), exist_ok=True)
    index = []
    for p in posts:
        for b in p["body"]:
            for k in ("p", "h2", "h3"):
                if k in b: b[k] = fix_inline(b[k])
            for k in ("list", "olist"):
                if k in b: b[k] = [fix_inline(x) for x in b[k]]
            if "table" in b: b["table"] = {"head": [fix_inline(c) for c in b["table"]["head"]], "rows": [[fix_inline(c) for c in r] for r in b["table"]["rows"]]}
            if "img" in b: b["img"] = "materials/blog/" + os.path.basename(b["img"])
        n = sum(len(words(b)) for b in p["body"])
        json.dump(p["body"], open(os.path.join(ROOT, f"src/data/posts/{p['id']}.json"), "w"), ensure_ascii=False, separators=(",", ":"))
        cover = cover_path(p["id"])
        index.append({"id": p["id"], "title": p["title"], "excerpt": p["excerpt"], "date": p["date"], "author": p["author"],
                      "cover": cover, "thumb": f"materials/blog/sm/{p['id']}.jpg" if cover else "", "minutes": max(1, round(n / 220))})
    index.sort(key=lambda x: x["date"], reverse=True)
    head = open(os.path.join(ROOT, "src/data/posts.js")).read()
    helpers = head[head.index("// czas czytania"):] if "// czas czytania" in head else ""
    js = ("// ===== Blog — indeks wpisów (blog.html, post.html) =====\n"
          "// GENEROWANE: python3 tools/blog-import.py <html> — wpisy 1:1 z conflict.blog. Nie edytować ręcznie.\n"
          "// Treść każdego wpisu: src/data/posts/<id>.json (ładowana na żądanie w post.html).\n"
          "export const POSTS = " + json.dumps(index, ensure_ascii=False, indent=1) + ";\n\n" + helpers)
    open(os.path.join(ROOT, "src/data/posts.js"), "w").write(js)
    print(len(index), "posts →", "src/data/posts.js + src/data/posts/*.json")

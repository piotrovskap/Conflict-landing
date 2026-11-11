#!/usr/bin/env python3
"""Wyciąga treść ze stron weareconflict.com zapisanych w przeglądarce (Cmd+S).

Użycie:  python3 -I tools/extract-conflict.py [folder_ze_stronami] [plik_wyjściowy]
Domyślnie: Podstrony/  →  content/weareconflict.md  (+ .json obok)

Pomija nawigację (<header>), stopkę (<footer>), skrypty, style i SVG.
Zachowuje nagłówki (#), akapity, listy i linki wewnętrzne.
"""
import sys, json, re, html
from html.parser import HTMLParser
from pathlib import Path

SKIP = {"script", "style", "svg", "noscript", "header", "footer", "nav", "iframe", "form", "template"}
BLOCK = {"p", "div", "section", "article", "li", "ul", "ol", "br", "tr", "blockquote", "figure", "figcaption"}

class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0; self.out = []; self.buf = []; self.prefix = ""
        self.title = ""; self.in_title = False; self.canonical = ""; self.desc = ""
    def flush(self):
        t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        if t: self.out.append(self.prefix + t)
        self.buf = []; self.prefix = ""
    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == "title": self.in_title = True
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href", "")
        if tag == "meta" and a.get("name") == "description": self.desc = a.get("content", "")
        if tag in SKIP: self.skip += 1; return
        if self.skip: return
        if re.fullmatch(r"h[1-6]", tag): self.flush(); self.prefix = "#" * int(tag[1]) + " "
        elif tag == "li": self.flush(); self.prefix = "- "
        elif tag in BLOCK: self.flush()
        elif tag == "img" and a.get("alt"): self.flush(); self.out.append(f"![{a['alt']}]")
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag in SKIP: self.skip = max(0, self.skip - 1); return
        if self.skip: return
        if re.fullmatch(r"h[1-6]", tag) or tag in BLOCK: self.flush()
    def handle_data(self, d):
        if self.in_title: self.title += d
        elif not self.skip: self.buf.append(d)

NOISE = {"![icon]", "![logo]", "![close]", "![arrow]", "![menu]"}

def dedupe(lines):
    # treść strony zaczyna się od pierwszego H1 — wcześniej jest menu mobilne
    h1 = next((i for i, l in enumerate(lines) if l.startswith("# ")), 0)
    lines = [l for l in lines[h1:] if l not in NOISE
             and not re.fullmatch(r"!\[[^\]]*\]", l) and not l.startswith("Copyright ©")]
    res = []
    for l in lines:
        if res and res[-1].lstrip("#- ").lower() == l.lstrip("#- ").lower(): continue
        res.append(l)
    return res

def main():
    root = Path(__file__).resolve().parent.parent
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "Podstrony"
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else root / "content" / "weareconflict.md"
    pages = []
    for f in sorted(src.rglob("*.htm*")):
        if "_files" in f.parent.name: continue
        p = Extract(); p.feed(f.read_text(encoding="utf-8", errors="ignore"))
        p.flush()
        url = p.canonical
        pages.append({"url": url, "path": re.sub(r"^https?://[^/]+", "", url) or "/",
                      "title": html.unescape(p.title.strip()), "description": p.desc,
                      "file": f.name, "content": dedupe(p.out)})
    pages.sort(key=lambda x: x["path"])
    dst.parent.mkdir(parents=True, exist_ok=True)
    md = ["# weareconflict.com — treść stron", "", f"Stron: {len(pages)}", ""]
    md += [f"- [{p['title']}](#{p['path']}) — `{p['path']}`" for p in pages]
    for p in pages:
        md += ["", "---", "", f"<!-- PAGE {p['path']} -->", f"URL: {p['url']}", f"Title: {p['title']}"]
        if p["description"]: md.append(f"Description: {p['description']}")
        md += [""] + p["content"]
    dst.write_text("\n".join(md) + "\n", encoding="utf-8")
    dst.with_suffix(".json").write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{len(pages)} stron → {dst} (+ .json)")

main()

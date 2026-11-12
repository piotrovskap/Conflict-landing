// ===== Nawigacja: hamburger + mega menu (hover z intencją, scrim, a11y) =====
const nav = document.getElementById("nav");
const burger = document.getElementById("nav-burger");
const scrim = document.getElementById("nav-scrim");
const groups = [...document.querySelectorAll(".nav__group")];
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// realna wysokość nava → --nav-h (ramka hero dokładnie się styka)
if (nav) {
  const syncNavHeight = () =>
    document.documentElement.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
  syncNavHeight();
  window.addEventListener("load", syncNavHeight);
  window.addEventListener("resize", syncNavHeight);
  if (window.ResizeObserver) new ResizeObserver(syncNavHeight).observe(nav);
}

// Chowaj nagłówek przy przewijaniu w dół; pokaż przy ruchu w górę lub po postoju.
if (nav) {
  let lastY = window.scrollY;
  let idleTimer;
  const show = () => nav.classList.remove("is-hidden");
  const hide = () => {
    if (!nav.classList.contains("is-open")) {
      closeAll();
      nav.classList.add("is-hidden");
    }
  };
  const scheduleIdleShow = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(show, 2500);
  };

  function onScrollVisibility() {
    const y = window.scrollY;
    const delta = y - lastY;
    lastY = y;

    if (y <= 8) {
      show();
      return;
    }
    if (delta > 2) hide();
    else if (delta < -2) show();
    scheduleIdleShow();
  }

  window.addEventListener("scroll", onScrollVisibility, { passive: true });
  // Hero przechwytuje wheel, więc reagujemy na kierunek jeszcze przed jego snapem.
  window.addEventListener("wheel", (event) => {
    if (event.ctrlKey || Math.abs(event.deltaY) < 2) return;
    if (event.deltaY > 0) hide();
    else show();
    scheduleIdleShow();
  }, { capture: true, passive: true });
  nav.addEventListener("focusin", show);
}

// mobile: akordeon z płynną wysokością (max-height animowane do realnej wysokości, potem „none")
const mobileMQ = window.matchMedia("(max-width: 1080px)");
function expand(el, open) {
  if (!el) return;
  if (!mobileMQ.matches) { el.style.maxHeight = ""; return; }
  const cur = el.style.maxHeight;
  if (open) {
    if (cur === "none") return;
    el.style.maxHeight = `${el.scrollHeight}px`;
    const done = (e) => { if (e.target !== el) return; el.removeEventListener("transitionend", done); if (el.style.maxHeight !== "0px") el.style.maxHeight = "none"; };
    el.addEventListener("transitionend", done);
  } else {
    if (cur === "" || cur === "0px") { el.style.maxHeight = "0px"; return; }
    el.style.maxHeight = `${el.scrollHeight}px`;
    el.offsetHeight; // reflow — start zamykania od realnej wysokości
    el.style.maxHeight = "0px";
  }
}
function sizePanels() {
  groups.forEach((g) => expand(g.querySelector(".nav__panel"), g.classList.contains("is-open")));
}
mobileMQ.addEventListener?.("change", () => { sizePanels(); document.querySelectorAll(".mcat__links").forEach((l) => (l.style.maxHeight = "")); });

// Długie kategorie (Services, Solutions): na mobile każda kategoria to rozwijany wiersz + link „View all"
document.querySelectorAll(".nav__panel.megamenu .mcat").forEach((cat, n) => {
  const head = cat.querySelector(".mcat__head h4");
  const list = cat.querySelector(".mcat__links");
  if (!head || !list || list.children.length <= 6) return; // krótkie listy (Company) zostają rozwinięte
  const link = head.querySelector("a");
  const id = `mcat-list-${n}`;
  list.id = id;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "mcat__toggle";
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", id);
  btn.innerHTML = `<span>${head.textContent.trim()}</span><b>${list.children.length}</b><i aria-hidden="true"></i>`;
  cat.prepend(btn);
  if (link) {
    const li = document.createElement("li");
    li.className = "mcat__all";
    li.innerHTML = `<a href="${link.getAttribute("href")}">View all <em aria-hidden="true">→</em></a>`;
    list.prepend(li);
    li.querySelector("a").addEventListener("click", () => setMenu(false));
  }
  btn.addEventListener("click", () => {
    const open = !cat.classList.contains("is-open");
    // jedna kategoria naraz
    cat.parentElement.querySelectorAll(".mcat.is-open").forEach((o) => {
      if (o === cat) return;
      o.classList.remove("is-open");
      o.querySelector(".mcat__toggle")?.setAttribute("aria-expanded", "false");
      expand(o.querySelector(".mcat__links"), false);
    });
    cat.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    expand(list, open);
  });
});

function updateScrim() {
  sizePanels();
  scrim?.classList.toggle("is-active", groups.some((g) => g.classList.contains("is-open")));
}
function openGroup(group) {
  groups.forEach((g) => {
    const on = g === group;
    g.classList.toggle("is-open", on);
    g.querySelector(".nav__trigger")?.setAttribute("aria-expanded", on ? "true" : "false");
  });
  updateScrim();
}
function closeAll() {
  groups.forEach((g) => {
    g.classList.remove("is-open");
    g.querySelector(".nav__trigger")?.setAttribute("aria-expanded", "false");
  });
  updateScrim();
}

// Hamburger (mobile): pełnoekranowe menu, blokada przewijania strony pod spodem
nav?.querySelectorAll(".nav__menu > *").forEach((el, i) => el.style.setProperty("--i", i));
function setMenu(open) {
  if (!nav) return;
  nav.classList.toggle("is-open", open);
  burger?.setAttribute("aria-expanded", String(open));
  burger?.setAttribute("aria-label", open ? "Close menu" : "Menu");
  document.documentElement.classList.toggle("nav-locked", open);
  if (open) {
    window.__lenis?.stop();
    nav.classList.remove("is-hidden");
    // realna dolna krawędź paska (sticky + margines) → tło pod paskiem i start listy
    nav.style.setProperty("--nav-bottom", `${Math.ceil(nav.getBoundingClientRect().bottom)}px`);
  }
  else { window.__lenis?.start(); closeAll(); }
}
burger?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav?.classList.contains("is-open")) { setMenu(false); burger?.focus(); } });
mobileMQ.addEventListener?.("change", (e) => { if (!e.matches) setMenu(false); });

// Triggery grup — klik toggle (mobile + klawiatura)
groups.forEach((group) => {
  const trigger = group.querySelector(".nav__trigger");
  trigger?.addEventListener("click", (e) => {
    const href = trigger.dataset.href;
    // desktop: hover już otworzył menu → klik przechodzi na podstronę
    if (fine && href && group.classList.contains("is-open")) {
      window.location.href = href;
      return;
    }
    e.preventDefault();
    if (group.classList.contains("is-open")) closeAll();
    else openGroup(group);
  });
});

// Desktop — otwieranie z intencją (opóźnienia, bez migotania)
if (fine) {
  const OPEN = 70, CLOSE = 220;
  let tOpen, tClose;
  groups.forEach((group) => {
    group.addEventListener("pointerenter", () => {
      clearTimeout(tClose);
      tOpen = setTimeout(() => openGroup(group), OPEN);
    });
    group.addEventListener("pointerleave", () => {
      clearTimeout(tOpen);
      tClose = setTimeout(closeAll, CLOSE);
    });
  });
}

// Escape / scroll / klik poza → zamknij
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
window.addEventListener("scroll", closeAll, { passive: true });
document.addEventListener("click", (e) => { if (!nav.contains(e.target)) closeAll(); });

// klik w link zamyka całe menu
nav?.querySelectorAll(".nav__panel a, .nav__menu > .nav__item, .nav__actions a").forEach((a) => {
  a.addEventListener("click", () => setMenu(false));
});

// ===== Wideo w mega menu — gra tylko, gdy panel jest otwarty (preload="none" do pierwszego otwarcia) =====
document.querySelectorAll(".nav__group--mega").forEach((group) => {
  const vids = [...group.querySelectorAll(".nav__panel video")];
  if (!vids.length) return;
  const play = () => vids.forEach((v) => { v.muted = true; v.play().catch(() => {}); });
  const stop = () => vids.forEach((v) => v.pause());
  group.addEventListener("pointerenter", play);
  group.addEventListener("focusin", play);
  group.addEventListener("pointerleave", () => setTimeout(() => { if (!group.matches(":hover, :focus-within")) stop(); }, 400));
  group.querySelector(".nav__trigger")?.addEventListener("click", play);
});

// ===== Skip link (a11y): pierwszy element w kolejności Tab, przeskakuje menu do <main> =====
{
  const main = document.querySelector("main");
  if (main && !document.querySelector(".skip-link")) {
    if (!main.id) main.id = "top";
    if (!main.hasAttribute("tabindex")) main.tabIndex = -1;
    const a = document.createElement("a");
    a.className = "skip-link";
    a.href = `#${main.id}`;
    a.textContent = "Skip to content";
    a.addEventListener("click", (e) => { e.preventDefault(); main.focus({ preventScroll: true }); main.scrollIntoView(); });
    document.body.prepend(a);
  }
}

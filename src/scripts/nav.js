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

function updateScrim() {
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

// Hamburger (mobile)
burger?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});

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
nav?.querySelectorAll(".nav__panel a, .nav__menu > .nav__item").forEach((a) => {
  a.addEventListener("click", () => { nav.classList.remove("is-open"); closeAll(); });
});

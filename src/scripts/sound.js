// ===== Dźwięki UI (cuelume) =====
import { play, unlock, setVolume, setEnabled } from "/node_modules/cuelume/dist/index.js";

setVolume(0.5);

// Przełącznik dźwięku w navbarze
const soundBtn = document.getElementById("nav-sound");
const MUTE_KEY = "conflict:muted";
let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch (e) {}

function applyMute() {
  try { setEnabled(!muted); } catch (e) {}
  soundBtn?.classList.toggle("is-muted", muted);
  soundBtn?.setAttribute("aria-pressed", String(muted));
  // jedno źródło prawdy — tło i glitch słuchają tego zdarzenia
  window.dispatchEvent(new CustomEvent("cue:mute", { detail: { muted } }));
}
// stan z poprzedniej strony — po wczytaniu wszystkich modułów (ambient, glitch już nasłuchują)
if (muted) document.addEventListener("DOMContentLoaded", applyMute, { once: true });

soundBtn?.addEventListener("click", () => {
  muted = !muted;
  try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch (e) {}
  applyMute();
  if (!muted) { arm(); setTimeout(() => play("tap", { volume: 0.4 }), 40); } // feedback przy włączeniu
});

// Odblokowanie AudioContext — tylko gesty dające user-activation (klik/klawisz/dotyk,
// NIE wheel — scroll nie aktywuje audio). Próbujemy aż faktycznie wystartuje.
let unlocked = false;
async function arm() {
  if (unlocked) return true;
  try { unlocked = await unlock(); } catch (e) { unlocked = false; }
}
["pointerdown", "mousedown", "click", "keydown", "touchstart"].forEach((ev) =>
  window.addEventListener(ev, arm, { passive: true })
);

// klik → dźwięk zależny od elementu
document.addEventListener("pointerdown", (e) => {
  arm();
  const t = e.target;
  if (!(t instanceof Element)) return;
  if (t.closest(".nav__trigger")) return void play("open", { volume: 0.4 });
  if (t.closest(".svc__row")) {
    const open = t.closest(".svc__item")?.classList.contains("is-open");
    return void play("toggle", { volume: 0.4, emphasis: open ? "soft" : "strong" });
  }
  if (t.closest(".carousel__btn")) return void play("navigate", { volume: 0.22 });
  if (t.closest(".sp-chip, .sp-consent__label")) return void play("select", { volume: 0.3 });
  if (t.closest(".sp-faq__item summary")) return void play("toggle", { volume: 0.35 });
  if (t.closest(".sp-ctx__clear")) return void play("close", { volume: 0.3 });
  if (t.closest(".sp-jump, .sp-index__item, .sp-where__links a")) return void play("navigate", { volume: 0.25 });
  if (t.closest(".sp-cap, .sp-line, .sp-pager a, .sp-svc__cta, .sp-detail__parent, .sp-job, .sp-row, .sp-door, .sp-urgent"))
    return void play("tap", { volume: 0.35 });
  if (t.closest(".nav__item, .nav__logo, .dock__item, .footer__soc, .footer__col a, .nav__panel a"))
    return void play("tap", { volume: 0.4 });
  if (t.closest(".btn, .win, .carousel__slide, .logos__item, .footer__subscribe button"))
    return void play("tap");
});

// hover: menu → „tick" (inny dźwięk), buttony/dock/social → cichy „tap"
const hoverGuard = new WeakSet();
function softHover(el, sound, volume) {
  if (hoverGuard.has(el)) return;
  hoverGuard.add(el);
  play(sound, { volume });
  setTimeout(() => hoverGuard.delete(el), 150);
}
// Hover = wejście na element (nie każde przejście między jego dziećmi)
const HOVERS = [
  // [selektor, dźwięk, głośność]
  [".btn, .nav__cta, .carousel__btn, .carousel__slide[data-href].is-active", "select", 0.32],                       // buttony — wyraźny „select"
  [".nav__item, .nav__panel a, .megamenu a, .mmbar, .mcat__links a, .feat", "tick", 0.2], // menu
  [".sp-cap, .sp-jump, .sp-index__item, .sp-line, .sp-svc__cta, .sp-where__links a, .sp-chip, .sp-detail__parent, .sp-job, .sp-pager a, .sp-faq__item summary, .sp-price, .sp-row, .sp-door, .sp-tab, .sp-stepnav__item, .sp-urgent, .sp-post, .sp-toc__list a, .svc__link", "tick", 0.18],
  [".dock__item, .footer__soc", "tap", 0.22],
];
document.addEventListener("pointerover", (e) => {
  const el = e.target instanceof Element ? e.target : null;
  if (!el || muted) return;
  for (const [sel, sound, volume] of HOVERS) {
    const hit = el.closest(sel);
    if (!hit) continue;
    if (e.relatedTarget instanceof Node && hit.contains(e.relatedTarget)) return; // ruch wewnątrz elementu
    if (unlocked) softHover(hit, sound, volume);
    // audio jeszcze uśpione — spróbuj obudzić i od razu zagrać (Chrome pozwala po kliknięciu linku w obrębie strony)
    else arm().then(() => { if (unlocked) softHover(hit, sound, volume); });
    return;
  }
});

// próba obudzenia audio od razu po wejściu na stronę (działa, gdy przyszliśmy tu kliknięciem z naszej strony)
arm();

// pisanie w polu e-mail
document.addEventListener("keydown", (e) => {
  const t = e.target;
  if (t instanceof Element && t.closest(".footer__subscribe input, .sp-field input, .sp-field textarea")) {
    arm();
    play("type");
  }
});

// ===== Dźwięki wywoływane przez inne moduły (reużywalne: window.dispatchEvent(new CustomEvent("cue:play", { detail: { name, volume } })))
// np. terminal „pisze", scroll-spy zmienia sekcję, formularz wysłany / błąd
window.addEventListener("cue:play", (e) => {
  if (muted || !unlocked) return;
  const { name, ...opts } = e.detail || {};
  if (name) { try { play(name, opts); } catch (err) {} }
});

// ===== Dźwięki UI (cuelume) =====
import { play, unlock, setVolume } from "/node_modules/cuelume/dist/index.js";

setVolume(0.5);

// Odblokowanie AudioContext — tylko gesty dające user-activation (klik/klawisz/dotyk,
// NIE wheel — scroll nie aktywuje audio). Próbujemy aż faktycznie wystartuje.
let unlocked = false;
async function arm() {
  if (unlocked) return;
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
document.addEventListener("pointerover", (e) => {
  if (!unlocked) return;
  const el = e.target instanceof Element ? e.target : null;
  if (!el) return;
  const menu = el.closest(".nav__item, .nav__panel a, .megamenu a, .mmbar, .mcat__links a, .feat");
  if (menu) return void softHover(menu, "tick", 0.2);
  const btn = el.closest(".btn, .dock__item, .footer__soc");
  if (btn) return void softHover(btn, "tap", 0.12);
});

// pisanie w polu e-mail
document.addEventListener("keydown", (e) => {
  const t = e.target;
  if (t instanceof Element && t.closest(".footer__subscribe input")) {
    arm();
    play("type");
  }
});

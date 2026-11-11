// ===== Reużywalny komponent: modal „Contact us” dla zaangażowanych odwiedzających =====
// Pokazuje się, gdy w JEDNEJ sesji spełnione są oba warunki:
//   - min. MIN_ACTIVE_MS aktywnego czasu (karta widoczna + ruch/scroll/klawisz w ostatnich IDLE_MS),
//   - min. MIN_PAGES różnych podstron (ścieżka + ?id=…).
// Nigdy: na contact.html, po wejściu na contact.html w tej sesji, drugi raz w sesji,
//        przez SNOOZE_DAYS po zamknięciu, gdy otwarty jest baner cookies albo ktoś pisze w polu formularza.
// Teksty CTA wyłącznie ze źródła (Outcome Engineering: „What outcome are you engineering toward?”).
// Test: dopisz ?nudge=1 do adresu — modal pokaże się od razu, bez warunków.
import { SITE } from "../data/site.js";
import { track } from "../scripts/track.js";

const MIN_ACTIVE_MS = 90_000;
const MIN_PAGES = 3;
const IDLE_MS = 30_000;
const SNOOZE_DAYS = 7;
const SESSION_KEY = "conflict:nudge";        // sessionStorage: { t, pages[], shown, converted }
const SNOOZE_KEY = "conflict:nudge-snooze";  // localStorage: timestamp do kiedy nie pokazywać

const store = {
  get(s, k, d) { try { return JSON.parse(s.getItem(k)) ?? d; } catch { return d; } },
  set(s, k, v) { try { s.setItem(k, JSON.stringify(v)); } catch {} },
};
const ss = (() => { try { return window.sessionStorage; } catch { return null; } })();
const ls = (() => { try { return window.localStorage; } catch { return null; } })();

const state = Object.assign({ t: 0, pages: [], shown: false, converted: false }, ss ? store.get(ss, SESSION_KEY, {}) : {});
const save = () => ss && store.set(ss, SESSION_KEY, state);

const isContact = /(^|\/)contact(\.html)?$/.test(location.pathname);
const force = new URLSearchParams(location.search).get("nudge") === "1";
const pageKey = location.pathname.replace(/\/index\.html$/, "/") + (new URLSearchParams(location.search).get("id") ? `?id=${new URLSearchParams(location.search).get("id")}` : "");

if (!state.pages.includes(pageKey)) state.pages.push(pageKey);
if (isContact) state.converted = true;    // był na kontakcie → nie namawiamy
save();

const snoozed = () => (ls ? Number(store.get(ls, SNOOZE_KEY, 0)) : 0) > Date.now();
const eligible = () => !isContact && !state.shown && !state.converted && !snoozed();

// --- licznik aktywnego czasu ---
let lastActivity = Date.now();
const bump = () => { lastActivity = Date.now(); };
["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((ev) => addEventListener(ev, bump, { passive: true }));

const fmt = (ms) => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

// --- UI ---
let root, panel, lastFocus;
function build() {
  root = document.createElement("div");
  root.className = "nudge";
  root.id = "contact-nudge";
  root.hidden = true;
  root.innerHTML = `
    <div class="nudge__backdrop" data-nudge-close></div>
    <section class="nudge__panel" role="dialog" aria-modal="true" aria-labelledby="nudge-title" aria-describedby="nudge-text" tabindex="-1">
      <span class="nudge__corner nudge__corner--tl" aria-hidden="true"></span>
      <span class="nudge__corner nudge__corner--tr" aria-hidden="true"></span>
      <span class="nudge__corner nudge__corner--bl" aria-hidden="true"></span>
      <span class="nudge__corner nudge__corner--br" aria-hidden="true"></span>
      <span class="nudge__scan" aria-hidden="true"></span>
      <button type="button" class="nudge__x" data-nudge-close aria-label="Close">
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
      <h2 class="nudge__title" id="nudge-title">What outcome are you <span class="nudge__accent" data-text="engineering toward?">engineering toward?</span></h2>
      <p class="nudge__text" id="nudge-text">Every engagement starts with a clear definition of success. Tell us what you need to achieve, and we will show you the fastest path.</p>
      <div class="nudge__actions">
        <a class="btn btn--primary btn--glitch nudge__btn" href="contact.html#contact-form" data-text="Discuss your project">Discuss your project</a>
        <a class="btn btn--ghost nudge__btn" href="${SITE.bookUrl}" target="_blank" rel="noopener">Book a call <span aria-hidden="true">↗</span></a>
      </div>
      <div class="nudge__lines">
        <a class="nudge__line" href="mailto:${SITE.email}"><span class="nudge__k">Email</span><span class="nudge__v">${SITE.email}</span></a>
        <a class="nudge__line" href="tel:${SITE.phone}"><span class="nudge__k">Phone</span><span class="nudge__v">${SITE.phone.replace(/^\+1-(\d{3})-/, "+1 ($1) ")}</span></a>
      </div>
      <p class="nudge__telemetry" aria-hidden="true"><span class="nudge__dot"></span><span data-nudge-pages></span> pages · <span data-nudge-time></span> on site</p>
    </section>`;
  panel = root.querySelector(".nudge__panel");

  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-nudge-close]")) { close("dismiss"); return; }
    if (e.target.closest("a[href]")) {           // klik w CTA = konwersja; track.js sam loguje cta_click/book_call_click/…
      state.converted = true; save();
      if (!e.target.closest('a[target="_blank"]')) close("cta", true);
    }
  });
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); close("dismiss"); }
    if (e.key === "Tab") {                        // pułapka fokusu
      const f = [...panel.querySelectorAll("a[href], button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.body.appendChild(root);
}

function open() {
  if (!root) build();
  if (!force) { state.shown = true; save(); }   // tryb testowy nie zużywa sesji
  root.querySelector("[data-nudge-pages]").textContent = String(state.pages.length).padStart(2, "0");
  root.querySelector("[data-nudge-time]").textContent = fmt(state.t);
  lastFocus = document.activeElement;
  root.hidden = false;
  panel.style.setProperty("--nudge-h", `${panel.offsetHeight}px`); // skan przelatuje dokładnie przez panel
  document.documentElement.classList.add("nudge-open");
  window.__lenis?.stop();
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-in")));
  setTimeout(() => root.querySelector(".nudge__btn")?.focus({ preventScroll: true }), 450);
  window.dispatchEvent(new CustomEvent("cue:play", { detail: { name: "open", volume: 0.35 } }));
  track("nudge_shown", { pages: state.pages.length, seconds: Math.round(state.t / 1000) });
}

function close(reason, instant = false) {
  if (!root || root.hidden) return;
  if (reason === "dismiss") {
    if (ls && !force) store.set(ls, SNOOZE_KEY, Date.now() + SNOOZE_DAYS * 864e5);
    track("nudge_dismiss");
  }
  root.classList.remove("is-in");
  document.documentElement.classList.remove("nudge-open");
  window.__lenis?.start();
  window.dispatchEvent(new CustomEvent("cue:play", { detail: { name: "close", volume: 0.3 } }));
  const done = () => { root.hidden = true; lastFocus?.focus?.({ preventScroll: true }); };
  instant ? done() : setTimeout(done, 520);
}

// nie przerywaj: baner cookies otwarty, ktoś pisze, inny dialog na wierzchu
const busy = () => {
  const c = document.querySelector(".consent.is-in");
  const a = document.activeElement;
  return Boolean(c || (a && a.matches?.("input, textarea, select, [contenteditable]")) || document.querySelector("dialog[open]"));
};

if (force) addEventListener("load", () => setTimeout(open, 600));
else if (eligible()) {
  const pageStart = Date.now();
  let prev = Date.now();
  const timer = setInterval(() => {
    const now = Date.now();
    const active = document.visibilityState === "visible" && now - lastActivity < IDLE_MS;
    if (active) { state.t += now - prev; save(); }
    prev = now;
    if (!eligible()) { clearInterval(timer); return; }
    // min. 4 s na bieżącej podstronie — modal nie wyskakuje w trakcie ładowania/przejścia
    if (state.t >= MIN_ACTIVE_MS && state.pages.length >= MIN_PAGES && now - pageStart > 4000 && active && !busy()) {
      clearInterval(timer);
      open();
    }
  }, 1000);
  addEventListener("pagehide", save);
}

window.openContactNudge = open;

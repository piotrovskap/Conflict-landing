// ===== Reużywalny komponent: zgoda na cookies analityczne (Google Tag Manager + Hotjar) =====
// - Nic analitycznego nie ładuje się przed zgodą (RODO / ePrivacy). Google Consent Mode v2: domyślnie „denied”.
// - Wybór zapisany w localStorage „conflict:consent” = {analytics: bool, v, ts}; baner wraca, gdy zmieni się wersja.
// - Baner pokazuje się tylko, jeśli w SITE.analytics jest ustawione jakiekolwiek ID.
// - „Cookie settings” w stopce (button[data-consent-open]) otwiera panel ponownie; window.openConsent() też.
import { SITE } from "../data/site.js";

const KEY = "conflict:consent";
const VERSION = 1;
const { gtmId, hotjarId } = SITE.analytics || {};
const enabled = Boolean(gtmId || hotjarId);

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });

const read = () => { try { const c = JSON.parse(localStorage.getItem(KEY)); return c && c.v === VERSION ? c : null; } catch { return null; } };
const write = (analytics) => { try { localStorage.setItem(KEY, JSON.stringify({ analytics, v: VERSION, ts: new Date().toISOString() })); } catch {} };

let loaded = false;
function loadAnalytics() {
  if (loaded || !enabled) return;
  loaded = true;
  gtag("consent", "update", { analytics_storage: "granted" });
  if (gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script"); s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(s);
  }
  if (hotjarId) {
    window.hj = window.hj || function () { (window.hj.q = window.hj.q || []).push(arguments); };
    window._hjSettings = { hjid: Number(hotjarId), hjsv: 6 };
    const s = document.createElement("script"); s.async = true;
    s.src = `https://static.hotjar.com/c/hotjar-${encodeURIComponent(hotjarId)}.js?sv=6`;
    document.head.appendChild(s);
  }
}

// cofnięcie zgody: usuń cookies analityczne (best effort) i przeładuj, żeby skrypty zniknęły
function revoke() {
  const host = location.hostname.replace(/^www\./, "");
  document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => /^(_ga|_gid|_gat|_hj)/.test(n)).forEach((n) => {
    [location.hostname, "." + host, ""].forEach((d) => { document.cookie = `${n}=; Max-Age=0; path=/${d ? "; domain=" + d : ""}`; });
  });
  location.reload();
}

// --- UI ---
let box;
function build() {
  box = document.createElement("section");
  box.className = "consent";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-labelledby", "consent-title");
  box.setAttribute("aria-describedby", "consent-text");
  box.innerHTML = `
    <span class="consent__scan" aria-hidden="true"></span>
    <h2 class="consent__title" id="consent-title">Cookies</h2>
    <p class="consent__text" id="consent-text">We use analytics cookies (Google Analytics via Google Tag Manager, and Hotjar) to understand how visitors use this site and improve it. They are set only if you accept. <a href="legal.html?id=privacy#cookies-and-analytics">Privacy Policy</a></p>
    <div class="consent__actions">
      <button type="button" class="btn consent__btn" data-consent="reject">Reject</button>
      <button type="button" class="btn consent__btn" data-consent="accept">Accept</button>
    </div>`;
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-consent]");
    if (!b) return;
    const yes = b.dataset.consent === "accept";
    const was = read()?.analytics;
    write(yes);
    window.dataLayer.push({ event: yes ? "consent_granted" : "consent_denied" });
    close();
    if (yes) loadAnalytics(); else if (was || loaded) revoke();
  });
  box.addEventListener("keydown", (e) => { if (e.key === "Escape" && read()) close(); });
  document.body.appendChild(box);
}
function open() {
  if (!box) build();
  box.hidden = false;
  requestAnimationFrame(() => box.classList.add("is-in"));
  box.querySelector('[data-consent="accept"]').focus({ preventScroll: true });
}
function close() { if (!box) return; box.classList.remove("is-in"); setTimeout(() => { box.hidden = true; }, 400); }

window.openConsent = open;
document.addEventListener("click", (e) => { if (e.target.closest("[data-consent-open]")) { e.preventDefault(); open(); } });

const saved = read();
if (saved?.analytics) loadAnalytics();
else if (!saved && enabled) {
  // pokaż po intro/pierwszym renderze, żeby nie zasłaniało ładowania
  addEventListener("load", () => setTimeout(open, 1200));
}

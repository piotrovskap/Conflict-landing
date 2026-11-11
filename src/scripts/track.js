// ===== Pomiar konwersji — jedno miejsce na zdarzenia =====
// Dostawca do podpięcia później: GA4/GTM (window.dataLayer) lub Plausible (window.plausible).
// Bez dostawcy zdarzenia trafiają tylko do window.dataLayer (nic nie jest wysyłane).
// Zdarzenia: cta_click, book_call_click, email_click, phone_click, form_start, form_error, form_submit, form_success
window.dataLayer = window.dataLayer || [];

export function track(event, props = {}) {
  const data = { page: location.pathname + location.search, ...props };
  window.dataLayer.push({ event, ...data });
  if (typeof window.plausible === "function") window.plausible(event, { props: data });
  if (typeof window.gtag === "function") window.gtag("event", event, data);
}
window.track = track;

// sekcja, w której kliknięto (do mapy CTA)
const where = (el) => el.closest("[id]")?.id || el.closest("header,nav,footer")?.tagName.toLowerCase() || "page";

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;
  const href = a.getAttribute("href");
  const label = a.textContent.replace(/\s+/g, " ").trim().slice(0, 60);
  if (href.includes("meetings.hubspot.com")) track("book_call_click", { label, where: where(a) });
  else if (href.startsWith("mailto:")) track("email_click", { label, where: where(a) });
  else if (href.startsWith("tel:")) track("phone_click", { label, where: where(a) });
  else if (/(^|\/)contact\.html/.test(href)) track("cta_click", { label, where: where(a), to: href });
}, { capture: true });

// ===== Komponent: pas CTA (konwersja w długich odcinkach strony) =====
// Użycie: <div data-component="cta-band" data-title="Tell us what you’re" data-accent="building."></div>
// Teksty wyłącznie ze źródła (tu: hero strony kontaktu). Przyciski: formularz + kalendarz.
import { SITE } from "../data/site.js";
const BOOK = SITE.bookUrl;

function render(host, i) {
  const title = host.dataset.title || "";
  const accent = host.dataset.accent || "";
  const id = `cta-band-${i + 1}`;
  const sec = document.createElement("section");
  sec.className = "cta-band";
  sec.id = id;
  sec.setAttribute("aria-labelledby", `${id}-t`);
  sec.innerHTML = `
    <div class="cta-band__frame">
      <span class="cta-band__corner cta-band__corner--tl" aria-hidden="true"></span>
      <span class="cta-band__corner cta-band__corner--br" aria-hidden="true"></span>
      <span class="cta-band__scan" aria-hidden="true"></span>
      <h2 class="cta-band__title" id="${id}-t"></h2>
      <div class="cta-band__actions">
        <a class="btn btn--primary btn--glitch cta-band__btn" href="contact.html#contact-form" data-text="Discuss your project">Discuss your project</a>
        <a class="btn btn--ghost cta-band__btn" href="${BOOK}" target="_blank" rel="noopener">Book a call <span aria-hidden="true">↗</span></a>
      </div>
    </div>`;
  const h = sec.querySelector(".cta-band__title");
  h.append(document.createTextNode(title + (accent ? " " : "")));
  if (accent) {
    const a = document.createElement("span");
    a.className = "cta-band__accent";
    a.dataset.text = accent;
    a.textContent = accent;
    h.append(a);
  }
  host.replaceWith(sec);
  return sec;
}

const bands = [...document.querySelectorAll('[data-component="cta-band"]')].map(render);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.35 });
  bands.forEach((b) => io.observe(b));
} else bands.forEach((b) => b.classList.add("is-in"));

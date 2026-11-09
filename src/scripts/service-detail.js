// ===== Szablon strony podusługi: service.html?id=<slug> =====
// Jedna strona, 26 adresów — treść z src/data/services.js (jedno źródło prawdy).
import { SERVICES, findCapability } from "../data/services.js";

const $ = (id) => document.getElementById(id);
const slug = new URLSearchParams(location.search).get("id");
const hit = slug && findCapability(slug);

if (!hit) {
  // nieznany adres → czytelny stan zamiast pustej strony
  $("d-title").textContent = "Service not found";
  $("d-desc").textContent = "This page doesn’t exist (yet). Browse all our services instead.";
  document.querySelector(".sp-detail__side")?.remove();
  document.querySelector(".sp-detail-more")?.remove();
  document.querySelector(".sp-pager")?.remove();
  $("d-parent").remove();
} else {
  const { service, cap, index } = hit;
  document.title = `${cap.title} — ${service.title} — CONFLICT`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${cap.title}: ${cap.desc}`);

  $("d-title").textContent = cap.title;
  $("d-desc").textContent = cap.desc;
  $("d-parent").href = `services.html#${service.id}`;
  $("d-parent-num").textContent = `${service.num}.${index + 1}`;
  $("d-parent-name").textContent = `Part of ${service.title}`;
  $("d-cta").href = `contact.html?service=${service.id}`;

  // terminal usługi nadrzędnej
  $("d-term-host").textContent = `conflict@${service.id}`;
  const screen = $("d-term");
  const caret = screen.querySelector(".sp-term__caret");
  service.term.forEach((line) => {
    const el = document.createElement("span");
    el.className = "sp-term__line";
    el.textContent = line;
    screen.insertBefore(el, caret);
  });

  // pozostałe podusługi tej usługi — te same karty co na stronie Services
  $("d-more-svc").textContent = service.title;
  const list = $("d-more");
  service.caps.forEach((c, i) => {
    if (i === index) return;
    const li = document.createElement("li");
    li.className = "sp-caps__item";
    li.dataset.reveal = "";
    li.dataset.revealDelay = String((list.children.length % 3) * 80);
    li.innerHTML = `
      <a class="sp-cap" href="service.html?id=${c.slug}">
        <span class="sp-cap__num">${service.num}.${i + 1}</span>
        <span class="sp-cap__go" aria-hidden="true">→</span>
        <h3 class="sp-cap__title"></h3>
        <p class="sp-cap__desc"></p>
        <span class="sp-cap__more">Explore</span>
      </a>`;
    li.querySelector(".sp-cap__title").textContent = c.title;
    li.querySelector(".sp-cap__desc").textContent = c.desc;
    list.appendChild(li);
  });

  // poprzednia / następna podusługa (przez wszystkie usługi, w kółko)
  const all = SERVICES.flatMap((s) => s.caps);
  const at = all.findIndex((c) => c.slug === cap.slug);
  const prev = all[(at - 1 + all.length) % all.length];
  const next = all[(at + 1) % all.length];
  $("d-prev").href = `service.html?id=${prev.slug}`;
  $("d-prev-name").textContent = prev.title;
  $("d-next").href = `service.html?id=${next.slug}`;
  $("d-next-name").textContent = next.title;
}

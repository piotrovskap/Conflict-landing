// ===== Formularz kontaktowy — walidacja na żywo, prefill usługi, wysyłka =====
// Wysyłka: jeśli <form data-endpoint="https://…"> jest ustawiony → POST JSON.
// Bez endpointu (statyczny POC) → otwiera program pocztowy z gotową wiadomością (mailto).
import { track } from "./track.js";

const form = document.getElementById("contact-form");

if (form) {
  const done = document.getElementById("contact-done");
  const status = document.getElementById("cf-status");
  const submit = form.querySelector(".sp-form__submit");
  const message = form.elements.message;
  const count = document.getElementById("cf-count");

  // --- kontekst z adresu (?service=…&intent=…) — wejście z CTA na podstronach ---
  // Teksty tylko ze stron źródłowych (Team Spartan / Services). Nowy kontekst = nowy wpis tutaj.
  const CONTEXTS = {
    spartan: {
      name: "Team Spartan",
      href: "team-spartan.html",
      notes: ["You’ll have a dedicated engineer and point of contact.", "All plans include senior-level engineering"],
      intents: { sprint: "Book a sprint", talk: "Talk to spartan" },
    },
  };
  const params = new URLSearchParams(location.search);
  const ctxBox = document.getElementById("cf-ctx");
  let ctxSubject = "";
  let ctxOwner = null;      // chip, do którego należy widoczna karta
  let hideTimer = 0;
  const intentOf = {};      // zapamiętana akcja per usługa (np. spartan → "Book a sprint")

  // wejście z dowolnej podstrony: ?topic=<tytuł strony>&from=<plik.html?id=…> (tytuł = tekst źródłowy strony)
  const topic = (params.get("topic") || "").slice(0, 120);
  const fromRaw = params.get("from") || "";
  const from = /^[a-z0-9-]+\.html(\?id=[a-z0-9-]+)?$/i.test(fromRaw) ? fromRaw : "";

  const chips = [...form.querySelectorAll('input[name="service"]')];
  const pre = params.get("service");
  const preBox = pre && chips.find((c) => c.value === pre);
  if (preBox) {
    const cfg = CONTEXTS[pre];
    intentOf[pre] = cfg?.intents?.[params.get("intent")] || "Talk to an expert";
  }

  function showCtx(box) {
    if (!ctxBox) return;
    clearTimeout(hideTimer);
    const key = box.value;
    const cfg = CONTEXTS[key] || {};
    const name = (box === preBox && topic) || cfg.name || box.nextElementSibling.textContent;
    const action = intentOf[key] || cfg.intents?.talk || "Talk to an expert"; // bez akcji z adresu → neutralne „talk"
    ctxSubject = `${name} — ${action}`;
    ctxOwner = box;
    ctxBox.innerHTML = `
      <span class="sp-ctx__label"></span>
      <a class="sp-ctx__name"></a>
      <ul class="sp-ctx__notes"></ul>
      <button type="button" class="sp-ctx__clear" aria-label="Clear selection">×</button>`;
    ctxBox.querySelector(".sp-ctx__label").textContent = action;
    const link = ctxBox.querySelector(".sp-ctx__name");
    link.textContent = name;
    link.href = (box === preBox && topic && from) || cfg.href || `services.html#${key}`;
    const ul = ctxBox.querySelector(".sp-ctx__notes");
    (cfg.notes || []).forEach((n) => { const li = document.createElement("li"); li.textContent = n; ul.appendChild(li); });
    if (!ul.children.length) ul.remove();
    // restart animacji wejścia
    ctxBox.classList.remove("is-leaving");
    ctxBox.hidden = false;
    ctxBox.style.animation = "none"; void ctxBox.offsetWidth; ctxBox.style.animation = "";
    ctxBox.querySelector(".sp-ctx__clear").addEventListener("click", () => { box.checked = false; hideCtx(); form.elements.name.focus(); });
  }

  function hideCtx() {
    if (!ctxBox || ctxBox.hidden) return;
    ctxSubject = "";
    ctxOwner = null;
    ctxBox.classList.add("is-leaving");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { ctxBox.hidden = true; ctxBox.classList.remove("is-leaving"); }, 350);
    if (location.search) history.replaceState(null, "", location.pathname);
  }

  // karta zawsze odzwierciedla stan chipów:
  // zaznaczenie chipa z kontekstem (lub tego z adresu) → karta; odznaczenie właściciela → chowa
  chips.forEach((c) => c.addEventListener("change", () => {
    const hasCtx = CONTEXTS[c.value] || c === preBox;
    if (c.checked && hasCtx) showCtx(c);
    else if (!c.checked && c === ctxOwner) {
      // jeśli zostaje zaznaczony inny chip z kontekstem — pokaż jego kartę
      const other = chips.find((o) => o.checked && (CONTEXTS[o.value] || o === preBox));
      other ? showCtx(other) : hideCtx();
    }
  }));

  // temat bez usługi (np. problem / branża / case study) — karta bez chipa
  function showTopic() {
    if (!ctxBox || !topic) return;
    ctxSubject = `${topic} — Talk to an expert`;
    ctxBox.innerHTML = `<span class="sp-ctx__label">Talk to an expert</span><a class="sp-ctx__name"></a><button type="button" class="sp-ctx__clear" aria-label="Clear selection">×</button>`;
    const link = ctxBox.querySelector(".sp-ctx__name");
    link.textContent = topic;
    if (from) link.href = from; else link.removeAttribute("href");
    ctxBox.hidden = false;
    ctxBox.querySelector(".sp-ctx__clear").addEventListener("click", () => { hideCtx(); form.elements.name.focus(); });
  }

  if (preBox || topic) {
    if (preBox) { preBox.checked = true; showCtx(preBox); } else showTopic();

    // od razu do formularza + kursor w pierwszym polu (bez przewijania hero)
    const go = () => {
      const top = form.getBoundingClientRect().top + scrollY - 120;
      if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.1 });
      else scrollTo({ top, behavior: "smooth" });
      setTimeout(() => form.elements.name.focus({ preventScroll: true }), 700);
    };
    if (document.readyState === "complete") setTimeout(go, 300);
    else addEventListener("load", () => setTimeout(go, 300), { once: true });
  }

  // --- pomiar: pierwsza interakcja z formularzem ---
  form.addEventListener("focusin", () => track("form_start", { context: ctxSubject || null }), { once: true });

  // --- licznik znaków ---
  const max = Number(message.getAttribute("maxlength")) || 2000;
  const updateCount = () => { count.textContent = `${message.value.length} / ${max}`; };
  message.addEventListener("input", updateCount);
  updateCount();

  // --- walidacja ---
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Tell us your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address."),
    message: (v) => (v.trim().length >= 20 ? "" : "A few more words, please — at least 20 characters."),
  };
  const fieldOf = (input) => input.closest(".sp-field");
  function check(input, show = true) {
    const rule = rules[input.name];
    if (!rule) return true;
    const err = rule(input.type === "checkbox" ? input.checked : input.value);
    const field = fieldOf(input);
    const out = field.querySelector(".sp-field__error");
    if (show) {
      out.textContent = err;
      field.classList.toggle("is-invalid", Boolean(err));
      input.setAttribute("aria-invalid", err ? "true" : "false");
      if (err) input.setAttribute("aria-describedby", out.id);
    }
    return !err;
  }
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    // checkbox (zgoda): sprawdzamy po zmianie, nie po opuszczeniu pola
    if (input.type === "checkbox") {
      input.addEventListener("change", () => {
        if (fieldOf(input).classList.contains("is-invalid") || input.checked) check(input);
        if (!form.querySelector(".sp-field.is-invalid")) status.textContent = "";
      });
      return;
    }
    input.addEventListener("blur", () => { if (input.value) check(input); });
    // po pierwszym błędzie poprawiamy na bieżąco
    input.addEventListener("input", () => {
      if (fieldOf(input).classList.contains("is-invalid")) check(input);
      if (!form.querySelector(".sp-field.is-invalid")) status.textContent = "";
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.elements.website.value) return; // honeypot — bot
    const inputs = Object.keys(rules).map((n) => form.elements[n]);
    const ok = inputs.map((i) => check(i)).every(Boolean);
    if (!ok) {
      const first = inputs.find((i) => fieldOf(i).classList.contains("is-invalid"));
      first?.focus();
      // restart animacji „shake"
      inputs.forEach((i) => { const f = fieldOf(i); if (f.classList.contains("is-invalid")) { f.style.animation = "none"; void f.offsetWidth; f.style.animation = ""; } });
      status.textContent = "Please check the highlighted fields.";
      track("form_error", { fields: inputs.filter((i) => fieldOf(i).classList.contains("is-invalid")).map((i) => i.name).join(",") });
      window.dispatchEvent(new CustomEvent("cue:play", { detail: { name: "error", volume: 0.3 } }));
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      services: [...form.querySelectorAll('input[name="service"]:checked')].map((c) => c.nextElementSibling.textContent),
      message: message.value.trim(),
      context: ctxSubject || null,
      consent_processing: true,                          // notka przy przycisku: wysłanie = zgoda na przetwarzanie w celu odpowiedzi
      marketing_opt_in: Boolean(form.elements.marketing?.checked), // opcjonalna zgoda na komunikację marketingową (domyślnie nie)
    };

    submit.disabled = true;
    status.textContent = "Sending…";
    track("form_submit", { context: data.context, services: data.services.join(", ") });
    window.dispatchEvent(new CustomEvent("cue:play", { detail: { name: "success", volume: 0.35 } }));
    const endpoint = form.dataset.endpoint;
    let viaMail = false;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        // POC bez backendu: gotowy mail w programie pocztowym
        viaMail = true;
        const subject = `${ctxSubject || "New project"} — ${data.name}${data.company ? ` (${data.company})` : ""}`;
        const body = [
          data.services.length ? `Services: ${data.services.join(", ")}` : null,
          data.company ? `Company: ${data.company}` : null,
          `Email: ${data.email}`,
          `Marketing communications: ${data.marketing_opt_in ? "yes" : "no"}`,
          "",
          data.message,
        ].filter((l) => l !== null).join("\n");
        window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    } catch (err) {
      submit.disabled = false;
      status.textContent = "Something went wrong. Please email us at hi@weareconflict.com.";
      track("form_error", { fields: "network" });
      window.dispatchEvent(new CustomEvent("cue:play", { detail: { name: "error", volume: 0.3 } }));
      return;
    }

    // --- stan „wysłano" ---
    track("form_success", { context: data.context, via: viaMail ? "mailto" : "endpoint" });
    document.getElementById("cf-done-email").textContent = data.email;
    if (viaMail) {
      const lines = done.querySelectorAll(".sp-term__line");
      lines[1].textContent = "✓ draft ready in your email app";
      lines[2].textContent = "↳ hit send there and an expert will reply";
    }
    // podsumowanie zgłoszenia — tylko to, co wpisał użytkownik
    const sum = document.getElementById("cf-done-sum");
    sum.textContent = "";
    [
      [ctxSubject ? ctxSubject.split(" — ").pop() : "", ctxSubject ? ctxSubject.split(" — ")[0] : ""],
      ["Services", data.services.join(", ")],
      ["Company", data.company],
      ["Email", data.email],
    ].filter(([k, v]) => k && v).forEach(([k, v], i) => {
      const row = document.createElement("div");
      row.className = "sp-done__row";
      row.style.setProperty("--i", i);
      const dt = document.createElement("dt"); dt.textContent = k;
      const dd = document.createElement("dd"); dd.textContent = v;
      row.append(dt, dd); sum.appendChild(row);
    });
    form.hidden = true;
    done.hidden = false;
    requestAnimationFrame(() => done.classList.add("is-in"));
    done.focus({ preventScroll: true });
    const top = done.getBoundingClientRect().top + scrollY - 120;
    if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1 }); else scrollTo({ top, behavior: "smooth" });
  });
}

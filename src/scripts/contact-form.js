// ===== Formularz kontaktowy — walidacja na żywo, prefill usługi, wysyłka =====
// Wysyłka: jeśli <form data-endpoint="https://…"> jest ustawiony → POST JSON.
// Bez endpointu (statyczny POC) → otwiera program pocztowy z gotową wiadomością (mailto).
const form = document.getElementById("contact-form");

if (form) {
  const done = document.getElementById("contact-done");
  const status = document.getElementById("cf-status");
  const submit = form.querySelector(".sp-form__submit");
  const message = form.elements.message;
  const count = document.getElementById("cf-count");

  // --- usługa z adresu (?service=ai) — wejście z „Talk to an expert" na podstronie usług ---
  const pre = new URLSearchParams(location.search).get("service");
  if (pre) {
    const box = form.querySelector(`input[name="service"][value="${CSS.escape(pre)}"]`);
    if (box) box.checked = true;
  }

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
    const err = rule(input.value);
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
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      services: [...form.querySelectorAll('input[name="service"]:checked')].map((c) => c.nextElementSibling.textContent),
      message: message.value.trim(),
    };

    submit.disabled = true;
    status.textContent = "Sending…";
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
        const subject = `New project — ${data.name}${data.company ? ` (${data.company})` : ""}`;
        const body = [
          data.services.length ? `Services: ${data.services.join(", ")}` : null,
          data.company ? `Company: ${data.company}` : null,
          `Email: ${data.email}`,
          "",
          data.message,
        ].filter((l) => l !== null).join("\n");
        window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    } catch (err) {
      submit.disabled = false;
      status.textContent = "Something went wrong. Please email us at hi@weareconflict.com.";
      return;
    }

    // --- stan „wysłano" ---
    document.getElementById("cf-done-email").textContent = data.email;
    if (viaMail) {
      const lines = done.querySelectorAll(".sp-term__line");
      lines[1].textContent = "✓ draft ready in your email app";
      lines[2].textContent = "↳ hit send there and an expert will reply";
    }
    form.hidden = true;
    done.hidden = false;
    done.querySelector(".sp-term")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

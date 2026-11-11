// ===== CTA z kontekstem — linki do kontaktu w treści podstrony niosą temat strony =====
// contact.html?topic=<tytuł>&from=<plik.html?id=…>[&service=<chip>]#contact-form
// Formularz (contact-form.js) pokazuje kartę kontekstu, wpisuje temat do zgłoszenia i linkuje z powrotem.
export function contextCTAs({ topic, from, service }) {
  const q = new URLSearchParams();
  if (service) q.set("service", service);
  q.set("topic", topic);
  q.set("from", from);
  const href = `contact.html?${q}#contact-form`;
  requestAnimationFrame(() => {
    document.querySelectorAll('main a[href^="contact.html"]').forEach((a) => {
      if (a.getAttribute("href").includes("service=spartan")) return; // Team Spartan ma własny kontekst
      a.href = href;
    });
  });
}

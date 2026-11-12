// ===== Komponent: One team — JEDNO źródło prawdy dla kart zespołu =====
// Użycie w HTML (moduł ładować PRZED words-reveal / glitch / tilt / flip):
//   <div data-component="team"></div>       → sekcja „Every discipline, in-house" → „One team." + pas kart (główna, podstrony)
//   <div data-component="team-grid"></div>  → wszystkie karty w siatce 01→15 (strona Our team)
// Zmiana karty tutaj podmienia ją wszędzie.

// karta bez zdjęcia: wspólna grafika zastępcza (materials/zero.png), bez odwrotu
const placeholderCard = (name) =>
  `<li class="team__card team__card--photo team__card--placeholder fx-tilt" data-tilt>
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-a"><img class="team__photo media-video__el" src="materials/zero.png" alt="" loading="lazy" decoding="async" /></span>
  <span class="team__num">00</span>
  <div class="team__meta"><h3 class="team__name">${name}</h3></div>
</li>`;

// --- karty (każda: tilt; zdjęciowe: obrót ze skillami + glitch) ---
const CARDS = [
  `<li style="--photo-up: 9%" class="team__card team__card--photo fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Patrycja Piotrowska, Senior Product Designer — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-a"><img class="team__photo media-video__el" src="materials/Patrycja.png" alt="Patrycja Piotrowska" loading="lazy" decoding="async" /></span>
  <span class="team__num">03</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">Senior Product Designer</span><h3 class="team__name">Patrycja Piotrowska</h3></div>
  <!-- odwrót karty: podsumowanie kompetencji (źródło: LinkedIn — bio, certyfikaty) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Patrycja Piotrowska</h4>
    <p class="team__back-tag">Senior Product Designer · CONFLICT</p>
    <ul class="team__stats">
      <li><b>10</b><span>years of product design</span></li>
      <li><b>Claude</b><span>Code in Action — Anthropic</span></li>
    </ul>
    <ul class="team__skills">
      <li>Health · Green energy · Beauty · Banking · IoT · AI</li>
      <li>Bachelor’s in IT — design specialization</li>
      <li>IxDF — AI for Designers</li>
      <li>Hotjar Foundations Lvl. 2 · UX Writing (Uxcel)</li>
    </ul>
  </div>
</li>`,
  `<li class="team__card team__card--photo fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Rafał Pilawka, Senior Frontend Developer — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-b"><img class="team__photo media-video__el" src="materials/Raf.png" alt="Rafał Pilawka" loading="lazy" decoding="async" /></span>
  <span class="team__num">04</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">Senior Frontend</span><h3 class="team__name">Rafał Pilawka</h3></div>
  <!-- odwrót karty: podsumowanie kompetencji (źródło: LinkedIn) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Rafał Pilawka</h4>
    <p class="team__back-tag">Senior Frontend Developer · CONFLICT</p>
    <ul class="team__stats">
      <li><b>12+</b><span>years as CEO</span></li>
      <li><b>Claude</b><span>Certified Developer — Foundations</span></li>
    </ul>
    <ul class="team__skills">
      <li>CEO — ImaginatioStudio</li>
      <li>React / React Native · GraphQL — mDevelopers</li>
      <li>AWS Certified Developer — Associate · Cloud Practitioner</li>
      <li>BE Computer Science — Politechnika Częstochowska</li>
    </ul>
  </div>
</li>`,
  `<li class="team__card team__card--photo fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Tomasz Rej, Senior React Native Developer — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-a"><img class="team__photo media-video__el" src="materials/Tomasz.png" alt="Tomasz Rej" loading="lazy" decoding="async" /></span>
  <span class="team__num">05</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">Senior React Native</span><h3 class="team__name">Tomasz Rej</h3></div>
  <!-- odwrót karty: podsumowanie kompetencji (źródło: LinkedIn) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Tomasz Rej</h4>
    <p class="team__back-tag">Senior React Native Developer · CONFLICT</p>
    <ul class="team__stats">
      <li><b>7+</b><span>years React &amp; React Native</span></li>
      <li><b>Claude</b><span>Certified Architect — Foundations</span></li>
    </ul>
    <ul class="team__skills">
      <li>Senior Software Engineer — Calliope AI</li>
      <li>React Native Developer — Netguru</li>
      <li>AWS Certified Developer — Associate</li>
      <li>AWS Certified AI Practitioner</li>
    </ul>
  </div>
</li>`,
  `<li class="team__card team__card--photo fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Magda Rej, Software Quality Assurance Engineer — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-b"><img class="team__photo media-video__el" src="materials/Magda.png" alt="Magda Rej" loading="lazy" decoding="async" /></span>
  <span class="team__num">06</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">QA Engineer</span><h3 class="team__name">Magda Rej</h3></div>
  <!-- odwrót karty: podsumowanie kompetencji (źródło: LinkedIn) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Magda Rej</h4>
    <p class="team__back-tag">Software Quality Assurance Engineer · CONFLICT</p>
    <ul class="team__stats">
      <li><b>3+</b><span>years software QA</span></li>
      <li><b>Playwright</b><span>Postman · Scrum</span></li>
    </ul>
    <ul class="team__skills">
      <li>Software QA Tester — Evisa Express</li>
      <li>Software QA Tester — mDevelopers</li>
      <li>Regression testing</li>
      <li>Functional testing</li>
    </ul>
  </div>
</li>`,
  `<li class="team__card team__card--photo team__card--lead fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Leo Mata, CEO &amp; Founder — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-a"><img class="team__photo media-video__el" src="materials/Leo.png" alt="Leo Mata" loading="lazy" decoding="async" /></span>
  <span class="team__num">01</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">CEO &amp; Founder</span><h3 class="team__name">Leo Mata</h3></div>
  <!-- odwrót karty: podsumowanie najważniejszych kompetencji (źródło: leomata.com) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Leo Mata</h4>
    <p class="team__back-tag">Leadership · Scale · AI &amp; Product</p>
    <ul class="team__stats">
      <li><b>25+</b><span>years building</span></li>
      <li><b>Billions</b><span>users served</span></li>
    </ul>
    <ul class="team__skills">
      <li>Engineering Leadership</li>
      <li>Product &amp; AI</li>
      <li>Scale &amp; Reliability</li>
      <li>Security &amp; Compliance</li>
    </ul>
    <div class="team__back-links">
      <a href="https://leomata.com/" target="_blank" rel="noopener" tabindex="-1">leomata.com ↗</a>
      <a href="https://www.linkedin.com/in/leonardomata" target="_blank" rel="noopener" tabindex="-1">LinkedIn ↗</a>
    </div>
  </div>
</li>`,
  `<li class="team__card team__card--photo fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Piotr Pietruszewski, React Native Lead Developer — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-b"><img class="team__photo media-video__el" src="materials/Piotr.png" alt="Piotr Pietruszewski" loading="lazy" decoding="async" /></span>
  <span class="team__num">02</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">React Native Lead</span><h3 class="team__name">Piotr Pietruszewski</h3></div>
  <!-- odwrót karty: podsumowanie kompetencji (źródło: LinkedIn) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Piotr Pietruszewski</h4>
    <p class="team__back-tag">React Native Lead Developer · CONFLICT</p>
    <ul class="team__stats">
      <li><b>8+</b><span>years front-end &amp; mobile</span></li>
      <li><b>AWS</b><span>Certified Cloud Practitioner</span></li>
    </ul>
    <ul class="team__skills">
      <li>Senior React Native — Pulsetto, Flip</li>
      <li>React Native Team Leader — Netguru</li>
      <li>Co-owner &amp; Front-end Developer — P2</li>
      <li>Eng. Computer Science</li>
    </ul>
  </div>
</li>`,
  placeholderCard("Byron Miranda"),
  placeholderCard("Hiram Gonzalez"),
  placeholderCard("Luis Hernandez"),
  placeholderCard("Julio Rojas"),
  placeholderCard("Alicia Salazar"),
  placeholderCard("Oscar Morera"),
  placeholderCard("Eddie"),
  placeholderCard("Jakub Pilawka"),
  `<li class="team__card team__card--photo fx-tilt" data-tilt data-flip role="button" tabindex="0" aria-pressed="false" aria-label="Maciej Stolarek, Senior Frontend Developer — show key skills">
  <span class="team__photo-wrap media-video fx-glitch fx-glitch--soft is-mode-a"><img class="team__photo media-video__el" src="materials/maciej.png" alt="Maciej Stolarek" loading="lazy" decoding="async" /></span>
  <span class="team__num">00</span>
  <span class="team__flip-hint" aria-hidden="true">↻</span>
  <div class="team__meta"><span class="team__cert">Senior Frontend Developer</span><h3 class="team__name">Maciej Stolarek</h3></div>
  <!-- odwrót karty: podsumowanie kompetencji (źródło: LinkedIn) -->
  <div class="team__back" data-flip-back aria-hidden="true">
    <h4 class="team__back-name">Maciej Stolarek</h4>
    <p class="team__back-tag">Senior Frontend Developer · CONFLICT</p>
    <ul class="team__stats">
      <li><b>Senior</b><span>React Native Developer — Pulsetto</span></li>
      <li><b>RN · JS</b><span>React Native · JavaScript</span></li>
    </ul>
    <ul class="team__skills">
      <li>Mobile Team Leader — Pulsetto</li>
      <li>Software Developer — Domatic</li>
      <li>Software Developer — i4B</li>
      <li>Software Developer — self-employed</li>
    </ul>
  </div>
</li>`
];

// kolejność zespołu (pas i siatka): Leo pierwszy, reszta wymieszana — zdjęcia przeplecione z inicjałami.
// Numery na kartach nadawane są automatycznie według tej listy (01, 02, …).
const ORDER = [
  "Leo Mata", "Julio Rojas", "Patrycja Piotrowska", "Oscar Morera", "Tomasz Rej",
  "Byron Miranda", "Alicia Salazar", "Rafał Pilawka", "Hiram Gonzalez", "Magda Rej",
  "Jakub Pilawka", "Piotr Pietruszewski", "Eddie", "Luis Hernandez", "Maciej Stolarek"
];
const nameOf = (html) => (html.match(/team__name">([^<]+)</) || [])[1];
const rank = (html) => { const i = ORDER.indexOf(nameOf(html)); return i < 0 ? ORDER.length : i; };
const ORDERED = [...CARDS]
  .sort((a, b) => rank(a) - rank(b))
  .map((c, i) => c.replace(/team__num">\d+/, `team__num">${String(i + 1).padStart(2, "0")}`));
const MARQUEE_ORDER = ORDERED;
const GRID_ORDER = ORDERED;
const cardsHTML = (list) => list.map((c) => "        " + c.replace(/\n/g, "\n        ")).join("\n");
// kopia karty do pętli pasa: ukryta dla czytników, poza kolejnością Tab
const cloneCard = (c) =>
  c.replace("<li ", '<li data-clone aria-hidden="true" ').replace(/tabindex="0"/g, 'tabindex="-1"');

const TEAM_HTML = `
  <section class="places" id="team" aria-label="Our disciplines">
    <p class="places__kicker" data-reveal>Every discipline, in-house</p>
    <p class="places__statement" id="places-statement">
      <span class="place__word">AI Engineering.</span>
      <span class="place__word">Product Design.</span>
      <span class="place__word">ML Engineering.</span>
      <span class="place__word">UX Research.</span>
      <span class="place__word">LLM Engineering.</span>
      <span class="place__word">Design Systems.</span>
      <span class="place__word">Frontend.</span>
      <span class="place__word">Frontend Engineering.</span>
      <span class="place__word">Web Development.</span>
      <span class="place__word">UI Engineering.</span>
      <span class="place__word">Responsive Design.</span>
      <span class="place__word">Web Performance.</span>
      <span class="place__word">Accessibility.</span>
      <span class="place__word">Motion Design.</span>
      <span class="place__word">Backend.</span>
      <span class="place__word">Prompt Engineering.</span>
      <span class="place__word">Agent Engineering.</span>
      <span class="place__word">Full-Stack.</span>
      <span class="place__word">Computer Vision.</span>
      <span class="place__word">Mobile.</span>
      <span class="place__word">Mobile Development.</span>
      <span class="place__word">iOS Development.</span>
      <span class="place__word">Android Development.</span>
      <span class="place__word">Cross-Platform Apps.</span>
      <span class="place__word">NLP.</span>
      <span class="place__word">API Design.</span>
      <span class="place__word">Model Training.</span>
      <span class="place__word">Data Science.</span>
      <span class="place__word">Data Engineering.</span>
      <span class="place__word">Data Analytics.</span>
      <span class="place__word">Database Dev.</span>
      <span class="place__word">Cloud Architecture.</span>
      <span class="place__word">DevOps.</span>
      <span class="place__word">MLOps.</span>
      <span class="place__word">Platform Engineering.</span>
      <span class="place__word">Site Reliability.</span>
      <span class="place__word">Observability.</span>
      <span class="place__word">Infrastructure.</span>
      <span class="place__word">QA Automation.</span>
      <span class="place__word">Security.</span>
    </p>
    <p class="places__team" id="places-team"><span class="place__word place__word--team" data-text="One team.">One&nbsp;team.</span></p>

    <div class="team__marquee" id="team-marquee">
      <ul class="team__cards" id="team-cards" aria-label="Certified engineers">
${cardsHTML(MARQUEE_ORDER)}
${cardsHTML(MARQUEE_ORDER.map(cloneCard))}
      </ul>
    </div>
  </section>
`;

const GRID_HTML = `
  <ul class="team__cards team-grid" aria-label="Our team">
${cardsHTML(GRID_ORDER)}
  </ul>`;

// data-team-only na znaczniku → sama „One team." + pas kart, bez linii „Every discipline, in-house" i listy dyscyplin (strona główna)
const mount = (name, html) =>
  document.querySelectorAll(`[data-component="${name}"]`).forEach((el) => {
    let out = html.trim();
    if (el.hasAttribute("data-team-only"))
      out = out
        .replace(/\s*<p class="places__kicker"[^>]*>[\s\S]*?<\/p>/, "")
        .replace(/\s*<p class="places__statement"[^>]*>[\s\S]*?<\/p>/, "")
        .replace('class="places"', 'class="places places--team-only"');
    el.insertAdjacentHTML("beforebegin", out);
    el.remove();
  });

mount("team", TEAM_HTML);
mount("team-grid", GRID_HTML);

// liczba osób (np. w hero strony Our team) — zawsze zgodna z listą kart
document.querySelectorAll("[data-team-count]").forEach((el) => { el.textContent = String(CARDS.length).padStart(2, "0"); });

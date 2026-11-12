// ===== Komponent: diagram „Build · Run · Govern" (Calliope AI → Astrolift → Zentinelle) =====
// Użycie: loopDiagram("astrolift") → string <svg>. Bieżący produkt jest wyróżniony (klasa .is-current).
// Styl w subpage.css (.sp-loop …): jednolite kolory, bez gradientów; przepływ = animowane przerywane linie.

const box = (x, y, w, h, cls = "") => `<rect class="sp-loop__box ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
const chip = (x, y, w, label) =>
  `<g class="sp-loop__chip"><rect x="${x}" y="${y}" width="${w}" height="30" rx="6"/><text x="${x + w / 2}" y="${y + 20}" text-anchor="middle">${label}</text></g>`;
const flow = (d, cls = "") => `<path class="sp-loop__flow ${cls}" d="${d}" marker-end="url(#sp-loop-arrow)"/>`;
const label = (x, y, t, cls = "") => `<text class="sp-loop__label ${cls}" x="${x}" y="${y}" text-anchor="middle">${t}</text>`;
const step = (x, y, n) => `<g class="sp-loop__step"><circle cx="${x}" cy="${y}" r="14"/><text x="${x}" y="${y + 5}" text-anchor="middle">${n}</text></g>`;

export function loopDiagram(current = "") {
  const cur = (id) => (id === current ? "is-current" : "");
  return `<svg class="sp-loop" viewBox="0 0 1200 640" role="img" aria-labelledby="sp-loop-t sp-loop-d" xmlns="http://www.w3.org/2000/svg">
  <title id="sp-loop-t">Build, run, govern: how Calliope AI, Astrolift and Zentinelle work together</title>
  <desc id="sp-loop-d">Teams build apps and agents in Calliope AI and push them with an astrolift.toml manifest. Astrolift deploys them into Kubernetes in your own cloud. Every agent call to a model goes through Zentinelle, which enforces policies and records an audit trail, and approvals and evidence flow back to the team.</desc>
  <defs>
    <marker id="sp-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="sp-loop__arrowhead"/></marker>
  </defs>

  <!-- BUILD: Calliope AI -->
  <g class="sp-loop__node ${cur("calliope-ai")}">
    ${box(30, 70, 250, 300)}
    <text class="sp-loop__role" x="52" y="104">01 · BUILD</text>
    <text class="sp-loop__name" x="52" y="140">CALLIOPE AI</text>
    <text class="sp-loop__sub" x="52" y="164">where the team builds with AI</text>
    ${chip(52, 190, 206, "AI IDE · background agents")}
    ${chip(52, 232, 206, "Lab · AI notebooks")}
    ${chip(52, 274, 206, "CLI coding agent")}
    ${chip(52, 316, 206, "Inbox · approvals")}
  </g>

  <!-- RUN: Astrolift -->
  <g class="sp-loop__node ${cur("astrolift")}">
    ${box(380, 70, 330, 300)}
    <text class="sp-loop__role" x="402" y="104">02 · RUN</text>
    <text class="sp-loop__name" x="402" y="140">ASTROLIFT</text>
    <text class="sp-loop__sub" x="402" y="164">control plane · Django · GraphQL · Temporal</text>
    ${chip(402, 190, 138, "Apps · previews")}
    ${chip(550, 190, 138, "Agents · workflows")}
    ${chip(402, 232, 138, "Managed services")}
    ${chip(550, 232, 138, "Model hosting")}
    ${chip(402, 274, 286, "Dashboard · CLI · GraphQL · MCP")}
    ${chip(402, 316, 286, "RBAC · action safety · audit")}
  </g>

  <!-- YOUR CLOUD: Kubernetes -->
  <g class="sp-loop__node sp-loop__node--cloud">
    ${box(810, 70, 360, 300, "sp-loop__box--dashed")}
    <text class="sp-loop__role" x="832" y="104">YOUR CLOUD</text>
    <text class="sp-loop__name" x="832" y="140">KUBERNETES</text>
    <text class="sp-loop__sub" x="832" y="164">vanilla · EKS · GKE · AKS</text>
    <g class="sp-loop__pod"><rect x="832" y="192" width="98" height="64" rx="8"/><text x="881" y="221" text-anchor="middle">APP</text><text class="sp-loop__podsub" x="881" y="240" text-anchor="middle">+ PR preview</text></g>
    <g class="sp-loop__pod sp-loop__pod--agent"><rect x="942" y="192" width="98" height="64" rx="8"/><text x="991" y="221" text-anchor="middle">AGENT</text><text class="sp-loop__podsub" x="991" y="240" text-anchor="middle">bounded job</text></g>
    <g class="sp-loop__pod"><rect x="1052" y="192" width="98" height="64" rx="8"/><text x="1101" y="221" text-anchor="middle">MODEL</text><text class="sp-loop__podsub" x="1101" y="240" text-anchor="middle">vLLM · Bedrock</text></g>
    ${chip(832, 274, 318, "Postgres · Redis · object storage")}
    ${chip(832, 316, 318, "Your account — nothing left ours")}
  </g>

  <!-- GOVERN: Zentinelle -->
  <g class="sp-loop__node ${cur("zentinelle")}">
    ${box(380, 450, 520, 150)}
    <text class="sp-loop__role" x="402" y="484">03 · GOVERN</text>
    <text class="sp-loop__name" x="402" y="520">ZENTINELLE</text>
    <text class="sp-loop__sub" x="402" y="544">between every agent</text>
    <text class="sp-loop__sub" x="402" y="564">and its model</text>
    ${chip(600, 470, 130, "24 policies")}
    ${chip(740, 470, 140, "Content scan")}
    ${chip(600, 512, 130, "Audit chain")}
    ${chip(740, 512, 140, "Risk register")}
    ${chip(600, 554, 280, "SOC 2 · GDPR · EU AI Act")}
  </g>

  <!-- LLM providers -->
  <g class="sp-loop__node sp-loop__node--ext">
    ${box(960, 470, 210, 110, "sp-loop__box--dashed")}
    <text class="sp-loop__role" x="980" y="502">MODEL PROVIDERS</text>
    <text class="sp-loop__sub" x="980" y="530">Anthropic · OpenAI</text>
    <text class="sp-loop__sub" x="980" y="552">Google · local models</text>
  </g>

  <!-- przepływy -->
  ${flow("M280 200 L376 200")}
  ${label(328, 186, "git push")}
  ${label(328, 222, "+ manifest", "sp-loop__label--mono")}
  ${flow("M710 200 L806 200")}
  ${label(758, 186, "deploy")}
  ${flow("M991 372 L991 390 Q991 410 960 410 L900 410 Q870 410 870 430 L870 446", "sp-loop__flow--hot")}
  ${label(1080, 400, "agent → model calls", "sp-loop__label--hot")}
  ${flow("M900 525 L956 525", "sp-loop__flow--hot")}
  ${flow("M155 370 L155 525 L376 525", "sp-loop__flow--hot")}
  ${label(268, 512, "IDE & CLI agents", "sp-loop__label--hot")}
  ${flow("M520 450 L520 420 Q520 400 500 400 L190 400 Q170 400 170 380 L170 374", "sp-loop__flow--back")}
  ${label(340, 392, "approvals · evidence · inbox replies")}

  ${step(30 + 125, 50, "1")}
  ${step(380 + 165, 50, "2")}
  ${step(810 + 180, 50, "3")}
  ${step(380 + 260, 430 + 0, "4")}
</svg>`;
}

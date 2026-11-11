// ===== Dane problemów (jedno źródło prawdy dla problems.html i problem.html) =====
// Treść 1:1 z weareconflict.com/problems/* (ref/weareconflict). Nie dopisywać własnych tekstów.
export const PROBLEM_GROUPS = [
  {
    "id": "delivery",
    "name": "Delivery & Team Challenges"
  },
  {
    "id": "infra",
    "name": "Architecture & Infra Problems"
  },
  {
    "id": "product",
    "name": "Product & Experience Breakdowns"
  },
  {
    "id": "data",
    "name": "Data, AI & Innovation Pain Points"
  }
];

export const PROBLEMS = [
  {
    "id": "dev-team-friction",
    "group": "delivery",
    "name": "Dev Team Friction",
    "tag": "Slow, overloaded, or misaligned teams",
    "title": "When your team’s stuck in neutral, nothing ships.",
    "intro": [
      "You’ve got smart people — but the roadmap keeps slipping. Maybe it’s too many meetings and not enough code. Maybe burnout is spreading. Maybe that “quick fix” is now six sprints late.",
      "Whether you’re dealing with low morale, high turnover, or just plain velocity drag, internal team friction kills momentum. At CONFLICT, we help teams unjam the gears and get back to building."
    ],
    "symptoms": [
      "Projects are dragging and morale’s tanking",
      "The roadmap is a wish list, not a plan",
      "Quality’s inconsistent, and nobody’s quite sure who owns what",
      "You’re spending more time in retros than writing code"
    ],
    "help": [
      "We drop in senior engineers who get up to speed fast",
      "We implement frameworks (like Boilerworks) that simplify build pipelines",
      "We stabilize delivery with embedded team support and staff augmentation",
      "We bring clarity: clear roles, better tools, and ruthless focus on shipping"
    ],
    "quote": "“Too many teams operate like a car with the parking brake on. We help you release it — and hit the gas.”",
    "callUs": [
      "Your team is overloaded and can’t take on one more thing",
      "You’re on your third rewrite and nothing’s shipping",
      "Leadership is losing confidence in engineering output",
      "You need short-term firepower while hiring (or re-orgs) catch up"
    ],
    "contact": {
      "heading": "Ready to get unstuck?",
      "text": "Your team doesn’t have to burn out just to deliver. Bring in a pit crew that knows how to unblock, stabilize, and accelerate."
    }
  },
  {
    "id": "need-for-speed",
    "group": "delivery",
    "name": "Need for Speed",
    "tag": "Missed timelines, slipping product launches",
    "title": "When timelines slip, so does business momentum.",
    "intro": [
      "The product launch got pushed — again. Execs are asking tough questions. Teams are spinning on MVP scoping, and “just one more change” keeps derailing the plan.",
      "You’re not just behind schedule — you’re losing altitude. At CONFLICT, we help organizations move from “hurry up and wait” to high-velocity execution."
    ],
    "symptoms": [
      "Deadlines missed, launches delayed, trust eroding",
      "Scope creep and shifting priorities",
      "Delivery teams waiting on decisions — or working from outdated ones",
      "Business-side leadership frustrated by engineering pace"
    ],
    "help": [
      "We stabilize product plans with realistic roadmaps and clear sequencing",
      "We unblock bottlenecks: technical, process, or personnel",
      "We install rapid, testable CI/CD flows to shorten feedback loops",
      "We bring the team into alignment: design, engineering, and product rowing in sync"
    ],
    "quote": "“You don’t need to go faster — you need to stop wasting speed.”",
    "callUs": [
      "You’re weeks (or months) behind a critical launch",
      "You’ve got ambitious goals, but execution isn’t keeping up",
      "Teams are constantly reacting, not building",
      "You’re in a pressure cooker and need tactical delivery help — yesterday"
    ],
    "contact": {
      "heading": "Ready to get unstuck?",
      "text": "Speed isn’t just about hustle. It’s about alignment, clarity, and the right systems. Let’s move your roadmap from stuck to shipped."
    }
  },
  {
    "id": "headcount-frozen-roadmaps-not",
    "group": "delivery",
    "name": "Hiring Freeze",
    "tag": "Roadmap demands without the headcount",
    "title": "You can’t hire. But you still have to ship.",
    "intro": [
      "Whether you’re under a hiring freeze, navigating budget headwinds, or just can’t find qualified engineers fast enough — your roadmap doesn’t pause.",
      "The pressure to deliver is real, but the resources aren’t.",
      "That’s where we come in.",
      "CONFLICT drops in with senior engineers who move fast, integrate smoothly, and don’t need onboarding.",
      "No long recruiting cycle. No watered-down contractors. Just velocity."
    ],
    "symptoms": [
      "Open roles stay open for months",
      "You’re over budget but under-resourced",
      "Internal teams are burning out trying to “do more with less”",
      "You need to ship, but hiring is blocked or frozen"
    ],
    "help": [
      "Drop-in senior engineers who slot in fast and deliver immediately",
      "Staff augmentation that doesn’t require handholding",
      "Fractional CTO or architecture support for short-term wins",
      "Clear scopes, tight delivery loops, and aligned velocity"
    ],
    "quote": "“We don’t just fill seats — we move the work forward.”",
    "callUs": [
      "You’re stuck waiting on hires but need to hit quarterly goals",
      "Your team’s overwhelmed and at risk of burnout",
      "You’re trying to avoid shipping delays without blowing up the budget",
      "You need temporary firepower — not permanent headcount"
    ],
    "contact": {
      "heading": "Can’t hire? We’ve got you.",
      "text": ""
    }
  },
  {
    "id": "you-hired-help-and-still-got-nowhere",
    "group": "delivery",
    "name": "Death by Consultant",
    "tag": "Hired help, no velocity",
    "title": "We ship. We solve. We don’t disappear after discovery.",
    "intro": [
      "You brought in a big-name firm (or three). They scoped. They strategized. They maybe even delivered a fancy roadmap. But after months of meetings and invoices? Your product’s still on ice. At CONFLICT, we’re allergic to “consulting theater.”"
    ],
    "symptoms": [
      "Endless workshops, but no working code",
      "Deliverables that look nice but don’t move the roadmap",
      "Vague plans, bloated teams, and a revolving door of “partners”",
      "Stakeholder fatigue and a blown budget"
    ],
    "help": [
      "Tactical planning + immediate execution — not just PowerPoint",
      "Small senior teams that move fast and stay focused",
      "Transparent scoping and pricing that maps to actual delivery",
      "Full-stack, full-cycle builders: we ship what we scope"
    ],
    "quote": "“We’re not here to workshop. We’re here to work.”",
    "callUs": [
      "Your last vendor gave you slides instead of software",
      "You need a team that can ship without endless overhead",
      "You want small, senior, and hands-on — not bloated and vague",
      "You’re burned, skeptical, but still need help"
    ],
    "contact": {
      "heading": "Let’s turn your backlog into shipped code.",
      "text": ""
    }
  },
  {
    "id": "cloud-chaos",
    "group": "infra",
    "name": "Cloud Chaos",
    "tag": "Sprawl, flakiness, and ballooning costs",
    "title": "Your cloud shouldn’t feel like a black hole.",
    "intro": [
      "Your infrastructure was supposed to be flexible. Scalable. Efficient. Instead? You’re juggling environments, deployments are flaky, and no one knows what’s running where. It’s not cloud-native — it’s cloud-chaotic. At CONFLICT, we help teams tame complexity, reduce spend, and build production-grade infra that actually works."
    ],
    "symptoms": [
      "Dev and staging are out of sync",
      "Infra was cobbled together and no one knows how it works",
      "You’re spending more on the cloud than you did on headcount",
      "Every deploy feels like a leap of faith — and rollback is a prayer"
    ],
    "help": [
      "Infrastructure as code: Terraform, Pulumi, Crossplane — no more snowflakes",
      "CI/CD pipelines that take code from Git to prod with confidence",
      "Containerization, autoscaling, and smart networking that just works",
      "Observability from day one: metrics, traces, and alerting that tell the truth",
      "Clear separation of environments, with sanity-saving controls and rollback"
    ],
    "quote": "“We bring order to chaos — and build infra you can actually trust.”",
    "callUs": [
      "You’re scaling up and infra is buckling under the pressure",
      "Developers are wasting time debugging broken environments",
      "Cloud bills are high, but uptime is still shaky",
      "You want infrastructure that’s reliable and understandable"
    ],
    "contact": {
      "heading": "Let’s clean house",
      "text": "We help teams graduate from cloud spaghetti to production-ready platforms — fast."
    }
  },
  {
    "id": "vendor-lock-in",
    "group": "infra",
    "name": "Vendor Lock-In",
    "tag": "Trapped in one provider’s orbit",
    "title": "Stuck with one provider — and nowhere to go?",
    "intro": [
      "Your cloud bills are climbing. Your team is handcuffed to a single platform.",
      "Every architectural decision feels dictated by your vendor’s roadmap — not yours.",
      "Welcome to vendor lock-in.",
      "At CONFLICT, we build systems that don’t care where they live. Because you should own your stack — not rent it."
    ],
    "symptoms": [
      "You’re deep in AWS/GCP/Azure, and every change costs a fortune",
      "Portability is a pipe dream — and multi-cloud is still a myth",
      "Executive pressure to reduce spend, but no clear way out",
      "Your architecture was designed for speed — not flexibility"
    ],
    "help": [
      "Audit and redesign your architecture for portability and resilience",
      "Migrate across cloud providers, or to hybrid/on-prem setups",
      "Use tools like Terraform, Crossplane, and containers to abstract provider dependency",
      "Build a long-term strategy for cloud independence and spend control"
    ],
    "quote": "“You didn’t sign up for vendor jail. Let’s build you an exit.”",
    "callUs": [
      "Cloud costs are spiraling and execs want options",
      "You’re trying to plan infra with more control (or better contracts)",
      "You’re stuck with proprietary services that won’t scale",
      "Your roadmap is hostage to someone else’s feature release schedule"
    ],
    "contact": {
      "heading": "Time to break free.",
      "text": "We’ll help you design infrastructure that’s agile, cost-aware, and independent by default. Time to break free from cloud captivity."
    }
  },
  {
    "id": "your-stack-doesnt-match-your-scale",
    "group": "infra",
    "name": "Platform Mismatch",
    "tag": "Systems not built for your scale",
    "title": "It worked in the beginning. Now it’s a bottleneck.",
    "intro": [
      "That early tech stack got you off the ground. But now? It’s groaning under load, resisting change, and slowing your team down. We see it all the time: wrong frameworks, aging platforms, infra that wasn’t built to flex. At CONFLICT, we help teams escape the trap of mismatched systems — and build foundations that support real growth."
    ],
    "symptoms": [
      "Performance bottlenecks that no one wants to touch",
      "Tech choices from “back when we were scrappy” holding you back",
      "Scaling issues, security gaps, or feature velocity hitting a wall",
      "Internal debates over “rewrite vs refactor” that never end"
    ],
    "help": [
      "Tech stack audits with pragmatic upgrade paths",
      "Framework migrations and system re-architecture without burning the house down",
      "Modular platforms and infra designed for flexibility",
      "Backwards-compatible rollouts and roadmap-driven change management"
    ],
    "quote": "“We help you scale without starting from scratch.”",
    "callUs": [
      "You’ve outgrown your current framework or platform",
      "Performance is dragging and your engineers are begging for change",
      "Stakeholders are nervous to touch the stack",
      "You know the system needs help — but don’t know where to start"
    ],
    "contact": {
      "heading": "Let’s realign your platform with your ambitions.",
      "text": ""
    }
  },
  {
    "id": "fake-devops-real-problems",
    "group": "infra",
    "name": "Fake DevOps",
    "tag": "Too many dashboards, not enough delivery",
    "title": "Too many dashboards. Not enough delivery.",
    "intro": [
      "DevOps isn’t just a set of tools — it’s how elite teams ship reliably, repeatedly, and without fear.",
      "But in a lot of orgs, DevOps has become theater: flaky pipelines, unclear ownership, and “automations” that no one trusts.",
      "If your deploys are still stressful and your infra is duct-taped together, we can help.",
      "At CONFLICT, we rebuild delivery culture from the ground up — no fluff, just real velocity."
    ],
    "symptoms": [
      "Deploys require heroics — or luck",
      "CI/CD is brittle, slow, or breaks often",
      "“DevOps” means one engineer on PagerDuty and a wall of dashboards",
      "No clear ownership of environments, reliability, or automation"
    ],
    "help": [
      "Design robust CI/CD pipelines that actually get code to prod",
      "Infrastructure as code, GitOps, and config management that scales",
      "Build clear SLOs, incident workflows, and on-call systems",
      "Untangle who owns what — and document it",
      "Help your team ship confidently, not just react to fire drills"
    ],
    "quote": "“If your deploys still feel like a gamble, it’s not DevOps — it’s damage control.”",
    "callUs": [
      "You’ve invested in “DevOps” but delivery is still a mess",
      "You want faster, safer deploys — without relying on a single hero",
      "Your infra is snowflake-ridden and no one trusts the pipeline",
      "You need a delivery system, not a bunch of disconnected tools"
    ],
    "contact": {
      "heading": "Let’s cut the theater and get back to shipping.",
      "text": ""
    }
  },
  {
    "id": "youre-flying-blind",
    "group": "infra",
    "name": "No Observability",
    "tag": "Flying blind in production",
    "title": "If something breaks in production and no alert fires… did it even happen?",
    "intro": [
      "It’s 2AM and no one knows what’s wrong. Or worse — it’s 2PM and nobody noticed anything at all. Observability isn’t just about monitoring uptime. It’s about understanding your systems, diagnosing issues, and staying ahead of failure. At CONFLICT, we help teams get visibility that’s real — not reactive. Logs, traces, metrics, and alerts that work together. Dashboards that tell the truth. Signals, not noise."
    ],
    "symptoms": [
      "Incidents take hours to detect and longer to debug",
      "Alerts are noisy, flaky, or ignored",
      "No clear source of truth for system health",
      "Teams struggle to answer “what’s broken?” and “why?”"
    ],
    "help": [
      "End-to-end observability with metrics, logs, traces, and dashboards",
      "Alerting systems tuned to your risk, not just your stack",
      "Platform-wide instrumentation with OpenTelemetry, Prometheus, Grafana, and more",
      "Logging and tracing pipelines with context, not clutter"
    ],
    "quote": "“You can’t fix what you can’t see. We turn on the lights.”",
    "callUs": [
      "You’ve had an outage and still don’t know what caused it",
      "Your alerts cry wolf or say nothing at all",
      "You’re scaling fast and your current monitoring won’t keep up",
      "Your SREs are burned out chasing ghosts"
    ],
    "contact": {
      "heading": "Observability should be a superpower — not a blindfold.",
      "text": ""
    }
  },
  {
    "id": "sre-gaps",
    "group": "infra",
    "name": "SRE Gaps",
    "tag": "Unstable systems, tired teams",
    "title": "Unstable systems. Burned-out engineers. And no one knows why it broke.",
    "intro": [
      "You’ve got production systems… but they’re fragile. Incidents feel random. Alerts are noisy. Nobody wants to be on-call — and your customers are feeling the pain.",
      "This isn’t just bad luck. It’s a missing discipline.",
      "At CONFLICT, we help teams build Site Reliability Engineering practices that work in the real world: resilient systems, clear ownership, meaningful metrics, and calmer engineers."
    ],
    "symptoms": [
      "Frequent outages with no clear root cause",
      "On-call rotations that burn out your best engineers",
      "Alert fatigue — or worse, radio silence when it matters most",
      "No SLOs, SLIs, or incident process"
    ],
    "help": [
      "SRE frameworks that match your team size and tech stack",
      "Practical incident response playbooks and on-call design",
      "Service-level objectives (SLOs), indicators (SLIs), and error budgets",
      "Observability tools and alerting strategies with real signal",
      "Shared services and support retainers if you need a hand now"
    ],
    "quote": "“Reliability isn’t luck. It’s design, discipline, and delivery — and we build it in from the start.”",
    "callUs": [
      "Your team dreads getting paged — and your customers are noticing",
      "Incidents keep repeating without resolution",
      "Leadership wants SLAs, but no one knows how to get there",
      "You need help today, not a six-month migration plan"
    ],
    "contact": {
      "heading": "Let’s make it reliable",
      "text": "We turn chaos into clarity — and downtime into resilience. Let’s get your systems steady and your team breathing again."
    }
  },
  {
    "id": "ecommerce-struggles",
    "group": "product",
    "name": "Ecomm Struggles",
    "tag": "Checkout friction, bad CX, slow pages",
    "title": "Conversion-killing carts, slow pages, and a backend held together with duct tape.",
    "intro": [
      "You’ve got a storefront… but it’s leaking revenue.",
      "From abandoned carts to broken search, bloated plugins to janky fulfillment — ecommerce systems have a way of buckling under growth.",
      "We’ve helped billion-dollar brands fix their flows, rewire their stacks, and win back conversions.",
      "At CONFLICT, we bring full-stack commerce architecture that’s built to scale, convert, and perform."
    ],
    "symptoms": [
      "High cart abandonment and low checkout completion",
      "Slow load times, poor search, or clunky product discovery",
      "CRM, loyalty, and retention tools not pulling their weight",
      "Broken fulfillment workflows and backend bottlenecks",
      "Inconsistent tax, pricing, or localization logic across regions"
    ],
    "help": [
      "Cart and checkout optimization that cuts friction and boosts AOV",
      "Custom platforms or tailored builds with Saleor, Shopify, Magento, NetSuite, etc.",
      "CRM, loyalty, and personalization systems engineered for ROI",
      "Backend automation across ERP, OMS, and fulfillment systems",
      "Global ecommerce infrastructure: tax, localization, and compliance",
      "Performance tuning for speed, SEO, and resilience under load"
    ],
    "quote": "“We’ve fixed carts processing nine figures. We can fix yours.”",
    "callUs": [
      "You’re throwing traffic at a broken checkout",
      "Every new integration feels like a risk",
      "Your ecommerce stack can’t keep up with growth",
      "You need expert hands on systems, not just storefront themes"
    ],
    "contact": {
      "heading": "Let’s rebuild what’s broken",
      "text": "Let’s untangle your stack and unlock your store’s potential. We’ll help you scale the systems behind the sale."
    }
  },
  {
    "id": "your-mobile-app-is-a-mess-or-still-on-the-whiteboard",
    "group": "product",
    "name": "Mobile Mess",
    "tag": "Legacy apps, bloated builds, unclear strategy",
    "title": "Legacy code. Bloated builds. Bad UX. We’ve seen it all.",
    "intro": [
      "Mobile is a channel you can’t ignore — but building the right app, the right way, is harder than it looks. Maybe your team started and stalled. Maybe the UX is clunky, the stack’s outdated, or the release process is a nightmare. We don’t just salvage broken apps — we ship mobile experiences that feel right, work beautifully, and scale when you do."
    ],
    "symptoms": [
      "Your mobile app is half-built, buggy, or hasn’t shipped",
      "UX/UI feels like a 2014 throwback — and not in a cool way",
      "You’re juggling React Native, Swift, Flutter, or who-knows-what",
      "Your web team’s moonlighting as mobile devs (and hating it)"
    ],
    "help": [
      "Audit your current codebase and recommend a path forward",
      "Native iOS/Android or cross-platform React Native — we pick what fits",
      "Design, engineering, and performance tuning under one roof",
      "Seamless integration with your backend, analytics, and workflows",
      "Fast MVPs, scalable builds, and long-term maintainability"
    ],
    "quote": "“We’ve rescued apps from rewrite hell — and shipped new ones in 90 days.”",
    "callUs": [
      "Your mobile app is stalled, buggy, or burning cash",
      "You’re about to start a build and want to do it right",
      "You need senior engineers who’ve shipped apps that scale",
      "You’re ready to treat mobile like a first-class citizen"
    ],
    "contact": {
      "heading": "Let’s make your mobile experience world-class.",
      "text": "Don’t let your mobile app be the weakest link. Let’s build something users actually love."
    }
  },
  {
    "id": "internal-apps-you-shouldnt-be-building",
    "group": "product",
    "name": "Internal App Misfit",
    "tag": "DIY admin panels draining your team",
    "title": "Too many product teams get stuck rebuilding the same dashboards, forms, and approval flows over and over again.",
    "intro": [
      "It’s not that internal tools aren’t important — it’s that they’re a terrible use of your best engineers.",
      "At CONFLICT, we handle the boring-but-critical stuff with speed and taste.",
      "From ops dashboards to workflow systems, we’ll build it clean, scalable, and out of your team’s way — so they can get back to core product."
    ],
    "symptoms": [
      "Developers stuck in Jira hell maintaining internal tools",
      "Business teams begging for fixes, tweaks, or basic features",
      "Fragmented tools stitched together with duct tape",
      "Valuable product engineers working on CRUD flows and reporting"
    ],
    "help": [
      "Design and build robust internal tools for ops, finance, CX, and more",
      "Workflow automation, permissions, and data integration built in",
      "Reusable UI kits and backend templates via Boilerworks",
      "SSO, RBAC, audit logs, and everything your biz teams need",
      "Fast turnarounds, clean UX, and high adoption"
    ],
    "quote": "“Let your product team build the product. We’ll take care of the glue.”",
    "callUs": [
      "Internal tools are eating too much of your team’s time",
      "You’ve got dashboards and flows held together by Zapier and prayers",
      "You want scalable tooling that doesn’t require constant dev babysitting",
      "You need fast, well-architected systems to unblock your business teams"
    ],
    "contact": {
      "heading": "Contact us",
      "text": ""
    }
  },
  {
    "id": "too-many-tools-not-enough-flow",
    "group": "product",
    "name": "Tool Sprawl",
    "tag": "Disconnected SaaS and broken workflows",
    "title": "Your SaaS stack is a mess. Your team is drowning. Nothing talks to anything.",
    "intro": [
      "Overlapping apps. Duplicate data. Three dashboards for the same metric.",
      "Modern teams often adopt tools faster than they integrate them — and the result is chaos.",
      "You’re not inefficient because you lack software. You’re inefficient because the software doesn’t play well together.",
      "CONFLICT helps you unify your systems, streamline your stack, and automate the busywork.",
      "Less context-switching. More shipping."
    ],
    "symptoms": [
      "Tool overload: too many apps doing similar things",
      "No clear source of truth for data or reporting",
      "Manual processes between tools or departments",
      "Team burnout from context-switching and unnecessary complexity"
    ],
    "help": [
      "Integration of SaaS tools, internal platforms, and APIs",
      "Workflow automation that eliminates manual busywork",
      "Dashboards and glue code to unify reporting and operations",
      "Architecture strategy to reduce redundancy and increase clarity"
    ],
    "quote": "“More tools don’t make you faster. Better systems do.”",
    "callUs": [
      "Your team spends more time wrangling tools than building product",
      "You’re onboarding new hires and can’t explain which system does what",
      "You’ve hit a limit on what off-the-shelf automation can solve",
      "You’re paying for five tools — and using one"
    ],
    "contact": {
      "heading": "Ready to make your tools work for you?",
      "text": ""
    }
  },
  {
    "id": "compliance-pain",
    "group": "product",
    "name": "Compliance Pain",
    "tag": "PCI, SOC2, HIPAA headaches slowing your roadmap",
    "title": "Security and compliance shouldn’t stall your roadmap.",
    "intro": [
      "From PCI and SOC 2 to HIPAA, GDPR, and beyond — modern software teams are under pressure to meet regulatory standards without grinding velocity to a halt. The problem? Most compliance efforts are reactive, manual, and duct-taped after the fact. At CONFLICT, we bake compliance into the build. From infrastructure to code to process — we help you move fast and stay audit-ready."
    ],
    "symptoms": [
      "You’ve got an audit looming and no plan to pass",
      "Engineers are reinventing compliance controls every sprint",
      "Security reviews block every release",
      "Customers are asking hard questions you don’t know how to answer"
    ],
    "help": [
      "Compliance-aware infrastructure: PCI, SOX, HIPAA, GDPR from day one",
      "Security controls and role-based access wired into your stack",
      "Logging, monitoring, and alerting for traceability and response",
      "Documentation, automation, and audit trails without the handholding",
      "Support for SOC 2, ISO 27001, HIPAA, and other frameworks"
    ],
    "quote": "“We turn compliance from a blocker into a feature — and make security part of the system, not a post-it on the monitor.”",
    "callUs": [
      "You’re selling to enterprise and compliance is a deal-breaker",
      "You’ve outgrown your duct-taped approach to security and controls",
      "Your team doesn’t have a dedicated InfoSec lead — but needs one yesterday",
      "You’re staring down an audit and need fast, real help"
    ],
    "contact": {
      "heading": "Let’s harden your stack",
      "text": "We help teams level up their compliance posture without slowing down. Let’s harden your systems — and your reputation."
    }
  },
  {
    "id": "data-silos-integration-headaches",
    "group": "data",
    "name": "Data Silos",
    "tag": "No source of truth, endless duct tape",
    "title": "Your systems don’t talk. Your teams can’t align. Your insights are MIA.",
    "intro": [
      "You’ve got data — but it’s locked away in dozens of tools, dashboards, and one-off workflows.",
      "Customer info lives in the CRM. Orders in your ERP. Analytics in a spreadsheet someone updates manually.",
      "And trying to connect it all feels like solving a puzzle with missing pieces.",
      "At CONFLICT, we help teams integrate their systems, unify their data, and automate the workflows in between — so insights flow freely and your team finally moves as one."
    ],
    "symptoms": [
      "Disconnected apps and platforms (CRM, ERP, analytics, support, etc.)",
      "Manual processes, spreadsheet exports, and duplicated data entry",
      "Inconsistent reporting, mismatched metrics, and no single source of truth",
      "Decision paralysis from stale or incomplete insights",
      "Poor integration hygiene — or no integrations at all"
    ],
    "help": [
      "Seamless API integrations across internal tools and SaaS platforms",
      "Event-based systems that sync data in real-time (not nightly batch jobs)",
      "Custom middleware and glue code for data normalization and flow",
      "Unified dashboards, analytics, and internal tooling",
      "System architecture and schema audits to prep for automation",
      "Workflow automation: triggers, alerts, escalations, and actions"
    ],
    "quote": "“Your team should be acting on data — not wrangling it.”",
    "callUs": [
      "You’re running your company from spreadsheets",
      "Teams are making decisions from different dashboards",
      "Nobody trusts the reporting — and they’re right not to",
      "You’ve bought every tool under the sun, and none of them connect"
    ],
    "contact": {
      "heading": "Contact us",
      "text": ""
    }
  },
  {
    "id": "ai-overwhelm",
    "group": "data",
    "name": "AI Overwhelm",
    "tag": "Too much hype, not enough traction",
    "title": "You’ve got LLM FOMO. No roadmap. No results.",
    "intro": [
      "Everyone’s talking about AI — and your leadership team wants answers. But your experiments haven’t moved past the playground. Internal pilots have stalled. And no one agrees on what “AI in production” should actually mean.",
      "At CONFLICT, we cut through the hype. We help teams make smart, strategic decisions about when (and how) to deploy AI — without wasting cycles or budget. From LLM integrations to custom models, we build real applications with real ROI."
    ],
    "symptoms": [
      "Internal teams experimenting with GPT, but nothing has shipped",
      "No clear use case, business value, or technical roadmap",
      "Fear of compliance or data exposure",
      "Uncertainty around tools, vendors, and long-term ownership",
      "Past attempts failed to move the needle (or ever leave the sandbox)"
    ],
    "help": [
      "AI roadmap design: identifying valuable use cases worth investing in",
      "Technical feasibility assessments and system architecture",
      "Custom LLM applications: chat, generation, summarization, retrieval",
      "Retrieval-augmented generation (RAG), LangChain, and agent systems",
      "Fine-tuned models, prompt engineering, and fallback logic",
      "Secure, scalable AI infrastructure built for production environments",
      "CalliopeAI: our internal AI workbench to accelerate prototyping and deployment"
    ],
    "quote": "“No more labs. No more fluff. Just real AI, in production, driving results.”",
    "callUs": [
      "Your AI pilot never made it out of the pitch deck",
      "You’re afraid of wasting time and compute on a dead-end project",
      "The board wants “AI strategy,” and you need answers that work",
      "You know AI is coming — but don’t want to build the wrong thing"
    ],
    "contact": {
      "heading": "From hype to horsepower",
      "text": "We’ve helped companies stabilize systems, unlock stalled projects, and ship what others said was impossible. Let’s talk about your hardest problem and how we’ll help you solve it."
    }
  },
  {
    "id": "tried-ai-got-burned",
    "group": "data",
    "name": "AI Hypeburn",
    "tag": "Internal pilots that never landed",
    "title": "Pilot projects with no ROI? Time to recalibrate.",
    "intro": [
      "You took the AI plunge. Maybe a hackathon, a few OpenAI calls, a vendor who promised magic.",
      "But after the buzz faded, you were left with prototype fatigue, sunk costs, and little to show.",
      "At CONFLICT, we don’t chase AI hype — we engineer AI outcomes. If your last “pilot” fizzled, let’s build something real."
    ],
    "symptoms": [
      "Burned budget on a proof-of-concept that didn’t make it to prod",
      "Internal fatigue from “AI everything” initiatives",
      "Vendor lock-in with no way to scale or pivot",
      "Exec pressure to show results, but no clear roadmap"
    ],
    "help": [
      "Audit what you tried — and what’s salvageable",
      "Design real-world AI use cases grounded in business value",
      "Build scalable systems, not science projects",
      "Enable your internal team via infrastructure, workflows, and tools"
    ],
    "quote": "“No more labs. No more vapor. Just shipped AI that works.”",
    "callUs": [
      "Your AI experiment stalled, fizzled, or flopped",
      "You’ve got pressure to show traction, not just slides",
      "You need real engineers — not another AI vendor with a deck",
      "You’re ready to rebuild the right way"
    ],
    "contact": {
      "heading": "Tried AI. Got nothing. Let’s change that.",
      "text": ""
    }
  },
  {
    "id": "big-bets-no-owners",
    "group": "data",
    "name": "Big Bets",
    "tag": "“Impossible” builds, no owners",
    "title": "The “impossible” project no one wants to touch — until now.",
    "intro": [
      "There’s a major initiative on the table. A bold idea. A moonshot. But inside your org, it’s radioactive. No clear owner. No real plan. Engineering is tapped. Leadership is impatient. And you’re stuck trying to figure out if this thing is even doable. This is exactly where CONFLICT shines. We specialize in skunkworks initiatives, complex builds, and urgent “figure it out” missions. If the stakes are high and the path is murky, we’ll bring clarity — and get it shipped."
    ],
    "symptoms": [
      "Executive pressure to launch something “visionary” — with no blueprint",
      "Internal teams lack capacity, appetite, or the skills to deliver",
      "Everyone agrees it’s important… but no one wants to own it",
      "Timeline is aggressive, expectations are vague, and risk is high",
      "The project is too strategic to fail — but it’s already behind"
    ],
    "help": [
      "Rapid project assessment and scoping: feasibility, cost, timeline",
      "System design, architecture, and technical R&D",
      "Full-cycle execution: design, build, test, and deploy",
      "Embedded teams or SWAT-style delivery squads",
      "C-level communication and roadmap translation",
      "Skunkworks-as-a-service: custom tools, AI prototypes, API platforms, and more"
    ],
    "quote": "“If it’s never been done — or hasn’t been done right — we’re the team to call.”",
    "callUs": [
      "You’ve got a big bet on the roadmap and no one to run it",
      "Internal teams keep punting, and stakeholders are losing patience",
      "You need outside perspective, speed, and technical excellence",
      "You want to move fast without breaking trust (or budgets)"
    ],
    "contact": {
      "heading": "Big bet? Big results.",
      "text": "No owners? No roadmap? No problem. We specialize in mission-critical, high-ambiguity builds."
    }
  },
  {
    "id": "you-got-a-wild-idea-you-need-a-team-that-gets-it",
    "group": "data",
    "name": "Skunkworks Needed",
    "tag": "High-stakes innovation on a deadline",
    "title": "No roadmap, no owner, no time to waste — we thrive on this stuff.",
    "intro": [
      "Some projects don’t fit inside Jira tickets.",
      "Maybe it’s a prototype that could change the business. Maybe it’s a risky idea no one internally has time (or appetite) to chase.",
      "You don’t need a vendor — you need a special forces unit.",
      "At CONFLICT, we do skunkworks right: nimble, senior-led, and designed to build the weird, wild, and high-stakes."
    ],
    "symptoms": [
      "There’s a high-visibility project with no clear owner",
      "Execs want a prototype — yesterday",
      "Your internal teams are at capacity (or too risk-averse)",
      "You’re not even sure if the thing is technically possible"
    ],
    "help": [
      "Validate feasibility fast — architecture, timeline, and tradeoffs",
      "Assemble a senior-only build team to execute with urgency",
      "Create prototypes, POCs, or MVPs that speak for themselves",
      "Build quietly, ship boldly, and navigate internal politics if needed",
      "Treat your weird idea like it’s the next unicorn (because maybe it is)"
    ],
    "quote": "“We’re the crew that gets the ‘how the hell do we build this?’ Slack ping.”",
    "callUs": [
      "You’ve got a time-sensitive idea no one’s owning",
      "You need to move in weeks, not quarters",
      "You want a team that thinks like a startup, not a consultancy",
      "You need discretion, speed, and proof — not just a PowerPoint"
    ],
    "contact": {
      "heading": "Let’s build the thing everyone else is scared to touch.",
      "text": "Let’s bring your wild idea to life. No fluff. Just focus, firepower, and functional code."
    }
  },
  {
    "id": "startup-whiplash",
    "group": "data",
    "name": "Startup Whiplash",
    "tag": "Pivot pain and growth-stage chaos",
    "title": "You moved fast. Now everything hurts.",
    "intro": [
      "Early success is exhilarating — but speed without structure can leave a trail of technical debt, brittle systems, and teams struggling to keep up. Whether you’re pivoting, scaling, or catching up to your own growth, we help startups recover from “too fast, too soon” — and build the foundation to keep moving forward."
    ],
    "symptoms": [
      "Outgrew your MVP stack — and it shows",
      "Hasty hires, messy codebases, unowned systems",
      "Tooling decisions made in a rush now blocking growth",
      "“We’ll fix it later” has turned into “What the hell is this?”"
    ],
    "help": [
      "Stabilize and re-architect brittle infra, apps, and data layers",
      "Audit your stack and prioritize what needs to evolve — and what can wait",
      "Introduce modern practices (DevOps, observability, testing)",
      "Act as a force-multiplier for your team during high-pressure phases"
    ],
    "quote": "“We don’t throw it all away. We make it work — then make it scale.”",
    "callUs": [
      "You scaled before you stabilized",
      "You pivoted, but your tech didn’t keep up",
      "You’ve outgrown the team (or tools) that got you here",
      "You need elite engineering without the bloat"
    ],
    "contact": {
      "heading": "Let’s turn your early success into long-term velocity.",
      "text": ""
    }
  }
];

// ===== Dane case studies (success-stories.html, case.html) =====
// Treść 1:1 z weareconflict.com/success-stories/* (ref/weareconflict). Nie dopisywać własnych tekstów.
export const CASES = [
  {
    "id": "das-meridian",
    "client": "DAS Technology",
    "title": "Meridian: An AI-Ready Customer Data Platform for Automotive Retail",
    "intro": "CONFLICT built Meridian with DAS Technology — a multi-tenant automotive customer data platform (CDP) that unifies customer, vehicle and dealership data into one explainable golden record. Delivered by an AI-native team, it gives dealers connected customer experiences and gives AI-powered automotive products a data foundation they can trust.",
    "hero": {
      "image": "materials/cases/das/app-global.jpg",
      "alt": "Meridian global view: customers, dealerships, event volume and match quality across the DAS network"
    },
    "facts": [
      [
        "Client",
        "DAS Technology",
        "building"
      ],
      [
        "Industry",
        "Automotive retail SaaS",
        "car"
      ],
      [
        "Engagement",
        "Forward-deployed team",
        "handshake"
      ],
      [
        "Delivery",
        "AI-native engineering",
        "spark"
      ],
      [
        "Platform",
        "Multi-tenant CDP",
        "layers"
      ],
      [
        "APIs",
        "REST · GraphQL · MCP",
        "code"
      ]
    ],
    "highlights": [
      {
        "value": "4",
        "icon": "clock",
        "label": "weeks from kickoff to an approved architecture and identity strategy"
      },
      {
        "value": "85",
        "icon": "plug",
        "label": "dealer data sources and APIs mapped into one integration catalog"
      },
      {
        "value": "100%",
        "icon": "check",
        "label": "match coverage across live customer records — 7,157 of 7,157"
      },
      {
        "value": "8,878",
        "icon": "target",
        "label": "automated data-quality checks keeping every record trustworthy"
      }
    ],
    "problems": {
      "heading": "The business problems we solved",
      "validated": [
        {
          "id": "01",
          "title": "Every vehicle, every message.",
          "rows": [
            [
              "Need",
              "A customer with two vehicles — one due for service, one ready for trade-in — should get both messages, not only the one tied to their last visit."
            ],
            [
              "What we built",
              "One customer record that holds every vehicle relationship, so a customer can belong to several segments at the same time."
            ],
            [
              "Result",
              "Records from every dealer source combine automatically into one live customer profile, and every lifecycle message reaches the right customer."
            ]
          ]
        },
        {
          "id": "02",
          "title": "One owner per vehicle.",
          "rows": [
            [
              "Need",
              "Stop the same vehicle from being recorded as owned by several customers."
            ],
            [
              "What we built",
              "Ownership derived from dealer sales and lead data, ranked by how trustworthy each source is, with a full history of every value and a review queue for conflicts."
            ],
            [
              "Result",
              "Every ownership decision is traceable and can be safely recalculated at any time — re-derive, don’t inherit."
            ]
          ]
        }
      ],
      "candidatesHeading": "What the same foundation delivers",
      "candidates": [
        [
          "",
          "One customer journey across every DAS product.",
          "route"
        ],
        [
          "",
          "New products, like the Vehicle Smart Score app, launched without custom integrations.",
          "plug"
        ],
        [
          "",
          "Customer segments teams control, with governed, versioned definitions.",
          "sliders"
        ],
        [
          "",
          "Data that can always be fixed: every record can be replayed and recalculated.",
          "replay"
        ],
        [
          "",
          "Clear answers to “why is this customer here?” and “why didn’t this match?”",
          "search"
        ]
      ]
    },
    "parent": {
      "href": "showcase.html",
      "label": "Showcase"
    },
    "visuals": {
      "heading": "Inside the Meridian product experience",
      "intro": "Identity review and the unified customer profile, in motion.",
      "items": [
        {
          "src": "das.html?embed=1",
          "title": "Unified customer profile",
          "caption": "From duplicate records to one golden record.",
          "live": true
        }
      ]
    },
    "sections": [
      {
        "heading": "The challenge: fragmented data, disconnected experiences",
        "image": "materials/cases/das/app-merge.jpg",
        "imageAlt": "Meridian merge review: possible duplicate customer records ranked by confidence score",
        "text": [
          "DAS Technology provides automotive SaaS for lead management, reputation and digital advertising. Its customer and vehicle data lived across CRMs, dealer management systems (DMS), advertising platforms, OEM feeds and internal products. Without a shared customer profile, every application had to integrate the data and solve identity again.",
          "That fragmentation became a product problem. A driver with one vehicle due for service and another approaching a trade-in window could be pushed into only one communication stream. Vehicle ownership could conflict across source records, making downstream experiences hard to trust.",
          "Behind the scenes, a legacy SSIS data pipeline rebuilt tables from scratch every night, lost data whenever a job crashed and needed three to four engineers just to keep it running. We didn’t patch it — we replaced it with a modern, event-driven data platform."
        ]
      },
      {
        "heading": "Discovery in four weeks: a clear plan before the first line of code",
        "text": [
          "We started with a focused discovery. In under four weeks, CONFLICT mapped DAS’s real customer and vehicle data, defined what one unified dealer-customer record should look like, and turned it into a build plan that DAS leadership approved.",
          "We made the architecture visible from day one: a comprehensive library of software architecture diagrams took everyone — executives and engineers alike — from the big picture down to every component, data flow and security boundary.",
          "The scoping document doubled as the product spec, so nothing had to be rediscovered later — and the same ramped-up team moved straight into the build."
        ],
        "items": [
          "A full library of architecture diagrams — from system context and layered architecture to component maps, data intake, identity resolution, the golden record data model, security and privacy, and target-state data flows",
          "A rewritten Meridian architecture plan and an executive summary for leadership",
          "An identity resolution strategy: what simple rules decide, and where machine learning helps",
          "A privacy-by-design framework for customer data",
          "A complete delivery plan"
        ]
      },
      {
        "heading": "The solution: one trusted automotive customer record",
        "image": "materials/cases/das/app-dealers.jpg",
        "imageAlt": "Meridian dealerships view: tenants, consumers, vehicles, data completeness and match rate",
        "text": [
          "Meridian is a customer data platform for automotive retail: it ingests source data once, resolves people and vehicle relationships into a governed golden record, and makes that record available to every product through REST and GraphQL APIs.",
          "Batch and real-time ingestion, identity resolution, human-led data curation, tenant-aware storage, dealer reporting and operator tools all live in one platform. Product teams build on a shared data layer instead of recreating source integrations for every new experience."
        ]
      },
      {
        "heading": "Identity resolution you can explain",
        "image": "materials/cases/das/app-profile.jpg",
        "imageAlt": "Meridian customer profile: golden record with a confidence score on every field and every vehicle",
        "text": [
          "We started from the business impact of unreliable identity: overlapping customer journeys, ambiguous vehicle ownership and records that couldn’t be traced back to evidence. Working side by side with DAS, we shaped the data foundation around the workflows that depend on it.",
          "Matching uses email, phone, VIN and dealer customer ID. Ownership comes from primary records such as dealer transactions and leads, and every value keeps track of its source and how much that source can be trusted.",
          "When evidence conflicts, Meridian sends the case to human review. Merges and unmerges keep a full audit trail, so operators can always see — and correct — why a decision was made."
        ],
        "items": [
          "A clear source-trust order: the dealer management system (DMS) first, then CRM, then email and SMS, then third-party data — with the newest value winning within each tier",
          "Household and family detection: people who share an address and at least one more signal are grouped into one household, kept separate from individual identity",
          "Data time travel: see exactly what any customer record looked like at any point in the past — nothing is ever overwritten"
        ]
      },
      {
        "heading": "AI-ready by design: grounded in trustworthy data",
        "image": "materials/cases/das/app-events.jpg",
        "imageAlt": "Meridian event schemas: versioned event contracts for every dealership data source",
        "text": [
          "AI-powered products are only as dependable as the data behind them. Meridian gives intelligent automotive experiences a consistent, explainable context for every customer, vehicle and dealership relationship.",
          "Rule-based matching, clear evidence, data lineage and human review where records conflict create a trusted foundation for applying AI responsibly — without hiding how important identity decisions are made."
        ],
        "items": [
          "Customer state re-derived from primary records instead of inheriting legacy conclusions",
          "Field-level data lineage, validity over time and review history for every operator",
          "Privacy, consent and tenant boundaries treated as product requirements across the data lifecycle"
        ]
      },
      {
        "heading": "From signal to action: automated, consent-checked dealer messaging",
        "text": [
          "Meridian turns customer and vehicle data into timely, relevant messages. When a signal appears — an upcoming oil change, an expiring warranty or a mileage milestone — the platform updates the customer’s segments, starts an automated workflow and sends the right message through the dealer’s channel.",
          "Consent and opt-outs are checked at the moment of sending, every step is logged, and a message is never sent twice. Messaging providers such as Twilio, SendGrid and Mailchimp plug in through one provider-neutral connector."
        ],
        "items": [
          "Service reminders when an oil change is due",
          "Warranty-expiration and trade-in opportunities",
          "Mileage-milestone offers",
          "Consent and suppression checked before every send"
        ]
      },
      {
        "heading": "AI-native delivery: how AI helped us build faster",
        "text": [
          "Meridian was built by an AI-native team. AI coding agents such as Claude Code took on the repeatable, configuration-heavy work — onboarding new data sources, rebuilding legacy data jobs as modern pipelines, writing migrations, tests and documentation — while our engineers focused on architecture and the hard identity decisions.",
          "Speed never came at the cost of control. Every AI-assisted change went through the same human code review as any other work, and every repository followed one shared rulebook, so every agent — Claude, Calliope or others — worked to the same standards."
        ],
        "items": [
          "One rulebook for every AI agent, in every repository",
          "Human review and accountability for every change",
          "A self-describing data model that AI agents understand without tribal knowledge",
          "A searchable project brain: agents answer questions from tickets, decisions and code history",
          "AI-assisted review that catches bugs before they reach dealers",
          "An AI chat agent over the project knowledge base, live for DAS from the second week of discovery",
          "New DAS engineers onboarded by pointing Claude Code at the project repository"
        ]
      },
      {
        "heading": "Two apps, one platform: built for dealers, DAS operators and product teams",
        "image": "materials/cases/das/app-reports.jpg",
        "imageAlt": "Meridian report center: dealer-scoped reports on sales, service, leads and campaigns",
        "text": [
          "Meridian powers two applications on one platform. In the dealer app, each dealership sees only its own customers, households, vehicles, events and reports. In the DAS app, operators compare the whole dealer network side by side through an audited global view. Product teams use the same customer records through APIs.",
          "Row-level security isolates each dealer’s data while giving DAS an authorized global view. Consent is its own data category and is checked before any customer is contacted."
        ]
      },
      {
        "heading": "Secure, privacy-first customer data by design",
        "text": [
          "Customer data is only valuable if dealers can trust how it is handled. Meridian builds privacy and security into the platform itself, not on top of it — and every feature was verified end to end, including proof that access is denied wherever it should be."
        ],
        "items": [
          "Dealer data isolation: every dealership’s data is separated at the database level, and cross-dealer requests return nothing",
          "Consent first: global and dealer-specific opt-outs are enforced before any customer is contacted",
          "Configurable data retention instead of hard-coded rules",
          "Right to be forgotten: personal data lives in an isolated vault, so erasure is clean and complete",
          "Audited support access: every time support views a dealer account, it is visible and logged"
        ]
      },
      {
        "heading": "AI features on a trusted data foundation",
        "text": [
          "Because matching and record history are explainable, AI can be added safely on top. AI agents connect to Meridian’s reporting through a secure MCP endpoint, and the platform brings machine learning and natural language to everyday dealership work."
        ],
        "items": [
          "Machine-learning match suggestions for the hardest identity cases",
          "Customer segments built by simply describing them in plain language",
          "Questions about segments answered in natural language",
          "Predictive scoring and agentic apps for dealerships"
        ],
        "image": "materials/cases/das/app-agent.jpg",
        "imageAlt": "DAS AI Agent: a dealership assistant that answers questions about customers, campaigns and call lists"
      },
      {
        "heading": "The outcome: one foundation for every automotive product",
        "text": [
          "Meridian delivers a shared customer record, source ingestion, identity resolution, operator curation, tenant isolation and APIs for every downstream automotive product — replacing bespoke integrations with one consistent, explainable data layer.",
          "Dealers get connected customer experiences, DAS operators get data they can trust and fix, and new products such as Vehicle Smart Score launch on a foundation that is already AI-ready.",
          "The platform was built cloud-portable from day one, so it can run on AWS or Azure without a rebuild — no vendor lock-in."
        ]
      }
    ],
    "results": {
      "heading": "Product outcome",
      "cta": "Project outcome",
      "intro": "One multi-tenant automotive CDP that connects customer and vehicle data, makes every identity decision explainable and powers dealer, operator and AI experiences from a single source of truth.",
      "stats": []
    },
    "quote": "Re-derive, don’t inherit.",
    "quoteAuthor": "Alex English, SVP Product, DAS Technology",
    "contact": {
      "heading": "Building an AI-enabled product on complex data?",
      "text": "We partner with product and engineering teams to make difficult data foundations usable, explainable and ready for what comes next."
    },
    "faq": [
      [
        "What is Meridian?",
        "Meridian is a multi-tenant customer data platform (CDP) for automotive retail, built by CONFLICT for DAS Technology. It unifies customer, vehicle and dealership data from CRMs, dealer management systems (DMS), ad channels and OEM feeds into one explainable golden record per customer."
      ],
      [
        "How did CONFLICT use AI to build Meridian?",
        "CONFLICT works as an AI-native engineering team. AI coding agents such as Claude Code handled repeatable work — data-source onboarding, data pipelines, migrations, tests and documentation — while engineers owned the architecture and reviewed every change."
      ],
      [
        "What is identity resolution in automotive retail?",
        "Identity resolution decides which records belong to the same customer and vehicle. Meridian matches on email, phone, VIN and dealer customer ID, keeps the evidence behind every decision and sends conflicts to human review."
      ],
      [
        "How long did discovery take?",
        "Under four weeks. Discovery ran from 27 May to 23 June 2026 and ended with an approved architecture, identity resolution strategy and delivery plan."
      ],
      [
        "Does Meridian use AI and machine learning?",
        "Yes. AI agents connect to Meridian’s reporting through an MCP endpoint, machine learning suggests matches for hard identity cases, and teams can build and explore customer segments in natural language — all on top of explainable, rule-based matching."
      ],
      [
        "How does Meridian decide which customer data is correct?",
        "Every value is ranked by how trustworthy its source is: the dealer management system (DMS) first, then CRM, then email and SMS, then third-party data. Within the same level the newest value wins, and the full history of every value is kept, so any decision can be explained and recalculated."
      ],
      [
        "How does Meridian keep each dealer’s data separate?",
        "Every dealership’s data is isolated at the database level with row-level security. A dealer user can only see their own customers, vehicles and reports, and any request for another dealer’s data is denied without returning anything."
      ],
      [
        "Can Meridian send customer messages automatically?",
        "Yes. Signals such as an upcoming oil change, an expiring warranty or a mileage milestone trigger automated workflows. Consent is checked at send time, and messages go out through providers such as Twilio, SendGrid or Mailchimp."
      ],
      [
        "Is Meridian locked to one cloud provider?",
        "No. Meridian was built to be cloud-portable and can run on AWS or Azure without a rebuild."
      ],
      [
        "What architecture documentation did CONFLICT deliver?",
        "A comprehensive library of software architecture diagrams — covering system context, layered architecture, component maps, data intake, identity resolution, the golden record data model, security and privacy, and target-state data flows — plus a revised architecture plan, scoping document and privacy-by-design framework."
      ]
    ],
    "links": [
      ["Calliope", "https://calliope.ai/"]
    ],
    "metaDescription": "How CONFLICT built Meridian, an AI-ready automotive customer data platform (CDP) for DAS Technology: identity resolution, golden records and automated dealer messaging.",
    "keywords": [
      "automotive customer data platform",
      "automotive CDP",
      "dealership data platform",
      "identity resolution",
      "golden record",
      "customer 360",
      "AI-native software development",
      "Claude Code",
      "dealer marketing automation",
      "privacy by design",
      "multi-tenant SaaS",
      "software architecture diagrams",
      "C4 model"
    ]
  },
  {
    "id": "ezacto",
    "client": "eZacto",
    "title": "eZacto: An Open-Source Harvest Alternative for Time Tracking and Invoicing",
    "intro": "When our time-tracking bill jumped 16.5× overnight, CONFLICT built its own. eZacto is an open-source time tracking, project management and invoicing platform for freelancers and teams — free to self-host or hosted for a simple per-person price, and shipped in weeks by an AI-native team.",
    "metaDescription": "How CONFLICT built eZacto, an open-source Harvest alternative for time tracking, projects and invoicing — 48 releases in six weeks with AI-native engineering.",
    "keywords": [
      "Harvest alternative",
      "open-source time tracking",
      "time tracking software",
      "invoicing software",
      "self-hosted time tracker",
      "timesheet app",
      "time tracking for agencies",
      "AI-native software development",
      "Cloudflare Workers",
      "AGPL"
    ],
    "links": [
      [
        "Calliope AI",
        "https://calliope.ai/"
      ],
      [
        "Boilerworks",
        "https://boilerworks.ai/"
      ],
      [
        "github.com/ConflictHQ/ezacto-oss",
        "https://github.com/ConflictHQ/ezacto-oss"
      ],
      [
        "ezacto.com",
        "https://ezacto.com/"
      ]
    ],
    "hero": {
      "image": "materials/cases/ezacto/app-timesheet.jpg",
      "alt": "eZacto timesheet: a running timer and the week’s billable time entries by client and project"
    },
    "facts": [
      [
        "Product",
        "eZacto by CONFLICT",
        "building"
      ],
      [
        "Category",
        "Time tracking & invoicing",
        "clock"
      ],
      [
        "Licence",
        "Open source · AGPL v3",
        "code"
      ],
      [
        "Delivery",
        "AI-native engineering",
        "spark"
      ],
      [
        "Platforms",
        "Web · iOS · Android · Chrome",
        "layers"
      ],
      [
        "Hosting",
        "Cloudflare Workers · container",
        "plug"
      ]
    ],
    "highlights": [
      {
        "value": "16.5×",
        "icon": "target",
        "label": "the price increase that started it — from $130 to $2,145 a month for 14 people"
      },
      {
        "value": "48",
        "icon": "replay",
        "label": "releases shipped in the first six weeks"
      },
      {
        "value": "6",
        "icon": "layers",
        "label": "ways to use it: web, iOS, Android, Chrome, CLI and API"
      },
      {
        "value": "€0",
        "icon": "check",
        "label": "to self-host, forever — or €10 per person, hosted"
      }
    ],
    "parent": {
      "href": "showcase.html",
      "label": "Showcase"
    },
    "sections": [
      {
        "heading": "The challenge: a 1,550% price increase, overnight",
        "image": "materials/cases/ezacto/app-expenses.jpg",
        "imageAlt": "eZacto expenses: billable and reimbursable costs by client and project, with approval status",
        "text": [
          "CONFLICT had used Harvest, a well-known time tracker, since 2012. On August 11 our bill was $130 for 14 people. The next day, an email told us the September renewal would be $2,145 a month. Same team, new plan packaging — 16.5 times the bill.",
          "The cheaper alternatives on offer were usage-based and still far above what we had been paying, priced partly on the value of the invoices we send. We don’t think a time tracker’s price should depend on how much your work is worth to your clients. So we built eZacto."
        ]
      },
      {
        "heading": "The solution: time tracking, projects and invoicing in one app",
        "text": [
          "eZacto covers the full path from tracked hour to paid invoice for freelancers, agencies and teams. It was built by a studio that runs its own business on it, so every feature is shaped by real client engagements — and every feature is included on every plan."
        ],
        "items": [
          "Time tracking, timesheets and approvals",
          "Projects, clients, invoicing, recurring invoices, estimates and retainers",
          "Profitability reporting and a detailed time report",
          "CSV, Excel and PDF exports",
          "Activity log and required notes",
          "Google, Apple and GitHub sign-in, plus full API access"
        ],
        "image": "materials/cases/ezacto/app-projects.jpg",
        "imageAlt": "eZacto projects: budgets, fixed-fee and time-and-materials projects per client"
      },
      {
        "heading": "Built in weeks with AI-native engineering",
        "image": "materials/cases/ezacto/app-approvals.jpg",
        "imageAlt": "eZacto timesheet approvals: weekly hours per teammate with pending and approved status",
        "text": [
          "eZacto was built AI-native from day one, with Calliope AI and Boilerworks — CONFLICT’s own platforms for AI-assisted development and production-ready app foundations. That let a small team ship a complete product, not a prototype.",
          "The result: 48 releases in the first six weeks across the web app, API, mobile apps, Chrome extension and CLI — reaching invoicing parity with Harvest along the way. We build eZacto for the engagements we actually run; when one doesn’t fit the software, that’s the next thing we fix."
        ],
        "items": [
          "Banded engagements: a flat-rate team for a period, end to end",
          "Harvest-style invoice sending with per-client To and Cc rules",
          "Audited admin corrections to teammates’ time"
        ]
      },
      {
        "heading": "Fair, simple pricing: count people, that’s it",
        "image": "materials/cases/ezacto/app-team.jpg",
        "imageAlt": "eZacto team view: hours, utilization, capacity and rates per person",
        "text": [
          "eZacto’s pricing is one you can work out in your head: self-host for free, or let us host it for a flat price per person. No feature tiers, no usage-based fees, and nothing tied to how much you invoice."
        ],
        "items": [
          "€0 to self-host, on your own infrastructure",
          "€10 per user a month hosted, or €9 billed yearly",
          "Approvals, profitability reporting and the activity log for everyone — features Harvest keeps for Enterprise"
        ]
      },
      {
        "heading": "Open source, self-hosted your way",
        "image": "materials/cases/ezacto/app-mobile.jpg",
        "imageAlt": "eZacto mobile apps for iOS and Android: one-tap timer, invoices and reports",
        "text": [
          "Good software should earn your business, not depend on how hard it is to leave. eZacto is open source under the GNU AGPL v3, with the source public at github.com/ConflictHQ/ezacto-oss.",
          "Run it on your own Cloudflare account with Cloudflare Workers, or in a single container. The iOS, Android and Chrome apps connect to whichever eZacto is yours with a token you issue and can revoke — so a self-hosted instance is a first-class citizen, not an afterthought."
        ]
      },
      {
        "heading": "Integrations that follow the money",
        "image": "materials/cases/ezacto/app-invoices.jpg",
        "imageAlt": "eZacto invoices: sent, overdue and paid invoices by client and project",
        "text": [
          "From the work you track to the money you collect, eZacto connects to the accounting and payment tools teams already use — and to the tools where the work happens."
        ],
        "items": [
          "QuickBooks Online: invoices and payments synced both ways",
          "Stripe payment links and BILL invoicing",
          "Wise contractor payouts",
          "Chrome extension for GitHub, Jira Cloud, Trello, Asana, ClickUp and Basecamp",
          "Harvest migration import, REST API with an OpenAPI contract, and the ez CLI"
        ]
      },
      {
        "heading": "A client portal with no passwords to hand out",
        "text": [
          "Clients sign in with their email address and a one-time link that expires in fifteen minutes — nothing to create, reset or administer. Once in, they see only their own projects: hours by project, work not yet invoiced, and a day-by-day log with the notes the team wrote.",
          "Amounts stay behind a toggle so clients can read hours without reading rates, and every page exports to CSV. The portal is open source too, built on eZacto’s read-only API."
        ],
        "image": "materials/cases/ezacto/app-clients.jpg",
        "imageAlt": "eZacto clients: currency, payment terms, total billed and outstanding per client"
      },
      {
        "heading": "The outcome: software you can own",
        "image": "materials/cases/ezacto/app-reports.jpg",
        "imageAlt": "eZacto reports: logged and billable time, team capacity and amounts per member",
        "text": [
          "eZacto is finished and free to run yourself today, with a hosted version in limited beta. Hosted, it costs less per person than Harvest Teams, Toggl Track Starter and Timely Starter — and includes approvals, profitability reporting and invoicing with no usage-based fees.",
          "CONFLICT runs its own business on it. It is also proof of how we build: an AI-native team turning a real business problem into a complete, open-source product in weeks. Try it at ezacto.com."
        ]
      }
    ],
    "results": {
      "heading": "Product outcome",
      "cta": "Project outcome",
      "intro": "A complete open-source time tracking and invoicing platform — web, mobile, Chrome, API and CLI — that replaced a 16.5× price increase with software CONFLICT owns.",
      "stats": []
    },
    "quote": "Good software should earn your business, not depend on how hard it is to leave.",
    "quoteAuthor": "The eZacto team, CONFLICT",
    "contact": {
      "heading": "Want software your business can own?",
      "text": "We build complete products fast with an AI-native team — from the first idea to web, mobile and API."
    },
    "faq": [
      [
        "What is eZacto?",
        "eZacto is open-source time tracking, project management and invoicing software for freelancers and teams, built by CONFLICT. You can self-host it for free or use the hosted version for a flat price per person."
      ],
      [
        "Is eZacto a Harvest alternative?",
        "Yes. CONFLICT built eZacto after its Harvest bill rose from $130 to $2,145 a month. It covers time tracking, timesheet approvals, projects, invoicing and profitability reporting, and includes a Harvest migration import."
      ],
      [
        "How much does eZacto cost?",
        "Self-hosting is free. Hosted eZacto is €10 per user a month, or €9 billed yearly, with every feature on every plan and no usage-based fees."
      ],
      [
        "Can I self-host eZacto?",
        "Yes. eZacto is open source under the GNU AGPL v3 and runs on Cloudflare Workers or in a single container. The iOS, Android and Chrome apps connect to your own instance."
      ],
      [
        "What does eZacto integrate with?",
        "QuickBooks Online, Stripe, BILL and Wise for accounting and payments; a Chrome extension for GitHub, Jira Cloud, Trello, Asana, ClickUp and Basecamp; plus a REST API and a command-line tool."
      ],
      [
        "How was eZacto built so fast?",
        "With AI-native engineering. CONFLICT built eZacto with Calliope AI and Boilerworks, shipping 48 releases in the first six weeks across web, API, mobile, Chrome and CLI."
      ]
    ]
  },
  {
    "id": "calliope-ai",
    "client": "Calliope AI",
    "family": "calliope",
    "parent": {
      "href": "showcase.html",
      "label": "Showcase"
    },
    "title": "Calliope AI: A Private, Bring-Your-Own-Key AI Workbench for Developers and Data Teams",
    "intro": "CONFLICT built Calliope AI, a private AI workbench that gives developers and data teams an AI IDE, AI notebooks, a natural-language SQL agent and a terminal coding agent — free to use, bring-your-own-key, and able to run on any model, including fully offline.",
    "metaDescription": "How CONFLICT built Calliope AI: a free, bring-your-own-key AI IDE, notebook lab, SQL agent and CLI coding agent that runs on any model, even offline.",
    "keywords": [
      "private AI IDE",
      "Cursor alternative",
      "GitHub Copilot alternative",
      "BYOK AI coding",
      "AI coding agent",
      "self-hosted AI",
      "local LLM",
      "Ollama",
      "AI notebooks",
      "Jupyter AI",
      "multi-agent code review",
      "MCP"
    ],
    "links": [
      [
        "Zentinelle",
        "case.html?id=zentinelle"
      ],
      [
        "Astrolift",
        "case.html?id=astrolift"
      ],
      [
        "eZacto",
        "case.html?id=ezacto"
      ],
      [
        "calliope.ai",
        "https://calliope.ai/"
      ]
    ],
    "hero": {
      "image": "materials/cases/calliope/ide-main.jpg",
      "alt": "Calliope AI IDE with the Calliope AI agent summarizing a repository next to the code editor"
    },
    "facts": [
      [
        "Product",
        "Calliope AI by CONFLICT",
        "building"
      ],
      [
        "Category",
        "AI IDE & data workbench",
        "code"
      ],
      [
        "Pricing",
        "Free · bring your own key",
        "check"
      ],
      [
        "Runs on",
        "Desktop · CLI · Browser",
        "plug"
      ],
      [
        "Delivery",
        "AI-native engineering",
        "spark"
      ]
    ],
    "highlights": [
      {
        "value": "5",
        "icon": "layers",
        "label": "AI apps in one workbench: IDE, Lab, Chat Studio, Loadr and the CLI agent"
      },
      {
        "value": "$0",
        "icon": "check",
        "label": "app cost — no account, no subscription, no markup on model usage"
      },
      {
        "value": "8+",
        "icon": "plug",
        "label": "AI providers, from OpenAI and Anthropic to local models with Ollama"
      },
      {
        "value": "3,500",
        "icon": "target",
        "label": "automated tests behind the CLI agent, with 93%+ line coverage"
      }
    ],
    "sections": [
      {
        "heading": "The challenge: AI tools that lock you in",
        "text": [
          "Most AI coding tools come with strings attached: a monthly seat price, a mandatory account, a single locked-in model provider and no way to work offline. For teams with sensitive code or data, sending everything through someone else’s cloud is often not an option at all.",
          "CONFLICT wanted the opposite for its own engineers and clients: private AI that runs on the models you choose — hosted or local — with no middleman between you and your provider."
        ]
      },
      {
        "heading": "An AI IDE with autonomous background agents",
        "image": "materials/cases/calliope/ide-agents.jpg",
        "imageAlt": "Calliope AI IDE autonomous code agents reviewing a codebase in the background",
        "text": [
          "The Calliope AI IDE is a full development environment built on VS Code, with AI built into every step. Autonomous agents work through tasks in the background while you keep coding, and you can steer them mid-run with notes and corrections."
        ],
        "items": [
          "Background agents that plan, execute and report progress",
          "One-Shot tasks: describe a feature and its completion criteria, and an agent builds it",
          "AI chat with full repository context",
          "Extension marketplace compatibility, integrated terminal and Git"
        ]
      },
      {
        "heading": "AI Councils: multi-agent code review",
        "image": "materials/cases/calliope/ide-councils.jpg",
        "imageAlt": "Calliope AI Councils: preset councils for technical review, architecture decisions and security",
        "text": [
          "Instead of one AI opinion, Calliope convenes a council. A Technical Review council brings together an architect, a security reviewer, a performance specialist and a quality lead to deliberate on the same change — or on a decision like microservices versus a monolith.",
          "Preset councils cover architecture decisions, product, infrastructure, data engineering, testing and more, and every council can be customized."
        ]
      },
      {
        "heading": "Calliope AI Lab: AI notebooks for data science",
        "image": "materials/cases/calliope/lab-main.jpg",
        "imageAlt": "Calliope AI Lab creating a data analysis notebook with sample visualizations",
        "text": [
          "Calliope AI Lab is a JupyterLab-based notebook environment with an AI copilot built in. Ask it to create a data-analysis notebook, explain code, build visualizations or set up an ML pipeline — with a local database included and no cloud lock-in."
        ]
      },
      {
        "heading": "The Calliope CLI: one terminal agent for any model",
        "text": [
          "The open-source Calliope CLI is a coding and general-purpose agent for the terminal. It discovers models live from any provider, treats self-hosted models as first-class and can run fully air-gapped.",
          "It is built like infrastructure: 23 focused commands, headless JSON mode for CI, and 3,500 tests with an enforced 90% coverage floor."
        ],
        "items": [
          "Sandboxed execution in macOS Seatbelt or Docker",
          "Git checkpoints with one-command restore, plus automatic context compaction",
          "Tamper-evident audit logs and hard budget caps on cost and time",
          "Planner, worker and verifier roles for supervised multi-step goals"
        ]
      },
      {
        "heading": "Talk to your data: Chat Studio and Loadr",
        "image": "materials/cases/calliope/lab-3d-visualization.jpg",
        "imageAlt": "Calliope AI Lab generating a 3D data visualization from a natural-language prompt",
        "text": [
          "Calliope Chat Studio is an AI SQL agent that answers questions about your databases in plain language. Calliope Loadr is an AI-powered data management studio with multi-database support. Together with the Lab, they put a data team’s daily work in one private environment."
        ]
      },
      {
        "heading": "Run it anywhere — even in the browser",
        "image": "materials/cases/calliope/ide-chat.jpg",
        "imageAlt": "Calliope AI IDE with the built-in AI agent chat panel",
        "text": [
          "Calliope runs as desktop apps, in the terminal, or streamed to any browser through ready-made Kasm Workspaces images for Intel/AMD and ARM, including Apple Silicon and AWS Graviton. A plugin marketplace adds agents, skills, hooks and MCP servers."
        ]
      },
      {
        "heading": "How it works: build, run, govern",
        "diagram": "calliope-loop",
        "text": [
          "Calliope AI is where the loop starts. What teams build in Calliope ships through Astrolift into their own cloud, and every agent — in the IDE, the CLI or in production — is governed by Zentinelle."
        ],
        "items": [
          "Build in Calliope AI: developers and AI agents write the app or agent in the Calliope IDE, Lab or CLI",
          "Ship with Astrolift: a git push with an astrolift.toml manifest — Astrolift builds, deploys and spins up a preview",
          "Run in your cloud: apps, agents and models run on Kubernetes in your own account, with managed databases and caches",
          "Govern with Zentinelle: every agent call to a model passes through policies, content scanning and the audit chain — and approvals and evidence flow back to the team"
        ]
      },
      {
        "heading": "The outcome: the AI workbench behind our own products",
        "text": [
          "Calliope AI is free, private and model-agnostic: teams pay their model provider directly, with zero markup. It is also how CONFLICT works — eZacto was built with Calliope AI.",
          "Calliope is the Build layer of a family of products: Astrolift runs what you build in your own cloud, and Zentinelle governs the AI agents that do the work."
        ]
      }
    ],
    "results": {
      "heading": "Product outcome",
      "cta": "Project outcome",
      "intro": "A free, bring-your-own-key AI workbench — IDE, Lab, Chat Studio, Loadr and CLI — that gives teams private AI on any model, with no lock-in.",
      "stats": []
    },
    "quote": "Build with AI, not against it.",
    "quoteAuthor": "Calliope AI",
    "contact": {
      "heading": "Want private AI for your team?",
      "text": "We build and roll out AI tooling that runs on your models, your infrastructure and your rules."
    },
    "faq": [
      [
        "What is Calliope AI?",
        "Calliope AI is a private AI workbench built by CONFLICT: an AI IDE, AI notebooks (Lab), an AI SQL agent (Chat Studio), a data management studio (Loadr) and an open-source CLI coding agent."
      ],
      [
        "Is Calliope AI free?",
        "Yes. The desktop apps are free, with no account or subscription. You bring your own API keys and pay your model provider directly, with no markup."
      ],
      [
        "Which AI models does Calliope AI support?",
        "OpenAI, Anthropic, Google, Mistral, Together AI, AI21, Cohere and local models through Ollama. The CLI also supports any OpenAI-compatible server and discovers models live."
      ],
      [
        "Can Calliope AI run offline?",
        "Yes. With local models through Ollama or a self-hosted OpenAI-compatible server, Calliope can run fully offline and air-gapped."
      ],
      [
        "Is Calliope AI an alternative to Cursor or GitHub Copilot?",
        "Yes. Unlike Cursor or Copilot, Calliope AI is free, needs no account, lets you choose any model provider, works offline with local models and runs autonomous background agents."
      ],
      [
        "What are AI Councils?",
        "AI Councils run several AI reviewers with different perspectives — such as architecture, security, performance and quality — on the same code or decision, so you get a multi-perspective review instead of a single opinion."
      ]
    ]
  },

  {
    "id": "zentinelle",
    "client": "Zentinelle",
    "family": "calliope",
    "title": "Zentinelle: Runtime Governance, Risk and Compliance for AI Agents",
    "intro": "AI agents now write code, call tools and touch real data. CONFLICT built Zentinelle to keep them in bounds: an open-source governance, risk and compliance (GRC) layer that sits between AI agents and model providers — enforcing policies, scanning content and recording every action, without changing agent code.",
    "metaDescription": "How CONFLICT built Zentinelle, open-source AI agent governance: policy enforcement, audit logs and SOC 2, GDPR and EU AI Act mapping for AI agents.",
    "keywords": [
      "AI agent governance",
      "AI governance platform",
      "AI compliance",
      "EU AI Act compliance",
      "LLM guardrails",
      "AI risk management",
      "AI audit log",
      "Claude Code governance",
      "SOC 2 for AI",
      "GRC"
    ],
    "links": [
      [
        "Calliope AI",
        "case.html?id=calliope-ai"
      ],
      [
        "Astrolift",
        "case.html?id=astrolift"
      ],
      [
        "eZacto",
        "case.html?id=ezacto"
      ],
      [
        "zentinelle.ai",
        "https://zentinelle.ai/"
      ]
    ],
    "hero": {
      "image": "materials/cases/zentinelle/dashboard.jpg",
      "alt": "Zentinelle dashboard: agents, policies, API calls, recent activity and agent health"
    },
    "facts": [
      [
        "Product",
        "Zentinelle by CONFLICT",
        "building"
      ],
      [
        "Category",
        "AI agent governance (GRC)",
        "check"
      ],
      [
        "Licence",
        "MIT · self-hosted",
        "code"
      ],
      [
        "Agents",
        "Claude Code · Codex · Gemini CLI",
        "spark"
      ],
      [
        "SDKs",
        "Python · TypeScript",
        "layers"
      ],
      [
        "Status",
        "v1.0, production ready",
        "flag"
      ]
    ],
    "highlights": [
      {
        "value": "24",
        "icon": "sliders",
        "label": "policy evaluators, from rate limits and tool permissions to PII detection"
      },
      {
        "value": "24+",
        "icon": "plug",
        "label": "LLM providers supported, hosted and local"
      },
      {
        "value": "5",
        "icon": "check",
        "label": "compliance frameworks mapped: SOC 2, GDPR, HIPAA, EU AI Act and NIST AI RMF"
      },
      {
        "value": "3",
        "icon": "layers",
        "label": "ways to integrate: agent hooks, a transparent proxy or a high-performance gateway"
      }
    ],
    "sections": [
      {
        "heading": "The challenge: AI agents without guardrails",
        "text": [
          "Coding agents and autonomous workflows can now read repositories, run commands and call external tools. Most organizations have no consistent way to decide what those agents may do, see what they actually did, or prove it to an auditor.",
          "Zentinelle closes that gap with runtime governance: policy, risk and evidence for every connected agent, in one self-hosted portal."
        ]
      },
      {
        "heading": "Policy at the integration point, invisible to your agents",
        "image": "materials/cases/zentinelle/agents.jpg",
        "imageAlt": "Zentinelle agents view: registered Claude Code, Codex and Gemini agents with health status",
        "text": [
          "Zentinelle evaluates requests and records activity at the point where agents talk to models and tools. Agent code does not change — you choose the integration that fits."
        ],
        "items": [
          "Hooks that intercept every tool call in Claude Code and Gemini CLI",
          "A transparent proxy with policy enforcement for any agent",
          "A high-performance Go gateway with credential injection for enterprise scale"
        ]
      },
      {
        "heading": "How it works: build, run, govern",
        "diagram": "calliope-loop",
        "text": [
          "Zentinelle closes the loop. Teams build with Calliope AI, Astrolift deploys apps and agents into their own cloud, and Zentinelle sits between every agent and its model — whether the agent runs in a developer’s IDE or in production."
        ],
        "items": [
          "Build in Calliope AI: developers and AI agents write the app or agent in the Calliope IDE, Lab or CLI",
          "Ship with Astrolift: a git push with an astrolift.toml manifest — Astrolift builds, deploys and spins up a preview",
          "Run in your cloud: apps, agents and models run on Kubernetes in your own account, with managed databases and caches",
          "Govern with Zentinelle: every agent call to a model passes through policies, content scanning and the audit chain — and approvals and evidence flow back to the team"
        ]
      },
      {
        "heading": "Governance: 24 policy evaluators",
        "image": "materials/cases/zentinelle/policies.jpg",
        "imageAlt": "Zentinelle policy coverage matrix across policy types and scopes",
        "text": [
          "Rate limits, cost controls, tool allowlists, model restrictions, network policies, PII detection and masking, output filtering and human-in-the-loop approvals — all enforced in real time."
        ],
        "items": [
          "Policy inheritance from organization to team, deployment, endpoint and user",
          "A policy simulator to dry-run rules against historical events before enforcing",
          "Version history with diffs, conflict analysis and one-click compliance packs"
        ]
      },
      {
        "heading": "AI risk management that teams actually use",
        "image": "materials/cases/zentinelle/risks.jpg",
        "imageAlt": "Zentinelle risk register with a 5×5 likelihood and impact matrix",
        "text": [
          "An FMEA-style risk register scores every AI risk by severity, likelihood and impact, with a visual 5×5 matrix, an organization-wide risk index and incident management with SLA tracking and root-cause timelines."
        ]
      },
      {
        "heading": "Compliance mapping: SOC 2, GDPR, HIPAA, EU AI Act and NIST AI RMF",
        "image": "materials/cases/zentinelle/compliance.jpg",
        "imageAlt": "Zentinelle compliance overview with framework coverage and observe and control capabilities",
        "text": [
          "Each framework’s controls are mapped to Zentinelle capabilities, with gap analysis, remediation guidance and exportable PDF, CSV and JSON reports. Legal holds freeze data retention for litigation or audit.",
          "The mappings organize evidence for review — they support an audit rather than replace one."
        ]
      },
      {
        "heading": "Observability and a tamper-evident audit trail",
        "image": "materials/cases/zentinelle/audit-logs.jpg",
        "imageAlt": "Zentinelle audit logs with chain verification and CSV and JSON export",
        "text": [
          "Every policy decision, tool call and model request flows into a real-time event stream and an audit log chain that can be cryptographically verified. Usage analytics track tokens, cost and latency by agent, model and provider, and statistical anomaly detection raises alerts."
        ]
      },
      {
        "heading": "An AI assistant for your governance data",
        "image": "materials/cases/zentinelle/ai-assistant.jpg",
        "imageAlt": "Zentinelle AI assistant answering a question about open risks",
        "text": [
          "A built-in assistant answers questions like “how many open risks do we have?” using 22 tools wired into real GRC data, with a confirmation step before anything changes. API keys are encrypted per tenant."
        ]
      },
      {
        "heading": "Developer-first SDKs and integrations",
        "text": [
          "Python and TypeScript SDKs register agents, evaluate policies before actions and report model usage in a few lines of code. Integrations cover Claude Code, OpenAI Codex, Gemini CLI, LangChain, CrewAI and the Vercel AI SDK — built with circuit breakers, retries, event buffering and fail-open mode for non-critical paths."
        ]
      },
      {
        "heading": "The outcome: governed AI, in your own environment",
        "text": [
          "Zentinelle v1.0 is MIT-licensed, self-hostable and production ready, with multi-cloud Terraform. It is the Govern layer of a family of products: Calliope AI builds with AI, Astrolift runs it in your own cloud, and Zentinelle keeps every agent in bounds."
        ]
      }
    ],
    "results": {
      "heading": "Product outcome",
      "cta": "Project outcome",
      "intro": "An open-source GRC platform for AI agents — policy enforcement, risk, compliance and tamper-evident audit — that works without changing agent code.",
      "stats": []
    },
    "quote": "Policy at the integration point. Invisible to your agents.",
    "quoteAuthor": "Zentinelle",
    "contact": {
      "heading": "Deploying AI agents at work?",
      "text": "We help teams put governance, observability and compliance around their AI agents from day one."
    },
    "faq": [
      [
        "What is Zentinelle?",
        "Zentinelle is an open-source governance, risk and compliance (GRC) platform for AI agents, built by CONFLICT. It enforces policies, scans content and logs agent activity between your agents and their model providers."
      ],
      [
        "Do I need to change my AI agents’ code to use Zentinelle?",
        "No. Zentinelle integrates through agent hooks, a transparent proxy or a gateway, so policies apply without modifying agent code. SDKs are available when you want deeper integration."
      ],
      [
        "Which AI agents does Zentinelle support?",
        "Claude Code, OpenAI Codex and Gemini CLI, plus custom agents and frameworks such as LangChain, CrewAI and the Vercel AI SDK, across 24+ LLM providers."
      ],
      [
        "Does Zentinelle help with EU AI Act compliance?",
        "Zentinelle maps its controls to SOC 2, GDPR, HIPAA, the EU AI Act and NIST AI RMF, with gap analysis and exportable reports. The mappings support an audit; they do not certify your organization."
      ],
      [
        "Can I self-host Zentinelle?",
        "Yes. Zentinelle is MIT-licensed and self-hostable, and runs with Docker Compose or multi-cloud Terraform."
      ]
    ]
  },

  {
    "id": "astrolift",
    "client": "Astrolift",
    "family": "calliope",
    "title": "Astrolift: An Open-Source Platform to Deploy Apps and AI Agents in Your Own Cloud",
    "intro": "CONFLICT built Astrolift, the run layer of the Calliope AI family: an open-source, multi-tenant platform that deploys applications, AI agents and agent workflows onto any Kubernetes cluster in your own cloud. Describe a workload once in astrolift.toml, then drive it from a dashboard, a CLI, a GraphQL API or MCP — with a preview environment for every pull request.",
    "metaDescription": "How CONFLICT built Astrolift: an open-source PaaS that deploys apps, AI agents and workflows to any Kubernetes cluster from one manifest, with PR previews.",
    "keywords": [
      "open-source PaaS",
      "internal developer platform",
      "platform engineering",
      "bring your own cloud",
      "deploy AI agents",
      "preview environments",
      "Kubernetes",
      "Temporal",
      "GitOps",
      "Heroku alternative",
      "AI agent orchestration",
      "agent workflows",
      "MCP server",
      "vLLM model hosting",
      "AWS Bedrock",
      "EKS GKE AKS",
      "zero-downtime deploys"
    ],
    "links": [
      [
        "Calliope AI",
        "case.html?id=calliope-ai"
      ],
      [
        "Zentinelle",
        "case.html?id=zentinelle"
      ],
      [
        "eZacto",
        "case.html?id=ezacto"
      ],
      [
        "astrolift.dev",
        "https://astrolift.dev/"
      ],
      [
        "astrolift.ai",
        "https://astrolift.ai/"
      ]
    ],
    "hero": {
      "image": "materials/cases/astrolift/manifest.jpg",
      "alt": "Astrolift astrolift.toml manifest: one file describing services, resources and per-PR previews"
    },
    "facts": [
      [
        "Product",
        "Astrolift by CONFLICT",
        "building"
      ],
      [
        "Category",
        "Platform engineering · PaaS",
        "layers"
      ],
      [
        "Licence",
        "MIT · self-hostable",
        "code"
      ],
      [
        "Runs on",
        "Any Kubernetes: EKS · GKE · AKS",
        "plug"
      ],
      [
        "Clients",
        "Dashboard · CLI · GraphQL · MCP",
        "spark"
      ],
      [
        "Stack",
        "Django · GraphQL · Temporal · Next.js",
        "cube"
      ]
    ],
    "highlights": [
      {
        "value": "1",
        "icon": "record",
        "label": "manifest per app — services, managed resources and previews in astrolift.toml"
      },
      {
        "value": "4",
        "icon": "spark",
        "label": "ways to drive it: web dashboard, astro CLI, GraphQL API and MCP for AI clients"
      },
      {
        "value": "Any",
        "icon": "layers",
        "label": "Kubernetes cluster — vanilla, EKS, GKE or AKS — with the same control plane"
      },
      {
        "value": "PR",
        "icon": "route",
        "label": "every pull request gets an isolated preview environment with its own URL"
      }
    ],
    "sections": [
      {
        "heading": "The challenge: every team rebuilds the same platform",
        "text": [
          "Shipping an app — or an AI agent — into your own cloud usually means hand-written infrastructure, one-off deploy scripts, secrets scattered across tools and no consistent way to preview a change. Every team rebuilds the same platform, slightly differently.",
          "Astrolift gives teams one repeatable workflow instead: declare the workload, deploy it into an account you control, and keep everything — data, compute and keys — on your side."
        ]
      },
      {
        "heading": "How it works: build, run, govern",
        "diagram": "calliope-loop",
        "text": [
          "Astrolift is the middle of a three-step loop. Teams build with Calliope AI, Astrolift runs what they build in their own cloud, and Zentinelle governs every AI agent that runs there — all on one private perimeter."
        ],
        "items": [
          "Build in Calliope AI: developers and AI agents write the app or agent in the Calliope IDE, Lab or CLI",
          "Ship with Astrolift: a git push with an astrolift.toml manifest — Astrolift builds, deploys and spins up a preview",
          "Run in your cloud: apps, agents and models run on Kubernetes in your own account, with managed databases and caches",
          "Govern with Zentinelle: every agent call to a model passes through policies, content scanning and the audit chain — and approvals and evidence flow back to the team"
        ]
      },
      {
        "heading": "One manifest, any cloud",
        "image": "materials/cases/astrolift/manifest.jpg",
        "imageAlt": "astrolift.toml manifest declaring an API service, Postgres, Redis and preview environments",
        "text": [
          "Teams onboard a Git repository and declare what the app needs in a single astrolift.toml file. Astrolift deploys it onto any Kubernetes cluster — vanilla, Amazon EKS, Google GKE or Azure AKS — with the same control plane.",
          "Declare a Postgres database, a Redis cache or an object store in the manifest and the platform provisions it. Deploys are zero-downtime by default: rolling updates, health checks and rollback to the previous deployment’s exact image."
        ],
        "items": [
          "Web apps, multi-service APIs and monorepos",
          "Serverless functions, scheduled jobs and one-off batch tasks",
          "Stateful services with persistent volumes",
          "AI agents and long-running agent workflows"
        ]
      },
      {
        "heading": "AI agents as first-class workloads",
        "text": [
          "In Astrolift, an AI agent is deployed like any other workload. An agent package bundles its brief, ordered skills, tools, runtime and policy into an immutable, content-hashed snapshot, registered straight from the same repositories as your apps.",
          "Agents are dispatched as bounded Kubernetes Jobs, observed live from logs to final state, and can report back through signed completion callbacks. Persistent agents run as warm pods a person can attach to."
        ],
        "items": [
          "Skills as versioned instructions, shared globally or kept per organization",
          "Tools as Python functions, HTTP endpoints or MCP servers",
          "Environment specs for images, runtimes, secrets and tool permissions",
          "A fleet view of every agent run across the organization"
        ]
      },
      {
        "heading": "Agent workflows with human approval built in",
        "text": [
          "Workflows chain agents into ordered stages, defined in a Workflow TOML file that lives next to the code. Bounded loops, finite retries and serial item processing keep runs predictable, and every run is recorded.",
          "Where a decision needs a person, the workflow waits: reviewed starts, approval gates and schedule consent put humans in the loop exactly where it matters."
        ]
      },
      {
        "heading": "An inbox where agents ask and people answer",
        "text": [
          "Agents can send an update, ask a question, request an approval or report a result. People read and reply in the Astrolift dashboard or the CLI with their own identity — choosing options, allowing or denying an approval, or answering in text. No one needs to expose an inbound endpoint on their machine."
        ]
      },
      {
        "heading": "Host and connect AI models in your own cloud",
        "text": [
          "Host a model from Hugging Face or local files once, in an organization-owned cluster deployment, then connect the app environments that need it. Existing AWS Bedrock models and inference profiles can be registered in the same model inventory — the model stays in AWS, governed by the same app policies."
        ]
      },
      {
        "heading": "Four ways in: dashboard, CLI, GraphQL and MCP",
        "image": "materials/cases/astrolift/components.jpg",
        "imageAlt": "Astrolift open-source components: control plane, operator UI, astro CLI and status page",
        "text": [
          "The web dashboard, the astro CLI, the GraphQL API and an MCP server all talk to the same control plane. The dashboard groups everything into Home, Agents, Apps, Secure and Admin, and the server decides which functions each account can see.",
          "Astrolift is built to be driven by AI too: its MCP server lets AI clients inspect and dispatch agents, start reviewed workflows and manage temporary apps, and the documentation is published as plain Markdown with an llms.txt index for agents."
        ]
      },
      {
        "heading": "Preview environments and temporary apps",
        "image": "materials/cases/astrolift/capabilities.jpg",
        "imageAlt": "Astrolift capabilities: declarative workloads, application services, preview environments and tenant boundaries",
        "text": [
          "Every pull request on a preview-enabled app gets an isolated environment with its own URL. Demos, review builds and generated apps can be created as temporary apps with an expiry — from 15 minutes up to 90 days by default — and Astrolift tears them down automatically when the timer runs out."
        ]
      },
      {
        "heading": "Multi-tenant and safe by default",
        "text": [
          "Organizations, teams, projects and fine-grained role-based access control are built in from day one. Hard-to-undo actions are gated on the server: deleting an app, decommissioning a cluster, deprovisioning a managed service, opening a console in a workload or revealing a secret all require confirmation and a fresh sign-in.",
          "Organizations can also require approval from other admins before a destructive delete runs, and every action lands in the audit log."
        ]
      },
      {
        "heading": "A control plane built for long-running work",
        "text": [
          "The control plane is built with Django and a Strawberry GraphQL API, with Temporal workers handling onboarding, deploys, rollbacks and GitOps reconciliation. The Next.js operator console renders against the same schema the CLI uses. The astro CLI is a single Go binary, installable through Homebrew, Scoop, a checksum-verified installer or a minimal distroless image."
        ]
      },
      {
        "heading": "Your cloud — and the full Build, Run, Govern loop",
        "text": [
          "Astrolift is MIT-licensed and self-hostable. It installs into your own cloud with Terraform and Helm, or through a guided AWS blueprint, and your workloads land in your account — not ours.",
          "Blueprints can also run the Calliope AI Workbench and Zentinelle on Astrolift’s own cluster and network: build with Calliope AI, run on Astrolift and govern every agent with Zentinelle, all on one private perimeter."
        ]
      }
    ],
    "results": {
      "heading": "Product outcome",
      "cta": "Project outcome",
      "intro": "An open-source, multi-tenant platform that deploys apps, AI agents and agent workflows onto any Kubernetes cluster in your own cloud — from one manifest, with four ways to drive it.",
      "stats": []
    },
    "quote": "Live in your account — nothing left ours.",
    "quoteAuthor": "Astrolift",
    "contact": {
      "heading": "Want a platform your developers love?",
      "text": "We design and build internal developer platforms that ship apps and AI agents into your own cloud."
    },
    "faq": [
      [
        "What is Astrolift?",
        "Astrolift is an open-source, multi-tenant Platform-as-a-Service built by CONFLICT. Teams onboard a Git repository, declare requirements in a single astrolift.toml manifest and deploy apps, AI agents and workflows onto any Kubernetes cluster."
      ],
      [
        "Is Astrolift a Heroku or PaaS alternative?",
        "Yes. Astrolift gives you a PaaS-style workflow — one manifest, managed databases and caches, zero-downtime deploys and preview environments for every pull request — while everything runs in a cloud account you own."
      ],
      [
        "Which Kubernetes clusters does Astrolift support?",
        "Vanilla Kubernetes, Amazon EKS, Google GKE and Azure AKS, all managed by the same control plane. A guided blueprint installs Astrolift into your own AWS account."
      ],
      [
        "Can Astrolift run AI agents and agent workflows?",
        "Yes. Agents are first-class workloads: packaged with their brief, skills, tools and policy, dispatched as bounded Kubernetes Jobs and chained into workflows with human approval gates and an inbox for questions."
      ],
      [
        "Does Astrolift have an MCP server?",
        "Yes. Astrolift exposes an authenticated MCP server so AI clients can inspect and dispatch agents, start reviewed workflows and manage temporary apps, alongside the dashboard, CLI and GraphQL API."
      ],
      [
        "Can Astrolift host my own AI models?",
        "Yes. You can host a model from Hugging Face or local files in an organization-owned cluster deployment, or register existing AWS Bedrock models, and connect them to the app environments that need them."
      ],
      [
        "Is Astrolift open source?",
        "Yes. The control plane, operator UI and astro CLI are open source under the MIT licence, published by Calliope AI on GitHub, with full documentation at astrolift.dev."
      ]
    ]
  },

  {
    "id": "ci-cd-rebuild",
    "client": "SteadyMD",
    "title": "CI/CD Rebuild: Hands-Off Delivery at Scale",
    "intro": "CONFLICT transformed SteadyMD’s brittle deployment workflows into a hands-off CI/CD pipeline that builds, tests, and ships code automatically—with near-zero errors. From chaos to confidence, we engineered a system that deploys everywhere, on demand, with human gates for control.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "As SteadyMD scaled, their delivery pipeline became a bottleneck. Manual steps, inconsistent test coverage, and configuration drift made every release risky. What should have been routine was stressful. Failures during deploys were too common, and developers were losing confidence. They needed automation—without losing control."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We engineered a fully hands-off CI/CD system that builds, tests, and deploys automatically across all environments. Using GitHub Actions and Terraform, we codified the pipeline from commit to cloud—layering in robust testing workflows, configuration-as-code, and human approval gates for final deploys. This wasn’t DevOps theater. It was real automation, tailored to SteadyMD’s product velocity and HIPAA-compliant needs."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "The transformation was significant:",
      "stats": [
        {
          "value": "0%",
          "label": "Deployment failure rate dropped to near 0%"
        },
        {
          "value": "+",
          "label": "Configuration changes are now fully versioned and validated"
        },
        {
          "value": "++",
          "label": "Engineers deploy confidently, knowing tests and gates catch issues early"
        },
        {
          "value": "+++",
          "label": "Human approval gates allow final oversight without slowing the process"
        }
      ]
    },
    "quote": "",
    "quoteAuthor": "",
    "contact": {
      "heading": "Want a demo or deeper dive?"
    }
  },
  {
    "id": "compliance-security",
    "client": "SteadyMD",
    "title": "SteadyMD — Compliance & Security",
    "intro": "SteadyMD turned to CONFLICT to meet HIPAA and SOC 2 demands without derailing velocity. We hardened their production cloud, implemented real DevSecOps, and embedded audit-ready security into every layer—engineering confidence, not just compliance.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "As a fast-scaling telehealth provider, SteadyMD had to meet rigorous regulatory requirements—HIPAA for patient data protection, and SOC 2 for trust and transparency. But their existing infrastructure wasn’t built for compliance at scale. Security controls were patchy, documentation was fragmented, and production risks loomed large. They didn’t need more red tape. They needed a partner who could embed compliance into the DNA of their systems—without slowing them down."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We approached compliance the same way we approach engineering: with precision, speed, and strategy. Using AWS-native tools, Terraform, and real DevSecOps principles, we fortified SteadyMD’s infrastructure—implementing strict IAM policies, encrypted networking layers, secure logging, and automated policy enforcement. Our approach wasn’t just technical; we helped map operational practices to audit frameworks, making sure their HIPAA and SOC 2 controls were both documented and provable. This wasn’t checkbox compliance. It was infrastructure built to defend itself."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "Compliance stopped being a blocker. It became a strength.",
      "stats": [
        {
          "value": "✓",
          "label": "Passed HIPAA audits and SOC 2 readiness assessments with confidence"
        },
        {
          "value": "✓",
          "label": "Hardened AWS environments with least-privilege access and encrypted infrastructure"
        },
        {
          "value": "✓",
          "label": "Shifted from ad-hoc security to automated, auditable policy enforcement"
        },
        {
          "value": "✓",
          "label": "Reduced time spent on compliance busywork by engineering it into the platform itself"
        },
        {
          "value": "✓",
          "label": "No slowdown in product velocity—just smarter, safer systems"
        }
      ]
    },
    "quote": "We didn’t want to choose between velocity and compliance—and with CONFLICT, we didn’t have to. They helped us architect systems that pass audits without sacrificing speed. Now our cloud is secure, our logs are tight, and we sleep better at night.",
    "quoteAuthor": "Patrick Evans, VPE, SteadyMD",
    "contact": {
      "heading": "Let’s engineer the future"
    }
  },
  {
    "id": "devcamps",
    "client": "SteadyMD",
    "title": "DevCamps: On-Demand Cloud Environments",
    "intro": "SteadyMD partnered with CONFLICT to tame chaotic dev workflows. Our DevCamp environments cut deployment lead time by 45%, doubled velocity, and slashed error rates by 80%. From friction came velocity—engineering confidence, built on precision.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "SteadyMD, a pioneer in white-labeled telehealth platforms, was scaling fast—but their development pipeline couldn’t keep up. Change errors were frequent. Deployments dragged. Engineers second-guessed every push. As the complexity of their platform grew, so did the drag from broken workflows. They needed a way to move fast without breaking everything."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We saw the friction—and used it as fuel. Rather than duct-taping brittle workflows, CONFLICT engineered DevCamps: fully provisioned, on-demand cloud environments that replicate production with surgical accuracy. Every code change spins up its own isolated stack, gets tested in context, and is validated before merging. Built using our proprietary Boilerworks stack and automation layer, DevCamps brought production-grade fidelity to every developer’s fingertips. Instead of guessing, SteadyMD’s engineers could now know their code would work—before it hit main."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "The impact wasn’t just technical—it was cultural",
      "stats": [
        {
          "value": "80%",
          "label": "Reduction in change-related errors"
        },
        {
          "value": "45%",
          "label": "Faster deployment lead time"
        },
        {
          "value": "2x",
          "label": "Increase in dev team velocity"
        },
        {
          "value": "++",
          "label": "A clear jump in confidence, clarity, and control"
        }
      ]
    },
    "quote": "CONFLICT didn’t just fix our workflows — they rebuilt the way we build. DevCamps gave us confidence, speed, and clarity. Every developer gets a full-stack environment that mirrors production—on-demand. The impact? Fewer errors, faster launches, and a team that’s finally out of the fog.",
    "quoteAuthor": "Patrick Evans, VPE, SteadyMD",
    "contact": {
      "heading": "Let’s engineer the future"
    }
  },
  {
    "id": "steadymd-custom-app-dev-embedded-team-support",
    "client": "SteadyMD",
    "title": "SteadyMD — Custom App Dev & Embedded Team Support",
    "intro": "SteadyMD trusted CONFLICT to build and maintain a custom non-core application—fully staffed, fully managed—for over a year. We embedded seamlessly, shipped consistently, and owned the stack until sunset. No hires, no drama, just clean delivery.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "Not every system is mission-critical—but it still needs to work. SteadyMD had a non-core internal app they needed to build, run, and maintain for about a year. It wasn’t worth a hiring cycle, and they didn’t want to burden their core product team with the extra load. What they needed was a drop-in team—senior engineers who could design, build, and operate the app with minimal oversight, and own it through to deprecation."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We deployed a small, senior CONFLICT unit to act as a self-sufficient pod—delivering backend APIs, frontend interfaces, and ongoing production support. No babysitting required. We handled the full lifecycle: planning, delivery, feature enhancements, incident response, and even retirement strategy. Over 14 months, we shipped consistently and adapted as the business needs evolved. Think of it as Skunkworks as a Service—a high-trust partnership where CONFLICT owned the roadmap while staying fully aligned to SteadyMD’s architecture and compliance constraints."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "This was lean, expert engineering—executed like a private-label tech team.",
      "stats": [
        {
          "value": "✓",
          "label": "Successfully delivered and operated the app for 14+ months"
        },
        {
          "value": "✓",
          "label": "Enabled SteadyMD to avoid permanent hiring for a short-term need"
        },
        {
          "value": "✓",
          "label": "Full-stack development (APIs, frontend, DevOps) with zero management overhead"
        },
        {
          "value": "✓",
          "label": "Smooth production operations, issue resolution, and eventual system sunset"
        },
        {
          "value": "✓",
          "label": "Freed up SteadyMD’s core team to focus on core product velocity"
        }
      ]
    },
    "quote": "CONFLICT handled the entire lifecycle—architecture, code, support, and retirement. It just worked. We didn’t have to manage anything. They gave us the firepower we needed, only when we needed it.",
    "quoteAuthor": "Patrick Evans, VPE, SteadyMD",
    "contact": {
      "heading": "Let’s engineer the future"
    }
  },
  {
    "id": "production-support-operations",
    "client": "SteadyMD",
    "title": "SteadyMD — Production Support & Operations",
    "intro": "When SteadyMD needed rock-solid production support, CONFLICT stepped in. From backups to incident response, we stabilized systems, hardened ops, and kept healthcare infrastructure humming. Uptime, confidence, and velocity—all engineered into the platform.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "SteadyMD’s telehealth platform operates in a high-stakes environment—real patients, real data, real-time expectations. But as they grew, production issues started creeping in: slow recoveries, brittle backups, unclear on-call playbooks. Incidents weren’t just disruptive—they were a liability. SteadyMD didn’t need more monitoring. They needed real operational reliability."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We delivered elite production support with precision. Our team engineered a full-stack operational layer: reliable cloud backups, disaster recovery workflows, and clear on-call escalation paths. We helped establish incident response protocols that reduced guesswork and cut recovery time. From HA infrastructure to automated alerts and hardened observability, we rebuilt the production backbone to support healthcare-grade reliability. All of it mapped to HIPAA and SOC 2 compliance requirements—and delivered without compromise."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "SteadyMD’s platform now runs like clockwork—because when it doesn’t, we’re already fixing it.",
      "stats": [
        {
          "value": "✓",
          "label": "No major downtime incidents since engagement began"
        },
        {
          "value": "✓",
          "label": "Production backups are now automated, verified, and restorable"
        },
        {
          "value": "✓",
          "label": "Clear incident response flow with reduced MTTR (mean time to recovery)"
        },
        {
          "value": "✓",
          "label": "Infrastructure hardened for recovery, scale, and uptime"
        },
        {
          "value": "✓",
          "label": "Increased operational confidence across engineering and leadership"
        }
      ]
    },
    "quote": "Before CONFLICT, production ops felt like duct tape and crossed fingers. Now we have backups we trust, on-call support that works, and an infrastructure that recovers fast. It’s night and day. CONFLICT gave us peace of mind.",
    "quoteAuthor": "Patrick Evans, VPE, SteadyMD",
    "contact": {
      "heading": "Let’s engineer the future"
    }
  },
  {
    "id": "steadymd-staff-augmentation-embedded-engineering",
    "client": "SteadyMD",
    "title": "SteadyMD — Staff Augmentation & Embedded Engineering",
    "intro": "SteadyMD embedded CONFLICT engineers to run a non-core application end-to-end for 14+ months. No ramp-up, no micro-managing. Just seasoned devs who shipped, supported, and sunset the system with surgical precision.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "In fast-growing companies, priorities shift—and not every initiative justifies internal hiring. For SteadyMD, a non-core application needed engineering ownership for over a year, but bringing on full-time developers didn’t make sense. They needed a plug-and-play team who could build, maintain, and eventually retire the product with zero drag on their core squad."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We dropped in a senior engineering pod—fully embedded, fully accountable. This wasn’t generic staff aug. It was mission-driven augmentation: engineers who could handle frontend, backend, infrastructure, and support without requiring training wheels. We aligned to SteadyMD’s stack and security protocols, operated independently, and gave consistent updates without creating overhead. Our team wrote the code, fixed the bugs, ran the ops, and sunset the product cleanly—tactically valuable, strategically invisible."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "This is what embedded elite engineering looks like: invisible friction, visible results.",
      "stats": [
        {
          "value": "✓",
          "label": "14+ months of continuous support with zero attrition"
        },
        {
          "value": "✓",
          "label": "Delivered and maintained the app without touching SteadyMD’s core team"
        },
        {
          "value": "✓",
          "label": "No hiring cycles, no onboarding delays, no overcommitment"
        },
        {
          "value": "✓",
          "label": "Engineers embedded seamlessly and shipped autonomously"
        },
        {
          "value": "✓",
          "label": "Reduced operational burden while keeping velocity intact"
        }
      ]
    },
    "quote": "The CONFLICT team embedded fast and owned the work completely. They didn’t just augment our team—they became the team. It let us stay focused on what mattered most.",
    "quoteAuthor": "Patrick Evans, VPE, SteadyMD",
    "contact": {
      "heading": "Want a demo or deeper dive?"
    }
  },
  {
    "id": "zonos-api-and-web-development",
    "client": "Zonos",
    "title": "Zonos — API & Web Development",
    "intro": "Zonos relied on CONFLICT to build and maintain core APIs and internal-facing UIs that power operational workflows. We delivered durable endpoints, clean interfaces, and production-grade velocity—without creating tech debt.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "As Zonos grew, so did the complexity of their internal operations and partner integrations. The friction? Internal teams were overloaded, and mission-critical backend systems and operational interfaces needed love. These weren’t greenfield apps—but they were critical. What Zonos needed was a partner who could ship API-first infrastructure and web tools with real reliability."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We architected and delivered a suite of APIs, services, and internal-facing web applications that connected the dots between departments and systems. Built using clean REST conventions and production-ready patterns, these APIs didn’t just move data—they moved business. On the frontend, we created admin UIs and internal tools that helped the Zonos team debug issues, serve customers, and monitor workflows—all with speed and confidence. We integrated tightly into their environment, treated edge cases with care, and designed for long-term maintainability."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "This was developer velocity—built for the backend and battle-tested at the UI.",
      "stats": [
        {
          "value": "✓",
          "label": "Durable internal APIs built with clarity and versioning"
        },
        {
          "value": "✓",
          "label": "Responsive admin UIs for monitoring, debugging, and support"
        },
        {
          "value": "✓",
          "label": "Reduced dev team strain by owning non-core interfaces end-to-end"
        },
        {
          "value": "✓",
          "label": "Systems integrated with legacy infrastructure while reducing fragility"
        },
        {
          "value": "✓",
          "label": "All projects delivered on time, in production, without regressions"
        }
      ]
    },
    "quote": "CONFLICT handled the pieces we didn’t have time to touch—but couldn’t afford to let break. APIs, admin tools, internal apps—they nailed it. Everything just worked.",
    "quoteAuthor": "Senior Engineering Manager at Zonos",
    "contact": {
      "heading": "Want a demo or deeper dive?"
    }
  },
  {
    "id": "zonos-php-sdk-development",
    "client": "Zonos",
    "title": "Zonos — PHP SDK Development",
    "intro": "Zonos asked CONFLICT to build a PHP SDK developers would actually love. We delivered clean interfaces, clear docs, and hardened endpoints—helping partners integrate faster, with fewer questions and less churn.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "As Zonos expanded its API offerings, it became clear that developers needed a better way to connect—especially in the PHP-heavy world of eCommerce platforms like Magento and WooCommerce. The raw API worked, but onboarding was slow. Support tickets piled up. And every partner had to reinvent the same wheel. Zonos needed an SDK that reduced friction and increased adoption."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We approached the PHP SDK as a product, not a wrapper. We mapped the Zonos API surface, identified developer pain points, and designed a fluent, testable SDK with opinionated defaults and strong error handling. The package included full inline docs, versioning, and example implementations. We followed modern PHP best practices (namespacing, PSR standards, Composer packaging) to ensure clean integration into partner stacks. We didn’t just make the API easier—we made it delightful."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "The Zonos API now ships with an SDK that developers actually want to use.",
      "stats": [
        {
          "value": "✓",
          "label": "Full-featured PHP SDK with test coverage, docs, and examples"
        },
        {
          "value": "✓",
          "label": "Reduced support overhead by giving partners better integration tooling"
        },
        {
          "value": "✓",
          "label": "Accelerated API adoption among third-party developers"
        },
        {
          "value": "✓",
          "label": "Architected for long-term maintenance and extensibility"
        },
        {
          "value": "✓",
          "label": "Improved developer trust and platform usability"
        }
      ]
    },
    "quote": "The SDK changed everything. Our partners ship faster, we get fewer support tickets, and the API experience just feels smooth. CONFLICT built it like they were our internal team—and it shows.",
    "quoteAuthor": "Senior Engineering Manager at Zonos",
    "contact": {
      "heading": "Want a demo or deeper dive?"
    }
  },
  {
    "id": "zonos-staff-augmentation-and-embedded-engineering",
    "client": "Zonos",
    "title": "Zonos — Staff Augmentation & Embedded Engineering",
    "intro": "Zonos embedded senior engineers from CONFLICT to support internal platforms and accelerate development—no hiring cycle, no hand-holding. We plugged in fast, shipped consistently, and extended team velocity without missing a beat.",
    "sections": [
      {
        "heading": "About",
        "text": [
          "Zonos, a leader in cross-border eCommerce solutions, found themselves stretched. Core teams were focused on major product initiatives, but internal platforms and legacy systems still needed love. Hiring a new team for short-term, non-core systems didn’t make strategic sense. What they needed was flexible, elite augmentation—engineers who could plug in and go."
        ]
      },
      {
        "heading": "The CONFLICT™ Approach",
        "text": [
          "We embedded seasoned developers who immediately got to work. From internal dashboards to backend services, our engineers wrote clean code, stabilized brittle logic, and helped manage the full lifecycle of applications Zonos depended on but didn’t want to staff for. We operated within their stack, followed their rhythms, and proactively flagged issues before they became problems. For Zonos, it felt like we’d always been there."
        ]
      }
    ],
    "results": {
      "heading": "Results & Impact",
      "intro": "This is what real augmentation looks like—hands-on, high-output, low-noise.",
      "stats": [
        {
          "value": "✓",
          "label": "Embedded support for key systems with zero onboarding friction"
        },
        {
          "value": "✓",
          "label": "Stabilized and shipped across several legacy codebases"
        },
        {
          "value": "✓",
          "label": "Long-term engagement—14+ months of consistent contribution"
        },
        {
          "value": "✓",
          "label": "Allowed Zonos to avoid permanent hires for temporary needs"
        },
        {
          "value": "✓",
          "label": "Reduced team strain while improving system performance and feature velocity"
        }
      ]
    },
    "quote": "The CONFLICT team integrated cleanly and delivered from day one. They stabilized systems we didn’t have bandwidth for and kept things running like clockwork. It’s the kind of staff aug you wish you always had.",
    "quoteAuthor": "Senior Engineering Manager at Zonos",
    "contact": {
      "heading": "Want a demo or deeper dive?"
    }
  }
];

// rodziny powiązanych case study (blok „Build · Run · Govern” na dole strony)
export const FAMILIES = {
  "calliope": {
    "heading": "Build it. Run it. Govern it.",
    "intro": "Three composable products from CONFLICT, sharing one private-AI perimeter.",
    "items": [
      {
        "id": "calliope-ai",
        "role": "Build",
        "name": "Calliope AI",
        "text": "An AI IDE, notebooks, SQL agent and CLI coding agent — private, free and bring-your-own-key."
      },
      {
        "id": "astrolift",
        "role": "Run",
        "name": "Astrolift",
        "text": "Deploy apps and AI agents into your own cloud from one manifest, with PR previews."
      },
      {
        "id": "zentinelle",
        "role": "Govern",
        "name": "Zentinelle",
        "text": "Runtime governance, risk and compliance for every AI agent you run."
      }
    ]
  }
};

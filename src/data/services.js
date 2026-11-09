// ===== Dane usług i podusług (jedno źródło prawdy dla szablonu service.html) =====
// Treść 1:1 z podstrony Services. Każda podusługa ma własny adres: service.html?id=<slug>
export const SERVICES = [
  {
    "id": "platform",
    "num": "01",
    "title": "Platform Engineering & Infrastructure",
    "tag": "Build like the big leagues.",
    "desc": "We bring the patterns and practices used by elite engineering teams — think Google, Netflix, and the cutting edge of platform ops. Whether you’re cloud-curious or cloud-native, we help you go from “just deployed” to production-grade with confidence.",
    "term": [
      "$ terraform apply",
      "✓ infrastructure provisioned",
      "$ kubectl rollout status deploy/api",
      "✓ deployment successfully rolled out",
      "$ alerts --status",
      "✓ all checks passing"
    ],
    "caps": [
      {
        "slug": "devops-transformation",
        "title": "DevOps Transformation",
        "desc": "Infrastructure as code, CI/CD pipelines, GitOps, config management."
      },
      {
        "slug": "site-reliability-engineering",
        "title": "Site Reliability Engineering",
        "desc": "On-demand and auto-scaling GPU clusters (NVIDIA, AMD, cloud-native or bare metal)."
      },
      {
        "slug": "cloud-native-architecture",
        "title": "Cloud-Native Architecture",
        "desc": "AWS, GCP, hybrid and multi-cloud — built for flexibility and scale."
      },
      {
        "slug": "observability",
        "title": "Observability",
        "desc": "Metrics, logs, traces, alerts — and clarity, not chaos."
      },
      {
        "slug": "security-and-compliance",
        "title": "Security & Compliance",
        "desc": "PCI, SOX, SOC 2 — baked into your infrastructure."
      },
      {
        "slug": "systems-administration",
        "title": "Systems Administration",
        "desc": "Deep Linux fluency, Windows via trusted partners, automated workflows."
      }
    ]
  },
  {
    "id": "ai",
    "num": "02",
    "title": "AI Enablement & Intelligent Systems",
    "tag": "Applied AI. No academic fluff.",
    "desc": "From custom LLMs to lightning-fast RAG apps, we help companies turn AI hype into business results — with real-time performance and real-world ROI.",
    "term": [
      "> rag.query(\"where is my order?\")",
      "↳ retrieving context…",
      "↳ streaming answer",
      "$ mlops deploy model --gpu",
      "✓ endpoint live"
    ],
    "caps": [
      {
        "slug": "custom-model-development",
        "title": "Custom Model Development",
        "desc": "Train, fine-tune, and deploy domain-specific LLMs."
      },
      {
        "slug": "rag-and-langchain-apps",
        "title": "RAG & LangChain Apps",
        "desc": "Retrieval-augmented generation, blazing-fast flows, prompt optimization."
      },
      {
        "slug": "ai-integrations",
        "title": "AI Integrations",
        "desc": "Add GPT, Claude, or your in-house model via clean, scalable APIs."
      },
      {
        "slug": "ai-infrastructure-and-mlops",
        "title": "AI Infrastructure & MLOps",
        "desc": "Model CI/CD, GPU orchestration, vector databases, scalable deployment."
      }
    ]
  },
  {
    "id": "apps",
    "num": "03",
    "title": "Application Development",
    "tag": "Sharp code. Seamless UX. Built to scale.",
    "desc": "From MVP to platform, we design and build applications that work beautifully and perform reliably — across every device and surface.",
    "term": [
      "$ npm run build",
      "✓ web · ios · android",
      "$ curl /api/health",
      "{ \"status\": \"ok\" }"
    ],
    "caps": [
      {
        "slug": "web-applications",
        "title": "Web Applications",
        "desc": "Dashboards, portals, admin panels, responsive frontends."
      },
      {
        "slug": "mobile-apps",
        "title": "Mobile Apps",
        "desc": "Native iOS, Android, or React Native universal apps."
      },
      {
        "slug": "apis-and-integration-layers",
        "title": "APIs & Integration Layers",
        "desc": "REST, GraphQL, gRPC — secure and scalable."
      },
      {
        "slug": "workflow-and-automation-tools",
        "title": "Workflow & Automation Tools",
        "desc": "Internal tools, data flows, ops automation, customer journeys."
      },
      {
        "slug": "desktop-applications",
        "title": "Desktop Applications",
        "desc": "Modern Electron apps with offline mode and rich interactivity."
      }
    ]
  },
  {
    "id": "commerce",
    "num": "04",
    "title": "E-Commerce Engineering",
    "tag": "We don’t sell socks — we scale platforms.",
    "desc": "We’ve powered billion-dollar storefronts, rescued broken carts, and architected ecommerce systems that thrive under pressure. This is full-stack commerce engineering — built to convert.",
    "term": [
      "POST /checkout/session",
      "✓ payment authorized",
      "$ erp sync --orders",
      "✓ inventory in sync"
    ],
    "caps": [
      {
        "slug": "platform-expertise",
        "title": "Platform Expertise",
        "desc": "Shopify, Saleor, Magento, WooCommerce, NetSuite, Oracle, Zonos."
      },
      {
        "slug": "checkout-optimization",
        "title": "Checkout Optimization",
        "desc": "Cart flows, payments, performance, trust signals — fixed."
      },
      {
        "slug": "crm-loyalty-and-retention",
        "title": "CRM, Loyalty & Retention",
        "desc": "Data-driven systems to boost repeat purchase and engagement."
      },
      {
        "slug": "product-taxonomy-and-discovery",
        "title": "Product Taxonomy & Discovery",
        "desc": "Personalization, recommendations, search, filters that convert."
      },
      {
        "slug": "fulfillment-erp-and-supply-chain",
        "title": "Fulfillment, ERP & Supply Chain",
        "desc": "Systems that don’t break when volume spikes."
      },
      {
        "slug": "compliance",
        "title": "Compliance",
        "desc": "PCI, SOX — ready for auditors without slowing your roadmap."
      }
    ]
  },
  {
    "id": "consulting",
    "num": "05",
    "title": "Consulting & Shared Services",
    "tag": "When you need firepower, not fluff.",
    "desc": "Need senior guidance? Extra hands? Round-the-clock ops backup? We drop in where you need us — fast, focused, and ready to deliver.",
    "term": [
      "$ oncall page --sev1",
      "↳ engineer joined incident",
      "✓ resolved",
      "$ roadmap review",
      "✓ plan delivered"
    ],
    "caps": [
      {
        "slug": "fractional-cto-and-architecture-consulting",
        "title": "Fractional CTO & Architecture Consulting",
        "desc": "Product roadmaps, technical due diligence, system planning."
      },
      {
        "slug": "staff-augmentation-and-embedded-teams",
        "title": "Staff Augmentation & Embedded Teams",
        "desc": "Hire elite engineers to plug into your velocity."
      },
      {
        "slug": "on-call-and-incident-response",
        "title": "On-Call & Incident Response",
        "desc": "Shared ops and support for when things go sideways."
      },
      {
        "slug": "training-and-coaching",
        "title": "Training & Coaching",
        "desc": "Workshops, upskilling, enablement programs."
      },
      {
        "slug": "support-and-retainers",
        "title": "Support & Retainers",
        "desc": "Keep us on call for updates, patches, fire drills, and follow-through."
      }
    ]
  }
];

export const findCapability = (slug) => {
  for (const service of SERVICES) {
    const i = service.caps.findIndex((c) => c.slug === slug);
    if (i > -1) return { service, cap: service.caps[i], index: i };
  }
  return null;
};

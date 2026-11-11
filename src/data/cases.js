// ===== Dane case studies (success-stories.html, case.html) =====
// Treść 1:1 z weareconflict.com/success-stories/* (ref/weareconflict). Nie dopisywać własnych tekstów.
export const CASES = [
  {
    "id": "das-meridian",
    "client": "DAS Technology",
    "title": "Meridian — One Customer Record Across 100+ Automotive Data Sources",
    "intro": "DAS Technology is building Meridian, a customer data platform that gives US dealerships a unified, traceable view of consumers and their vehicles. CONFLICT engineers are embedded with the DAS team in a forward-deployed model, moving from a one-month discovery phase into the Phase 1 build.",
    "parent": {
      "href": "showcase.html",
      "label": "Showcase"
    },
    "visuals": {
      "heading": "The product in motion",
      "intro": "Meridian turns fragmented source records into one reviewable customer profile. The interface shown here uses demonstration data.",
      "items": [
        {
          "src": "das.html?embed=1",
          "title": "Meridian product flow",
          "caption": "Live UI animation · demonstration data",
          "live": true
        },
        {
          "src": "das.html?embed=1&frame=6.8",
          "title": "Merge review",
          "caption": "Compare possible matches and resolve duplicates."
        },
        {
          "src": "das.html?embed=1&frame=14",
          "title": "Golden record",
          "caption": "Choose trusted values while preserving their source."
        },
        {
          "src": "das.html?embed=1&frame=23",
          "title": "Customer profile",
          "caption": "A unified view of identity, vehicles and activity."
        }
      ]
    },
    "sections": [
      {
        "heading": "About DAS and the engagement",
        "text": [
          "DAS Technology, formerly Digital Air Strike, is an automotive SaaS company. Its products cover lead management, reputation management and digital advertising for dealerships across the United States.",
          "Meridian is DAS’s customer data platform. CONFLICT engineers work inside the DAS team in a forward-deployed model. Phase 0 was a discovery engagement of about one month. Phase 1 is the build."
        ]
      },
      {
        "heading": "The core problem",
        "text": [
          "Consumer and vehicle data is spread across more than 100 sources: CRMs, DMS platforms, ad channels such as Meta and TikTok, OEM feeds and internal applications. DAS has no unified view of who a customer is across dealerships, so every downstream product has to solve identity and aggregation again from scratch.",
          "The first application blocked by this is Vehicle Smart Score (VSS), a consumer dashboard that scores vehicle health and creates opportunities to offer service and protection plans.",
          "The common thread is identity and ownership data that is siloed, difficult to trust and impossible to trace or repair consistently. Alex English, SVP Product, turned the response into a clear doctrine: re-derive, don’t inherit. Legacy conclusions are not carried forward; Meridian derives them again from raw, replayable facts."
        ]
      },
      {
        "heading": "The solution",
        "text": [
          "Meridian creates one governed path from source data to a unified Dealer-Customer record."
        ],
        "items": [
          "Ingest data through one universal pipeline: webhook, event stream, bulk upload or batch pull.",
          "Resolve each consumer to a single golden record. The MVP uses deterministic matching on email, phone, VIN and dealer customer ID.",
          "Store the data in multi-tenant PostgreSQL, isolating dealership data while preserving a global DAS view.",
          "Expose the unified Dealer-Customer record through an API."
        ]
      },
      {
        "heading": "What the team says the problem is",
        "text": [
          "The executive project review on August 7, 2026 produced the problem statements. Product validated PS-1 and PS-2. PS-3 through PS-7 remain drafts that need product validation."
        ],
        "items": [
          "PS-1 · Product validated — “We can’t reliably segment and dynamically communicate with customers based on predetermined events.” A customer with two vehicles can receive only the communication stream dictated by their last transaction, even when one vehicle needs service and the other is in a trade-in window.",
          "PS-2 · Product validated — “We can’t reliably assign vehicle ownership, and we have broken parameters that are impossible to untangle.” The current system does not prevent one vehicle from being recorded as owned by several customers.",
          "PS-3 · Draft — DAS sees what a customer does inside each product, but not across products.",
          "PS-4 · Draft — Each new consumer product, including VSS, needs separate integrations with every source.",
          "PS-5 · Draft — Segmentation requires duplicated, near-identical segments, while its logic carries a decade of customizations.",
          "PS-6 · Draft — Once bad derivations enter the current system, they cannot be undone.",
          "PS-7 · Draft — There is no way to see where a value came from or why records were or were not linked."
        ]
      },
      {
        "heading": "Engineering challenges",
        "text": [
          "Meridian has to make fragmented identity data explainable and correctable without compromising tenant isolation or future scale."
        ],
        "items": [
          "Scale and fragmentation — more than 100 heterogeneous sources. Later tickets reference 13,000+ dealerships and flag per-tenant partitioning as a scaling risk (MER-1184).",
          "Identity and ownership conflicts — matching needs source-trust ranking, field-level provenance and a human review queue.",
          "Legacy contamination — inherited derived data is difficult to untangle, which is why Meridian re-derives conclusions from raw facts.",
          "Privacy and consent — revocation means suppression rather than deletion. Related tickets cover pepper-hash rotation risks (MER-1061, MER-1071) and a durable erasure saga (MER-37).",
          "Multi-tenancy — dealership isolation has to coexist with a cross-tenant global view for DAS."
        ]
      },
      {
        "heading": "Roadmap and caveat",
        "text": [
          "Phase 1 focuses on the ingestion foundation, deterministic identity resolution, tenant-aware storage and the unified Dealer-Customer API. AI/ML identity resolution, the audience builder and outbound activation are deferred to Phase 2.",
          "The problem statements document is dated August 7–17, 2026. Ticket references come from a brain snapshot and their current Jira status has not been verified for this case study."
        ]
      }
    ],
    "results": {
      "heading": "Scope at a glance",
      "cta": "Project scope",
      "intro": "Phase 0 discovery is complete. Phase 1 is the build.",
      "stats": [
        {
          "value": "100+",
          "label": "Heterogeneous data sources in scope"
        },
        {
          "value": "13K+",
          "label": "Dealership scale referenced in later project tickets"
        },
        {
          "value": "4",
          "label": "Core responsibilities: ingest, resolve, isolate and expose"
        },
        {
          "value": "2",
          "label": "Delivery phases defined: discovery and build"
        }
      ]
    },
    "quote": "Re-derive, don’t inherit.",
    "quoteAuthor": "Alex English, SVP Product, DAS Technology",
    "contact": {
      "heading": "Building a data platform around a hard identity problem?",
      "text": "We can embed with your product and engineering teams to turn discovery into a production system."
    }
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

// ===== Partnerstwa (partnerships.html, partner.html?id=aws|google) =====
// Treść 1:1 z weareconflict.com/partnerships/* (ref/weareconflict).
export const PARTNERS_INTRO = "We build on the platforms we are certified in — AWS and Google Cloud — with production deployments behind every badge.";

export const PARTNERS = [
  {
    id: "aws",
    name: "AWS",
    badge: "materials/aws-partner.png",
    crumb: "AWS Select Tier Services Partner",
    h1: "Recognized for certified cloud expertise",
    intro: ["Built on AWS. Proven in production. Conflict is an AWS Select Tier Services Partner delivering cloud systems that scale — engineered with clarity and production standards in mind."],
    sections: [
      { heading: "What this partnership means?", kind: "list", intro: "Conflict earned AWS Select Tier Services status through:", items: ["Certified AWS engineers", "Proven project delivery", "Architecture aligned with AWS Well-Architected Framework", "Real production deployments"] },
      { heading: "What we deliver on AWS", kind: "cards", items: [
        { title: "Cloud Architecture", desc: "Scalable, secure system design built for long-term growth." },
        { title: "Serverless & Event-Driven Systems", desc: "Lambda-based architectures and distributed workloads." },
        { title: "Cloud Migration", desc: "From on-prem or other clouds to optimized AWS environments." },
        { title: "DevOps & Infrastructure as Code", desc: "CI/CD pipelines, Terraform, automation and observability." },
        { title: "Performance & Cost Optimization", desc: "Right-sizing, monitoring, FinOps practices." },
      ] },
      { heading: "Our AWS approach", kind: "list", intro: "Every architecture is designed for production — not for demo environments.", items: ["Scale under pressure", "Follow AWS architectural standards", "Prioritize security and resilience", "Avoid unnecessary over-engineering"] },
      { heading: "Why work with an AWS consulting company?", kind: "text", text: [
        "Conflict provides AWS consulting services for companies building modern, scalable systems that must perform reliably under pressure. As an AWS Select Tier Services Partner, we design and deliver production-ready cloud architecture aligned with the AWS Well-Architected Framework and engineering best practices.",
        "Our work on AWS focuses on building clean, resilient systems that remain observable, secure and cost-efficient as they grow. Whether we are designing a new SaaS platform, modernizing legacy infrastructure or migrating workloads, we approach every environment with long-term performance and maintainability in mind.",
      ] },
    ],
    contact: { heading: "Planning to build or scale on AWS?", text: "Let’s design infrastructure that won’t fail when it matters." },
  },
  {
    id: "google",
    name: "Google Cloud",
    badge: "materials/google-partner.png",
    crumb: "Google Cloud Partner",
    h1: "Recognized for certified expertise and real-world cloud delivery.",
    intro: ["Conflict designs and scales modern systems on Google Cloud — aligned with platform standards and built for production environments."],
    sections: [
      // „status" i „best" uzupełnione z uciętej krawędzi zrzutu
      { heading: "What this partnership means?", kind: "list", intro: "Conflict earned Google Cloud Partner status through:", items: ["Certified Google Cloud engineers", "Proven project delivery", "Architecture aligned with Google Cloud best practices", "Production-grade implementations"] },
      { heading: "What we deliver on Google Cloud", kind: "cards", items: [
        { title: "Data Platforms", desc: "BigQuery-based analytics, data pipelines and scalable reporting systems." },
        { title: "Cloud-Native Applications", desc: "Containerized services, distributed systems and event-driven architectures." },
        { title: "AI & ML Infrastructure", desc: "AI-ready environments and scalable model deployment." },
        { title: "Cloud Migration & Modernization", desc: "Transition from legacy systems to optimized Google Cloud environments." },
        { title: "DevOps & Automation", desc: "CI/CD, Infrastructure as Code, monitoring and reliability engineering." },
      ] },
      { heading: "Our Google Cloud approach", kind: "list", intro: "We build systems that:", items: ["Are designed around data and performance", "Scale horizontally across distributed workloads", "Follow Google Cloud architecture principles", "Remain observable, secure and cost-efficient"] },
      { heading: "Why work with a Google Cloud consulting company?", kind: "text", text: [
        "Conflict provides Google Cloud consulting services for companies building modern, data-driven systems that must perform reliably at scale. As a Google Cloud Partner, we design and deliver production-ready cloud architecture aligned with Google Cloud standards and engineering principles.",
        "Our work on Google Cloud focuses on building clean, scalable systems that remain observable, secure and cost-efficient as they grow. Whether we are designing a new SaaS platform, modernizing legacy infrastructure or rebuilding data pipelines, we approach every environment with long-term performance and maintainability in mind.",
      ] },
    ],
    contact: { heading: "Planning to build or scale on Google Cloud?", text: "Let’s design infrastructure that won’t fail when it matters." },
  },
];

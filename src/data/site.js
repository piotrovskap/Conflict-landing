// ===== Konfiguracja witryny — jedno źródło prawdy dla SEO (head, JSON-LD, sitemap) =====
// Teksty wyłącznie ze źródłowej strony / od klienta.
export const SITE = {
  url: "https://weareconflict.com",           // domena produkcyjna (nowa strona zastępuje weareconflict.com)
  name: "CONFLICT",
  legalName: "CONFLICT",
  locale: "en_US",
  lang: "en",
  description:
    "CONFLICT™ designs and builds software for ambitious teams — from new products to the platforms their businesses rely on.",
  ogImage: "/materials/og/og-default.jpg",    // 1200×630
  logo: "/materials/favicon/apple-touch-icon.png",
  email: "hi@weareconflict.com",
  phone: "+1-305-209-5818",
  bookUrl: "https://meetings.hubspot.com/leo-mata", // „Book a call” (cta-band, contact-nudge)
  sameAs: ["https://www.linkedin.com/company/conflict"],
  themeColor: "#060705",
  // Analityka — ładowana WYŁĄCZNIE po zgodzie (src/components/consent.js). Puste ID = nic się nie ładuje i baner się nie pokazuje.
  analytics: {
    gtmId: "",      // np. "GTM-XXXXXXX"
    hotjarId: "",   // np. "1234567" (Site ID z Hotjar)
  },
};

export const abs = (path = "/") => SITE.url + (path.startsWith("/") ? path : "/" + path);

// opis do meta description: czysty tekst, ≤ 158 znaków, cięty na granicy słowa
export function metaText(x, max = 158) {
  const s = (Array.isArray(x) ? x.join(" ") : String(x ?? ""))
    .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "") + "…";
}

export const ORG_LD = {
  "@type": "Organization",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  url: SITE.url + "/",
  logo: SITE.url + SITE.logo,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: SITE.sameAs,
};

export function breadcrumbLD(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], i) => ({
      "@type": "ListItem", position: i + 1, name, item: abs(path),
    })),
  };
}

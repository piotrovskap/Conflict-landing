// ===== Strony prawne: legal.html?id=privacy|tos =====
// Stara strona (ref/weareconflict/privacy, tos) miała pod tymi adresami tylko tekst-wypełniacz.
// Terms: krótka wersja dla strony B2B (prawo Florydy — do potwierdzenia przez klienta).
// Privacy: krótka wersja — formularz kontaktowy + analityka za zgodą (GTM/Google Analytics, Hotjar; src/components/consent.js).
// Luki można oznaczać „[TBC: …]” (renderer podświetla); draft: true → noindex + baner „Draft”.
// Bloki jak w posts.js: {h2}, {h3}, {p}, {list}.
export const LEGAL = [
  {
    id: "privacy", title: "Privacy Policy", file: "privacy.md", updated: "November 11, 2026",
    body: [
      { p: "This Privacy Policy explains how CONFLICT LLC (“CONFLICT”, “we”, “us”) handles personal information when you visit this website or contact us. CONFLICT LLC is the controller of this information and can be reached at hi@weareconflict.com or +1 (305) 209-5818." },

      { h2: "What we collect" },
      { p: "We collect the information you choose to send us through the contact form: your name, work email, company, the services you are interested in, your message and whether you agreed to receive other communications from us. If you email or call us directly, we receive the information you include in that message." },
      { p: "Like any website, our hosting provider automatically processes technical data, such as your IP address and browser type, to deliver the site and keep it secure." },
      { p: "If you accept analytics cookies, we also collect information about how you use the website, as described below." },

      { h2: "Cookies and analytics" },
      { p: "We use analytics tools only if you give your consent in the cookie banner. Until then, no analytics cookies are set and no analytics scripts are loaded." },
      { list: [
        "Google Tag Manager and Google Analytics (Google) — help us understand which pages are visited, how visitors arrive at the site and which actions they take, for example clicking a button or sending the contact form.",
        "Hotjar (Hotjar Ltd) — helps us see how the site is used through heatmaps and recordings of visits (clicks, scrolling and mouse movements). Text you type into forms is not recorded.",
      ] },
      { p: "These tools collect information such as the pages you view, your interactions with them, your device and browser type, your approximate location derived from your IP address, and the website that referred you. They use cookies such as _ga and _ga_* (Google Analytics) and _hj* (Hotjar)." },
      { p: "You can change or withdraw your consent at any time using “Cookie settings” at the bottom of every page." },

      { h2: "How we use it and why" },
      { p: "We use your contact information only to reply to your enquiry, discuss your project and, if we work together, to deliver our services. We do this to take steps at your request before entering into a contract, to perform our contract with you, and on the basis of our legitimate interest in running and securing our business and website." },
      { p: "If you tick the optional box on the contact form, we may also send you information about our products, services and other content that may interest you, based on your consent. You can unsubscribe at any time, using the link in our emails or by contacting us." },
      { p: "We use analytics information, based on your consent, to measure and improve the website and our communication." },
      { p: "We do not sell your information, share it with third parties for advertising, or use it for automated decision-making." },

      { h2: "Who can access it" },
      { p: "Your information is accessible only to the CONFLICT team and to service providers that help us run our business — such as website hosting, email, Google (analytics) and Hotjar (analytics) — who process it on our behalf and only for these purposes. We may disclose information if required by law." },
      { p: "If you book a call or buy a service through a link on this website, you use a third-party service (our scheduling or payment provider) that collects the details you enter under its own privacy policy." },

      { h2: "International transfers" },
      { p: "CONFLICT is based in the United States, and some of our providers process data in the US. When we receive personal information from the European Economic Area, the United Kingdom or Switzerland, we protect it with appropriate safeguards, such as the European Commission’s Standard Contractual Clauses or the EU–US Data Privacy Framework." },

      { h2: "How long we keep it" },
      { p: "We keep contact information only as long as needed to respond to you and to maintain our business relationship, or as required by law. Analytics data is deleted automatically after a limited retention period set in the analytics tools. You can ask us to delete your information at any time." },

      { h2: "Your rights" },
      { p: "You can ask us to access, correct or delete the personal information we hold about you, to restrict or object to its processing, or to receive it in a portable format. You can withdraw your consent to analytics at any time through “Cookie settings”, without affecting processing that took place before. You also have the right to lodge a complaint with your local data protection authority." },
      { p: "To exercise any of these rights, contact us using the details below. We will respond within the time required by applicable law." },

      { h2: "Do Not Track" },
      { p: "Our website does not respond to “Do Not Track” browser signals. Instead, analytics run only if you accept them in the cookie banner, and you can change your choice at any time." },

      { h2: "Changes" },
      { p: "We may update this policy from time to time. The date at the top of this page shows when it was last updated." },

      { h2: "Contact" },
      { p: "CONFLICT LLC — questions or requests about your personal information: hi@weareconflict.com or +1 (305) 209-5818." },
    ],
  },
  {
    id: "tos", title: "Terms of Service", file: "terms.md", updated: "November 11, 2026",
    body: [
      { p: "These Terms of Service govern your use of weareconflict.com (the “website”), operated by CONFLICT LLC (“CONFLICT”, “we”, “us”), which can be reached at hi@weareconflict.com or +1 (305) 209-5818. By using the website, you agree to these terms. If you do not agree, please do not use it." },

      { h2: "Who the website is for" },
      { p: "The website presents our services to businesses. Our services are intended for companies and professionals, not for consumers." },

      { h2: "Information, not an offer" },
      { p: "Descriptions of services, case studies, articles and other content on the website are for general information only. They are not a binding offer, a guarantee of results or professional advice. The scope, price and terms of any work we do for you are set out in a separate written agreement." },

      { h2: "Purchases" },
      { p: "Some services, such as Team Spartan hours, can be purchased through a link on the website. Payments are processed by our payment provider. The scope, price and any refund or cancellation terms of a purchase are those stated at the point of purchase or agreed with us in writing. If you have a question about a purchase, contact us." },

      { h2: "Intellectual property" },
      { p: "The website and its content — including text, graphics, logos, video, design and code — belong to CONFLICT or its licensors and are protected by law. You may view the website and share links to it, but you may not copy, modify, republish or use its content for commercial purposes without our written permission." },
      { p: "Names, logos and trademarks of our partners and clients (for example AWS, Google Cloud and the companies shown in our showcase) belong to their respective owners and are used for identification only." },

      { h2: "Acceptable use" },
      { p: "When using the website, you agree not to:" },
      { list: [
        "attempt to gain unauthorized access to the website or the systems behind it, or interfere with how it works;",
        "use automated tools to collect content from the website, including to train AI models, without our written permission;",
        "send spam, malicious code or unlawful content through the contact form or any other channel;",
        "use the website in a way that breaks the law or infringes the rights of others.",
      ] },

      { h2: "Links to other websites" },
      { p: "The website links to third-party websites and services, such as our clients’ and partners’ sites, LinkedIn, and our scheduling and payment providers. We do not control them and are not responsible for their content or practices." },

      { h2: "No warranty" },
      { p: "The website is provided “as is” and “as available”. We do our best to keep it accurate and available, but we do not guarantee that it will be error-free, uninterrupted or up to date." },

      { h2: "Limitation of liability" },
      { p: "To the fullest extent permitted by law, CONFLICT is not liable for any indirect, incidental or consequential damages, or for any loss of data, profits or business, arising from your use of, or inability to use, the website. Nothing in these terms limits liability that cannot be limited by law." },

      { h2: "Privacy" },
      { p: "How we handle personal information is described in our Privacy Policy." },

      { h2: "Governing law" },
      { p: "These terms are governed by the laws of the State of Florida, United States, without regard to its conflict of law rules. Any dispute relating to the website will be subject to the courts located in Florida." },

      { h2: "Changes" },
      { p: "We may update these terms from time to time. The date at the top of this page shows when they were last updated. Continued use of the website after a change means you accept the updated terms." },

      { h2: "Contact" },
      { p: "CONFLICT LLC — questions about these terms: hi@weareconflict.com or +1 (305) 209-5818." },
    ],
  },
];

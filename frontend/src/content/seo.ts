/**
 * Structured data for the site, built from the same content the page renders.
 *
 * Everything here is generated at build time and injected into index.html by
 * scripts/prerender.mjs, so the prices and questions a crawler reads can never
 * drift from the ones a visitor sees.
 */
import { PLANS } from "./plans";
import { QUESTIONS } from "../components/Faq";

export const SITE_URL = "https://simonhost.navonsimon.com";

export const SITE_NAME = "Simon Host";

export const SITE_DESCRIPTION =
  "אתר לעסק ב־99 ₪, אפליקציה עם בסיס נתונים ב־149 ₪, או שרת פרטי ב־79 ₪ לחודש. מחיר קבוע, בלי דמי הקמה, ומענה אנושי בוואטסאפ.";

/**
 * A ProfessionalService rather than a plain Organization: this is one person
 * selling his time, and the three rungs are the offers.
 */
function service() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "IL" },
    priceRange: "₪₪",
    makesOffer: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.tagline,
      price: plan.price,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: "ILS",
        unitCode: "MON",
        billingIncrement: 1,
      },
    })),
  };
}

function faq() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: QUESTIONS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function webSite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "he-IL",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [service(), webSite(), faq()],
  };
}

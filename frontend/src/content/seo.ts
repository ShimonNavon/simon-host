/**
 * Per-route metadata and structured data, built from the same content the
 * pages render — the prices and questions a crawler reads can never drift
 * from the ones a visitor sees. scripts/prerender.mjs calls these for every
 * route at build time.
 */
import { SERVICES, type Service } from "./services";
import { OFFERS, type Offer } from "./offers";
import { QUESTIONS } from "../components/Faq";

export const SITE_URL = "https://simonhost.navonsimon.com";

export const SITE_NAME = "Simon Host";

export const SITE_DESCRIPTION =
  "אחסון וורדפרס מנוהל ב־49 ₪, אתר לעסק ב־99 ₪, אפליקציה עם בסיס נתונים ב־149 ₪, או שרת פרטי ב־79 ₪ לחודש. מחיר קבוע, בלי דמי הקמה, ומענה אנושי בוואטסאפ.";

/** The one shared preview image until a page brings its own. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

export type RouteMeta = {
  title: string;
  description: string;
  path: string;
  /** Absolute URL of the Open Graph image for this route. */
  ogImage: string;
  /** Per-page alt text for that image — never the same sentence on every page. */
  ogImageAlt: string;
};

function findService(path: string): Service | undefined {
  return SERVICES.find((s) => `/${s.slug}` === path);
}

function findOffer(path: string): Offer | undefined {
  return OFFERS.find((o) => `/${o.slug}` === path);
}

export function routeMeta(path: string): RouteMeta {
  const service = findService(path);
  if (service) {
    return {
      title: service.seo.title,
      description: service.seo.description,
      path,
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: `Simon Host — ${service.name}, ${service.price} ₪ לחודש`,
    };
  }
  const offer = findOffer(path);
  if (offer) {
    return {
      title: offer.seo.title,
      description: offer.seo.description,
      path,
      ogImage: offer.ogImage ? `${SITE_URL}${offer.ogImage}` : DEFAULT_OG_IMAGE,
      ogImageAlt: offer.ogImageAlt,
    };
  }
  return {
    title: "Simon Host — אחסון אתרים, וורדפרס, אפליקציות ושרתים בישראל",
    description: SITE_DESCRIPTION,
    path: "/",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Simon Host — אתר לעסק, וורדפרס, אפליקציה, שרת פרטי",
  };
}

function offer(service: Service) {
  return {
    "@type": "Offer",
    name: service.name,
    description: service.tagline,
    price: service.price,
    priceCurrency: "ILS",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: service.price,
      priceCurrency: "ILS",
      unitCode: "MON",
      billingIncrement: 1,
    },
  };
}

/**
 * A ProfessionalService rather than a plain Organization: this is one person
 * selling his time, and the four rungs are the offers.
 */
function business() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "IL" },
    priceRange: "₪₪",
    makesOffer: SERVICES.map(offer),
  };
}

function faqPage(id: string, questions: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: questions.map((item) => ({
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

function serviceNode(service: Service) {
  const pageUrl = `${SITE_URL}/${service.slug}`;
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.name,
    description: service.seo.description,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "IL" },
    offers: offer(service),
  };
}

/**
 * An offer landing page is a Service too — one without a fixed price, since
 * the price is set per audit / per build plan. Its FAQ is its own.
 */
function offerNode(page: Offer) {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.name,
    description: page.seo.description,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "IL" },
  };
}

export function structuredData(path: string) {
  const service = findService(path);
  if (service) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        serviceNode(service),
        business(),
        webSite(),
        faqPage(`${SITE_URL}/${service.slug}#faq`, service.faq),
      ],
    };
  }
  const page = findOffer(path);
  if (page) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        offerNode(page),
        business(),
        webSite(),
        faqPage(`${SITE_URL}/${page.slug}#faq`, page.faq),
      ],
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [business(), webSite(), faqPage(`${SITE_URL}/#faq`, QUESTIONS)],
  };
}

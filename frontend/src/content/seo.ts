import { QUESTIONS } from "../components/Faq";
import { ARTICLES, findArticle, articlePath, type Article } from "./articles";
import { OFFERS, type Offer } from "./offers";
import { PORTFOLIO, findProject, projectPath } from "./portfolio";
import { SERVICES, WHATSAPP_NUMBER, type Service } from "./services";
import { FOUNDER, SITE } from "./site";

export const SITE_URL = SITE.url;
export const SITE_NAME = SITE.name;
export const SITE_DESCRIPTION = SITE.description;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;
export const SITE_UPDATED = "2026-08-16";

export type RouteMeta = {
  title: string;
  description: string;
  path: string;
  canonical: string;
  robots: string;
  ogImage: string;
  ogImageAlt: string;
  pageType: "website" | "service" | "blog" | "work" | "article" | "not-found";
  published?: string;
  modified: string;
};

function normalize(path: string): string {
  const withoutQuery = path.split(/[?#]/, 1)[0] || "/";
  return withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;
}

function canonicalFor(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function findService(path: string): Service | undefined {
  return SERVICES.find((service) => `/${service.slug}` === normalize(path));
}

function findOffer(path: string): Offer | undefined {
  return OFFERS.find((offer) => `/${offer.slug}` === normalize(path));
}

function baseMeta(
  path: string,
  fields: Omit<RouteMeta, "path" | "canonical" | "robots" | "modified"> &
    Partial<Pick<RouteMeta, "canonical" | "robots" | "modified">>
): RouteMeta {
  const normalized = normalize(path);
  return {
    ...fields,
    path: normalized,
    canonical: fields.canonical ?? canonicalFor(normalized),
    robots: fields.robots ?? "index, follow, max-image-preview:large",
    modified: fields.modified ?? SITE_UPDATED,
  };
}

export function routeMeta(path: string): RouteMeta {
  const normalized = normalize(path);
  const service = findService(normalized);
  if (service) {
    return baseMeta(normalized, {
      title: service.seo.title,
      description: service.seo.description,
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: `Simon Host — ${service.name}, ${service.price} ₪ לחודש`,
      pageType: "service",
    });
  }

  const offer = findOffer(normalized);
  if (offer) {
    return baseMeta(normalized, {
      title: offer.seo.title,
      description: offer.seo.description,
      ogImage: offer.ogImage ? `${SITE_URL}${offer.ogImage}` : DEFAULT_OG_IMAGE,
      ogImageAlt: offer.ogImageAlt,
      pageType: "service",
    });
  }

  const article = findArticle(normalized);
  if (article) {
    const project = article.projectSlug ? findProject(article.projectSlug) : undefined;
    return baseMeta(normalized, {
      title: `${article.title} | Simon Host`,
      description: article.description,
      ogImage: project ? `${SITE_URL}${project.image}` : DEFAULT_OG_IMAGE,
      ogImageAlt: project?.imageAlt ?? `${article.title} — מדריך של Simon Host`,
      pageType: "article",
      published: article.published,
      modified: article.modified,
    });
  }

  if (normalized === "/blog") {
    return baseMeta(normalized, {
      title: "מדריכי אחסון וסיפורי בניית מוצרים | Simon Host",
      description:
        "מדריכים מעשיים בעברית על אחסון, אתרים ושרתים, לצד מקרי בוחן על בניית אפליקציות, קהילות ומוצרים עם React, Django ו-PostgreSQL.",
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: "המדריכים וסיפורי הפרויקטים של Simon Host",
      pageType: "blog",
    });
  }

  if (normalized === "/work") {
    return baseMeta(normalized, {
      title: "פרויקטים, אפליקציות ואתרים שבניתי | Simon Host",
      description:
        "16 פרויקטים אמיתיים של סיימון נבון: אפליקציות React ו-Django, קהילות, אתרי עסקים, מסחר ותשתיות — עם צילומים וקישורים חיים.",
      ogImage: `${SITE_URL}/projects/bama.webp`,
      ogImageAlt: "פרויקטים נבחרים שבנה סיימון נבון — Simon Host",
      pageType: "work",
    });
  }

  if (normalized === "/") {
    return baseMeta(normalized, {
      title: "Simon Host — אחסון מנוהל לסוכנויות, אתרים ואפליקציות",
      description:
        "מעבירים אתרי לקוחות בלי השבתה: בדיקת חשבון חינם, אתר ניסיון ל־14 יום, גיבוי יומי ומענה ישיר מסיימון. גם אתרים, אפליקציות ושרתים במחיר קבוע.",
      ogImage: DEFAULT_OG_IMAGE,
      ogImageAlt: "Simon Host — אחסון מנוהל עם סיימון נבון בצד השני",
      pageType: "website",
    });
  }

  return baseMeta("/404", {
    title: "העמוד לא נמצא | Simon Host",
    description: "העמוד שחיפשתם אינו קיים. אפשר לחזור לשירותים ולמדריכים של Simon Host.",
    canonical: `${SITE_URL}/404`,
    robots: "noindex, follow",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Simon Host",
    pageType: "not-found",
  });
}

function serviceOffer(service: Service) {
  return {
    "@type": "Offer",
    name: service.name,
    description: service.tagline,
    price: service.price,
    priceCurrency: "ILS",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/${service.slug}`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: service.price,
      priceCurrency: "ILS",
      unitCode: "MON",
      billingIncrement: 1,
    },
  };
}

function person() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: FOUNDER.name,
    alternateName: FOUNDER.alternateName,
    jobTitle: FOUNDER.role,
    image: `${SITE_URL}${FOUNDER.portrait}`,
    url: `${SITE_URL}/#about`,
    sameAs: [FOUNDER.linkedin, FOUNDER.github],
    worksFor: { "@id": `${SITE_URL}/#business` },
  };
}

function business() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: DEFAULT_OG_IMAGE,
    telephone: `+${WHATSAPP_NUMBER}`,
    founder: { "@id": `${SITE_URL}/#founder` },
    sameAs: [FOUNDER.linkedin, FOUNDER.github],
    areaServed: { "@type": "Country", name: "Israel" },
    priceRange: "₪₪",
    makesOffer: SERVICES.map(serviceOffer),
  };
}

function webSite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

function webPage(meta: RouteMeta) {
  return {
    "@type": meta.pageType === "blog" || meta.pageType === "work" ? "CollectionPage" : "WebPage",
    "@id": `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: SITE.language,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    dateModified: meta.modified,
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

function breadcrumb(items: { name: string; path: string }[], pageUrl: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalFor(item.path),
    })),
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
    areaServed: { "@type": "Country", name: "Israel" },
    offers: serviceOffer(service),
  };
}

function offerNode(offer: Offer) {
  const pageUrl = `${SITE_URL}/${offer.slug}`;
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: offer.name,
    description: offer.seo.description,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "Israel" },
  };
}

function blogPosting(article: Article, meta: RouteMeta) {
  const project = article.projectSlug ? findProject(article.projectSlug) : undefined;
  return {
    "@type": "BlogPosting",
    "@id": `${meta.canonical}#article`,
    headline: article.title,
    description: article.description,
    url: meta.canonical,
    mainEntityOfPage: { "@id": `${meta.canonical}#webpage` },
    image: meta.ogImage,
    datePublished: article.published,
    dateModified: article.modified,
    inLanguage: SITE.language,
    keywords: article.keywords.join(", "),
    author: { "@id": `${SITE_URL}/#founder` },
    publisher: { "@id": `${SITE_URL}/#business` },
    ...(project && {
      about: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.summary,
        image: `${SITE_URL}${project.image}`,
        url: project.url ?? `${SITE_URL}/work#${project.slug}`,
      },
    }),
  };
}

function workItemList(meta: RouteMeta) {
  return {
    "@type": "ItemList",
    "@id": `${meta.canonical}#projects`,
    name: "פרויקטים נבחרים של סיימון נבון",
    numberOfItems: PORTFOLIO.length,
    itemListElement: PORTFOLIO.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.summary,
        image: `${SITE_URL}${project.image}`,
        url: projectPath(project)
          ? `${SITE_URL}${projectPath(project)}`
          : project.url ?? `${SITE_URL}/work#${project.slug}`,
        creator: { "@id": `${SITE_URL}/#founder` },
        ...(project.githubUrl && { sameAs: project.githubUrl }),
      },
    })),
  };
}

export function structuredData(path: string) {
  const normalized = normalize(path);
  const meta = routeMeta(normalized);
  const graph: Record<string, unknown>[] = [business(), person(), webSite(), webPage(meta)];
  const service = findService(normalized);
  if (service) {
    graph.push(
      serviceNode(service),
      faqPage(`${meta.canonical}#faq`, service.faq),
      breadcrumb(
        [
          { name: "ראשי", path: "/" },
          { name: service.name, path: normalized },
        ],
        meta.canonical
      )
    );
  }

  const offer = findOffer(normalized);
  if (offer) {
    graph.push(
      offerNode(offer),
      faqPage(`${meta.canonical}#faq`, offer.faq),
      breadcrumb(
        [
          { name: "ראשי", path: "/" },
          { name: offer.name, path: normalized },
        ],
        meta.canonical
      )
    );
  }

  const article = findArticle(normalized);
  if (article) {
    graph.push(
      blogPosting(article, meta),
      breadcrumb(
        [
          { name: "ראשי", path: "/" },
          { name: "מדריכים", path: "/blog" },
          { name: article.title, path: articlePath(article) },
        ],
        meta.canonical
      )
    );
  } else if (normalized === "/blog") {
    graph.push(
      breadcrumb(
        [
          { name: "ראשי", path: "/" },
          { name: "מדריכים", path: "/blog" },
        ],
        meta.canonical
      )
    );
  } else if (normalized === "/work") {
    graph.push(
      workItemList(meta),
      breadcrumb(
        [
          { name: "ראשי", path: "/" },
          { name: "עבודות", path: "/work" },
        ],
        meta.canonical
      )
    );
  } else if (normalized === "/") {
    graph.push(faqPage(`${SITE_URL}/#faq`, QUESTIONS));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function routeLastModified(path: string): string {
  return routeMeta(path).modified;
}

export function articleFeedItems() {
  return ARTICLES.map((article) => ({ article, url: `${SITE_URL}${articlePath(article)}` }));
}

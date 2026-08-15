/**
 * The blog index: every article, newest first. Adding an article is a new
 * `<slug>.ts` file exporting `article`, plus one import + one entry here —
 * routes.tsx, seo.ts, the sitemap and rss.xml all read from ARTICLES.
 */
import { OFFERS } from "../offers";
import { SERVICES } from "../services";
import type { Article, ArticleOffer } from "./types";
import { article as wordpressMigration } from "./haavarat-atar-wordpress-bli-downtime";
import { article as cpanelPhp } from "./cpanel-php-version-lies";
import { article as agencyInvoice } from "./kama-ole-ihsun-atarim-lesochnut";

const REGISTERED: Article[] = [wordpressMigration, cpanelPhp, agencyInvoice];

/** Newest first; ties keep registration order. */
export const ARTICLES: Article[] = [...REGISTERED].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0
);

/** Slug → article; "/blog/x/" style trailing slashes are tolerated. */
export function findArticle(slug: string): Article | undefined {
  const s = slug.replace(/\/+$/, "");
  return ARTICLES.find((a) => a.slug === s);
}

export type OfferTarget = {
  /** Landing page the closing CTA card links to. */
  path: string;
  /** Card heading. */
  label: string;
  /** Short line under the heading. */
  line: string;
  /** Pre-filled WhatsApp message — the landing page's own. */
  whatsapp: string;
  /** Button label — the landing page's own. */
  ctaLabel: string;
};

function offerBySlug(slug: string) {
  const o = OFFERS.find((x) => x.slug === slug);
  if (!o) throw new Error(`offers.ts has no "${slug}" offer`);
  return o;
}

function serviceBySlug(slug: string) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`services.ts has no "${slug}" service`);
  return s;
}

/**
 * Resolves an article's `offer` to the landing page it sells and that page's
 * own message, so the CTA card can never drift from the page it points at.
 */
export function offerTarget(offer: ArticleOffer): OfferTarget {
  if (offer === "A") {
    const o = offerBySlug("agencies");
    return {
      path: `/${o.slug}`,
      label: o.name,
      line: o.magnets[0].title,
      whatsapp: o.whatsapp,
      ctaLabel: o.ctaLabel,
    };
  }
  if (offer === "B") {
    const o = offerBySlug("launch");
    return {
      path: `/${o.slug}`,
      label: o.name,
      line: o.magnets[0].title,
      whatsapp: o.whatsapp,
      ctaLabel: o.ctaLabel,
    };
  }
  const s = serviceBySlug("wordpress");
  return {
    path: `/${s.slug}`,
    label: s.name,
    line: `${s.price} ₪ לחודש · ${s.tagline}`,
    whatsapp: s.whatsapp,
    ctaLabel: s.ctaLabel,
  };
}

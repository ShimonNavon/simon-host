import { SERVICES, type Service } from "./content/services";
import { OFFERS, type Offer } from "./content/offers";
import { ARTICLES, type Article, articlePath } from "./content/articles";
import { GROWTH_SERVICES, type GrowthService } from "./content/growthServices";

/** One route per service, at `/${slug}`. */
export const SERVICE_ROUTES: { path: string; service: Service }[] = SERVICES.map(
  (service) => ({ path: `/${service.slug}`, service })
);

/** One route per offer landing page, at `/${slug}`. */
export const OFFER_ROUTES: { path: string; offer: Offer }[] = OFFERS.map((offer) => ({
  path: `/${offer.slug}`,
  offer,
}));

/** Search-focused software development services. */
export const GROWTH_SERVICE_ROUTES: { path: string; service: GrowthService }[] =
  GROWTH_SERVICES.map((service) => ({ path: `/${service.slug}`, service }));

export const BLOG_INDEX_PATH = "/blog";

export const ARTICLE_ROUTES: { path: string; article: Article }[] = ARTICLES.map((article) => ({
  path: articlePath(article),
  article,
}));

/** Public, canonical paths that belong in the sitemap. */
export const INDEXABLE_PATHS: string[] = [
  "/",
  ...SERVICE_ROUTES.map((r) => r.path),
  ...OFFER_ROUTES.map((r) => r.path),
  ...GROWTH_SERVICE_ROUTES.map((r) => r.path),
  "/work",
  BLOG_INDEX_PATH,
  ...ARTICLE_ROUTES.map((r) => r.path),
];

/** Build targets include the 404 document, but the sitemap does not. */
export const PRERENDER_PATHS = [...INDEXABLE_PATHS, "/404"];

/** Backward-compatible name used by existing tests and build code. */
export const ALL_PATHS = INDEXABLE_PATHS;

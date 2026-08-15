import { SERVICES, type Service } from "./content/services";
import { OFFERS, type Offer } from "./content/offers";

/** One route per service, at `/${slug}`. */
export const SERVICE_ROUTES: { path: string; service: Service }[] = SERVICES.map(
  (service) => ({ path: `/${service.slug}`, service })
);

/** One route per offer landing page, at `/${slug}`. */
export const OFFER_ROUTES: { path: string; offer: Offer }[] = OFFERS.map((offer) => ({
  path: `/${offer.slug}`,
  offer,
}));

/** Every prerendered path — the build walks this list. */
export const ALL_PATHS: string[] = [
  "/",
  ...SERVICE_ROUTES.map((r) => r.path),
  ...OFFER_ROUTES.map((r) => r.path),
];

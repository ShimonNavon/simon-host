import { SERVICES, type Service } from "./content/services";

/** One route per service, at `/${slug}`. */
export const SERVICE_ROUTES: { path: string; service: Service }[] = SERVICES.map(
  (service) => ({ path: `/${service.slug}`, service })
);

/** Every prerendered path — the build walks this list. */
export const ALL_PATHS: string[] = ["/", ...SERVICE_ROUTES.map((r) => r.path)];

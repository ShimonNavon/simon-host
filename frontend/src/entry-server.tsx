/**
 * Build-time entry point. Never ships to the browser.
 *
 * scripts/prerender.mjs imports this and calls render() once per route,
 * injecting the HTML and per-route head into that route's index.html so
 * crawlers and link-preview bots get the real page instead of an empty
 * <div id="root">.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { routeMeta, structuredData } from "./content/seo";

export { INDEXABLE_PATHS, PRERENDER_PATHS } from "./routes";
export { articleFeedItems, routeLastModified } from "./content/seo";

export function render(path: string) {
  return {
    html: renderToString(
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    ),
    jsonLd: structuredData(path),
    meta: routeMeta(path),
  };
}

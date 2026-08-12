/**
 * Build-time entry point. Never ships to the browser.
 *
 * scripts/prerender.mjs imports this, renders the app to static HTML, and
 * injects it into dist/index.html so crawlers and link-preview bots get the
 * real page instead of an empty <div id="root">.
 */
import { renderToString } from "react-dom/server";
import App from "./App";
import { structuredData } from "./content/seo";

export function render() {
  return {
    html: renderToString(<App />),
    jsonLd: structuredData(),
  };
}

/**
 * Injects the prerendered app HTML and its JSON-LD into dist/index.html.
 *
 * Runs after both Vite builds: the client build produces dist/, the SSR build
 * produces dist-ssr/entry-server.js. Without this step the shipped page is an
 * empty <div id="root">, which is all a crawler or a WhatsApp link preview
 * would ever see.
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");

const { render } = await import(resolve(root, "dist-ssr/entry-server.js"));
const { html, jsonLd } = render();

if (!html || html.length < 1000) {
  throw new Error(
    `Prerender produced suspiciously little HTML (${html?.length ?? 0} chars) — refusing to ship it.`
  );
}

let template = await readFile(indexPath, "utf8");

const mountPoint = '<div id="root"></div>';
if (!template.includes(mountPoint)) {
  throw new Error(`Could not find ${mountPoint} in dist/index.html.`);
}

// "<" is escaped so a stray "</script>" inside the data cannot close the tag.
const ldScript = `<script type="application/ld+json">${JSON.stringify(
  jsonLd
).replace(/</g, "\\u003c")}</script>`;

template = template
  .replace(mountPoint, `<div id="root">${html}</div>`)
  .replace("</head>", `  ${ldScript}\n  </head>`);

await writeFile(indexPath, template);

// The SSR bundle is a build artifact; it must never reach the image.
await rm(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log(
  `prerender: injected ${html.length} chars of HTML + ${
    jsonLd["@graph"].length
  } JSON-LD nodes into dist/index.html`
);

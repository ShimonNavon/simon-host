/**
 * Prerenders every route into its own static HTML file, plus sitemap.xml.
 *
 * Runs after both Vite builds: the client build produces dist/, the SSR build
 * produces dist-ssr/entry-server.js. For each route the template's head is
 * rewritten (title, description, canonical, og/twitter incl. per-route og:image
 * and og:image:alt) and the rendered app
 * plus its JSON-LD are injected, so a crawler landing on /wordpress reads a
 * complete WordPress-hosting page — not an empty <div id="root">.
 */
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

const { render, ALL_PATHS } = await import(resolve(root, "dist-ssr/entry-server.js"));

const SITE_URL = "https://simonhost.navonsimon.com";
const template = await readFile(resolve(dist, "index.html"), "utf8");

const mountPoint = '<div id="root"></div>';
if (!template.includes(mountPoint)) {
  throw new Error(`Could not find ${mountPoint} in dist/index.html.`);
}

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const path of ALL_PATHS) {
  const { html, jsonLd, meta } = render(path);

  if (!html || html.length < 1000) {
    throw new Error(
      `Prerender of ${path} produced suspiciously little HTML (${html?.length ?? 0} chars) — refusing to ship it.`
    );
  }

  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  // "<" is escaped so a stray "</script>" inside the data cannot close the tag.
  const ldScript = `<script type="application/ld+json">${JSON.stringify(
    jsonLd
  ).replace(/</g, "\\u003c")}</script>`;

  let page = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${escapeAttr(meta.description)}$2`
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${escapeAttr(meta.title)}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${escapeAttr(meta.description)}$2`
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${escapeAttr(meta.title)}$2`
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${escapeAttr(meta.description)}$2`
    )
    // Preview image per route: the asset may be shared, the alt never is.
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${meta.ogImage}$2`)
    .replace(
      /(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/,
      `$1${escapeAttr(meta.ogImageAlt)}$2`
    )
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, `$1${meta.ogImage}$2`)
    .replace(mountPoint, `<div id="root">${html}</div>`)
    .replace("</head>", `  ${ldScript}\n  </head>`);

  const outFile =
    path === "/" ? resolve(dist, "index.html") : resolve(dist, path.slice(1), "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page);
  console.log(`prerender: ${path} → ${outFile.replace(root + "/", "")} (${html.length} chars)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_PATHS.map((p) => {
  const url = p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`;
  return `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`;
}).join("\n")}
</urlset>
`;
await writeFile(resolve(dist, "sitemap.xml"), sitemap);
console.log(`prerender: sitemap.xml with ${ALL_PATHS.length} URLs`);

// The SSR bundle is a build artifact; it must never reach the image.
await rm(resolve(root, "dist-ssr"), { recursive: true, force: true });

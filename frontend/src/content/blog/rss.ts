/**
 * rss.xml and sitemap lastmod, both derived from ARTICLES. Called by
 * scripts/prerender.mjs at build time (via entry-server.tsx) — nothing here
 * runs in the browser.
 */
import { SITE_URL, SITE_NAME } from "../seo";
import { ARTICLES } from "./articles";
import { BLOG_INDEX_PATH } from "../../routes";
import type { Article } from "./types";

export const BLOG_TITLE = `${SITE_NAME} — הבלוג`;
export const BLOG_DESCRIPTION =
  "מה שלמדתי מהעברת אתרי וורדפרס, קריאת חשבוניות אחסון ותפעול שרתים — כתוב בעברית, מהשטח, בגוף ראשון.";

export function articleUrl(article: Article): string {
  return `${SITE_URL}/blog/${article.slug}`;
}

/** Sitemap lastmod: an article's updatedAt, the index's newest; nothing else. */
export function lastmodFor(path: string): string | undefined {
  const p = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (p === BLOG_INDEX_PATH) {
    return ARTICLES.map((a) => a.updatedAt).sort().reverse()[0];
  }
  const m = p.match(/^\/blog\/([^/]+)$/);
  if (m) return ARTICLES.find((a) => a.slug === m[1])?.updatedAt;
  return undefined;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RFC-822 date at midnight UTC, as feed readers expect. */
export function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

/** The article body as simple HTML for the feed's content:encoded. */
function bodyHtml(article: Article): string {
  const parts: string[] = [`<p>${esc(article.lead)}</p>`];
  for (const section of article.body) {
    parts.push(`<h2>${esc(section.heading)}</h2>`);
    for (const block of section.blocks) {
      if (block.type === "p") parts.push(`<p>${esc(block.text)}</p>`);
      else {
        const tag = block.type;
        parts.push(
          `<${tag}>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</${tag}>`
        );
      }
    }
  }
  return parts.join("");
}

function item(article: Article): string {
  const url = articleUrl(article);
  return [
    "    <item>",
    `      <title>${esc(article.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${rfc822(article.publishedAt)}</pubDate>`,
    `      <description>${esc(article.description)}</description>`,
    ...article.tags.map((t) => `      <category>${esc(t)}</category>`),
    `      <content:encoded><![CDATA[${bodyHtml(article).replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>`,
    "    </item>",
  ].join("\n");
}

export function rssXml(): string {
  const newest = ARTICLES[0]?.updatedAt;
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "  <channel>",
    `    <title>${esc(BLOG_TITLE)}</title>`,
    `    <link>${SITE_URL}${BLOG_INDEX_PATH}</link>`,
    `    <description>${esc(BLOG_DESCRIPTION)}</description>`,
    "    <language>he</language>",
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
    ...(newest ? [`    <lastBuildDate>${rfc822(newest)}</lastBuildDate>`] : []),
    ...ARTICLES.map(item),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

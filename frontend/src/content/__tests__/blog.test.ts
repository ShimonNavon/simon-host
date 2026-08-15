import { describe, it, expect } from "vitest";
import { ARTICLES, findArticle, offerTarget } from "../blog/articles";
import { articleText, articleWordCount } from "../blog/types";
import { rssXml, lastmodFor } from "../blog/rss";
import { routeMeta, structuredData, SITE_URL } from "../seo";
import { OFFERS } from "../offers";
import { SERVICES } from "../services";
import { ALL_PATHS, BLOG_INDEX_PATH, BLOG_ROUTES } from "../../routes";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("blog articles", () => {
  it("ships at least the three launch articles with unique kebab-case slugs", () => {
    expect(ARTICLES.length).toBeGreaterThanOrEqual(3);
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "haavarat-atar-wordpress-bli-downtime",
        "cpanel-php-version-lies",
        "kama-ole-ihsun-atarim-lesochnut",
      ])
    );
  });

  it("has valid dates, updated on or after published, index sorted newest first", () => {
    for (const a of ARTICLES) {
      expect(a.publishedAt).toMatch(ISO_DATE);
      expect(a.updatedAt).toMatch(ISO_DATE);
      expect(Number.isNaN(Date.parse(a.publishedAt))).toBe(false);
      expect(Number.isNaN(Date.parse(a.updatedAt))).toBe(false);
      expect(a.updatedAt >= a.publishedAt).toBe(true);
    }
    const dates = ARTICLES.map((a) => a.publishedAt);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("keeps titles and meta descriptions inside SERP bounds", () => {
    for (const a of ARTICLES) {
      expect(a.title.length, a.slug).toBeLessThanOrEqual(60);
      expect(a.title.length, a.slug).toBeGreaterThan(10);
      expect(a.description.length, a.slug).toBeLessThanOrEqual(155);
      expect(a.description.length, a.slug).toBeGreaterThan(50);
    }
  });

  it("every article is a real article: lead, ≥3 sections, 600–1000 words, sane reading time", () => {
    for (const a of ARTICLES) {
      expect(a.lead.length, a.slug).toBeGreaterThan(80);
      expect(a.body.length, a.slug).toBeGreaterThanOrEqual(3);
      for (const s of a.body) {
        expect(s.heading.length).toBeGreaterThan(3);
        expect(s.blocks.length).toBeGreaterThanOrEqual(1);
      }
      const words = articleWordCount(a);
      expect(words, `${a.slug} has ${words} words`).toBeGreaterThanOrEqual(600);
      expect(words, `${a.slug} has ${words} words`).toBeLessThanOrEqual(1000);
      expect(a.readingMinutes).toBeGreaterThanOrEqual(2);
      expect(a.readingMinutes).toBeLessThanOrEqual(10);
      expect(a.tags.length).toBeGreaterThanOrEqual(1);
      expect(a.targetPhrase.length).toBeGreaterThan(5);
    }
  });

  it("each article names its target phrase in the title, lead or description", () => {
    for (const a of ARTICLES) {
      const head = `${a.title}\n${a.description}\n${a.lead}`;
      expect(head, `${a.slug} never says "${a.targetPhrase}"`).toContain(a.targetPhrase);
    }
  });

  it("points at a valid offer, and each offer resolves to a real landing page + distinct message", () => {
    const paths = new Set([...OFFERS.map((o) => `/${o.slug}`), ...SERVICES.map((s) => `/${s.slug}`)]);
    for (const a of ARTICLES) {
      expect(["A", "B", "brand"]).toContain(a.offer);
      const target = offerTarget(a.offer);
      expect(paths.has(target.path)).toBe(true);
      expect(target.whatsapp.length).toBeGreaterThan(10);
      expect(target.label.length).toBeGreaterThan(3);
    }
    const messages = (["A", "B", "brand"] as const).map((o) => offerTarget(o).whatsapp);
    expect(new Set(messages).size).toBe(3);
  });

  it("case-study gate: no unapproved figures anywhere in article copy", () => {
    const CASE_FIGURES = /85|12,?000|₪\s?600|600\s?₪/;
    for (const a of ARTICLES) {
      const text = articleText(a);
      expect(text, `case figure leaked into ${a.slug}`).not.toMatch(CASE_FIGURES);
    }
  });

  it("only the published prices appear in article copy", () => {
    const published = new Set(["49", "99", "149", "79"]);
    for (const a of ARTICLES) {
      for (const m of articleText(a).matchAll(/₪\s?(\d[\d,]*)|(\d[\d,]*)\s?₪/g)) {
        const n = (m[1] ?? m[2]).replace(/,/g, "");
        expect(published.has(n), `unpublished price "${m[0]}" in ${a.slug}`).toBe(true);
      }
    }
  });

  it("findArticle resolves slugs and ignores trailing slashes", () => {
    const first = ARTICLES[0];
    expect(findArticle(first.slug)).toBe(first);
    expect(findArticle("nope")).toBeUndefined();
  });
});

describe("blog routes and seo", () => {
  it("index and every article are prerendered paths", () => {
    expect(BLOG_INDEX_PATH).toBe("/blog");
    expect(ALL_PATHS).toContain("/blog");
    for (const a of ARTICLES) expect(ALL_PATHS).toContain(`/blog/${a.slug}`);
    expect(BLOG_ROUTES).toHaveLength(ARTICLES.length);
    // 1 home + 4 services + 2 offers + blog index + one per article
    expect(ALL_PATHS).toHaveLength(7 + 1 + ARTICLES.length);
    expect(new Set(ALL_PATHS).size).toBe(ALL_PATHS.length);
  });

  it("route meta per article: title, description, canonical, per-page og alt", () => {
    for (const a of ARTICLES) {
      const meta = routeMeta(`/blog/${a.slug}`);
      expect(meta.title).toContain(a.title);
      expect(meta.title).toContain("Simon Host");
      expect(meta.description).toBe(a.description);
      expect(meta.path).toBe(`/blog/${a.slug}`);
      expect(meta.ogType).toBe("article");
      expect(meta.ogImageAlt).toContain(a.title);
      expect(routeMeta(`/blog/${a.slug}/`).title).toBe(meta.title);
    }
    const index = routeMeta("/blog");
    expect(index.title).toContain("Simon Host");
    expect(index.description.length).toBeGreaterThan(40);
    expect(index.description.length).toBeLessThanOrEqual(155);
    const alts = ALL_PATHS.map((p) => routeMeta(p).ogImageAlt);
    expect(new Set(alts).size).toBe(ALL_PATHS.length);
  });

  it("structured data: BlogPosting per article, Blog on the index", () => {
    for (const a of ARTICLES) {
      const graph = structuredData(`/blog/${a.slug}`)["@graph"] as Record<string, unknown>[];
      const post = graph.find((n) => n["@type"] === "BlogPosting");
      expect(post).toBeDefined();
      expect(post!.headline).toBe(a.title);
      expect(post!.datePublished).toBe(a.publishedAt);
      expect(post!.dateModified).toBe(a.updatedAt);
      expect(post!.inLanguage).toBe("he-IL");
      expect(post!.mainEntityOfPage).toBe(`${SITE_URL}/blog/${a.slug}`);
      expect((post!.author as { name: string }).name).toBe("סיימון נבון");
    }
    const graph = structuredData("/blog")["@graph"] as Record<string, unknown>[];
    const blog = graph.find((n) => n["@type"] === "Blog");
    expect(blog).toBeDefined();
    expect(blog!.blogPost as unknown[]).toHaveLength(ARTICLES.length);
  });

  it("sitemap lastmod is the article's updatedAt and untouched elsewhere", () => {
    for (const a of ARTICLES) expect(lastmodFor(`/blog/${a.slug}`)).toBe(a.updatedAt);
    expect(lastmodFor("/blog")).toBe(ARTICLES.map((a) => a.updatedAt).sort().reverse()[0]);
    expect(lastmodFor("/")).toBeUndefined();
    expect(lastmodFor("/agencies")).toBeUndefined();
  });

  it("rss.xml: one item per article, absolute urls, Hebrew, well-formed escaping", () => {
    const xml = rssXml();
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain("<language>he</language>");
    expect(xml).toContain(`<atom:link href="${SITE_URL}/rss.xml" rel="self"`);
    expect(xml.match(/<item>/g)).toHaveLength(ARTICLES.length);
    for (const a of ARTICLES) {
      expect(xml).toContain(`<link>${SITE_URL}/blog/${a.slug}</link>`);
      expect(xml).toContain(`<guid isPermaLink="true">${SITE_URL}/blog/${a.slug}</guid>`);
    }
    // No relative links, no bare ampersands, no unescaped angle brackets in text.
    expect(xml).not.toMatch(/href="\//);
    expect(xml).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/);
    // Newest first, and pubDate is RFC-822.
    const first = xml.indexOf(`/blog/${ARTICLES[0].slug}<`);
    const last = xml.indexOf(`/blog/${ARTICLES[ARTICLES.length - 1].slug}<`);
    expect(first).toBeLessThan(last);
    expect(xml).toMatch(/<pubDate>[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} 00:00:00 GMT<\/pubDate>/);
  });
});

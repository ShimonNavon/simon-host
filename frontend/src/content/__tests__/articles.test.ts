import { describe, expect, it } from "vitest";
import { ARTICLES, articlePath, findArticle } from "../articles";
import { routeMeta, structuredData } from "../seo";
import { INDEXABLE_PATHS, PRERENDER_PATHS } from "../../routes";

describe("editorial content", () => {
  it("ships six guides and six substantial project stories", () => {
    expect(ARTICLES).toHaveLength(12);
    expect(ARTICLES.filter((article) => article.kind === "guide")).toHaveLength(6);
    expect(ARTICLES.filter((article) => article.kind === "case-study")).toHaveLength(6);
    expect(new Set(ARTICLES.map((article) => article.slug)).size).toBe(ARTICLES.length);

    for (const article of ARTICLES) {
      expect(article.title.length).toBeGreaterThan(25);
      expect(article.description.length).toBeGreaterThan(70);
      expect(article.keywords.length).toBeGreaterThanOrEqual(3);
      expect(article.sections.length).toBeGreaterThanOrEqual(4);
      expect(article.sections.flatMap((section) => section.paragraphs).length).toBeGreaterThanOrEqual(7);
      expect(article.relatedLinks.length).toBeGreaterThanOrEqual(3);
      expect(article.relatedLinks.every((link) => link.href.startsWith("/"))).toBe(true);
      expect(article.cta.message.length).toBeGreaterThan(20);
      expect(findArticle(articlePath(article))).toBe(article);
    }
  });

  it("makes the blog and every guide indexable, while keeping 404 out of the sitemap", () => {
    expect(INDEXABLE_PATHS).toContain("/blog");
    for (const article of ARTICLES) expect(INDEXABLE_PATHS).toContain(articlePath(article));
    expect(INDEXABLE_PATHS).not.toContain("/404");
    expect(PRERENDER_PATHS).toContain("/404");
  });

  it("connects every project story to a known portfolio project", () => {
    const projectStories = ARTICLES.filter((article) => article.kind === "case-study");
    expect(projectStories.every((article) => article.projectSlug)).toBe(true);
  });

  it("publishes complete metadata and connected article schema", () => {
    for (const article of ARTICLES) {
      const path = articlePath(article);
      const meta = routeMeta(path);
      expect(meta.pageType).toBe("article");
      expect(meta.canonical).toBe(`https://simonhost.navonsimon.com${path}`);
      expect(meta.published).toBe(article.published);
      expect(meta.modified).toBe(article.modified);
      expect(meta.robots).toContain("index");

      const graph = structuredData(path)["@graph"] as { "@type": string }[];
      const types = graph.map((node) => node["@type"]);
      expect(types).toContain("BlogPosting");
      expect(types).toContain("BreadcrumbList");
      expect(types).toContain("Person");
      expect(types).toContain("ProfessionalService");
    }
  });

  it("marks unknown routes as noindex and canonicalizes them to the 404 document", () => {
    const meta = routeMeta("/this-page-does-not-exist");
    expect(meta.pageType).toBe("not-found");
    expect(meta.robots).toBe("noindex, follow");
    expect(meta.canonical).toBe("https://simonhost.navonsimon.com/404");
  });
});

import { describe, expect, it } from "vitest";
import { ARTICLES } from "../articles";
import { FEATURED_PROJECTS, PORTFOLIO, PROJECT_CATEGORIES } from "../portfolio";
import { routeMeta, structuredData } from "../seo";
import { INDEXABLE_PATHS } from "../../routes";

describe("project library", () => {
  it("ships sixteen unique projects in four editorial chapters", () => {
    expect(PORTFOLIO).toHaveLength(16);
    expect(PROJECT_CATEGORIES).toHaveLength(4);
    expect(new Set(PORTFOLIO.map((project) => project.slug)).size).toBe(PORTFOLIO.length);
    for (const category of PROJECT_CATEGORIES) {
      expect(PORTFOLIO.some((project) => project.category === category.id)).toBe(true);
    }
  });

  it("features exactly four projects in a stable order", () => {
    expect(FEATURED_PROJECTS).toHaveLength(4);
    expect(FEATURED_PROJECTS.map((project) => project.featuredRank)).toEqual([1, 2, 3, 4]);
  });

  it("never links a private repository and always declares a unique local screenshot", () => {
    expect(new Set(PORTFOLIO.map((project) => project.image)).size).toBe(PORTFOLIO.length);
    for (const project of PORTFOLIO) {
      if (project.repoVisibility === "private") expect(project.githubUrl).toBeUndefined();
      if (project.githubUrl) expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/ShimonNavon\//);
      expect(project.image).toMatch(/^\/projects\/[a-z0-9-]+\.webp$/);
      expect(project.imageAlt.length).toBeGreaterThan(20);
    }
  });

  it("connects all six case studies to project entries", () => {
    const stories = ARTICLES.filter((article) => article.kind === "case-study");
    expect(stories).toHaveLength(6);
    for (const story of stories) {
      const project = PORTFOLIO.find((candidate) => candidate.slug === story.projectSlug);
      expect(project?.caseStudySlug).toBe(story.slug);
    }
  });

  it("publishes indexable metadata and an ItemList for /work", () => {
    expect(INDEXABLE_PATHS).toContain("/work");
    expect(INDEXABLE_PATHS).toHaveLength(21);
    expect(routeMeta("/work").pageType).toBe("work");
    expect(routeMeta("/work").robots).toContain("index");
    const graph = structuredData("/work")["@graph"] as { "@type": string }[];
    expect(graph.map((node) => node["@type"])).toContain("ItemList");
    expect(graph.map((node) => node["@type"])).toContain("BreadcrumbList");
  });
});

import { describe, expect, it } from "vitest";
import { GROWTH_SERVICES, findGrowthService } from "../growthServices";
import { PORTFOLIO } from "../portfolio";
import { routeMeta, structuredData } from "../seo";
import { INDEXABLE_PATHS, PRERENDER_PATHS } from "../../routes";

describe("growth service pages", () => {
  it("ships two complete services with separate search intent", () => {
    expect(GROWTH_SERVICES.map((service) => service.slug).sort()).toEqual([
      "business-systems",
      "mvp-development",
    ]);

    const projectSlugs = new Set(PORTFOLIO.map((project) => project.slug));
    for (const service of GROWTH_SERVICES) {
      expect(service.name.length).toBeGreaterThan(25);
      expect(service.heroBody.length).toBeGreaterThan(60);
      expect(service.recognition.signals).toHaveLength(3);
      expect(service.process).toHaveLength(4);
      expect(service.proofProjectSlugs).toHaveLength(3);
      expect(service.proofProjectSlugs.every((slug) => projectSlugs.has(slug))).toBe(true);
      expect(service.ownership.length).toBeGreaterThanOrEqual(4);
      expect(service.faq.length).toBeGreaterThanOrEqual(5);
      expect(service.seo.title).toContain("Simon Host");
      expect(service.seo.description.length).toBeGreaterThan(80);
      expect(findGrowthService(`/${service.slug}/`)).toBe(service);
    }
  });

  it("prerenders and indexes both canonical routes", () => {
    for (const service of GROWTH_SERVICES) {
      const path = `/${service.slug}`;
      expect(INDEXABLE_PATHS).toContain(path);
      expect(PRERENDER_PATHS).toContain(path);

      const meta = routeMeta(path);
      expect(meta.pageType).toBe("service");
      expect(meta.canonical).toBe(`https://simonhost.navonsimon.com${path}`);
      expect(meta.robots).toContain("index");
      expect(meta.ogImage).toMatch(/^https:\/\/simonhost\.navonsimon\.com\/projects\/.+\.webp$/);
      expect(meta.ogImageAlt).toBe(service.ogImageAlt);
    }
  });

  it("adds Service, FAQ and breadcrumb schema", () => {
    for (const service of GROWTH_SERVICES) {
      const graph = structuredData(`/${service.slug}`)["@graph"] as {
        "@type": string;
        mainEntity?: unknown[];
      }[];
      const types = graph.map((node) => node["@type"]);
      expect(types).toContain("Service");
      expect(types).toContain("FAQPage");
      expect(types).toContain("BreadcrumbList");
      expect(graph.find((node) => node["@type"] === "FAQPage")?.mainEntity).toHaveLength(
        service.faq.length
      );
    }
  });

  it("uses distinct lead messages", () => {
    expect(new Set(GROWTH_SERVICES.map((service) => service.whatsapp)).size).toBe(
      GROWTH_SERVICES.length
    );
  });
});


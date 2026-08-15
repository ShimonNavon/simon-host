import { describe, it, expect } from "vitest";
import { SERVICES } from "../services";
import {
  OFFERS,
  CASE_STUDY_APPROVED,
  CAPACITY_PER_MONTH,
  agencyStory,
  agencyScarcity,
} from "../offers";
import { routeMeta, structuredData } from "../seo";
import { ALL_PATHS } from "../../routes";

/** Every string an offer page can render, flattened — the gate tests scan this. */
function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => allStrings(v, out));
  return out;
}

describe("offers content", () => {
  it("has exactly 2 offers with unique slugs that don't collide with services", () => {
    expect(OFFERS.map((o) => o.slug).sort()).toEqual(["agencies", "launch"]);
    const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
    for (const o of OFFERS) expect(serviceSlugs.has(o.slug)).toBe(false);
    expect(new Set(OFFERS.map((o) => o.id)).size).toBe(2);
  });

  it("every offer is page-complete", () => {
    for (const o of OFFERS) {
      expect(o.name.length).toBeGreaterThan(3);
      expect(o.tagline.length).toBeGreaterThan(10);
      expect(o.heroLine.length).toBeGreaterThan(40);
      expect(o.callout.length).toBeGreaterThan(20);
      expect(o.story.length).toBeGreaterThan(40);
      expect(o.changes.length).toBeGreaterThanOrEqual(3);
      expect(o.stays.length).toBeGreaterThanOrEqual(2);
      expect(o.magnets).toHaveLength(2);
      for (const m of o.magnets) {
        expect(m.title.length).toBeGreaterThan(3);
        expect(m.body.length).toBeGreaterThan(30);
      }
      expect(o.guarantee.length).toBeGreaterThan(30);
      expect(o.scarcity.length).toBeGreaterThan(20);
      expect(o.faq.length).toBeGreaterThanOrEqual(4);
      expect(o.seo.title).toContain("Simon Host");
      expect(o.seo.description.length).toBeGreaterThan(40);
      expect(o.ogImageAlt.length).toBeGreaterThan(5);
      expect(o.ctaLabel.length).toBeGreaterThan(3);
      expect(o.whatsapp.length).toBeGreaterThan(10);
    }
  });

  it("whatsapp messages are distinct across services and offers", () => {
    const all = [...SERVICES.map((s) => s.whatsapp), ...OFFERS.map((o) => o.whatsapp)];
    expect(new Set(all).size).toBe(all.length);
  });

  it("only the four published prices appear anywhere in offer copy", () => {
    const published = new Set(["49", "99", "149", "79"]);
    for (const text of allStrings(OFFERS)) {
      for (const m of text.matchAll(/₪\s?([\d,]+)|([\d,]+)\s?₪/g)) {
        const n = (m[1] ?? m[2]).replace(/,/g, "");
        expect(published.has(n), `unpublished price "${m[0]}" in: ${text}`).toBe(true);
      }
    }
  });
});

describe("offer launch gates", () => {
  it("case study and capacity ship gated off", () => {
    expect(CASE_STUDY_APPROVED).toBe(false);
    expect(CAPACITY_PER_MONTH).toBeNull();
  });

  it("with the gates off, no case-study or capacity figures reach the page", () => {
    const CASE_FIGURES = /85|12[,.]?000|600|\d+\s?%/;
    for (const text of allStrings(OFFERS)) {
      expect(text, `case figure leaked into: ${text}`).not.toMatch(CASE_FIGURES);
    }
    const agencies = OFFERS.find((o) => o.slug === "agencies")!;
    // Story and scarcity must state no numbers at all while unapproved.
    expect(agencies.story).not.toMatch(/\d/);
    expect(agencies.scarcity).not.toMatch(/\d/);
    expect(agencyStory(false)).not.toMatch(/\d/);
    expect(agencyScarcity(null)).not.toMatch(/\d/);
  });

  it("flipping the gates puts the figures back", () => {
    expect(agencyStory(true)).toMatch(/85/);
    expect(agencyStory(true)).toMatch(/12,000/);
    expect(agencyStory(true)).toMatch(/600/);
    expect(agencyScarcity(3)).toMatch(/3/);
  });
});

describe("offer routes and seo", () => {
  it("both offers are prerendered paths", () => {
    expect(ALL_PATHS).toContain("/agencies");
    expect(ALL_PATHS).toContain("/launch");
    expect(ALL_PATHS).toHaveLength(7);
  });

  it("route meta carries the offer's title and a per-page og image alt", () => {
    for (const o of OFFERS) {
      const meta = routeMeta(`/${o.slug}`);
      expect(meta.title).toBe(o.seo.title);
      expect(meta.description).toBe(o.seo.description);
      expect(meta.ogImage).toMatch(/^https:\/\/simonhost\.navonsimon\.com\/.+\.png$/);
      expect(meta.ogImageAlt).toBe(o.ogImageAlt);
    }
    // Every route has an image + alt, and alts are per page.
    const alts = ALL_PATHS.map((p) => routeMeta(p).ogImageAlt);
    expect(new Set(alts).size).toBe(ALL_PATHS.length);
  });

  it("structured data has a Service and a FAQPage per offer", () => {
    for (const o of OFFERS) {
      const graph = structuredData(`/${o.slug}`)["@graph"] as { "@type": string }[];
      const types = graph.map((n) => n["@type"]);
      expect(types).toContain("Service");
      expect(types).toContain("FAQPage");
      const faq = graph.find((n) => n["@type"] === "FAQPage") as { mainEntity: unknown[] };
      expect(faq.mainEntity).toHaveLength(o.faq.length);
    }
  });
});

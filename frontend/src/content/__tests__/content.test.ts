import { describe, it, expect } from "vitest";
import { SERVICES, whatsappUrl } from "../services";
import { COMMUNITY } from "../community";
import { PORTFOLIO } from "../portfolio";

describe("services content", () => {
  it("has exactly 4 services with unique slugs and ids", () => {
    expect(SERVICES).toHaveLength(4);
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(4);
    expect(new Set(SERVICES.map((s) => s.id)).size).toBe(4);
  });

  it("has the agreed prices", () => {
    const prices = Object.fromEntries(SERVICES.map((s) => [s.slug, s.price]));
    expect(prices).toEqual({ websites: 99, wordpress: 49, apps: 149, vps: 79 });
  });

  it("is ordered by descending involvement", () => {
    const mine = SERVICES.map((s) => s.mine);
    expect([...mine].sort((a, b) => b - a)).toEqual(mine);
  });

  it("every service is page-complete", () => {
    for (const s of SERVICES) {
      expect(s.whatsapp.length).toBeGreaterThan(10);
      expect(s.cardBullets.length).toBeGreaterThanOrEqual(3);
      expect(s.faq.length).toBeGreaterThanOrEqual(2);
      expect(s.seo.title).toContain("Simon Host");
      expect(s.heroLine.length).toBeGreaterThan(40);
    }
  });

  it("whatsapp messages are plan-distinct", () => {
    expect(new Set(SERVICES.map((s) => s.whatsapp)).size).toBe(4);
  });

  it("whatsappUrl encodes the message", () => {
    expect(whatsappUrl("שלום")).toContain("wa.me/972549877094");
  });
});

describe("launch gates", () => {
  it("community join CTA is gated on a real link", () => {
    if (COMMUNITY.groupLink) {
      expect(COMMUNITY.groupLink).toMatch(/^https:\/\/chat\.whatsapp\.com\//);
    }
  });

  it("no client portfolio entries ship without approval", () => {
    expect(PORTFOLIO.filter((p) => p.kind === "client")).toHaveLength(0);
  });
});

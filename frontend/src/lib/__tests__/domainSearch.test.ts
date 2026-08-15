import { describe, it, expect } from "vitest";
import {
  describeStatus,
  availableDomainMessage,
  errorMessage,
  isValidQuery,
} from "../domainSearch";

describe("domain search helpers", () => {
  it("maps API statuses to Hebrew", () => {
    expect(describeStatus("available").label).toBe("פנוי");
    expect(describeStatus("taken").label).toBe("תפוס");
    expect(describeStatus("unknown").label).toBe("לא הצלחתי לבדוק");
    expect(describeStatus("weird" as never).label).toBe("לא הצלחתי לבדוק");
  });

  it("only available results get a WhatsApp CTA", () => {
    expect(describeStatus("available").cta).toBe(true);
    expect(describeStatus("taken").cta).toBe(false);
    expect(describeStatus("unknown").cta).toBe(false);
  });

  it("prefills the WhatsApp message with the domain", () => {
    expect(availableDomainMessage("mybiz.co.il")).toBe(
      "היי סיימון, הדומיין mybiz.co.il פנוי ואשמח לפתוח איתו אתר."
    );
  });

  it("explains 400 and 429 in Hebrew, and everything else generically", () => {
    expect(errorMessage(400)).toContain("שם");
    expect(errorMessage(429)).toContain("רגע");
    expect(errorMessage(500)).toBeTruthy();
    expect(errorMessage(0)).toBeTruthy();
  });

  it("filters obviously invalid input before hitting the API", () => {
    expect(isValidQuery("mybiz")).toBe(true);
    expect(isValidQuery("שלום")).toBe(true);
    expect(isValidQuery("my biz")).toBe(false);
    expect(isValidQuery("")).toBe(false);
    expect(isValidQuery("x".repeat(101))).toBe(false);
  });
});

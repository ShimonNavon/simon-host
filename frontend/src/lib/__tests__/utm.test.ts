import { describe, it, expect } from "vitest";
import { captureUtm, readUtm, UTM_STORAGE_KEY } from "../utm";

function fakeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k) => map.get(k) ?? null,
    key: (i) => [...map.keys()][i] ?? null,
    removeItem: (k) => void map.delete(k),
    setItem: (k, v) => void map.set(k, String(v)),
  };
}

describe("utm capture", () => {
  it("stores utm params from the landing URL", () => {
    const storage = fakeStorage();
    captureUtm("?utm_source=facebook&utm_medium=cpc&utm_campaign=aug&x=1", storage);
    expect(readUtm(storage)).toEqual({
      utm_source: "facebook",
      utm_medium: "cpc",
      utm_campaign: "aug",
    });
  });

  it("keeps the first touch — a later plain visit does not wipe it", () => {
    const storage = fakeStorage();
    captureUtm("?utm_source=linkedin", storage);
    captureUtm("", storage);
    expect(readUtm(storage).utm_source).toBe("linkedin");
  });

  it("a new tagged visit overrides", () => {
    const storage = fakeStorage();
    captureUtm("?utm_source=a", storage);
    captureUtm("?utm_source=b", storage);
    expect(readUtm(storage).utm_source).toBe("b");
  });

  it("bounds each value to 80 chars and ignores unknown keys", () => {
    const storage = fakeStorage();
    captureUtm(`?utm_source=${"x".repeat(200)}&utm_term=ignored`, storage);
    const utm = readUtm(storage);
    expect(utm.utm_source).toHaveLength(80);
    expect(utm).not.toHaveProperty("utm_term");
  });

  it("returns an empty object with nothing stored or garbage stored", () => {
    const storage = fakeStorage();
    expect(readUtm(storage)).toEqual({});
    storage.setItem(UTM_STORAGE_KEY, "{not json");
    expect(readUtm(storage)).toEqual({});
  });

  it("survives a missing storage (SSR / private mode)", () => {
    expect(() => captureUtm("?utm_source=a", null)).not.toThrow();
    expect(readUtm(null)).toEqual({});
  });
});

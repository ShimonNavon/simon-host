/**
 * First-touch attribution, kept for the tab's lifetime.
 *
 * On first load, main.tsx calls captureUtm(location.search); when a
 * WhatsApp button is clicked the stored values ride along on the click
 * event so a lead can be tied back to the post or ad that brought it.
 * Only the three utm_* keys we report are kept, each capped at 80 chars
 * (the backend field size). Nothing here touches `window` at module
 * scope, so it is safe under prerender.
 */
export const UTM_STORAGE_KEY = "simonhost.utm";
export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const MAX_VALUE = 80;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtm(search: string, storage: Storage | null): void {
  if (!storage) return;
  const params = new URLSearchParams(search);
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim().slice(0, MAX_VALUE);
    if (value) utm[key] = value;
  }
  if (Object.keys(utm).length === 0) return; // keep the first touch
  try {
    storage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // quota / private mode — attribution is nice-to-have, never fatal
  }
}

export function readUtm(storage: Storage | null): Utm {
  if (!storage) return {};
  try {
    const raw = storage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const utm: Utm = {};
    for (const key of UTM_KEYS) {
      const value = parsed[key];
      if (typeof value === "string" && value) utm[key] = value.slice(0, MAX_VALUE);
    }
    return utm;
  } catch {
    return {};
  }
}

/** Browser-only convenience: sessionStorage if it exists, else null. */
export function sessionStore(): Storage | null {
  try {
    return typeof sessionStorage === "undefined" ? null : sessionStorage;
  } catch {
    return null;
  }
}

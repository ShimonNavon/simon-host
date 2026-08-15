/**
 * Pure helpers behind the homepage domain search — the query→UI mapping
 * lives here so it can be unit-tested without a DOM.
 */
export type DomainStatus = "available" | "taken" | "unknown";
export type DomainResult = { domain: string; status: DomainStatus };

export const MAX_QUERY_LENGTH = 100;

export function describeStatus(status: DomainStatus): {
  label: string;
  tone: "good" | "bad" | "muted";
  cta: boolean;
} {
  switch (status) {
    case "available":
      return { label: "פנוי", tone: "good", cta: true };
    case "taken":
      return { label: "תפוס", tone: "bad", cta: false };
    default:
      return { label: "לא הצלחתי לבדוק", tone: "muted", cta: false };
  }
}

export function availableDomainMessage(domain: string): string {
  return `היי סיימון, הדומיין ${domain} פנוי ואשמח לפתוח איתו אתר.`;
}

export function errorMessage(status: number): string {
  if (status === 400) return "זה לא נראה כמו שם דומיין תקין — נסו אותיות, מספרים ומקפים.";
  if (status === 429) return "יותר מדי בדיקות ברצף. חכו רגע ונסו שוב.";
  return "משהו השתבש בבדיקה. נסו שוב עוד רגע, או פשוט כתבו לי בוואטסאפ.";
}

/** Cheap client-side gate; the backend is the real validator. */
export function isValidQuery(query: string): boolean {
  const q = query.trim();
  return q.length > 0 && q.length <= MAX_QUERY_LENGTH && !/\s/.test(q);
}

import { readUtm, sessionStore } from "./utm";

/**
 * Fire-and-forget click event to the backend. Beacon first (survives the
 * tab navigating to WhatsApp), fetch keepalive as fallback. Never throws,
 * never blocks the click.
 */
export function trackWhatsAppClick(campaign: string): void {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      kind: "whatsapp",
      page: window.location.pathname.slice(0, 120),
      campaign: campaign.slice(0, 80),
      ...readUtm(sessionStore()),
      referrer: document.referrer.slice(0, 2048),
    });
    if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon("/api/events/", body)) {
      return;
    }
    void fetch("/api/events/", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  } catch {
    // analytics must never get in the way of the click
  }
}

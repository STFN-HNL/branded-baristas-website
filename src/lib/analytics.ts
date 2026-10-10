declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** localStorage key holding the visitor's cookie choice ("granted" | "denied"). */
export const CONSENT_STORAGE_KEY = "cookie_consent";

/**
 * Queue a gtag command. Pushing onto `dataLayer` (instead of calling
 * `window.gtag`) is safe before the GA script has loaded: gtag.js replays the
 * queue in order once it boots, so no command is lost to a load-order race.
 * No-op on the server.
 */
export function gtag(...args: unknown[]): void;
export function gtag(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes `arguments` objects, not plain arrays, so push the
  // real arguments object (the overload above supplies the parameter type).
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  gtag("event", name, params);
}

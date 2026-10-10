/**
 * Cheap, dependency-free spam screening for the public lead endpoint.
 *
 * The forms send two extra fields next to the lead itself:
 * - `HONEYPOT_FIELD`: an off-screen input humans never see; bots fill it.
 * - `ELAPSED_FIELD`: ms between the form mounting and submitting; scripted
 *   posts arrive faster than any human can fill a form.
 *
 * Both are optional so external callers of the `/api/quote` webhook contract
 * keep working without them. This module is imported by the client forms for
 * the field names, so keep it free of server-only imports.
 */

export const HONEYPOT_FIELD = "bb_hp";
export const ELAPSED_FIELD = "bb_elapsed";

/** Faster than this from mount to submit is not a human filling a form. */
export const MIN_FILL_MS = 1500;

export type ScreenResult = { spam: false; body: unknown } | { spam: true; reason: string };

/** Strip the guard fields from the payload and decide whether it is spam. */
export function screenLead(raw: unknown): ScreenResult {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { spam: false, body: raw };
  }
  const {
    [HONEYPOT_FIELD]: honeypot,
    [ELAPSED_FIELD]: elapsed,
    ...body
  } = raw as Record<string, unknown>;

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { spam: true, reason: "honeypot" };
  }
  if (typeof elapsed === "number" && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return { spam: true, reason: "too_fast" };
  }
  return { spam: false, body };
}

/**
 * Fixed-window, in-memory rate limiter. Per-instance only — good enough for a
 * single Railway container; swap for a shared store if we ever scale out.
 */
export class RateLimiter {
  private hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  allow(key: string): boolean {
    const t = this.now();
    if (this.hits.size > 1000) this.prune(t);
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= t) {
      this.hits.set(key, { count: 1, resetAt: t + this.windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= this.limit;
  }

  private prune(t: number) {
    for (const [key, entry] of this.hits) {
      if (entry.resetAt <= t) this.hits.delete(key);
    }
  }
}

/** Visitor IP behind Cloudflare → Railway; null when it can't be determined. */
export function clientIp(request: Request): string | null {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || null;
}

import { describe, it, expect } from "vitest";
import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  RateLimiter,
  clientIp,
  screenLead,
} from "@/lib/leadGuard";

describe("screenLead", () => {
  it("strips guard fields from a clean submission", () => {
    const result = screenLead({ name: "A", [HONEYPOT_FIELD]: "", [ELAPSED_FIELD]: 8000 });
    expect(result).toEqual({ spam: false, body: { name: "A" } });
  });

  it("flags a filled honeypot", () => {
    expect(screenLead({ name: "A", [HONEYPOT_FIELD]: "http://spam" })).toEqual({
      spam: true,
      reason: "honeypot",
    });
  });

  it("flags submissions faster than a human can fill the form", () => {
    expect(screenLead({ name: "A", [ELAPSED_FIELD]: MIN_FILL_MS - 1 })).toEqual({
      spam: true,
      reason: "too_fast",
    });
    expect(screenLead({ name: "A", [ELAPSED_FIELD]: MIN_FILL_MS }).spam).toBe(false);
  });

  it("accepts callers that send no guard fields (webhook contract)", () => {
    expect(screenLead({ name: "A" })).toEqual({ spam: false, body: { name: "A" } });
  });

  it("passes non-object bodies through for schema validation to reject", () => {
    expect(screenLead(null)).toEqual({ spam: false, body: null });
    expect(screenLead([1])).toEqual({ spam: false, body: [1] });
  });
});

describe("RateLimiter", () => {
  it("allows up to the limit per window, then blocks until the window resets", () => {
    let now = 0;
    const limiter = new RateLimiter(2, 1000, () => now);
    expect(limiter.allow("ip")).toBe(true);
    expect(limiter.allow("ip")).toBe(true);
    expect(limiter.allow("ip")).toBe(false);
    expect(limiter.allow("other")).toBe(true);
    now = 1000;
    expect(limiter.allow("ip")).toBe(true);
  });
});

describe("clientIp", () => {
  const req = (headers: Record<string, string>) =>
    new Request("http://localhost/api/quote", { headers });

  it("prefers Cloudflare's connecting IP", () => {
    expect(clientIp(req({ "cf-connecting-ip": "1.1.1.1", "x-forwarded-for": "2.2.2.2" }))).toBe(
      "1.1.1.1",
    );
  });

  it("falls back to the first x-forwarded-for hop", () => {
    expect(clientIp(req({ "x-forwarded-for": "3.3.3.3, 10.0.0.1" }))).toBe("3.3.3.3");
  });

  it("returns null when no IP header is present", () => {
    expect(clientIp(req({}))).toBeNull();
  });
});

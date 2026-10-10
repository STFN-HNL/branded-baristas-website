import { describe, it, expect, vi, afterEach } from "vitest";
import { gtag, trackEvent } from "@/lib/analytics";

describe("gtag", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("queues commands on dataLayer as arguments objects, which gtag.js requires", () => {
    const win: { dataLayer?: unknown[] } = {};
    vi.stubGlobal("window", win);

    gtag("consent", "update", { analytics_storage: "granted" });
    trackEvent("generate_lead", { lead_source: "quote" });

    expect(win.dataLayer).toHaveLength(2);
    const [first, second] = win.dataLayer as IArguments[];
    expect(Array.isArray(first)).toBe(false);
    expect(Object.prototype.toString.call(first)).toBe("[object Arguments]");
    expect(Array.from(first)).toEqual(["consent", "update", { analytics_storage: "granted" }]);
    expect(Array.from(second)).toEqual(["event", "generate_lead", { lead_source: "quote" }]);
  });

  it("is a no-op on the server", () => {
    expect(() => gtag("event", "x")).not.toThrow();
  });
});

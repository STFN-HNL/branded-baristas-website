import { describe, it, expect } from "vitest";
import { findRedirect, redirects } from "@/lib/redirects";

describe("redirects", () => {
  it("returns destination for a known WordPress path", () => {
    const r = findRedirect("/coffee-concepts/piaggio-tuk-tuk");
    expect(r?.destination).toBe("/nl/diensten/events/piaggio-tuk-tuk");
  });

  it("returns null for an unknown path", () => {
    const r = findRedirect("/nothing-here");
    expect(r).toBeNull();
  });

  it("marks redirects as permanent (301)", () => {
    expect(redirects.every((r) => r.permanent === true)).toBe(true);
  });

  it("has no duplicate source paths", () => {
    const sources = redirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("destinations start with /nl/ or /en/ (locale-prefixed)", () => {
    const bad = redirects.filter(
      (r) => !r.destination.startsWith("/nl/") && !r.destination.startsWith("/en/"),
    );
    expect(bad).toEqual([]);
  });
});

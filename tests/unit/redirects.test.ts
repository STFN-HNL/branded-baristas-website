import { describe, it, expect } from "vitest";
import { findRedirect, redirects } from "@/lib/redirects";

describe("redirects", () => {
  it("returns destination for a known WordPress path", () => {
    const r = findRedirect("/coffee-concepts/piaggio-tuk-tuk");
    expect(r?.destination).toBe("/nl/diensten/events/piaggio-tuk-tuk");
  });

  it("maps indexed legacy WordPress URLs to the closest new page", () => {
    expect(findRedirect("/mobiele-koffiebar-huren")?.destination).toBe(
      "/nl/diensten/events/mobile-coffee-bar",
    );
    expect(findRedirect("/piaggio-koffie-tuk-tuk-huren")?.destination).toBe(
      "/nl/diensten/events/piaggio-tuk-tuk",
    );
    expect(findRedirect("/barista-huren-eindhoven")?.destination).toBe(
      "/nl/diensten/events/barista-service",
    );
    expect(findRedirect("/koffie-concepten")?.destination).toBe("/nl/diensten");
    expect(findRedirect("/over-ons")?.destination).toBe("/nl/over-ons");
    expect(findRedirect("/nieuws")?.destination).toBe("/nl");
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

  it("destinations are locale-prefixed (/nl, /en or a path below them)", () => {
    const bad = redirects.filter(
      (r) => !/^\/(nl|en)(\/|$)/.test(r.destination),
    );
    expect(bad).toEqual([]);
  });
});

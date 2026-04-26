import { describe, it, expect, vi, beforeEach } from "vitest";
import { getFaqItems } from "@/lib/content/faqItems";
import { sanityClient } from "@/lib/sanity/client";

vi.mock("@/lib/sanity/client", () => ({ sanityClient: { fetch: vi.fn() } }));
vi.mock("@/lib/env", () => ({
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "test",
    NEXT_PUBLIC_SANITY_DATASET: "test",
    SANITY_API_READ_TOKEN: "test",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    SANITY_WEBHOOK_SECRET: "test",
  },
}));

describe("getFaqItems", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns hardcoded items when Sanity returns empty array", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce([] as any);
    const items = await getFaqItems("nl");
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveProperty("question");
    expect(items[0]).toHaveProperty("answer");
  });

  it("returns Sanity items when available", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce([
      { question: { nl: "Vraag?", en: "Question?" }, answer: { nl: "Antwoord", en: "Answer" } },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any);
    const items = await getFaqItems("nl");
    expect(items).toHaveLength(1);
    expect(items[0].question).toBe("Vraag?");
  });
});

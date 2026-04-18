import { describe, it, expect } from "vitest";
import { CONCEPTS_QUERY, CONCEPT_BY_SLUG_QUERY } from "@/lib/sanity/queries/concept";
import { CASES_QUERY, CASE_BY_SLUG_QUERY } from "@/lib/sanity/queries/case";
import { POSTS_QUERY, POST_BY_SLUG_QUERY } from "@/lib/sanity/queries/post";

describe("concept queries", () => {
  it("CONCEPTS_QUERY filters on _type and orders by title", () => {
    expect(CONCEPTS_QUERY).toContain('_type == "concept"');
    expect(CONCEPTS_QUERY).toMatch(/order\(/);
  });

  it("CONCEPTS_QUERY supports optional category filter parameter", () => {
    expect(CONCEPTS_QUERY).toContain("$category");
  });

  it("CONCEPT_BY_SLUG_QUERY looks up by locale-specific slug", () => {
    expect(CONCEPT_BY_SLUG_QUERY).toContain("$slug");
    expect(CONCEPT_BY_SLUG_QUERY).toContain("$locale");
  });
});

describe("case queries", () => {
  it("CASES_QUERY filters on _type and supports optional category filter", () => {
    expect(CASES_QUERY).toContain('_type == "case"');
    expect(CASES_QUERY).toContain("$category");
  });

  it("CASES_QUERY orders by eventDate desc", () => {
    expect(CASES_QUERY).toMatch(/order\(eventDate desc\)/);
  });

  it("CASE_BY_SLUG_QUERY looks up by locale-specific slug", () => {
    expect(CASE_BY_SLUG_QUERY).toContain("$slug");
    expect(CASE_BY_SLUG_QUERY).toContain("$locale");
  });
});

describe("post queries", () => {
  it("POSTS_QUERY filters on _type and publishedAt <= now()", () => {
    expect(POSTS_QUERY).toContain('_type == "post"');
    expect(POSTS_QUERY).toContain("publishedAt <= now()");
  });

  it("POSTS_QUERY orders by publishedAt desc", () => {
    expect(POSTS_QUERY).toMatch(/order\(publishedAt desc\)/);
  });

  it("POST_BY_SLUG_QUERY looks up by slug and locale", () => {
    expect(POST_BY_SLUG_QUERY).toContain("$slug");
    expect(POST_BY_SLUG_QUERY).toContain("$locale");
  });
});

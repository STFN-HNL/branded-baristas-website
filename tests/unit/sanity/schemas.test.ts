import { describe, it, expect } from "vitest";
import { schemaTypes } from "../../../sanity/schemas";

const names = schemaTypes.map((t) => t.name);

describe("sanity schema registry", () => {
  it.each([
    "bilingualSlug",
    "localeText",
    "localeBlocks",
    "imageWithAlt",
    "author",
    "category",
  ])("registers type %s", (name) => {
    expect(names).toContain(name);
  });
});

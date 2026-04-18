import { describe, it, expect } from "vitest";
import { schemaTypes } from "../../../sanity/schemas";

const names = schemaTypes.map((t) => t.name);

describe("sanity schema registry", () => {
  it.each([
    "bilingualSlug",
    "localeText",
    "localeBlocks",
    "imageWithAlt",
  ])("registers object %s", (name) => {
    expect(names).toContain(name);
  });
});

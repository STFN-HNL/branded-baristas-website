import { describe, it, expect } from "vitest";
import { checkMessagesHaveSameKeys } from "@/lib/i18n/check";
import nl from "../../messages/nl.json";
import en from "../../messages/en.json";

describe("messages parity", () => {
  it("nl and en have identical key trees", () => {
    const missing = checkMessagesHaveSameKeys(nl, en);
    expect(missing).toEqual([]);
  });
});

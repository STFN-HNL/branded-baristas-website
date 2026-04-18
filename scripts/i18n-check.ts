import { readFileSync } from "node:fs";
import { join } from "node:path";
import { checkMessagesHaveSameKeys } from "../src/lib/i18n/check";

const root = process.cwd();
const nl = JSON.parse(readFileSync(join(root, "messages/nl.json"), "utf8"));
const en = JSON.parse(readFileSync(join(root, "messages/en.json"), "utf8"));

const missing = checkMessagesHaveSameKeys(nl, en);
if (missing.length > 0) {
  console.error("i18n parity check failed:");
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}
console.log("i18n parity check: OK");

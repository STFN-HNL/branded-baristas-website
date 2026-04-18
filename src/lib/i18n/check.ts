type MsgTree = Record<string, unknown>;

function collectKeys(obj: MsgTree, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...collectKeys(v as MsgTree, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

export function checkMessagesHaveSameKeys(a: MsgTree, b: MsgTree): string[] {
  const aKeys = new Set(collectKeys(a));
  const bKeys = new Set(collectKeys(b));
  const missing: string[] = [];
  for (const k of aKeys) if (!bKeys.has(k)) missing.push(`missing in b: ${k}`);
  for (const k of bKeys) if (!aKeys.has(k)) missing.push(`missing in a: ${k}`);
  return missing;
}

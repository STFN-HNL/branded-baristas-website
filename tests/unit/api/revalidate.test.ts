import { describe, it, expect, vi, beforeEach } from "vitest";
import { createHmac } from "node:crypto";

const SECRET = "test-secret";

vi.mock("@/lib/env", () => ({
  env: { SANITY_WEBHOOK_SECRET: SECRET },
}));

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

function sign(raw: string, timestamp: number, secret: string) {
  return createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("base64url");
}

function makeRequest(body: unknown, opts: { signature?: string; timestamp?: number } = {}): Request {
  const raw = JSON.stringify(body);
  const ts = opts.timestamp ?? Date.now();
  const signature = opts.signature ?? sign(raw, ts, SECRET);
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "sanity-webhook-signature": `t=${ts},v1=${signature}`,
    },
    body: raw,
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects request with invalid signature", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const req = makeRequest({ _type: "post" }, { signature: "deadbeef", timestamp: 1 });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("revalidates tag for the document type when signature is valid", async () => {
    const { revalidateTag } = await import("next/cache");
    const { POST } = await import("@/app/api/revalidate/route");
    const req = makeRequest({ _type: "post", slug: { nl: { current: "hello" } } });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("post");
  });

  it("also revalidates per-slug tag when slug is present", async () => {
    const { revalidateTag } = await import("next/cache");
    const { POST } = await import("@/app/api/revalidate/route");
    const req = makeRequest({ _type: "case", slug: { nl: { current: "akzonobel-event" } } });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("case");
    expect(revalidateTag).toHaveBeenCalledWith("case:akzonobel-event");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { HONEYPOT_FIELD } from "@/lib/leadGuard";

const submitLead = vi.fn();

vi.mock("@/lib/leads", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/leads")>();
  return { ...actual, submitLead: (...args: unknown[]) => submitLead(...args) };
});

const lead = { source: "contact", name: "Test", email: "test@example.com" };

let ipCounter = 0;
function makeRequest(body: unknown, ip = `10.0.0.${++ipCounter}`): Request {
  return new Request("http://localhost/api/quote", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/quote", () => {
  beforeEach(() => {
    submitLead.mockReset();
  });

  it("returns ok when the lead reached a backend", async () => {
    submitLead.mockResolvedValue({ id: "1", stored: true, emailed: false, configured: true });
    const { POST } = await import("@/app/api/quote/route");
    const res = await POST(makeRequest(lead));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, id: "1", stored: true, emailed: false });
  });

  it("returns 502 when every configured backend failed", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    submitLead.mockResolvedValue({ id: null, stored: false, emailed: false, configured: true });
    const { POST } = await import("@/app/api/quote/route");
    const res = await POST(makeRequest(lead));
    expect(res.status).toBe(502);
    expect(await res.json()).toMatchObject({ ok: false, error: "delivery_failed" });
  });

  it("still returns ok when no backend is configured (local dev)", async () => {
    submitLead.mockResolvedValue({ id: null, stored: false, emailed: false, configured: false });
    const { POST } = await import("@/app/api/quote/route");
    const res = await POST(makeRequest(lead));
    expect(res.status).toBe(200);
  });

  it("silently drops honeypot submissions without submitting the lead", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { POST } = await import("@/app/api/quote/route");
    const res = await POST(makeRequest({ ...lead, [HONEYPOT_FIELD]: "gotcha" }));
    expect(res.status).toBe(200);
    expect(submitLead).not.toHaveBeenCalled();
  });

  it("rate-limits repeated submissions from one IP", async () => {
    submitLead.mockResolvedValue({ id: "1", stored: true, emailed: true, configured: true });
    const { POST } = await import("@/app/api/quote/route");
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await POST(makeRequest(lead, "192.0.2.1"))).status);
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  });

  it("rejects payloads that fail validation", async () => {
    const { POST } = await import("@/app/api/quote/route");
    const res = await POST(makeRequest({ source: "contact", name: "x", email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(submitLead).not.toHaveBeenCalled();
  });
});

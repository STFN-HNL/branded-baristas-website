import { describe, it, expect, vi, afterEach } from "vitest";

const mockEnv: Record<string, string | undefined> = {};

vi.mock("@/lib/env", () => ({ env: mockEnv }));

const lead = { source: "contact" as const, name: "Test", email: "test@example.com" };

describe("submitLead", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    for (const key of Object.keys(mockEnv)) delete mockEnv[key];
  });

  it("reports configured-but-undelivered when every backend fails", async () => {
    Object.assign(mockEnv, {
      NEXT_PUBLIC_SUPABASE_URL: "https://x.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "key",
      RESEND_API_KEY: "key",
      RESEND_FROM_EMAIL: "hello@branded-baristas.com",
    });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { submitLead } = await import("@/lib/leads");

    expect(await submitLead(lead)).toEqual({
      id: null,
      stored: false,
      emailed: false,
      configured: true,
    });
  });

  it("reports not configured when no backend env vars are set", async () => {
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { submitLead } = await import("@/lib/leads");

    expect(await submitLead(lead)).toMatchObject({ configured: false, stored: false });
    expect(fetch).not.toHaveBeenCalled();
  });
});

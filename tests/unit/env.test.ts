import { describe, it, expect } from "vitest";
import { envSchema } from "@/lib/env";

const validEnv = {
  NEXT_PUBLIC_SITE_URL: "https://branded-baristas.com",
  NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
  NEXT_PUBLIC_SANITY_DATASET: "production",
  SANITY_API_READ_TOKEN: "sk-sanity",
  SANITY_WEBHOOK_SECRET: "webhook-secret",
  NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
  RESEND_API_KEY: "re_123",
  RESEND_FROM_EMAIL: "hello@branded-baristas.com",
};

describe("envSchema", () => {
  it("accepts a fully valid environment", () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
  });

  it("rejects when NEXT_PUBLIC_SITE_URL is not a URL", () => {
    const result = envSchema.safeParse({ ...validEnv, NEXT_PUBLIC_SITE_URL: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("rejects when RESEND_FROM_EMAIL is not an email", () => {
    const result = envSchema.safeParse({ ...validEnv, RESEND_FROM_EMAIL: "not-email" });
    expect(result.success).toBe(false);
  });

  it("rejects when SUPABASE_SERVICE_ROLE_KEY is empty", () => {
    const result = envSchema.safeParse({ ...validEnv, SUPABASE_SERVICE_ROLE_KEY: "" });
    expect(result.success).toBe(false);
  });

  it("allows optional NEXT_PUBLIC_GTM_ID to be absent", () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true);
  });
});

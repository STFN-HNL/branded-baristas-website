"use client";

import { useEffect, useRef, useState } from "react";
import { readUtm } from "@/components/UtmCapture";
import { trackEvent } from "@/lib/analytics";
import { ELAPSED_FIELD } from "@/lib/leadGuard";

export type LeadStatus = "idle" | "submitting" | "success" | "error";

/**
 * Shared submit flow for every lead form: merges the form fields with the
 * caller's base payload and first-touch UTM params, adds the fill-time spam
 * signal, posts to `/api/quote` and reports a GA4 `generate_lead` on success.
 */
export function useLeadSubmit() {
  const [status, setStatus] = useState<LeadStatus>("idle");
  const mountedAt = useRef<number | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function submit(form: HTMLFormElement, base: { source: string } & Record<string, unknown>) {
    setStatus("submitting");
    const payload: Record<string, unknown> = { ...base, ...readUtm() };
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string" && !(key in payload)) payload[key] = value;
    });
    if (mountedAt.current !== null) payload[ELAPSED_FIELD] = Date.now() - mountedAt.current;

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("generate_lead", {
        lead_source: base.source,
        ...(typeof base.service === "string" ? { service: base.service } : {}),
      });
      setStatus("success");
    } catch (error) {
      console.error(`[lead:${base.source}]`, error);
      setStatus("error");
    }
  }

  return { status, submit };
}

"use client";

import { useEffect } from "react";

export const UTM_STORAGE_KEY = "bb-utm";
export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/**
 * Persists UTM parameters from the landing URL in sessionStorage so the lead
 * forms can attribute a submission even when the visitor navigates from the
 * campaign landing page to /offerte first. First touch wins for the session.
 */
export function UtmCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(UTM_STORAGE_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) utm[key] = value.slice(0, 200);
      }
      if (Object.keys(utm).length > 0) {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
      }
    } catch {
      // Storage unavailable (private mode etc.) — attribution is best-effort.
    }
  }, []);

  return null;
}

/** Read the captured UTM parameters, preferring the current URL. */
export function readUtm(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) Object.assign(utm, JSON.parse(stored) as Record<string, string>);
  } catch {
    // ignore
  }
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  return utm;
}

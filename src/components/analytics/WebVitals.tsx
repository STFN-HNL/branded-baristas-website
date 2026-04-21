"use client";

import { useReportWebVitals } from "next/web-vitals";

type GtagFn = (command: "event", eventName: string, params: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/**
 * Core Web Vitals reporter. Forwards LCP/CLS/INP/FCP/TTFB/FID to GA4 as custom
 * events when a tracker is configured, and logs to console in development so
 * engineers see the numbers without leaving localhost.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[web-vital]", metric.name, Math.round(metric.value), metric);
      return;
    }

    if (typeof window === "undefined" || !window.gtag) return;

    const value =
      metric.name === "CLS" ? Math.round(metric.value * 1000) : Math.round(metric.value);

    window.gtag("event", metric.name, {
      value,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  return null;
}

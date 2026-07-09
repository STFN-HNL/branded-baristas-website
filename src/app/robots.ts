import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

// Evaluate at request time — the Docker build runs with a placeholder
// NEXT_PUBLIC_SITE_URL (see Dockerfile), which would otherwise be baked in.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/_next/"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}

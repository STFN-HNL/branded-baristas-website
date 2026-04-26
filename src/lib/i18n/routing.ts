import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Localised URL segments (ADR 0003).
 *
 * Keys are the INTERNAL pathnames that match the file-system routes inside
 * `src/app/(site)/[locale]/...`. Values either share a single pathname across
 * locales (for loan words like `blog` / `cases`) or map each locale to its
 * own user-facing segment. next-intl rewrites incoming requests on the EN
 * side (e.g. `/en/quote` → the `/offerte/page.tsx` handler) and the typed
 * navigation helpers emit the correct public URL per locale.
 *
 * When adding a new route folder, add it here in both locales — otherwise
 * `Link` calls will throw at build time.
 */
export const pathnames = {
  "/": "/",
  "/over-ons": {
    nl: "/over-ons",
    en: "/about",
  },
  "/diensten": {
    nl: "/diensten",
    en: "/services",
  },
  "/diensten/events/[slug]": {
    nl: "/diensten/events/[slug]",
    en: "/services/events/[slug]",
  },
  "/diensten/in-company/[slug]": {
    nl: "/diensten/in-company/[slug]",
    en: "/services/in-company/[slug]",
  },
  "/cases": "/cases",
  "/cases/[slug]": "/cases/[slug]",
  "/blog": "/blog",
  "/blog/[slug]": "/blog/[slug]",
  "/contact": "/contact",
  "/offerte": {
    nl: "/offerte",
    en: "/quote",
  },
  "/branding": "/branding",
  "/privacy": "/privacy",
  "/cookies": "/cookies",
  "/gids": {
    nl: "/gids",
    en: "/guide",
  },
  "/gids/koffiecatering": {
    nl: "/gids/koffiecatering",
    en: "/guide/coffee-catering",
  },
  "/gids/barista-bar-specs": {
    nl: "/gids/barista-bar-specs",
    en: "/guide/barista-bar-specs",
  },
} as const;

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
  pathnames,
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

/**
 * Cast a string coming from user content (CMS, content/*.ts) to the typed
 * href that the i18n `Link` expects. Only use for values that you know match
 * a configured internal pathname — the helper deliberately bypasses the
 * exhaustive pathname union. Prefer the object form
 * `{ pathname: "/foo/[slug]", params: { slug } }` for dynamic routes.
 */
export function asHref(
  href: string,
): Parameters<typeof Link>[0]["href"] {
  return href as unknown as Parameters<typeof Link>[0]["href"];
}

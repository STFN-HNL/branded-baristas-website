import type { Metadata } from "next";
import { env } from "@/lib/env";
import { routing, type Locale, type AppPathname, pathnames } from "@/lib/i18n/routing";

export const SITE_NAME = "Branded Baristas";

/**
 * Canonical site origin (no trailing slash). Falls back to localhost for dev
 * so metadata helpers don't throw when env vars are not yet configured.
 */
export function siteOrigin(): string {
  const fromEnv = env.NEXT_PUBLIC_SITE_URL;
  const url = fromEnv && fromEnv.length > 0 ? fromEnv : "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export type SeoParams = {
  locale: Locale;
  /** Logical path starting with a slash, without locale prefix. E.g. "/over-ons". */
  path?: string;
  title: string;
  description: string;
  image?: string;
  /**
   * Skip the static generic OG fallback so a colocated file-based
   * `opengraph-image.tsx` (a generated per-route card) can take over when no
   * explicit `image` is set. Only useful for segments that ship such a file,
   * e.g. blog/[slug].
   */
  fileOgImage?: boolean;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Resolve an INTERNAL pathname (matches the folder route, e.g. `/offerte`)
 * plus dynamic slug into the public, locale-specific URL.
 * Falls back to the raw path for routes that are not declared in `pathnames`.
 */
export function localeUrl(
  locale: Locale,
  path: string = "/",
  params?: Record<string, string | number>,
): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const template = resolveTemplate(normalized);
  let publicPath: string;
  if (template) {
    const mapped = pathnames[template];
    publicPath = typeof mapped === "string" ? mapped : mapped[locale];
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        publicPath = publicPath.replace(`[${key}]`, String(value));
      }
    }
    // Inherit the dynamic tail when the caller already resolved the slug in `path`.
    publicPath = replaceParamsFromPath(publicPath, template, normalized);
  } else {
    publicPath = normalized;
  }
  const suffix = publicPath === "/" ? "" : publicPath;
  return `${siteOrigin()}/${locale}${suffix}`;
}

export function languageAlternates(path: string = "/"): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of routing.locales) {
    entries[locale] = localeUrl(locale, path);
  }
  entries["x-default"] = localeUrl(routing.defaultLocale, path);
  return entries;
}

function resolveTemplate(pathname: string): AppPathname | null {
  const keys = Object.keys(pathnames) as AppPathname[];
  if ((keys as string[]).includes(pathname)) {
    return pathname as AppPathname;
  }
  const segments = pathname.split("/");
  for (const key of keys) {
    const tpl = key.split("/");
    if (tpl.length !== segments.length) continue;
    const matches = tpl.every((seg, i) => seg.startsWith("[") || seg === segments[i]);
    if (matches) return key;
  }
  return null;
}

function replaceParamsFromPath(publicPath: string, template: AppPathname, actual: string): string {
  const tpl = template.split("/");
  const parts = actual.split("/");
  if (tpl.length !== parts.length) return publicPath;
  let out = publicPath;
  for (let i = 0; i < tpl.length; i++) {
    const seg = tpl[i];
    if (seg.startsWith("[") && seg.endsWith("]")) {
      out = out.replace(seg, parts[i]);
    }
  }
  return out;
}

/**
 * Build Next.js Metadata with consistent OG, Twitter, canonical and hreflang.
 */
export function buildMetadata(params: SeoParams): Metadata {
  const { locale, path = "/", title, description, image, noIndex, type = "website" } = params;
  const canonical = localeUrl(locale, path);
  // Without an explicit image, fall back to the static generic card. The
  // generated `[locale]/opengraph-image.tsx` route only covers its own segment
  // (child pages that define `openGraph` lose it), and its URL is hashed, so it
  // can't be referenced here. Segments with their own file-based card opt out
  // via `fileOgImage` to let that route fill the gap.
  const ogImage = image ?? (params.fileOgImage ? undefined : `/images/og/default-${locale}.png`);
  const images = ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined;

  return {
    metadataBase: new URL(siteOrigin()),
    title,
    description,
    applicationName: SITE_NAME,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === "en" ? "en_GB" : "nl_NL",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === "en" ? "en_GB" : "nl_NL")),
      ...(images ? { images } : {}),
      ...(type === "article" && params.publishedTime
        ? { publishedTime: params.publishedTime, modifiedTime: params.modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

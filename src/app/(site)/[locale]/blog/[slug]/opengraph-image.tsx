import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/sanity/queries/post";
import { getBlogContent } from "@/content/blog";
import type { Locale } from "@/lib/i18n/routing";

export const runtime = "edge";
export const alt = "Branded Baristas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

type PostOg = {
  title?: Record<string, string>;
  excerpt?: Record<string, string>;
};

/** Resolve the post title + excerpt, falling back to hardcoded content, then to defaults. */
async function loadOg(slug: string, locale: Locale): Promise<{ title: string; excerpt: string }> {
  try {
    const doc = (await getPostBySlug(slug, locale)) as unknown as PostOg | null;
    if (doc?.title?.[locale]) {
      return {
        title: doc.title[locale],
        excerpt: doc.excerpt?.[locale] ?? "",
      };
    }
  } catch {
    // fall through to hardcoded
  }
  const post = getBlogContent(locale).posts.find((p) => p.slug === slug);
  return {
    title: post?.title ?? (locale === "en" ? "Coffee catering" : "Koffiecatering"),
    excerpt: post?.excerpt ?? "",
  };
}

export default async function BlogOpengraphImage({ params }: Props) {
  const { locale, slug } = await params;
  const { title, excerpt } = await loadOg(slug, locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #1F2B25 0%, #2F4036 55%, #A85D3C 100%)",
        color: "#F5EFE3",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 30 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            background: "#E8B86E",
            color: "#1F2B25",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 26,
          }}
        >
          BB
        </div>
        <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>Branded Baristas</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, maxWidth: 1000 }}>
          {title}
        </div>
        {excerpt ? (
          <div style={{ fontSize: 28, color: "#F5EFE3CC", maxWidth: 900, lineHeight: 1.3 }}>
            {excerpt.length > 140 ? `${excerpt.slice(0, 140)}…` : excerpt}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#F5EFE3AA",
        }}
      >
        <span>branded-baristas.com</span>
        <span style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {locale === "en" ? "Blog" : "Blog"}
        </span>
      </div>
    </div>,
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteOrigin } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/routing";

export const runtime = "edge";
export const alt = "Branded Baristas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home" });
  // Real hero photo as backdrop (TODO §3.1) — darkened for text legibility.
  const heroUrl = `${siteOrigin()}/images/hero/hero-main.jpeg`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#1F2B25",
        color: "#F5EFE3",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <img
        src={heroUrl}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1F2B25F5 0%, #1F2B25CC 55%, #A85D3C99 100%)",
        }}
      />
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
        <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, maxWidth: 960 }}>
          {t("metaTitle")}
        </div>
        <div style={{ fontSize: 28, color: "#F5EFE3CC", maxWidth: 900, lineHeight: 1.3 }}>
          {t("metaDescription")}
        </div>
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
          {locale === "en" ? "Coffee catering" : "Koffiecatering"}
        </span>
      </div>
    </div>,
    { ...size },
  );
}

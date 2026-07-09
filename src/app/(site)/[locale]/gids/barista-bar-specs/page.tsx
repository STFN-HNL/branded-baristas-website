import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { Guide } from "@/components/blocks/Guide";
import { JsonLd } from "@/components/JsonLd";
import { getBaristaBarSpecsGuide } from "@/content/guides/barista-bar-specs";
import { getGuide } from "@/lib/content/guide";
import type { Locale } from "@/lib/i18n/routing";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/gids/barista-bar-specs";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.guideBaristaBarSpecs" });
  const content = (await getGuide(locale, "barista-bar-specs")) ?? getBaristaBarSpecsGuide(locale);
  return buildMetadata({
    locale,
    path: PATH,
    title: t("metaTitle"),
    description: t("metaDescription"),
    type: "article",
    publishedTime: content.updated,
  });
}

export default async function BaristaBarSpecsGuidePage({ params }: Props) {
  const { locale } = await params;
  const content = (await getGuide(locale, "barista-bar-specs")) ?? getBaristaBarSpecsGuide(locale);
  const tGuide = await getTranslations({ locale, namespace: "guide" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const trail = [
    { name: tCommon("siteName"), path: "/" },
    { name: content.title, path: PATH },
  ];

  return (
    <>
      <JsonLd
        id="ld-guide-barista-bar-specs"
        data={[
          articleSchema({
            locale,
            path: PATH,
            title: content.title,
            description: content.lead,
            datePublished: content.updated,
          }),
          breadcrumbSchema(locale, trail),
        ]}
      />
      <Guide
        content={content}
        quoteHref="/offerte"
        tocLabel={tGuide("toc")}
        updatedLabel={tGuide("updated")}
        readingTimeLabel={tGuide("readingTime")}
      />
      <Footer locale={locale} />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Footer } from "@/components/blocks/Footer";
import { CasesGrid } from "@/components/blocks/CasesGrid";
import { Link, asHref } from "@/lib/i18n/routing";
import { getCasesContent } from "@/content/cases";
import { getCasesList } from "@/lib/content/cases";
import { hasPublishedCases } from "@/lib/content/publishedContent";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [t, hasCases] = await Promise.all([
    getTranslations({ locale, namespace: "pages.cases" }),
    hasPublishedCases(),
  ]);
  return buildMetadata({
    locale,
    path: "/cases",
    title: t("metaTitle"),
    description: t("metaDescription"),
    // Stay out of the index until there is real work to show.
    noIndex: !hasCases,
  });
}

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  const hardcoded = getCasesContent(locale);
  const [items, tCommon, tCases] = await Promise.all([
    getCasesList(locale),
    getTranslations("common"),
    getTranslations({ locale, namespace: "pages.cases" }),
  ]);
  const readMoreLabel = tCommon("readMore");

  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden">
        <Image
          src={hardcoded.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-20 pb-[80px]">
          <span className="text-cream text-[12px] leading-[27px]">{hardcoded.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {hardcoded.hero.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {hardcoded.hero.lead}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1360px]">
          {items.length > 0 ? (
            <CasesGrid items={items} filters={hardcoded.filters} readMoreLabel={readMoreLabel} />
          ) : (
            <p className="text-forest mx-auto max-w-[660px] text-center text-[18px] leading-[27px]">
              {tCases("emptyState")}
            </p>
          )}
        </div>
      </section>

      <section className="bg-cream px-10 pb-24 lg:pb-32">
        <div className="bg-pine mx-auto flex max-w-[1360px] flex-col items-start gap-6 rounded-[20px] px-12 py-16 lg:px-20">
          <h2 className="font-display text-cream max-w-[800px] text-[40px] leading-[44px]">
            {hardcoded.cta.title}
          </h2>
          <p className="text-cream/80 max-w-[700px] text-[18px] leading-[27px]">
            {hardcoded.cta.description}
          </p>
          <Link
            href={asHref(hardcoded.cta.primaryHref)}
            className="rounded-pill bg-copper text-cream hover:bg-copper/90 mt-2 inline-flex items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
          >
            {hardcoded.cta.primaryLabel}
          </Link>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Footer } from "@/components/blocks/Footer";
import { CasesGrid } from "@/components/blocks/CasesGrid";
import { Link } from "@/lib/i18n/routing";
import { getCasesContent } from "@/content/cases";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  const content = getCasesContent(locale);
  const tCommon = await getTranslations("common");
  const readMoreLabel = tCommon("readMore");

  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden">
        <Image
          src={content.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-20 pb-[80px]">
          <span className="text-cream text-[12px] leading-[27px]">{content.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1360px]">
          <CasesGrid
            items={content.items}
            filters={content.filters}
            readMoreLabel={readMoreLabel}
          />
        </div>
      </section>

      <section className="bg-cream px-10 pb-24 lg:pb-32">
        <div className="bg-pine mx-auto flex max-w-[1360px] flex-col items-start gap-6 rounded-[20px] px-12 py-16 lg:px-20">
          <h2 className="font-display text-cream max-w-[800px] text-[40px] leading-[44px]">
            {content.cta.title}
          </h2>
          <p className="text-cream/80 max-w-[700px] text-[18px] leading-[27px]">
            {content.cta.description}
          </p>
          <Link
            href={content.cta.primaryHref}
            className="rounded-pill bg-copper text-cream hover:bg-copper/90 mt-2 inline-flex items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
          >
            {content.cta.primaryLabel}
          </Link>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}

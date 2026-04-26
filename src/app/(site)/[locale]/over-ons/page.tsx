import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link, asHref } from "@/lib/i18n/routing";
import { Footer } from "@/components/blocks/Footer";
import { getAboutContent } from "@/content/about";
import { getAboutPageContent } from "@/lib/content/aboutPage";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return buildMetadata({
    locale,
    path: "/over-ons",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const content = (await getAboutPageContent(locale)) ?? getAboutContent(locale);

  return (
    <>
      <section className="relative h-[702px] w-full overflow-hidden">
        <Image
          src={content.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-20 pb-[99px]">
          <span className="text-cream text-[12px] leading-[27px]">{content.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[58px] leading-[65px]">
            {content.hero.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-square w-full overflow-hidden rounded-[20px] lg:h-[600px]">
            <Image
              src={content.story.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <h2 className="font-display text-pine text-[50px] leading-[55px]">
              {content.story.title}
            </h2>
            {content.story.paragraphs.map((p, i) => (
              <p key={i} className="text-forest text-[20px] leading-[27px]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-10 py-[10px]">
        <div className="bg-pine mx-auto max-w-[1360px] rounded-[20px] px-[40px] pt-[44px] pb-[75px]">
          <div className="flex flex-col gap-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-5">
                <span className="text-cream text-[12px] leading-[27px]">
                  {content.values.eyebrow}
                </span>
                <h2 className="font-display text-cream text-[50px] leading-[55px]">
                  {content.values.title}
                </h2>
              </div>
              <p className="text-cream/90 text-[20px] leading-[27px] lg:pt-10">
                {content.values.description}
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {content.values.items.map((item) => (
                <li key={item.title} className="bg-cream rounded-[20px] px-8 py-6">
                  <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-forest mt-3 text-[16px] leading-[21.5px]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="bg-mocha mx-auto flex max-w-[1360px] flex-col items-start gap-8 rounded-[20px] px-[40px] py-[58px]">
          <h2 className="font-display text-cream max-w-[900px] text-[50px] leading-[55px]">
            {content.cta.title}
          </h2>
          <p className="text-cream/90 max-w-[700px] text-[20px] leading-[27px]">
            {content.cta.description}
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Link
              href={asHref(content.cta.primaryHref)}
              className="rounded-pill bg-cream text-ink hover:bg-cream/90 inline-flex items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
            >
              {content.cta.primaryLabel}
            </Link>
            <Link
              href={asHref(content.cta.secondaryHref)}
              className="rounded-pill border-cream/40 text-cream hover:bg-cream/10 inline-flex items-center border px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
            >
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}

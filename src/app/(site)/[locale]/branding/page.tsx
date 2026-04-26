import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { Link, asHref } from "@/lib/i18n/routing";
import { getBrandingContent } from "@/content/branding";
import { getBrandingPageContent } from "@/lib/content/brandingPage";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.branding" });
  return buildMetadata({
    locale,
    path: "/branding",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BrandingPage({ params }: Props) {
  const { locale } = await params;
  const content = (await getBrandingPageContent(locale)) ?? getBrandingContent(locale);

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
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[76px] leading-[70px]">
            {content.hero.title}
          </h1>
          <p className="text-cream mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <span className="text-copper text-[12px] leading-[27px]">{content.intro.eyebrow}</span>
          <div />
          <h2 className="font-display text-pine text-[50px] leading-[55px]">
            {content.intro.title}
          </h2>
          <p className="text-forest text-[20px] leading-[27px]">{content.intro.description}</p>
        </div>
      </section>

      <section className="bg-cream px-10 py-[10px]">
        <div className="bg-sand mx-auto max-w-[1360px] rounded-[20px] px-10 py-20 lg:px-20">
          <div className="mb-12 flex flex-col gap-4">
            <h2 className="font-display text-pine text-[40px] leading-[44px]">
              {content.options.title}
            </h2>
            <p className="text-forest max-w-[700px] text-[18px] leading-[27px]">
              {content.options.description}
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {content.options.items.map((item) => (
              <li key={item.title} className="flex flex-col">
                <div className="relative aspect-[420/280] w-full overflow-hidden rounded-t-[20px]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-cream flex flex-1 flex-col gap-3 rounded-b-[20px] px-8 py-6">
                  <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-forest text-[16px] leading-[21.5px]">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="bg-pine mx-auto max-w-[1360px] rounded-[20px] px-10 py-20 lg:px-20">
          <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <span className="text-cream text-[12px] leading-[27px]">
                {content.process.eyebrow}
              </span>
              <h2 className="font-display text-cream text-[50px] leading-[55px]">
                {content.process.title}
              </h2>
            </div>
            <p className="text-cream/80 text-[20px] leading-[27px] lg:pt-10">
              {content.process.description}
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.process.steps.map((step) => (
              <li
                key={step.number}
                className="bg-cream flex flex-col gap-3 rounded-[20px] px-8 py-6"
              >
                <span className="font-display text-copper text-[28px] leading-[33px]">
                  {step.number}
                </span>
                <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-forest text-[16px] leading-[21.5px]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="bg-mocha mx-auto flex max-w-[1360px] flex-col items-start gap-8 rounded-[20px] px-12 py-20 lg:px-20">
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

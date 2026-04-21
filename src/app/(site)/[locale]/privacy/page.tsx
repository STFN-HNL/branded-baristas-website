import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { getPrivacyContent } from "@/content/privacy";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  return buildMetadata({
    locale,
    path: "/privacy",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const content = getPrivacyContent(locale);

  return (
    <>
      <section className="bg-pine px-10 pt-[180px] pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1360px]">
          <span className="text-cream text-[12px] leading-[27px]">{content.hero.eyebrow}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-cream/80 mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {content.hero.lead}
          </p>
          <p className="text-cream/60 mt-8 text-[14px] leading-[20px]">
            {content.lastUpdatedLabel}: {content.lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label={content.hero.title}>
              <ol className="flex flex-col gap-2">
                {content.sections.map((section, i) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${i + 1}`}
                      className="text-forest hover:text-copper text-[16px] leading-[21.5px] transition-colors"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="flex flex-col gap-12">
            {content.sections.map((section, i) => (
              <article key={section.title} id={`section-${i + 1}`} className="flex flex-col gap-4">
                <h2 className="font-display text-pine text-[28px] leading-[33px] tracking-[-0.01em]">
                  {section.title}
                </h2>
                {section.paragraphs.map((p, pi) => (
                  <p key={pi} className="text-forest text-[18px] leading-[27px]">
                    {p}
                  </p>
                ))}
              </article>
            ))}

            <div className="bg-pine mt-8 rounded-[20px] px-10 py-12">
              <h2 className="font-display text-cream text-[28px] leading-[33px] tracking-[-0.01em]">
                {content.contact.title}
              </h2>
              <p className="text-cream/80 mt-3 text-[18px] leading-[27px]">
                {content.contact.description}
              </p>
              <a
                href={`mailto:${content.contact.email}`}
                className="text-copper mt-4 inline-block text-[18px] leading-[27px] underline-offset-4 hover:underline"
              >
                {content.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}

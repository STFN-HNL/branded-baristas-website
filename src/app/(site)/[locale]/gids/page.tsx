import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/blocks/Footer";
import { Link, asHref } from "@/lib/i18n/routing";
import { getGuideList } from "@/lib/content/guide";
import type { Locale } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

const PATH = "/gids";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.guides" });
  return buildMetadata({
    locale,
    path: PATH,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function GidsIndexPage({ params }: Props) {
  const { locale } = await params;
  const [t, guides] = await Promise.all([
    getTranslations({ locale, namespace: "pages.guides" }),
    getGuideList(locale),
  ]);

  return (
    <>
      <section className="bg-pine px-10 pt-[180px] pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1360px]">
          <span className="text-cream text-[12px] leading-[27px]">{t("title")}</span>
          <h1 className="font-display text-cream mt-4 max-w-[900px] text-[64px] leading-[1.05]">
            {t("title")}
          </h1>
          <p className="text-cream/80 mt-6 max-w-[660px] text-[20px] leading-[27px]">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="bg-cream px-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1360px]">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={asHref(`/gids/${guide.slug}`)}
                  className="bg-mocha/30 hover:bg-mocha/50 flex h-full flex-col gap-4 rounded-[20px] p-10 transition-colors"
                >
                  <h2 className="font-display text-pine text-[28px] leading-[33px] tracking-[-0.01em]">
                    {guide.title}
                  </h2>
                  <p className="text-forest flex-1 text-[18px] leading-[27px]">{guide.lead}</p>
                  <span className="text-forest/50 text-[13px]">
                    {guide.readingTimeMinutes} {t("readingMinutes")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}

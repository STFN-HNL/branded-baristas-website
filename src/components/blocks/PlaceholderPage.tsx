import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { Footer } from "./Footer";
import type { Locale } from "@/lib/i18n/routing";

type PlaceholderPageProps = {
  namespace:
    | "pages.about"
    | "pages.services"
    | "pages.cases"
    | "pages.blog"
    | "pages.contact"
    | "pages.quote"
    | "pages.branding"
    | "pages.privacy";
};

export async function PlaceholderPage({ namespace }: PlaceholderPageProps) {
  const [t, tCommon, locale] = await Promise.all([
    getTranslations(namespace),
    getTranslations("common"),
    getLocale(),
  ]);

  return (
    <>
      <section className="bg-cream px-10 pt-40 pb-24 lg:pb-32">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-6">
          <span className="text-copper text-[12px] leading-[27px]">{tCommon("comingSoon")}</span>
          <h1 className="font-display text-ink max-w-[900px] text-[64px] leading-[1.05]">
            {t("title")}
          </h1>
          <p className="text-ink/75 max-w-[700px] text-[20px] leading-[27px]">{t("lead")}</p>
        </div>
      </section>
      <Footer locale={locale as Locale} />
    </>
  );
}

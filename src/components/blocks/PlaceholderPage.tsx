import { getTranslations } from "next-intl/server";

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
  const [t, tCommon] = await Promise.all([getTranslations(namespace), getTranslations("common")]);

  return (
    <section className="bg-cream px-6 py-24 md:px-12 lg:px-20 lg:py-40">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <span className="text-copper text-sm tracking-[0.15em] uppercase">
          {tCommon("comingSoon")}
        </span>
        <h1 className="font-display text-ink max-w-[900px] text-[64px] leading-[1.05]">
          {t("title")}
        </h1>
        <p className="text-ink/75 max-w-[700px] text-[20px] leading-[1.55]">{t("lead")}</p>
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { Footer } from "@/components/blocks/Footer";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <section className="bg-cream flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-40 pb-24 text-center">
        <span className="text-copper text-[18px] leading-[27px]">404</span>
        <h1 className="font-display text-pine max-w-[720px] text-[44px] leading-[1.15] sm:text-[56px]">
          {t("title")}
        </h1>
        <p className="text-forest max-w-[520px] text-[18px] leading-[27px]">{t("description")}</p>
        <Link
          href="/"
          className="rounded-pill bg-copper text-cream hover:bg-copper/90 focus-visible:ring-copper mt-4 inline-flex items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t("home")}
        </Link>
      </section>
      <Footer locale={locale} />
    </>
  );
}

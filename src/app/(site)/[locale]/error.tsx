"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error("[locale error boundary]", error);
  }, [error]);

  return (
    <section className="bg-cream flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-40 pb-24 text-center">
      <h1 className="font-display text-pine max-w-[720px] text-[44px] leading-[1.15] sm:text-[56px]">
        {t("title")}
      </h1>
      <p className="text-forest max-w-[520px] text-[18px] leading-[27px]">{t("description")}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-pill bg-copper text-cream hover:bg-copper/90 focus-visible:ring-copper inline-flex items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          className="rounded-pill border-forest/30 text-forest hover:bg-forest/5 inline-flex items-center border px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
        >
          {t("home")}
        </Link>
      </div>
      {error.digest ? (
        <p className="text-forest/50 mt-4 text-[12px] leading-[18px]">ref: {error.digest}</p>
      ) : null}
    </section>
  );
}

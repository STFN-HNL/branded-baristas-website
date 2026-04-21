"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { routing, usePathname, useRouter } from "@/lib/i18n/routing";

type Props = {
  variant?: "dark" | "light";
};

export function LanguageSwitcher({ variant = "dark" }: Props) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const activeLocale = (params?.locale as string) ?? routing.defaultLocale;

  const baseColor = variant === "dark" ? "text-cream/80 hover:text-cream" : "text-ink/70 hover:text-ink";
  const activeColor = variant === "dark" ? "text-cream" : "text-ink";
  const separatorColor = variant === "dark" ? "text-cream/30" : "text-ink/30";

  return (
    <div
      className="flex items-center gap-1 text-[14px] leading-[20px]"
      aria-label={t("switchLanguage")}
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === activeLocale;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden className={`mx-1 ${separatorColor}`}>
                /
              </span>
            ) : null}
            <button
              type="button"
              disabled={isActive || isPending}
              onClick={() => {
                startTransition(() => {
                  router.replace(
                    // @ts-expect-error typed router accepts the current pathname
                    pathname,
                    { locale },
                  );
                });
              }}
              className={`rounded-sm uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-default ${
                isActive ? `${activeColor} font-medium` : baseColor
              } ${variant === "dark" ? "focus-visible:ring-cream" : "focus-visible:ring-copper"}`}
              aria-current={isActive ? "true" : undefined}
              aria-label={locale === "nl" ? t("languageNl") : t("languageEn")}
            >
              {locale}
            </button>
          </span>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link, asHref } from "@/lib/i18n/routing";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type FooterProps = {
  locale: Locale;
  wrapperBg?: "cream" | "mocha";
  flush?: boolean;
};

export async function Footer({ locale, wrapperBg = "cream", flush = false }: FooterProps) {
  const [tCommon, tFooter] = await Promise.all([
    getTranslations("common"),
    getTranslations("footer"),
  ]);
  const { footer } = getHomeContent(locale);

  const topPadding = flush ? "pt-0" : wrapperBg === "mocha" ? "pt-8" : "pt-24";
  const bgClass = wrapperBg === "mocha" ? "bg-mocha" : "bg-cream";
  const wrapperClass = `${bgClass} ${topPadding}`;

  return (
    <footer className={`${wrapperClass} px-8 pb-8`}>
      <div className="bg-ink text-cream mx-auto max-w-[1376px] rounded-[20px] px-5 pt-10 pb-10 sm:px-10 sm:pt-12 lg:px-20 lg:pt-[74px] lg:pb-[88px]">
        <div className="flex flex-col gap-12 lg:gap-[92px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <Link
              href="/"
              className="text-cream flex items-center"
              aria-label={tCommon("siteName")}
            >
              <Image
                src="/logo/logo-stacked.svg"
                alt={tCommon("siteName")}
                width={843}
                height={264}
                className="h-[44px] w-auto lg:h-[55px]"
              />
            </Link>
            <div className="flex flex-col gap-5 lg:gap-[37px]">
              <h2
                className="text-cream leading-none font-medium"
                style={{ fontSize: "var(--text-body)" }}
              >
                {tFooter("quickLinks")}
              </h2>
              <nav className="grid grid-cols-2 gap-x-10 gap-y-4 text-[15px] leading-none lg:gap-x-[80px] lg:gap-y-[33px] lg:text-[16px]">
                {footer.columns.map((column) => (
                  <Link
                    key={column.label}
                    href={asHref(column.href)}
                    className="hover:text-amber inline-flex min-h-[44px] items-center whitespace-nowrap transition-colors"
                  >
                    {column.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-cream/15 text-cream/70 flex flex-col gap-3 border-t pt-8 text-[12px] leading-[27px] sm:flex-row sm:items-center sm:justify-between">
            <span>{footer.colophon}</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <Link
                href="/privacy"
                className="hover:text-cream inline-flex min-h-[44px] items-center transition-colors"
              >
                {tFooter("privacy")}
              </Link>
              <Link
                href="/cookies"
                className="hover:text-cream inline-flex min-h-[44px] items-center transition-colors"
              >
                {tFooter("cookies")}
              </Link>
              <span>{tFooter("credit")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
      <div className="bg-ink text-cream mx-auto max-w-[1376px] rounded-[20px] px-20 pt-[74px] pb-[88px]">
        <div className="flex flex-col gap-[92px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <Link
              href="/"
              className="text-cream flex items-center gap-[10px]"
              aria-label={tCommon("siteName")}
            >
              <Image
                src="/logo/mark.svg"
                alt=""
                width={55}
                height={55}
                className="h-[55px] w-auto"
              />
              <span className="font-display text-[32px] leading-none tracking-tight">
                {tCommon("siteName")}
              </span>
            </Link>
            <div className="flex flex-col gap-[37px]">
              <h2 className="text-cream text-[20px] leading-none font-medium">
                {tFooter("quickLinks")}
              </h2>
              <nav className="grid grid-cols-2 gap-x-[80px] gap-y-[33px] text-[16px] leading-[13px]">
                {footer.columns.map((column) => (
                  <Link
                    key={column.label}
                    href={asHref(column.href)}
                    className="hover:text-amber whitespace-nowrap transition-colors"
                  >
                    {column.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-cream/15 text-cream/70 flex flex-col gap-4 border-t pt-10 text-[12px] leading-[27px] sm:flex-row sm:items-center sm:justify-between">
            <span>{footer.colophon}</span>
            <span>{tFooter("credit")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

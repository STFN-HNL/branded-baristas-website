import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type FooterProps = {
  locale: Locale;
  wrapperBg?: "cream" | "mocha";
};

export async function Footer({ locale, wrapperBg = "cream" }: FooterProps) {
  const tCommon = await getTranslations("common");
  const { footer } = getHomeContent(locale);

  const wrapperClass = wrapperBg === "mocha" ? "bg-mocha pt-8" : "bg-cream pt-24";

  return (
    <footer className={`${wrapperClass} px-8 pb-8`}>
      <div className="bg-ink text-cream mx-auto max-w-[1376px] rounded-[20px] px-16 py-20">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="flex max-w-md flex-col gap-4">
              <Link href="/" className="font-display text-cream text-[32px] tracking-tight">
                {tCommon("siteName")}
              </Link>
            </div>
            <nav className="text-cream grid grid-cols-2 gap-x-12 gap-y-3 text-[20px] leading-[27px] md:grid-cols-3">
              {footer.columns.map((column) => (
                <Link
                  key={column.label}
                  href={column.href}
                  className="hover:text-amber transition-colors"
                >
                  {column.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-cream/15 text-cream/70 border-t pt-8 text-[12px] leading-[27px]">
            {footer.colophon}
          </div>
        </div>
      </div>
    </footer>
  );
}

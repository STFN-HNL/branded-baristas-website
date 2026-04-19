import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n/routing";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const tCommon = await getTranslations("common");
  const { footer } = getHomeContent(locale);

  return (
    <footer className="bg-ink text-cream px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-md flex-col gap-4">
            <Link href="/" className="font-display text-cream text-[32px] tracking-tight">
              {tCommon("siteName")}
            </Link>
          </div>
          <nav className="text-cream/80 grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] md:grid-cols-3">
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
        <div className="border-cream/15 text-cream/60 border-t pt-8 text-[13px]">
          {footer.colophon}
        </div>
      </div>
    </footer>
  );
}

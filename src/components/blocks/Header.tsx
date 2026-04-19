import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";

export async function Header() {
  const [tCommon, tNav] = await Promise.all([getTranslations("common"), getTranslations("nav")]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-[116px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-20">
        <div className="bg-forest flex h-[70px] w-full items-center justify-between rounded-full px-10">
          <Link
            href="/"
            className="font-display text-cream text-2xl tracking-tight"
            aria-label={tCommon("siteName")}
          >
            {tCommon("siteName")}
          </Link>
          <nav className="text-cream flex items-center gap-[50px] text-[18px] leading-[27px]">
            <Link href="/over-ons">{tNav("about")}</Link>
            <Link href="/diensten">{tNav("services")}</Link>
            <Link href="/cases">{tNav("work")}</Link>
            <Link href="/blog">{tNav("blog")}</Link>
            <Link href="/contact">{tNav("contact")}</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

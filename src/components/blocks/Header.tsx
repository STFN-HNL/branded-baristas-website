import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";

export async function Header() {
  const [tCommon, tNav] = await Promise.all([getTranslations("common"), getTranslations("nav")]);

  return (
    <header className="bg-cream sticky top-0 z-50 h-[116px]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-8">
        <Link
          href="/"
          className="font-display text-ink text-2xl tracking-tight"
          aria-label={tCommon("siteName")}
        >
          {tCommon("siteName")}
        </Link>
        <nav className="text-ink flex items-center gap-[50px] text-[18px]">
          <Link href="/over-ons">{tNav("about")}</Link>
          <Link href="/diensten">{tNav("services")}</Link>
          <Link href="/cases">{tNav("work")}</Link>
          <Link href="/blog">{tNav("blog")}</Link>
          <Link href="/contact">{tNav("contact")}</Link>
        </nav>
      </div>
    </header>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";

export async function Header() {
  const [tCommon, tNav] = await Promise.all([getTranslations("common"), getTranslations("nav")]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-[116px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-20">
        <div className="bg-forest flex h-[70px] w-full items-center justify-between rounded-full pr-10 pl-6">
          <Link
            href="/"
            className="text-cream flex items-center gap-3"
            aria-label={tCommon("siteName")}
          >
            <Image
              src="/logo/mark.svg"
              alt=""
              width={44}
              height={41}
              priority
              className="h-[44px] w-auto"
            />
            <span className="font-display text-[22px] leading-none tracking-tight">
              {tCommon("siteName")}
            </span>
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

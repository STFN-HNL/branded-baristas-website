import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Header() {
  const [tCommon, tNav] = await Promise.all([getTranslations("common"), getTranslations("nav")]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-[116px]">
      <div className="mx-auto flex max-w-[1440px] px-6 pt-6 lg:px-20 lg:pt-10">
        <div className="bg-forest flex h-[70px] w-full items-center justify-between rounded-full py-[6px] pr-[6px] pl-[14px] lg:pl-[20px]">
          <Link
            href="/"
            className="text-cream focus-visible:ring-copper flex items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:outline-none"
            aria-label={tCommon("siteName")}
          >
            <Image
              src="/logo/mark.svg"
              alt=""
              width={44}
              height={40}
              priority
              className="h-[40px] w-auto"
            />
            <span className="font-display text-[22px] leading-none tracking-tight">
              {tCommon("siteName")}
            </span>
          </Link>
          <nav
            aria-label={tCommon("siteName")}
            className="text-cream hidden items-center gap-[28px] text-[16px] leading-[24px] lg:flex xl:gap-[40px] xl:text-[18px]"
          >
            {(
              [
                { href: "/over-ons" as const, label: tNav("about") },
                { href: "/diensten" as const, label: tNav("services") },
                { href: "/cases" as const, label: tNav("work") },
                { href: "/blog" as const, label: tNav("blog") },
                { href: "/contact" as const, label: tNav("contact") },
              ]
            ).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-amber focus-visible:ring-copper rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">
            <LanguageSwitcher variant="dark" />
            <Link
              href="/offerte"
              className="rounded-pill bg-amber text-ink hover:bg-amber/90 focus-visible:ring-cream inline-flex h-[58px] items-center px-5 text-[15px] leading-none font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:px-7 lg:text-[16px]"
            >
              {tCommon("quoteCta")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

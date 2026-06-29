import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const [tCommon, tNav] = await Promise.all([getTranslations("common"), getTranslations("nav")]);

  const navItems = [
    { href: "/over-ons", label: tNav("about") },
    { href: "/diensten", label: tNav("services") },
    { href: "/cases", label: tNav("work") },
    { href: "/blog", label: tNav("blog") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-[116px]">
      <div className="mx-auto flex max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-20 lg:pt-10">
        <div className="bg-forest flex h-[64px] w-full items-center justify-between rounded-full py-[6px] pr-[6px] pl-[12px] lg:h-[70px] lg:pl-[20px]">
          {/* Logo */}
          <Link
            href="/"
            className="focus-visible:ring-copper rounded-full focus-visible:ring-2 focus-visible:outline-none"
            aria-label={tCommon("siteName")}
          >
            <Image
              src="/logo/logo-stacked.svg"
              alt={tCommon("siteName")}
              width={843}
              height={264}
              priority
              className="h-[36px] w-auto lg:h-[40px]"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label={tCommon("siteName")}
            className="text-cream hidden items-center gap-[28px] text-[16px] leading-[24px] lg:flex xl:gap-[40px] xl:text-[18px]"
          >
            {[
              { href: "/over-ons" as const, label: navItems[0].label },
              { href: "/diensten" as const, label: navItems[1].label },
              { href: "/cases" as const, label: navItems[2].label },
              { href: "/blog" as const, label: navItems[3].label },
              { href: "/contact" as const, label: navItems[4].label },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-amber focus-visible:ring-copper rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: language + CTA + mobile hamburger */}
          <div className="flex items-center gap-2 lg:gap-5">
            <LanguageSwitcher variant="dark" />
            <Link
              href="/offerte"
              className="rounded-pill bg-amber text-ink hover:bg-amber/90 focus-visible:ring-cream hidden h-[52px] items-center px-5 text-[15px] leading-none font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex lg:h-[58px] lg:px-7 lg:text-[16px]"
            >
              {tCommon("quoteCta")}
            </Link>
            <MobileNav
              items={navItems}
              quoteCta={tCommon("quoteCta")}
              siteName={tCommon("siteName")}
              openLabel={tNav("openMenu")}
              closeLabel={tNav("closeMenu")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

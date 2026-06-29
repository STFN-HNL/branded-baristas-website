import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PillCta } from "./PillCta";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className="relative min-h-svh w-full overflow-hidden lg:h-[702px] lg:min-h-0">
      <Image
        src="/images/hero/hero-main.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Gradient overlay — stronger at bottom for text legibility on mobile */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        aria-hidden
      />

      {/* Mobile: single column anchored bottom. Desktop: 2-column row */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end gap-6 px-5 pb-10 sm:px-8 sm:pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-20 lg:pb-[99px]">
        <h1
          className="font-display text-cream max-w-[668px] leading-[1.1]"
          style={{ fontSize: "var(--text-display)" }}
        >
          {t("title")}
        </h1>
        <div className="flex max-w-full flex-col gap-5 lg:max-w-[442px] lg:gap-[30px]">
          <p className="text-cream/90 leading-[1.6]" style={{ fontSize: "var(--text-body)" }}>
            {t("lead")}
          </p>
          <PillCta href="/contact" variant="dark">
            {t("cta")}
          </PillCta>
        </div>
      </div>
    </section>
  );
}

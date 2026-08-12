import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { env } from "@/lib/env";
import { PillCta } from "./PillCta";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const calUrl = env.NEXT_PUBLIC_CAL_URL;

  return (
    <section className="relative h-[78svh] max-h-[760px] min-h-[600px] w-full overflow-hidden lg:h-[clamp(640px,46vw,820px)] lg:max-h-none lg:min-h-0">
      <Image
        src="/images/hero/hero-main.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[36%_38%]"
      />
      {/* Gradient overlay — stronger at bottom for text legibility on mobile */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        aria-hidden
      />

      {/* Mobile: single column anchored bottom. Desktop: 2-column row */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end gap-5 px-5 pt-[140px] pb-10 sm:gap-6 sm:px-8 sm:pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-20 lg:pt-0 lg:pb-[99px]">
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
          <div className="flex flex-wrap items-center gap-4">
            <PillCta href="/offerte" variant="dark">
              {t("cta")}
            </PillCta>
            {calUrl ? (
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream border-cream/50 hover:border-cream focus-visible:ring-copper inline-flex w-fit items-center rounded-full border px-6 py-[15px] text-[16px] leading-[20.8px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t("secondaryCta")}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

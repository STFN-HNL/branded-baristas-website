import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className="relative h-[702px] w-full overflow-hidden">
      <Image
        src="/images/hero/hero-main.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="bg-ink/40 absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end justify-between gap-12 px-20 pb-24">
        <h1 className="font-display text-cream max-w-[668px] text-[76px] leading-[70px]">
          {t("title")}
        </h1>
        <p className="text-cream mb-4 max-w-[442px] text-[20px] leading-[27px]">{t("lead")}</p>
      </div>
    </section>
  );
}

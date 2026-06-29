import Image from "next/image";
import { asHref } from "@/lib/i18n/routing";
import { PillCta } from "./PillCta";

type IntroSplitProps = {
  data: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
  };
};

export function IntroSplit({ data }: IntroSplitProps) {
  return (
    <section className="bg-cream px-5 py-10 sm:px-8 lg:px-10 lg:py-[90px]">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 lg:grid-cols-[590px_1fr] lg:gap-[100px]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] lg:aspect-[590/500]">
          <Image
            src={data.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 lg:justify-center lg:gap-[26px]">
          <span className="text-forest text-[12px] leading-[27px]">{data.eyebrow}</span>
          <h2
            className="font-display text-pine leading-[1.1]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {data.title}
          </h2>
          <p
            className="text-forest leading-[1.6] whitespace-pre-line"
            style={{ fontSize: "var(--text-body)" }}
          >
            {data.description}
          </p>
          <div className="mt-2">
            <PillCta href={asHref(data.ctaHref)} variant="cream">
              {data.ctaLabel}
            </PillCta>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-cream px-10 py-[90px]">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-[60px] lg:grid-cols-[590px_1fr] lg:gap-[100px]">
        <div className="relative aspect-[590/500] w-full overflow-hidden rounded-[20px]">
          <Image
            src={data.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-[26px] lg:justify-center">
          <span className="text-forest text-[12px] leading-[27px]">{data.eyebrow}</span>
          <h2 className="font-display text-pine text-[50px] leading-[55px]">{data.title}</h2>
          <p className="text-forest text-[20px] leading-[27px] whitespace-pre-line">
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

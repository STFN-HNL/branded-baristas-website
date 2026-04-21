import Image from "next/image";
import type { HomeContent } from "@/content/home";

type DifferentiatorProps = {
  data: HomeContent["differentiator"];
};

export function Differentiator({ data }: DifferentiatorProps) {
  const feature = data.features[0];

  return (
    <section className="bg-cream px-10 py-[60px] lg:py-[90px]">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-[40px]">
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-[547px_1fr]">
          <div className="relative h-[543px] w-full overflow-hidden rounded-[20px]">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 547px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-pine relative flex flex-col justify-between gap-10 rounded-[20px] p-[50px]">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-cream text-[42px] leading-[48px]">{data.title}</h2>
              <p className="text-cream text-[18px] leading-[27px] whitespace-pre-line">
                {data.description}
              </p>
            </div>
            {feature ? (
              <div className="flex items-center gap-4">
                <span className="bg-pine border-cream/40 text-cream flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border">
                  <Image
                    src="/logo/mark.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="h-[28px] w-auto"
                  />
                </span>
                <span className="bg-cream text-pine font-body inline-flex h-[55px] shrink-0 items-center rounded-full px-6 text-[16px] leading-[22px] whitespace-nowrap">
                  {feature.title}
                </span>
                <span className="text-cream flex-1 text-[14px] leading-[20px]">
                  {feature.description}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-[1fr_547px]">
          <div className="bg-copper relative flex flex-col justify-between gap-10 rounded-[20px] p-[50px]">
            <blockquote className="flex flex-col gap-6">
              <p className="font-display text-cream text-[36px] leading-[42px]">{data.quote}</p>
              <p className="text-cream text-[18px] leading-[27px] whitespace-pre-line">
                {data.quoteDescription}
              </p>
            </blockquote>
            <footer className="flex items-center gap-4">
              <span className="text-cream flex-1 text-[14px] leading-[20px]">
                {data.authorRole}
              </span>
              <span className="bg-cream/90 text-copper font-body inline-flex h-[55px] shrink-0 items-center rounded-full px-6 text-[14px] leading-[22px] whitespace-nowrap">
                {data.author}
              </span>
              <span className="bg-copper border-cream/40 text-cream flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border">
                <Image
                  src="/logo/mark.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="h-[28px] w-auto"
                />
              </span>
            </footer>
          </div>
          <div className="relative h-[543px] w-full overflow-hidden rounded-[20px]">
            <Image
              src={data.portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 547px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

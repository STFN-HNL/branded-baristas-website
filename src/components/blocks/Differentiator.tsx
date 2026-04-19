import Image from "next/image";
import type { HomeContent } from "@/content/home";

type DifferentiatorProps = {
  data: HomeContent["differentiator"];
};

export function Differentiator({ data }: DifferentiatorProps) {
  return (
    <section className="bg-cream px-10 py-24 lg:py-32">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] lg:aspect-auto lg:h-[543px]">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-pine flex flex-col justify-between gap-10 rounded-[20px] p-12 lg:p-16">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-cream text-[36px] leading-[41.58px]">
                {data.title}
              </h2>
              <p className="text-cream/90 text-[20px] leading-[27px] whitespace-pre-line">
                {data.description}
              </p>
            </div>
            <ul className="border-cream/15 flex flex-col gap-4 border-t pt-8">
              {data.features.map((feature) => (
                <li key={feature.title} className="flex flex-col gap-1">
                  <span className="font-display text-cream text-[24px] leading-[33px]">
                    {feature.title}
                  </span>
                  <span className="text-cream/80 text-[16px] leading-[21.5px]">
                    {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="bg-copper flex flex-col justify-between gap-10 rounded-[20px] p-12 lg:p-16">
            <blockquote className="flex flex-col gap-6">
              <p className="font-display text-cream text-[36px] leading-[41.58px]">
                “{data.quote}”
              </p>
              <p className="text-cream/90 text-[20px] leading-[27px] whitespace-pre-line">
                {data.quoteDescription}
              </p>
            </blockquote>
            <footer className="flex flex-col gap-1">
              <cite className="text-cream text-[16px] leading-[21.5px] not-italic">
                {data.author}
              </cite>
              <span className="text-cream/80 text-[16px] leading-[21.5px]">{data.authorRole}</span>
            </footer>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] lg:aspect-auto lg:h-[543px]">
            <Image
              src={data.portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

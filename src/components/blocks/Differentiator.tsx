import Image from "next/image";
import type { HomeContent } from "@/content/home";

type DifferentiatorProps = {
  data: HomeContent["differentiator"];
};

export function Differentiator({ data }: DifferentiatorProps) {
  return (
    <section className="bg-forest text-cream px-6 py-24 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-[50px] leading-[1.05]">{data.title}</h2>
            <p className="text-cream/80 text-[18px] leading-[1.55] whitespace-pre-line">
              {data.description}
            </p>
            <ul className="border-cream/15 mt-4 flex flex-col gap-4 border-t pt-8">
              {data.features.map((feature) => (
                <li key={feature.title} className="flex flex-col gap-2">
                  <span className="font-display text-amber text-[22px]">{feature.title}</span>
                  <span className="text-cream/75 text-[16px] leading-[1.55]">
                    {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
          <blockquote className="flex flex-col gap-8">
            <p className="font-display text-amber text-[36px] leading-[1.15]">“{data.quote}”</p>
            <p className="text-cream/80 text-[18px] leading-[1.55] whitespace-pre-line">
              {data.quoteDescription}
            </p>
            <footer className="text-cream/70 flex flex-col gap-1 text-[15px]">
              <cite className="text-cream font-medium not-italic">{data.author}</cite>
              <span>{data.authorRole}</span>
            </footer>
          </blockquote>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={data.portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

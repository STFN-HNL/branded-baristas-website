import Image from "next/image";
import type { HomeContent } from "@/content/home";

type DifferentiatorProps = {
  data: HomeContent["differentiator"];
};

export function Differentiator({ data }: DifferentiatorProps) {
  const feature = data.features[0];

  return (
    <section className="bg-cream px-5 py-10 sm:px-8 lg:px-10 lg:py-[90px]">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-5 lg:gap-[40px]">
        {/* Row 1: image left, content right */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[547px_1fr] lg:gap-[30px]">
          <div className="relative h-[260px] w-full overflow-hidden rounded-[20px] sm:h-[360px] lg:h-[543px]">
            <Image
              src={data.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 547px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-pine relative flex flex-col justify-between gap-8 rounded-[20px] p-6 sm:p-8 lg:gap-10 lg:p-[50px]">
            <div className="flex flex-col gap-4 lg:gap-6">
              <h2
                className="font-display text-cream leading-[1.15]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {data.title}
              </h2>
              <p
                className="text-cream leading-[1.6] whitespace-pre-line"
                style={{ fontSize: "var(--text-body)" }}
              >
                {data.description}
              </p>
            </div>
            {feature ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-4">
                <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                  <span className="bg-pine border-cream/40 text-cream flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border lg:h-[55px] lg:w-[55px]">
                    <Image
                      src="/logo/mark.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="h-[24px] w-auto lg:h-[28px]"
                    />
                  </span>
                  <span className="bg-cream text-pine font-body inline-flex h-[48px] min-w-0 shrink items-center truncate rounded-full px-5 text-[14px] leading-[22px] whitespace-nowrap lg:h-[55px] lg:px-6 lg:text-[16px]">
                    {feature.title}
                  </span>
                </div>
                <span className="text-cream min-w-0 text-[13px] leading-[20px] sm:flex-1 lg:text-[14px]">
                  {feature.description}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Row 2: content left, image right */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_547px] lg:gap-[30px]">
          <div className="bg-copper relative flex flex-col justify-between gap-8 rounded-[20px] p-6 sm:p-8 lg:gap-10 lg:p-[50px]">
            <blockquote className="flex flex-col gap-4 lg:gap-6">
              <p
                className="font-display text-cream leading-[1.2]"
                style={{ fontSize: "var(--text-h3)" }}
              >
                {data.quote}
              </p>
              <p
                className="text-cream leading-[1.6] whitespace-pre-line"
                style={{ fontSize: "var(--text-body)" }}
              >
                {data.quoteDescription}
              </p>
            </blockquote>
            <footer className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-4">
              <span className="text-cream min-w-0 text-[13px] leading-[20px] sm:flex-1 lg:text-[14px]">
                {data.authorRole}
              </span>
              <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                <span className="bg-cream/90 text-copper font-body inline-flex h-[48px] min-w-0 shrink items-center truncate rounded-full px-5 text-[13px] leading-[22px] whitespace-nowrap lg:h-[55px] lg:px-6 lg:text-[14px]">
                  {data.author}
                </span>
                <span className="bg-copper border-cream/40 text-cream flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border lg:h-[55px] lg:w-[55px]">
                  <Image
                    src="/logo/mark.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="h-[24px] w-auto lg:h-[28px]"
                  />
                </span>
              </div>
            </footer>
          </div>
          <div className="relative h-[260px] w-full overflow-hidden rounded-[20px] sm:h-[360px] lg:h-[543px]">
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

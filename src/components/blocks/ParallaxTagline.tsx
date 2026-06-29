import Image from "next/image";

type ParallaxTaglineProps = {
  data: {
    title: string;
    image: string;
  };
};

export function ParallaxTagline({ data }: ParallaxTaglineProps) {
  return (
    <section className="relative min-h-[240px] w-full overflow-hidden lg:min-h-[560px]">
      <Image src={data.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[240px] max-w-[1440px] items-center justify-center px-5 py-16 lg:min-h-[560px] lg:px-10">
        <h2
          className="font-display text-cream text-center leading-[1.1] whitespace-pre-line"
          style={{ fontSize: "var(--text-tagline)" }}
        >
          {data.title}
        </h2>
      </div>
    </section>
  );
}

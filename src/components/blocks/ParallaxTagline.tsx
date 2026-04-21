import Image from "next/image";

type ParallaxTaglineProps = {
  data: {
    title: string;
    image: string;
  };
};

export function ParallaxTagline({ data }: ParallaxTaglineProps) {
  return (
    <section className="relative h-[560px] w-full overflow-hidden">
      <Image
        src={data.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center justify-center px-10">
        <h2 className="font-display text-cream text-center text-[68px] leading-[72px] whitespace-pre-line">
          {data.title}
        </h2>
      </div>
    </section>
  );
}

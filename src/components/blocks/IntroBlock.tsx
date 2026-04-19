type IntroBlockProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "split";
};

export function IntroBlock({ eyebrow, title, description, align = "split" }: IntroBlockProps) {
  if (align === "left") {
    return (
      <div className="flex max-w-[900px] flex-col gap-6">
        {eyebrow ? (
          <span className="text-copper text-sm tracking-[0.15em] uppercase">{eyebrow}</span>
        ) : null}
        <h2 className="font-display text-ink text-[50px] leading-[1.05]">{title}</h2>
        {description ? (
          <p className="text-ink/80 text-[18px] leading-[1.55] whitespace-pre-line">
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-5">
        {eyebrow ? (
          <span className="text-copper text-sm tracking-[0.15em] uppercase">{eyebrow}</span>
        ) : null}
        <h2 className="font-display text-ink text-[50px] leading-[1.05]">{title}</h2>
      </div>
      {description ? (
        <p className="text-ink/80 text-[18px] leading-[1.55] whitespace-pre-line lg:pt-10">
          {description}
        </p>
      ) : null}
    </div>
  );
}

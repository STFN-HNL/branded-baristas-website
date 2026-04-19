type IntroBlockProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "split";
  tone?: "dark" | "light";
};

export function IntroBlock({
  eyebrow,
  title,
  description,
  align = "split",
  tone = "dark",
}: IntroBlockProps) {
  const titleColor = tone === "light" ? "text-cream" : "text-pine";
  const eyebrowColor = tone === "light" ? "text-cream" : "text-forest";
  const bodyColor = tone === "light" ? "text-cream/90" : "text-forest";

  if (align === "left") {
    return (
      <div className="flex max-w-[900px] flex-col gap-6">
        {eyebrow ? (
          <span className={`${eyebrowColor} text-[12px] leading-[27px]`}>{eyebrow}</span>
        ) : null}
        <h2 className={`font-display ${titleColor} text-[50px] leading-[55px]`}>{title}</h2>
        {description ? (
          <p className={`${bodyColor} text-[20px] leading-[27px] whitespace-pre-line`}>
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
          <span className={`${eyebrowColor} text-[12px] leading-[27px]`}>{eyebrow}</span>
        ) : null}
        <h2 className={`font-display ${titleColor} text-[50px] leading-[55px]`}>{title}</h2>
      </div>
      {description ? (
        <p className={`${bodyColor} text-[20px] leading-[27px] whitespace-pre-line lg:pt-10`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

type Logo = {
  name: string;
  icon: "square" | "bolt" | "arc" | "ring" | "dots" | "circle" | "t";
};

type ClientLogoStripProps = {
  logos: Logo[];
};

function LogoMark({ icon }: { icon: Logo["icon"] }) {
  const common = "text-forest/40";
  switch (icon) {
    case "square":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <rect x="3" y="3" width="22" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M8 20 L14 8 L20 20 Z" fill="currentColor" />
        </svg>
      );
    case "bolt":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <path d="M15 3 L6 16 H13 L11 25 L22 12 H15 Z" fill="currentColor" />
        </svg>
      );
    case "arc":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <path d="M4 22 C8 8 20 8 24 22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "ring":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="14" cy="4" r="2" fill="currentColor" />
          <circle cx="14" cy="24" r="2" fill="currentColor" />
          <circle cx="4" cy="14" r="2" fill="currentColor" />
          <circle cx="24" cy="14" r="2" fill="currentColor" />
        </svg>
      );
    case "dots":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <circle cx="6" cy="10" r="2" fill="currentColor" />
          <circle cx="14" cy="10" r="2" fill="currentColor" />
          <circle cx="22" cy="10" r="2" fill="currentColor" />
          <circle cx="10" cy="18" r="2" fill="currentColor" />
          <circle cx="18" cy="18" r="2" fill="currentColor" />
        </svg>
      );
    case "circle":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M14 3 L14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "t":
      return (
        <svg className={common} width="28" height="28" viewBox="0 0 28 28" aria-hidden>
          <path d="M4 6 H24 M14 6 V24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ClientLogoStrip({ logos }: ClientLogoStripProps) {
  return (
    <section className="bg-cream px-5 pt-[10px] pb-14 sm:px-8 lg:px-10 lg:pb-[80px]">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-x-10">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="text-forest/50 font-display flex items-center gap-2 text-[18px] leading-none whitespace-nowrap lg:text-[24px]"
          >
            <LogoMark icon={logo.icon} />
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

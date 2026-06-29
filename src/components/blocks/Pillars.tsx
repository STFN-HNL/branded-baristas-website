type PillarIcon = "storefront" | "handshake" | "pitcher" | "cup";

type PillarItem = {
  icon: PillarIcon;
  title: string;
  description: string;
};

type PillarsProps = {
  data: {
    subtitle: string;
    title: string;
    items: PillarItem[];
  };
};

function Icon({ icon }: { icon: PillarIcon }) {
  const common = "text-pine";
  switch (icon) {
    case "storefront":
      return (
        <svg className={common} width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
          <path
            d="M6 14 L10 7 H32 L36 14 M6 14 H36 M6 14 V35 H36 V14 M6 14 C6 17 9 18 10 18 C12 18 13 16 13 14 M13 14 C13 16 15 18 17 18 C19 18 21 16 21 14 M21 14 C21 16 23 18 25 18 C27 18 29 16 29 14 M29 14 C29 16 31 18 32 18 C33 18 36 17 36 14 M14 35 V24 H22 V35"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "handshake":
      return (
        <svg className={common} width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
          <path
            d="M3 18 L9 12 L15 18 L21 24 L27 18 L33 12 L39 18 M15 18 L17 20 L21 18 L25 20 L27 18 M12 21 L18 27 M15 24 L20 29 M18 27 L23 32"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pitcher":
      return (
        <svg className={common} width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
          <path
            d="M14 10 H28 V14 H32 C34 14 36 16 36 18 C36 20 34 22 32 22 H28 V32 C28 34 26 36 24 36 H18 C16 36 14 34 14 32 V10 Z M28 16 V20 H32 C33 20 34 19 34 18 C34 17 33 16 32 16 H28 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cup":
      return (
        <svg className={common} width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
          <path
            d="M12 8 H30 L29 12 H13 Z M13 12 L15 34 C15 35 16 36 17 36 H25 C26 36 27 35 27 34 L29 12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14 18 H28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
  }
}

export function Pillars({ data }: PillarsProps) {
  return (
    <section className="bg-cream px-5 py-10 sm:px-8 lg:px-10 lg:py-[90px]">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10 lg:gap-[70px]">
        <div className="flex flex-col items-center gap-3 text-center lg:gap-[18px]">
          <span className="text-forest text-[13px] leading-[27px] lg:text-[14px]">
            {data.subtitle}
          </span>
          <h2
            className="font-display text-pine leading-[1.1] whitespace-pre-line"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {data.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[50px]">
          {data.items.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-4 text-center lg:gap-[18px]">
              <Icon icon={item.icon} />
              <h3
                className="text-pine leading-[1.35]"
                style={{ fontSize: "var(--text-h4)" }}
              >
                {item.title}
              </h3>
              <p className="text-forest/80 text-[14px] leading-[22px]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

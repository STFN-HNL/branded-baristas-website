import { asHref } from "@/lib/i18n/routing";
import { PillCta } from "./PillCta";

type InlineCtaProps = {
  data: {
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export function InlineCta({ data }: InlineCtaProps) {
  return (
    <section className="bg-pine relative px-5 py-10 sm:px-8 lg:px-10 lg:py-[70px]">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-6 text-center lg:gap-[28px]">
        <p className="text-cream leading-[1.6]" style={{ fontSize: "var(--text-body)" }}>
          {data.text}
        </p>
        <PillCta href={asHref(data.ctaHref)} variant="dark">
          {data.ctaLabel}
        </PillCta>
      </div>
    </section>
  );
}

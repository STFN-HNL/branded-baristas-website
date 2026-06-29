import type { ComponentProps } from "react";
import { Link } from "@/lib/i18n/routing";
import type { GuideContent } from "@/content/guides/coffee-catering";

type Props = {
  content: GuideContent;
  quoteHref: ComponentProps<typeof Link>["href"];
  tocLabel: string;
  updatedLabel: string;
  readingTimeLabel: string;
};

/**
 * Long-form reference page renderer, built for AI-answer-engine citation:
 * clear heading hierarchy, short direct-answer paragraphs, stable anchor
 * links, a visible table of contents and a CTA at the bottom.
 */
export function Guide({ content, quoteHref, tocLabel, updatedLabel, readingTimeLabel }: Props) {
  return (
    <article className="bg-cream px-6 pt-28 pb-24 lg:px-10 lg:pt-40 lg:pb-32">
      <div className="mx-auto flex max-w-[960px] flex-col gap-12">
        <header className="flex flex-col gap-5">
          <div className="text-forest/70 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] tracking-[0.12em] uppercase">
            <time dateTime={content.updated}>
              {updatedLabel} {new Date(content.updated).toISOString().slice(0, 10)}
            </time>
            <span aria-hidden>·</span>
            <span>
              {content.readingTimeMinutes} {readingTimeLabel}
            </span>
          </div>
          <h1
            className="font-display text-pine leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "var(--text-display)" }}
          >
            {content.title}
          </h1>
          <p className="text-forest leading-[1.6]" style={{ fontSize: "var(--text-body)" }}>
            {content.lead}
          </p>
        </header>

        <section className="border-forest/10 flex flex-col gap-6 border-y py-10">
          {content.intro.map((p, i) => (
            <p key={i} className="text-forest text-[18px] leading-[28px]">
              {p}
            </p>
          ))}
        </section>

        <nav aria-label={tocLabel} className="bg-sand/60 rounded-[20px] px-8 py-6">
          <h2 className="text-pine text-[13px] tracking-[0.14em] uppercase">{tocLabel}</h2>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 text-[16px] leading-[24px] sm:grid-cols-2">
            {content.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-forest hover:text-copper underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-14">
          {content.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="scroll-mt-[120px]"
            >
              <h2
                id={`${section.id}-heading`}
                className="font-display text-pine leading-[1.15] tracking-[-0.01em]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {section.heading}
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {section.body.map((p, i) => (
                  <p key={i} className="text-forest text-[18px] leading-[28px]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="bg-mocha mt-8 flex flex-col items-start gap-4 rounded-[24px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <h2
            className="font-display text-cream leading-[1.15]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {content.cta.title}
          </h2>
          <p className="text-cream/85 max-w-[560px] text-[18px] leading-[26px]">
            {content.cta.description}
          </p>
          <Link
            href={quoteHref}
            className="rounded-pill bg-amber text-ink hover:bg-amber/90 focus-visible:ring-cream mt-2 inline-flex items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {content.cta.label}
          </Link>
        </aside>
      </div>
    </article>
  );
}

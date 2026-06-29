"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/routing";
import type { HomeContent } from "@/content/home";

type FAQProps = {
  data: HomeContent["faq"];
};

function FaqJsonLd({ items }: { items: HomeContent["faq"]["items"] }) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-mocha px-5 pt-10 sm:px-8 lg:px-10 lg:pt-32">
      <FaqJsonLd items={data.items} />
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="flex flex-col gap-4 lg:gap-6">
          <h2
            className="font-display text-cream leading-[1.1]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {data.title}
          </h2>
          <p className="text-cream/80 leading-[1.6]" style={{ fontSize: "var(--text-body)" }}>
            {data.description}
          </p>
          <Link
            href="/contact"
            className="rounded-pill bg-cream text-ink hover:bg-cream/90 mt-2 inline-flex min-h-[44px] w-fit items-center px-6 py-3 text-[15px] leading-[20.8px] transition-colors lg:px-8 lg:py-4 lg:text-[16px]"
          >
            {data.ctaLabel}
          </Link>
        </div>
        <ul className="flex flex-col gap-3 lg:gap-4">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={item.question}
                className="bg-cream rounded-[20px] px-5 py-5 lg:px-10 lg:py-6"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="focus-visible:ring-copper flex w-full items-center justify-between gap-4 rounded-sm text-left focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none lg:gap-8"
                >
                  <span
                    className="font-display text-ink leading-[1.35]"
                    style={{ fontSize: "var(--text-h4)" }}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`border-ink/20 text-ink flex size-9 shrink-0 items-center justify-center rounded-full border transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <p
                    className="text-ink/75 pt-4 pr-4 leading-[1.6] lg:pr-16"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {item.answer}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

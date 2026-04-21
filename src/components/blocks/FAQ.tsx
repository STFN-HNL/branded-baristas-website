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
    <section id="faq" className="bg-mocha px-10 pt-24 lg:pt-32">
      <FaqJsonLd items={data.items} />
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-cream text-[50px] leading-[55px]">{data.title}</h2>
          <p className="text-cream/80 text-[20px] leading-[27px]">{data.description}</p>
          <Link
            href="/contact"
            className="rounded-pill bg-cream text-ink hover:bg-cream/90 mt-2 inline-flex w-fit items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
          >
            {data.ctaLabel}
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question} className="bg-cream rounded-[20px] px-10 py-6">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="focus-visible:ring-copper flex w-full items-center justify-between gap-8 rounded-sm text-left focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <span className="font-display text-ink text-[24px] leading-[33px]">
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
                  <p className="text-ink/75 pt-4 pr-16 text-[20px] leading-[27px]">{item.answer}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

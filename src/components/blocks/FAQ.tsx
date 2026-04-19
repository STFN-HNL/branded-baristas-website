"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/routing";
import type { HomeContent } from "@/content/home";

type FAQProps = {
  data: HomeContent["faq"];
};

export function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-24 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-ink text-[50px] leading-[1.05]">{data.title}</h2>
          <p className="text-ink/75 text-[18px] leading-[1.55]">{data.description}</p>
          <Link
            href="/contact"
            className="rounded-pill bg-ink text-cream hover:bg-mocha mt-2 inline-flex w-fit items-center px-8 py-4 text-[15px] transition-colors"
          >
            {data.ctaLabel}
          </Link>
        </div>
        <ul className="border-ink/15 flex flex-col border-t">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question} className="border-ink/15 border-b">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-8 py-6 text-left"
                >
                  <span className="font-display text-ink text-[22px] leading-[1.25]">
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
                  <p className="text-ink/75 pr-16 pb-8 text-[16px] leading-[1.6]">{item.answer}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/routing";
import type { CaseItem } from "@/content/cases";

type Props = {
  items: CaseItem[];
  filters: { all: string; events: string; inCompany: string };
  readMoreLabel: string;
};

type FilterValue = "all" | "events" | "in-company";

export function CasesGrid({ items, filters, readMoreLabel }: Props) {
  const [active, setActive] = useState<FilterValue>("all");
  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  const buttons: { value: FilterValue; label: string }[] = [
    { value: "all", label: filters.all },
    { value: "events", label: filters.events },
    { value: "in-company", label: filters.inCompany },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        {buttons.map((b) => {
          const isActive = active === b.value;
          return (
            <button
              key={b.value}
              type="button"
              onClick={() => setActive(b.value)}
              className={`rounded-pill px-5 py-2 text-[14px] leading-[19px] transition-colors ${
                isActive
                  ? "bg-pine text-cream"
                  : "border-forest/20 text-forest hover:border-forest/40 border"
              }`}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <li key={item.slug} className="flex flex-col">
            <Link
              href={`/cases/${item.slug}`}
              className="group relative block aspect-[420/320] w-full overflow-hidden rounded-t-[20px]"
            >
              <Image
                src={item.image}
                alt={item.client}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="bg-cream flex flex-col gap-3 rounded-b-[20px] px-8 py-6">
              <div className="flex items-center gap-3 text-[12px] leading-[27px]">
                <span className="text-copper">{item.client}</span>
                <span className="text-forest/40">·</span>
                <span className="text-forest/60">{item.location}</span>
              </div>
              <h3 className="font-display text-pine text-[24px] leading-[33px] tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-forest text-[16px] leading-[21.5px]">{item.excerpt}</p>
              <Link
                href={`/cases/${item.slug}`}
                className="text-copper mt-1 inline-flex items-center gap-2 text-[16px] leading-[20.8px]"
              >
                {readMoreLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

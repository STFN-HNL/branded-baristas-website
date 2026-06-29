"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Link, asHref } from "@/lib/i18n/routing";
import type { AppPathname } from "@/lib/i18n/routing";

export type MobileNavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  items: MobileNavItem[];
  quoteCta: string;
  siteName: string;
  openLabel: string;
  closeLabel: string;
};

export function MobileNav({ items, quoteCta, siteName, openLabel, closeLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={openLabel}
        onClick={() => setIsOpen(true)}
        className="text-cream focus-visible:ring-copper flex h-[44px] w-[44px] items-center justify-center rounded-full transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:outline-none lg:hidden"
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
          <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={siteName}
          className="bg-ink/95 fixed inset-0 z-[100] flex flex-col backdrop-blur-sm"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 pt-6">
            <Image
              src="/logo/logo-stacked.svg"
              alt={siteName}
              width={843}
              height={264}
              className="h-[32px] w-auto"
            />
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => setIsOpen(false)}
              className="text-cream focus-visible:ring-copper flex h-[44px] w-[44px] items-center justify-center rounded-full transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:outline-none"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={asHref(item.href)}
                onClick={() => setIsOpen(false)}
                className="font-display text-cream hover:text-amber focus-visible:ring-copper text-[32px] leading-none tracking-tight transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA at bottom */}
          <div className="px-6 pb-12">
            <Link
              href={"/offerte" satisfies AppPathname}
              onClick={() => setIsOpen(false)}
              className="bg-amber text-ink focus-visible:ring-cream block w-full rounded-full py-4 text-center text-[16px] font-medium leading-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
            >
              {quoteCta}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

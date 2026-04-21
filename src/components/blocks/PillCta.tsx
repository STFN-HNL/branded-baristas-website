import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/lib/i18n/routing";

type Variant = "dark" | "cream";

type PillCtaProps = {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
  variant?: Variant;
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  dark: "bg-ink/85 text-cream backdrop-blur",
  cream: "bg-ink text-cream",
};

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PillCta({ href, children, variant = "dark", ariaLabel }: PillCtaProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${variants[variant]} focus-visible:ring-copper inline-flex w-fit items-center gap-4 rounded-full py-[5px] pr-[5px] pl-6 text-[16px] leading-[20.8px] transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none`}
    >
      <span>{children}</span>
      <span className="bg-amber text-ink grid h-[44px] w-[44px] place-items-center rounded-full">
        <ArrowRight />
      </span>
    </Link>
  );
}

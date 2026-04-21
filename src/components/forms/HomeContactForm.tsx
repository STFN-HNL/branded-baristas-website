"use client";

import { useState } from "react";

type Fields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Props = {
  labels: Fields;
  placeholders: Fields;
  submitLabel: string;
  thankYou: string;
};

const inputClass =
  "w-full rounded-full bg-cream/60 text-ink placeholder:text-ink/35 px-6 py-4 text-[16px] leading-[22px] focus:bg-cream focus:outline-none transition-colors border border-transparent focus:border-copper/40";

const labelClass = "text-ink/70 text-[14px] leading-[20px] mb-2 block";

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
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

export function HomeContactForm({ labels, placeholders, submitLabel, thankYou }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, string> = { source: "home" };
    formData.forEach((value, key) => {
      if (typeof value === "string") payload[key] = value;
    });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch (error) {
      console.error("[HomeContactForm]", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="bg-cream text-ink rounded-[20px] px-8 py-10 text-[18px] leading-[27px]"
      >
        {thankYou}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelClass} htmlFor="home-name">
          {labels.name}
        </label>
        <input
          id="home-name"
          name="name"
          type="text"
          required
          placeholder={placeholders.name}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="home-email">
          {labels.email}
        </label>
        <input
          id="home-email"
          name="email"
          type="email"
          required
          placeholder={placeholders.email}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="home-phone">
          {labels.phone}
        </label>
        <input
          id="home-phone"
          name="phone"
          type="tel"
          placeholder={placeholders.phone}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="home-message">
          {labels.message}
        </label>
        <textarea
          id="home-message"
          name="message"
          rows={5}
          required
          placeholder={placeholders.message}
          className="bg-cream/60 text-ink placeholder:text-ink/35 focus:bg-cream focus:border-copper/40 w-full resize-none rounded-[20px] border border-transparent px-6 py-4 text-[16px] leading-[22px] transition-colors focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-ink text-cream mt-2 inline-flex w-full items-center justify-between rounded-full py-[5px] pr-[5px] pl-6 text-[16px] leading-[20.8px] transition-opacity hover:opacity-90"
      >
        <span>{submitLabel}</span>
        <span className="bg-amber text-ink grid h-[44px] w-[44px] place-items-center rounded-full">
          <ArrowRight />
        </span>
      </button>
    </form>
  );
}

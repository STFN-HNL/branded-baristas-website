"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

type Props = {
  fields: Fields;
  placeholders: Fields;
  submitLabel: string;
  disclaimer: string;
};

const inputClass =
  "w-full rounded-[12px] bg-cream text-ink placeholder:text-ink/40 border border-cream/20 px-4 py-3 text-[16px] leading-[21.5px] focus:border-copper focus:outline-none transition-colors";

const labelClass = "text-cream text-[12px] leading-[27px] mb-1 block";

export function ContactForm({ fields, placeholders, submitLabel, disclaimer }: Props) {
  const t = useTranslations("forms.contact");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, string> = { source: "contact" };
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
      console.error("[ContactForm]", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="bg-cream text-ink rounded-[12px] px-6 py-8 text-[18px] leading-[27px]"
      >
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {fields.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={placeholders.name}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            {fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={placeholders.email}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            {fields.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={placeholders.phone}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            {fields.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder={placeholders.company}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="subject">
          {fields.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder={placeholders.subject}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="message">
          {fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder={placeholders.message}
          className={`${inputClass} resize-none`}
        />
      </div>
      <p className="text-cream/60 text-[12px] leading-[18px]">{disclaimer}</p>
      {status === "error" ? (
        <p role="alert" className="text-copper text-[14px] leading-[20px]">
          {t("error")}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-pill bg-copper text-cream hover:bg-copper/90 focus-visible:ring-cream focus-visible:ring-offset-pine mt-2 inline-flex w-full items-center justify-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60 sm:w-fit sm:justify-start"
      >
        {status === "submitting" ? t("submitting") : submitLabel}
      </button>
    </form>
  );
}

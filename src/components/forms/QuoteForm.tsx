"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuoteContent } from "@/content/quote";

type Props = {
  form: QuoteContent["form"];
  concepts: { value: string; label: string }[];
};

const inputClass =
  "w-full rounded-[12px] bg-cream text-ink placeholder:text-ink/40 border border-cream/10 px-4 py-3 text-[16px] leading-[21.5px] focus:border-copper focus:outline-none transition-colors";

const labelClass = "text-cream text-[12px] leading-[27px] mb-1 block";

export function QuoteForm({ form, concepts }: Props) {
  const t = useTranslations("forms.quote");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [service, setService] = useState<string>("events");
  const [selectedConcepts, setSelectedConcepts] = useState<Set<string>>(new Set());

  const toggleConcept = (value: string) => {
    setSelectedConcepts((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {
      source: "quote",
      service,
      concepts: Array.from(selectedConcepts),
    };
    formData.forEach((value, key) => {
      if (typeof value === "string" && !(key in payload)) payload[key] = value;
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
      console.error("[QuoteForm]", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="bg-cream text-ink rounded-[12px] px-6 py-8 text-[18px] leading-[27px]"
      >
        {form.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-cream text-[24px] leading-[33px] tracking-[-0.02em]">
          {form.sections.service.title}
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {form.sections.service.options.map((option) => {
            const active = service === option.value;
            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-[12px] border px-4 py-4 transition-colors ${
                  active
                    ? "border-copper bg-copper/10"
                    : "border-cream/20 bg-pine hover:border-cream/40"
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={option.value}
                  checked={active}
                  onChange={() => setService(option.value)}
                  className="sr-only"
                />
                <span className="text-cream block text-[16px] leading-[21.5px] font-medium">
                  {option.label}
                </span>
                <span className="text-cream/70 mt-1 block text-[14px] leading-[19px]">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-cream text-[24px] leading-[33px] tracking-[-0.02em]">
          {form.sections.event.title}
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="date">
              {form.sections.event.fields.date}
            </label>
            <input
              id="date"
              name="date"
              type="text"
              placeholder={form.sections.event.placeholders.date}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="guests">
              {form.sections.event.fields.guests}
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              placeholder={form.sections.event.placeholders.guests}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="location">
              {form.sections.event.fields.location}
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder={form.sections.event.placeholders.location}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="duration">
              {form.sections.event.fields.duration}
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              placeholder={form.sections.event.placeholders.duration}
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-cream text-[24px] leading-[33px] tracking-[-0.02em]">
          {form.sections.concept.title}
        </legend>
        <p className="text-cream/80 text-[16px] leading-[21.5px]">
          {form.sections.concept.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {concepts.map((c) => {
            const active = selectedConcepts.has(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => toggleConcept(c.value)}
                className={`rounded-pill px-5 py-2 text-[14px] leading-[19px] transition-colors ${
                  active
                    ? "bg-copper text-cream"
                    : "border-cream/30 text-cream hover:border-cream/60 border"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-cream text-[24px] leading-[33px] tracking-[-0.02em]">
          {form.sections.contact.title}
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              {form.sections.contact.fields.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={form.sections.contact.placeholders.name}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              {form.sections.contact.fields.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={form.sections.contact.placeholders.email}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">
              {form.sections.contact.fields.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder={form.sections.contact.placeholders.phone}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="company">
              {form.sections.contact.fields.company}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder={form.sections.contact.placeholders.company}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="message">
            {form.sections.contact.fields.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={form.sections.contact.placeholders.message}
            className={`${inputClass} resize-none`}
          />
        </div>
      </fieldset>

      <p className="text-cream/60 text-[12px] leading-[18px]">{form.disclaimer}</p>
      {status === "error" ? (
        <p role="alert" className="text-copper text-[14px] leading-[20px]">
          {t("error")}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-pill bg-copper text-cream hover:bg-copper/90 focus-visible:ring-cream focus-visible:ring-offset-pine inline-flex w-full items-center justify-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60 sm:w-fit sm:justify-start"
      >
        {status === "submitting" ? t("submitting") : form.submit}
      </button>
    </form>
  );
}

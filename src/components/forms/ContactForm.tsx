"use client";

import { useState } from "react";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-cream text-ink rounded-[12px] px-6 py-8 text-[18px] leading-[27px]">
        Bedankt — we hebben je bericht ontvangen en nemen binnen één werkdag contact op.
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
      <button
        type="submit"
        className="rounded-pill bg-copper text-cream hover:bg-copper/90 mt-2 inline-flex w-fit items-center px-8 py-4 text-[16px] leading-[20.8px] transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}

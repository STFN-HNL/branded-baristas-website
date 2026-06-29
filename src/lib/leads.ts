import { z } from "zod";
import { env } from "@/lib/env";

const baseContact = {
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(60).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  locale: z.enum(["nl", "en"]).optional(),
  utm_source: z.string().max(200).optional().nullable(),
  utm_medium: z.string().max(200).optional().nullable(),
  utm_campaign: z.string().max(200).optional().nullable(),
};

export const quoteLeadSchema = z
  .object({
    source: z.literal("quote"),
    service: z.enum(["events", "in-company", "branding"]).optional(),
    date: z.string().max(50).optional().nullable(),
    guests: z.string().max(50).optional().nullable(),
    location: z.string().max(200).optional().nullable(),
    duration: z.string().max(50).optional().nullable(),
    concepts: z.array(z.string().max(200)).max(20).optional(),
    subject: z.string().max(200).optional().nullable(),
    ...baseContact,
  })
  .strict();

export const contactLeadSchema = z
  .object({
    source: z.enum(["contact", "home"]),
    subject: z.string().max(200).optional().nullable(),
    ...baseContact,
  })
  .strict();

export const leadSchema = z.discriminatedUnion("source", [quoteLeadSchema, contactLeadSchema]);

export type Lead = z.infer<typeof leadSchema>;

type SupabaseInsertResponse = { id?: string | number }[] | { message: string };

async function insertIntoSupabase(lead: Lead): Promise<string | null> {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/leads`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      source: lead.source,
      locale: lead.locale ?? null,
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? null,
      company: lead.company ?? null,
      message: lead.message ?? null,
      subject: "subject" in lead ? (lead.subject ?? null) : null,
      service: lead.source === "quote" ? (lead.service ?? null) : null,
      event_date: lead.source === "quote" ? (lead.date ?? null) : null,
      guests: lead.source === "quote" ? (lead.guests ?? null) : null,
      location: lead.source === "quote" ? (lead.location ?? null) : null,
      duration: lead.source === "quote" ? (lead.duration ?? null) : null,
      concepts: lead.source === "quote" ? (lead.concepts ?? []) : [],
      utm_source: lead.utm_source ?? null,
      utm_medium: lead.utm_medium ?? null,
      utm_campaign: lead.utm_campaign ?? null,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }

  const body = (await res.json().catch(() => null)) as SupabaseInsertResponse | null;
  if (Array.isArray(body) && body[0]?.id != null) return String(body[0].id);
  return null;
}

function formatLeadEmail(lead: Lead): { subject: string; html: string; text: string } {
  const subject =
    lead.source === "quote"
      ? `[Branded Baristas] New quote request — ${lead.name}`
      : `[Branded Baristas] New ${lead.source} message — ${lead.name}`;

  const rows: [string, string | null | undefined][] = [
    ["Source", lead.source],
    ["Locale", lead.locale ?? "—"],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Subject", "subject" in lead ? lead.subject : null],
  ];
  if (lead.source === "quote") {
    rows.push(
      ["Service", lead.service],
      ["Date", lead.date],
      ["Guests", lead.guests],
      ["Location", lead.location],
      ["Duration", lead.duration],
      ["Concepts", lead.concepts?.join(", ")],
    );
  }
  rows.push(
    ["Message", lead.message],
    ["UTM source", lead.utm_source],
    ["UTM medium", lead.utm_medium],
    ["UTM campaign", lead.utm_campaign],
  );

  const filtered = rows.filter(([, v]) => v != null && v !== "");
  const text = filtered.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${filtered
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64675e"><strong>${k}</strong></td><td style="padding:4px 0">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("")}</table>`;

  return { subject, html, text };
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

async function sendViaResend(lead: Lead): Promise<boolean> {
  const key = env.RESEND_API_KEY;
  const from = env.RESEND_FROM_EMAIL;
  const to = env.RESEND_TO_EMAIL ?? "info@branded-baristas.com";
  if (!key || !from) return false;

  const { subject, html, text } = formatLeadEmail(lead);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${body}`);
  }
  return true;
}

export type SubmitLeadResult = {
  id: string | null;
  stored: boolean;
  emailed: boolean;
};

export async function submitLead(lead: Lead): Promise<SubmitLeadResult> {
  let id: string | null = null;
  let stored = false;
  let emailed = false;

  try {
    id = await insertIntoSupabase(lead);
    stored = id !== null || (!!env.NEXT_PUBLIC_SUPABASE_URL && !!env.SUPABASE_SERVICE_ROLE_KEY);
  } catch (error) {
    console.error("[submitLead] Supabase insert failed", error);
  }

  try {
    emailed = await sendViaResend(lead);
  } catch (error) {
    console.error("[submitLead] Resend send failed", error);
  }

  if (!stored && !emailed) {
    // Neither backend is configured yet — log so the lead isn't lost in dev.
    console.warn("[submitLead] no backend configured; lead not persisted", lead);
  }

  return { id, stored, emailed };
}

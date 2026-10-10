import { NextResponse } from "next/server";
import { leadSchema, submitLead } from "@/lib/leads";
import { RateLimiter, clientIp, screenLead } from "@/lib/leadGuard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 5 submissions per IP per 10 minutes is far above what a real visitor needs.
const limiter = new RateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (ip && !limiter.allow(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const screened = screenLead(body);
  if (screened.spam) {
    // Answer like a normal success so bots get no signal to adapt to.
    console.warn(`[/api/quote] dropped spam submission (${screened.reason})`);
    return NextResponse.json({ ok: true, id: null, stored: false, emailed: false });
  }

  const parsed = leadSchema.safeParse(screened.body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const { configured, ...result } = await submitLead(parsed.data);
    if (configured && !result.stored && !result.emailed) {
      // Every configured backend failed: tell the visitor so the form shows
      // its error state (with the email fallback) instead of a false "thanks".
      // Contact details are logged so the lead can still be recovered by hand.
      console.error("[/api/quote] lead not delivered to any backend", {
        source: parsed.data.source,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
      });
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[/api/quote] submitLead threw:", error);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

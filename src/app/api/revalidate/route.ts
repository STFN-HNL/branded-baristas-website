import { revalidateTag as _revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { env } from "@/lib/env";

// Next.js 16 changed the signature to require a profile; cast to the standard 1-arg form.
const revalidateTag = _revalidateTag as (tag: string) => void;

type Payload = {
  _type?: string;
  slug?: {
    nl?: { current?: string };
    en?: { current?: string };
    current?: string;
  };
};

export async function POST(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const raw = await req.text();

  if (!signature || !(await isValidSignature(raw, signature, env.SANITY_WEBHOOK_SECRET))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: Payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const type = payload._type;
  if (!type) return new Response("Missing _type", { status: 400 });

  const slugs = [
    payload.slug?.nl?.current,
    payload.slug?.en?.current,
    payload.slug?.current,
  ].filter((s): s is string => typeof s === "string" && s.length > 0);

  revalidateTag(type);
  for (const slug of slugs) {
    revalidateTag(`${type}:${slug}`);
  }

  return Response.json({ revalidated: true, type, slugs });
}

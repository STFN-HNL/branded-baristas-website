import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { env } from "@/lib/env";

export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
  token: env.SANITY_API_READ_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);

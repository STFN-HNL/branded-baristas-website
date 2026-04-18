import { sanityClient } from "../client";

const SETTINGS_QUERY = `*[_type == "settings"][0]{
  siteName,
  "logo": logo.asset->url
}`;

export type Settings = {
  siteName: string | null;
  logo: string | null;
};

export async function getSettings(): Promise<Settings | null> {
  return sanityClient.fetch<Settings | null>(SETTINGS_QUERY, {}, { next: { tags: ["settings"] } });
}

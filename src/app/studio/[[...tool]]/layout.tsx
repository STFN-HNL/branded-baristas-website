import type { ReactNode } from "react";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata = {
  ...studioMetadata,
};

export const viewport = {
  ...studioViewport,
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}

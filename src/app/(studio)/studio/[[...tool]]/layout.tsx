import type { ReactNode } from "react";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import "../../../globals.css";

export const metadata = {
  ...studioMetadata,
};

export const viewport = {
  ...studioViewport,
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

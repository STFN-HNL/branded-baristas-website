"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="nl">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#F5EFE3",
          color: "#1F2B25",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "520px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 600, marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.55, marginBottom: "2rem" }}>
            Sorry, an unexpected error occurred. We&apos;ve been notified.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#A85D3C",
              color: "#F5EFE3",
              border: "none",
              borderRadius: "999px",
              padding: "0.9rem 2rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "2rem" }}>
              ref: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}

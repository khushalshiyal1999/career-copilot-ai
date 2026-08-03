"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error replaces the root layout, so it must render its own html/body
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100dvh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
          Something went wrong
        </h2>
        <p style={{ color: "#737373", fontSize: "0.875rem" }}>
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            background: "transparent",
            font: "inherit",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

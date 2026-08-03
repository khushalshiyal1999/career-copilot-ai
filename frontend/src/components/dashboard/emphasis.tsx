import * as React from "react";

import { cn } from "@/lib/utils";

/** Renders copy with `**bold**` segments emphasized — the AI's way of highlighting numbers. */
export function Emphasis({
  text,
  strongClassName,
}: {
  text: string;
  strongClassName?: string;
}) {
  return (
    <>
      {text.split("**").map((part, index) =>
        index % 2 === 1 ? (
          <strong
            key={index}
            className={cn("font-semibold text-foreground", strongClassName)}
          >
            {part}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

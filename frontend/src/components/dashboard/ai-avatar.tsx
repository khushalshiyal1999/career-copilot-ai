import * as React from "react";

import { Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "size-6 rounded-lg [&_svg]:size-3",
  default: "size-8 rounded-lg [&_svg]:size-4",
  lg: "size-10 rounded-xl [&_svg]:size-5",
} as const;

/** The assistant's face: a gradient Sparkles tile used wherever the AI speaks. */
export function AiAvatar({
  size = "default",
  className,
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center bg-linear-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)] text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-inset ring-white/20",
        SIZES[size],
        className
      )}
    >
      <Sparkles />
    </span>
  );
}

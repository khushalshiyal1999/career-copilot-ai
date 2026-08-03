import * as React from "react";

import { matchTier } from "@/components/jobs/data";
import { cn } from "@/lib/utils";

const RADIUS = 15.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TIER_STROKE = {
  success: "stroke-success",
  info: "stroke-info",
  warning: "stroke-warning",
  draft: "stroke-muted-foreground",
} as const;

/** Compact AI-match donut with the percentage inside. */
export function MatchRing({
  match,
  size = "default",
  className,
}: {
  match: number;
  size?: "default" | "lg";
  className?: string;
}) {
  const tier = matchTier(match);

  return (
    <div
      role="img"
      aria-label={`AI match ${match}% — ${tier.label}`}
      className={cn(
        "relative shrink-0",
        size === "lg" ? "size-14" : "size-11",
        className
      )}
    >
      <svg viewBox="0 0 36 36" className="size-full -rotate-90">
        <circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          strokeWidth="3.5"
          className="stroke-muted"
        />
        <circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - match / 100)}
          className={TIER_STROKE[tier.badgeVariant]}
        />
      </svg>
      <span
        className={cn(
          "absolute inset-0 grid place-items-center font-heading font-semibold tabular-nums",
          size === "lg" ? "text-sm" : "text-[11px]"
        )}
      >
        {match}%
      </span>
    </div>
  );
}

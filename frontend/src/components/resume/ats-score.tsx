"use client";

import * as React from "react";

import { atsTier, type AtsBreakdown } from "@/components/resume/data";
import { cn } from "@/lib/utils";

const RADIUS = 15.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BREAKDOWN_LABELS: { key: keyof AtsBreakdown; label: string }[] = [
  { key: "formatting", label: "Formatting" },
  { key: "keywords", label: "Keywords" },
  { key: "structure", label: "Structure" },
  { key: "readability", label: "Readability" },
];

interface AtsScoreCardProps {
  score: number;
  breakdown: AtsBreakdown;
  /** Shows a shimmer while the AI "re-analyzes". */
  analyzing?: boolean;
}

/** Premium ATS score section — big ring plus per-dimension bars. */
export function AtsScoreCard({ score, breakdown, analyzing = false }: AtsScoreCardProps) {
  const tier = atsTier(score);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="flex items-center gap-4">
        <div
          role="img"
          aria-label={`ATS score ${score}% — ${tier.label}`}
          className={cn("relative size-24 shrink-0", analyzing && "animate-pulse")}
        >
          <svg viewBox="0 0 36 36" className="size-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r={RADIUS}
              fill="none"
              strokeWidth="3"
              className="stroke-muted"
            />
            <circle
              cx="18"
              cy="18"
              r={RADIUS}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - score / 100)}
              className={cn(tier.strokeClass, "transition-all duration-700 ease-out")}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-2xl font-semibold tabular-nums">
              {score}%
            </span>
          </span>
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={cn("font-heading text-sm font-semibold", tier.textClass)}>
            {tier.label}
          </span>
          <span className="text-xs leading-relaxed text-muted-foreground">
            {analyzing
              ? "Re-scanning against 6 major ATS parsers…"
              : "Scored against the parsers used by 90% of large employers."}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {BREAKDOWN_LABELS.map(({ key, label }) => {
          const value = breakdown[key];
          const rowTier = atsTier(value);
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-xs text-muted-foreground">
                {label}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn(
                    "block h-full rounded-full transition-all duration-700 ease-out",
                    rowTier.fillClass
                  )}
                  style={{ width: `${value}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-xs font-medium tabular-nums">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

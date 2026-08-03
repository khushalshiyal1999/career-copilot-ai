"use client";

import * as React from "react";

import { CAREER_SCORE } from "@/components/analytics/data";
import { Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

const RADIUS = 15.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function barTone(value: number): string {
  if (value >= 85) return "bg-success";
  if (value >= 70) return "bg-info";
  return "bg-warning";
}

/** Big career-score card — overall ring plus six dimension bars. */
export function CareerScoreCard() {
  const weakest = [...CAREER_SCORE.breakdown].sort((a, b) => a.value - b.value)[0];

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Sparkles aria-hidden className="size-3.5 text-primary" />
        Career Score
      </h3>

      <div className="flex items-center gap-5">
        <div
          role="img"
          aria-label={`Overall career score ${CAREER_SCORE.overall} out of 100`}
          className="relative size-28 shrink-0"
        >
          <svg viewBox="0 0 36 36" className="size-full -rotate-90">
            <circle cx="18" cy="18" r={RADIUS} fill="none" strokeWidth="3" className="stroke-muted" />
            <circle
              cx="18"
              cy="18"
              r={RADIUS}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - CAREER_SCORE.overall / 100)}
              className="stroke-primary transition-all duration-700 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-3xl font-semibold tabular-nums">
              {CAREER_SCORE.overall}
            </span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Top 9% of frontend candidates in your market. Your weakest dimension is{" "}
          <span className="font-medium text-foreground">{weakest.label.toLowerCase()}</span> —
          improving it is the fastest way to raise the overall score.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {CAREER_SCORE.breakdown.map((dimension) => (
          <div key={dimension.label} className="flex items-center gap-3">
            <span className="w-40 shrink-0 truncate text-xs text-muted-foreground">
              {dimension.label}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className={cn(
                  "block h-full rounded-full transition-all duration-700 ease-out",
                  barTone(dimension.value)
                )}
                style={{ width: `${dimension.value}%` }}
              />
            </span>
            <span className="w-7 shrink-0 text-right text-xs font-medium tabular-nums">
              {dimension.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

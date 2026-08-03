"use client";

import * as React from "react";

import { KPIS } from "@/components/analytics/data";
import { AnimatedNumber } from "@/components/dashboard/animated-number";
import { ArrowDownRight, ArrowUpRight } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Top strip — the eight numbers that summarize the whole search. */
export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
      {KPIS.map((kpi) => {
        const rising = kpi.delta >= 0;
        return (
          <div
            key={kpi.id}
            className="flex flex-col gap-1 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
          >
            <span className="truncate text-xs text-muted-foreground">{kpi.label}</span>
            <span className="font-heading text-xl font-semibold tabular-nums">
              <AnimatedNumber value={kpi.value} suffix={kpi.suffix ?? ""} />
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[10px] font-medium",
                rising ? "text-success" : "text-destructive"
              )}
            >
              {rising ? (
                <ArrowUpRight aria-hidden className="size-3" />
              ) : (
                <ArrowDownRight aria-hidden className="size-3" />
              )}
              {kpi.deltaLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function KpiCardsSkeleton() {
  return (
    <div aria-hidden className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
        >
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      ))}
    </div>
  );
}

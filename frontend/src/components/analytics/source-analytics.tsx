"use client";

import * as React from "react";

import { SOURCE_STATS } from "@/components/analytics/data";
import { Radar } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Which job boards actually convert — apps, interviews, offers per source. */
export function SourceAnalytics() {
  const maxApps = Math.max(...SOURCE_STATS.map((s) => s.applications));
  const best = [...SOURCE_STATS].sort((a, b) => b.success - a.success)[0];

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Radar aria-hidden className="size-3.5 text-muted-foreground" />
        Job Source Performance
      </h3>

      <div className="flex flex-col gap-2.5">
        {SOURCE_STATS.map((source) => (
          <Tooltip key={source.name}>
            <TooltipTrigger asChild>
              <div className="flex cursor-default items-center gap-3">
                <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">
                  {source.name}
                </span>
                <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary/30"
                    style={{ width: `${(source.applications / maxApps) * 100}%` }}
                  />
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary/60"
                    style={{ width: `${(source.interviews / maxApps) * 100}%` }}
                  />
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ width: `${(source.offers / maxApps) * 100}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "w-12 shrink-0 text-right text-xs font-medium tabular-nums",
                    source.success >= 60
                      ? "text-success"
                      : source.success >= 45
                        ? "text-info"
                        : "text-muted-foreground"
                  )}
                >
                  {source.success}%
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {source.name}: {source.applications} applications · {source.interviews}{" "}
              interviews · {source.offers} offers · {source.success}% success
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-sm bg-primary/30" />
            Applications
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-sm bg-primary/60" />
            Interviews
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-sm bg-primary" />
            Offers
          </span>
        </div>
        <span>
          Best converting: <span className="font-medium text-foreground">{best.name} ({best.success}%)</span>
        </span>
      </div>
    </div>
  );
}

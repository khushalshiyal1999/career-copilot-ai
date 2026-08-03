"use client";

import * as React from "react";

import { FUNNEL } from "@/components/analytics/data";
import { Target } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/** Application funnel — width-proportional stages with conversion rates. */
export function FunnelChart() {
  const max = FUNNEL[0].count;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Target aria-hidden className="size-3.5 text-muted-foreground" />
        Application Funnel
      </h3>

      <div className="flex flex-col gap-1.5">
        {FUNNEL.map((stage, index) => {
          const prev = index > 0 ? FUNNEL[index - 1].count : stage.count;
          const conversion = Math.round((stage.count / prev) * 100);
          const width = Math.max((stage.count / max) * 100, 7);
          return (
            <Tooltip key={stage.label}>
              <TooltipTrigger asChild>
                <div className="flex cursor-default items-center gap-3">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">
                    {stage.label}
                  </span>
                  <div className="flex flex-1 items-center gap-2">
                    <span
                      className="flex h-6 items-center justify-end rounded-md bg-linear-to-r from-primary/70 to-primary pr-2 text-[10px] font-semibold text-primary-foreground transition-all duration-700"
                      style={{ width: `${width}%`, opacity: 0.45 + (width / 100) * 0.55 }}
                    >
                      {stage.count}
                    </span>
                    {index > 0 && (
                      <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">
                        {conversion}%
                      </span>
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {stage.count} of {max} applications
                {index > 0 && ` · ${conversion}% conversion from ${FUNNEL[index - 1].label}`}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Biggest drop-off: <span className="font-medium text-foreground">Viewed → HR (43%)</span>{" "}
        — this is where resume keywords matter most.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";

import {
  PIPELINE_STAGES,
  type Application,
  type Stage,
} from "@/components/applications/data";
import { ArrowDownRight, ArrowUpRight } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PipelineSummaryProps {
  apps: Application[];
  activeStage: "all" | Stage;
  onStageChange: (stage: "all" | Stage) => void;
}

/** Horizontal stage cards — count, weekly trend, share of pipeline. Click to filter. */
export function PipelineSummary({ apps, activeStage, onStageChange }: PipelineSummaryProps) {
  const total = apps.length;

  return (
    <div
      role="group"
      aria-label="Pipeline summary"
      className="flex snap-x gap-3 overflow-x-auto pb-1"
    >
      {PIPELINE_STAGES.map((stage) => {
        const count = apps.filter((app) => app.stage === stage.id).length;
        const share = total === 0 ? 0 : Math.round((count / total) * 100);
        const active = activeStage === stage.id;
        const rising = stage.trend >= 0;

        return (
          <button
            key={stage.id}
            type="button"
            aria-pressed={active}
            onClick={() => onStageChange(active ? "all" : stage.id)}
            className={cn(
              "flex min-w-36 flex-1 snap-start flex-col gap-1.5 rounded-xl bg-card p-3 text-left ring-1 transition-all",
              active
                ? "bg-accent/40 ring-2 ring-primary"
                : "ring-foreground/10 hover:-translate-y-0.5 hover:ring-foreground/25"
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">
              {stage.label}
            </span>
            <span className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-semibold tabular-nums">
                {count}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                  rising ? "text-success" : "text-destructive"
                )}
              >
                {rising ? (
                  <ArrowUpRight aria-hidden className="size-3" />
                ) : (
                  <ArrowDownRight aria-hidden className="size-3" />
                )}
                {rising ? "+" : ""}
                {stage.trend}
                <span className="sr-only">this week</span>
              </span>
            </span>
            <span
              aria-hidden
              className="mt-0.5 h-1 overflow-hidden rounded-full bg-muted"
            >
              <span
                className={cn("block h-full rounded-full", stage.fillClass)}
                style={{ width: `${Math.max(share, count > 0 ? 6 : 0)}%` }}
              />
            </span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {share}% of pipeline
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PipelineSummarySkeleton() {
  return (
    <div aria-hidden className="flex gap-3 overflow-hidden pb-1">
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="flex min-w-36 flex-1 flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
        >
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-7 w-12" />
          <Skeleton className="h-1 w-full rounded-full" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      ))}
    </div>
  );
}

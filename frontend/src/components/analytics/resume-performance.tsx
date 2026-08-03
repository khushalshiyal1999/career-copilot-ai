"use client";

import * as React from "react";

import { RESUME_PERFORMANCE } from "@/components/analytics/data";
import { FileText, Sparkles } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const METRICS = [
  { key: "interviewRate", label: "Interview Rate", suffix: "%" },
  { key: "offerRate", label: "Offer Rate", suffix: "%" },
  { key: "atsScore", label: "ATS Score", suffix: "" },
  { key: "responseRate", label: "Response Rate", suffix: "%" },
  { key: "avgMatch", label: "Average Match", suffix: "%" },
] as const;

/** Resume V1 vs V2 vs V3 — which version actually gets interviews. */
export function ResumePerformance() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <FileText aria-hidden className="size-3.5 text-muted-foreground" />
        Resume Performance
      </h3>

      <div className="grid gap-3 sm:grid-cols-3">
        {RESUME_PERFORMANCE.map((version) => (
          <div
            key={version.version}
            className={cn(
              "flex flex-col gap-2.5 rounded-xl p-3.5 ring-1 transition-all",
              version.best ? "bg-accent/40 ring-2 ring-primary/60" : "ring-foreground/10"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-sm font-medium">{version.version}</span>
              {version.best && (
                <Badge variant="default">
                  <Sparkles /> Best
                </Badge>
              )}
            </div>
            <dl className="flex flex-col gap-1.5">
              {METRICS.map((metric) => (
                <div
                  key={metric.key}
                  className="flex items-center justify-between text-xs"
                >
                  <dt className="text-muted-foreground">{metric.label}</dt>
                  <dd className="font-medium tabular-nums">
                    {version[metric.key]}
                    {metric.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Version 3 converts <span className="font-medium text-foreground">2.4× more interviews</span>{" "}
        than version 1 — the metric-heavy bullets did the work.
      </p>
    </div>
  );
}

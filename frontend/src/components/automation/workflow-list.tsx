"use client";

import * as React from "react";

import { STATUS_META, type Workflow } from "@/components/automation/data";
import { Clock } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";

interface WorkflowListProps {
  workflows: Workflow[];
  selectedId: string | null;
  onSelect: (workflow: Workflow) => void;
}

/** Left column — every automation workflow at a glance. */
export function WorkflowList({ workflows, selectedId, onSelect }: WorkflowListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {workflows.map((workflow) => {
        const meta = STATUS_META[workflow.status];
        const selected = workflow.id === selectedId;
        return (
          <article
            key={workflow.id}
            role="button"
            tabIndex={0}
            aria-label={`${workflow.name} — ${meta.label}`}
            aria-current={selected || undefined}
            onClick={() => onSelect(workflow)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(workflow);
              }
            }}
            className={cn(
              "flex cursor-pointer flex-col gap-2 rounded-xl bg-card p-3 ring-1 transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "bg-accent/40 ring-2 ring-primary/60"
                : "ring-foreground/10 hover:ring-foreground/25"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2">
                <StatusDot tone={meta.dotTone} size="sm" />
                <span className="truncate font-heading text-sm font-medium">
                  {workflow.name}
                </span>
              </span>
              <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
            </div>

            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden className="size-3" />
                Last: {workflow.lastRun}
              </span>
              <span>Next: {workflow.nextRun}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground tabular-nums">
                {workflow.executions.toLocaleString("en-US")} runs
              </span>
              <span
                className={cn(
                  "font-medium tabular-nums",
                  workflow.successRate >= 95
                    ? "text-success"
                    : workflow.successRate >= 85
                      ? "text-warning"
                      : "text-destructive"
                )}
              >
                {workflow.successRate}% success
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

"use client";

import * as React from "react";

import {
  JOB_SOURCES,
  STATUS_META,
  type LogStatus,
  type Workflow,
} from "@/components/automation/data";
import { ExecutionLogs } from "@/components/automation/execution-logs";
import {
  CalendarClock,
  Check,
  Copy,
  MoreHorizontal,
  Pause,
  Play,
  Plug,
  Repeat,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  X,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";

const STEP_TONE: Record<LogStatus, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-destructive/10 text-destructive",
};

interface WorkflowDetailProps {
  workflow: Workflow;
  runningNow: boolean;
  onRunNow: (workflow: Workflow) => void;
  onToggle: (workflow: Workflow) => void;
  onDuplicate: (workflow: Workflow) => void;
  onDelete: (workflow: Workflow) => void;
}

/** Center column — everything about the selected workflow. */
export function WorkflowDetail({
  workflow,
  runningNow,
  onRunNow,
  onToggle,
  onDuplicate,
  onDelete,
}: WorkflowDetailProps) {
  const meta = STATUS_META[workflow.status];
  const paused = workflow.status === "paused";
  const sources = JOB_SOURCES.filter((s) => workflow.sources.includes(s.id));

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusDot tone={meta.dotTone} />
          <h2 className="font-heading text-base font-semibold">{workflow.name}</h2>
          <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              size="sm"
              loading={runningNow}
              onClick={() => onRunNow(workflow)}
            >
              {!runningNow && <Play data-icon="inline-start" />}
              {runningNow ? "Running…" : "Run Now"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onToggle(workflow)}>
              {paused ? (
                <>
                  <Play data-icon="inline-start" />
                  Resume
                </>
              ) : (
                <>
                  <Pause data-icon="inline-start" />
                  Pause
                </>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`More actions for ${workflow.name}`}
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onDuplicate(workflow)}>
                  <Copy /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => onDelete(workflow)}
                >
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {workflow.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarClock aria-hidden className="size-3.5" />
            {workflow.schedule}
          </span>
          <span>Last run: {workflow.lastRun}</span>
          <span>Next run: {workflow.nextRun}</span>
          <span className="inline-flex items-center gap-1">
            <Repeat aria-hidden className="size-3.5" />
            {workflow.executions.toLocaleString("en-US")} executions
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
      </div>

      {/* Recent results */}
      {workflow.results.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {workflow.results.map((result) => (
            <div
              key={result.label}
              className="flex flex-col gap-0.5 rounded-lg bg-accent/40 px-3 py-2"
            >
              <span className="font-heading text-lg font-semibold tabular-nums">
                {result.value}
              </span>
              <span className="text-xs text-muted-foreground">{result.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Latest run timeline */}
      <section className="flex flex-col gap-2.5" aria-label="Latest run timeline">
        <h3 className="font-heading text-sm font-semibold">Latest run</h3>
        <ol className="relative flex flex-col gap-3.5">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[13px] w-px bg-border"
          />
          {workflow.timeline.map((step, index) => (
            <li key={`${step.time}-${index}`} className="relative flex gap-3">
              <span
                className={cn(
                  "z-10 grid size-7 shrink-0 place-items-center rounded-full ring-4 ring-card",
                  STEP_TONE[step.status]
                )}
              >
                {step.status === "error" ? (
                  <X aria-hidden className="size-3.5" />
                ) : step.status === "warning" ? (
                  <Sparkles aria-hidden className="size-3.5" />
                ) : (
                  <Check aria-hidden className="size-3.5" />
                )}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <span className="text-sm font-medium">{step.title}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {step.time}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* AI decisions */}
      {(workflow.decisions.selected.length > 0 ||
        workflow.decisions.skipped.length > 0) && (
        <>
          <Separator />
          <section className="flex flex-col gap-3" aria-label="AI decisions">
            <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
              <Sparkles aria-hidden className="size-3.5 text-primary" />
              AI decisions — last run
            </h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {workflow.decisions.selected.length > 0 && (
                <div className="flex flex-col gap-2 rounded-xl p-3 ring-1 ring-success/25">
                  <span className="text-xs font-semibold text-success">
                    Selected ({workflow.decisions.selected.length})
                  </span>
                  {workflow.decisions.selected.map((decision) => (
                    <div key={decision.role} className="flex flex-col gap-1">
                      <span className="text-xs font-medium">
                        {decision.role}
                        <span className="text-muted-foreground"> · {decision.company}</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {decision.reasons.map((reason) => (
                          <Badge key={reason} variant="success">
                            <Check /> {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {workflow.decisions.skipped.length > 0 && (
                <div className="flex flex-col gap-2 rounded-xl p-3 ring-1 ring-foreground/10">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Skipped ({workflow.decisions.skipped.length})
                  </span>
                  {workflow.decisions.skipped.map((decision) => (
                    <div
                      key={decision.role}
                      className="flex flex-wrap items-center justify-between gap-1.5"
                    >
                      <span className="text-xs">
                        {decision.role}
                        <span className="text-muted-foreground"> · {decision.company}</span>
                      </span>
                      <Badge variant="draft">
                        <X /> {decision.reasons[0]}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Separator />

      {/* Rules */}
      <section className="flex flex-col gap-2.5" aria-label="Automation rules">
        <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
          <SlidersHorizontal aria-hidden className="size-3.5 text-muted-foreground" />
          Rules
        </h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
          {workflow.rules.map((rule) => (
            <div
              key={rule.label}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 ring-1 ring-foreground/10"
            >
              <dt className="text-xs text-muted-foreground">{rule.label}</dt>
              <dd className="text-xs font-medium">{rule.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Connected sources */}
      <section className="flex flex-col gap-2.5" aria-label="Connected sources">
        <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
          <Plug aria-hidden className="size-3.5 text-muted-foreground" />
          Connected sources
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {sources.map((source) => (
            <span
              key={source.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-medium ring-1 ring-foreground/10"
            >
              <StatusDot
                tone={
                  source.status === "connected"
                    ? "success"
                    : source.status === "syncing"
                      ? "running"
                      : "error"
                }
                size="sm"
              />
              {source.name}
            </span>
          ))}
        </div>
      </section>

      <Separator />

      <ExecutionLogs workflowName={workflow.name} logs={workflow.logs} />
    </div>
  );
}

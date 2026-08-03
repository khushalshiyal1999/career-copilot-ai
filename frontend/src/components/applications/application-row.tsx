"use client";

import * as React from "react";

import {
  countdownLabel,
  daysAgoLabel,
  STAGE_LABEL,
  STATUS_META,
  type Application,
  type Priority,
} from "@/components/applications/data";
import { CompanyMark } from "@/components/dashboard/company-mark";
import {
  BadgeCheck,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Minus,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const PRIORITY_META: Record<
  Priority,
  { label: string; icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  high: { label: "High priority", icon: ChevronUp, className: "text-destructive" },
  medium: { label: "Medium priority", icon: Minus, className: "text-warning" },
  low: { label: "Low priority", icon: ChevronDown, className: "text-muted-foreground/60" },
};

export function PriorityIcon({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority];
  const Icon = meta.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="img"
          aria-label={meta.label}
          className="grid size-4 shrink-0 place-items-center"
        >
          <Icon className={cn("size-3.5", meta.className)} />
        </span>
      </TooltipTrigger>
      <TooltipContent>{meta.label}</TooltipContent>
    </Tooltip>
  );
}

/** Stage chip colored by the application's status family. */
export function StageBadge({ app }: { app: Application }) {
  const meta = STATUS_META[app.status];
  const label =
    app.status === "withdrawn" || app.status === "accepted"
      ? meta.label
      : STAGE_LABEL[app.stage];
  return (
    <Badge variant={meta.badgeVariant} className={meta.badgeClass}>
      {label}
    </Badge>
  );
}

interface ApplicationRowProps {
  app: Application;
  selected: boolean;
  onSelect: (app: Application) => void;
}

/** One application in the left-panel list. */
export function ApplicationRow({ app, selected, onSelect }: ApplicationRowProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(app);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${app.role} at ${app.company.name}`}
      aria-current={selected || undefined}
      onClick={() => onSelect(app)}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/app flex cursor-pointer items-start gap-3 rounded-xl bg-card p-3.5 ring-1 transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "bg-accent/40 ring-2 ring-primary/60"
          : "ring-foreground/10 hover:ring-foreground/25"
      )}
    >
      <CompanyMark company={app.company} size="lg" className="mt-0.5" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <h3 className="min-w-0 truncate font-heading text-sm font-medium">
            {app.role}
          </h3>
          <PriorityIcon priority={app.priority} />
        </div>

        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            {app.company.name}
            {app.company.verified && (
              <BadgeCheck aria-label="Verified company" className="size-3 text-info" />
            )}
          </span>
          <span aria-hidden>·</span>
          <span>{app.source}</span>
          <span aria-hidden>·</span>
          <span>Applied {daysAgoLabel(app.appliedDaysAgo).toLowerCase()}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-medium tabular-nums">{app.salaryLabel}</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <MapPin aria-hidden className="size-3" />
            {app.location}
          </span>
        </div>

        <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
          <StageBadge app={app} />
          {app.nextInterview && (
            <span className="inline-flex items-center gap-1 rounded-4xl bg-info/10 px-2 py-0.5 text-xs font-medium text-info">
              <CalendarClock aria-hidden className="size-3" />
              {countdownLabel(app.nextInterview.inDays)} · {app.nextInterview.time}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5 pt-0.5">
        <span
          className={cn(
            "font-heading text-sm font-semibold tabular-nums",
            app.match >= 90
              ? "text-success"
              : app.match >= 80
                ? "text-info"
                : "text-muted-foreground"
          )}
        >
          {app.match}%
        </span>
        <span className="text-[10px] text-muted-foreground">AI match</span>
      </div>
    </article>
  );
}

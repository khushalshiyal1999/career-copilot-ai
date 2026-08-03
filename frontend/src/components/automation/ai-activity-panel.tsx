"use client";

import * as React from "react";

import {
  AI_INSIGHTS,
  NOTIFICATIONS_SEED,
  type ActivityItem,
  type NotificationItem,
} from "@/components/automation/data";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { Emphasis } from "@/components/dashboard/emphasis";
import {
  Activity,
  Bell,
  CalendarDays,
  FileText,
  Pause,
  Radar,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";

/* ---------------- AI assistant ---------------- */

export interface AiAssistantHandlers {
  onOptimizeResume: () => void;
  onIncreaseLimit: () => void;
  onReviewSkipped: () => void;
  onTailorResume: () => void;
  onPauseAll: () => void;
}

export function AiAssistantCard({
  allPaused,
  onOptimizeResume,
  onIncreaseLimit,
  onReviewSkipped,
  onTailorResume,
  onPauseAll,
}: AiAssistantHandlers & { allPaused: boolean }) {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl bg-card p-4 ring-1 ring-primary/20">
      <div className="flex items-center gap-3">
        <AiAvatar />
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold">CareerCopilot</span>
          <span className="text-xs text-muted-foreground">
            {allPaused ? "Standing by — automations paused" : "Working in the background"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {AI_INSIGHTS.map((insight) => (
          <p
            key={insight}
            className="rounded-2xl rounded-tl-sm bg-accent/60 px-3 py-2 text-xs leading-relaxed"
          >
            <Emphasis text={insight} strongClassName="text-primary" />
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 border-t pt-3">
        <div className="grid grid-cols-2 gap-1.5">
          <Button variant="ai" size="sm" onClick={onOptimizeResume}>
            <Sparkles data-icon="inline-start" />
            Optimize Resume
          </Button>
          <Button variant="outline" size="sm" onClick={onIncreaseLimit}>
            <TrendingUp data-icon="inline-start" />
            Raise Daily Limit
          </Button>
          <Button variant="outline" size="sm" onClick={onReviewSkipped}>
            <Search data-icon="inline-start" />
            Review Skipped
          </Button>
          <Button variant="outline" size="sm" onClick={onTailorResume}>
            <Target data-icon="inline-start" />
            Tailor Resume
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onPauseAll} disabled={allPaused}>
          <Pause data-icon="inline-start" />
          Pause All Automation
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Live activity ---------------- */

const TONE_DOT: Record<ActivityItem["tone"], "info" | "success" | "warning" | "running"> = {
  info: "info",
  success: "success",
  warning: "warning",
  running: "running",
};

export function LiveActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Activity aria-hidden className="size-3.5 text-muted-foreground" />
        Live Activity
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium text-success">
          <StatusDot tone="running" size="sm" pulse />
          LIVE
        </span>
      </h3>
      <ol className="flex flex-col gap-2" aria-live="polite">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-2.5">
            <StatusDot
              tone={TONE_DOT[item.tone]}
              size="sm"
              pulse={item.tone === "running"}
              className="mt-1.5"
              aria-label={item.tone}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <p
                className={cn(
                  "text-xs leading-relaxed",
                  item.tone === "running" && "text-muted-foreground italic"
                )}
              >
                {item.text}
              </p>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {item.time}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- Notifications ---------------- */

const NOTIFICATION_META: Record<
  NotificationItem["kind"],
  { icon: LucideIcon; className: string }
> = {
  application: { icon: Send, className: "bg-info/10 text-info" },
  interview: { icon: CalendarDays, className: "bg-success/10 text-success" },
  resume: { icon: FileText, className: "bg-primary/10 text-primary" },
  paused: { icon: Pause, className: "bg-muted text-muted-foreground" },
  scan: { icon: Radar, className: "bg-info/10 text-info" },
};

export function NotificationsCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Bell aria-hidden className="size-3.5 text-muted-foreground" />
        Notifications
      </h3>
      <ol className="flex flex-col gap-2.5">
        {NOTIFICATIONS_SEED.map((notification) => {
          const meta = NOTIFICATION_META[notification.kind];
          const Icon = meta.icon;
          return (
            <li key={notification.id} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-lg",
                  meta.className
                )}
              >
                <Icon aria-hidden className="size-3" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs leading-relaxed">{notification.text}</p>
                <span className="text-[10px] text-muted-foreground">
                  {notification.time}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

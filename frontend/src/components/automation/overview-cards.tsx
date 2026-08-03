"use client";

import * as React from "react";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import { type Workflow } from "@/components/automation/data";
import {
  Bot,
  CalendarDays,
  FileText,
  Search,
  Send,
  Target,
  Workflow as WorkflowIcon,
  type LucideIcon,
} from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusDot } from "@/components/ui/status-dot";

export interface OverviewStats {
  jobsFoundToday: number;
  applicationsSubmitted: number;
  resumesOptimized: number;
  interviewsScheduled: number;
  successRate: number;
}

interface OverviewCardsProps {
  workflows: Workflow[];
  stats: OverviewStats;
}

function StatCard({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-card p-3 ring-1 ring-foreground/10">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon aria-hidden className="size-3.5" />
        {label}
      </span>
      <span className="font-heading text-xl font-semibold tabular-nums">
        {children}
      </span>
    </div>
  );
}

/** Mission-control header — live counters across the whole automation fleet. */
export function OverviewCards({ workflows, stats }: OverviewCardsProps) {
  const running = workflows.filter((w) => w.status === "running").length;
  const allPaused = running === 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
      <StatCard icon={Bot} label="Automation Status">
        <span className="flex items-center gap-2 text-base">
          <StatusDot tone={allPaused ? "neutral" : "running"} size="lg" />
          {allPaused ? "Paused" : "Active"}
        </span>
      </StatCard>
      <StatCard icon={WorkflowIcon} label="Running Jobs">
        <AnimatedNumber value={running} />
      </StatCard>
      <StatCard icon={Search} label="Jobs Found Today">
        <AnimatedNumber value={stats.jobsFoundToday} />
      </StatCard>
      <StatCard icon={Send} label="Applications Submitted">
        <AnimatedNumber value={stats.applicationsSubmitted} />
      </StatCard>
      <StatCard icon={FileText} label="Resumes Optimized">
        <AnimatedNumber value={stats.resumesOptimized} />
      </StatCard>
      <StatCard icon={CalendarDays} label="Interviews Scheduled">
        <AnimatedNumber value={stats.interviewsScheduled} />
      </StatCard>
      <StatCard icon={Target} label="Success Rate">
        <AnimatedNumber value={stats.successRate} suffix="%" />
      </StatCard>
    </div>
  );
}

export function OverviewCardsSkeleton() {
  return (
    <div
      aria-hidden
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7"
    >
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
        >
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  );
}

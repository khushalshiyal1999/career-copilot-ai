"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

import {
  AI_INSIGHTS,
  GOALS_SEED,
  WEEKLY_REPORT,
  type Goal,
} from "@/components/analytics/data";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { Emphasis } from "@/components/dashboard/emphasis";
import {
  Building2,
  FileText,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

/** The AI's read on all the numbers, plus next actions. */
export function AiInsightsCard() {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl bg-card p-4 ring-1 ring-primary/20">
      <div className="flex items-center gap-3">
        <AiAvatar />
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold">CareerCopilot</span>
          <span className="text-xs text-muted-foreground">
            Reviewing 3 months of performance
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

      <div className="grid grid-cols-2 gap-1.5 border-t pt-3">
        <Button variant="ai" size="sm" asChild>
          <Link href={ROUTES.resumes}>
            <FileText data-icon="inline-start" />
            Optimize Resume
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={ROUTES.settings}>
            <Target data-icon="inline-start" />
            Review Skills
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success("Daily automation limit raised to 12 — effective tomorrow 09:00.")
          }
        >
          <TrendingUp data-icon="inline-start" />
          Raise Auto Limit
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={ROUTES.companies}>
            <Building2 data-icon="inline-start" />
            Similar Companies
          </Link>
        </Button>
      </div>
    </div>
  );
}

/** Monday-morning AI report. */
export function WeeklyReportCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
          <Sparkles aria-hidden className="size-3.5 text-primary" />
          Weekly Report
        </h3>
        <span className="text-[10px] text-muted-foreground">{WEEKLY_REPORT.period}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {WEEKLY_REPORT.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5 rounded-lg bg-accent/40 px-3 py-2">
            <span className="font-heading text-lg font-semibold tabular-nums">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      <dl className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Best company</dt>
          <dd className="font-medium">{WEEKLY_REPORT.bestCompany}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Weakest area</dt>
          <dd className="font-medium text-warning">{WEEKLY_REPORT.weakestArea}</dd>
        </div>
      </dl>

      <p className="rounded-lg bg-accent/50 px-3 py-2 text-xs leading-relaxed ring-1 ring-primary/15">
        <span className="font-semibold">Recommendation: </span>
        {WEEKLY_REPORT.recommendation}
      </p>
    </div>
  );
}

/** User-defined goals with visual progress and quick add. */
export function GoalsCard() {
  const [goals, setGoals] = React.useState<Goal[]>(GOALS_SEED);
  const [label, setLabel] = React.useState("");
  const [target, setTarget] = React.useState("");

  const addGoal = () => {
    const parsedTarget = Number(target);
    if (!label.trim() || !Number.isFinite(parsedTarget) || parsedTarget <= 0) {
      toast.error("Give the goal a name and a numeric target.");
      return;
    }
    setGoals((prev) => [
      ...prev,
      { id: `g-${Date.now()}`, label: label.trim(), target: parsedTarget, current: 0 },
    ]);
    setLabel("");
    setTarget("");
    toast.success(`Goal added — I'll track "${label.trim()}" for you.`);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Target aria-hidden className="size-3.5 text-muted-foreground" />
        Goals
      </h3>

      <div className="flex flex-col gap-2.5">
        {goals.map((goal) => {
          const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
          const done = pct >= 100;
          return (
            <div key={goal.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="truncate">{goal.label}</span>
                <span
                  className={cn(
                    "shrink-0 font-medium tabular-nums",
                    done ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {goal.current} / {goal.target}
                </span>
              </div>
              <span className="h-1.5 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn(
                    "block h-full rounded-full transition-all duration-700",
                    done ? "bg-success" : pct >= 60 ? "bg-primary" : "bg-info"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1.5 border-t pt-3">
        <Input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="New goal…"
          aria-label="Goal name"
          className="h-7 flex-1 text-xs"
        />
        <Input
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          placeholder="Target"
          aria-label="Goal target"
          inputMode="numeric"
          className="h-7 w-16 text-xs"
        />
        <Button variant="outline" size="icon-sm" aria-label="Add goal" onClick={addGoal}>
          <Plus />
        </Button>
      </div>
    </div>
  );
}

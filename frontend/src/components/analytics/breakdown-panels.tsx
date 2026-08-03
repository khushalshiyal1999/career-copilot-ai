"use client";

import * as React from "react";

import {
  AUTOMATION_ANALYTICS,
  COMPANY_ANALYTICS,
  SALARY_ANALYTICS,
  SKILL_DEMAND,
} from "@/components/analytics/data";
import { companyById } from "@/components/companies/data";
import { AnimatedNumber } from "@/components/dashboard/animated-number";
import { CompanyMark } from "@/components/dashboard/company-mark";
import {
  Banknote,
  Bot,
  Building2,
  Check,
  Target,
  TrendingUp,
  X,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Icon aria-hidden className="size-3.5 text-muted-foreground" />
        {title}
      </h3>
      {children}
    </div>
  );
}

/** Five short leaderboards over your target companies. */
export function CompanyAnalytics() {
  return (
    <Panel title="Company Analytics" icon={Building2}>
      <div className="grid gap-4 sm:grid-cols-2">
        {COMPANY_ANALYTICS.map((group) => (
          <div
            key={group.title}
            className={cn(
              "flex flex-col gap-2",
              group.title === "Active processes" && "sm:col-span-2"
            )}
          >
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </span>
            <div
              className={cn(
                "flex flex-col gap-1.5",
                group.title === "Active processes" && "sm:flex-row sm:flex-wrap"
              )}
            >
              {group.rows.map((row) => {
                const company = companyById(row.companyId);
                return (
                  <span key={`${group.title}-${row.name}`} className="flex items-center gap-2 text-xs">
                    {company && <CompanyMark company={company} className="size-6 text-xs" />}
                    <span className="font-medium">{row.name}</span>
                    <span className="text-muted-foreground tabular-nums">{row.value}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** Market demand per skill, with have/missing/trending flags. */
export function SkillsAnalytics() {
  return (
    <Panel title="Skills & Market Demand" icon={Target}>
      <div className="flex flex-col gap-2">
        {SKILL_DEMAND.map((skill) => (
          <div key={skill.name} className="flex items-center gap-3">
            <span className="flex w-28 shrink-0 items-center gap-1.5 text-xs">
              {skill.have ? (
                <Check aria-hidden className="size-3 text-success" />
              ) : (
                <X aria-hidden className="size-3 text-destructive" />
              )}
              {skill.name}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className={cn(
                  "block h-full rounded-full transition-all duration-700",
                  skill.have ? "bg-primary" : "bg-destructive/60"
                )}
                style={{ width: `${skill.demand}%` }}
              />
            </span>
            <span className="w-8 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
              {skill.demand}%
            </span>
            {skill.trending && (
              <Badge variant="info" className="shrink-0">
                <TrendingUp /> Trending
              </Badge>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-destructive">GraphQL</span> is your only gap in the
        top 8 — it appears in 58% of your target listings.
      </p>
    </Panel>
  );
}

/** Expected vs offered vs market. */
export function SalaryAnalytics() {
  return (
    <Panel title="Salary Analytics" icon={Banknote}>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        {(
          [
            ["Expected salary", SALARY_ANALYTICS.expected],
            ["Average offer", SALARY_ANALYTICS.averageOffer],
            ["Highest offer", SALARY_ANALYTICS.highestOffer],
            ["Market average", SALARY_ANALYTICS.marketAverage],
            ["Salary growth", SALARY_ANALYTICS.growth],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2 border-t pt-3">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Desired vs received
        </span>
        {(
          [
            ["Desired", SALARY_ANALYTICS.desiredPct, "bg-muted-foreground/40"],
            ["Received (avg)", SALARY_ANALYTICS.receivedPct, "bg-success"],
          ] as const
        ).map(([label, pct, tone]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-muted-foreground">{label}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className={cn("block h-full rounded-full transition-all duration-700", tone)}
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="w-8 shrink-0 text-right text-xs tabular-nums">{pct}%</span>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          Offers are landing at <span className="font-medium text-foreground">92% of your ask</span> —
          within normal negotiation range.
        </p>
      </div>
    </Panel>
  );
}

/** What the automation did on your behalf. */
export function AutomationAnalytics() {
  return (
    <Panel title="Automation Analytics" icon={Bot}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {AUTOMATION_ANALYTICS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5 rounded-lg bg-accent/40 px-3 py-2">
            <span className="font-heading text-lg font-semibold tabular-nums">
              <AnimatedNumber value={stat.value} />
            </span>
            <span className="text-[10px] leading-tight text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-success">96% success rate</span> — the automation
        skipped 316 low-fit roles so you never saw them.
      </p>
    </Panel>
  );
}

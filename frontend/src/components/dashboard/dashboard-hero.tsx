"use client";

import * as React from "react";
import Link from "next/link";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { Emphasis } from "@/components/dashboard/emphasis";
import { CalendarDays, Clock, Search, Upload, Zap } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { ROUTES } from "@/constants/routes";

function timeGreeting(hour: number) {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const subscribeNever = () => () => {};

const BRIEFING =
  "While you were away I scanned **128 postings**, shortlisted **37 strong matches**, and queued **2 resumes** for tailoring.";

const URGENT = [
  {
    icon: Clock,
    label: "3 roles close applications this week",
    href: ROUTES.jobs,
    tone: "text-warning",
  },
  {
    icon: CalendarDays,
    label: "Google round 2 — prep by tomorrow",
    href: ROUTES.applications,
    tone: "text-success",
  },
];

/** AI-briefing hero: greeting, copilot summary, urgent items, quick actions. */
export function DashboardHero({ name }: { name: string }) {
  // The prerendered HTML can't know the visitor's local time, so hydrate
  // from a neutral server snapshot to the real greeting without a mismatch.
  const greeting = React.useSyncExternalStore(
    subscribeNever,
    () => timeGreeting(new Date().getHours()),
    () => "Welcome back"
  );

  return (
    <section className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-card/70 py-1 pr-3 pl-1 text-xs ring-1 ring-foreground/10 backdrop-blur">
          <AiAvatar size="sm" className="rounded-full" />
          <StatusDot tone="running" size="sm" />
          <span className="font-medium">CareerCopilot active</span>
          <span className="hidden text-muted-foreground sm:inline">
            · scanning 4 job boards
          </span>
        </span>

        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {greeting},{" "}
          <span className="bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_45%)] bg-clip-text text-transparent">
            {name}
          </span>{" "}
          <span aria-hidden>👋</span>
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground">
          <Emphasis text={BRIEFING} />
        </p>

        <div className="flex flex-wrap gap-2">
          {URGENT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5 text-xs font-medium ring-1 ring-foreground/10 backdrop-blur transition-all hover:-translate-y-px hover:ring-foreground/25"
            >
              <item.icon aria-hidden className={`size-3.5 ${item.tone}`} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="lg" asChild>
          <Link href={ROUTES.jobs}>
            <Search data-icon="inline-start" />
            Search Jobs
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href={ROUTES.resumes}>
            <Upload data-icon="inline-start" />
            Upload Resume
          </Link>
        </Button>
        <Button variant="ai" size="lg" asChild>
          <Link href={ROUTES.automation}>
            <Zap data-icon="inline-start" />
            Start Automation
          </Link>
        </Button>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Send,
  Target,
  type LucideIcon,
} from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/* ---------------------------------- Mini visualizations ---------------------------------- */

const JOBS_SPARK = [18, 24, 21, 29, 26, 33, 37];

/** 7-day area sparkline. */
function Sparkline({ data }: { data: number[] }) {
  const reducedMotion = useReducedMotion();
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 26 - ((v - min) / (max - min)) * 22;
    return [x, y] as const;
  });
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,30 ${line} 100,30`;

  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="h-8 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-fill)" />
      <motion.polyline
        points={line}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}

const WEEK_BARS = [4, 7, 3, 9, 6, 8, 12];

/** This week's daily bars; today highlighted. */
function MiniBars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div aria-hidden className="flex h-8 items-end gap-1">
      {data.map((v, i) => (
        <span
          key={i}
          className={cn(
            "min-h-1 flex-1 rounded-sm",
            i === data.length - 1 ? "bg-primary" : "bg-primary/20"
          )}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

const MINI_RING_RADIUS = 13;
const MINI_RING_CIRCUMFERENCE = 2 * Math.PI * MINI_RING_RADIUS;

/** Small donut for percentage metrics. */
function MiniRing({ percent }: { percent: number }) {
  const reducedMotion = useReducedMotion();
  const target = MINI_RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <svg viewBox="0 0 32 32" className="size-8 -rotate-90" aria-hidden>
      <circle
        cx="16"
        cy="16"
        r={MINI_RING_RADIUS}
        fill="none"
        strokeWidth="4"
        className="stroke-muted"
      />
      <motion.circle
        cx="16"
        cy="16"
        r={MINI_RING_RADIUS}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={MINI_RING_CIRCUMFERENCE}
        className="stroke-success"
        initial={
          reducedMotion
            ? { strokeDashoffset: target }
            : { strokeDashoffset: MINI_RING_CIRCUMFERENCE }
        }
        animate={{ strokeDashoffset: target }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}

/** Thin gradient gauge for the match score. */
function GradientGauge({ percent }: { percent: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <div aria-hidden className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full rounded-full bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)]"
        initial={reducedMotion ? { width: `${percent}%` } : { width: "0%" }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

/* --------------------------------------- Cards --------------------------------------- */

interface StatCardProps {
  label: string;
  icon: LucideIcon;
  value: React.ReactNode;
  delta: string;
  caption: string;
  children?: React.ReactNode;
  /** Rendered beside the value instead of below the caption. */
  aside?: React.ReactNode;
}

function StatCard({
  label,
  icon: Icon,
  value,
  delta,
  caption,
  children,
  aside,
}: StatCardProps) {
  return (
    <Card className="h-full gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:ring-foreground/20">
      <CardContent className="flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground"
          >
            <Icon className="size-4" />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success tabular-nums">
            <ArrowUpRight aria-hidden className="size-3.5" />
            {delta}
          </span>
          {aside && <span className="ml-auto">{aside}</span>}
        </div>
        {children}
        <p className="mt-auto text-xs text-muted-foreground">{caption}</p>
      </CardContent>
    </Card>
  );
}

export function StatsGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <FadeIn>
        <StatCard
          label="Jobs Found Today"
          icon={Briefcase}
          value={<AnimatedNumber value={37} />}
          delta="+12%"
          caption="From 4 connected job boards"
        >
          <Sparkline data={JOBS_SPARK} />
        </StatCard>
      </FadeIn>
      <FadeIn delay={0.05}>
        <StatCard
          label="Applications Sent"
          icon={Send}
          value={<AnimatedNumber value={12} />}
          delta="+8%"
          caption="This week, 5 auto-tailored"
        >
          <MiniBars data={WEEK_BARS} />
        </StatCard>
      </FadeIn>
      <FadeIn delay={0.1}>
        <StatCard
          label="Interview Rate"
          icon={CalendarDays}
          value={<AnimatedNumber value={18} suffix="%" />}
          delta="+2.4pts"
          caption="vs. 12% industry average"
          aside={<MiniRing percent={18} />}
        />
      </FadeIn>
      <FadeIn delay={0.15}>
        <StatCard
          label="AI Match Score"
          icon={Target}
          value={
            <span className="bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)] bg-clip-text text-transparent">
              <AnimatedNumber value={92} suffix="%" />
            </span>
          }
          delta="+3pts"
          caption="Average across today's matches"
        >
          <GradientGauge percent={92} />
        </StatCard>
      </FadeIn>
    </section>
  );
}

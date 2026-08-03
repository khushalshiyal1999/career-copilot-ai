"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import { RESUME_HEALTH } from "@/components/dashboard/data";
import { Plus, Wand2 } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ScoreRing({ score }: { score: number }) {
  const reducedMotion = useReducedMotion();
  const target = RING_CIRCUMFERENCE * (1 - score / 100);

  return (
    <div
      className="relative size-28 shrink-0"
      role="img"
      aria-label={`Resume score ${score} out of 100`}
    >
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <defs>
          <linearGradient id="resume-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--info)" />
          </linearGradient>
        </defs>
        <circle
          cx="40"
          cy="40"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="7"
          className="stroke-muted"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          stroke="url(#resume-ring)"
          initial={
            reducedMotion
              ? { strokeDashoffset: target }
              : { strokeDashoffset: RING_CIRCUMFERENCE }
          }
          animate={{ strokeDashoffset: target }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="flex flex-col items-center">
          <span className="font-heading text-2xl font-semibold tabular-nums">
            <AnimatedNumber value={score} />
          </span>
          <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Score
          </span>
        </span>
      </span>
    </div>
  );
}

function AtsBar({ percent }: { percent: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-muted-foreground">
          ATS compatibility
        </span>
        <span className="font-semibold text-success tabular-nums">
          <AnimatedNumber value={percent} suffix="%" />
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-success"
          initial={reducedMotion ? { width: `${percent}%` } : { width: "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-muted-foreground">
        Parses cleanly in Workday, Greenhouse, and Lever.
      </span>
    </div>
  );
}

export function ResumeHealth() {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:ring-foreground/20">
      <CardHeader>
        <CardTitle>Resume Health</CardTitle>
        <CardDescription>
          khushal_frontend_2026.pdf, scored against your target roles.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <ScoreRing score={RESUME_HEALTH.score} />
          <span className="text-xs text-muted-foreground">
            Top 20% for senior frontend
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <AtsBar percent={RESUME_HEALTH.ats} />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Missing skills recruiters search for
            </span>
            <div className="flex flex-wrap gap-1.5">
              {RESUME_HEALTH.missingSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="gap-1">
                  <Plus aria-hidden />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <ul className="flex flex-col gap-2">
            {RESUME_HEALTH.suggestions.map((suggestion) => (
              <li
                key={suggestion.text}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-muted-foreground">{suggestion.text}</span>
                <Badge variant="success" className="shrink-0 tabular-nums">
                  {suggestion.impact}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ai" size="sm" asChild>
          <Link href={ROUTES.resumes}>
            <Wand2 data-icon="inline-start" />
            Improve with AI
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

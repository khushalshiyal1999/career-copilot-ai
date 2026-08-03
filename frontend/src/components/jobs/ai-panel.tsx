"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { CompanyMark } from "@/components/dashboard/company-mark";
import { Emphasis } from "@/components/dashboard/emphasis";
import { JOBS, type Job } from "@/components/jobs/data";
import { FileText, Sparkles, Zap } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface AiPanelProps {
  onOpenJob: (job: Job) => void;
}

const excellent = JOBS.filter((job) => job.match >= 90);
const closing = JOBS.filter((job) => job.closingSoon);
const topThree = [...JOBS].sort((a, b) => b.match - a.match).slice(0, 3);

const MESSAGES = [
  `I found **${excellent.length} jobs** with a **90%+ match** in today's feed.`,
  `**${closing.length} jobs** are closing within 24 hours — don't sit on those.`,
  "You should apply to these first:",
];

/** Desktop-only assistant rail beside the results. */
export function AiPanel({ onOpenJob }: AiPanelProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-primary/20">
      <div className="flex items-center gap-3">
        <AiAvatar />
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold">
            CareerCopilot
          </span>
          <span className="text-xs text-muted-foreground">
            Watching this feed for you
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {MESSAGES.map((message) => (
          <p
            key={message}
            className="rounded-2xl rounded-tl-sm bg-accent/60 px-3 py-2 text-sm leading-relaxed"
          >
            <Emphasis text={message} strongClassName="text-primary" />
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        {topThree.map((job) => (
          <button
            key={job.id}
            type="button"
            onClick={() => onOpenJob(job)}
            className="flex items-center gap-2.5 rounded-lg p-2 text-left ring-1 ring-foreground/10 transition-all hover:ring-foreground/25"
          >
            <CompanyMark company={job.company} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">{job.role}</span>
              <span className="text-xs text-muted-foreground">
                {job.company.name}
              </span>
            </span>
            <span className="text-sm font-semibold text-success tabular-nums">
              {job.match}%
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t pt-4">
        <Button
          variant="ai"
          size="sm"
          onClick={() =>
            toast.success(
              `Queued applications to your top ${topThree.length} matches — I'll tailor each resume.`
            )
          }
        >
          <Zap data-icon="inline-start" />
          Apply to Top Matches
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={ROUTES.resumes}>
            <FileText data-icon="inline-start" />
            Improve Resume
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenJob(topThree[0])}
        >
          <Sparkles data-icon="inline-start" />
          Explain Match
        </Button>
      </div>
    </div>
  );
}

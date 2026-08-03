"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { Emphasis } from "@/components/dashboard/emphasis";
import { AI_SUMMARY_INSIGHTS } from "@/components/settings/data";
import { ArrowUpRight, Sparkles, Target } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface AiSummaryProps {
  /** Bumps Docker + GraphQL priority in the skills list. */
  onApplySkillSuggestion: () => void;
}

/** Always-visible AI read on the whole profile, above the section content. */
export function AiSummary({ onApplySkillSuggestion }: AiSummaryProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-accent/50 p-4 ring-1 ring-primary/15">
      <div className="flex items-center gap-3">
        <AiAvatar />
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold">
            AI profile summary
          </span>
          <span className="text-xs text-muted-foreground">
            Recalculated whenever your settings change
          </span>
        </div>
      </div>
      <div className="grid gap-1.5 lg:grid-cols-3">
        {AI_SUMMARY_INSIGHTS.map((insight) => (
          <p
            key={insight}
            className="rounded-2xl rounded-tl-sm bg-background/70 px-3 py-2 text-xs leading-relaxed"
          >
            <Emphasis text={insight} strongClassName="text-primary" />
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Button variant="ai" size="sm" onClick={onApplySkillSuggestion}>
          <Sparkles data-icon="inline-start" />
          Boost Docker + GraphQL
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success(
              "Salary calibration saved — I'll weight ₹28–35 LPA roles higher in your feed."
            )
          }
        >
          <Target data-icon="inline-start" />
          Calibrate salary targeting
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={ROUTES.jobs}>
            <ArrowUpRight data-icon="inline-start" />
            View matching jobs
          </Link>
        </Button>
      </div>
    </div>
  );
}

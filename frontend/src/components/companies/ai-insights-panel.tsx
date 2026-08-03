"use client";

import * as React from "react";
import { toast } from "sonner";

import { COMPANIES, type CompanyProfile } from "@/components/companies/data";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { CompanyMark } from "@/components/dashboard/company-mark";
import { Emphasis } from "@/components/dashboard/emphasis";
import { Radar, Sparkles, TrendingUp } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface AiInsightsPanelProps {
  onOpenCompany: (company: CompanyProfile) => void;
}

const topPicks = [...COMPANIES].sort((a, b) => b.aiScore - a.aiScore).slice(0, 3);
const fastResponders = COMPANIES.filter((c) => c.responseRate >= 80).length;
const activelyHiring = COMPANIES.filter((c) => c.hiringStatus === "actively-hiring").length;

const MESSAGES = [
  `**${activelyHiring} companies** on your board are actively hiring React engineers right now.`,
  `**${fastResponders} companies** respond to 80%+ of applicants — start there for quick wins.`,
  "You have live processes at **Google, Microsoft, Spotify, and Razorpay** — I've factored that into every verdict.",
  "Where you should apply next, ranked:",
];

/** Desktop rail — the AI's cross-company read. */
export function AiInsightsPanel({ onOpenCompany }: AiInsightsPanelProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-primary/20">
      <div className="flex items-center gap-3">
        <AiAvatar />
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold">CareerCopilot</span>
          <span className="text-xs text-muted-foreground">
            Researching companies for you
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
        {topPicks.map((company) => (
          <button
            key={company.id}
            type="button"
            onClick={() => onOpenCompany(company)}
            className="flex items-center gap-2.5 rounded-lg p-2 text-left ring-1 ring-foreground/10 transition-all hover:ring-foreground/25"
          >
            <CompanyMark company={company} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">{company.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {company.openPositions} open · {company.responseRate}% respond
              </span>
            </span>
            <span className="text-sm font-semibold text-success tabular-nums">
              {company.aiScore}
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
              "Deep research queued on your top 3 — I'll compile funding, attrition, and interview reports."
            )
          }
        >
          <Radar data-icon="inline-start" />
          Deep-research Top 3
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success(
              "Weekly company digest enabled — hiring changes at followed companies, every Monday."
            )
          }
        >
          <TrendingUp data-icon="inline-start" />
          Track Hiring Changes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenCompany(topPicks[0])}
        >
          <Sparkles data-icon="inline-start" />
          Explain Top Pick
        </Button>
      </div>
    </div>
  );
}

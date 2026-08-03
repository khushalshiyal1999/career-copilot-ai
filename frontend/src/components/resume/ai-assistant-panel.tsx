"use client";

import * as React from "react";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import {
  type Difficulty,
  type Impact,
  type Resume,
} from "@/components/resume/data";
import {
  Check,
  Download,
  FileText,
  Lightbulb,
  Plus,
  ScanSearch,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  X,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const IMPACT_VARIANT: Record<Impact, "error" | "warning" | "info"> = {
  High: "error",
  Medium: "warning",
  Low: "info",
};

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  Easy: "text-success",
  Medium: "text-warning",
  Hard: "text-destructive",
};

export interface AiActionsHandlers {
  onOptimize: () => void;
  onTailor: () => void;
  onGenerateCoverLetter: () => void;
  onExportPdf: () => void;
  onExportDocx: () => void;
  onAnalyze: () => void;
}

interface AiAssistantPanelProps extends AiActionsHandlers {
  resume: Resume;
  optimizing: boolean;
  analyzing: boolean;
  onApplySuggestion: (suggestionId: string) => void;
}

/** Right column — the AI's read on the selected resume, plus quick actions. */
export function AiAssistantPanel({
  resume,
  optimizing,
  analyzing,
  onApplySuggestion,
  onOptimize,
  onTailor,
  onGenerateCoverLetter,
  onExportPdf,
  onExportDocx,
  onAnalyze,
}: AiAssistantPanelProps) {
  const pending = resume.suggestions.filter((s) => !s.applied);
  const potential = pending.reduce((sum, s) => sum + s.scoreDelta, 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-primary/20">
      <div className="flex items-center gap-3">
        <AiAvatar />
        <div className="flex min-w-0 flex-col">
          <span className="font-heading text-sm font-semibold">CareerCopilot</span>
          <span className="truncate text-xs text-muted-foreground">
            {potential > 0
              ? `+${potential} ATS still on the table for this resume`
              : "This resume is fully optimized — nice work"}
          </span>
        </div>
      </div>

      {/* Analysis findings */}
      <section className="flex flex-col gap-2" aria-label="AI resume analysis">
        <h3 className="flex items-center gap-1.5 font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <ScanSearch aria-hidden className="size-3.5" />
          Analysis
        </h3>
        <div className="flex flex-col gap-1.5">
          {resume.findings.map((finding) => (
            <div
              key={finding.id}
              className="flex flex-col gap-1.5 rounded-lg bg-accent/40 px-3 py-2"
            >
              <p className="text-xs leading-relaxed">{finding.text}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant={IMPACT_VARIANT[finding.impact]}>
                  {finding.impact} impact
                </Badge>
                <span className="text-xs font-semibold text-success tabular-nums">
                  +{finding.scoreDelta} ATS
                </span>
                <span
                  className={cn(
                    "ml-auto text-[10px] font-medium",
                    DIFFICULTY_CLASS[finding.difficulty]
                  )}
                >
                  {finding.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick-apply suggestions */}
      <section className="flex flex-col gap-2" aria-label="AI suggestions">
        <h3 className="flex items-center gap-1.5 font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Lightbulb aria-hidden className="size-3.5" />
          Suggestions
        </h3>
        <div className="flex flex-col gap-1.5">
          {resume.suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={cn(
                "flex flex-col gap-1.5 rounded-lg p-2.5 ring-1 transition-all",
                suggestion.applied
                  ? "bg-success/5 ring-success/30"
                  : "ring-foreground/10 hover:ring-foreground/25"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium">{suggestion.title}</span>
                <Badge variant={suggestion.applied ? "success" : "outline"}>
                  {suggestion.applied ? (
                    <>
                      <Check /> Applied
                    </>
                  ) : (
                    `+${suggestion.scoreDelta} ATS`
                  )}
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {suggestion.detail}
              </p>
              {!suggestion.applied && (
                <Button
                  variant="outline"
                  size="xs"
                  className="self-start"
                  onClick={() => onApplySuggestion(suggestion.id)}
                >
                  <Wand2 data-icon="inline-start" />
                  Apply with AI
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Skills analysis */}
      <section className="flex flex-col gap-2.5" aria-label="Skills analysis">
        <h3 className="flex items-center gap-1.5 font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Target aria-hidden className="size-3.5" />
          Skills analysis
        </h3>
        {(
          [
            ["Matched", resume.skillsAnalysis.matched, "success"],
            ["Missing", resume.skillsAnalysis.missing, "missing"],
            ["Trending", resume.skillsAnalysis.trending, "trending"],
            ["Suggested", resume.skillsAnalysis.suggested, "suggested"],
          ] as const
        ).map(([label, skills, kind]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={
                    kind === "success"
                      ? "success"
                      : kind === "missing"
                        ? "error"
                        : kind === "trending"
                          ? "info"
                          : "outline"
                  }
                  className={kind === "suggested" ? "border-dashed" : undefined}
                >
                  {kind === "success" && <Check />}
                  {kind === "missing" && <X />}
                  {kind === "trending" && <TrendingUp />}
                  {kind === "suggested" && <Plus />}
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Separator />

      {/* AI actions */}
      <section className="flex flex-col gap-1.5" aria-label="AI actions">
        <Button variant="ai" size="sm" loading={optimizing} onClick={onOptimize}>
          {!optimizing && <Sparkles data-icon="inline-start" />}
          {optimizing ? "Optimizing…" : "Optimize Resume"}
        </Button>
        <div className="grid grid-cols-2 gap-1.5">
          <Button variant="outline" size="sm" onClick={onTailor}>
            <Target data-icon="inline-start" />
            Tailor for Job
          </Button>
          <Button variant="outline" size="sm" onClick={onGenerateCoverLetter}>
            <FileText data-icon="inline-start" />
            Cover Letter
          </Button>
          <Button variant="outline" size="sm" onClick={onExportPdf}>
            <Download data-icon="inline-start" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={onExportDocx}>
            <Download data-icon="inline-start" />
            Generate DOCX
          </Button>
        </div>
        <Button variant="ghost" size="sm" loading={analyzing} onClick={onAnalyze}>
          {!analyzing && <ScanSearch data-icon="inline-start" />}
          {analyzing ? "Analyzing…" : "Analyze ATS"}
        </Button>
      </section>
    </div>
  );
}

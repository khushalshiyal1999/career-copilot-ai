"use client";

import * as React from "react";

import { CompanyMark } from "@/components/dashboard/company-mark";
import { updatedLabel, type CoverLetter } from "@/components/resume/data";
import { Download, FileText, RefreshCw, Sparkles } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CoverLettersProps {
  letters: CoverLetter[];
  onDownload: (letter: CoverLetter) => void;
  onRegenerate: (letter: CoverLetter) => void;
}

/** Recent AI-generated cover letters, tied to the resumes that produced them. */
export function CoverLetters({ letters, onDownload, onRegenerate }: CoverLettersProps) {
  return (
    <section className="flex flex-col gap-2.5" aria-label="Cover letters">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <FileText aria-hidden className="size-3.5 text-muted-foreground" />
        Cover Letters
        <Badge variant="secondary" className="ml-1">
          <Sparkles /> AI generated
        </Badge>
      </h3>

      {letters.length === 0 ? (
        <p className="rounded-xl bg-card p-4 text-sm text-muted-foreground ring-1 ring-foreground/10">
          No cover letters yet — generate one from the AI actions panel.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {letters.map((letter) => (
            <li
              key={letter.id}
              className="flex items-center gap-2.5 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
            >
              <CompanyMark company={letter.company} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">
                  Cover Letter — {letter.company.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {letter.role} · from {letter.resumeName} ·{" "}
                  {updatedLabel(letter.createdDaysAgo)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Download cover letter for ${letter.company.name}`}
                      onClick={() => onDownload(letter)}
                    >
                      <Download />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Regenerate cover letter for ${letter.company.name}`}
                      onClick={() => onRegenerate(letter)}
                    >
                      <RefreshCw />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Regenerate</TooltipContent>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

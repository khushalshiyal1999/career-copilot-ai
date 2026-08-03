"use client";

import * as React from "react";

import {
  atsTier,
  STATUS_META,
  updatedLabel,
  type Resume,
} from "@/components/resume/data";
import {
  Copy,
  Download,
  MoreHorizontal,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ResumeLibraryProps {
  resumes: Resume[];
  selectedId: string | null;
  onSelect: (resume: Resume) => void;
  onCreate: () => void;
  onDuplicate: (resume: Resume) => void;
  onRename: (resume: Resume) => void;
  onDownload: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
  onSetActive: (resume: Resume) => void;
}

/** Left column — every resume, with quick actions. */
export function ResumeLibrary({
  resumes,
  selectedId,
  onSelect,
  onCreate,
  onDuplicate,
  onRename,
  onDownload,
  onDelete,
  onSetActive,
}: ResumeLibraryProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <Button variant="ai" onClick={onCreate}>
        <Plus data-icon="inline-start" />
        Create New Resume
      </Button>

      {resumes.map((resume) => {
        const current = resume.versions[resume.versions.length - 1];
        const tier = atsTier(current.atsScore);
        const status = STATUS_META[resume.status];
        const selected = resume.id === selectedId;

        return (
          <article
            key={resume.id}
            role="button"
            tabIndex={0}
            aria-label={`${resume.name} — ${resume.targetRole}`}
            aria-current={selected || undefined}
            onClick={() => onSelect(resume)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(resume);
              }
            }}
            className={cn(
              "group/resume flex cursor-pointer flex-col gap-2 rounded-xl bg-card p-3 ring-1 transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "bg-accent/40 ring-2 ring-primary/60"
                : "ring-foreground/10 hover:ring-foreground/25"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-col">
                <span className="flex items-center gap-1.5">
                  <span className="truncate font-heading text-sm font-medium">
                    {resume.name}
                  </span>
                  {resume.isActive && (
                    <Star
                      aria-label="Active resume"
                      className="size-3.5 shrink-0 fill-warning text-warning"
                    />
                  )}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {resume.targetRole}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Actions for ${resume.name}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onClick={(event) => event.stopPropagation()}
                >
                  {!resume.isActive && (
                    <DropdownMenuItem onSelect={() => onSetActive(resume)}>
                      <Star /> Set as active
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={() => onDuplicate(resume)}>
                    <Copy /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => onRename(resume)}>
                    <Pencil /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => onDownload(resume)}>
                    <Download /> Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => onDelete(resume)}
                  >
                    <Trash2 /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "font-heading text-sm font-semibold tabular-nums",
                  tier.textClass
                )}
              >
                {current.atsScore}%
              </span>
              <span className="text-[10px] text-muted-foreground">ATS</span>
              <Badge variant={status.badgeVariant}>{status.label}</Badge>
              <Badge variant="outline">v{current.version}</Badge>
              <Badge variant="outline">{resume.fileType}</Badge>
            </div>

            <span className="text-xs text-muted-foreground">
              Updated {updatedLabel(current.createdDaysAgo).toLowerCase()}
            </span>
          </article>
        );
      })}
    </div>
  );
}

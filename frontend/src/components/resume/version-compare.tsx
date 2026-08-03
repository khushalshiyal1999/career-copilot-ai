"use client";

import * as React from "react";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { Emphasis } from "@/components/dashboard/emphasis";
import { updatedLabel, type Resume, type ResumeVersion } from "@/components/resume/data";
import { Check, Minus, Pencil, Plus, X } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function ChangeList({
  title,
  items,
  icon: Icon,
  className,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider",
          className
        )}
      >
        <Icon aria-hidden className="size-3" />
        {title}
      </span>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li
            key={item}
            className="text-xs leading-relaxed text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VersionColumn({
  version,
  latest,
}: {
  version: ResumeVersion;
  latest: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl p-3.5 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-2">
        <span className="font-heading text-sm font-semibold">
          Version {version.version}
        </span>
        {latest && <Badge variant="success">Current</Badge>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-heading text-2xl font-semibold tabular-nums">
          {version.atsScore}%
        </span>
        <span className="text-xs text-muted-foreground">
          ATS · {updatedLabel(version.createdDaysAgo).toLowerCase()}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{version.note}</p>
      <div className="flex flex-col gap-2.5 border-t pt-2.5">
        <ChangeList title="Added" items={version.changes.added} icon={Plus} className="text-success" />
        <ChangeList title="Removed" items={version.changes.removed} icon={X} className="text-destructive" />
        <ChangeList title="Changed" items={version.changes.changed} icon={Pencil} className="text-warning" />
        {version.changes.added.length + version.changes.removed.length + version.changes.changed.length === 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Minus aria-hidden className="size-3" />
            Baseline version
          </span>
        )}
      </div>
    </div>
  );
}

interface VersionCompareDialogProps {
  resume: Resume;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Side-by-side comparison of any two versions of a resume. */
export function VersionCompareDialog({
  resume,
  open,
  onOpenChange,
}: VersionCompareDialogProps) {
  const latest = resume.versions[resume.versions.length - 1];
  const previous = resume.versions[resume.versions.length - 2] ?? latest;

  // The parent keys this dialog by resume + version count, so the defaults
  // re-anchor via remount whenever the compared resume gains a version.
  const [leftVersion, setLeftVersion] = React.useState(previous.version);
  const [rightVersion, setRightVersion] = React.useState(latest.version);

  const left =
    resume.versions.find((v) => v.version === leftVersion) ?? previous;
  const right =
    resume.versions.find((v) => v.version === rightVersion) ?? latest;
  const delta = right.atsScore - left.atsScore;

  const improvement =
    delta > 0
      ? `**+${delta} ATS** between v${left.version} and v${right.version} — ${
          right.breakdown.keywords - left.breakdown.keywords >=
          right.breakdown.formatting - left.breakdown.formatting
            ? "keyword coverage drove most of the gain"
            : "formatting fixes drove most of the gain"
        }.`
      : delta < 0
        ? `v${right.version} scores **${Math.abs(delta)} points lower** than v${left.version} — worth reviewing what was removed.`
        : `Both versions score **${left.atsScore}%** — the changes were structural, not score-moving.`;

  const versionSelect = (
    value: number,
    onChange: (v: number) => void,
    label: string
  ) => (
    <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger aria-label={label} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {resume.versions.map((v) => (
          <SelectItem key={v.version} value={String(v.version)}>
            Version {v.version} · {v.atsScore}%
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Compare versions</DialogTitle>
          <DialogDescription>{resume.name}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          {versionSelect(leftVersion, setLeftVersion, "Left version")}
          {versionSelect(rightVersion, setRightVersion, "Right version")}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <VersionColumn version={left} latest={left.version === latest.version} />
          <VersionColumn version={right} latest={right.version === latest.version} />
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-accent/50 p-3.5 ring-1 ring-primary/15">
          <AiAvatar size="sm" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">AI improvement summary</span>
            <p className="text-sm leading-relaxed">
              <Emphasis text={improvement} strongClassName="text-primary" />
            </p>
          </div>
        </div>

        {delta > 0 && (
          <p className="flex items-center gap-1.5 text-xs text-success">
            <Check aria-hidden className="size-3.5" />
            Every dimension improved or held steady between these versions.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

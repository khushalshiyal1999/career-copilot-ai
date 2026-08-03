"use client";

import * as React from "react";

import {
  updatedLabel,
  type ActivityEntry,
  type ActivityKind,
} from "@/components/resume/data";
import {
  Download,
  FileText,
  History,
  Plus,
  ScanSearch,
  Sparkles,
  Target,
  Upload,
  type LucideIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const KIND_META: Record<ActivityKind, { icon: LucideIcon; className: string }> = {
  uploaded: { icon: Upload, className: "bg-info/10 text-info" },
  optimized: { icon: Sparkles, className: "bg-primary/10 text-primary" },
  tailored: { icon: Target, className: "bg-primary/10 text-primary" },
  cover: { icon: FileText, className: "bg-success/10 text-success" },
  exported: { icon: Download, className: "bg-muted text-muted-foreground" },
  analyzed: { icon: ScanSearch, className: "bg-info/10 text-info" },
  created: { icon: Plus, className: "bg-success/10 text-success" },
};

/** Compact feed of everything that happened across the workspace. */
export function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  const sorted = [...entries].sort((a, b) => a.daysAgo - b.daysAgo);

  return (
    <section className="flex flex-col gap-2.5" aria-label="Activity timeline">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <History aria-hidden className="size-3.5 text-muted-foreground" />
        Activity
      </h3>
      <ol className="flex flex-col gap-2">
        {sorted.slice(0, 6).map((entry) => {
          const meta = KIND_META[entry.kind];
          const Icon = meta.icon;
          return (
            <li key={entry.id} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-lg",
                  meta.className
                )}
              >
                <Icon aria-hidden className="size-3" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs leading-relaxed">{entry.text}</p>
                <span className="text-[10px] text-muted-foreground">
                  {updatedLabel(entry.daysAgo)}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

"use client";

import * as React from "react";

import { NAV_SECTIONS, type SectionId } from "@/components/settings/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SettingsNavProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

/** Left rail — one entry per settings section. */
export function SettingsNav({ active, onSelect }: SettingsNavProps) {
  return (
    <nav aria-label="Settings sections" className="flex flex-col gap-0.5">
      {NAV_SECTIONS.map((section) => {
        const Icon = section.icon;
        const current = section.id === active;
        return (
          <button
            key={section.id}
            type="button"
            aria-current={current ? "page" : undefined}
            onClick={() => onSelect(section.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
              current
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon aria-hidden className="size-4 shrink-0" />
            <span className="flex-1 truncate">{section.label}</span>
            {section.hint && <Badge variant="outline">{section.hint}</Badge>}
          </button>
        );
      })}
    </nav>
  );
}

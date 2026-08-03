"use client";

import * as React from "react";

import { TEMPLATES } from "@/components/resume/data";
import { Check, LayoutTemplate } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TemplateGalleryProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

/** Miniature CSS-drawn document thumbnail for a template. */
function TemplateThumb({ accent }: { accent: string }) {
  return (
    <span
      aria-hidden
      className="flex aspect-3/4 w-full flex-col gap-1 rounded-md bg-background p-2 ring-1 ring-foreground/10"
    >
      <span className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: accent }} />
      <span className="h-1 w-3/4 rounded-full bg-muted-foreground/30" />
      <span className="mt-1 h-1 w-full rounded-full bg-muted" />
      <span className="h-1 w-full rounded-full bg-muted" />
      <span className="h-1 w-2/3 rounded-full bg-muted" />
      <span className="mt-1 h-1 w-1/3 rounded-full" style={{ backgroundColor: `${accent}80` }} />
      <span className="h-1 w-full rounded-full bg-muted" />
      <span className="h-1 w-5/6 rounded-full bg-muted" />
    </span>
  );
}

/** Template picker — applies to the selected resume. */
export function TemplateGallery({ selectedTemplate, onSelect }: TemplateGalleryProps) {
  return (
    <section className="flex flex-col gap-2.5" aria-label="Resume templates">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <LayoutTemplate aria-hidden className="size-3.5 text-muted-foreground" />
        Templates
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map((template) => {
          const selected = template.id === selectedTemplate;
          return (
            <Tooltip key={template.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${template.name} template`}
                  onClick={() => onSelect(template.id)}
                  className={cn(
                    "group/template relative flex flex-col gap-1 rounded-lg p-1.5 ring-1 transition-all",
                    selected
                      ? "bg-accent/40 ring-2 ring-primary"
                      : "ring-foreground/10 hover:-translate-y-0.5 hover:ring-foreground/25"
                  )}
                >
                  <TemplateThumb accent={template.accent} />
                  <span className="truncate text-center text-[10px] font-medium">
                    {template.name}
                  </span>
                  {selected && (
                    <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check aria-hidden className="size-2.5" />
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{template.description}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

import {
  SMART_CHIPS,
  SORT_OPTIONS,
  type JobFilters,
  type SortKey,
} from "@/components/jobs/filters";
import {
  LayoutGrid,
  List,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

interface JobsToolbarProps {
  filters: JobFilters;
  sort: SortKey;
  view: ViewMode;
  refreshing: boolean;
  activeFilterCount: number;
  onFiltersChange: (filters: JobFilters) => void;
  onSortChange: (sort: SortKey) => void;
  onViewChange: (view: ViewMode) => void;
  onRefresh: () => void;
  onAiSearch: () => void;
  onOpenMobileFilters: () => void;
}

export function JobsToolbar({
  filters,
  sort,
  view,
  refreshing,
  activeFilterCount,
  onFiltersChange,
  onSortChange,
  onViewChange,
  onRefresh,
  onAiSearch,
  onOpenMobileFilters,
}: JobsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        className="lg:hidden"
        onClick={onOpenMobileFilters}
      >
        <SlidersHorizontal data-icon="inline-start" />
        Filters
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-0.5">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      <div className="relative min-w-40 flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={filters.query}
          onChange={(event) =>
            onFiltersChange({ ...filters, query: event.target.value })
          }
          placeholder="Search roles, companies, or skills…"
          className="pl-8"
          aria-label="Search jobs"
        />
      </div>

      <Select value={sort} onValueChange={(value) => onSortChange(value as SortKey)}>
        <SelectTrigger aria-label="Sort jobs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div
        className="hidden items-center rounded-lg border border-input p-0.5 sm:flex"
        role="group"
        aria-label="View mode"
      >
        {(
          [
            { mode: "grid", icon: LayoutGrid, label: "Grid view" },
            { mode: "list", icon: List, label: "List view" },
          ] as const
        ).map(({ mode, icon: Icon, label }) => (
          <Button
            key={mode}
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            aria-pressed={view === mode}
            className={cn(
              view === mode && "bg-muted text-foreground"
            )}
            onClick={() => onViewChange(mode)}
          >
            <Icon />
          </Button>
        ))}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Refresh jobs"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={cn(refreshing && "animate-spin")} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Refresh jobs</TooltipContent>
      </Tooltip>

      <Button variant="ai" onClick={onAiSearch}>
        <Sparkles data-icon="inline-start" />
        AI Search
      </Button>
    </div>
  );
}

interface SmartChipsProps {
  filters: JobFilters;
  sort: SortKey;
  onChange: (next: { filters: JobFilters; sort: SortKey }) => void;
}

/** One-tap AI filter presets above the results. */
export function SmartChips({ filters, sort, onChange }: SmartChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Sparkles aria-hidden className="size-3.5 text-primary" />
      {SMART_CHIPS.map((chip) => {
        const active = chip.isActive(filters, sort);
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(chip.apply(filters, sort, active))}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium ring-1 transition-all select-none",
              active
                ? "bg-primary text-primary-foreground ring-primary"
                : "bg-card text-muted-foreground ring-foreground/10 hover:text-foreground hover:ring-foreground/25"
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}

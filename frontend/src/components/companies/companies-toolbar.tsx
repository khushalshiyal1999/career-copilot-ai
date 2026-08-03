"use client";

import * as React from "react";

import {
  SORT_OPTIONS,
  type CompanyFilters,
  type SortKey,
} from "@/components/companies/filters";
import {
  Bookmark,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
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
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

interface CompaniesToolbarProps {
  filters: CompanyFilters;
  sort: SortKey;
  view: ViewMode;
  activeFilterCount: number;
  onFiltersChange: (filters: CompanyFilters) => void;
  onSortChange: (sort: SortKey) => void;
  onViewChange: (view: ViewMode) => void;
  onOpenMobileFilters: () => void;
}

export function CompaniesToolbar({
  filters,
  sort,
  view,
  activeFilterCount,
  onFiltersChange,
  onSortChange,
  onViewChange,
  onOpenMobileFilters,
}: CompaniesToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" className="lg:hidden" onClick={onOpenMobileFilters}>
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
          placeholder="Search companies, industries, or tech…"
          className="pl-8"
          aria-label="Search companies"
        />
      </div>

      <Button
        variant="outline"
        aria-pressed={filters.savedOnly}
        className={cn(filters.savedOnly && "bg-muted text-foreground")}
        onClick={() => onFiltersChange({ ...filters, savedOnly: !filters.savedOnly })}
      >
        <Bookmark data-icon="inline-start" className={cn(filters.savedOnly && "text-primary")} />
        Saved
      </Button>

      <Select value={sort} onValueChange={(value) => onSortChange(value as SortKey)}>
        <SelectTrigger aria-label="Sort companies">
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
            className={cn(view === mode && "bg-muted text-foreground")}
            onClick={() => onViewChange(mode)}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  );
}

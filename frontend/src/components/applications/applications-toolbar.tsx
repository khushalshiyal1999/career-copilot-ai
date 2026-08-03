"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  APPLICATION_COMPANIES,
  STATUS_META,
  type ApplicationStatus,
} from "@/components/applications/data";
import {
  AI_FILTERS,
  DATE_RANGES,
  SORT_OPTIONS,
  type AppFilters,
  type SortKey,
} from "@/components/applications/filters";
import { FileUp, Plus, Search, Sparkles } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = Object.entries(STATUS_META) as [
  ApplicationStatus,
  (typeof STATUS_META)[ApplicationStatus],
][];

const IMPORT_SOURCES = ["LinkedIn", "Greenhouse", "Lever", "CSV file"] as const;

interface ApplicationsToolbarProps {
  filters: AppFilters;
  sort: SortKey;
  onFiltersChange: (filters: AppFilters) => void;
  onSortChange: (sort: SortKey) => void;
  onAdd: () => void;
}

export function ApplicationsToolbar({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onAdd,
}: ApplicationsToolbarProps) {
  const set = (patch: Partial<AppFilters>) =>
    onFiltersChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-44 flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={filters.query}
          onChange={(event) => set({ query: event.target.value })}
          placeholder="Search applications…"
          className="pl-8"
          aria-label="Search applications"
        />
      </div>

      <Select
        value={filters.status}
        onValueChange={(value) => set({ status: value as AppFilters["status"] })}
      >
        <SelectTrigger aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {STATUS_OPTIONS.map(([value, meta]) => (
            <SelectItem key={value} value={value}>
              {meta.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.company}
        onValueChange={(value) => set({ company: value })}
      >
        <SelectTrigger aria-label="Filter by company">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All companies</SelectItem>
          {APPLICATION_COMPANIES.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.range}
        onValueChange={(value) => set({ range: value as AppFilters["range"] })}
      >
        <SelectTrigger aria-label="Filter by applied date">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DATE_RANGES.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.ai}
        onValueChange={(value) => set({ ai: value as AppFilters["ai"] })}
      >
        <SelectTrigger
          aria-label="AI filter"
          className="border-primary/30 data-[state=open]:border-primary/50"
        >
          <Sparkles aria-hidden className="size-3.5 text-primary" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {AI_FILTERS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={(value) => onSortChange(value as SortKey)}>
        <SelectTrigger aria-label="Sort applications">
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <FileUp data-icon="inline-start" />
            Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Import applications from</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {IMPORT_SOURCES.map((source) => (
            <DropdownMenuItem
              key={source}
              onSelect={() =>
                toast(`Connecting to ${source}…`, {
                  description:
                    "I'll dedupe against your existing pipeline and tag each import with its source.",
                })
              }
            >
              {source}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={onAdd}>
        <Plus data-icon="inline-start" />
        Add Application
      </Button>
    </div>
  );
}

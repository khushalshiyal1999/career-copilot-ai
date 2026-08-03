"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  ALL_LOCATIONS,
  ALL_SKILLS,
  JOB_COMPANIES,
  type EmploymentType,
  type ExperienceLevel,
  type WorkMode,
} from "@/components/jobs/data";
import { DEFAULT_FILTERS, type JobFilters } from "@/components/jobs/filters";
import { Search, Sparkles, X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FiltersPanelProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  className?: string;
}

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function CheckboxRow<T extends string>({
  value,
  label,
  selected,
  onToggle,
}: {
  value: T;
  label: string;
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <Label className="flex cursor-pointer items-center gap-2 text-sm font-normal">
      <Checkbox
        checked={selected.includes(value)}
        onCheckedChange={() => onToggle(value)}
      />
      {label}
    </Label>
  );
}

const WORK_MODES: { value: WorkMode; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

const LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Staff" },
];

const TYPES: { value: EmploymentType; label: string }[] = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part-time" },
];

const SALARY_OPTIONS = [
  { value: 0, label: "Any salary" },
  { value: 60000, label: "$60k+" },
  { value: 120000, label: "$120k+" },
  { value: 160000, label: "$160k+" },
  { value: 200000, label: "$200k+" },
];

const POSTED_OPTIONS = [
  { value: 0, label: "Any time" },
  { value: 24, label: "Past 24 hours" },
  { value: 72, label: "Past 3 days" },
  { value: 168, label: "Past week" },
];

const MATCH_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 70, label: "70+" },
  { value: 80, label: "80+" },
  { value: 90, label: "90+" },
];

const COMPANY_OPTIONS = Object.values(JOB_COMPANIES).map((company) => ({
  value: company.id,
  label: company.name,
}));

const SKILL_OPTIONS = ALL_SKILLS.map((skill) => ({
  value: skill,
  label: skill,
}));

/** The full filter form — rendered in the sticky rail and the mobile sheet. */
export function FiltersPanel({ filters, onChange, className }: FiltersPanelProps) {
  const set = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleIn = <T extends string>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <FilterSection label="Search">
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={filters.title}
            onChange={(event) => set("title", event.target.value)}
            placeholder="Job title, e.g. Frontend"
            className="pl-8"
            aria-label="Filter by job title"
          />
        </div>
      </FilterSection>

      <FilterSection label="Company">
        <MultiSelect
          options={COMPANY_OPTIONS}
          value={filters.companies}
          onValueChange={(value) => set("companies", value)}
          placeholder="All companies"
          aria-label="Filter by company"
        />
      </FilterSection>

      <FilterSection label="Location">
        <Select
          value={filters.location}
          onValueChange={(value) => set("location", value)}
        >
          <SelectTrigger className="w-full" aria-label="Filter by location">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Anywhere</SelectItem>
            {ALL_LOCATIONS.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection label="Work mode">
        <div className="flex flex-col gap-2">
          {WORK_MODES.map((mode) => (
            <CheckboxRow
              key={mode.value}
              value={mode.value}
              label={mode.label}
              selected={filters.workModes}
              onToggle={(value) =>
                set("workModes", toggleIn(filters.workModes, value))
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Experience level">
        <div className="flex flex-col gap-2">
          {LEVELS.map((level) => (
            <CheckboxRow
              key={level.value}
              value={level.value}
              label={level.label}
              selected={filters.levels}
              onToggle={(value) => set("levels", toggleIn(filters.levels, value))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Salary range">
        <Select
          value={String(filters.salaryMin)}
          onValueChange={(value) => set("salaryMin", Number(value))}
        >
          <SelectTrigger className="w-full" aria-label="Minimum salary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SALARY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection label="Employment type">
        <div className="flex flex-col gap-2">
          {TYPES.map((type) => (
            <CheckboxRow
              key={type.value}
              value={type.value}
              label={type.label}
              selected={filters.types}
              onToggle={(value) => set("types", toggleIn(filters.types, value))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Posted date">
        <Select
          value={String(filters.postedWithin)}
          onValueChange={(value) => set("postedWithin", Number(value))}
        >
          <SelectTrigger className="w-full" aria-label="Posted within">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {POSTED_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection label="AI match score">
        <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Minimum AI match score">
          {MATCH_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={filters.minMatch === option.value ? "secondary" : "outline"}
              size="sm"
              aria-pressed={filters.minMatch === option.value}
              className={cn(
                filters.minMatch === option.value &&
                  "ring-1 ring-primary/40 text-primary"
              )}
              onClick={() => set("minMatch", option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Tech stack">
        <MultiSelect
          options={SKILL_OPTIONS}
          value={filters.stack}
          onValueChange={(value) => set("stack", value)}
          placeholder="Any technology"
          aria-label="Filter by tech stack"
        />
      </FilterSection>

      <Separator />

      <div className="flex flex-col gap-3">
        <Label className="flex cursor-pointer items-center justify-between text-sm font-normal">
          Visa sponsorship
          <Switch
            checked={filters.visaOnly}
            onCheckedChange={(checked) => set("visaOnly", checked)}
          />
        </Label>
        <Label className="flex cursor-pointer items-center justify-between text-sm font-normal">
          Easy Apply only
          <Switch
            checked={filters.easyApplyOnly}
            onCheckedChange={(checked) => set("easyApplyOnly", checked)}
          />
        </Label>
        <Label className="flex cursor-pointer items-center justify-between text-sm font-normal">
          Saved jobs only
          <Switch
            checked={filters.savedOnly}
            onCheckedChange={(checked) => set("savedOnly", checked)}
          />
        </Label>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(DEFAULT_FILTERS)}
        >
          <X data-icon="inline-start" />
          Clear Filters
        </Button>
        <Button
          variant="ai"
          size="sm"
          onClick={() =>
            toast.success(
              "Search saved — I'll alert you when new jobs match it."
            )
          }
        >
          <Sparkles data-icon="inline-start" />
          Save Search
        </Button>
      </div>
    </div>
  );
}

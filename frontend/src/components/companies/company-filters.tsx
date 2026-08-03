"use client";

import * as React from "react";

import { INDUSTRIES, LOCATIONS } from "@/components/companies/data";
import {
  DEFAULT_FILTERS,
  RATING_OPTIONS,
  SIZE_OPTIONS,
  countActiveCompanyFilters,
  type CompanyFilters,
} from "@/components/companies/filters";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FiltersPanelProps {
  filters: CompanyFilters;
  onChange: (filters: CompanyFilters) => void;
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}

/** Left rail — every research filter. */
export function CompanyFiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const set = (patch: Partial<CompanyFilters>) => onChange({ ...filters, ...patch });
  const activeCount = countActiveCompanyFilters(filters);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm font-semibold">Filters</span>
        {activeCount > 0 && (
          <Button variant="ghost" size="xs" onClick={() => onChange(DEFAULT_FILTERS)}>
            Clear ({activeCount})
          </Button>
        )}
      </div>

      <FilterSelect
        id="cf-industry"
        label="Industry"
        value={filters.industry}
        onChange={(value) => set({ industry: value })}
      >
        <SelectItem value="all">All industries</SelectItem>
        {INDUSTRIES.map((industry) => (
          <SelectItem key={industry} value={industry}>
            {industry}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        id="cf-size"
        label="Company size"
        value={filters.size}
        onChange={(value) => set({ size: value as CompanyFilters["size"] })}
      >
        {SIZE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        id="cf-location"
        label="Location"
        value={filters.location}
        onChange={(value) => set({ location: value })}
      >
        <SelectItem value="all">All locations</SelectItem>
        {LOCATIONS.map((location) => (
          <SelectItem key={location} value={location}>
            {location}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        id="cf-hiring"
        label="Hiring status"
        value={filters.hiringStatus}
        onChange={(value) => set({ hiringStatus: value as CompanyFilters["hiringStatus"] })}
      >
        <SelectItem value="all">Any status</SelectItem>
        <SelectItem value="actively-hiring">Actively hiring</SelectItem>
        <SelectItem value="hiring">Hiring</SelectItem>
        <SelectItem value="freeze">Hiring freeze</SelectItem>
      </FilterSelect>

      <FilterSelect
        id="cf-salary-rating"
        label="Salary rating"
        value={String(filters.minSalaryRating)}
        onChange={(value) => set({ minSalaryRating: Number(value) })}
      >
        {RATING_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect
        id="cf-culture-rating"
        label="Culture rating"
        value={String(filters.minCultureRating)}
        onChange={(value) => set({ minCultureRating: Number(value) })}
      >
        {RATING_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </FilterSelect>

      <div className="flex flex-col gap-3 border-t pt-4">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="cf-remote" className="cursor-pointer text-sm">
            Remote friendly
          </Label>
          <Switch
            id="cf-remote"
            checked={filters.remoteOnly}
            onCheckedChange={(checked) => set({ remoteOnly: checked })}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="cf-saved" className="cursor-pointer text-sm">
            Saved companies
          </Label>
          <Switch
            id="cf-saved"
            checked={filters.savedOnly}
            onCheckedChange={(checked) => set({ savedOnly: checked })}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Filtering and sorting for the Applications tracker. Pure functions so the
 * explorer component stays declarative.
 */

import {
  isActiveStatus,
  type Application,
  type ApplicationStatus,
  type Stage,
} from "@/components/applications/data";

export type AiFilterKey = "all" | "follow-up" | "interview-soon" | "high-match" | "stale";
export type DateRangeKey = "all" | "7d" | "30d" | "90d";
export type SortKey = "activity" | "newest" | "oldest" | "match" | "salary" | "company";

export interface AppFilters {
  query: string;
  status: "all" | ApplicationStatus;
  company: string;
  stage: "all" | Stage;
  range: DateRangeKey;
  ai: AiFilterKey;
}

export const DEFAULT_FILTERS: AppFilters = {
  query: "",
  status: "all",
  company: "all",
  stage: "all",
  range: "all",
  ai: "all",
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "activity", label: "Recent activity" },
  { value: "newest", label: "Newest applied" },
  { value: "oldest", label: "Oldest applied" },
  { value: "match", label: "AI match" },
  { value: "salary", label: "Salary" },
  { value: "company", label: "Company A–Z" },
];

export const AI_FILTERS: { value: AiFilterKey; label: string }[] = [
  { value: "all", label: "AI: All" },
  { value: "follow-up", label: "Needs follow-up" },
  { value: "interview-soon", label: "Interview this week" },
  { value: "high-match", label: "High match (90%+)" },
  { value: "stale", label: "Going stale" },
];

export const DATE_RANGES: { value: DateRangeKey; label: string }[] = [
  { value: "all", label: "Any date" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

const RANGE_DAYS: Record<Exclude<DateRangeKey, "all">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

function matchesAi(app: Application, ai: AiFilterKey): boolean {
  switch (ai) {
    case "all":
      return true;
    case "follow-up":
      return isActiveStatus(app.status) && app.lastActivityDays >= 5;
    case "interview-soon":
      return app.nextInterview !== null && app.nextInterview.inDays <= 7;
    case "high-match":
      return app.match >= 90;
    case "stale":
      return isActiveStatus(app.status) && app.lastActivityDays >= 10;
  }
}

export function applyFilters(apps: Application[], filters: AppFilters): Application[] {
  const query = filters.query.trim().toLowerCase();

  return apps.filter((app) => {
    if (filters.status !== "all" && app.status !== filters.status) return false;
    if (filters.company !== "all" && app.company.id !== filters.company) return false;
    if (filters.stage !== "all" && app.stage !== filters.stage) return false;
    if (filters.range !== "all" && app.appliedDaysAgo > RANGE_DAYS[filters.range])
      return false;
    if (!matchesAi(app, filters.ai)) return false;

    if (query) {
      const haystack = [
        app.role,
        app.company.name,
        app.location,
        app.source,
        app.recruiter?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function sortApplications(apps: Application[], sort: SortKey): Application[] {
  const sorted = [...apps];
  switch (sort) {
    case "activity":
      return sorted.sort(
        (a, b) => a.lastActivityDays - b.lastActivityDays || a.appliedDaysAgo - b.appliedDaysAgo
      );
    case "newest":
      return sorted.sort((a, b) => a.appliedDaysAgo - b.appliedDaysAgo);
    case "oldest":
      return sorted.sort((a, b) => b.appliedDaysAgo - a.appliedDaysAgo);
    case "match":
      return sorted.sort((a, b) => b.match - a.match);
    case "salary":
      return sorted.sort((a, b) => b.salaryUsd - a.salaryUsd);
    case "company":
      return sorted.sort((a, b) => a.company.name.localeCompare(b.company.name));
  }
}

export function countActiveFilters(filters: AppFilters): number {
  let count = 0;
  if (filters.query.trim()) count += 1;
  if (filters.status !== "all") count += 1;
  if (filters.company !== "all") count += 1;
  if (filters.stage !== "all") count += 1;
  if (filters.range !== "all") count += 1;
  if (filters.ai !== "all") count += 1;
  return count;
}

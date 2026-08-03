/**
 * Filtering and sorting for the Companies explorer. Pure functions so the
 * explorer component stays declarative.
 */

import type { CompanyProfile, HiringStatus, SizeCategory } from "@/components/companies/data";

export type SortKey = "ai" | "culture" | "salary" | "response" | "openings" | "name";

export interface CompanyFilters {
  query: string;
  industry: string;
  size: "all" | SizeCategory;
  location: string;
  hiringStatus: "all" | HiringStatus;
  remoteOnly: boolean;
  minSalaryRating: number;
  minCultureRating: number;
  savedOnly: boolean;
}

export const DEFAULT_FILTERS: CompanyFilters = {
  query: "",
  industry: "all",
  size: "all",
  location: "all",
  hiringStatus: "all",
  remoteOnly: false,
  minSalaryRating: 0,
  minCultureRating: 0,
  savedOnly: false,
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "ai", label: "AI hiring score" },
  { value: "culture", label: "Culture rating" },
  { value: "salary", label: "Salary rating" },
  { value: "response", label: "Response rate" },
  { value: "openings", label: "Open positions" },
  { value: "name", label: "Name A–Z" },
];

export const SIZE_OPTIONS: { value: "all" | SizeCategory; label: string }[] = [
  { value: "all", label: "Any size" },
  { value: "startup", label: "Startup (< 1K)" },
  { value: "mid", label: "Mid-size (1K – 10K)" },
  { value: "enterprise", label: "Enterprise (10K+)" },
];

export const RATING_OPTIONS = [
  { value: 0, label: "Any rating" },
  { value: 4, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
];

export function applyCompanyFilters(
  companies: CompanyProfile[],
  filters: CompanyFilters,
  savedIds: ReadonlySet<string>
): CompanyProfile[] {
  const query = filters.query.trim().toLowerCase();

  return companies.filter((company) => {
    if (filters.industry !== "all" && company.industry !== filters.industry) return false;
    if (filters.size !== "all" && company.sizeCategory !== filters.size) return false;
    if (filters.location !== "all" && company.location !== filters.location) return false;
    if (filters.hiringStatus !== "all" && company.hiringStatus !== filters.hiringStatus)
      return false;
    if (filters.remoteOnly && !company.remoteFriendly) return false;
    if (company.salaryRating < filters.minSalaryRating) return false;
    if (company.cultureRating < filters.minCultureRating) return false;
    if (filters.savedOnly && !savedIds.has(company.id)) return false;

    if (query) {
      const haystack = [company.name, company.industry, company.location, ...company.techStack]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function sortCompanies(
  companies: CompanyProfile[],
  sort: SortKey
): CompanyProfile[] {
  const sorted = [...companies];
  switch (sort) {
    case "ai":
      return sorted.sort((a, b) => b.aiScore - a.aiScore);
    case "culture":
      return sorted.sort((a, b) => b.cultureRating - a.cultureRating);
    case "salary":
      return sorted.sort((a, b) => b.salaryRating - a.salaryRating);
    case "response":
      return sorted.sort((a, b) => b.responseRate - a.responseRate);
    case "openings":
      return sorted.sort((a, b) => b.openPositions - a.openPositions);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function countActiveCompanyFilters(filters: CompanyFilters): number {
  let count = 0;
  if (filters.query.trim()) count += 1;
  if (filters.industry !== "all") count += 1;
  if (filters.size !== "all") count += 1;
  if (filters.location !== "all") count += 1;
  if (filters.hiringStatus !== "all") count += 1;
  if (filters.remoteOnly) count += 1;
  if (filters.minSalaryRating > 0) count += 1;
  if (filters.minCultureRating > 0) count += 1;
  if (filters.savedOnly) count += 1;
  return count;
}

import type {
  EmploymentType,
  ExperienceLevel,
  Job,
  WorkMode,
} from "@/components/jobs/data";

export interface JobFilters {
  /** Toolbar search — matches role, company, and skills. */
  query: string;
  /** Sidebar job-title text filter. */
  title: string;
  companies: string[];
  location: string;
  workModes: WorkMode[];
  levels: ExperienceLevel[];
  /** Minimum annual USD salary; 0 = any. */
  salaryMin: number;
  types: EmploymentType[];
  /** Max hours since posting; 0 = any time. */
  postedWithin: number;
  /** Minimum AI match score; 0 = any. */
  minMatch: number;
  stack: string[];
  visaOnly: boolean;
  easyApplyOnly: boolean;
  closingSoonOnly: boolean;
  savedOnly: boolean;
}

export const DEFAULT_FILTERS: JobFilters = {
  query: "",
  title: "",
  companies: [],
  location: "any",
  workModes: [],
  levels: [],
  salaryMin: 0,
  types: [],
  postedWithin: 0,
  minMatch: 0,
  stack: [],
  visaOnly: false,
  easyApplyOnly: false,
  closingSoonOnly: false,
  savedOnly: false,
};

export type SortKey = "match" | "recent" | "salary" | "company";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "match", label: "Best match" },
  { value: "recent", label: "Most recent" },
  { value: "salary", label: "Highest salary" },
  { value: "company", label: "Company A–Z" },
];

export function countActiveFilters(filters: JobFilters): number {
  let count = 0;
  if (filters.title) count++;
  if (filters.companies.length) count++;
  if (filters.location !== "any") count++;
  if (filters.workModes.length) count++;
  if (filters.levels.length) count++;
  if (filters.salaryMin > 0) count++;
  if (filters.types.length) count++;
  if (filters.postedWithin > 0) count++;
  if (filters.minMatch > 0) count++;
  if (filters.stack.length) count++;
  if (filters.visaOnly) count++;
  if (filters.easyApplyOnly) count++;
  if (filters.closingSoonOnly) count++;
  if (filters.savedOnly) count++;
  return count;
}

export function applyFilters(
  jobs: Job[],
  filters: JobFilters,
  savedIds: ReadonlySet<string>
): Job[] {
  const query = filters.query.trim().toLowerCase();
  const title = filters.title.trim().toLowerCase();

  return jobs.filter((job) => {
    if (query) {
      const haystack = [job.role, job.company.name, ...job.skills]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (title && !job.role.toLowerCase().includes(title)) return false;
    if (filters.companies.length && !filters.companies.includes(job.company.id))
      return false;
    if (filters.location !== "any" && job.location !== filters.location)
      return false;
    if (filters.workModes.length && !filters.workModes.includes(job.workMode))
      return false;
    if (filters.levels.length && !filters.levels.includes(job.level))
      return false;
    if (filters.salaryMin > 0 && job.salaryUsdMax < filters.salaryMin)
      return false;
    if (filters.types.length && !filters.types.includes(job.type)) return false;
    if (filters.postedWithin > 0 && job.postedHoursAgo > filters.postedWithin)
      return false;
    if (filters.minMatch > 0 && job.match < filters.minMatch) return false;
    if (
      filters.stack.length &&
      !filters.stack.every((skill) => job.skills.includes(skill))
    )
      return false;
    if (filters.visaOnly && !job.visaSponsorship) return false;
    if (filters.easyApplyOnly && !job.easyApply) return false;
    if (filters.closingSoonOnly && !job.closingSoon) return false;
    if (filters.savedOnly && !savedIds.has(job.id)) return false;
    return true;
  });
}

export function sortJobs(jobs: Job[], sort: SortKey): Job[] {
  const sorted = [...jobs];
  switch (sort) {
    case "match":
      return sorted.sort((a, b) => b.match - a.match);
    case "recent":
      return sorted.sort((a, b) => a.postedHoursAgo - b.postedHoursAgo);
    case "salary":
      return sorted.sort((a, b) => b.salaryUsdMax - a.salaryUsdMax);
    case "company":
      return sorted.sort((a, b) => a.company.name.localeCompare(b.company.name));
  }
}

/** Smart chips: one-tap filter/sort presets shown above the results. */
export interface SmartChip {
  id: string;
  label: string;
  isActive: (filters: JobFilters, sort: SortKey) => boolean;
  /** Returns the next filters/sort when toggled on (or off if active). */
  apply: (
    filters: JobFilters,
    sort: SortKey,
    active: boolean
  ) => { filters: JobFilters; sort: SortKey };
}

export const SMART_CHIPS: SmartChip[] = [
  {
    id: "best-match",
    label: "Best Match",
    isActive: (filters, sort) => sort === "match" && filters.minMatch >= 90,
    apply: (filters, sort, active) => ({
      filters: { ...filters, minMatch: active ? 0 : 90 },
      sort: active ? sort : "match",
    }),
  },
  {
    id: "recent",
    label: "Recently Posted",
    isActive: (filters) => filters.postedWithin === 24,
    apply: (filters, sort, active) => ({
      filters: { ...filters, postedWithin: active ? 0 : 24 },
      sort: active ? sort : "recent",
    }),
  },
  {
    id: "high-salary",
    label: "High Salary",
    isActive: (filters) => filters.salaryMin >= 180000,
    apply: (filters, sort, active) => ({
      filters: { ...filters, salaryMin: active ? 0 : 180000 },
      sort: active ? sort : "salary",
    }),
  },
  {
    id: "easy-apply",
    label: "Easy Apply",
    isActive: (filters) => filters.easyApplyOnly,
    apply: (filters, sort, active) => ({
      filters: { ...filters, easyApplyOnly: !active },
      sort,
    }),
  },
  {
    id: "closing-soon",
    label: "Closing Soon",
    isActive: (filters) => filters.closingSoonOnly,
    apply: (filters, sort, active) => ({
      filters: { ...filters, closingSoonOnly: !active },
      sort,
    }),
  },
  {
    id: "remote",
    label: "Remote",
    isActive: (filters) =>
      filters.workModes.length === 1 && filters.workModes[0] === "remote",
    apply: (filters, sort, active) => ({
      filters: { ...filters, workModes: active ? [] : ["remote"] },
      sort,
    }),
  },
];

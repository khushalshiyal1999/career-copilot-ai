"use client";

import * as React from "react";
import { toast } from "sonner";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { AiPanel } from "@/components/jobs/ai-panel";
import { JOBS, type Job } from "@/components/jobs/data";
import { FiltersPanel } from "@/components/jobs/filters-panel";
import {
  applyFilters,
  countActiveFilters,
  DEFAULT_FILTERS,
  sortJobs,
  type JobFilters,
  type SortKey,
} from "@/components/jobs/filters";
import { JobCard } from "@/components/jobs/job-card";
import { JobDrawer } from "@/components/jobs/job-drawer";
import { JobsSkeletonGrid } from "@/components/jobs/job-skeleton";
import { JobsToolbar, SmartChips, type ViewMode } from "@/components/jobs/jobs-toolbar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatNumber } from "@/utils/format";

export function JobsExplorer() {
  const [filters, setFilters] = React.useState<JobFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>("match");
  const [view, setView] = React.useState<ViewMode>("grid");
  const [loading, setLoading] = React.useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [savedIds, setSavedIds] = React.useState<ReadonlySet<string>>(new Set());
  const [hiddenIds, setHiddenIds] = React.useState<ReadonlySet<string>>(new Set());
  const [openJob, setOpenJob] = React.useState<Job | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Simulated feed fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const simulateFetch = (after?: () => void) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      after?.();
    }, 900);
  };

  const visibleJobs = React.useMemo(() => {
    const pool = JOBS.filter((job) => !hiddenIds.has(job.id));
    return sortJobs(applyFilters(pool, filters, savedIds), sort);
  }, [filters, sort, savedIds, hiddenIds]);

  const toggleSave = (job: Job) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(job.id)) {
        next.delete(job.id);
        toast(`Removed ${job.role} from saved jobs`);
      } else {
        next.add(job.id);
        toast(`Saved ${job.role} at ${job.company.name}`);
      }
      return next;
    });
  };

  const apply = (job: Job) => {
    toast.success(
      job.easyApply
        ? `Easy Apply sent to ${job.company.name} — I attached your tailored resume.`
        : `Application to ${job.company.name} queued — I'm tailoring your resume first.`
    );
  };

  const hide = (job: Job) => {
    setHiddenIds((prev) => new Set(prev).add(job.id));
    toast(`Got it — fewer roles like ${job.role}.`, {
      action: {
        label: "Undo",
        onClick: () =>
          setHiddenIds((prev) => {
            const next = new Set(prev);
            next.delete(job.id);
            return next;
          }),
      },
    });
  };

  const open = (job: Job) => {
    setOpenJob(job);
    setDrawerOpen(true);
  };

  const refresh = () =>
    simulateFetch(() => toast("Feed refreshed — no new jobs since your last scan."));

  const aiSearch = () =>
    simulateFetch(() => {
      setSort("match");
      setFilters((prev) => ({ ...prev, minMatch: 80 }));
      toast.success("I re-ranked the feed — strongest matches first, 80%+ only.");
    });

  const activeFilterCount = countActiveFilters(filters);

  return (
    <div className="flex items-start gap-6">
      {/* Filters — sticky desktop rail */}
      <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto pr-1 pb-4 lg:block">
        <FiltersPanel filters={filters} onChange={setFilters} />
      </aside>

      {/* Filters — mobile sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="w-80 gap-0 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow down the job feed.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <FiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Results */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <JobsToolbar
          filters={filters}
          sort={sort}
          view={view}
          refreshing={loading}
          activeFilterCount={activeFilterCount}
          onFiltersChange={setFilters}
          onSortChange={setSort}
          onViewChange={setView}
          onRefresh={refresh}
          onAiSearch={aiSearch}
          onOpenMobileFilters={() => setMobileFiltersOpen(true)}
        />

        <SmartChips
          filters={filters}
          sort={sort}
          onChange={({ filters: nextFilters, sort: nextSort }) => {
            setFilters(nextFilters);
            setSort(nextSort);
          }}
        />

        <p aria-live="polite" className="text-sm text-muted-foreground">
          {loading ? (
            "Scanning job boards…"
          ) : (
            <>
              <span className="font-semibold text-foreground tabular-nums">
                {formatNumber(visibleJobs.length)}
              </span>{" "}
              {visibleJobs.length === 1 ? "job" : "jobs"} found
              {activeFilterCount > 0 &&
                ` · ${activeFilterCount} ${activeFilterCount === 1 ? "filter" : "filters"} active`}
            </>
          )}
        </p>

        {loading ? (
          <JobsSkeletonGrid view={view} />
        ) : visibleJobs.length === 0 ? (
          <EmptyState
            className="py-16"
            icon={<AiAvatar size="lg" />}
            title="No jobs match your filters yet"
            description="I checked all 4 connected job boards. Try relaxing a filter or two — or let me search wider for you."
            action={
              <Button variant="outline" onClick={() => setFilters(DEFAULT_FILTERS)}>
                Clear filters
              </Button>
            }
            secondaryAction={
              <Button variant="ai" onClick={aiSearch}>
                Let AI search wider
              </Button>
            }
          />
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-4 md:grid-cols-2"
                : "flex flex-col gap-3"
            }
          >
            {visibleJobs.map((job, index) => (
              <FadeIn key={job.id} delay={Math.min(index, 8) * 0.04}>
                <JobCard
                  job={job}
                  view={view}
                  saved={savedIds.has(job.id)}
                  onToggleSave={toggleSave}
                  onApply={apply}
                  onOpen={open}
                  onHide={hide}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* AI assistant — desktop rail */}
      <aside className="sticky top-20 hidden w-72 shrink-0 xl:block 2xl:w-80">
        <AiPanel onOpenJob={open} />
      </aside>

      <JobDrawer
        job={openJob}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        saved={openJob ? savedIds.has(openJob.id) : false}
        onToggleSave={toggleSave}
        onApply={apply}
      />
    </div>
  );
}

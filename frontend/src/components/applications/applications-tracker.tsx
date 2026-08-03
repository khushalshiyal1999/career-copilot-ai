"use client";

import * as React from "react";

import { AddApplicationDialog } from "@/components/applications/add-application-dialog";
import { ApplicationDetails } from "@/components/applications/application-details";
import { ApplicationRow } from "@/components/applications/application-row";
import {
  ApplicationDetailsSkeleton,
  ApplicationListSkeleton,
} from "@/components/applications/application-skeleton";
import { ApplicationsToolbar } from "@/components/applications/applications-toolbar";
import {
  APPLICATIONS,
  isActiveStatus,
  type Application,
} from "@/components/applications/data";
import {
  applyFilters,
  countActiveFilters,
  DEFAULT_FILTERS,
  sortApplications,
  type AppFilters,
  type SortKey,
} from "@/components/applications/filters";
import {
  PipelineSummary,
  PipelineSummarySkeleton,
} from "@/components/applications/pipeline-summary";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
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

/** Tracks whether the two-panel layout is active (lg and up). */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(true);
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function ApplicationsTracker() {
  const [apps, setApps] = React.useState<Application[]>(APPLICATIONS);
  const [filters, setFilters] = React.useState<AppFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>("activity");
  const [loading, setLoading] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [mobileDetailsOpen, setMobileDetailsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const isDesktop = useIsDesktop();

  // Simulated fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const visible = React.useMemo(
    () => sortApplications(applyFilters(apps, filters), sort),
    [apps, filters, sort]
  );

  const selected =
    visible.find((app) => app.id === selectedId) ?? visible[0] ?? null;

  const updateApp = (id: string, updater: (app: Application) => Application) => {
    setApps((prev) => prev.map((app) => (app.id === id ? updater(app) : app)));
  };

  const select = (app: Application) => {
    setSelectedId(app.id);
    if (!isDesktop) setMobileDetailsOpen(true);
  };

  const addApp = (app: Application) => {
    setApps((prev) => [app, ...prev]);
    setSelectedId(app.id);
  };

  const activeFilterCount = countActiveFilters(filters);
  const offers = apps.filter((app) => app.status === "offer").length;
  const interviewsThisWeek = apps.filter(
    (app) => app.nextInterview !== null && app.nextInterview.inDays <= 7 && isActiveStatus(app.status)
  ).length;

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <PipelineSummarySkeleton />
      ) : (
        <PipelineSummary
          apps={apps}
          activeStage={filters.stage}
          onStageChange={(stage) => setFilters((prev) => ({ ...prev, stage }))}
        />
      )}

      <ApplicationsToolbar
        filters={filters}
        sort={sort}
        onFiltersChange={setFilters}
        onSortChange={setSort}
        onAdd={() => setAddOpen(true)}
      />

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {loading ? (
          "Syncing your pipeline…"
        ) : (
          <>
            <span className="font-semibold text-foreground tabular-nums">
              {formatNumber(visible.length)}
            </span>{" "}
            {activeFilterCount > 0 ? (
              <>
                of {formatNumber(apps.length)} applications ·{" "}
                {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"} active
              </>
            ) : (
              <>
                applications · {offers} {offers === 1 ? "offer" : "offers"} on the
                table · {interviewsThisWeek}{" "}
                {interviewsThisWeek === 1 ? "interview" : "interviews"} this week
              </>
            )}
          </>
        )}
      </p>

      <div className="flex items-start gap-6">
        {/* Applications list */}
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {loading ? (
            <ApplicationListSkeleton />
          ) : visible.length === 0 ? (
            <EmptyState
              className="py-16"
              icon={<AiAvatar size="lg" />}
              title="No applications match"
              description="I checked all 128 applications in your pipeline. Try relaxing a filter — or log something new you applied to."
              action={
                <Button variant="outline" onClick={() => setFilters(DEFAULT_FILTERS)}>
                  Clear filters
                </Button>
              }
              secondaryAction={
                <Button variant="ai" onClick={() => setAddOpen(true)}>
                  Add Application
                </Button>
              }
            />
          ) : (
            visible.map((app, index) =>
              index < 12 ? (
                <FadeIn key={app.id} delay={Math.min(index, 8) * 0.04}>
                  <ApplicationRow
                    app={app}
                    selected={isDesktop && selected?.id === app.id}
                    onSelect={select}
                  />
                </FadeIn>
              ) : (
                <ApplicationRow
                  key={app.id}
                  app={app}
                  selected={isDesktop && selected?.id === app.id}
                  onSelect={select}
                />
              )
            )
          )}
        </div>

        {/* Details — desktop panel */}
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-96 shrink-0 overflow-y-auto rounded-xl lg:block xl:w-[26.5rem]">
          {loading ? (
            <ApplicationDetailsSkeleton />
          ) : selected ? (
            <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <ApplicationDetails app={selected} onUpdate={updateApp} />
            </div>
          ) : (
            <div className="grid place-items-center gap-3 rounded-xl bg-card p-10 text-center ring-1 ring-foreground/10">
              <AiAvatar size="lg" />
              <p className="text-sm text-muted-foreground">
                Select an application to see its full story.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Details — mobile drawer */}
      <Sheet open={mobileDetailsOpen} onOpenChange={setMobileDetailsOpen}>
        <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-lg">
          <SheetHeader className="sr-only">
            <SheetTitle>
              {selected ? `${selected.role} at ${selected.company.name}` : "Application details"}
            </SheetTitle>
            <SheetDescription>Application details</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-5">
            {selected && <ApplicationDetails app={selected} onUpdate={updateApp} />}
          </div>
        </SheetContent>
      </Sheet>

      <AddApplicationDialog open={addOpen} onOpenChange={setAddOpen} onAdd={addApp} />
    </div>
  );
}

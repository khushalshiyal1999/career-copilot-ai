"use client";

import * as React from "react";
import { toast } from "sonner";

import { AiInsightsPanel } from "@/components/companies/ai-insights-panel";
import { CompaniesToolbar, type ViewMode } from "@/components/companies/companies-toolbar";
import { CompanyCard } from "@/components/companies/company-card";
import { CompanyDrawer } from "@/components/companies/company-drawer";
import { CompanyFiltersPanel } from "@/components/companies/company-filters";
import { CompaniesSkeletonGrid } from "@/components/companies/company-skeleton";
import { COMPANIES, type CompanyProfile } from "@/components/companies/data";
import {
  applyCompanyFilters,
  countActiveCompanyFilters,
  DEFAULT_FILTERS,
  sortCompanies,
  type CompanyFilters,
  type SortKey,
} from "@/components/companies/filters";
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

export function CompaniesExplorer() {
  const [filters, setFilters] = React.useState<CompanyFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>("ai");
  const [view, setView] = React.useState<ViewMode>("grid");
  const [loading, setLoading] = React.useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [savedIds, setSavedIds] = React.useState<ReadonlySet<string>>(
    new Set(["google", "razorpay"])
  );
  const [followedIds, setFollowedIds] = React.useState<ReadonlySet<string>>(
    new Set(["vercel"])
  );
  const [openCompany, setOpenCompany] = React.useState<CompanyProfile | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Simulated fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const visible = React.useMemo(
    () => sortCompanies(applyCompanyFilters(COMPANIES, filters, savedIds), sort),
    [filters, sort, savedIds]
  );

  const toggleSave = (company: CompanyProfile) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(company.id)) {
        next.delete(company.id);
        toast(`Removed ${company.name} from saved companies.`);
      } else {
        next.add(company.id);
        toast(`Saved ${company.name} — it'll surface first in research.`);
      }
      return next;
    });
  };

  const toggleFollow = (company: CompanyProfile) => {
    setFollowedIds((prev) => {
      const next = new Set(prev);
      if (next.has(company.id)) {
        next.delete(company.id);
        toast(`Unfollowed ${company.name}.`);
      } else {
        next.add(company.id);
        toast.success(
          `Following ${company.name} — you'll hear about new roles and hiring changes.`
        );
      }
      return next;
    });
  };

  const open = (company: CompanyProfile) => {
    setOpenCompany(company);
    setDrawerOpen(true);
  };

  const activeFilterCount = countActiveCompanyFilters(filters);

  return (
    <div className="flex items-start gap-6">
      {/* Filters — sticky desktop rail */}
      <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto pr-1 pb-4 lg:block">
        <CompanyFiltersPanel filters={filters} onChange={setFilters} />
      </aside>

      {/* Filters — mobile sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="w-80 gap-0 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow down the company list.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <CompanyFiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Results */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <CompaniesToolbar
          filters={filters}
          sort={sort}
          view={view}
          activeFilterCount={activeFilterCount}
          onFiltersChange={setFilters}
          onSortChange={setSort}
          onViewChange={setView}
          onOpenMobileFilters={() => setMobileFiltersOpen(true)}
        />

        <p aria-live="polite" className="text-sm text-muted-foreground">
          {loading ? (
            "Researching companies…"
          ) : (
            <>
              <span className="font-semibold text-foreground tabular-nums">
                {formatNumber(visible.length)}
              </span>{" "}
              {visible.length === 1 ? "company" : "companies"}
              {activeFilterCount > 0 &&
                ` · ${activeFilterCount} ${activeFilterCount === 1 ? "filter" : "filters"} active`}
              {activeFilterCount === 0 &&
                ` · ${COMPANIES.reduce((sum, c) => sum + c.openPositions, 0)} open roles tracked`}
            </>
          )}
        </p>

        {loading ? (
          <CompaniesSkeletonGrid view={view} />
        ) : visible.length === 0 ? (
          <EmptyState
            className="py-16"
            icon={<AiAvatar size="lg" />}
            title="No companies match your filters"
            description="I researched every company on your board. Relax a filter or two — or tell me an industry and I'll build a new shortlist."
            action={
              <Button variant="outline" onClick={() => setFilters(DEFAULT_FILTERS)}>
                Clear filters
              </Button>
            }
            secondaryAction={
              <Button
                variant="ai"
                onClick={() =>
                  toast.success("Scanning for new companies that match your profile…")
                }
              >
                Let AI find companies
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
            {visible.map((company, index) => (
              <FadeIn key={company.id} delay={Math.min(index, 8) * 0.04}>
                <CompanyCard
                  company={company}
                  view={view}
                  saved={savedIds.has(company.id)}
                  followed={followedIds.has(company.id)}
                  onToggleSave={toggleSave}
                  onToggleFollow={toggleFollow}
                  onOpen={open}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* AI insights — desktop rail */}
      <aside className="sticky top-20 hidden w-72 shrink-0 xl:block 2xl:w-80">
        <AiInsightsPanel onOpenCompany={open} />
      </aside>

      <CompanyDrawer
        company={openCompany}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        saved={openCompany ? savedIds.has(openCompany.id) : false}
        onToggleSave={toggleSave}
        onOpenCompany={open}
      />
    </div>
  );
}

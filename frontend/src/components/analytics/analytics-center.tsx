"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  AutomationAnalytics,
  CompanyAnalytics,
  SalaryAnalytics,
  SkillsAnalytics,
} from "@/components/analytics/breakdown-panels";
import { CareerScoreCard } from "@/components/analytics/career-score";
import { FunnelChart } from "@/components/analytics/funnel-chart";
import {
  AiInsightsCard,
  GoalsCard,
  WeeklyReportCard,
} from "@/components/analytics/insights-rail";
import { KpiCards, KpiCardsSkeleton } from "@/components/analytics/kpi-cards";
import { ResumePerformance } from "@/components/analytics/resume-performance";
import { SourceAnalytics } from "@/components/analytics/source-analytics";
import { TimelineChart } from "@/components/analytics/timeline-chart";
import { Download, Sparkles } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

const EXPORT_FORMATS = ["PDF report", "CSV data", "PNG image"] as const;

function AnalyticsSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-4">
      <KpiCardsSkeleton />
      <div className="flex items-start gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid gap-4 xl:grid-cols-2">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
        </div>
        <div className="hidden w-80 flex-col gap-4 xl:flex">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function AnalyticsCenter() {
  const [loading, setLoading] = React.useState(true);
  const [railOpen, setRailOpen] = React.useState(false);

  // Simulated fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AnalyticsSkeleton />;

  const rail = (
    <div className="flex flex-col gap-4">
      <AiInsightsCard />
      <WeeklyReportCard />
      <GoalsCard />
    </div>
  );

  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        {/* Header row: export + mobile rail trigger */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            Reviewing <span className="font-medium text-foreground">3 months</span> of
            job-search performance · updated this morning
          </p>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download data-icon="inline-start" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export analytics as</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {EXPORT_FORMATS.map((format) => (
                  <DropdownMenuItem
                    key={format}
                    onSelect={() =>
                      toast.success(`Exporting your analytics as a ${format} — ready in a moment.`)
                    }
                  >
                    {format}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ai"
              size="sm"
              className="xl:hidden"
              onClick={() => setRailOpen(true)}
            >
              <Sparkles data-icon="inline-start" />
              AI Insights
            </Button>
          </div>
        </div>

        <KpiCards />

        <div className="flex items-start gap-6">
          {/* Charts & performance — center */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="grid gap-4 xl:grid-cols-2">
              <CareerScoreCard />
              <FunnelChart />
            </div>
            <TimelineChart />
            <ResumePerformance />
            <SourceAnalytics />
            <div className="grid gap-4 xl:grid-cols-2">
              <SkillsAnalytics />
              <SalaryAnalytics />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <CompanyAnalytics />
              <AutomationAnalytics />
            </div>
          </div>

          {/* AI insights — desktop rail */}
          <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-80 shrink-0 overflow-y-auto pb-4 xl:block 2xl:w-88">
            {rail}
          </aside>
        </div>

        {/* AI insights — mobile sheet */}
        <Sheet open={railOpen} onOpenChange={setRailOpen}>
          <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
            <SheetHeader className="border-b">
              <SheetTitle>AI Insights</SheetTitle>
              <SheetDescription>
                CareerCopilot&apos;s read on your performance.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">{rail}</div>
          </SheetContent>
        </Sheet>
      </div>
    </FadeIn>
  );
}

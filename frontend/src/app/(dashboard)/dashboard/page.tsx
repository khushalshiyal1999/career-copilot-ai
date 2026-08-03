import type { Metadata } from "next";

import {
  ActivityTimeline,
  AiInsights,
  AiRecommendation,
  AutomationStatus,
  DashboardBackground,
  DashboardHero,
  JobMatches,
  RecentApplications,
  ResumeHealth,
  StatsGrid,
} from "@/components/dashboard";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <DashboardBackground />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <FadeIn>
          <DashboardHero name="Khushal" />
        </FadeIn>

        <StatsGrid />

        <FadeIn delay={0.1}>
          <AiRecommendation />
        </FadeIn>

        <JobMatches />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <FadeIn delay={0.1} className="lg:col-span-2">
            <RecentApplications />
          </FadeIn>
          <FadeIn delay={0.15} className="flex flex-col gap-6">
            <AutomationStatus />
            <AiInsights />
          </FadeIn>
          <FadeIn delay={0.2} className="lg:col-span-2">
            <ResumeHealth />
          </FadeIn>
          <FadeIn delay={0.25}>
            <ActivityTimeline />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { toast } from "sonner";

import { AiSummary } from "@/components/settings/ai-summary";
import {
  ACTIVITY_SEED,
  NAV_SECTIONS,
  SKILLS_DEFAULT,
  type SectionId,
  type SettingsActivity,
  type Skill,
} from "@/components/settings/data";
import { AccountsSection, NotificationsSection } from "@/components/settings/section-accounts";
import { AiPrefsSection, AutomationSection } from "@/components/settings/section-automation-ai";
import { CareerSection } from "@/components/settings/section-career";
import { JobPrefsSection } from "@/components/settings/section-job-prefs";
import { ActivitySection, AboutSection, BillingSection } from "@/components/settings/section-misc";
import { ProfileSection } from "@/components/settings/section-profile";
import { SecuritySection } from "@/components/settings/section-security";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Check, Menu } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

function SettingsSkeleton() {
  return (
    <div aria-hidden className="flex items-start gap-8">
      <div className="hidden w-56 flex-col gap-1.5 lg:flex">
        {Array.from({ length: 9 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-full rounded-lg" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function SettingsCenter() {
  const [active, setActive] = React.useState<SectionId>("profile");
  const [loading, setLoading] = React.useState(true);
  const [navOpen, setNavOpen] = React.useState(false);
  const [skills, setSkills] = React.useState<Skill[]>(SKILLS_DEFAULT);
  const [activity, setActivity] = React.useState<SettingsActivity[]>(ACTIVITY_SEED);

  // Simulated fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const log = React.useCallback((text: string) => {
    setActivity((prev) =>
      [
        { id: `sa-${Date.now()}-${prev.length}`, text, when: "Just now" },
        ...prev,
      ].slice(0, 20)
    );
  }, []);

  const boostSuggestedSkills = () => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.name === "Docker" || skill.name === "GraphQL"
          ? { ...skill, priority: "medium" as const }
          : skill
      )
    );
    log("Docker and GraphQL priority raised on AI suggestion.");
    toast.success(
      "Docker and GraphQL bumped to medium priority — match scores will recalculate overnight."
    );
    setActive("career");
  };

  const activeSection = NAV_SECTIONS.find((s) => s.id === active);

  const content = (() => {
    switch (active) {
      case "profile":
        return <ProfileSection log={log} />;
      case "career":
        return <CareerSection skills={skills} onSkillsChange={setSkills} log={log} />;
      case "job-prefs":
        return <JobPrefsSection log={log} />;
      case "automation":
        return <AutomationSection log={log} />;
      case "ai":
        return <AiPrefsSection log={log} />;
      case "accounts":
        return <AccountsSection log={log} />;
      case "notifications":
        return <NotificationsSection log={log} />;
      case "security":
        return <SecuritySection log={log} />;
      case "billing":
        return <BillingSection />;
      case "about":
        return <AboutSection />;
      case "activity":
        return <ActivitySection entries={activity} />;
    }
  })();

  if (loading) return <SettingsSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <AiSummary onApplySkillSuggestion={boostSuggestedSkills} />

      {/* Mobile: current section + drawer trigger */}
      <div className="flex items-center justify-between gap-2 lg:hidden">
        <span className="font-heading text-sm font-semibold">
          {activeSection?.label}
        </span>
        <Button variant="outline" size="sm" onClick={() => setNavOpen(true)}>
          <Menu data-icon="inline-start" />
          Sections
        </Button>
      </div>

      <div className="flex items-start gap-8">
        {/* Nav — desktop rail */}
        <aside className="sticky top-20 hidden w-56 shrink-0 lg:block">
          <SettingsNav active={active} onSelect={setActive} />
          <p className="mt-4 flex items-center gap-1.5 px-3 text-xs text-muted-foreground">
            <Check aria-hidden className="size-3.5 text-success" />
            All changes saved automatically
          </p>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <FadeIn key={active}>{content}</FadeIn>
        </div>
      </div>

      {/* Nav — mobile sheet */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Your career control center.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-3">
            <SettingsNav
              active={active}
              onSelect={(id) => {
                setActive(id);
                setNavOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

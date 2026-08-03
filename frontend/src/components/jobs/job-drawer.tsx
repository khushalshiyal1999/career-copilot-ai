"use client";

import * as React from "react";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { CompanyMark } from "@/components/dashboard/company-mark";
import { Emphasis } from "@/components/dashboard/emphasis";
import { matchTier, postedLabel, type Job } from "@/components/jobs/data";
import { MatchRing } from "@/components/jobs/match-ring";
import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  Check,
  Clock,
  Flame,
  MapPin,
  Plus,
  X,
  Zap,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface JobDrawerProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saved: boolean;
  onToggleSave: (job: Job) => void;
  onApply: (job: Job) => void;
}

function DrawerSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-heading text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm text-muted-foreground"
        >
          <span
            aria-hidden
            className="mt-2 size-1 shrink-0 rounded-full bg-primary/60"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

const TYPE_LABEL = {
  "full-time": "Full-time",
  contract: "Contract",
  "part-time": "Part-time",
} as const;

/** Full job details in a right-side drawer. */
export function JobDrawer({
  job,
  open,
  onOpenChange,
  saved,
  onToggleSave,
  onApply,
}: JobDrawerProps) {
  if (!job) return null;
  const tier = matchTier(job.match);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-xl"
        aria-describedby={undefined}
      >
        <div className="flex-1 overflow-y-auto">
          <SheetHeader className="gap-4 border-b p-5">
            <div className="flex items-start justify-between gap-4 pr-8">
              <div className="flex items-center gap-3">
                <CompanyMark company={job.company} size="lg" />
                <div className="flex flex-col">
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    {job.company.name}
                    {job.company.verified && (
                      <BadgeCheck
                        aria-label="Verified company"
                        className="size-4 text-info"
                      />
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock aria-hidden className="size-3" />
                    Posted {postedLabel(job.postedHoursAgo)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MatchRing match={job.match} size="lg" />
                <span className="text-[10px] font-medium whitespace-nowrap text-muted-foreground">
                  {tier.label}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SheetTitle className="text-lg leading-snug">
                {job.role}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Job details for {job.role} at {job.company.name}
              </SheetDescription>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                <span className="font-medium tabular-nums">
                  {job.salaryLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin aria-hidden className="size-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  {job.workMode === "remote" && (
                    <Badge variant="info">Remote</Badge>
                  )}
                  <Badge variant="outline">{TYPE_LABEL[job.type]}</Badge>
                  {job.visaSponsorship && (
                    <Badge variant="outline">Visa sponsorship</Badge>
                  )}
                  {job.closingSoon && (
                    <Badge variant="warning" className="gap-1">
                      <Flame />
                      Closing soon
                    </Badge>
                  )}
                </span>
              </div>
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-6 p-5">
            {/* AI summary */}
            <div className="flex flex-col gap-2 rounded-xl bg-accent/50 p-4 ring-1 ring-primary/15">
              <div className="flex items-center gap-2">
                <AiAvatar size="sm" />
                <span className="text-xs font-semibold">
                  CareerCopilot summary
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                <Emphasis text={job.aiSummary} strongClassName="text-primary" />
              </p>
            </div>

            {/* Match analysis */}
            <DrawerSection title="Match analysis">
              <div className="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">Resume match</span>
                  <span className="font-semibold text-primary tabular-nums">
                    {job.resumeMatch}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)]"
                    style={{ width: `${job.resumeMatch}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {job.matchReasons.map((reason) => (
                    <span
                      key={reason.label}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm",
                        reason.hit
                          ? "text-foreground"
                          : "text-muted-foreground line-through decoration-muted-foreground/40"
                      )}
                    >
                      {reason.hit ? (
                        <Check aria-hidden className="size-3.5 text-success" />
                      ) : (
                        <X aria-hidden className="size-3.5 text-muted-foreground" />
                      )}
                      {reason.label}
                    </span>
                  ))}
                </div>
                {job.missingSkills.length > 0 && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Missing from your resume
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.missingSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="gap-1">
                            <Plus aria-hidden />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </DrawerSection>

            <DrawerSection title="About the role">
              <div className="flex flex-col gap-2.5">
                {job.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </DrawerSection>

            <DrawerSection title="Responsibilities">
              <BulletList items={job.responsibilities} />
            </DrawerSection>

            <DrawerSection title="Requirements">
              <BulletList items={job.requirements} />
            </DrawerSection>

            <DrawerSection title="Benefits">
              <BulletList items={job.benefits} />
            </DrawerSection>

            <DrawerSection title="Skills">
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </DrawerSection>

            <DrawerSection title={`About ${job.company.name}`}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {job.company.about}
              </p>
            </DrawerSection>
          </div>
        </div>

        <SheetFooter className="flex-row border-t bg-card p-4">
          <Button
            variant="outline"
            className="flex-1"
            aria-pressed={saved}
            onClick={() => onToggleSave(job)}
          >
            {saved ? (
              <BookmarkCheck data-icon="inline-start" className="text-primary" />
            ) : (
              <Bookmark data-icon="inline-start" />
            )}
            {saved ? "Saved" : "Save"}
          </Button>
          <Button variant="ai" className="flex-2" onClick={() => onApply(job)}>
            {job.easyApply && <Zap data-icon="inline-start" />}
            {job.easyApply ? "Easy Apply" : "Apply"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

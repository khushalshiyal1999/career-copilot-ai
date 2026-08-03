"use client";

import * as React from "react";
import { toast } from "sonner";

import { AiScoreBadge, StarRating } from "@/components/companies/company-card";
import {
  companyById,
  HIRING_STATUS_META,
  VERDICT_META,
  type CompanyProfile,
} from "@/components/companies/data";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { CompanyMark } from "@/components/dashboard/company-mark";
import { Emphasis } from "@/components/dashboard/emphasis";
import {
  BadgeCheck,
  Banknote,
  Bookmark,
  BookmarkCheck,
  Building2,
  Check,
  ExternalLink,
  GitCompareArrows,
  MapPin,
  Newspaper,
  Rocket,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Users,
  X,
  Zap,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function DrawerSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        {Icon && <Icon aria-hidden className="size-3.5 text-muted-foreground" />}
        {title}
      </h3>
      {children}
    </section>
  );
}

/** 6-month hiring trend — grouped bars, pure CSS. */
function HiringTrendChart({ company }: { company: CompanyProfile }) {
  const max = Math.max(...company.hiringTrend.map((m) => m.opened));
  const first = company.hiringTrend[0].opened;
  const last = company.hiringTrend[company.hiringTrend.length - 1].opened;
  const growth = Math.round(((last - first) / Math.max(first, 1)) * 100);

  return (
    <div className="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Jobs opened · last 6 months</span>
        <span
          className={cn(
            "inline-flex items-center gap-1 font-medium tabular-nums",
            growth >= 0 ? "text-success" : "text-destructive"
          )}
        >
          <TrendingUp aria-hidden className="size-3" />
          {growth >= 0 ? "+" : ""}
          {growth}%
        </span>
      </div>
      <div className="flex h-28 items-end gap-2" role="img" aria-label="Hiring trend chart">
        {company.hiringTrend.map((month) => (
          <Tooltip key={month.month}>
            <TooltipTrigger asChild>
              <div className="flex h-full flex-1 cursor-default flex-col items-center justify-end gap-1">
                <div className="flex w-full flex-1 items-end justify-center gap-1">
                  <span
                    className="w-2.5 rounded-t-sm bg-primary/80 transition-all duration-500"
                    style={{ height: `${(month.opened / max) * 100}%` }}
                  />
                  <span
                    className="w-2.5 rounded-t-sm bg-info/50 transition-all duration-500"
                    style={{ height: `${(month.interviews / max) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{month.month}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {month.month}: {month.opened} jobs opened · {month.interviews} interview invites
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-sm bg-primary/80" />
          Jobs opened
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-sm bg-info/50" />
          Interview invitations
        </span>
      </div>
    </div>
  );
}

interface CompanyDrawerProps {
  company: CompanyProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saved: boolean;
  onToggleSave: (company: CompanyProfile) => void;
  onOpenCompany: (company: CompanyProfile) => void;
}

/** Full research profile in a right-side drawer. */
export function CompanyDrawer({
  company,
  open,
  onOpenChange,
  saved,
  onToggleSave,
  onOpenCompany,
}: CompanyDrawerProps) {
  if (!company) return null;
  const hiring = HIRING_STATUS_META[company.hiringStatus];
  const verdict = VERDICT_META[company.ai.verdict];

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
                <CompanyMark company={company} size="lg" />
                <div className="flex flex-col">
                  <SheetTitle className="flex items-center gap-1.5 text-lg leading-snug">
                    {company.name}
                    {company.verified && (
                      <BadgeCheck aria-label="Verified" className="size-4 text-info" />
                    )}
                  </SheetTitle>
                  <SheetDescription className="text-xs">
                    {company.industry} · {company.location}
                  </SheetDescription>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <AiScoreBadge score={company.aiScore} />
                <span className="text-[10px] text-muted-foreground">AI hiring score</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant={hiring.badgeVariant}>{hiring.label}</Badge>
              {company.remoteFriendly && <Badge variant="info">Remote friendly</Badge>}
              <Badge variant="outline">{company.openPositions} open roles</Badge>
              <Badge variant="outline">{company.fundingStage}</Badge>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
              {(
                [
                  [Users, "Employees", company.employeeCount],
                  [Banknote, "Salary range", company.salaryRange],
                  [Building2, "Founded", String(company.founded)],
                  [TrendingUp, "Response rate", `${company.responseRate}%`],
                ] as const
              ).map(([Icon, label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <Icon aria-hidden className="size-3" />
                    {label}
                  </dt>
                  <dd className="font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </SheetHeader>

          <div className="flex flex-col gap-6 p-5">
            {/* AI analysis */}
            <div className="flex flex-col gap-3 rounded-xl bg-accent/50 p-4 ring-1 ring-primary/15">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AiAvatar size="sm" />
                  <span className="text-xs font-semibold">Should you apply?</span>
                </div>
                <Badge variant={verdict.badgeVariant}>{verdict.label}</Badge>
              </div>
              <div className="flex flex-col gap-1.5">
                {company.ai.insights.map((insight) => (
                  <p
                    key={insight}
                    className="rounded-2xl rounded-tl-sm bg-background/70 px-3 py-2 text-xs leading-relaxed"
                  >
                    <Emphasis text={insight} strongClassName="text-primary" />
                  </p>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 rounded-lg bg-background/70 p-2.5">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-success uppercase tracking-wider">
                    <ThumbsUp aria-hidden className="size-3" />
                    Pros
                  </span>
                  {company.ai.pros.map((pro) => (
                    <span key={pro} className="flex items-start gap-1.5 text-xs">
                      <Check aria-hidden className="mt-0.5 size-3 shrink-0 text-success" />
                      {pro}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5 rounded-lg bg-background/70 p-2.5">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-destructive uppercase tracking-wider">
                    <ThumbsDown aria-hidden className="size-3" />
                    Cons
                  </span>
                  {company.ai.cons.map((con) => (
                    <span key={con} className="flex items-start gap-1.5 text-xs">
                      <X aria-hidden className="mt-0.5 size-3 shrink-0 text-destructive" />
                      {con}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                <Emphasis text={company.ai.recommendation} strongClassName="text-primary" />
              </p>
            </div>

            {/* Overview */}
            <DrawerSection title="Overview" icon={Building2}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {company.overview}
              </p>
              <p className="rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground italic">
                &ldquo;{company.mission}&rdquo;
              </p>
            </DrawerSection>

            {/* Hiring timeline */}
            <DrawerSection title="Hiring timeline" icon={TrendingUp}>
              <HiringTrendChart company={company} />
            </DrawerSection>

            {/* Open jobs */}
            <DrawerSection title="Open jobs" icon={Zap}>
              <div className="flex flex-col gap-1.5">
                {company.openJobs.map((job) => (
                  <div
                    key={job.role}
                    className="flex flex-wrap items-center gap-2 rounded-lg p-2.5 ring-1 ring-foreground/10"
                  >
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium">{job.role}</span>
                      <span className="text-xs text-muted-foreground">
                        {job.salary} · {job.location}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-success tabular-nums">
                      {job.match}%
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="xs"
                        onClick={() =>
                          toast.success(
                            `Application to ${company.name} queued — tailoring your resume for "${job.role}".`
                          )
                        }
                      >
                        Apply
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`Save ${job.role}`}
                        onClick={() => toast(`Saved ${job.role}.`)}
                      >
                        <Bookmark />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`Compare ${job.role}`}
                        onClick={() => toast(`${job.role} added to compare.`)}
                      >
                        <GitCompareArrows />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DrawerSection>

            {/* Tech stack & products */}
            <DrawerSection title="Technology stack">
              <div className="flex flex-wrap gap-1.5">
                {company.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </DrawerSection>

            <DrawerSection title="Products" icon={Rocket}>
              <div className="flex flex-wrap gap-1.5">
                {company.products.map((product) => (
                  <Badge key={product} variant="outline">
                    {product}
                  </Badge>
                ))}
              </div>
            </DrawerSection>

            {/* Hiring process */}
            <DrawerSection title="Hiring process">
              <ol className="flex flex-col gap-1.5">
                {company.hiringProcess.map((step, index) => (
                  <li key={step} className="flex items-center gap-2.5 text-sm">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs">
                <span className="text-muted-foreground">Interview difficulty</span>
                <span className="flex items-center gap-2">
                  <Badge
                    variant={
                      company.interviewDifficulty.label === "Hard"
                        ? "error"
                        : company.interviewDifficulty.label === "Moderate"
                          ? "warning"
                          : "success"
                    }
                  >
                    {company.interviewDifficulty.label}
                  </Badge>
                  <StarRating rating={company.interviewDifficulty.rating} label="Difficulty" />
                </span>
              </div>
            </DrawerSection>

            {/* Culture & benefits */}
            <DrawerSection title="Work culture">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {company.culture}
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  Culture <StarRating rating={company.cultureRating} label="Culture" />
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  Salary <StarRating rating={company.salaryRating} label="Salary" />
                </span>
              </div>
            </DrawerSection>

            <DrawerSection title="Benefits">
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {company.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </DrawerSection>

            {/* Reviews */}
            <DrawerSection title="Employee reviews">
              <div className="flex flex-col gap-2">
                {company.reviews.map((review) => (
                  <div
                    key={`${review.role}-${review.department}`}
                    className="flex flex-col gap-1.5 rounded-xl p-3 ring-1 ring-foreground/10"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium">
                        {review.role}
                        <span className="text-muted-foreground"> · {review.department}</span>
                      </span>
                      <StarRating rating={review.rating} label="Review rating" />
                    </div>
                    <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <ThumbsUp aria-hidden className="mt-0.5 size-3 shrink-0 text-success" />
                      {review.pros}
                    </p>
                    <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <ThumbsDown aria-hidden className="mt-0.5 size-3 shrink-0 text-destructive" />
                      {review.cons}
                    </p>
                  </div>
                ))}
              </div>
            </DrawerSection>

            {/* Offices, news, links */}
            <DrawerSection title="Office locations" icon={MapPin}>
              <div className="flex flex-wrap gap-1.5">
                {company.offices.map((office) => (
                  <Badge key={office} variant="outline">
                    {office}
                  </Badge>
                ))}
              </div>
            </DrawerSection>

            <DrawerSection title="Recent news" icon={Newspaper}>
              <ul className="flex flex-col gap-2">
                {company.news.map((item) => (
                  <li key={item.title} className="flex flex-col">
                    <span className="text-sm leading-snug">{item.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.source} · {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            </DrawerSection>

            <DrawerSection title="Links" icon={ExternalLink}>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    ["Website", company.website],
                    ["LinkedIn", `https://www.linkedin.com/company/${company.id}`],
                    ["Glassdoor", `https://www.glassdoor.com/Overview/${company.id}`],
                  ] as const
                ).map(([label, url]) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium ring-1 ring-foreground/10 transition-all hover:text-primary hover:ring-primary/40"
                  >
                    <ExternalLink aria-hidden className="size-3" />
                    {label}
                  </a>
                ))}
              </div>
            </DrawerSection>

            <Separator />

            {/* Similar companies */}
            <DrawerSection title="Similar companies">
              <div className="flex flex-col gap-1.5">
                {company.similar
                  .map(companyById)
                  .filter((c): c is CompanyProfile => c !== undefined)
                  .map((similar) => (
                    <button
                      key={similar.id}
                      type="button"
                      onClick={() => onOpenCompany(similar)}
                      className="flex items-center gap-2.5 rounded-lg p-2 text-left ring-1 ring-foreground/10 transition-all hover:ring-foreground/25"
                    >
                      <CompanyMark company={similar} />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium">{similar.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {similar.industry} · {similar.openPositions} open roles
                        </span>
                      </span>
                      <AiScoreBadge score={similar.aiScore} />
                    </button>
                  ))}
              </div>
            </DrawerSection>
          </div>
        </div>

        <SheetFooter className="flex-row border-t bg-card p-4">
          <Button
            variant="outline"
            className="flex-1"
            aria-pressed={saved}
            onClick={() => onToggleSave(company)}
          >
            {saved ? (
              <BookmarkCheck data-icon="inline-start" className="text-primary" />
            ) : (
              <Bookmark data-icon="inline-start" />
            )}
            {saved ? "Saved" : "Save Company"}
          </Button>
          <Button
            variant="ai"
            className="flex-2"
            onClick={() =>
              toast.success(
                `Watching ${company.name} — I'll alert you the moment a 90%+ match opens.`
              )
            }
          >
            <Zap data-icon="inline-start" />
            Watch for Matches
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

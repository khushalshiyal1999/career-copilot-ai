"use client";

import * as React from "react";

import { CompanyMark } from "@/components/dashboard/company-mark";
import { matchTier, postedLabel, type Job } from "@/components/jobs/data";
import { MatchRing } from "@/components/jobs/match-ring";
import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  Clock,
  Flame,
  MapPin,
  MoreHorizontal,
  Sparkles,
  Zap,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface JobCardProps {
  job: Job;
  view: "grid" | "list";
  saved: boolean;
  onToggleSave: (job: Job) => void;
  onApply: (job: Job) => void;
  onOpen: (job: Job) => void;
  onHide: (job: Job) => void;
}

const TYPE_LABEL = {
  "full-time": "Full-time",
  contract: "Contract",
  "part-time": "Part-time",
} as const;

function CardActions({
  job,
  saved,
  onToggleSave,
  onApply,
  onOpen,
  onHide,
}: Omit<JobCardProps, "view">) {
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={saved ? `Unsave ${job.role}` : `Save ${job.role}`}
        aria-pressed={saved}
        onClick={(event) => {
          event.stopPropagation();
          onToggleSave(job);
        }}
      >
        {saved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="More options"
            onClick={(event) => event.stopPropagation()}
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenuItem onSelect={() => onOpen(job)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onHide(job)}>
            Not interested
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onOpen(job);
        }}
      >
        Details
      </Button>
      <Button
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onApply(job);
        }}
      >
        {job.easyApply && <Zap data-icon="inline-start" />}
        Apply
      </Button>
    </div>
  );
}

function CompanyLine({ job }: { job: Job }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1 text-sm text-muted-foreground">
      <span className="truncate">{job.company.name}</span>
      {job.company.verified && (
        <BadgeCheck
          aria-label="Verified company"
          className="size-3.5 shrink-0 text-info"
        />
      )}
    </span>
  );
}

function MetaBadges({ job }: { job: Job }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
      <span className="font-medium tabular-nums">{job.salaryLabel}</span>
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <MapPin aria-hidden className="size-3.5" />
        {job.location}
      </span>
      <span className="flex items-center gap-1.5">
        {job.workMode === "remote" && <Badge variant="info">Remote</Badge>}
        <Badge variant="outline">{TYPE_LABEL[job.type]}</Badge>
        {job.closingSoon && (
          <Badge variant="warning" className="gap-1">
            <Flame />
            Closing soon
          </Badge>
        )}
      </span>
    </div>
  );
}

/** One job in the results — grid card or list row, opened via click. */
export function JobCard(props: JobCardProps) {
  const { job, view, onOpen } = props;
  const tier = matchTier(job.match);

  const interactive = cn(
    "group/job cursor-pointer rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-300",
    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:ring-foreground/20",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  );

  const handleOpen = () => onOpen(job);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  if (view === "list") {
    return (
      <article
        role="button"
        tabIndex={0}
        aria-label={`${job.role} at ${job.company.name}`}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        className={cn(interactive, "flex flex-col gap-4 p-4 lg:flex-row lg:items-center")}
      >
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <CompanyMark company={job.company} size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-2">
              <h3 className="font-heading font-medium leading-snug">
                {job.role}
              </h3>
              <CompanyLine job={job} />
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock aria-hidden className="size-3" />
                {postedLabel(job.postedHoursAgo)}
              </span>
            </div>
            <MetaBadges job={job} />
            <div className="hidden flex-wrap gap-1.5 xl:flex">
              {job.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-between gap-4 lg:flex-col lg:items-end">
          <div className="flex items-center gap-2">
            <MatchRing match={job.match} />
            <span className="text-xs font-medium text-muted-foreground lg:hidden">
              {tier.label}
            </span>
          </div>
          <CardActions {...props} />
        </div>
      </article>
    );
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${job.role} at ${job.company.name}`}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      className={cn(interactive, "flex h-full flex-col gap-3.5 p-4")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CompanyMark company={job.company} size="lg" />
          <div className="flex min-w-0 flex-col">
            <CompanyLine job={job} />
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock aria-hidden className="size-3" />
              {postedLabel(job.postedHoursAgo)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-0.5">
          <MatchRing match={job.match} />
          <span className="text-[10px] font-medium whitespace-nowrap text-muted-foreground">
            {tier.label}
          </span>
        </div>
      </div>

      <h3 className="font-heading text-base font-medium leading-snug">
        {job.role}
      </h3>

      <MetaBadges job={job} />

      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 5).map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>

      <p className="flex items-start gap-1.5 rounded-lg bg-accent/50 px-2.5 py-2 text-xs leading-relaxed text-accent-foreground">
        <Sparkles aria-hidden className="mt-0.5 size-3 shrink-0" />
        {job.aiReason}
      </p>

      <div className="mt-auto flex items-center justify-end border-t pt-3">
        <CardActions {...props} />
      </div>
    </article>
  );
}

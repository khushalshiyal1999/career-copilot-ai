"use client";

import * as React from "react";

import {
  HIRING_STATUS_META,
  type CompanyProfile,
} from "@/components/companies/data";
import { CompanyMark } from "@/components/dashboard/company-mark";
import {
  BadgeCheck,
  Banknote,
  Bookmark,
  BookmarkCheck,
  Building2,
  MapPin,
  Sparkles,
  Star,
  UserCheck,
  UserPlus,
  Users,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Compact 5-star display with a numeric value. */
export function StarRating({ rating, label }: { rating: number; label?: string }) {
  return (
    <span
      role="img"
      aria-label={`${label ?? "Rating"}: ${rating} out of 5`}
      className="inline-flex items-center gap-1"
    >
      <span aria-hidden className="flex items-center gap-px">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              "size-3",
              index < Math.round(rating)
                ? "fill-warning text-warning"
                : "text-muted-foreground/30"
            )}
          />
        ))}
      </span>
      <span className="text-xs font-medium tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}

export function AiScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-4xl px-2 py-0.5 text-xs font-semibold tabular-nums",
        score >= 90
          ? "bg-success/10 text-success"
          : score >= 80
            ? "bg-info/10 text-info"
            : "bg-warning/15 text-warning"
      )}
    >
      <Sparkles aria-hidden className="size-3" />
      {score}
    </span>
  );
}

export interface CompanyCardProps {
  company: CompanyProfile;
  view: "grid" | "list";
  saved: boolean;
  followed: boolean;
  onToggleSave: (company: CompanyProfile) => void;
  onToggleFollow: (company: CompanyProfile) => void;
  onOpen: (company: CompanyProfile) => void;
}

/** One company in the results — grid card or list row. */
export function CompanyCard(props: CompanyCardProps) {
  const { company, view, saved, followed, onToggleSave, onToggleFollow, onOpen } = props;
  const hiring = HIRING_STATUS_META[company.hiringStatus];

  const interactive = cn(
    "group/company cursor-pointer rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-300",
    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:ring-foreground/20",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(company);
    }
  };

  const actions = (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={saved ? `Unsave ${company.name}` : `Save ${company.name}`}
        aria-pressed={saved}
        onClick={(event) => {
          event.stopPropagation();
          onToggleSave(company);
        }}
      >
        {saved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}
      </Button>
      <Button
        variant={followed ? "secondary" : "outline"}
        size="sm"
        aria-pressed={followed}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFollow(company);
        }}
      >
        {followed ? (
          <UserCheck data-icon="inline-start" />
        ) : (
          <UserPlus data-icon="inline-start" />
        )}
        {followed ? "Following" : "Follow"}
      </Button>
      <Button
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onOpen(company);
        }}
      >
        View Profile
      </Button>
    </div>
  );

  const metaLine = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <span>{company.industry}</span>
      <span className="inline-flex items-center gap-1">
        <MapPin aria-hidden className="size-3" />
        {company.location}
      </span>
      <span className="inline-flex items-center gap-1">
        <Users aria-hidden className="size-3" />
        {company.size}
      </span>
      <span className="inline-flex items-center gap-1">
        <Building2 aria-hidden className="size-3" />
        Founded {company.founded}
      </span>
    </div>
  );

  const statBadges = (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge variant={hiring.badgeVariant}>{hiring.label}</Badge>
      {company.remoteFriendly && <Badge variant="info">Remote friendly</Badge>}
      <Badge variant="outline">{company.openPositions} open roles</Badge>
      <span className="inline-flex items-center gap-1 text-xs font-medium tabular-nums">
        <Banknote aria-hidden className="size-3.5 text-muted-foreground" />
        {company.avgSalary} avg
      </span>
    </div>
  );

  if (view === "list") {
    return (
      <article
        role="button"
        tabIndex={0}
        aria-label={company.name}
        onClick={() => onOpen(company)}
        onKeyDown={handleKeyDown}
        className={cn(interactive, "flex flex-col gap-3 p-4 lg:flex-row lg:items-center")}
      >
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <CompanyMark company={company} size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="flex items-center gap-1.5">
              <h3 className="truncate font-heading font-medium">{company.name}</h3>
              {company.verified && (
                <BadgeCheck aria-label="Verified" className="size-3.5 shrink-0 text-info" />
              )}
              <AiScoreBadge score={company.aiScore} />
            </span>
            {metaLine}
            {statBadges}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 lg:flex-col lg:items-end">
          <div className="flex items-center gap-3">
            <StarRating rating={company.cultureRating} label="Culture" />
            <span className="text-xs text-muted-foreground tabular-nums">
              {company.responseRate}% respond
            </span>
          </div>
          {actions}
        </div>
      </article>
    );
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={company.name}
      onClick={() => onOpen(company)}
      onKeyDown={handleKeyDown}
      className={cn(interactive, "flex h-full flex-col gap-3 p-4")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CompanyMark company={company} size="lg" />
          <div className="flex min-w-0 flex-col">
            <span className="flex items-center gap-1.5">
              <h3 className="truncate font-heading font-medium">{company.name}</h3>
              {company.verified && (
                <BadgeCheck aria-label="Verified" className="size-3.5 shrink-0 text-info" />
              )}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {company.industry} · Founded {company.founded}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <AiScoreBadge score={company.aiScore} />
          <span className="text-[10px] text-muted-foreground">AI score</span>
        </div>
      </div>

      {metaLine}
      {statBadges}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <StarRating rating={company.cultureRating} label="Culture" />
        <span className="text-muted-foreground">
          Salary <StarRating rating={company.salaryRating} label="Salary" />
        </span>
        <span className="text-muted-foreground tabular-nums">
          {company.responseRate}% respond
        </span>
      </div>

      <div className="mt-auto flex items-center justify-end border-t pt-3">
        {actions}
      </div>
    </article>
  );
}

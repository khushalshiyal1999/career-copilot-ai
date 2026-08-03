"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

import { CompanyMark } from "@/components/dashboard/company-mark";
import { JOB_MATCHES, type JobMatch } from "@/components/dashboard/data";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  Sparkles,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionTitle } from "@/components/ui/section-title";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/utils/format";

function JobCard({ job }: { job: JobMatch }) {
  const [saved, setSaved] = React.useState(false);

  return (
    <article className="flex w-80 shrink-0 snap-start flex-col gap-3.5 rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:ring-foreground/20">
      <div className="flex items-start justify-between gap-2">
        <CompanyMark company={job.company} size="lg" />
        <Badge variant="success" className="gap-1">
          <Sparkles />
          {job.match}% match
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-heading font-medium leading-snug">{job.role}</h3>
        <p className="text-sm text-muted-foreground">{job.company.name}</p>
      </div>
      <div className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium tabular-nums">
          {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <MapPin aria-hidden className="size-3.5" />
          {job.location}
          {job.remote && (
            <Badge variant="info" className="ml-0.5">
              Remote
            </Badge>
          )}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
      <p className="flex items-start gap-1.5 rounded-lg bg-accent/50 px-2.5 py-2 text-xs leading-relaxed text-accent-foreground">
        <Sparkles aria-hidden className="mt-0.5 size-3 shrink-0" />
        {job.reason}
      </p>
      <div className="mt-auto flex items-center gap-2 border-t pt-3">
        <span className="text-xs text-muted-foreground">{job.postedAgo}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={saved ? `Unsave ${job.role}` : `Save ${job.role}`}
            aria-pressed={saved}
            onClick={() => {
              setSaved((prev) => !prev);
              toast(
                saved
                  ? `Removed ${job.role} from saved jobs`
                  : `Saved ${job.role} at ${job.company.name}`
              );
            }}
          >
            {saved ? (
              <BookmarkCheck className="text-primary" />
            ) : (
              <Bookmark />
            )}
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast.success(
                `Application to ${job.company.name} queued — AI is tailoring your resume.`
              )
            }
          >
            Apply
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Horizontally scrollable rail of today's best job matches. */
export function JobMatches() {
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle
        title="Today's Job Matches"
        description="Ranked by AI fit against your resume and preferences."
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.jobs}>View all</Link>
          </Button>
        }
      />
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {JOB_MATCHES.map((job, index) => (
          <FadeIn key={job.id} delay={0.05 * index} className="flex shrink-0">
            <JobCard job={job} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

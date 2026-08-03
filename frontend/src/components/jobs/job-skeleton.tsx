import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Placeholder card shown while the job feed loads. */
export function JobCardSkeleton({ view }: { view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="flex items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        <Skeleton className="size-10 rounded-lg" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
        <Skeleton className="size-11 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
        <Skeleton className="size-11 rounded-full" />
      </div>
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3.5 w-3/5" />
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-14 rounded-4xl" />
        <Skeleton className="h-5 w-16 rounded-4xl" />
        <Skeleton className="h-5 w-12 rounded-4xl" />
      </div>
      <Skeleton className="h-12 w-full rounded-lg" />
      <div className="flex justify-end gap-2 border-t pt-3">
        <Skeleton className="h-7 w-16 rounded-lg" />
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
    </div>
  );
}

export function JobsSkeletonGrid({
  view,
  count = 6,
  className,
}: {
  view: "grid" | "list";
  count?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        view === "grid"
          ? "grid grid-cols-1 gap-4 md:grid-cols-2"
          : "flex flex-col gap-3",
        className
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <JobCardSkeleton key={index} view={view} />
      ))}
    </div>
  );
}

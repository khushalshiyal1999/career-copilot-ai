import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder row shown while the tracker loads. */
export function ApplicationRowSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-card p-3.5 ring-1 ring-foreground/10">
      <Skeleton className="size-10 rounded-lg" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-2/5" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20 rounded-4xl" />
          <Skeleton className="h-5 w-24 rounded-4xl" />
        </div>
      </div>
      <Skeleton className="h-4 w-10" />
    </div>
  );
}

export function ApplicationListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden className="flex flex-col gap-2.5">
      {Array.from({ length: count }, (_, index) => (
        <ApplicationRowSkeleton key={index} />
      ))}
    </div>
  );
}

/** Placeholder for the right-hand details panel. */
export function ApplicationDetailsSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-5 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <div className="flex items-start gap-3">
        <Skeleton className="size-10 rounded-lg" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-36 w-full rounded-xl" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-7 rounded-full" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3.5 w-3/5" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

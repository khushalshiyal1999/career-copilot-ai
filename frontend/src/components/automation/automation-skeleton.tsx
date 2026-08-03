import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export function WorkflowListSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-2.5">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-16 rounded-4xl" />
          </div>
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      ))}
    </div>
  );
}

export function WorkflowDetailSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col gap-5 rounded-xl bg-card p-5 ring-1 ring-foreground/10"
    >
      <div className="flex items-center gap-2">
        <Skeleton className="size-2.5 rounded-full" />
        <Skeleton className="h-5 w-44" />
        <Skeleton className="ml-auto h-7 w-24 rounded-lg" />
        <Skeleton className="h-7 w-20 rounded-lg" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-14 rounded-lg" />
        ))}
      </div>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="size-7 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      ))}
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
}

export function ActivityPanelSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-4 w-28" />
        </div>
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-xl" />
        ))}
        <div className="grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-7 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        <Skeleton className="h-4 w-24" />
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

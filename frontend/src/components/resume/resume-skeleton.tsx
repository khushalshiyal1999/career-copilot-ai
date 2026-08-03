import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export function ResumeLibrarySkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-2.5">
      <Skeleton className="h-8 w-full rounded-lg" />
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10"
        >
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-10 rounded-4xl" />
            <Skeleton className="h-5 w-14 rounded-4xl" />
            <Skeleton className="h-5 w-10 rounded-4xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResumePreviewSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-44 rounded-lg" />
        <Skeleton className="h-8 w-36 rounded-lg" />
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-card p-7 ring-1 ring-foreground/10">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-2/5" />
          <Skeleton className="h-3.5 w-1/4" />
        </div>
        <Skeleton className="h-16 w-full" />
        <div className="flex gap-1.5">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-5 w-16 rounded-4xl" />
          ))}
        </div>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AiPanelSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-lg" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-24 w-full rounded-xl" />
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-lg" />
      ))}
      <div className="grid grid-cols-2 gap-1.5">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-7 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

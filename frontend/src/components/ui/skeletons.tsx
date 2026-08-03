import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonTextProps extends React.ComponentProps<"div"> {
  lines?: number
}

/** Paragraph placeholder; the last line is shortened for realism. */
function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div
      data-slot="skeleton-text"
      aria-hidden
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", index === lines - 1 && lines > 1 && "w-3/5")}
        />
      ))}
    </div>
  )
}

interface SkeletonAvatarProps extends React.ComponentProps<"div"> {
  size?: "sm" | "default" | "lg"
}

const skeletonAvatarSizes = {
  sm: "size-6",
  default: "size-8",
  lg: "size-10",
} as const

function SkeletonAvatar({
  size = "default",
  className,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      data-slot="skeleton-avatar"
      aria-hidden
      className={cn("rounded-full", skeletonAvatarSizes[size], className)}
      {...props}
    />
  )
}

interface SkeletonCardProps extends React.ComponentProps<"div"> {
  /** Show the avatar + title header row. */
  showHeader?: boolean
  lines?: number
}

/** Card-shaped placeholder matching the base Card footprint. */
function SkeletonCard({
  showHeader = true,
  lines = 3,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      data-slot="skeleton-card"
      aria-hidden
      className={cn(
        "flex w-full flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10",
        className
      )}
      {...props}
    >
      {showHeader && (
        <div className="flex items-center gap-3">
          <SkeletonAvatar />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      )}
      <SkeletonText lines={lines} />
    </div>
  )
}

export { SkeletonAvatar, SkeletonCard, SkeletonText }

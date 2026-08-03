import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusDotVariants = cva("relative inline-flex shrink-0 rounded-full", {
  variants: {
    tone: {
      neutral: "bg-muted-foreground/50",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-destructive",
      info: "bg-info",
      running: "bg-info",
    },
    size: {
      sm: "size-1.5",
      default: "size-2",
      lg: "size-2.5",
    },
  },
  defaultVariants: {
    tone: "neutral",
    size: "default",
  },
})

interface StatusDotProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof statusDotVariants> {
  /** Visible text next to the dot. Without it, provide an aria-label. */
  label?: React.ReactNode
  /** Pulse animation (on by default for the "running" tone). */
  pulse?: boolean
}

/** Tiny colored indicator for statuses; pairs with a label or aria-label. */
function StatusDot({
  tone = "neutral",
  size = "default",
  label,
  pulse,
  className,
  ...props
}: StatusDotProps) {
  const shouldPulse = pulse ?? tone === "running"

  const dot = (
    <span
      data-slot="status-dot"
      aria-hidden={label ? true : undefined}
      className={cn(statusDotVariants({ tone, size }), !label && className)}
      {...(label ? {} : props)}
    >
      {shouldPulse && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 animate-ping rounded-full opacity-60",
            statusDotVariants({ tone, size })
          )}
        />
      )}
    </span>
  )

  if (!label) return dot

  return (
    <span
      data-slot="status"
      className={cn("inline-flex items-center gap-1.5 text-sm", className)}
      {...props}
    >
      {dot}
      {label}
    </span>
  )
}

export { StatusDot }
export type { StatusDotProps }

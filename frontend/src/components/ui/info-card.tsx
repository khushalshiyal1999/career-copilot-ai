import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const infoCardVariants = cva(
  "flex w-full items-start gap-3 rounded-xl p-4 text-sm ring-1",
  {
    variants: {
      tone: {
        default: "bg-card text-card-foreground ring-foreground/10",
        info: "bg-info/5 text-foreground ring-info/20",
        success: "bg-success/5 text-foreground ring-success/20",
        warning: "bg-warning/10 text-foreground ring-warning/30",
        destructive: "bg-destructive/5 text-foreground ring-destructive/20",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

const infoCardIconStyles = {
  default: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning dark:text-warning",
  destructive: "text-destructive",
} as const

interface InfoCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof infoCardVariants> {
  icon?: React.ReactNode
  title: string
  description?: React.ReactNode
  /** Optional trailing content (e.g. a dismiss button or link). */
  action?: React.ReactNode
}

/** Inline informational panel for hints, callouts, and non-blocking alerts. */
function InfoCard({
  icon,
  title,
  description,
  action,
  tone = "default",
  className,
  children,
  ...props
}: InfoCardProps) {
  return (
    <div
      data-slot="info-card"
      role={tone === "destructive" || tone === "warning" ? "alert" : undefined}
      className={cn(infoCardVariants({ tone }), className)}
      {...props}
    >
      {icon && (
        <span
          aria-hidden
          className={cn(
            "mt-0.5 shrink-0 [&_svg:not([class*='size-'])]:size-4",
            infoCardIconStyles[tone ?? "default"]
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-medium">{title}</span>
        {description && (
          <span className="text-muted-foreground">{description}</span>
        )}
        {children}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  )
}

export { InfoCard }
export type { InfoCardProps }

import * as React from "react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps extends React.ComponentProps<typeof Card> {
  label: string
  value: React.ReactNode
  /** Change vs. the previous period, e.g. "+12.5%". */
  delta?: string
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
  /** Context line under the value, e.g. "vs. last month". */
  caption?: React.ReactNode
  footer?: React.ReactNode
}

const trendStyles = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
} as const

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
} as const

/** KPI tile for dashboards: label, value, and an optional trend delta. */
function MetricCard({
  label,
  value,
  delta,
  trend = "neutral",
  icon,
  caption,
  footer,
  className,
  ...props
}: MetricCardProps) {
  const TrendIcon = trendIcons[trend]

  return (
    <Card className={cn("gap-2", className)} {...props}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          {icon && (
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-4"
            >
              {icon}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                trendStyles[trend]
              )}
            >
              <TrendIcon aria-hidden className="size-3.5" />
              {delta}
            </span>
          )}
        </div>
        {caption && (
          <p className="text-xs text-muted-foreground">{caption}</p>
        )}
      </CardContent>
      {footer && <CardFooter className="text-xs">{footer}</CardFooter>}
    </Card>
  )
}

export { MetricCard }
export type { MetricCardProps }

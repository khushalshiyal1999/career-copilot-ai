import * as React from "react"

import { cn } from "@/lib/utils"

interface SectionTitleProps extends React.ComponentProps<"div"> {
  title: string
  description?: React.ReactNode
  /** Right-aligned actions, e.g. a "View all" link. */
  actions?: React.ReactNode
}

/** Heading row for a content section within a page. */
function SectionTitle({
  title,
  description,
  actions,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      data-slot="section-title"
      className={cn(
        "flex flex-wrap items-start justify-between gap-x-6 gap-y-2",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  )
}

export { SectionTitle }
export type { SectionTitleProps }

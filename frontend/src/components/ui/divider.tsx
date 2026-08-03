import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface DividerProps extends React.ComponentProps<"div"> {
  /** Optional centered label, e.g. "or". */
  children?: React.ReactNode
}

/** Horizontal rule with an optional centered label. */
function Divider({ children, className, ...props }: DividerProps) {
  if (!children) {
    return <Separator className={className} />
  }

  return (
    <div
      data-slot="divider"
      role="separator"
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <Separator className="flex-1" />
      <span className="shrink-0 text-xs text-muted-foreground">
        {children}
      </span>
      <Separator className="flex-1" />
    </div>
  )
}

export { Divider }

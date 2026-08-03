"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

interface ActionCardProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode
  title: string
  description?: React.ReactNode
  /** Render as the child element instead of a button (e.g. a Link). */
  asChild?: boolean
  /** Hide the trailing arrow. */
  hideArrow?: boolean
}

/** Clickable card for launching an action or navigating to a flow. */
function ActionCard({
  icon,
  title,
  description,
  asChild = false,
  hideArrow = false,
  className,
  children,
  ...props
}: ActionCardProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="action-card"
      className={cn(
        "group/action-card flex w-full items-start gap-3 rounded-xl bg-card p-4 text-left text-sm text-card-foreground ring-1 ring-foreground/10 transition-all outline-none select-none",
        "hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon && (
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground [&_svg:not([class*='size-'])]:size-4"
            >
              {icon}
            </span>
          )}
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="font-heading font-medium">{title}</span>
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </span>
          {!hideArrow && (
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 self-center text-muted-foreground transition-transform duration-200 group-hover/action-card:translate-x-0.5 group-hover/action-card:text-foreground"
            />
          )}
        </>
      )}
    </Comp>
  )
}

export { ActionCard }
export type { ActionCardProps }

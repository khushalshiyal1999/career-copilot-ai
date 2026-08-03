import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

type TypographyProps<T extends React.ElementType> = React.ComponentProps<T> & {
  /** Render as the child element (e.g. a different heading level) while keeping styles. */
  asChild?: boolean
}

function createTypography<T extends React.ElementType>(
  tag: T,
  slot: string,
  baseClassName: string
) {
  function Typography({ className, asChild = false, ...props }: TypographyProps<T>) {
    const Comp = asChild ? Slot.Root : tag

    return (
      <Comp
        data-slot={slot}
        className={cn(baseClassName, className)}
        {...props}
      />
    )
  }
  return Typography
}

/** Hero-level heading for marketing moments and page zero-states. */
const Display = createTypography(
  "h1",
  "display",
  "font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
)

const H1 = createTypography(
  "h1",
  "h1",
  "font-heading text-3xl font-semibold tracking-tight text-balance"
)

const H2 = createTypography(
  "h2",
  "h2",
  "font-heading text-2xl font-semibold tracking-tight"
)

const H3 = createTypography(
  "h3",
  "h3",
  "font-heading text-lg font-semibold tracking-tight"
)

const H4 = createTypography("h4", "h4", "font-heading text-base font-semibold")

const BodyLarge = createTypography("p", "body-large", "text-base leading-7")

const Body = createTypography("p", "body", "text-sm leading-6")

const SmallText = createTypography("span", "small-text", "text-xs leading-5")

const Caption = createTypography(
  "span",
  "caption",
  "text-xs leading-4 text-muted-foreground"
)

/** Inline label text (not a form label — use ui/label for form controls). */
const LabelText = createTypography(
  "span",
  "label-text",
  "text-sm leading-none font-medium"
)

const Muted = createTypography("p", "muted", "text-sm text-muted-foreground")

export {
  Display,
  H1,
  H2,
  H3,
  H4,
  BodyLarge,
  Body,
  SmallText,
  Caption,
  LabelText,
  Muted,
}

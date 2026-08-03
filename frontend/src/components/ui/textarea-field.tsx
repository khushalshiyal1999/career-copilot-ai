"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface TextareaFieldProps extends React.ComponentProps<"textarea"> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  /** Grow with content (on by default). Off gives a fixed, resizable box. */
  autoResize?: boolean
  /** Show a character counter; requires maxLength. */
  showCount?: boolean
  containerClassName?: string
}

function TextareaField({
  id: idProp,
  label,
  description,
  error,
  autoResize = true,
  showCount = false,
  maxLength,
  containerClassName,
  className,
  defaultValue,
  value,
  onChange,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaFieldProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const [uncontrolledCount, setUncontrolledCount] = React.useState(
    () => String(defaultValue ?? "").length
  )
  const charCount =
    value !== undefined ? String(value).length : uncontrolledCount

  const describedBy =
    [
      ariaDescribedBy,
      description ? descriptionId : null,
      error ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <Field data-invalid={error ? true : undefined} className={containerClassName}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Textarea
        id={id}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => {
          if (value === undefined) {
            setUncontrolledCount(event.target.value.length)
          }
          onChange?.(event)
        }}
        className={cn(
          autoResize ? "resize-none" : "field-sizing-fixed resize-y",
          className
        )}
        {...props}
      />
      {(error || description || (showCount && maxLength)) && (
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {error ? (
              <FieldError id={errorId}>{error}</FieldError>
            ) : description ? (
              <FieldDescription id={descriptionId}>
                {description}
              </FieldDescription>
            ) : null}
          </div>
          {showCount && maxLength && (
            <span
              aria-live="polite"
              className={cn(
                "shrink-0 text-xs tabular-nums text-muted-foreground",
                charCount >= maxLength && "text-destructive"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
    </Field>
  )
}

export { TextareaField }
export type { TextareaFieldProps }

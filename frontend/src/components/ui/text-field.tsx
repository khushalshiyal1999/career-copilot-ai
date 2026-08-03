"use client"

import * as React from "react"
import { CheckCircle2, Eye, EyeOff, Search } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

interface TextFieldProps
  extends Omit<React.ComponentProps<"input">, "prefix"> {
  label?: React.ReactNode
  /** Helper text shown below the input. */
  description?: React.ReactNode
  /** Error message; also puts the input in its invalid state. */
  error?: React.ReactNode
  /** Success message; renders a check and success styling. */
  success?: React.ReactNode
  /** Inline text before the input, e.g. "https://". */
  prefix?: React.ReactNode
  /** Inline text after the input, e.g. ".com" or a unit. */
  suffix?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  /** Class for the outer Field wrapper. */
  containerClassName?: string
}

/**
 * Standard form input. `type` covers the usual suspects — "password" gets a
 * visibility toggle, "search" gets a search icon by default.
 */
function TextField({
  id: idProp,
  type = "text",
  label,
  description,
  error,
  success,
  prefix,
  suffix,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  disabled,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextFieldProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === "password"
  const resolvedType = isPassword && showPassword ? "text" : type

  const startIcon =
    leftIcon ?? (type === "search" ? <Search aria-hidden /> : null)

  const describedBy =
    [
      ariaDescribedBy,
      description || success ? descriptionId : null,
      error ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <Field data-invalid={error ? true : undefined} className={containerClassName}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <InputGroup
        className={cn(
          success &&
            !error &&
            "border-success has-[[data-slot=input-group-control]:focus-visible]:border-success has-[[data-slot=input-group-control]:focus-visible]:ring-success/20"
        )}
      >
        {(prefix || startIcon) && (
          <InputGroupAddon align="inline-start">
            {startIcon}
            {prefix && <InputGroupText>{prefix}</InputGroupText>}
          </InputGroupAddon>
        )}
        <InputGroupInput
          id={id}
          type={resolvedType}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={className}
          {...props}
        />
        {(suffix || rightIcon || isPassword || (success && !error)) && (
          <InputGroupAddon align="inline-end">
            {success && !error && (
              <CheckCircle2 aria-hidden className="text-success" />
            )}
            {suffix && <InputGroupText>{suffix}</InputGroupText>}
            {rightIcon}
            {isPassword && (
              <InputGroupButton
                size="icon-xs"
                disabled={disabled}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            )}
          </InputGroupAddon>
        )}
      </InputGroup>
      {error ? (
        <FieldError id={errorId}>{error}</FieldError>
      ) : success && typeof success !== "boolean" ? (
        <FieldDescription id={descriptionId} className="text-success">
          {success}
        </FieldDescription>
      ) : description ? (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      ) : null}
    </Field>
  )
}

export { TextField }
export type { TextFieldProps }

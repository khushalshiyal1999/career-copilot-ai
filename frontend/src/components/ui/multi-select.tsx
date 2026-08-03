"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import type { ComboboxOption } from "@/components/ui/combobox"

interface MultiSelectProps {
  options: ComboboxOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  /** Selected badges shown before collapsing into a "+n" badge. */
  maxVisible?: number
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

/** Searchable multi select with badge summary. Built on Command + Popover. */
function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select options…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  maxVisible = 3,
  disabled,
  className,
  "aria-label": ariaLabel,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.filter((option) => value.includes(option.value))

  const toggle = (optionValue: string) => {
    onValueChange?.(
      value.includes(optionValue)
        ? value.filter((entry) => entry !== optionValue)
        : [...value, optionValue]
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel ?? placeholder}
          disabled={disabled}
          className={cn(
            "h-auto min-h-8 w-full justify-between py-1 font-normal",
            className
          )}
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <span className="flex min-w-0 flex-wrap items-center gap-1">
              {selected.slice(0, maxVisible).map((option) => (
                <Badge key={option.value} variant="secondary">
                  {option.label}
                </Badge>
              ))}
              {selected.length > maxVisible && (
                <Badge variant="secondary">
                  +{selected.length - maxVisible}
                </Badge>
              )}
            </span>
          )}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) p-0"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => toggle(option.value)}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border border-input transition-colors",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-transparent"
                      )}
                    >
                      {isSelected && <Check className="size-3" />}
                    </span>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
          {selected.length > 0 && (
            <div className="border-t p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center"
                onClick={() => onValueChange?.([])}
              >
                <X />
                Clear selection
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
export type { MultiSelectProps }

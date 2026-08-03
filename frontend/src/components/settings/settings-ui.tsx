"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/** Card wrapper for one settings group. */
export function SettingsCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={cn("flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10", className)}
    >
      <div className="flex flex-col gap-0.5">
        <h3 className="font-heading text-sm font-semibold">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

/** Label + input, stacked. */
export function TextField({
  id,
  label,
  value,
  onChange,
  onCommit,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Called on blur when the value actually changed. */
  onCommit?: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  const committed = React.useRef(value);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => {
          if (onCommit && committed.current !== value) {
            committed.current = value;
            onCommit(value);
          }
        }}
      />
    </div>
  );
}

/** Label + select, stacked. */
export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Switch with title + description on the left. */
export function SwitchRow({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const id = React.useId();
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="flex min-w-0 flex-col gap-0.5">
        <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
          {label}
        </Label>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
}

/** Removable chip used for company/location lists. */
export function ChipList({
  items,
  onRemove,
  tone = "neutral",
  emptyLabel,
}: {
  items: string[];
  onRemove: (item: string) => void;
  tone?: "neutral" | "positive" | "negative";
  emptyLabel?: string;
}) {
  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">{emptyLabel ?? "Nothing added yet."}</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "inline-flex items-center gap-1 rounded-full py-1 pr-1 pl-3 text-xs font-medium ring-1",
            tone === "positive" && "bg-success/10 text-success ring-success/25",
            tone === "negative" && "bg-destructive/10 text-destructive ring-destructive/25",
            tone === "neutral" && "bg-card ring-foreground/10"
          )}
        >
          {item}
          <button
            type="button"
            aria-label={`Remove ${item}`}
            onClick={() => onRemove(item)}
            className="grid size-4 place-items-center rounded-full transition-colors hover:bg-foreground/10"
          >
            <span aria-hidden className="text-[10px] leading-none">✕</span>
          </button>
        </span>
      ))}
    </div>
  );
}

/** Input + Add button for appending to a ChipList. */
export function ChipInput({
  placeholder,
  onAdd,
}: {
  placeholder: string;
  onAdd: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");
  const submit = () => {
    const item = value.trim();
    if (!item) return;
    onAdd(item);
    setValue("");
  };
  return (
    <div className="flex gap-1.5">
      <Input
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-7 text-xs"
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
        }}
      />
      <button
        type="button"
        onClick={submit}
        className="shrink-0 rounded-lg border border-border px-2.5 text-xs font-medium transition-colors hover:bg-muted"
      >
        Add
      </button>
    </div>
  );
}

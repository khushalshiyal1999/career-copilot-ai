"use client";

import * as React from "react";
import { toast } from "sonner";

import { type SettingsActivity } from "@/components/settings/data";
import { SettingsCard } from "@/components/settings/settings-ui";
import { Check, CreditCard, History, Sparkles } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BillingSection() {
  return (
    <div className="flex flex-col gap-4">
      <SettingsCard title="Current plan">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/40 p-4">
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-2 font-heading text-sm font-semibold">
              Free Beta
              <Badge variant="success">Active</Badge>
            </span>
            <span className="text-xs text-muted-foreground">
              Full access while CareerCopilot is in beta — no card required.
            </span>
          </div>
          <span className="font-heading text-2xl font-semibold">
            ₹0<span className="text-sm text-muted-foreground">/mo</span>
          </span>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Pro"
        description="Coming soon — priority AI, unlimited tailoring, and team referrals."
      >
        <ul className="flex flex-col gap-1.5">
          {[
            "Unlimited resume tailoring and cover letters",
            "Priority scanning — sources checked every 10 minutes",
            "Advanced analytics and salary benchmarking",
            "Early access to negotiation coaching",
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-success" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => toast.success("You're on the Pro waitlist — we'll email you at launch.")}
        >
          <CreditCard data-icon="inline-start" />
          Join the Pro waitlist
        </Button>
      </SettingsCard>
    </div>
  );
}

export function AboutSection() {
  return (
    <div className="flex flex-col gap-4">
      <SettingsCard title="CareerCopilot AI">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)] text-primary-foreground shadow-md shadow-primary/25">
            <Sparkles aria-hidden className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-semibold">
              Version 0.9.0 <Badge variant="info">Beta</Badge>
            </span>
            <span className="text-xs text-muted-foreground">
              Your AI employee for the job hunt.
            </span>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
          {(
            [
              ["Released", "July 2026"],
              ["Channel", "Beta"],
              ["Region", "India · US · EU"],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="flex flex-col">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </SettingsCard>

      <SettingsCard title="What's new in 0.9.0">
        <ul className="flex flex-col gap-1.5">
          {[
            "Automation Center — mission control for every workflow",
            "Resume Manager with live ATS scoring and version compare",
            "Applications module rebuilt as a personal ATS",
            "AI decision explanations across the whole product",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
              {item}
            </li>
          ))}
        </ul>
      </SettingsCard>
    </div>
  );
}

export function ActivitySection({ entries }: { entries: SettingsActivity[] }) {
  return (
    <SettingsCard
      title="Recent settings changes"
      description="Every change you make lands here — newest first."
    >
      <ol className="relative flex flex-col gap-3.5">
        <span aria-hidden className="absolute top-2 bottom-2 left-[9px] w-px bg-border" />
        {entries.map((entry) => (
          <li key={entry.id} className="relative flex gap-3">
            <span className="z-10 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground ring-4 ring-card">
              <History aria-hidden className="size-2.5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-sm leading-relaxed">{entry.text}</p>
              <span className="text-xs text-muted-foreground">{entry.when}</span>
            </div>
          </li>
        ))}
      </ol>
    </SettingsCard>
  );
}

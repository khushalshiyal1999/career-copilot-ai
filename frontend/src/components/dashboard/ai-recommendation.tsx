import * as React from "react";
import Link from "next/link";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { ArrowRight, FileText, Sparkles } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

/** The assistant's featured message — a conversation turn, not a banner. */
export function AiRecommendation() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-primary/20 sm:p-8">
      {/* Soft brand wash behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_60%),radial-gradient(60%_100%_at_100%_100%,color-mix(in_oklch,var(--info)_8%,transparent),transparent_60%)]"
      />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <AiAvatar size="lg" />
          <div className="flex flex-col">
            <span className="font-heading text-sm font-semibold">
              CareerCopilot
            </span>
            <span className="text-xs text-muted-foreground">
              AI recommendation · just now
            </span>
          </div>
        </div>

        <p className="max-w-3xl font-heading text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl">
          I went through today&apos;s{" "}
          <span className="font-semibold text-foreground">
            128 new postings
          </span>{" "}
          —{" "}
          <span className="bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)] bg-clip-text font-semibold text-transparent">
            37 React roles
          </span>{" "}
          match you above{" "}
          <span className="font-semibold text-primary">92%</span>. Eight close
          applications this week, so I&apos;d move on those first.
        </p>

        {/* Quick-reply actions, chat style */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ai" className="rounded-full" asChild>
            <Link href={ROUTES.jobs}>
              View 37 recommendations
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href={ROUTES.resumes}>
              <FileText data-icon="inline-start" />
              Tailor my resume first
            </Link>
          </Button>
          <Button variant="ghost" className="rounded-full" asChild>
            <Link href={ROUTES.analytics}>
              <Sparkles data-icon="inline-start" />
              Why these picks?
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { toast } from "sonner";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { INSIGHTS } from "@/components/dashboard/data";
import { Emphasis } from "@/components/dashboard/emphasis";
import { Check } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function InsightBubble({
  insight,
}: {
  insight: (typeof INSIGHTS)[number];
}) {
  const [applied, setApplied] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <p className="rounded-2xl rounded-tl-sm bg-accent/60 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
        <Emphasis text={insight.text} strongClassName="text-primary" />
      </p>
      <Button
        variant="outline"
        size="xs"
        className="self-start rounded-full"
        disabled={applied}
        onClick={() => {
          setApplied(true);
          toast.success(`Done — I'll ${insight.action.toLowerCase()} for you.`);
        }}
      >
        {applied && <Check data-icon="inline-start" className="text-success" />}
        {applied ? "On it" : insight.action}
      </Button>
    </div>
  );
}

/** The assistant's observations, styled as conversation turns with quick replies. */
export function AiInsights() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <AiAvatar />
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold">
            CareerCopilot
          </span>
          <span className="text-xs text-muted-foreground">
            Insights from your last 30 days
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {INSIGHTS.map((insight) => (
          <InsightBubble key={insight.id} insight={insight} />
        ))}
      </CardContent>
    </Card>
  );
}

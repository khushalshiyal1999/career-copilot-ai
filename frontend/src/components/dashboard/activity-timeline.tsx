import * as React from "react";

import { TIMELINE, type TimelineEvent } from "@/components/dashboard/data";
import {
  Bot,
  CalendarDays,
  FileText,
  Send,
  type LucideIcon,
} from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const EVENT_META: Record<
  TimelineEvent["icon"],
  { icon: LucideIcon; className: string }
> = {
  interview: { icon: CalendarDays, className: "bg-success/10 text-success" },
  applied: { icon: Send, className: "bg-info/10 text-info" },
  automation: { icon: Bot, className: "bg-accent text-accent-foreground" },
  resume: { icon: FileText, className: "bg-muted text-muted-foreground" },
};

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Latest moves across your search.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col">
          {TIMELINE.map((event, index) => {
            const meta = EVENT_META[event.icon];
            const Icon = meta.icon;
            return (
              <li key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
                {index < TIMELINE.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-8 left-3.5 h-[calc(100%-2rem)] w-px bg-border"
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full",
                    meta.className
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
                <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-medium">{event.title}</span>
                    <span className="text-xs whitespace-nowrap text-muted-foreground">
                      {event.when}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {event.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}

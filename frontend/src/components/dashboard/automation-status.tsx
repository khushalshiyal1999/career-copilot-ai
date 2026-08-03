import * as React from "react";
import Link from "next/link";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import { AUTOMATION } from "@/components/dashboard/data";
import { Bot, Clock, Globe, Search } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusDot } from "@/components/ui/status-dot";
import { ROUTES } from "@/constants/routes";

const ROWS = [
  {
    icon: Clock,
    label: "Next Scan",
    value: <span className="font-medium">{AUTOMATION.nextScan}</span>,
  },
  {
    icon: Search,
    label: "Jobs Scanned",
    value: (
      <span className="font-medium tabular-nums">
        <AnimatedNumber value={AUTOMATION.jobsScanned} />
      </span>
    ),
  },
  {
    icon: Globe,
    label: "Sources",
    value: (
      <span className="font-medium tabular-nums">
        {AUTOMATION.sources} job boards
      </span>
    ),
  },
];

export function AutomationStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot aria-hidden className="size-4 text-primary" />
          Automation
        </CardTitle>
        <CardAction>
          <Badge variant="running" className="gap-1.5">
            <StatusDot tone="running" size="sm" />
            Running
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col divide-y">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 py-2.5 text-sm first:pt-0 last:pb-0"
            >
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <row.icon aria-hidden className="size-3.5" />
                {row.label}
              </span>
              {row.value}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Today&apos;s scan cycle</span>
            <span className="tabular-nums">
              {AUTOMATION.scansDoneToday} of {AUTOMATION.scansPerDay} scans
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary),var(--info)_60%)]"
              style={{
                width: `${(AUTOMATION.scansDoneToday / AUTOMATION.scansPerDay) * 100}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link href={ROUTES.automation}>Manage automation</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

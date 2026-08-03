import * as React from "react";
import Link from "next/link";

import { CompanyMark } from "@/components/dashboard/company-mark";
import {
  RECENT_APPLICATIONS,
  type ApplicationStatus,
} from "@/components/dashboard/data";
import { ArrowUpRight } from "@/components/icons";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/utils/format";
import type { VariantProps } from "class-variance-authority";

const STATUS_META: Record<
  ApplicationStatus,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  applied: { label: "Applied", variant: "info" },
  "in-review": { label: "In Review", variant: "warning" },
  interview: { label: "Interview", variant: "scheduled" },
  offer: { label: "Offer", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
};

function MatchCell({ match }: { match: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="h-1.5 w-14 overflow-hidden rounded-full bg-muted"
      >
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${match}%` }}
        />
      </span>
      <span className="font-medium tabular-nums">{match}%</span>
    </span>
  );
}

export function RecentApplications() {
  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>Where each application stands today.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.applications}>View all</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-130 text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-(--card-spacing) py-2 font-medium">Company</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Applied</th>
              <th className="px-3 py-2 font-medium">Match</th>
              <th className="px-(--card-spacing) py-2 text-right font-medium">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {RECENT_APPLICATIONS.map((app) => {
              const status = STATUS_META[app.status];
              return (
                <tr
                  key={app.id}
                  className="border-b transition-colors last:border-b-0 hover:bg-muted/50"
                >
                  <td className="px-(--card-spacing) py-3">
                    <span className="flex items-center gap-2.5 font-medium">
                      <CompanyMark company={app.company} />
                      {app.company.name}
                    </span>
                  </td>
                  <td className="max-w-52 truncate px-3 py-3 text-muted-foreground">
                    {app.role}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">
                    {formatDate(app.appliedAt, { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-3 py-3">
                    <MatchCell match={app.match} />
                  </td>
                  <td className="px-(--card-spacing) py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Open application at ${app.company.name}`}
                      asChild
                    >
                      <Link href={ROUTES.applications}>
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

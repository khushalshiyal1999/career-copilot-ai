"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  LOG_STATUS_META,
  type LogEntry,
  type LogStatus,
} from "@/components/automation/data";
import { Download, Search, Terminal } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExecutionLogsProps {
  workflowName: string;
  logs: LogEntry[];
}

/** Professional log viewer — search, status filter, export. */
export function ExecutionLogs({ workflowName, logs }: ExecutionLogsProps) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | LogStatus>("all");

  const visible = logs.filter((log) => {
    if (status !== "all" && log.status !== status) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [log.source, log.action, log.result]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <section className="flex flex-col gap-2.5" aria-label="Execution logs">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
          <Terminal aria-hidden className="size-3.5 text-muted-foreground" />
          Execution Logs
        </h3>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search logs…"
              aria-label="Search logs"
              className="h-7 w-40 pl-7 text-xs"
            />
          </div>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as "all" | LogStatus)}
          >
            <SelectTrigger aria-label="Filter logs by status" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast(`Exporting ${logs.length} log entries for "${workflowName}" as CSV…`)
            }
          >
            <Download data-icon="inline-start" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="border-b bg-muted/40 text-muted-foreground">
              <th scope="col" className="px-3 py-2 font-medium">Time</th>
              <th scope="col" className="px-3 py-2 font-medium">Source</th>
              <th scope="col" className="px-3 py-2 font-medium">Action</th>
              <th scope="col" className="px-3 py-2 font-medium">Result</th>
              <th scope="col" className="px-3 py-2 font-medium">Duration</th>
              <th scope="col" className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">
                  No log entries match your filter.
                </td>
              </tr>
            ) : (
              visible.map((log) => {
                const meta = LOG_STATUS_META[log.status];
                return (
                  <tr
                    key={log.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-3 py-2 font-mono text-muted-foreground tabular-nums">
                      {log.time}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{log.source}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{log.action}</td>
                    <td className="max-w-52 truncate px-3 py-2 text-muted-foreground" title={log.result}>
                      {log.result}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground tabular-nums">
                      {log.duration}
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

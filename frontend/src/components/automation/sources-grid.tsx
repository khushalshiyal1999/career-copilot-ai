"use client";

import * as React from "react";

import { type JobSource } from "@/components/automation/data";
import { Plug, RefreshCw, Unplug } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";

interface SourcesGridProps {
  sources: JobSource[];
  reconnectingId: string | null;
  onReconnect: (source: JobSource) => void;
}

/** Full-width grid of every connected job source. */
export function SourcesGrid({ sources, reconnectingId, onReconnect }: SourcesGridProps) {
  return (
    <section className="flex flex-col gap-3" aria-label="Job sources">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        <Plug aria-hidden className="size-3.5 text-muted-foreground" />
        Job Sources
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sources.map((source) => {
          const reconnecting = reconnectingId === source.id;
          const errored = source.status === "error";
          return (
            <div
              key={source.id}
              className={cn(
                "flex flex-col gap-2.5 rounded-xl bg-card p-3.5 ring-1 transition-all",
                errored ? "ring-destructive/30" : "ring-foreground/10"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading text-sm font-medium">{source.name}</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <StatusDot
                    tone={
                      source.status === "connected"
                        ? "success"
                        : source.status === "syncing"
                          ? "running"
                          : "error"
                    }
                    size="sm"
                    pulse={source.status === "syncing"}
                  />
                  {source.status === "connected"
                    ? "Connected"
                    : source.status === "syncing"
                      ? "Syncing"
                      : "Disconnected"}
                </span>
              </div>

              <dl className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col">
                  <dt className="text-muted-foreground">Scanned</dt>
                  <dd className="font-medium tabular-nums">
                    {source.jobsScanned.toLocaleString("en-US")}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-muted-foreground">Last sync</dt>
                  <dd className="truncate font-medium">{source.lastSync}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-muted-foreground">Success</dt>
                  <dd
                    className={cn(
                      "font-medium tabular-nums",
                      source.successRate >= 90 ? "text-success" : "text-destructive"
                    )}
                  >
                    {source.successRate}%
                  </dd>
                </div>
              </dl>

              {errored && (
                <Button
                  variant="destructive"
                  size="sm"
                  loading={reconnecting}
                  onClick={() => onReconnect(source)}
                >
                  {!reconnecting && <Unplug data-icon="inline-start" />}
                  {reconnecting ? "Reconnecting…" : "Reconnect"}
                </Button>
              )}
              {source.status === "syncing" && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <RefreshCw aria-hidden className="size-3 animate-spin" />
                  Indexing new listings…
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

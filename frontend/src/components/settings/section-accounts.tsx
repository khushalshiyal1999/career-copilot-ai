"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  ACCOUNTS_SEED,
  type ConnectedAccount,
} from "@/components/settings/data";
import { SettingsCard, SwitchRow } from "@/components/settings/settings-ui";
import { Plug, RefreshCw, Unplug } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { cn } from "@/lib/utils";

export function AccountsSection({ log }: { log: (text: string) => void }) {
  const [accounts, setAccounts] = React.useState<ConnectedAccount[]>(ACCOUNTS_SEED);
  const [busyId, setBusyId] = React.useState<string | null>(null);

  const reconnect = (account: ConnectedAccount) => {
    setBusyId(account.id);
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === account.id ? { ...a, status: "connected", lastSync: "just now" } : a
        )
      );
      setBusyId(null);
      log(`${account.name} reconnected.`);
      toast.success(`${account.name} reconnected — syncing now.`);
    }, 1300);
  };

  const disconnect = (account: ConnectedAccount) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === account.id ? { ...a, status: "disconnected", lastSync: "—" } : a
      )
    );
    log(`${account.name} disconnected.`);
    toast(`${account.name} disconnected.`, {
      action: { label: "Reconnect", onClick: () => reconnect(account) },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard
        title="Connected accounts"
        description="Everything the AI can read from or act through."
      >
        <ul className="flex flex-col gap-2">
          {accounts.map((account) => {
            const busy = busyId === account.id;
            return (
              <li
                key={account.id}
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-xl p-3 ring-1",
                  account.status === "expired"
                    ? "ring-warning/40"
                    : account.status === "disconnected"
                      ? "ring-foreground/10 opacity-70"
                      : "ring-foreground/10"
                )}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <Plug aria-hidden className="size-4" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-medium">{account.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {account.detail}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <StatusDot
                      tone={
                        account.status === "connected"
                          ? "success"
                          : account.status === "expired"
                            ? "warning"
                            : "neutral"
                      }
                      size="sm"
                    />
                    {account.status === "connected"
                      ? "Connected"
                      : account.status === "expired"
                        ? "Token expired"
                        : "Disconnected"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Last sync: {account.lastSync}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {account.status !== "connected" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      loading={busy}
                      onClick={() => reconnect(account)}
                    >
                      {!busy && <RefreshCw data-icon="inline-start" />}
                      {busy ? "Connecting…" : "Reconnect"}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => disconnect(account)}
                    >
                      <Unplug data-icon="inline-start" />
                      Disconnect
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </SettingsCard>
    </div>
  );
}

const NOTIFICATION_CHANNELS = [
  { id: "email", label: "Email", description: "Digest and important events to your inbox." },
  { id: "browser", label: "Browser", description: "Toasts while CareerCopilot is open." },
  { id: "desktop", label: "Desktop", description: "System notifications, even when tabbed away." },
] as const;

const NOTIFICATION_TYPES = [
  { id: "interviews", label: "Interview alerts", description: "Invitations, reschedules, reminders." },
  { id: "jobs", label: "Job alerts", description: "High-match roles the moment they're found." },
  { id: "automation", label: "Automation alerts", description: "Run results, failures, rate limits." },
  { id: "weekly", label: "Weekly report", description: "Monday summary of your whole pipeline." },
] as const;

export function NotificationsSection({ log }: { log: (text: string) => void }) {
  const [channels, setChannels] = React.useState<Record<string, boolean>>({
    email: true,
    browser: true,
    desktop: false,
  });
  const [types, setTypes] = React.useState<Record<string, boolean>>({
    interviews: true,
    jobs: true,
    automation: true,
    weekly: true,
  });

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard title="Channels" description="Where notifications reach you.">
        <div className="flex flex-col divide-y">
          {NOTIFICATION_CHANNELS.map((channel) => (
            <SwitchRow
              key={channel.id}
              label={channel.label}
              description={channel.description}
              checked={channels[channel.id]}
              onCheckedChange={(checked) => {
                setChannels((prev) => ({ ...prev, [channel.id]: checked }));
                log(`${channel.label} notifications turned ${checked ? "on" : "off"}.`);
              }}
            />
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="What you hear about">
        <div className="flex flex-col divide-y">
          {NOTIFICATION_TYPES.map((type) => (
            <SwitchRow
              key={type.id}
              label={type.label}
              description={type.description}
              checked={types[type.id]}
              onCheckedChange={(checked) => {
                setTypes((prev) => ({ ...prev, [type.id]: checked }));
                log(`${type.label} turned ${checked ? "on" : "off"}.`);
              }}
            />
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

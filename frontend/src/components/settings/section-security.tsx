"use client";

import * as React from "react";
import { toast } from "sonner";

import { SESSIONS_SEED, type SessionInfo } from "@/components/settings/data";
import { SettingsCard, SwitchRow } from "@/components/settings/settings-ui";
import {
  KeyRound,
  Laptop,
  Lock,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SecuritySection({ log }: { log: (text: string) => void }) {
  const [twoFactor, setTwoFactor] = React.useState(true);
  const [sessions, setSessions] = React.useState<SessionInfo[]>(SESSIONS_SEED);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const revoke = (session: SessionInfo) => {
    setSessions((prev) => prev.filter((s) => s.id !== session.id));
    log(`Session revoked — ${session.browser} on ${session.device}.`);
    toast(`Signed out ${session.browser} on ${session.device}.`);
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard title="Password" description="Last changed 3 months ago.">
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => {
            log("Password change requested.");
            toast("Password reset link sent to aarav.sharma@email.com.");
          }}
        >
          <Lock data-icon="inline-start" />
          Change password
        </Button>
      </SettingsCard>

      <SettingsCard title="Two-factor authentication">
        <SwitchRow
          label="Authenticator app"
          description={twoFactor ? "Enabled — codes via your authenticator app." : "Your account is less secure without 2FA."}
          checked={twoFactor}
          onCheckedChange={(checked) => {
            setTwoFactor(checked);
            log(`Two-factor authentication ${checked ? "enabled" : "disabled"}.`);
            toast(checked ? "2FA enabled." : "2FA disabled — consider re-enabling it.");
          }}
        />
        {twoFactor && (
          <span className="inline-flex items-center gap-1.5 text-xs text-success">
            <ShieldCheck aria-hidden className="size-3.5" />
            Your account is protected.
          </span>
        )}
      </SettingsCard>

      <SettingsCard title="Sessions & devices" description="Everywhere you're signed in.">
        <ul className="flex flex-col gap-2">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex flex-wrap items-center gap-3 rounded-xl p-3 ring-1 ring-foreground/10"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                {session.kind === "mobile" ? (
                  <Smartphone aria-hidden className="size-4" />
                ) : (
                  <Laptop aria-hidden className="size-4" />
                )}
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  {session.browser} · {session.device}
                  {session.current && <Badge variant="success">This device</Badge>}
                </span>
                <span className="text-xs text-muted-foreground">
                  {session.location} · {session.lastActive}
                </span>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" onClick={() => revoke(session)}>
                  Revoke
                </Button>
              )}
            </li>
          ))}
        </ul>
      </SettingsCard>

      <SettingsCard title="API keys" description="Programmatic access for power users.">
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
          <KeyRound aria-hidden className="size-3.5" />
          Coming soon — generate keys to drive CareerCopilot from your own scripts.
        </div>
      </SettingsCard>

      <SettingsCard title="Danger zone" className="ring-destructive/25">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Delete account</span>
            <span className="text-xs text-muted-foreground">
              Permanently removes your profile, resumes, and automation history.
            </span>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
            <Trash2 data-icon="inline-start" />
            Delete account
          </Button>
        </div>
      </SettingsCard>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This removes everything: 128 tracked applications, 4 resumes, and 8
              automation workflows. There is no undo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Keep my account
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDeleteOpen(false);
                toast("This is a demo — your account (and your 128 applications) are safe.");
              }}
            >
              Delete everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

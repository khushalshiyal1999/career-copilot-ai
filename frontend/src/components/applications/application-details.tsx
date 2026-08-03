"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

import { PriorityIcon, StageBadge } from "@/components/applications/application-row";
import {
  countdownLabel,
  dateFromDaysAgo,
  daysAgoLabel,
  isActiveStatus,
  type Application,
  type Attachment,
  type TimelineEvent,
  type TimelineKind,
} from "@/components/applications/data";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { CompanyMark } from "@/components/dashboard/company-mark";
import { Emphasis } from "@/components/dashboard/emphasis";
import {
  BadgeCheck,
  Banknote,
  CalendarDays,
  Check,
  CircleX,
  Code2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Handshake,
  MapPin,
  MessageSquare,
  NotebookPen,
  Paperclip,
  Phone,
  Plus,
  Send,
  Sparkles,
  User,
  Users,
  Video,
  type LucideIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

const TIMELINE_ICON: Record<TimelineKind, LucideIcon> = {
  applied: Send,
  viewed: Eye,
  screening: Phone,
  interview: Users,
  technical: Code2,
  hr: MessageSquare,
  offer: Handshake,
  rejected: CircleX,
  withdrawn: CircleX,
  accepted: Check,
  followup: Send,
  scheduled: CalendarDays,
};

const TIMELINE_TONE: Partial<Record<TimelineKind, string>> = {
  offer: "bg-success/15 text-success",
  accepted: "bg-success/15 text-success",
  rejected: "bg-destructive/10 text-destructive",
  withdrawn: "bg-muted text-muted-foreground",
};

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-4">
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[13px] w-px bg-border"
      />
      {events.map((event, index) => {
        const Icon = TIMELINE_ICON[event.kind];
        const last = index === events.length - 1;
        return (
          <li key={`${event.kind}-${event.daysAgo}-${index}`} className="relative flex gap-3">
            <span
              className={cn(
                "z-10 grid size-7 shrink-0 place-items-center rounded-full ring-4 ring-background",
                TIMELINE_TONE[event.kind] ?? "bg-accent text-accent-foreground",
                last && "ring-2 ring-primary/30"
              )}
            >
              <Icon aria-hidden className="size-3.5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 pb-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="text-sm font-medium">{event.title}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {formatDate(dateFromDaysAgo(event.daysAgo), {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {event.time}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
        {Icon && <Icon aria-hidden className="size-3.5 text-muted-foreground" />}
        {title}
      </h3>
      {children}
    </section>
  );
}

const ATTACHMENT_KIND_LABEL: Record<Attachment["kind"], string> = {
  resume: "Resume",
  "cover-letter": "Cover Letter",
  "offer-letter": "Offer Letter",
  "interview-notes": "Interview Notes",
  portfolio: "Portfolio",
};

interface ApplicationDetailsProps {
  app: Application;
  onUpdate: (id: string, updater: (app: Application) => Application) => void;
}

/** Rich right-panel view of a single application. */
export function ApplicationDetails({ app, onUpdate }: ApplicationDetailsProps) {
  const [noteDraft, setNoteDraft] = React.useState("");

  const sendFollowUp = () => {
    onUpdate(app.id, (prev) => ({
      ...prev,
      lastActivityDays: 0,
      timeline: [
        ...prev.timeline,
        {
          kind: "followup",
          title: "Follow-up sent",
          description: `Nudged ${prev.recruiter?.name ?? "the hiring team"} about next steps.`,
          daysAgo: 0,
          time: new Date().toTimeString().slice(0, 5),
        },
      ],
    }));
    toast.success(
      `Follow-up sent to ${app.recruiter?.name ?? app.company.name} — I kept it short and referenced your last conversation.`
    );
  };

  const addNote = () => {
    const note = noteDraft.trim();
    if (!note) return;
    onUpdate(app.id, (prev) => ({ ...prev, notes: [...prev.notes, note] }));
    setNoteDraft("");
  };

  const chronological = [...app.timeline].sort((a, b) => b.daysAgo - a.daysAgo);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <CompanyMark company={app.company} size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <h2 className="min-w-0 truncate font-heading text-base font-semibold">
                {app.role}
              </h2>
              <PriorityIcon priority={app.priority} />
            </div>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              {app.company.name}
              {app.company.verified && (
                <BadgeCheck aria-label="Verified company" className="size-3.5 text-info" />
              )}
            </span>
          </div>
          <StageBadge app={app} />
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-xl p-3.5 text-sm ring-1 ring-foreground/10">
          {(
            [
              [Banknote, "Salary", app.salaryLabel],
              [MapPin, "Location", app.location],
              [User, "Recruiter", app.recruiter?.name ?? "Not assigned yet"],
              [ExternalLink, "Source", app.source],
              [
                CalendarDays,
                "Applied",
                `${formatDate(dateFromDaysAgo(app.appliedDaysAgo), { month: "short", day: "numeric" })} (${daysAgoLabel(app.appliedDaysAgo).toLowerCase()})`,
              ],
              [Sparkles, "AI match", `${app.match}%`],
              [FileText, "Resume used", app.resumeUsed],
              [FileText, "Cover letter", app.coverLetterUsed ?? "None"],
            ] as const
          ).map(([Icon, label, value]) => (
            <div key={label} className="flex min-w-0 flex-col gap-0.5">
              <dt className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon aria-hidden className="size-3" />
                {label}
              </dt>
              <dd className="truncate font-medium" title={String(value)}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* AI assistant */}
      <div className="flex flex-col gap-3 rounded-xl bg-accent/50 p-4 ring-1 ring-primary/15">
        <div className="flex items-center gap-2">
          <AiAvatar size="sm" />
          <span className="text-xs font-semibold">CareerCopilot analysis</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {app.insights.map((insight) => (
            <p
              key={insight}
              className="rounded-2xl rounded-tl-sm bg-background/70 px-3 py-2 text-sm leading-relaxed"
            >
              <Emphasis text={insight} strongClassName="text-primary" />
            </p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            variant="ai"
            size="sm"
            disabled={!isActiveStatus(app.status)}
            onClick={sendFollowUp}
          >
            <Send data-icon="inline-start" />
            Send Follow-up
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success(
                `Prep pack ready for ${app.company.name} — 12 likely questions, your matching stories, and their interview style.`
              )
            }
          >
            <Sparkles data-icon="inline-start" />
            Prepare Interview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success(
                `Re-tailoring your resume for ${app.role} — I'll surface the keywords this team screens for.`
              )
            }
          >
            <FileText data-icon="inline-start" />
            Tailor Resume Again
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.jobs}>
              <ExternalLink data-icon="inline-start" />
              View Similar Jobs
            </Link>
          </Button>
        </div>
      </div>

      {/* Upcoming interview */}
      {app.nextInterview && (
        <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-info/30">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-info">
              <Video aria-hidden className="size-3.5" />
              Upcoming interview
            </span>
            <Badge variant="info">{countdownLabel(app.nextInterview.inDays)}</Badge>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-heading text-sm font-semibold">
              {app.nextInterview.round}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatDate(dateFromDaysAgo(-app.nextInterview.inDays), {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}{" "}
              · {app.nextInterview.time} · {app.nextInterview.durationMin} min ·{" "}
              {app.company.name}
            </span>
          </div>
          <div className="flex gap-1.5">
            <Button size="sm" className="flex-1" asChild>
              <a href={app.nextInterview.link} target="_blank" rel="noreferrer">
                <Video data-icon="inline-start" />
                Join Meeting
              </a>
            </Button>
            <Button
              variant="ai"
              size="sm"
              className="flex-1"
              onClick={() =>
                toast.success(
                  `Prep pack for "${app.nextInterview?.round}" is ready — review it before ${app.nextInterview?.time}.`
                )
              }
            >
              <Sparkles data-icon="inline-start" />
              Prepare
            </Button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <DetailSection title="Timeline" icon={CalendarDays}>
        <Timeline events={chronological} />
      </DetailSection>

      <Separator />

      {/* Notes */}
      <DetailSection title="Notes" icon={NotebookPen}>
        {app.notes.length > 0 ? (
          <ul className="flex flex-col gap-1.5">
            {app.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-primary/60"
                />
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No notes yet — jot down anything worth remembering.
          </p>
        )}
        <div className="flex gap-1.5">
          <Input
            value={noteDraft}
            onChange={(event) => setNoteDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addNote();
            }}
            placeholder="Add a note…"
            aria-label="Add a note"
          />
          <Button variant="outline" size="icon" aria-label="Save note" onClick={addNote}>
            <Plus />
          </Button>
        </div>
      </DetailSection>

      <Separator />

      {/* Attachments */}
      <DetailSection title="Attachments" icon={Paperclip}>
        <ul className="flex flex-col gap-1.5">
          {app.attachments.map((attachment) => (
            <li
              key={attachment.name}
              className="flex items-center gap-2.5 rounded-lg p-2 ring-1 ring-foreground/10"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                <FileText aria-hidden className="size-4" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{attachment.name}</span>
                <span className="text-xs text-muted-foreground">
                  {ATTACHMENT_KIND_LABEL[attachment.kind]} · {attachment.size}
                </span>
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Download ${attachment.name}`}
                onClick={() => toast(`Downloading ${attachment.name}…`)}
              >
                <Download />
              </Button>
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* Links */}
      {app.links.length > 0 && (
        <DetailSection title="Links" icon={ExternalLink}>
          <div className="flex flex-wrap gap-1.5">
            {app.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium ring-1 ring-foreground/10 transition-all hover:text-primary hover:ring-primary/40"
              >
                <ExternalLink aria-hidden className="size-3" />
                {link.label}
              </a>
            ))}
          </div>
        </DetailSection>
      )}
    </div>
  );
}

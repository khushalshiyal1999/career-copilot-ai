/**
 * Mock data for the Applications module (personal ATS). Shapes mirror the
 * future backend contract so swapping in real queries is a drop-in change.
 *
 * 8 applications are hand-authored with rich storylines; the rest are
 * produced by a seeded deterministic generator so the tracker feels like a
 * real, months-old pipeline of 128 applications.
 */

import { JOB_COMPANIES, type JobCompany } from "@/components/jobs/data";
import { formatDate } from "@/utils/format";

export type Stage =
  | "applied"
  | "screening"
  | "interview"
  | "technical"
  | "hr"
  | "offer"
  | "rejected";

export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn"
  | "accepted";

export type Source =
  | "LinkedIn"
  | "Wellfound"
  | "Greenhouse"
  | "Lever"
  | "Workday"
  | "Referral";

export type Priority = "high" | "medium" | "low";

export type TimelineKind =
  | "applied"
  | "viewed"
  | "screening"
  | "interview"
  | "technical"
  | "hr"
  | "offer"
  | "rejected"
  | "withdrawn"
  | "accepted"
  | "followup"
  | "scheduled";

export interface TimelineEvent {
  kind: TimelineKind;
  title: string;
  description: string;
  /** Days before "today" the event happened. */
  daysAgo: number;
  time: string;
}

export interface Interview {
  round: string;
  /** Days from "today" (0 = today). */
  inDays: number;
  time: string;
  durationMin: number;
  link: string;
}

export type AttachmentKind =
  | "resume"
  | "cover-letter"
  | "offer-letter"
  | "interview-notes"
  | "portfolio";

export interface Attachment {
  name: string;
  kind: AttachmentKind;
  size: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface Recruiter {
  name: string;
  title: string;
  /** Typical response time in days — feeds AI insights. */
  responseDays: number;
}

export interface Application {
  id: string;
  company: JobCompany;
  role: string;
  source: Source;
  /** Days before "today" the application was submitted. */
  appliedDaysAgo: number;
  stage: Stage;
  status: ApplicationStatus;
  nextInterview: Interview | null;
  salaryLabel: string;
  /** USD-normalized midpoint for sorting. */
  salaryUsd: number;
  location: string;
  match: number;
  priority: Priority;
  recruiter: Recruiter | null;
  resumeUsed: string;
  coverLetterUsed: string | null;
  timeline: TimelineEvent[];
  /** AI observations; `**bold**` is highlighted. */
  insights: string[];
  notes: string[];
  attachments: Attachment[];
  links: LinkItem[];
  /** % of applicants this company responds to — feeds AI insights. */
  responseRate: number;
  /** Days since the last timeline activity. */
  lastActivityDays: number;
}

/* ------------------------------------------------------------------ */
/* Labels & semantic meta                                             */
/* ------------------------------------------------------------------ */

export const STAGE_LABEL: Record<Stage, string> = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  technical: "Technical Round",
  hr: "HR Round",
  offer: "Offer",
  rejected: "Rejected",
};

export const SOURCES: Source[] = [
  "LinkedIn",
  "Wellfound",
  "Greenhouse",
  "Lever",
  "Workday",
  "Referral",
];

export interface StatusMeta {
  label: string;
  badgeVariant: "info" | "warning" | "secondary" | "success" | "error" | "draft";
  badgeClass?: string;
  dotClass: string;
}

/** One consistent color language for statuses across the module. */
export const STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  applied: { label: "Applied", badgeVariant: "info", dotClass: "bg-info" },
  screening: {
    label: "Screening",
    badgeVariant: "warning",
    dotClass: "bg-warning",
  },
  interview: {
    label: "Interview",
    badgeVariant: "secondary",
    badgeClass: "bg-primary/10 text-primary",
    dotClass: "bg-primary",
  },
  offer: { label: "Offer", badgeVariant: "success", dotClass: "bg-success" },
  rejected: {
    label: "Rejected",
    badgeVariant: "error",
    dotClass: "bg-destructive",
  },
  withdrawn: {
    label: "Withdrawn",
    badgeVariant: "draft",
    dotClass: "bg-muted-foreground/50",
  },
  accepted: {
    label: "Accepted",
    badgeVariant: "success",
    badgeClass: "bg-success text-primary-foreground",
    dotClass: "bg-success",
  },
};

/** Statuses still moving through the pipeline. */
export function isActiveStatus(status: ApplicationStatus): boolean {
  return status !== "rejected" && status !== "withdrawn" && status !== "accepted";
}

export interface PipelineStage {
  id: Stage;
  label: string;
  /** Week-over-week movement shown on the card. */
  trend: number;
  fillClass: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: "applied", label: "Applied", trend: 6, fillClass: "bg-info" },
  { id: "screening", label: "Screening", trend: 3, fillClass: "bg-warning" },
  { id: "interview", label: "Interview", trend: 2, fillClass: "bg-primary" },
  { id: "technical", label: "Technical Round", trend: 2, fillClass: "bg-primary" },
  { id: "hr", label: "HR Round", trend: 1, fillClass: "bg-primary" },
  { id: "offer", label: "Offer", trend: 1, fillClass: "bg-success" },
  { id: "rejected", label: "Rejected", trend: -2, fillClass: "bg-destructive" },
];

/* ------------------------------------------------------------------ */
/* Date helpers (relative "daysAgo" keeps the demo data evergreen)     */
/* ------------------------------------------------------------------ */

const DAY_MS = 86_400_000;

export function dateFromDaysAgo(daysAgo: number): Date {
  return new Date(Date.now() - daysAgo * DAY_MS);
}

export function daysAgoLabel(daysAgo: number): string {
  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo}d ago`;
  return formatDate(dateFromDaysAgo(daysAgo), { month: "short", day: "numeric" });
}

export function countdownLabel(inDays: number): string {
  if (inDays <= 0) return "Today";
  if (inDays === 1) return "Tomorrow";
  return `In ${inDays} days`;
}

/* ------------------------------------------------------------------ */
/* Hand-authored applications                                          */
/* ------------------------------------------------------------------ */

export const APPLICATIONS_SEED: Application[] = [
  {
    id: "app-google-gemini",
    company: JOB_COMPANIES.google,
    role: "Senior Frontend Engineer, Gemini",
    source: "Referral",
    appliedDaysAgo: 18,
    stage: "technical",
    status: "interview",
    nextInterview: {
      round: "Technical Round 2 — System Design",
      inDays: 2,
      time: "14:30",
      durationMin: 60,
      link: "https://meet.google.com/kqx-dmzr-abc",
    },
    salaryLabel: "$168k – $210k",
    salaryUsd: 189000,
    location: "Mountain View, CA",
    match: 94,
    priority: "high",
    recruiter: {
      name: "Priya Nair",
      title: "Technical Recruiter, Gemini",
      responseDays: 2,
    },
    resumeUsed: "Resume — Google Gemini v3.pdf",
    coverLetterUsed: "Cover Letter — Google.pdf",
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Submitted via referral from Ankit (Platform team).",
        daysAgo: 18,
        time: "09:42",
      },
      {
        kind: "viewed",
        title: "Recruiter viewed profile",
        description: "Priya Nair viewed your profile and resume.",
        daysAgo: 16,
        time: "11:20",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "30-minute intro call — team is hiring for 2 seats.",
        daysAgo: 12,
        time: "16:00",
      },
      {
        kind: "technical",
        title: "Technical Round 1",
        description: "Live coding on streaming UI state. Feedback: strong hire.",
        daysAgo: 5,
        time: "10:15",
      },
      {
        kind: "scheduled",
        title: "System design scheduled",
        description: "Round 2 booked — design a multimodal chat surface.",
        daysAgo: 1,
        time: "13:05",
      },
    ],
    insights: [
      "Round 1 feedback landed as **strong hire** — momentum is on your side.",
      "**Priya Nair** usually responds within **2 days**, the fastest recruiter in your pipeline.",
      "Your resume matches **94%** — leading with the streaming-render project worked.",
    ],
    notes: [
      "Interviewer panel: 2 senior engs + 1 staff. System design leans practical.",
      "Mention the micro-frontend migration — referral said the team is mid-rewrite.",
      "Ask about Gemini web latency budgets and on-call expectations.",
    ],
    attachments: [
      { name: "Resume — Google Gemini v3.pdf", kind: "resume", size: "182 KB" },
      { name: "Cover Letter — Google.pdf", kind: "cover-letter", size: "96 KB" },
      { name: "Round 1 — Interview Notes.md", kind: "interview-notes", size: "14 KB" },
      { name: "Portfolio — 2026.pdf", kind: "portfolio", size: "2.4 MB" },
    ],
    links: [
      { label: "Job posting", url: "https://careers.google.com" },
      { label: "Recruiter on LinkedIn", url: "https://www.linkedin.com/in/priyanair" },
      { label: "Interview prep doc", url: "https://docs.google.com" },
    ],
    responseRate: 78,
    lastActivityDays: 1,
  },
  {
    id: "app-microsoft-teams",
    company: JOB_COMPANIES.microsoft,
    role: "Software Engineer II, Teams Calling",
    source: "LinkedIn",
    appliedDaysAgo: 34,
    stage: "offer",
    status: "offer",
    nextInterview: null,
    salaryLabel: "$145k – $190k",
    salaryUsd: 167000,
    location: "Seattle, WA",
    match: 91,
    priority: "high",
    recruiter: {
      name: "Jordan Blake",
      title: "Senior Recruiter, M365",
      responseDays: 3,
    },
    resumeUsed: "Resume — Frontend 2026 v4.pdf",
    coverLetterUsed: null,
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Application submitted via LinkedIn Easy Apply.",
        daysAgo: 34,
        time: "20:12",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "Intro call — hybrid Redmond, 2 days/week on campus.",
        daysAgo: 28,
        time: "17:30",
      },
      {
        kind: "interview",
        title: "Hiring manager interview",
        description: "Deep-dive on realtime dashboard work. Positive signal.",
        daysAgo: 21,
        time: "11:00",
      },
      {
        kind: "technical",
        title: "Virtual onsite loop",
        description: "4 rounds: coding ×2, system design, behavioral.",
        daysAgo: 12,
        time: "09:00",
      },
      {
        kind: "offer",
        title: "Offer received",
        description: "L62 offer: $158k base + stock. Expires in 6 days.",
        daysAgo: 3,
        time: "15:45",
      },
    ],
    insights: [
      "The offer **expires in 6 days** — decide before your Google Round 2 result if possible.",
      "Their first offer typically has **8–12% negotiation headroom** on base + stock.",
      "Google's process is **2 rounds from done** — worth asking Microsoft for a one-week extension.",
    ],
    notes: [
      "Offer: $158k base, $110k stock / 4y, $20k sign-on.",
      "Ask for L63 calibration or higher sign-on to offset first-year vesting.",
      "Team ships weekly; on-call is one week in eight.",
    ],
    attachments: [
      { name: "Resume — Frontend 2026 v4.pdf", kind: "resume", size: "176 KB" },
      { name: "Offer Letter — Microsoft.pdf", kind: "offer-letter", size: "312 KB" },
      { name: "Onsite Loop — Interview Notes.md", kind: "interview-notes", size: "22 KB" },
    ],
    links: [
      { label: "Job posting", url: "https://careers.microsoft.com" },
      { label: "Compensation research", url: "https://levels.fyi" },
    ],
    responseRate: 64,
    lastActivityDays: 3,
  },
  {
    id: "app-spotify-webplayer",
    company: JOB_COMPANIES.spotify,
    role: "React Engineer, Web Player",
    source: "Greenhouse",
    appliedDaysAgo: 11,
    stage: "interview",
    status: "interview",
    nextInterview: {
      round: "Panel Interview — Web Player squad",
      inDays: 5,
      time: "10:00",
      durationMin: 90,
      link: "https://spotify.zoom.us/j/8241170",
    },
    salaryLabel: "$135k – $175k",
    salaryUsd: 155000,
    location: "Stockholm / Remote — EU",
    match: 92,
    priority: "medium",
    recruiter: {
      name: "Elsa Lindqvist",
      title: "Talent Partner, Music Experience",
      responseDays: 4,
    },
    resumeUsed: "Resume — Frontend 2026 v4.pdf",
    coverLetterUsed: "Cover Letter — Spotify.pdf",
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Application submitted via Greenhouse.",
        daysAgo: 11,
        time: "13:25",
      },
      {
        kind: "viewed",
        title: "Recruiter viewed profile",
        description: "Elsa Lindqvist opened your application twice.",
        daysAgo: 9,
        time: "10:05",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "Culture-fit chat; relocation and remote-EU both open.",
        daysAgo: 6,
        time: "15:00",
      },
      {
        kind: "scheduled",
        title: "Panel interview scheduled",
        description: "90-minute pairing + product discussion with the squad.",
        daysAgo: 2,
        time: "09:40",
      },
    ],
    insights: [
      "Panel pairing uses **their codebase, not LeetCode** — practice reading unfamiliar Redux code.",
      "**Spotify** replies to **81%** of applicants who reach the panel stage.",
      "Your Redux depth is the differentiator here — **10 of 11** listed skills match.",
    ],
    notes: [
      "Squad works Stockholm hours; overlap requirement is 4h/day.",
      "Prepare a strong answer on state-management trade-offs.",
    ],
    attachments: [
      { name: "Resume — Frontend 2026 v4.pdf", kind: "resume", size: "176 KB" },
      { name: "Cover Letter — Spotify.pdf", kind: "cover-letter", size: "88 KB" },
    ],
    links: [
      { label: "Job posting", url: "https://www.lifeatspotify.com" },
      { label: "Recruiter on LinkedIn", url: "https://www.linkedin.com/in/elsalindqvist" },
    ],
    responseRate: 81,
    lastActivityDays: 2,
  },
  {
    id: "app-razorpay-payments",
    company: JOB_COMPANIES.razorpay,
    role: "Frontend Engineer II, Payments",
    source: "Wellfound",
    appliedDaysAgo: 26,
    stage: "hr",
    status: "interview",
    nextInterview: {
      round: "HR Round — Compensation",
      inDays: 1,
      time: "18:30",
      durationMin: 45,
      link: "https://meet.google.com/rzp-hrx-001",
    },
    salaryLabel: "₹28L – ₹45L",
    salaryUsd: 44000,
    location: "Bengaluru, India",
    match: 96,
    priority: "high",
    recruiter: {
      name: "Sneha Kulkarni",
      title: "Lead Recruiter, Engineering",
      responseDays: 1,
    },
    resumeUsed: "Resume — Razorpay Payments v2.pdf",
    coverLetterUsed: null,
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Application submitted via Wellfound.",
        daysAgo: 26,
        time: "08:55",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "Quick screen; moved straight to technical track.",
        daysAgo: 22,
        time: "12:30",
      },
      {
        kind: "technical",
        title: "Technical Rounds 1 & 2",
        description: "Machine coding + micro-frontend architecture. Cleared both.",
        daysAgo: 10,
        time: "10:00",
      },
      {
        kind: "interview",
        title: "Hiring manager round",
        description: "Team fit with the Payments dashboard pod. Cleared.",
        daysAgo: 4,
        time: "17:00",
      },
      {
        kind: "scheduled",
        title: "HR round scheduled",
        description: "Compensation discussion — tomorrow evening.",
        daysAgo: 1,
        time: "19:10",
      },
    ],
    insights: [
      "Highest match in your pipeline at **96%** — you cleared every technical round.",
      "HR round is **tomorrow at 18:30** — anchor with your Microsoft offer for leverage.",
      "**Sneha Kulkarni** responds within **a day** — expect a fast decision after HR.",
    ],
    notes: [
      "They know about a competing offer; use it in the comp discussion.",
      "ESOP refresh policy is annual — confirm cliff and liquidity windows.",
      "Ask about the Blade design-system roadmap.",
    ],
    attachments: [
      { name: "Resume — Razorpay Payments v2.pdf", kind: "resume", size: "168 KB" },
      { name: "Rounds 1–2 — Interview Notes.md", kind: "interview-notes", size: "18 KB" },
    ],
    links: [
      { label: "Job posting", url: "https://razorpay.com/jobs" },
      { label: "Recruiter on LinkedIn", url: "https://www.linkedin.com/in/snehakulkarni" },
    ],
    responseRate: 88,
    lastActivityDays: 1,
  },
  {
    id: "app-netflix-player",
    company: JOB_COMPANIES.netflix,
    role: "Lead UI Engineer, Player Experience",
    source: "Lever",
    appliedDaysAgo: 9,
    stage: "screening",
    status: "screening",
    nextInterview: null,
    salaryLabel: "$185k – $240k",
    salaryUsd: 212000,
    location: "Remote — US",
    match: 90,
    priority: "medium",
    recruiter: {
      name: "Marcus Reid",
      title: "Recruiter, Client Foundations",
      responseDays: 4,
    },
    resumeUsed: "Resume — Frontend 2026 v4.pdf",
    coverLetterUsed: "Cover Letter — Netflix.pdf",
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Application submitted via Lever.",
        daysAgo: 9,
        time: "22:04",
      },
      {
        kind: "viewed",
        title: "Recruiter viewed profile",
        description: "Marcus Reid viewed your profile.",
        daysAgo: 7,
        time: "09:15",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "Intro call — lead scope, expect deep media-stack questions.",
        daysAgo: 6,
        time: "14:00",
      },
    ],
    insights: [
      "You haven't heard back in **6 days** — Marcus usually replies in 4. Time for a nudge.",
      "Lead loops here weigh **technical direction stories** heavily — prep two.",
      "**Netflix** responds to **58%** of applicants at this stage.",
    ],
    notes: [
      "Screen went long on playback performance — good sign.",
      "Prepare a 'context over control' leadership story.",
    ],
    attachments: [
      { name: "Resume — Frontend 2026 v4.pdf", kind: "resume", size: "176 KB" },
      { name: "Cover Letter — Netflix.pdf", kind: "cover-letter", size: "92 KB" },
    ],
    links: [{ label: "Job posting", url: "https://jobs.netflix.com" }],
    responseRate: 58,
    lastActivityDays: 6,
  },
  {
    id: "app-atlassian-jira",
    company: JOB_COMPANIES.atlassian,
    role: "Fullstack Engineer, Jira Platform",
    source: "Workday",
    appliedDaysAgo: 3,
    stage: "applied",
    status: "applied",
    nextInterview: null,
    salaryLabel: "$140k – $185k",
    salaryUsd: 162000,
    location: "Remote — anywhere",
    match: 87,
    priority: "medium",
    recruiter: null,
    resumeUsed: "Resume — Fullstack v2.pdf",
    coverLetterUsed: null,
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Application submitted via Workday.",
        daysAgo: 3,
        time: "11:47",
      },
      {
        kind: "viewed",
        title: "Application under review",
        description: "Your application moved to 'Under review' in Workday.",
        daysAgo: 1,
        time: "16:22",
      },
    ],
    insights: [
      "Status flipped to **Under review** yesterday — median time to screen here is **8 days**.",
      "**Atlassian** replies to **72%** of applicants — no follow-up needed yet.",
      "Async-writing culture: your RFC-style portfolio piece is worth linking in any reply.",
    ],
    notes: ["Fully distributed team — confirm AEST overlap expectations."],
    attachments: [
      { name: "Resume — Fullstack v2.pdf", kind: "resume", size: "171 KB" },
    ],
    links: [{ label: "Job posting", url: "https://www.atlassian.com/company/careers" }],
    responseRate: 72,
    lastActivityDays: 1,
  },
  {
    id: "app-adobe-cc",
    company: JOB_COMPANIES.adobe,
    role: "UI Engineer, Creative Cloud Web",
    source: "LinkedIn",
    appliedDaysAgo: 41,
    stage: "rejected",
    status: "rejected",
    nextInterview: null,
    salaryLabel: "$150k – $185k",
    salaryUsd: 167000,
    location: "San Francisco, CA",
    match: 82,
    priority: "low",
    recruiter: {
      name: "Dana Whitfield",
      title: "Talent Acquisition, Digital Media",
      responseDays: 6,
    },
    resumeUsed: "Resume — Frontend 2026 v3.pdf",
    coverLetterUsed: null,
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Application submitted via LinkedIn.",
        daysAgo: 41,
        time: "19:33",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "Intro call — role required 3 days/week in SF.",
        daysAgo: 33,
        time: "13:30",
      },
      {
        kind: "interview",
        title: "Hiring manager interview",
        description: "Portfolio review; gap flagged on Web Components.",
        daysAgo: 24,
        time: "10:30",
      },
      {
        kind: "rejected",
        title: "Not moving forward",
        description: "They went with a candidate who had Lit + Spectrum depth.",
        daysAgo: 15,
        time: "09:02",
      },
    ],
    insights: [
      "The gap was **Web Components/Lit** — a small OSS contribution would close it for similar roles.",
      "Your v4 resume scores **6 points higher** than the v3 used here — reapply window opens in 6 months.",
      "**3 similar roles** at other companies match your profile — want me to pull them up?",
    ],
    notes: ["Feedback: strong on React craft, thin on Web Components."],
    attachments: [
      { name: "Resume — Frontend 2026 v3.pdf", kind: "resume", size: "174 KB" },
      { name: "HM Round — Interview Notes.md", kind: "interview-notes", size: "9 KB" },
    ],
    links: [{ label: "Job posting", url: "https://careers.adobe.com" }],
    responseRate: 61,
    lastActivityDays: 15,
  },
  {
    id: "app-amazon-checkout",
    company: JOB_COMPANIES.amazon,
    role: "Frontend Engineer II, Checkout",
    source: "Referral",
    appliedDaysAgo: 29,
    stage: "interview",
    status: "withdrawn",
    nextInterview: null,
    salaryLabel: "$150k – $195k",
    salaryUsd: 172000,
    location: "Seattle, WA",
    match: 85,
    priority: "low",
    recruiter: {
      name: "Tom Okafor",
      title: "Sourcing Recruiter, Consumer",
      responseDays: 5,
    },
    resumeUsed: "Resume — Frontend 2026 v4.pdf",
    coverLetterUsed: null,
    timeline: [
      {
        kind: "applied",
        title: "Applied",
        description: "Referred by Meera (SDE II, Payments).",
        daysAgo: 29,
        time: "10:18",
      },
      {
        kind: "screening",
        title: "Recruiter screen",
        description: "Strictly onsite Seattle; relocation required.",
        daysAgo: 23,
        time: "18:00",
      },
      {
        kind: "interview",
        title: "Online assessment",
        description: "OA cleared; onsite loop proposed.",
        daysAgo: 17,
        time: "12:00",
      },
      {
        kind: "withdrawn",
        title: "Withdrew application",
        description: "Declined the loop — relocation doesn't fit this year.",
        daysAgo: 8,
        time: "11:11",
      },
    ],
    insights: [
      "Withdrawn by you — the recruiter noted you're **open to remote roles** in their system.",
      "Amazon's **remote-eligible** frontend postings re-open every quarter; I'm watching for them.",
    ],
    notes: ["Revisit if a remote-eligible team reaches out."],
    attachments: [
      { name: "Resume — Frontend 2026 v4.pdf", kind: "resume", size: "176 KB" },
    ],
    links: [{ label: "Job posting", url: "https://www.amazon.jobs" }],
    responseRate: 55,
    lastActivityDays: 8,
  },
];

/* ------------------------------------------------------------------ */
/* Deterministic generator — fills the pipeline out to 128             */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20260803);

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function between(min: number, max: number): number {
  return Math.round(min + rng() * (max - min));
}

const GEN_COMPANIES = [
  JOB_COMPANIES.google,
  JOB_COMPANIES.microsoft,
  JOB_COMPANIES.amazon,
  JOB_COMPANIES.adobe,
  JOB_COMPANIES.spotify,
  JOB_COMPANIES.netflix,
  JOB_COMPANIES.razorpay,
  JOB_COMPANIES.swiggy,
  JOB_COMPANIES.flipkart,
  JOB_COMPANIES.atlassian,
  JOB_COMPANIES.zomato,
  JOB_COMPANIES.meta,
] as const;

const ROLES = [
  "Frontend Engineer",
  "Senior Frontend Engineer",
  "Fullstack Engineer",
  "React Engineer",
  "UI Engineer",
  "Software Engineer II",
  "Product Engineer",
  "Design Systems Engineer",
  "Web Performance Engineer",
  "Staff Frontend Engineer",
] as const;

const TEAMS = [
  "Platform",
  "Growth",
  "Checkout",
  "Search",
  "Ads",
  "Cloud",
  "Mobile Web",
  "Design Systems",
  "Payments",
  "Core Experience",
] as const;

const INDIA_COMPANIES = new Set(["razorpay", "swiggy", "flipkart", "zomato"]);

const US_SALARIES = [
  ["$120k – $155k", 137000],
  ["$140k – $180k", 160000],
  ["$155k – $195k", 175000],
  ["$170k – $215k", 192000],
  ["$95k – $130k", 112000],
] as const;

const INDIA_SALARIES = [
  ["₹18L – ₹30L", 29000],
  ["₹24L – ₹38L", 37000],
  ["₹30L – ₹48L", 47000],
  ["₹35L – ₹55L", 54000],
] as const;

const LOCATIONS: Record<string, readonly string[]> = {
  google: ["Mountain View, CA", "Bengaluru, India", "Remote — US"],
  microsoft: ["Redmond, WA", "Hyderabad, India", "Remote — US"],
  amazon: ["Seattle, WA", "Bengaluru, India"],
  adobe: ["San Jose, CA", "Noida, India"],
  spotify: ["Stockholm, Sweden", "Remote — EU"],
  netflix: ["Los Gatos, CA", "Remote — US"],
  razorpay: ["Bengaluru, India"],
  swiggy: ["Bengaluru, India"],
  flipkart: ["Bengaluru, India"],
  zomato: ["Gurugram, India"],
  atlassian: ["Sydney, Australia", "Remote — anywhere", "Bengaluru, India"],
  meta: ["Menlo Park, CA", "Remote — US"],
};

const RECRUITERS = [
  ["Aisha Verma", "Technical Recruiter"],
  ["Daniel Kim", "Senior Talent Partner"],
  ["Lucia Moretti", "Recruiter, Engineering"],
  ["Rohan Gupta", "Talent Acquisition Lead"],
  ["Emily Sanders", "Sourcing Recruiter"],
  ["Karthik Iyer", "Lead Recruiter"],
  ["Nina Petrova", "Talent Partner"],
  ["Miguel Santos", "Recruiter, Product Eng"],
] as const;

const TIMES = ["09:30", "10:15", "11:00", "13:05", "14:30", "15:45", "16:00", "18:30"] as const;

const NOTE_POOL = [
  "Recruiter prefers strong React fundamentals.",
  "Mention the design-system migration project.",
  "Ask about remote policy and on-call rotation.",
  "Team uses Next.js + GraphQL in production.",
  "Interviewers value clear communication over speed.",
  "Revisit salary research before the HR round.",
  "Follow up if silent for more than a week.",
  "Panel prefers real project walkthroughs over puzzles.",
] as const;

const REJECT_REASONS = [
  "Position filled internally.",
  "They moved forward with a more senior profile.",
  "Headcount for this role was frozen.",
  "They chose a candidate with deeper domain experience.",
] as const;

const INTERVIEW_ROUNDS: Record<"interview" | "technical" | "hr", readonly string[]> = {
  interview: ["Hiring Manager Screen", "Panel Interview", "Team Fit Call"],
  technical: ["Technical Round 1", "Technical Round 2", "System Design", "Live Coding"],
  hr: ["HR Round", "Compensation Discussion", "Final HR Chat"],
};

/** Pipeline distribution for the 120 generated applications. */
const STAGE_PLAN: Stage[] = [
  ...Array<Stage>(33).fill("applied"),
  ...Array<Stage>(21).fill("screening"),
  ...Array<Stage>(16).fill("interview"),
  ...Array<Stage>(11).fill("technical"),
  ...Array<Stage>(7).fill("hr"),
  ...Array<Stage>(5).fill("offer"),
  ...Array<Stage>(27).fill("rejected"),
];

const STAGE_ORDER: Stage[] = ["applied", "screening", "interview", "technical", "hr", "offer"];

function buildTimeline(
  stage: Stage,
  status: ApplicationStatus,
  appliedDaysAgo: number,
  source: Source,
  recruiter: Recruiter | null
): TimelineEvent[] {
  const events: TimelineEvent[] = [
    {
      kind: "applied",
      title: "Applied",
      description:
        source === "Referral"
          ? "Application submitted through an internal referral."
          : `Application submitted via ${source}.`,
      daysAgo: appliedDaysAgo,
      time: pick(TIMES),
    },
  ];

  const reachedIndex =
    stage === "rejected" ? between(0, 3) : STAGE_ORDER.indexOf(stage);
  const span = Math.max(appliedDaysAgo - 1, 1);

  const addAt = (fraction: number) =>
    Math.max(Math.round(appliedDaysAgo - span * fraction), 0);

  if (reachedIndex >= 1 || rng() > 0.4) {
    events.push({
      kind: "viewed",
      title: "Recruiter viewed profile",
      description: recruiter
        ? `${recruiter.name} viewed your profile and resume.`
        : "Your profile was viewed by the hiring team.",
      daysAgo: addAt(0.15),
      time: pick(TIMES),
    });
  }
  if (reachedIndex >= 1) {
    events.push({
      kind: "screening",
      title: "Recruiter screen",
      description: "30-minute intro call about the role and team.",
      daysAgo: addAt(0.35),
      time: pick(TIMES),
    });
  }
  if (reachedIndex >= 2) {
    events.push({
      kind: "interview",
      title: "Hiring manager interview",
      description: "Deep-dive on past projects and team fit.",
      daysAgo: addAt(0.55),
      time: pick(TIMES),
    });
  }
  if (reachedIndex >= 3) {
    events.push({
      kind: "technical",
      title: "Technical interview",
      description: "Live coding and architecture discussion.",
      daysAgo: addAt(0.7),
      time: pick(TIMES),
    });
  }
  if (reachedIndex >= 4) {
    events.push({
      kind: "hr",
      title: "HR round",
      description: "Compensation expectations and notice period.",
      daysAgo: addAt(0.82),
      time: pick(TIMES),
    });
  }
  if (stage === "offer") {
    events.push({
      kind: "offer",
      title: "Offer received",
      description: "Offer letter shared — review the numbers carefully.",
      daysAgo: addAt(0.92),
      time: pick(TIMES),
    });
  }
  if (status === "accepted") {
    events.push({
      kind: "accepted",
      title: "Offer accepted",
      description: "You signed! Start date being finalized.",
      daysAgo: addAt(1),
      time: pick(TIMES),
    });
  }
  if (stage === "rejected") {
    events.push({
      kind: "rejected",
      title: "Not moving forward",
      description: pick(REJECT_REASONS),
      daysAgo: addAt(0.9),
      time: pick(TIMES),
    });
  }
  if (status === "withdrawn") {
    events.push({
      kind: "withdrawn",
      title: "Withdrew application",
      description: "You withdrew to focus on stronger-fit roles.",
      daysAgo: addAt(0.95),
      time: pick(TIMES),
    });
  }

  // Chronological, and monotonically non-increasing daysAgo.
  events.sort((a, b) => b.daysAgo - a.daysAgo);
  return events;
}

function buildInsights(app: Application): string[] {
  const insights: string[] = [];
  if (isActiveStatus(app.status) && app.lastActivityDays >= 5) {
    insights.push(
      `You haven't followed up in **${app.lastActivityDays} days** — a short nudge keeps you top of mind.`
    );
  }
  if (app.nextInterview) {
    insights.push(
      `**${app.nextInterview.round}** is ${countdownLabel(app.nextInterview.inDays).toLowerCase()} — I can build you a prep pack.`
    );
  }
  if (app.recruiter) {
    insights.push(
      `**${app.recruiter.name}** usually responds within **${app.recruiter.responseDays} ${app.recruiter.responseDays === 1 ? "day" : "days"}**.`
    );
  }
  insights.push(
    `**${app.company.name}** responds to **${app.responseRate}%** of applicants at this stage.`
  );
  insights.push(`Your resume matches **${app.match}%** of this role's requirements.`);
  if (app.status === "rejected") {
    insights.push("**3 similar roles** at other companies match your profile — want me to pull them up?");
  }
  return insights.slice(0, 3);
}

function generateApplication(stage: Stage, index: number): Application {
  const company = GEN_COMPANIES[index % GEN_COMPANIES.length];
  const team = pick(TEAMS);
  const role = `${pick(ROLES)}, ${team}`;
  const source = pick(SOURCES);
  const india = INDIA_COMPANIES.has(company.id);
  const [salaryLabel, salaryUsd] = india ? pick(INDIA_SALARIES) : pick(US_SALARIES);

  let status: ApplicationStatus;
  if (stage === "rejected") status = "rejected";
  else if (stage === "offer") status = rng() < 0.25 ? "accepted" : "offer";
  else if (stage === "technical" || stage === "hr") status = "interview";
  else if (stage === "interview") status = rng() < 0.08 ? "withdrawn" : "interview";
  else status = stage as ApplicationStatus;

  const appliedRange: Record<Stage, [number, number]> = {
    applied: [0, 14],
    screening: [5, 25],
    interview: [10, 40],
    technical: [14, 45],
    hr: [20, 50],
    offer: [25, 60],
    rejected: [10, 88],
  };
  const appliedDaysAgo = between(...appliedRange[stage]);

  const hasRecruiter = stage !== "applied" || rng() > 0.5;
  const recruiter: Recruiter | null = hasRecruiter
    ? (() => {
        const [name, title] = pick(RECRUITERS);
        return { name, title, responseDays: between(1, 7) };
      })()
    : null;

  const matchRange: Record<Stage, [number, number]> = {
    applied: [70, 92],
    screening: [74, 93],
    interview: [78, 95],
    technical: [80, 95],
    hr: [82, 96],
    offer: [85, 96],
    rejected: [62, 86],
  };
  const match = between(...matchRange[stage]);

  const interviewStage =
    stage === "interview" || stage === "technical" || stage === "hr";
  const nextInterview: Interview | null =
    interviewStage && status === "interview" && rng() < 0.7
      ? {
          round: pick(INTERVIEW_ROUNDS[stage as "interview" | "technical" | "hr"]),
          inDays: between(0, 7),
          time: pick(TIMES),
          durationMin: pick([45, 60, 90] as const),
          link:
            rng() > 0.5
              ? `https://meet.google.com/${company.id.slice(0, 3)}-${index}00-xyz`
              : `https://zoom.us/j/9${index}0${between(100, 999)}`,
        }
      : null;

  const priority: Priority =
    stage === "offer" || stage === "hr"
      ? "high"
      : stage === "technical" || stage === "interview"
        ? rng() < 0.5
          ? "high"
          : "medium"
        : stage === "rejected"
          ? "low"
          : rng() < 0.35
            ? "medium"
            : "low";

  const timeline = buildTimeline(stage, status, appliedDaysAgo, source, recruiter);
  const lastActivityDays = timeline[timeline.length - 1].daysAgo;

  const attachments: Attachment[] = [
    { name: "Resume — Frontend 2026 v4.pdf", kind: "resume", size: "176 KB" },
  ];
  if (rng() > 0.6) {
    attachments.push({
      name: `Cover Letter — ${company.name}.pdf`,
      kind: "cover-letter",
      size: `${between(80, 120)} KB`,
    });
  }
  if (stage === "offer") {
    attachments.push({
      name: `Offer Letter — ${company.name}.pdf`,
      kind: "offer-letter",
      size: `${between(220, 380)} KB`,
    });
  }
  if (interviewStage || stage === "offer") {
    attachments.push({
      name: "Interview Notes.md",
      kind: "interview-notes",
      size: `${between(6, 24)} KB`,
    });
  }

  const links: LinkItem[] = [
    { label: "Job posting", url: `https://careers.${company.id}.com` },
  ];
  if (recruiter && rng() > 0.5) {
    links.push({
      label: "Recruiter on LinkedIn",
      url: `https://www.linkedin.com/in/${recruiter.name.toLowerCase().replace(/\s+/g, "")}`,
    });
  }

  const noteCount = between(0, 2);
  const notes = Array.from(
    { length: noteCount },
    (_, i) => NOTE_POOL[(index + i * 3) % NOTE_POOL.length]
  );

  const app: Application = {
    id: `app-${company.id}-${index}`,
    company,
    role,
    source,
    appliedDaysAgo,
    stage,
    status,
    nextInterview,
    salaryLabel,
    salaryUsd,
    location: pick(LOCATIONS[company.id] ?? ["Remote"]),
    match,
    priority,
    recruiter,
    resumeUsed:
      rng() > 0.7 ? `Resume — ${company.name} Tailored.pdf` : "Resume — Frontend 2026 v4.pdf",
    coverLetterUsed: attachments.some((a) => a.kind === "cover-letter")
      ? `Cover Letter — ${company.name}.pdf`
      : null,
    timeline,
    insights: [],
    notes,
    attachments,
    links,
    responseRate: 52 + ((company.id.length * 7 + index) % 38),
    lastActivityDays,
  };
  app.insights = buildInsights(app);
  return app;
}

const GENERATED: Application[] = STAGE_PLAN.map((stage, index) =>
  generateApplication(stage, index)
);

/** The full 128-application pipeline. */
export const APPLICATIONS: Application[] = [...APPLICATIONS_SEED, ...GENERATED];

/** Distinct companies present in the pipeline — used for the company filter. */
export const APPLICATION_COMPANIES: JobCompany[] = Array.from(
  new Map(APPLICATIONS.map((app) => [app.company.id, app.company])).values()
).sort((a, b) => a.name.localeCompare(b.name));

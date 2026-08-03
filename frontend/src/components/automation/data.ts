/**
 * Mock data for the Automation Center. Shapes mirror the future backend
 * contract so swapping in real queries is a drop-in change.
 */

export type WorkflowStatus = "running" | "paused" | "completed" | "failed";
export type LogStatus = "success" | "warning" | "error";
export type SourceStatus = "connected" | "syncing" | "error";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  schedule: string;
  lastRun: string;
  nextRun: string;
  executions: number;
  successRate: number;
  /** Source ids this workflow reads from. */
  sources: string[];
  rules: { label: string; value: string }[];
  /** Timeline of the most recent run. */
  timeline: TimelineStep[];
  logs: LogEntry[];
  decisions: {
    selected: Decision[];
    skipped: Decision[];
  };
  results: { label: string; value: string }[];
}

export interface TimelineStep {
  time: string;
  title: string;
  detail: string;
  status: LogStatus;
}

export interface LogEntry {
  id: string;
  time: string;
  source: string;
  action: string;
  result: string;
  duration: string;
  status: LogStatus;
}

export interface Decision {
  role: string;
  company: string;
  /** Selected: reasons it matched. Skipped: single reason chip. */
  reasons: string[];
}

export interface JobSource {
  id: string;
  name: string;
  status: SourceStatus;
  jobsScanned: number;
  lastSync: string;
  successRate: number;
}

export interface ActivityItem {
  id: string;
  time: string;
  text: string;
  tone: "info" | "success" | "warning" | "running";
}

export interface NotificationItem {
  id: string;
  kind: "application" | "interview" | "resume" | "paused" | "scan";
  text: string;
  time: string;
}

export const STATUS_META: Record<
  WorkflowStatus,
  {
    label: string;
    badgeVariant: "running" | "draft" | "completed" | "error";
    dotTone: "running" | "neutral" | "success" | "error";
  }
> = {
  running: { label: "Running", badgeVariant: "running", dotTone: "running" },
  paused: { label: "Paused", badgeVariant: "draft", dotTone: "neutral" },
  completed: { label: "Completed", badgeVariant: "completed", dotTone: "success" },
  failed: { label: "Failed", badgeVariant: "error", dotTone: "error" },
};

export const LOG_STATUS_META: Record<
  LogStatus,
  { label: string; badgeVariant: "success" | "warning" | "error" }
> = {
  success: { label: "Success", badgeVariant: "success" },
  warning: { label: "Warning", badgeVariant: "warning" },
  error: { label: "Error", badgeVariant: "error" },
};

/* ------------------------------------------------------------------ */
/* Job sources                                                         */
/* ------------------------------------------------------------------ */

export const JOB_SOURCES: JobSource[] = [
  { id: "linkedin", name: "LinkedIn", status: "connected", jobsScanned: 1284, lastSync: "4 min ago", successRate: 99 },
  { id: "wellfound", name: "Wellfound", status: "connected", jobsScanned: 342, lastSync: "12 min ago", successRate: 97 },
  { id: "greenhouse", name: "Greenhouse", status: "connected", jobsScanned: 518, lastSync: "9 min ago", successRate: 98 },
  { id: "lever", name: "Lever", status: "connected", jobsScanned: 296, lastSync: "26 min ago", successRate: 96 },
  { id: "ashby", name: "Ashby", status: "syncing", jobsScanned: 173, lastSync: "syncing now", successRate: 95 },
  { id: "workday", name: "Workday", status: "error", jobsScanned: 481, lastSync: "3 hours ago", successRate: 71 },
  { id: "careers", name: "Company Careers", status: "connected", jobsScanned: 209, lastSync: "31 min ago", successRate: 93 },
  { id: "referral", name: "Referral Network", status: "connected", jobsScanned: 38, lastSync: "1 hour ago", successRate: 100 },
];

/* ------------------------------------------------------------------ */
/* Workflows                                                           */
/* ------------------------------------------------------------------ */

export const WORKFLOWS_SEED: Workflow[] = [
  {
    id: "wf-daily-search",
    name: "Daily Job Search",
    description:
      "The flagship pipeline: scans every connected source each morning, scores matches against your active resume, tailors it for the best fits, and submits applications inside your rules.",
    status: "running",
    schedule: "Daily at 09:00",
    lastRun: "Today, 09:00",
    nextRun: "Tomorrow, 09:00",
    executions: 148,
    successRate: 96,
    sources: ["linkedin", "wellfound", "greenhouse", "lever", "careers"],
    rules: [
      { label: "Minimum salary", value: "$130k / ₹28L" },
      { label: "Preferred location", value: "Remote · Bengaluru" },
      { label: "Remote only", value: "Off" },
      { label: "Required match score", value: "≥ 80%" },
      { label: "Daily apply limit", value: "5 of 8 used" },
      { label: "Required skills", value: "React, TypeScript" },
      { label: "Exclude companies", value: "3 excluded" },
      { label: "Blacklist keywords", value: "on-call heavy, PHP" },
    ],
    timeline: [
      { time: "09:00", title: "Scan started", detail: "5 sources queued — LinkedIn first.", status: "success" },
      { time: "09:02", title: "24 new jobs found", detail: "18 LinkedIn · 4 Greenhouse · 2 Wellfound.", status: "success" },
      { time: "09:05", title: "AI analyzed matches", detail: "9 above your 80% threshold; 12 skipped by rules.", status: "success" },
      { time: "09:06", title: "3 resumes optimized", detail: "Tailored 'Senior Frontend — 2026' for the top matches.", status: "success" },
      { time: "09:08", title: "Applications submitted", detail: "5 sent — daily limit reached, 4 queued for tomorrow.", status: "warning" },
      { time: "09:09", title: "Notification sent", detail: "Morning digest delivered with all 24 results.", status: "success" },
    ],
    logs: [
      { id: "l1", time: "09:08:41", source: "Greenhouse", action: "Submit application", result: "Spotify — React Engineer", duration: "6.2s", status: "success" },
      { id: "l2", time: "09:08:12", source: "LinkedIn", action: "Submit application", result: "Atlassian — Fullstack Engineer", duration: "4.8s", status: "success" },
      { id: "l3", time: "09:07:56", source: "LinkedIn", action: "Submit application", result: "Google — Senior Frontend, Gemini", duration: "5.1s", status: "success" },
      { id: "l4", time: "09:06:20", source: "AI Engine", action: "Tailor resume", result: "3 versions created", duration: "38.4s", status: "success" },
      { id: "l5", time: "09:05:02", source: "AI Engine", action: "Score matches", result: "24 scored, 9 above threshold", duration: "12.7s", status: "success" },
      { id: "l6", time: "09:03:48", source: "Workday", action: "Scan listings", result: "Session expired — source skipped", duration: "2.1s", status: "error" },
      { id: "l7", time: "09:02:33", source: "Wellfound", action: "Scan listings", result: "2 new jobs", duration: "8.9s", status: "success" },
      { id: "l8", time: "09:01:15", source: "Greenhouse", action: "Scan listings", result: "4 new jobs", duration: "11.3s", status: "success" },
      { id: "l9", time: "09:00:04", source: "LinkedIn", action: "Scan listings", result: "18 new jobs", duration: "24.6s", status: "success" },
    ],
    decisions: {
      selected: [
        { role: "Senior Frontend Engineer, Gemini", company: "Google", reasons: ["React", "Next.js", "95% match", "Remote"] },
        { role: "React Engineer, Web Player", company: "Spotify", reasons: ["React", "Redux", "92% match", "Visa support"] },
        { role: "Fullstack Engineer, Jira", company: "Atlassian", reasons: ["React", "GraphQL", "87% match", "Remote anywhere"] },
      ],
      skipped: [
        { role: "Frontend Engineer", company: "Zomato", reasons: ["Salary too low"] },
        { role: "UI Engineer", company: "Adobe", reasons: ["Requires visa"] },
        { role: "Backend Engineer", company: "Flipkart", reasons: ["Node.js only"] },
        { role: "React Developer", company: "Swiggy", reasons: ["Duplicate posting"] },
      ],
    },
    results: [
      { label: "Jobs found", value: "24" },
      { label: "Above threshold", value: "9" },
      { label: "Applied", value: "5" },
      { label: "Queued", value: "4" },
    ],
  },
  {
    id: "wf-linkedin-scan",
    name: "LinkedIn Auto Scan",
    description:
      "High-frequency scan of LinkedIn's frontend listings. Deduplicates against your pipeline and flags Easy Apply roles for instant submission.",
    status: "running",
    schedule: "Every 2 hours",
    lastRun: "Today, 13:00",
    nextRun: "Today, 15:00",
    executions: 412,
    successRate: 99,
    sources: ["linkedin"],
    rules: [
      { label: "Required match score", value: "≥ 75%" },
      { label: "Easy Apply priority", value: "On" },
      { label: "Posted within", value: "48 hours" },
      { label: "Blacklist keywords", value: "unpaid, internship" },
    ],
    timeline: [
      { time: "13:00", title: "Scan started", detail: "Frontend + React filters active.", status: "success" },
      { time: "13:01", title: "11 new jobs found", detail: "6 Easy Apply among them.", status: "success" },
      { time: "13:03", title: "AI analyzed matches", detail: "4 above threshold, 2 flagged for instant apply.", status: "success" },
      { time: "13:04", title: "Handed to Daily Job Search", detail: "Queued for the next apply window.", status: "success" },
    ],
    logs: [
      { id: "l1", time: "13:03:12", source: "AI Engine", action: "Score matches", result: "11 scored, 4 above threshold", duration: "6.4s", status: "success" },
      { id: "l2", time: "13:01:44", source: "LinkedIn", action: "Deduplicate", result: "3 already in pipeline", duration: "1.2s", status: "success" },
      { id: "l3", time: "13:00:06", source: "LinkedIn", action: "Scan listings", result: "11 new jobs", duration: "19.8s", status: "success" },
      { id: "l4", time: "11:00:09", source: "LinkedIn", action: "Scan listings", result: "3 new jobs", duration: "17.2s", status: "success" },
      { id: "l5", time: "09:00:04", source: "LinkedIn", action: "Scan listings", result: "18 new jobs", duration: "24.6s", status: "success" },
    ],
    decisions: {
      selected: [
        { role: "Frontend Engineer, Reality Labs", company: "Meta", reasons: ["React", "Design systems", "94% match", "Easy Apply"] },
        { role: "Software Engineer II, Teams", company: "Microsoft", reasons: ["React", "TypeScript", "88% match"] },
      ],
      skipped: [
        { role: "Angular Developer", company: "Infosys", reasons: ["Stack mismatch"] },
        { role: "Frontend Intern", company: "Startup X", reasons: ["Blacklisted keyword"] },
      ],
    },
    results: [
      { label: "Scans today", value: "3" },
      { label: "Jobs found", value: "32" },
      { label: "Instant applies", value: "2" },
    ],
  },
  {
    id: "wf-wellfound-scan",
    name: "Wellfound Scan",
    description:
      "Startup-focused sweep of Wellfound. Weighs equity ranges and stage against your preferences before anything reaches your pipeline.",
    status: "completed",
    schedule: "Daily at 10:30",
    lastRun: "Today, 10:30",
    nextRun: "Tomorrow, 10:30",
    executions: 86,
    successRate: 94,
    sources: ["wellfound"],
    rules: [
      { label: "Company stage", value: "Series A+" },
      { label: "Minimum salary", value: "₹24L" },
      { label: "Equity required", value: "Yes" },
    ],
    timeline: [
      { time: "10:30", title: "Scan started", detail: "Startup filters: Series A+, 20+ employees.", status: "success" },
      { time: "10:31", title: "2 new jobs found", detail: "Both at funded fintechs.", status: "success" },
      { time: "10:32", title: "AI analyzed matches", detail: "1 above threshold — added to review queue.", status: "success" },
      { time: "10:33", title: "Run completed", detail: "Next sweep tomorrow 10:30.", status: "success" },
    ],
    logs: [
      { id: "l1", time: "10:32:20", source: "AI Engine", action: "Score matches", result: "2 scored, 1 above threshold", duration: "3.1s", status: "success" },
      { id: "l2", time: "10:30:08", source: "Wellfound", action: "Scan listings", result: "2 new jobs", duration: "8.9s", status: "success" },
    ],
    decisions: {
      selected: [
        { role: "Frontend Engineer II, Payments", company: "Razorpay", reasons: ["React", "Fintech", "96% match", "ESOPs"] },
      ],
      skipped: [
        { role: "Founding Engineer", company: "Seed-stage stealth", reasons: ["Stage below rule"] },
      ],
    },
    results: [
      { label: "Jobs found", value: "2" },
      { label: "Queued for review", value: "1" },
    ],
  },
  {
    id: "wf-greenhouse-monitor",
    name: "Greenhouse Monitor",
    description:
      "Watches Greenhouse boards at 40 target companies and alerts you within minutes of a matching role going live — before the applicant flood.",
    status: "running",
    schedule: "Every 30 minutes",
    lastRun: "Today, 14:30",
    nextRun: "Today, 15:00",
    executions: 1093,
    successRate: 98,
    sources: ["greenhouse"],
    rules: [
      { label: "Whitelist companies", value: "40 tracked" },
      { label: "Alert window", value: "< 10 min from posting" },
      { label: "Required match score", value: "≥ 70%" },
    ],
    timeline: [
      { time: "14:30", title: "Board check started", detail: "40 company boards polled.", status: "success" },
      { time: "14:31", title: "1 new listing detected", detail: "Netflix — UI Engineer, posted 6 minutes ago.", status: "success" },
      { time: "14:32", title: "Early-bird alert sent", detail: "You're in the first 25 applicants if you act now.", status: "success" },
    ],
    logs: [
      { id: "l1", time: "14:31:40", source: "Greenhouse", action: "Send alert", result: "Netflix — UI Engineer", duration: "0.8s", status: "success" },
      { id: "l2", time: "14:30:05", source: "Greenhouse", action: "Poll boards", result: "40 boards, 1 new listing", duration: "14.2s", status: "success" },
      { id: "l3", time: "14:00:07", source: "Greenhouse", action: "Poll boards", result: "40 boards, no changes", duration: "13.8s", status: "success" },
    ],
    decisions: {
      selected: [
        { role: "UI Engineer, Player Experience", company: "Netflix", reasons: ["React", "Performance", "90% match", "Fresh posting"] },
      ],
      skipped: [],
    },
    results: [
      { label: "Boards watched", value: "40" },
      { label: "Alerts today", value: "3" },
      { label: "Median alert delay", value: "7 min" },
    ],
  },
  {
    id: "wf-resume-optimizer",
    name: "Resume Optimizer",
    description:
      "Nightly pass over your resume library: re-scores every version against fresh job descriptions and applies safe keyword improvements automatically.",
    status: "completed",
    schedule: "Nightly at 02:00",
    lastRun: "Today, 02:00",
    nextRun: "Tomorrow, 02:00",
    executions: 61,
    successRate: 100,
    sources: ["careers"],
    rules: [
      { label: "Auto-apply changes", value: "Safe edits only" },
      { label: "Score floor", value: "Never below current" },
      { label: "Library scope", value: "Active resumes" },
    ],
    timeline: [
      { time: "02:00", title: "Optimization started", detail: "4 resumes in scope.", status: "success" },
      { time: "02:03", title: "Keyword gaps found", detail: "GraphQL demand up 12% in your target roles.", status: "success" },
      { time: "02:05", title: "2 resumes improved", detail: "'Senior Frontend — 2026' 89 → 91 ATS.", status: "success" },
      { time: "02:06", title: "Report generated", detail: "Changes staged for your morning review.", status: "success" },
    ],
    logs: [
      { id: "l1", time: "02:05:33", source: "AI Engine", action: "Apply improvements", result: "2 resumes updated", duration: "41.7s", status: "success" },
      { id: "l2", time: "02:03:10", source: "AI Engine", action: "Analyze keyword trends", result: "312 fresh listings parsed", duration: "88.2s", status: "success" },
      { id: "l3", time: "02:00:02", source: "AI Engine", action: "Load resume library", result: "4 resumes", duration: "1.1s", status: "success" },
    ],
    decisions: { selected: [], skipped: [] },
    results: [
      { label: "Resumes improved", value: "2" },
      { label: "Avg ATS gain", value: "+2.0" },
    ],
  },
  {
    id: "wf-cover-letters",
    name: "Cover Letter Generator",
    description:
      "Drafts a tailored cover letter the moment an application is queued, grounded in the job description and your matching resume version.",
    status: "paused",
    schedule: "On application queued",
    lastRun: "Yesterday, 18:12",
    nextRun: "Paused",
    executions: 57,
    successRate: 93,
    sources: ["linkedin", "greenhouse", "lever"],
    rules: [
      { label: "Tone", value: "Direct, no fluff" },
      { label: "Length", value: "≤ 250 words" },
      { label: "Review before send", value: "On" },
    ],
    timeline: [
      { time: "18:12", title: "Letter drafted", detail: "Razorpay — Frontend Engineer II.", status: "success" },
      { time: "18:12", title: "Held for review", detail: "Waiting for your approval — then you paused the workflow.", status: "warning" },
    ],
    logs: [
      { id: "l1", time: "18:12:40", source: "AI Engine", action: "Draft cover letter", result: "Razorpay — held for review", duration: "22.3s", status: "warning" },
      { id: "l2", time: "11:38:19", source: "AI Engine", action: "Draft cover letter", result: "Spotify — approved & attached", duration: "19.6s", status: "success" },
    ],
    decisions: { selected: [], skipped: [] },
    results: [
      { label: "Letters this week", value: "6" },
      { label: "Approval rate", value: "83%" },
    ],
  },
  {
    id: "wf-interview-reminder",
    name: "Interview Reminder",
    description:
      "Watches your application pipeline for scheduled interviews and handles prep: reminders, company briefs, and likely questions the evening before.",
    status: "running",
    schedule: "Event-driven",
    lastRun: "Today, 08:00",
    nextRun: "On next interview",
    executions: 29,
    successRate: 100,
    sources: ["careers", "referral"],
    rules: [
      { label: "Reminder lead time", value: "24h and 1h before" },
      { label: "Prep pack", value: "Auto-generate" },
      { label: "Calendar sync", value: "On" },
    ],
    timeline: [
      { time: "08:00", title: "Reminder sent", detail: "Google System Design — in 2 days, 14:30.", status: "success" },
      { time: "08:00", title: "Prep pack generated", detail: "12 likely questions + interviewer background.", status: "success" },
    ],
    logs: [
      { id: "l1", time: "08:00:12", source: "AI Engine", action: "Generate prep pack", result: "Google — Round 2", duration: "31.4s", status: "success" },
      { id: "l2", time: "08:00:03", source: "Calendar", action: "Send reminder", result: "2 interviews this week", duration: "0.6s", status: "success" },
    ],
    decisions: { selected: [], skipped: [] },
    results: [
      { label: "Upcoming interviews", value: "2" },
      { label: "Prep packs ready", value: "2" },
    ],
  },
  {
    id: "wf-followup",
    name: "Application Follow-up",
    description:
      "Nudges recruiters when applications go quiet: drafts a short, personalized follow-up after your configured silence window.",
    status: "failed",
    schedule: "Daily at 16:00",
    lastRun: "Today, 16:00",
    nextRun: "Retrying at 18:00",
    executions: 74,
    successRate: 88,
    sources: ["linkedin", "referral"],
    rules: [
      { label: "Silence window", value: "6 days" },
      { label: "Max follow-ups", value: "2 per application" },
      { label: "Review before send", value: "Off" },
    ],
    timeline: [
      { time: "16:00", title: "Follow-up run started", detail: "3 applications past the silence window.", status: "success" },
      { time: "16:01", title: "2 follow-ups sent", detail: "Netflix and Atlassian recruiters nudged.", status: "success" },
      { time: "16:02", title: "LinkedIn rate limit hit", detail: "Third message blocked — retrying at 18:00.", status: "error" },
    ],
    logs: [
      { id: "l1", time: "16:02:11", source: "LinkedIn", action: "Send follow-up", result: "Rate limited — retry scheduled", duration: "3.4s", status: "error" },
      { id: "l2", time: "16:01:29", source: "LinkedIn", action: "Send follow-up", result: "Atlassian recruiter nudged", duration: "2.8s", status: "success" },
      { id: "l3", time: "16:00:47", source: "LinkedIn", action: "Send follow-up", result: "Netflix recruiter nudged", duration: "2.9s", status: "success" },
    ],
    decisions: { selected: [], skipped: [] },
    results: [
      { label: "Sent today", value: "2" },
      { label: "Reply rate", value: "41%" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Live activity & notifications                                       */
/* ------------------------------------------------------------------ */

export const ACTIVITY_SEED: ActivityItem[] = [
  { id: "a1", time: "14:32", text: "Early-bird alert: Netflix UI Engineer posted 6 minutes ago.", tone: "success" },
  { id: "a2", time: "14:30", text: "Greenhouse Monitor polling 40 company boards…", tone: "running" },
  { id: "a3", time: "13:04", text: "2 LinkedIn Easy Apply roles queued for instant apply.", tone: "info" },
  { id: "a4", time: "09:09", text: "Morning digest sent — 24 jobs, 5 applications submitted.", tone: "success" },
  { id: "a5", time: "09:03", text: "Workday session expired — source skipped this run.", tone: "warning" },
];

/** Pool the live feed draws from after mount. */
export const ACTIVITY_POOL: Omit<ActivityItem, "id" | "time">[] = [
  { text: "Scanning LinkedIn for new frontend listings…", tone: "running" },
  { text: "Resume 'Senior Frontend — 2026' re-scored: 91% ATS.", tone: "success" },
  { text: "3 new jobs found on Greenhouse — scoring matches now.", tone: "info" },
  { text: "Application submitted: Atlassian — Fullstack Engineer.", tone: "success" },
  { text: "Duplicate posting detected on Wellfound — skipped.", tone: "info" },
  { text: "Interview invitation received from Razorpay.", tone: "success" },
  { text: "Cover letter drafted for Netflix — held for your review.", tone: "info" },
  { text: "Waiting for next scan window (15:00)…", tone: "running" },
  { text: "Ashby sync completed — 14 new listings indexed.", tone: "success" },
  { text: "Follow-up retry scheduled for 18:00 after rate limit.", tone: "warning" },
];

export const NOTIFICATIONS_SEED: NotificationItem[] = [
  { id: "n1", kind: "interview", text: "Interview invitation — Razorpay HR round tomorrow 18:30.", time: "1h ago" },
  { id: "n2", kind: "application", text: "Application submitted to Spotify via Greenhouse.", time: "5h ago" },
  { id: "n3", kind: "scan", text: "Morning scan completed — 24 jobs found across 5 sources.", time: "6h ago" },
  { id: "n4", kind: "resume", text: "Resume Optimizer improved 2 resumes overnight.", time: "12h ago" },
  { id: "n5", kind: "paused", text: "Cover Letter Generator paused by you.", time: "1d ago" },
];

/* ------------------------------------------------------------------ */
/* AI assistant                                                        */
/* ------------------------------------------------------------------ */

export const AI_INSIGHTS: string[] = [
  "Your automation skipped **12 jobs** yesterday because the salary rule is set above market for Bengaluru roles.",
  "You hit your **daily apply limit by 09:08** — raising it from 5 to 8 would have used all 9 qualified matches.",
  "Resume **version 3 performs 18% better** than v2 in application responses — I've made it the default for tailoring.",
  "**Netflix, Atlassian, and Razorpay** usually reply within 48 hours — expect movement on yesterday's batch.",
];

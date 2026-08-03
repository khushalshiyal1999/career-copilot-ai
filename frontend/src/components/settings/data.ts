/**
 * Mock data for the Settings module — the user's Career Control Center.
 * Shapes mirror the future backend contract so swapping in real
 * persistence is a drop-in change.
 */

import {
  Activity,
  Bell,
  Bot,
  Briefcase,
  CreditCard,
  Info,
  Lock,
  Plug,
  Sparkles,
  Target,
  User,
  type LucideIcon,
} from "@/components/icons";

export type SectionId =
  | "profile"
  | "career"
  | "job-prefs"
  | "automation"
  | "ai"
  | "accounts"
  | "notifications"
  | "security"
  | "billing"
  | "about"
  | "activity";

export interface NavSection {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  /** Extra badge, e.g. "Future". */
  hint?: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "career", label: "Career", icon: Briefcase },
  { id: "job-prefs", label: "Job Preferences", icon: Target },
  { id: "automation", label: "Automation", icon: Bot },
  { id: "ai", label: "AI Preferences", icon: Sparkles },
  { id: "accounts", label: "Connected Accounts", icon: Plug },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard, hint: "Future" },
  { id: "about", label: "About", icon: Info },
  { id: "activity", label: "Activity", icon: Activity },
];

/* ------------------------------------------------------------------ */
/* Profile & career defaults                                           */
/* ------------------------------------------------------------------ */

export const PROFILE_DEFAULTS = {
  name: "Aarav Sharma",
  email: "aarav.sharma@email.com",
  phone: "+91 98450 12233",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata (IST)",
  portfolio: "https://aarav.dev",
  github: "github.com/aaravsharma",
  linkedin: "linkedin.com/in/aaravsharma",
  website: "https://aarav.dev/blog",
  bio: "Senior frontend engineer who ships performance-critical React. 7+ years across fintech and e-commerce; currently deep in design systems and AI-assisted product surfaces.",
};

export const TIMEZONES = [
  "Asia/Kolkata (IST)",
  "Europe/London (GMT)",
  "Europe/Berlin (CET)",
  "America/New_York (ET)",
  "America/Los_Angeles (PT)",
  "Australia/Sydney (AEST)",
];

export const CAREER_DEFAULTS = {
  currentRole: "Senior Frontend Engineer",
  experience: "7 years",
  expectedRole: "Senior / Staff Frontend Engineer",
  noticePeriod: "30 days",
  currentSalary: "₹21 LPA",
  expectedSalary: "₹28 – 35 LPA",
  preferredCompanies: ["Google", "Razorpay", "Atlassian", "Spotify"],
  preferredDomains: ["Fintech", "Developer Tools", "AI Products"],
  employmentType: "Full-time",
  visaSponsorship: false,
  openToRelocate: true,
  openToRemote: true,
};

export const EXPERIENCE_OPTIONS = ["3 years", "5 years", "7 years", "10+ years"];
export const NOTICE_OPTIONS = ["Immediate", "15 days", "30 days", "60 days", "90 days"];
export const EMPLOYMENT_TYPES = ["Full-time", "Contract", "Part-time", "Freelance"];
export const SALARY_OPTIONS = [
  "₹18 – 24 LPA",
  "₹24 – 28 LPA",
  "₹28 – 35 LPA",
  "₹35 – 45 LPA",
  "$120k – $150k",
  "$150k – $190k",
];

export type SkillPriority = "high" | "medium" | "low";

export interface Skill {
  id: string;
  name: string;
  priority: SkillPriority;
}

export const SKILLS_DEFAULT: Skill[] = [
  { id: "sk-react", name: "React", priority: "high" },
  { id: "sk-next", name: "Next.js", priority: "high" },
  { id: "sk-ts", name: "TypeScript", priority: "high" },
  { id: "sk-redux", name: "Redux", priority: "medium" },
  { id: "sk-node", name: "Node.js", priority: "medium" },
  { id: "sk-graphql", name: "GraphQL", priority: "medium" },
  { id: "sk-docker", name: "Docker", priority: "low" },
  { id: "sk-aws", name: "AWS", priority: "low" },
  { id: "sk-playwright", name: "Playwright", priority: "medium" },
  { id: "sk-jest", name: "Jest", priority: "low" },
];

export const PRIORITY_META: Record<
  SkillPriority,
  { label: string; badgeVariant: "default" | "info" | "draft" }
> = {
  high: { label: "High", badgeVariant: "default" },
  medium: { label: "Medium", badgeVariant: "info" },
  low: { label: "Low", badgeVariant: "draft" },
};

/* ------------------------------------------------------------------ */
/* Job preferences                                                     */
/* ------------------------------------------------------------------ */

export const JOB_PREFS_DEFAULTS = {
  locations: ["Bengaluru", "Remote — India", "Remote — EU"],
  workModes: { remote: true, hybrid: true, onsite: false },
  minSalary: "₹24 LPA",
  maxSalary: "₹45 LPA",
  companySize: { startup: true, enterprise: true, product: true, service: false },
  blacklisted: ["Consultify Corp", "BodyShop Services"],
  whitelisted: ["Google", "Razorpay", "Atlassian", "Netflix"],
  sources: {
    linkedin: true,
    wellfound: true,
    greenhouse: true,
    lever: true,
    ashby: true,
    workday: false,
    careers: true,
    referral: true,
  },
};

export const SOURCE_LABELS: { id: keyof typeof JOB_PREFS_DEFAULTS.sources; label: string }[] = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "wellfound", label: "Wellfound" },
  { id: "greenhouse", label: "Greenhouse" },
  { id: "lever", label: "Lever" },
  { id: "ashby", label: "Ashby" },
  { id: "workday", label: "Workday" },
  { id: "careers", label: "Company Careers" },
  { id: "referral", label: "Referral" },
];

/* ------------------------------------------------------------------ */
/* Automation & AI                                                     */
/* ------------------------------------------------------------------ */

export const AUTOMATION_DEFAULTS = {
  dailyLimit: "8",
  minMatch: "80%",
  workingHoursStart: "09:00",
  workingHoursEnd: "19:00",
  schedule: "Every morning at 09:00",
  resume: "Senior Frontend — 2026",
  autoTailor: true,
  autoCoverLetter: true,
  autoFollowUp: true,
  paused: false,
};

export const SCHEDULE_OPTIONS = [
  "Every morning at 09:00",
  "Twice daily (09:00, 16:00)",
  "Every 2 hours",
  "Weekdays only, 09:00",
];

export const RESUME_OPTIONS = [
  "Senior Frontend — 2026",
  "Frontend Engineer — General",
  "React Developer — Product",
  "Full Stack — Node + React",
];

export const HOURS = Array.from({ length: 15 }, (_, i) => `${String(i + 7).padStart(2, "0")}:00`);
export const LIMIT_OPTIONS = ["3", "5", "8", "12", "20"];
export const MATCH_OPTIONS = ["70%", "75%", "80%", "85%", "90%"];

export type Aggressiveness = "conservative" | "balanced" | "aggressive";

export const AGGRESSIVENESS_OPTIONS: {
  value: Aggressiveness;
  label: string;
  description: string;
}[] = [
  {
    value: "conservative",
    label: "Conservative",
    description: "Only near-perfect matches. Every action waits for your approval.",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Strong matches applied automatically; edge cases held for review.",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    description: "Casts the widest net — applies to every match above your threshold.",
  },
];

export const AI_DEFAULTS = {
  aggressiveness: "balanced" as Aggressiveness,
  explainDecisions: true,
  suggestResumeChanges: true,
  tailorEveryResume: false,
  generateCoverLetter: true,
  interviewCoaching: true,
  learningMode: true,
};

/* ------------------------------------------------------------------ */
/* Connected accounts, sessions, activity                              */
/* ------------------------------------------------------------------ */

export type AccountStatus = "connected" | "expired" | "disconnected";

export interface ConnectedAccount {
  id: string;
  name: string;
  detail: string;
  status: AccountStatus;
  lastSync: string;
}

export const ACCOUNTS_SEED: ConnectedAccount[] = [
  { id: "linkedin", name: "LinkedIn", detail: "Job scanning + Easy Apply", status: "connected", lastSync: "4 min ago" },
  { id: "wellfound", name: "Wellfound", detail: "Startup listings", status: "connected", lastSync: "12 min ago" },
  { id: "greenhouse", name: "Greenhouse", detail: "Board monitoring", status: "connected", lastSync: "9 min ago" },
  { id: "gcal", name: "Google Calendar", detail: "Interview scheduling", status: "connected", lastSync: "1 hour ago" },
  { id: "gdrive", name: "Google Drive", detail: "Resume + cover letter storage", status: "expired", lastSync: "3 days ago" },
  { id: "github", name: "GitHub", detail: "Portfolio signal for matching", status: "connected", lastSync: "2 hours ago" },
  { id: "email", name: "Email (Gmail)", detail: "Recruiter reply detection", status: "connected", lastSync: "6 min ago" },
];

export interface SessionInfo {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
  kind: "desktop" | "mobile";
}

export const SESSIONS_SEED: SessionInfo[] = [
  { id: "s1", device: "Windows 11", browser: "Chrome 132", location: "Bengaluru, IN", lastActive: "Now", current: true, kind: "desktop" },
  { id: "s2", device: "iPhone 15", browser: "Safari", location: "Bengaluru, IN", lastActive: "2 hours ago", current: false, kind: "mobile" },
  { id: "s3", device: "MacBook Pro", browser: "Arc", location: "Mumbai, IN", lastActive: "3 days ago", current: false, kind: "desktop" },
];

export interface SettingsActivity {
  id: string;
  text: string;
  when: string;
}

export const ACTIVITY_SEED: SettingsActivity[] = [
  { id: "sa1", text: "Daily application limit raised from 5 to 8.", when: "Yesterday, 16:20" },
  { id: "sa2", text: "AI aggressiveness changed to Balanced.", when: "2 days ago" },
  { id: "sa3", text: "Workday removed from preferred sources.", when: "3 days ago" },
  { id: "sa4", text: "'Senior Frontend — 2026' set as automation resume.", when: "6 days ago" },
  { id: "sa5", text: "Two-factor authentication enabled.", when: "2 weeks ago" },
];

/* ------------------------------------------------------------------ */
/* AI profile summary                                                  */
/* ------------------------------------------------------------------ */

export const AI_SUMMARY_INSIGHTS: string[] = [
  "Based on your profile, you're most competitive for **Senior React roles between ₹28–35 LPA** — your expected range is well calibrated.",
  "Raising **Docker and GraphQL** from low to medium priority could improve your average match score by **~8%**.",
  "Your automation applies fastest between **09:00–11:00** — recruiters in your list are most responsive in that window.",
];

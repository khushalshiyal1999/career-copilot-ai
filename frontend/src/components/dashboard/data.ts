/**
 * Mock data for the dashboard. Shapes mirror what the backend will
 * eventually return so swapping in real queries is a drop-in change.
 */

export interface CompanyBrand {
  name: string;
  /** Brand accent used for the monogram tile. */
  color: string;
}

export const COMPANIES = {
  google: { name: "Google", color: "#4285F4" },
  amazon: { name: "Amazon", color: "#FF9900" },
  spotify: { name: "Spotify", color: "#1DB954" },
  razorpay: { name: "Razorpay", color: "#3395FF" },
  atlassian: { name: "Atlassian", color: "#0052CC" },
  microsoft: { name: "Microsoft", color: "#00A4EF" },
  adobe: { name: "Adobe", color: "#FA0F00" },
  netflix: { name: "Netflix", color: "#E50914" },
} satisfies Record<string, CompanyBrand>;

export type ApplicationStatus =
  | "applied"
  | "in-review"
  | "interview"
  | "offer"
  | "rejected";

export interface Application {
  id: string;
  company: CompanyBrand;
  role: string;
  status: ApplicationStatus;
  appliedAt: string;
  match: number;
}

export const RECENT_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    company: COMPANIES.google,
    role: "Senior Frontend Engineer",
    status: "interview",
    appliedAt: "2026-07-30",
    match: 94,
  },
  {
    id: "app-2",
    company: COMPANIES.spotify,
    role: "React Engineer, Web Player",
    status: "in-review",
    appliedAt: "2026-07-29",
    match: 91,
  },
  {
    id: "app-3",
    company: COMPANIES.razorpay,
    role: "Frontend Engineer II",
    status: "applied",
    appliedAt: "2026-07-28",
    match: 89,
  },
  {
    id: "app-4",
    company: COMPANIES.microsoft,
    role: "Software Engineer, Teams",
    status: "offer",
    appliedAt: "2026-07-24",
    match: 92,
  },
  {
    id: "app-5",
    company: COMPANIES.adobe,
    role: "UI Engineer, Creative Cloud",
    status: "rejected",
    appliedAt: "2026-07-21",
    match: 78,
  },
];

export interface JobMatch {
  id: string;
  company: CompanyBrand;
  role: string;
  salaryMin: number;
  salaryMax: number;
  remote: boolean;
  location: string;
  match: number;
  postedAgo: string;
  skills: string[];
  /** One-line AI explanation of why this role was picked. */
  reason: string;
}

export const JOB_MATCHES: JobMatch[] = [
  {
    id: "job-1",
    company: COMPANIES.netflix,
    role: "Senior UI Engineer",
    salaryMin: 165000,
    salaryMax: 210000,
    remote: true,
    location: "Remote, US",
    match: 96,
    postedAgo: "2h ago",
    skills: ["React", "TypeScript", "Design Systems"],
    reason: "Your design-system work maps directly to their player UI team.",
  },
  {
    id: "job-2",
    company: COMPANIES.atlassian,
    role: "Fullstack Engineer, Jira",
    salaryMin: 140000,
    salaryMax: 185000,
    remote: true,
    location: "Remote, anywhere",
    match: 93,
    postedAgo: "4h ago",
    skills: ["React", "Node.js", "GraphQL"],
    reason: "Matches the component-library experience from your last role.",
  },
  {
    id: "job-3",
    company: COMPANIES.amazon,
    role: "Frontend Engineer II",
    salaryMin: 150000,
    salaryMax: 195000,
    remote: false,
    location: "Seattle, WA",
    match: 90,
    postedAgo: "6h ago",
    skills: ["React", "Performance", "AWS"],
    reason: "Your checkout performance work is exactly what this team owns.",
  },
  {
    id: "job-4",
    company: COMPANIES.spotify,
    role: "Web Engineer, Growth",
    salaryMin: 130000,
    salaryMax: 170000,
    remote: true,
    location: "Remote, EU/US",
    match: 88,
    postedAgo: "8h ago",
    skills: ["Next.js", "A/B Testing", "Analytics"],
    reason: "Growth stack mirrors your last two shipped projects.",
  },
  {
    id: "job-5",
    company: COMPANIES.google,
    role: "Frontend Engineer, Gemini",
    salaryMin: 160000,
    salaryMax: 205000,
    remote: false,
    location: "Mountain View, CA",
    match: 87,
    postedAgo: "1d ago",
    skills: ["React", "TypeScript", "AI/UX"],
    reason: "The Gemini web app uses the exact stack on your resume.",
  },
];

export interface TimelineEvent {
  id: string;
  icon: "interview" | "applied" | "automation" | "resume";
  title: string;
  detail: string;
  when: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    id: "evt-1",
    icon: "interview",
    title: "Interview invite from Google",
    detail: "Senior Frontend Engineer — round 2 scheduled",
    when: "1h ago",
  },
  {
    id: "evt-2",
    icon: "applied",
    title: "Applied to Spotify",
    detail: "React Engineer, Web Player — auto-tailored resume",
    when: "3h ago",
  },
  {
    id: "evt-3",
    icon: "automation",
    title: "Automation scan completed",
    detail: "128 jobs scanned, 37 new matches found",
    when: "5h ago",
  },
  {
    id: "evt-4",
    icon: "resume",
    title: "Resume updated",
    detail: "khushal_frontend_2026.pdf — score improved to 82",
    when: "Yesterday",
  },
];

export const RESUME_HEALTH = {
  score: 82,
  ats: 91,
  missingSkills: ["GraphQL", "AWS", "System Design"],
  suggestions: [
    {
      text: "Quantify impact in your Razorpay role — add metrics to 2 bullets.",
      impact: "+6 pts",
    },
    {
      text: "Add a short summary targeting senior frontend roles.",
      impact: "+4 pts",
    },
  ],
};

export const AUTOMATION = {
  status: "running" as const,
  nextScan: "Today, 3:00 PM",
  jobsScanned: 128,
  sources: 4,
  scansDoneToday: 2,
  scansPerDay: 3,
};

/** Conversational AI suggestions. `**bold**` segments are highlighted. */
export const INSIGHTS = [
  {
    id: "ins-1",
    text: "Applying within **24 hours** of posting lifts your interview odds by **38%**. I can prioritize fresh listings for you.",
    action: "Prioritize fresh roles",
  },
  {
    id: "ins-2",
    text: "Your **TypeScript-heavy** applications get **12% more replies**. Want me to boost those matches this week?",
    action: "Boost TypeScript roles",
  },
];

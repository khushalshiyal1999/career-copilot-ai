/**
 * Mock data for the Analytics module. Numbers are kept consistent with the
 * rest of the app (128 applications, 7 offers, the Microsoft offer, the
 * Razorpay sprint) so the whole product tells one story.
 */

export interface Kpi {
  id: string;
  label: string;
  value: number;
  /** Display suffix, e.g. "%". */
  suffix?: string;
  /** Change vs last month (same unit as value). */
  delta: number;
  deltaLabel: string;
}

export const KPIS: Kpi[] = [
  { id: "apps", label: "Applications", value: 128, delta: 24, deltaLabel: "+24 vs last month" },
  { id: "interviews", label: "Interviews", value: 23, delta: 6, deltaLabel: "+6 vs last month" },
  { id: "offers", label: "Offers", value: 7, delta: 3, deltaLabel: "+3 vs last month" },
  { id: "response", label: "Response Rate", value: 52, suffix: "%", delta: 8, deltaLabel: "+8 pts vs last month" },
  { id: "interview-rate", label: "Interview Rate", value: 18, suffix: "%", delta: 3, deltaLabel: "+3 pts vs last month" },
  { id: "match", label: "Average AI Match", value: 87, suffix: "%", delta: 2, deltaLabel: "+2 pts vs last month" },
  { id: "resume", label: "Resume Score", value: 91, delta: 7, deltaLabel: "+7 pts since v2" },
  { id: "automation", label: "Automation Success", value: 96, suffix: "%", delta: 1, deltaLabel: "+1 pt vs last month" },
];

/* ------------------------------------------------------------------ */
/* Career score                                                        */
/* ------------------------------------------------------------------ */

export const CAREER_SCORE = {
  overall: 91,
  breakdown: [
    { label: "Resume", value: 91 },
    { label: "Skills", value: 84 },
    { label: "Applications", value: 88 },
    { label: "Interview Performance", value: 78 },
    { label: "Automation", value: 96 },
    { label: "Networking", value: 62 },
  ],
};

/* ------------------------------------------------------------------ */
/* Funnel                                                              */
/* ------------------------------------------------------------------ */

export interface FunnelStage {
  label: string;
  count: number;
}

export const FUNNEL: FunnelStage[] = [
  { label: "Applied", count: 128 },
  { label: "Viewed", count: 96 },
  { label: "HR", count: 41 },
  { label: "Technical", count: 23 },
  { label: "Manager", count: 12 },
  { label: "Offer", count: 7 },
  { label: "Accepted", count: 1 },
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export type RangeKey = "7d" | "30d" | "90d" | "1y";

export interface TrendPoint {
  label: string;
  value: number;
}

export const TIMELINE: Record<RangeKey, { label: string; points: TrendPoint[] }> = {
  "7d": {
    label: "Last 7 days",
    points: [
      { label: "Mon", value: 5 },
      { label: "Tue", value: 8 },
      { label: "Wed", value: 6 },
      { label: "Thu", value: 4 },
      { label: "Fri", value: 7 },
      { label: "Sat", value: 2 },
      { label: "Sun", value: 1 },
    ],
  },
  "30d": {
    label: "Last 30 days",
    points: [
      { label: "W1", value: 9 },
      { label: "", value: 12 },
      { label: "W2", value: 8 },
      { label: "", value: 14 },
      { label: "W3", value: 11 },
      { label: "", value: 16 },
      { label: "W4", value: 13 },
      { label: "", value: 18 },
    ],
  },
  "90d": {
    label: "Last 90 days",
    points: [
      { label: "May", value: 6 },
      { label: "", value: 9 },
      { label: "", value: 11 },
      { label: "Jun", value: 8 },
      { label: "", value: 13 },
      { label: "", value: 10 },
      { label: "Jul", value: 15 },
      { label: "", value: 12 },
      { label: "", value: 17 },
      { label: "Aug", value: 14 },
    ],
  },
  "1y": {
    label: "Last 12 months",
    points: [
      { label: "Sep", value: 0 },
      { label: "Oct", value: 0 },
      { label: "Nov", value: 2 },
      { label: "Dec", value: 3 },
      { label: "Jan", value: 5 },
      { label: "Feb", value: 8 },
      { label: "Mar", value: 12 },
      { label: "Apr", value: 15 },
      { label: "May", value: 26 },
      { label: "Jun", value: 31 },
      { label: "Jul", value: 46 },
      { label: "Aug", value: 14 },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Resume performance                                                  */
/* ------------------------------------------------------------------ */

export interface ResumeVersionStats {
  version: string;
  interviewRate: number;
  offerRate: number;
  atsScore: number;
  responseRate: number;
  avgMatch: number;
  best: boolean;
}

export const RESUME_PERFORMANCE: ResumeVersionStats[] = [
  { version: "Version 1", interviewRate: 9, offerRate: 1, atsScore: 74, responseRate: 34, avgMatch: 79, best: false },
  { version: "Version 2", interviewRate: 14, offerRate: 3, atsScore: 83, responseRate: 44, avgMatch: 84, best: false },
  { version: "Version 3", interviewRate: 22, offerRate: 6, atsScore: 91, responseRate: 57, avgMatch: 89, best: true },
];

/* ------------------------------------------------------------------ */
/* Job sources                                                         */
/* ------------------------------------------------------------------ */

export interface SourceStats {
  name: string;
  applications: number;
  interviews: number;
  offers: number;
  success: number;
}

export const SOURCE_STATS: SourceStats[] = [
  { name: "LinkedIn", applications: 54, interviews: 11, offers: 2, success: 48 },
  { name: "Greenhouse", applications: 22, interviews: 5, offers: 2, success: 58 },
  { name: "Wellfound", applications: 18, interviews: 4, offers: 1, success: 61 },
  { name: "Lever", applications: 12, interviews: 2, offers: 0, success: 41 },
  { name: "Company Careers", applications: 9, interviews: 2, offers: 1, success: 52 },
  { name: "Referral", applications: 7, interviews: 4, offers: 1, success: 86 },
  { name: "Ashby", applications: 6, interviews: 1, offers: 0, success: 38 },
];

/* ------------------------------------------------------------------ */
/* Company analytics                                                   */
/* ------------------------------------------------------------------ */

export interface CompanyStat {
  companyId: string;
  name: string;
  value: string;
}

export const COMPANY_ANALYTICS: { title: string; rows: CompanyStat[] }[] = [
  {
    title: "Top responsive",
    rows: [
      { companyId: "razorpay", name: "Razorpay", value: "88% reply" },
      { companyId: "spotify", name: "Spotify", value: "81% reply" },
      { companyId: "google", name: "Google", value: "78% reply" },
    ],
  },
  {
    title: "Highest paying",
    rows: [
      { companyId: "netflix", name: "Netflix", value: "$230k avg" },
      { companyId: "meta", name: "Meta", value: "$195k avg" },
      { companyId: "google", name: "Google", value: "$185k avg" },
    ],
  },
  {
    title: "Fastest hiring",
    rows: [
      { companyId: "razorpay", name: "Razorpay", value: "12 days" },
      { companyId: "swiggy", name: "Swiggy", value: "16 days" },
      { companyId: "vercel", name: "Vercel", value: "19 days" },
    ],
  },
  {
    title: "Most applied",
    rows: [
      { companyId: "google", name: "Google", value: "6 apps" },
      { companyId: "microsoft", name: "Microsoft", value: "5 apps" },
      { companyId: "amazon", name: "Amazon", value: "4 apps" },
    ],
  },
  {
    title: "Active processes",
    rows: [
      { companyId: "google", name: "Google", value: "Technical R2" },
      { companyId: "razorpay", name: "Razorpay", value: "HR round" },
      { companyId: "microsoft", name: "Microsoft", value: "Offer" },
      { companyId: "spotify", name: "Spotify", value: "Panel" },
      { companyId: "netflix", name: "Netflix", value: "Screening" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Skills analytics                                                    */
/* ------------------------------------------------------------------ */

export interface SkillDemand {
  name: string;
  /** % of your target-role listings mentioning it. */
  demand: number;
  have: boolean;
  trending: boolean;
}

export const SKILL_DEMAND: SkillDemand[] = [
  { name: "React", demand: 92, have: true, trending: false },
  { name: "TypeScript", demand: 88, have: true, trending: true },
  { name: "Next.js", demand: 71, have: true, trending: true },
  { name: "Node.js", demand: 64, have: true, trending: false },
  { name: "GraphQL", demand: 58, have: false, trending: false },
  { name: "AWS", demand: 51, have: true, trending: false },
  { name: "Docker", demand: 47, have: true, trending: false },
  { name: "Playwright", demand: 33, have: true, trending: true },
];

/* ------------------------------------------------------------------ */
/* Salary analytics                                                    */
/* ------------------------------------------------------------------ */

export const SALARY_ANALYTICS = {
  expected: "₹28 – 35 LPA",
  averageOffer: "₹31 LPA",
  highestOffer: "$167k (Microsoft)",
  marketAverage: "₹29 LPA",
  growth: "+48% vs current",
  /** Desired vs received, normalized 0–100 for the comparison bars. */
  desiredPct: 100,
  receivedPct: 92,
};

/* ------------------------------------------------------------------ */
/* Automation analytics                                                */
/* ------------------------------------------------------------------ */

export const AUTOMATION_ANALYTICS: { label: string; value: number }[] = [
  { label: "Jobs Scanned", value: 3341 },
  { label: "Jobs Qualified", value: 412 },
  { label: "Applications Submitted", value: 96 },
  { label: "Applications Skipped", value: 316 },
  { label: "Resume Optimizations", value: 61 },
  { label: "Cover Letters Generated", value: 57 },
];

/* ------------------------------------------------------------------ */
/* AI insights, weekly report, goals                                   */
/* ------------------------------------------------------------------ */

export const AI_INSIGHTS: string[] = [
  "Resume **version 3 performs 19% better** than version 2 — it's already your automation default.",
  "Your highest response rate comes from **SaaS companies (64%)** — twice your big-tech rate.",
  "**Tuesday morning** applications perform best: 31% response vs your 22% average.",
  "Adding **GraphQL** would raise your average AI Match by **~7%** — it appears in 58% of your target listings.",
];

export const WEEKLY_REPORT = {
  period: "Jul 28 – Aug 3",
  stats: [
    { label: "Applications", value: "24" },
    { label: "Interviews", value: "6" },
    { label: "Offers", value: "1" },
    { label: "Average Match", value: "91%" },
  ],
  bestCompany: "Google",
  weakestArea: "GraphQL coverage",
  recommendation:
    "Prioritize remote SaaS companies this week — your response rate there is double your average, and 9 qualified roles are live.",
};

export interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
}

export const GOALS_SEED: Goal[] = [
  { id: "g1", label: "Applications this month", target: 20, current: 14 },
  { id: "g2", label: "Interviews this month", target: 5, current: 4 },
  { id: "g3", label: "ATS score", target: 95, current: 91 },
  { id: "g4", label: "AI-tailored resumes", target: 10, current: 7 },
];

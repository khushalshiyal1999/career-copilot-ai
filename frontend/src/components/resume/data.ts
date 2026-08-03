/**
 * Mock data for the Resume Manager. Shapes mirror the future backend
 * contract so swapping in real queries is a drop-in change.
 *
 * One persona ("Aarav Sharma") owns every resume so the content reads as a
 * real person iterating on their story, not lorem ipsum.
 */

import { JOB_COMPANIES, type JobCompany } from "@/components/jobs/data";
import { formatDate } from "@/utils/format";

export type FileType = "PDF" | "DOCX";
export type ResumeStatus = "optimized" | "draft" | "needs-work";
export type Impact = "High" | "Medium" | "Low";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface AtsBreakdown {
  formatting: number;
  keywords: number;
  structure: number;
  readability: number;
}

export interface ResumeVersion {
  version: number;
  createdDaysAgo: number;
  atsScore: number;
  breakdown: AtsBreakdown;
  /** One-line AI note about what this version changed. */
  note: string;
  changes: {
    added: string[];
    removed: string[];
    changed: string[];
  };
}

export interface AnalysisFinding {
  id: string;
  text: string;
  impact: Impact;
  scoreDelta: number;
  difficulty: Difficulty;
}

export interface Suggestion {
  id: string;
  title: string;
  detail: string;
  scoreDelta: number;
  difficulty: Difficulty;
  applied: boolean;
}

export interface SkillsAnalysis {
  matched: string[];
  missing: string[];
  trending: string[];
  suggested: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  stack: string[];
}

export interface CertificateEntry {
  name: string;
  issuer: string;
  year: string;
}

export interface Resume {
  id: string;
  name: string;
  targetRole: string;
  fileType: FileType;
  status: ResumeStatus;
  isActive: boolean;
  template: string;
  versions: ResumeVersion[];
  summary: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certificates: CertificateEntry[];
  findings: AnalysisFinding[];
  suggestions: Suggestion[];
  skillsAnalysis: SkillsAnalysis;
}

export interface CoverLetter {
  id: string;
  company: JobCompany;
  role: string;
  resumeName: string;
  createdDaysAgo: number;
}

export type ActivityKind =
  | "uploaded"
  | "optimized"
  | "tailored"
  | "cover"
  | "exported"
  | "analyzed"
  | "created";

export interface ActivityEntry {
  id: string;
  kind: ActivityKind;
  text: string;
  daysAgo: number;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  /** Accent used in the mini template thumbnail. */
  accent: string;
}

/** The persona whose resumes these are. */
export const RESUME_OWNER = {
  name: "Aarav Sharma",
  title: "Frontend Engineer",
  location: "Bengaluru, India",
  email: "aarav.sharma@email.com",
};

export const STATUS_META: Record<
  ResumeStatus,
  { label: string; badgeVariant: "success" | "draft" | "warning" }
> = {
  optimized: { label: "Optimized", badgeVariant: "success" },
  draft: { label: "Draft", badgeVariant: "draft" },
  "needs-work": { label: "Needs work", badgeVariant: "warning" },
};

export const TEMPLATES: ResumeTemplate[] = [
  { id: "professional", name: "Professional", description: "Classic single-column, ATS-safe", accent: "#3B5BDB" },
  { id: "minimal", name: "Minimal", description: "Whitespace-first, quiet headers", accent: "#495057" },
  { id: "modern", name: "Modern", description: "Two-column with accent sidebar", accent: "#7048E8" },
  { id: "technical", name: "Technical", description: "Skills-forward, dense sections", accent: "#0CA678" },
  { id: "executive", name: "Executive", description: "Serif headings, formal tone", accent: "#A61E4D" },
  { id: "creative", name: "Creative", description: "Bold color blocks, portfolio-led", accent: "#E8590C" },
];

export function atsTier(score: number): {
  label: string;
  textClass: string;
  strokeClass: string;
  fillClass: string;
} {
  if (score >= 85)
    return { label: "ATS Compatible", textClass: "text-success", strokeClass: "stroke-success", fillClass: "bg-success" };
  if (score >= 70)
    return { label: "Almost there", textClass: "text-warning", strokeClass: "stroke-warning", fillClass: "bg-warning" };
  return { label: "Needs work", textClass: "text-destructive", strokeClass: "stroke-destructive", fillClass: "bg-destructive" };
}

export function updatedLabel(daysAgo: number): string {
  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo}d ago`;
  return formatDate(new Date(Date.now() - daysAgo * 86_400_000), {
    month: "short",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/* Resumes                                                             */
/* ------------------------------------------------------------------ */

const SHARED_EDUCATION: EducationEntry[] = [
  {
    degree: "B.E. Computer Science",
    school: "BMS College of Engineering, Bengaluru",
    period: "2014 – 2018",
  },
];

const SHARED_CERTIFICATES: CertificateEntry[] = [
  { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2025" },
  { name: "Meta Front-End Developer Certificate", issuer: "Meta / Coursera", year: "2023" },
];

export const RESUMES_SEED: Resume[] = [
  {
    id: "resume-senior-fe",
    name: "Senior Frontend — 2026",
    targetRole: "Senior Frontend Engineer",
    fileType: "PDF",
    status: "optimized",
    isActive: true,
    template: "professional",
    versions: [
      {
        version: 1,
        createdDaysAgo: 47,
        atsScore: 74,
        breakdown: { formatting: 82, keywords: 61, structure: 78, readability: 75 },
        note: "First draft — imported from the 2025 resume.",
        changes: {
          added: ["Base experience and education sections"],
          removed: [],
          changed: [],
        },
      },
      {
        version: 2,
        createdDaysAgo: 24,
        atsScore: 83,
        breakdown: { formatting: 88, keywords: 74, structure: 84, readability: 82 },
        note: "Added metrics to every experience bullet.",
        changes: {
          added: [
            "Checkout performance win: LCP 4.1s → 1.8s",
            "Micro-frontend migration scope (9 teams)",
            "Playwright test coverage bullet",
          ],
          removed: ["Objective statement (outdated format)", "References line"],
          changed: ["Summary rewritten around AI-product work"],
        },
      },
      {
        version: 3,
        createdDaysAgo: 6,
        atsScore: 91,
        breakdown: { formatting: 94, keywords: 87, structure: 92, readability: 90 },
        note: "Keyword pass for senior React roles — biggest single gain.",
        changes: {
          added: [
            "Next.js App Router and RSC keywords",
            "Design-system leadership bullet",
            "AWS + Docker in skills section",
          ],
          removed: ["jQuery from skills (dated signal)"],
          changed: [
            "Skills reordered to match senior frontend job descriptions",
            "Title standardized to 'Senior Frontend Engineer'",
          ],
        },
      },
    ],
    summary:
      "Senior Frontend Engineer with 7+ years building performance-critical React applications in fintech and e-commerce. Led a micro-frontend migration across 9 teams and cut checkout LCP from 4.1s to 1.8s. Deep in React, TypeScript, and design systems; currently shipping AI-assisted product surfaces.",
    skills: [
      "React", "TypeScript", "Next.js", "Redux", "GraphQL",
      "Design Systems", "Web Performance", "Playwright", "Jest", "AWS", "Docker",
    ],
    experience: [
      {
        role: "Senior Frontend Engineer",
        company: "FinEdge Payments",
        period: "2023 – Present",
        bullets: [
          "Led the micro-frontend migration of the merchant dashboard used by 2M+ businesses across 9 product teams.",
          "Cut checkout LCP from 4.1s to 1.8s, lifting conversion by 3.2% — the largest frontend-driven revenue win of FY25.",
          "Own the Ledger design system: 68 components, 94% adoption, weekly release train.",
        ],
      },
      {
        role: "Frontend Engineer",
        company: "Brightcart",
        period: "2020 – 2023",
        bullets: [
          "Built the seller analytics suite in React + Redux, serving 400K daily sessions.",
          "Ran 30+ A/B experiments with the growth pod; 11 shipped to 100% of traffic.",
          "Introduced Playwright end-to-end suites, cutting release regressions by 60%.",
        ],
      },
      {
        role: "UI Developer",
        company: "PixelWorks Studio",
        period: "2018 – 2020",
        bullets: [
          "Delivered 14 client marketing sites and two React SPAs with a 3-person team.",
          "Standardized the studio's component starter kit, halving project setup time.",
        ],
      },
    ],
    education: SHARED_EDUCATION,
    projects: [
      {
        name: "PerfKit",
        description: "Open-source Core Web Vitals dashboard — 1.9K GitHub stars.",
        stack: ["Next.js", "TypeScript", "Web Vitals API"],
      },
      {
        name: "OpenBoard",
        description: "Realtime kanban with offline sync and CRDT merging.",
        stack: ["React", "IndexedDB", "WebSockets"],
      },
    ],
    certificates: SHARED_CERTIFICATES,
    findings: [
      {
        id: "f-graphql",
        text: "GraphQL appears once — senior listings mention it an average of 3 times. Add it to a Brightcart bullet.",
        impact: "High",
        scoreDelta: 4,
        difficulty: "Easy",
      },
      {
        id: "f-leadership",
        text: "Mentorship is implied but never stated. Senior roles screen for it explicitly.",
        impact: "Medium",
        scoreDelta: 3,
        difficulty: "Medium",
      },
      {
        id: "f-summary",
        text: "Summary is strong but 12 words over the ATS-friendly length. Tighten the last sentence.",
        impact: "Low",
        scoreDelta: 1,
        difficulty: "Easy",
      },
    ],
    suggestions: [
      {
        id: "s-system-design",
        title: "Mention System Design",
        detail: "Add the payment-routing architecture you designed at FinEdge — interviewers keep asking about it.",
        scoreDelta: 4,
        difficulty: "Medium",
        applied: false,
      },
      {
        id: "s-mentoring",
        title: "Add mentoring bullet",
        detail: "\"Mentored 4 engineers to promotion\" — one line, big senior-signal.",
        scoreDelta: 3,
        difficulty: "Easy",
        applied: false,
      },
      {
        id: "s-graphql",
        title: "Strengthen GraphQL",
        detail: "Name the federated GraphQL layer in the Brightcart analytics bullet.",
        scoreDelta: 4,
        difficulty: "Easy",
        applied: false,
      },
    ],
    skillsAnalysis: {
      matched: ["React", "TypeScript", "Next.js", "Redux", "Jest", "Playwright"],
      missing: ["GraphQL", "Node.js"],
      trending: ["Next.js", "TypeScript", "Playwright"],
      suggested: ["Docker", "AWS"],
    },
  },
  {
    id: "resume-frontend-general",
    name: "Frontend Engineer — General",
    targetRole: "Frontend Engineer",
    fileType: "PDF",
    status: "optimized",
    isActive: false,
    template: "minimal",
    versions: [
      {
        version: 1,
        createdDaysAgo: 39,
        atsScore: 76,
        breakdown: { formatting: 84, keywords: 66, structure: 80, readability: 78 },
        note: "Trimmed the senior resume down to a broad mid-level pitch.",
        changes: {
          added: ["Broader skills section for generalist roles"],
          removed: ["Design-system leadership details"],
          changed: ["Summary re-pitched for mid-to-senior range"],
        },
      },
      {
        version: 2,
        createdDaysAgo: 11,
        atsScore: 84,
        breakdown: { formatting: 90, keywords: 78, structure: 86, readability: 84 },
        note: "Keyword alignment with 20 live frontend listings.",
        changes: {
          added: ["Accessibility (WCAG 2.2) bullet", "Vite + testing tooling keywords"],
          removed: ["Two dated 2018-era client projects"],
          changed: ["Experience bullets shortened to one line each"],
        },
      },
    ],
    summary:
      "Frontend Engineer with 7 years of React and TypeScript across fintech and e-commerce. Comfortable owning features end to end — from design-system components to performance budgets and A/B experiments.",
    skills: [
      "React", "TypeScript", "JavaScript", "Redux", "CSS/Tailwind",
      "Accessibility", "Vite", "Jest", "Playwright",
    ],
    experience: [
      {
        role: "Senior Frontend Engineer",
        company: "FinEdge Payments",
        period: "2023 – Present",
        bullets: [
          "Ship merchant dashboard features to 2M+ businesses on a weekly release train.",
          "Cut checkout LCP by 56% through code-splitting and image strategy.",
        ],
      },
      {
        role: "Frontend Engineer",
        company: "Brightcart",
        period: "2020 – 2023",
        bullets: [
          "Built seller analytics in React + Redux; 400K daily sessions.",
          "Brought the app to WCAG 2.2 AA and added Playwright coverage.",
        ],
      },
      {
        role: "UI Developer",
        company: "PixelWorks Studio",
        period: "2018 – 2020",
        bullets: ["Delivered 14 marketing sites and two React SPAs."],
      },
    ],
    education: SHARED_EDUCATION,
    projects: [
      {
        name: "PerfKit",
        description: "Open-source Core Web Vitals dashboard.",
        stack: ["Next.js", "TypeScript"],
      },
    ],
    certificates: SHARED_CERTIFICATES,
    findings: [
      {
        id: "f-metrics",
        text: "Add measurable achievements — only 4 of 7 bullets carry a number.",
        impact: "High",
        scoreDelta: 5,
        difficulty: "Medium",
      },
      {
        id: "f-nextjs",
        text: "Next.js is missing from skills even though PerfKit uses it. Free keyword.",
        impact: "Medium",
        scoreDelta: 3,
        difficulty: "Easy",
      },
    ],
    suggestions: [
      {
        id: "s-nextjs",
        title: "Add Next.js to skills",
        detail: "You already use it in PerfKit — surfacing it matches 40% more listings.",
        scoreDelta: 3,
        difficulty: "Easy",
        applied: false,
      },
      {
        id: "s-numbers",
        title: "Quantify 3 bullets",
        detail: "Attach numbers to the Brightcart and PixelWorks bullets that lack them.",
        scoreDelta: 5,
        difficulty: "Medium",
        applied: false,
      },
    ],
    skillsAnalysis: {
      matched: ["React", "TypeScript", "Redux", "Jest", "Playwright"],
      missing: ["Next.js", "GraphQL"],
      trending: ["Next.js", "TypeScript"],
      suggested: ["Node.js", "Docker"],
    },
  },
  {
    id: "resume-react-dev",
    name: "React Developer — Product",
    targetRole: "React Developer",
    fileType: "PDF",
    status: "needs-work",
    isActive: false,
    template: "modern",
    versions: [
      {
        version: 1,
        createdDaysAgo: 21,
        atsScore: 71,
        breakdown: { formatting: 79, keywords: 62, structure: 74, readability: 76 },
        note: "Spun off for product-company React roles.",
        changes: {
          added: ["Product-impact framing on top bullets"],
          removed: ["Agency work details"],
          changed: ["Summary aimed at product teams"],
        },
      },
      {
        version: 2,
        createdDaysAgo: 9,
        atsScore: 78,
        breakdown: { formatting: 85, keywords: 70, structure: 80, readability: 79 },
        note: "Added experiment and analytics keywords.",
        changes: {
          added: ["A/B testing and product analytics keywords", "Hook-based architecture bullet"],
          removed: [],
          changed: ["Projects section moved above education"],
        },
      },
    ],
    summary:
      "React Developer who ships product, not just components. 7 years across dashboards, checkout flows, and experiment-heavy growth surfaces — fluent in the hooks era, state machines, and shipping behind feature flags.",
    skills: [
      "React", "JavaScript", "TypeScript", "React Query", "Zustand",
      "A/B Testing", "Product Analytics", "Storybook",
    ],
    experience: [
      {
        role: "Senior Frontend Engineer",
        company: "FinEdge Payments",
        period: "2023 – Present",
        bullets: [
          "Own high-traffic merchant surfaces; every release gated by experiment metrics.",
          "Rebuilt onboarding as a state machine, lifting completion 14%.",
        ],
      },
      {
        role: "Frontend Engineer",
        company: "Brightcart",
        period: "2020 – 2023",
        bullets: [
          "Ran 30+ experiments with product and data science.",
          "Built the design-token pipeline used across 3 apps.",
        ],
      },
    ],
    education: SHARED_EDUCATION,
    projects: [
      {
        name: "OpenBoard",
        description: "Realtime kanban with offline sync.",
        stack: ["React", "CRDTs"],
      },
    ],
    certificates: [SHARED_CERTIFICATES[1]],
    findings: [
      {
        id: "f-react-section",
        text: "Improve the React section — 'hooks era' is vague; name concurrent features you've shipped with.",
        impact: "High",
        scoreDelta: 5,
        difficulty: "Medium",
      },
      {
        id: "f-testing",
        text: "No testing tools listed. React roles screen for Jest or Testing Library almost universally.",
        impact: "High",
        scoreDelta: 4,
        difficulty: "Easy",
      },
      {
        id: "f-length",
        text: "Resume runs short at one page with whitespace — room for one more project.",
        impact: "Low",
        scoreDelta: 2,
        difficulty: "Easy",
      },
    ],
    suggestions: [
      {
        id: "s-testing",
        title: "Add Jest + Testing Library",
        detail: "You use both daily — listing them clears the most common React screen.",
        scoreDelta: 4,
        difficulty: "Easy",
        applied: false,
      },
      {
        id: "s-suspense",
        title: "Name concurrent React work",
        detail: "Mention Suspense-based data loading in the FinEdge onboarding bullet.",
        scoreDelta: 5,
        difficulty: "Medium",
        applied: false,
      },
      {
        id: "s-ts-project",
        title: "Add TypeScript project",
        detail: "Port the OpenBoard listing to highlight its TypeScript migration.",
        scoreDelta: 6,
        difficulty: "Medium",
        applied: false,
      },
    ],
    skillsAnalysis: {
      matched: ["React", "TypeScript", "Storybook"],
      missing: ["Jest", "Redux", "Next.js"],
      trending: ["React Query", "TypeScript"],
      suggested: ["Playwright", "GraphQL"],
    },
  },
  {
    id: "resume-fullstack",
    name: "Full Stack — Node + React",
    targetRole: "Full Stack Engineer",
    fileType: "DOCX",
    status: "draft",
    isActive: false,
    template: "technical",
    versions: [
      {
        version: 1,
        createdDaysAgo: 4,
        atsScore: 68,
        breakdown: { formatting: 74, keywords: 60, structure: 71, readability: 70 },
        note: "New draft — backend story still thin.",
        changes: {
          added: ["Node.js API work from FinEdge internal tools", "Docker/CI section"],
          removed: [],
          changed: ["Summary reframed as full-stack"],
        },
      },
    ],
    summary:
      "Product-minded engineer moving full stack: 7 years of React on the front, two years of Node.js services and internal APIs behind it. Strong on API design taste from the consumer side; building depth in databases and infra.",
    skills: [
      "React", "TypeScript", "Node.js", "Express", "PostgreSQL",
      "Docker", "REST APIs", "GitHub Actions",
    ],
    experience: [
      {
        role: "Senior Frontend Engineer (+ internal tools)",
        company: "FinEdge Payments",
        period: "2023 – Present",
        bullets: [
          "Built 3 internal Node.js services powering merchant-support tooling.",
          "Designed the REST contract for the refunds dashboard used by 200 agents.",
        ],
      },
      {
        role: "Frontend Engineer",
        company: "Brightcart",
        period: "2020 – 2023",
        bullets: ["Owned the BFF layer for seller analytics (Node + Express)."],
      },
    ],
    education: SHARED_EDUCATION,
    projects: [
      {
        name: "ShipLog",
        description: "Self-hosted deployment tracker — Node API + React front.",
        stack: ["Node.js", "PostgreSQL", "React"],
      },
    ],
    certificates: [SHARED_CERTIFICATES[0]],
    findings: [
      {
        id: "f-backend-depth",
        text: "Backend bullets describe tools, not outcomes. Add scale or latency numbers to the Node services.",
        impact: "High",
        scoreDelta: 6,
        difficulty: "Medium",
      },
      {
        id: "f-db",
        text: "Database experience reads thin — one PostgreSQL schema-design line would help.",
        impact: "Medium",
        scoreDelta: 4,
        difficulty: "Medium",
      },
      {
        id: "f-docx",
        text: "DOCX parses less reliably than PDF in 3 of the big 6 ATS vendors. Export as PDF.",
        impact: "Medium",
        scoreDelta: 3,
        difficulty: "Easy",
      },
    ],
    suggestions: [
      {
        id: "s-rewrite-summary",
        title: "Rewrite Summary",
        detail: "Lead with the Node services, not the frontend years — this resume buries its own pitch.",
        scoreDelta: 8,
        difficulty: "Medium",
        applied: false,
      },
      {
        id: "s-export-pdf",
        title: "Convert to PDF",
        detail: "One click, and the parse-failure risk disappears.",
        scoreDelta: 3,
        difficulty: "Easy",
        applied: false,
      },
      {
        id: "s-graphql-node",
        title: "Add GraphQL exposure",
        detail: "The Brightcart BFF spoke GraphQL — say so.",
        scoreDelta: 4,
        difficulty: "Easy",
        applied: false,
      },
    ],
    skillsAnalysis: {
      matched: ["React", "TypeScript", "Node.js", "Docker"],
      missing: ["GraphQL", "AWS", "Redux"],
      trending: ["Node.js", "Docker", "AWS"],
      suggested: ["Next.js", "Playwright"],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Cover letters & activity                                            */
/* ------------------------------------------------------------------ */

export const COVER_LETTERS_SEED: CoverLetter[] = [
  {
    id: "cl-razorpay",
    company: JOB_COMPANIES.razorpay,
    role: "Frontend Engineer II, Payments",
    resumeName: "Senior Frontend — 2026",
    createdDaysAgo: 1,
  },
  {
    id: "cl-google",
    company: JOB_COMPANIES.google,
    role: "Senior Frontend Engineer, Gemini",
    resumeName: "Senior Frontend — 2026",
    createdDaysAgo: 3,
  },
  {
    id: "cl-spotify",
    company: JOB_COMPANIES.spotify,
    role: "React Engineer, Web Player",
    resumeName: "Frontend Engineer — General",
    createdDaysAgo: 6,
  },
];

export const ACTIVITY_SEED: ActivityEntry[] = [
  {
    id: "act-1",
    kind: "cover",
    text: "Cover letter generated for Razorpay — Frontend Engineer II.",
    daysAgo: 1,
  },
  {
    id: "act-2",
    kind: "exported",
    text: "\"Senior Frontend — 2026\" exported as PDF for the Google application.",
    daysAgo: 3,
  },
  {
    id: "act-3",
    kind: "optimized",
    text: "\"Senior Frontend — 2026\" optimized — ATS score 83 → 91.",
    daysAgo: 6,
  },
  {
    id: "act-4",
    kind: "tailored",
    text: "\"Frontend Engineer — General\" tailored for Spotify Web Player.",
    daysAgo: 6,
  },
  {
    id: "act-5",
    kind: "created",
    text: "\"Full Stack — Node + React\" created from the Technical template.",
    daysAgo: 4,
  },
  {
    id: "act-6",
    kind: "uploaded",
    text: "\"Senior Frontend — 2026\" v1 imported from LinkedIn PDF.",
    daysAgo: 47,
  },
];

/** Companies rotated through when generating new cover letters. */
export const COVER_LETTER_TARGETS: JobCompany[] = [
  JOB_COMPANIES.netflix,
  JOB_COMPANIES.atlassian,
  JOB_COMPANIES.microsoft,
  JOB_COMPANIES.flipkart,
  JOB_COMPANIES.adobe,
];

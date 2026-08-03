/**
 * Mock data for the Companies Intelligence module. Shapes mirror the future
 * backend contract so swapping in real queries is a drop-in change.
 */

export type HiringStatus = "actively-hiring" | "hiring" | "freeze";
export type SizeCategory = "startup" | "mid" | "enterprise";
export type Verdict = "apply" | "consider" | "wait";

export interface OpenJob {
  role: string;
  salary: string;
  location: string;
  match: number;
}

export interface Review {
  role: string;
  department: string;
  rating: number;
  pros: string;
  cons: string;
}

export interface NewsItem {
  title: string;
  date: string;
  source: string;
}

export interface TrendMonth {
  month: string;
  opened: number;
  interviews: number;
}

export interface CompanyAi {
  insights: string[];
  pros: string[];
  cons: string[];
  recommendation: string;
  verdict: Verdict;
  matchScore: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  /** Brand accent used for the monogram tile. */
  color: string;
  verified: boolean;
  industry: string;
  location: string;
  size: string;
  sizeCategory: SizeCategory;
  founded: number;
  openPositions: number;
  hiringStatus: HiringStatus;
  remoteFriendly: boolean;
  avgSalary: string;
  aiScore: number;
  cultureRating: number;
  salaryRating: number;
  responseRate: number;
  employeeCount: string;
  fundingStage: string;
  website: string;
  mission: string;
  overview: string;
  products: string[];
  techStack: string[];
  benefits: string[];
  culture: string;
  hiringProcess: string[];
  interviewDifficulty: { label: "Easy" | "Moderate" | "Hard"; rating: number };
  salaryRange: string;
  offices: string[];
  news: NewsItem[];
  reviews: Review[];
  hiringTrend: TrendMonth[];
  /** Ids of similar companies. */
  similar: string[];
  openJobs: OpenJob[];
  ai: CompanyAi;
}

export const HIRING_STATUS_META: Record<
  HiringStatus,
  { label: string; badgeVariant: "success" | "info" | "draft" }
> = {
  "actively-hiring": { label: "Actively hiring", badgeVariant: "success" },
  hiring: { label: "Hiring", badgeVariant: "info" },
  freeze: { label: "Hiring freeze", badgeVariant: "draft" },
};

export const VERDICT_META: Record<
  Verdict,
  { label: string; badgeVariant: "success" | "warning" | "draft" }
> = {
  apply: { label: "Apply now", badgeVariant: "success" },
  consider: { label: "Worth considering", badgeVariant: "warning" },
  wait: { label: "Wait for a better opening", badgeVariant: "draft" },
};

const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];

function trend(opened: number[], interviews: number[]): TrendMonth[] {
  return MONTHS.map((month, i) => ({
    month,
    opened: opened[i],
    interviews: interviews[i],
  }));
}

export const COMPANIES: CompanyProfile[] = [
  {
    id: "google",
    name: "Google",
    color: "#4285F4",
    verified: true,
    industry: "Big Tech",
    location: "Mountain View, CA",
    size: "180K+ employees",
    sizeCategory: "enterprise",
    founded: 1998,
    openPositions: 42,
    hiringStatus: "actively-hiring",
    remoteFriendly: true,
    avgSalary: "$185k",
    aiScore: 94,
    cultureRating: 4.4,
    salaryRating: 4.7,
    responseRate: 78,
    employeeCount: "182,000",
    fundingStage: "Public (GOOGL)",
    website: "https://careers.google.com",
    mission: "Organize the world's information and make it universally accessible and useful.",
    overview:
      "Google builds products used by billions — Search, Android, Cloud, and the Gemini family of AI models. Frontend hiring is concentrated on Gemini surfaces, Workspace, and Cloud consoles.",
    products: ["Search", "Gemini", "Android", "Google Cloud", "Workspace"],
    techStack: ["React", "TypeScript", "Angular", "Go", "Python", "Kubernetes"],
    benefits: ["Top-of-band equity", "On-site meals", "20% time", "Full family healthcare"],
    culture:
      "Engineering-led with strong internal mobility. Teams vary widely — Gemini web moves fast, infra teams are steadier.",
    hiringProcess: [
      "Recruiter screen (30 min)",
      "Technical phone screen",
      "Virtual onsite — 4 rounds",
      "Hiring committee review",
      "Team match + offer",
    ],
    interviewDifficulty: { label: "Hard", rating: 3.9 },
    salaryRange: "$150k – $240k",
    offices: ["Mountain View", "Bengaluru", "London", "Zurich"],
    news: [
      { title: "Gemini web team doubles frontend hiring for multimodal push", date: "Jul 2026", source: "TechCrunch" },
      { title: "Google expands Bengaluru campus by 4,000 seats", date: "Jun 2026", source: "Economic Times" },
    ],
    reviews: [
      {
        role: "Senior SWE",
        department: "Engineering",
        rating: 4.5,
        pros: "World-class infra, smart peers, real 20% projects.",
        cons: "Promo process is slow; big-company inertia on some teams.",
      },
      {
        role: "Frontend Engineer",
        department: "Gemini",
        rating: 4.2,
        pros: "Shipping AI UI used by hundreds of millions.",
        cons: "Launch pressure spikes around model releases.",
      },
    ],
    hiringTrend: trend([18, 22, 26, 31, 38, 42], [6, 8, 9, 12, 14, 16]),
    similar: ["microsoft", "meta", "amazon"],
    openJobs: [
      { role: "Senior Frontend Engineer, Gemini", salary: "$168k – $210k", location: "Mountain View, CA", match: 96 },
      { role: "UI Engineer, Cloud Console", salary: "$155k – $195k", location: "Remote — US", match: 88 },
      { role: "Frontend Engineer, Workspace", salary: "$150k – $190k", location: "Bengaluru, India", match: 85 },
    ],
    ai: {
      insights: [
        "Google hires **React engineers every month** — 42 frontend roles opened in the last quarter.",
        "They usually respond within **5 days** for referred candidates.",
        "Your resume **version 3 has a 94% match** against their Gemini openings.",
        "Interview process usually runs **4 technical rounds** plus committee.",
      ],
      pros: ["Monthly frontend openings", "Top-of-market comp", "Your referral is already inside"],
      cons: ["Hard interview bar", "Slow committee decisions"],
      recommendation:
        "Based on your experience, this is an excellent fit — you're already in their pipeline at Technical Round 2. Keep this as your primary target.",
      verdict: "apply",
      matchScore: 94,
    },
  },
  {
    id: "razorpay",
    name: "Razorpay",
    color: "#3395FF",
    verified: true,
    industry: "Fintech",
    location: "Bengaluru, India",
    size: "3K+ employees",
    sizeCategory: "mid",
    founded: 2014,
    openPositions: 14,
    hiringStatus: "actively-hiring",
    remoteFriendly: false,
    avgSalary: "₹32 LPA",
    aiScore: 95,
    cultureRating: 4.1,
    salaryRating: 4.2,
    responseRate: 88,
    employeeCount: "3,200",
    fundingStage: "Series F ($7.5B valuation)",
    website: "https://razorpay.com/jobs",
    mission: "Power the financial infrastructure for India's digital economy.",
    overview:
      "India's leading full-stack payments and banking platform for businesses. The frontend platform runs on micro-frontends with the Blade design system.",
    products: ["Payment Gateway", "RazorpayX", "Capital", "Blade DS"],
    techStack: ["React", "TypeScript", "Redux", "Node.js", "AWS", "Docker"],
    benefits: ["ESOPs with liquidity events", "Parents' health cover", "Learning wallet", "Relocation support"],
    culture:
      "High-ownership pods that ship weekly. Strong testing culture; correctness is non-negotiable on payment surfaces.",
    hiringProcess: [
      "Recruiter screen",
      "Machine coding round",
      "Architecture discussion",
      "Hiring manager + HR",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.4 },
    salaryRange: "₹24L – ₹48L",
    offices: ["Bengaluru", "Mumbai", "Delhi NCR"],
    news: [
      { title: "Razorpay crosses $200B annualized TPV", date: "Jul 2026", source: "Mint" },
      { title: "Blade design system goes open source", date: "May 2026", source: "InfoQ" },
    ],
    reviews: [
      {
        role: "Frontend Engineer II",
        department: "Payments",
        rating: 4.3,
        pros: "Real ownership, modern stack, fast decisions.",
        cons: "Hybrid mandate — 3 days in Bengaluru office.",
      },
      {
        role: "SDE II",
        department: "RazorpayX",
        rating: 3.9,
        pros: "Fintech scale problems, sharp team.",
        cons: "Quarter-end crunch around compliance deadlines.",
      },
    ],
    hiringTrend: trend([6, 8, 9, 11, 12, 14], [3, 4, 5, 6, 7, 8]),
    similar: ["swiggy", "flipkart"],
    openJobs: [
      { role: "Frontend Engineer II, Payments", salary: "₹28L – ₹45L", location: "Bengaluru", match: 96 },
      { role: "Senior FE, RazorpayX", salary: "₹32L – ₹50L", location: "Bengaluru", match: 91 },
    ],
    ai: {
      insights: [
        "Fastest responder in your pipeline — recruiters reply within **1 day**.",
        "Your HR round is **tomorrow at 18:30** — an offer here is days away, not weeks.",
        "They've hired **4 people from fintech backgrounds** like yours this quarter.",
      ],
      pros: ["96% resume match — your highest", "Fast, decisive process", "Fintech domain fit"],
      cons: ["No remote option", "Comp below your US-remote targets"],
      recommendation:
        "You're one HR round from an offer. Use the Microsoft offer as leverage in tomorrow's compensation discussion.",
      verdict: "apply",
      matchScore: 96,
    },
  },
  {
    id: "vercel",
    name: "Vercel",
    color: "#000000",
    verified: true,
    industry: "Developer Tools",
    location: "San Francisco, CA",
    size: "500+ employees",
    sizeCategory: "startup",
    founded: 2015,
    openPositions: 9,
    hiringStatus: "actively-hiring",
    remoteFriendly: true,
    avgSalary: "$175k",
    aiScore: 92,
    cultureRating: 4.5,
    salaryRating: 4.3,
    responseRate: 82,
    employeeCount: "550",
    fundingStage: "Series E ($3.25B valuation)",
    website: "https://vercel.com/careers",
    mission: "Enable the world to ship the best web experiences.",
    overview:
      "The company behind Next.js and the frontend cloud. Remote-first, deeply technical, and the closest overlap with your daily stack anywhere on this list.",
    products: ["Next.js", "Vercel Platform", "v0", "Turborepo"],
    techStack: ["Next.js", "React", "TypeScript", "Go", "Rust"],
    benefits: ["Remote-first", "Top-tier equity", "Home office budget", "Conference speaking support"],
    culture:
      "Small senior teams, high written-communication bar, ship-to-learn mentality. Engineers own features end to end.",
    hiringProcess: [
      "Intro call",
      "Technical deep-dive on past work",
      "Take-home or pairing (your choice)",
      "Team round + founder chat",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.5 },
    salaryRange: "$150k – $220k",
    offices: ["San Francisco", "Remote — global"],
    news: [
      { title: "Next.js 16 adoption passes 60% of top-10k sites", date: "Jul 2026", source: "The New Stack" },
      { title: "Vercel opens APAC remote hiring", date: "Jun 2026", source: "TechCrunch" },
    ],
    reviews: [
      {
        role: "Software Engineer",
        department: "Platform",
        rating: 4.6,
        pros: "You work with the people who build the framework you use.",
        cons: "High autonomy means little hand-holding.",
      },
      {
        role: "Design Engineer",
        department: "v0",
        rating: 4.4,
        pros: "Craft is genuinely valued; demos over decks.",
        cons: "Fast pivots as the AI product line evolves.",
      },
    ],
    hiringTrend: trend([3, 4, 5, 6, 8, 9], [1, 2, 2, 3, 4, 5]),
    similar: ["notion", "atlassian"],
    openJobs: [
      { role: "Software Engineer, Next.js", salary: "$170k – $220k", location: "Remote — global", match: 93 },
      { role: "Design Engineer, v0", salary: "$160k – $200k", location: "Remote — US/EU", match: 87 },
    ],
    ai: {
      insights: [
        "Your PerfKit project uses **their exact stack** — lead with it in outreach.",
        "APAC remote hiring opened **last month** — timezone is no longer a blocker.",
        "Engineers with OSS Next.js contributions get **2× the response rate** here.",
      ],
      pros: ["Perfect stack overlap", "Remote-first incl. India", "Small-company impact"],
      cons: ["Fewer openings (9)", "High written-communication bar"],
      recommendation:
        "Your strongest culture + stack fit on this list. A small Next.js OSS contribution before applying would meaningfully raise your odds.",
      verdict: "apply",
      matchScore: 92,
    },
  },
  {
    id: "atlassian",
    name: "Atlassian",
    color: "#0052CC",
    verified: true,
    industry: "SaaS",
    location: "Sydney, Australia",
    size: "12K+ employees",
    sizeCategory: "enterprise",
    founded: 2002,
    openPositions: 18,
    hiringStatus: "hiring",
    remoteFriendly: true,
    avgSalary: "$162k",
    aiScore: 89,
    cultureRating: 4.5,
    salaryRating: 4.1,
    responseRate: 72,
    employeeCount: "12,500",
    fundingStage: "Public (TEAM)",
    website: "https://www.atlassian.com/company/careers",
    mission: "Unleash the potential of every team.",
    overview:
      "Builder of Jira, Confluence, and Trello — fully distributed since 2020. Strong async writing culture and permanent work-from-anywhere.",
    products: ["Jira", "Confluence", "Trello", "Bitbucket"],
    techStack: ["React", "TypeScript", "GraphQL", "Java", "Kotlin", "AWS"],
    benefits: ["Work from anywhere, permanently", "TEAM Anywhere travel budget", "10% bonus target", "5 paid volunteer days"],
    culture:
      "Async-first with an unusually healthy meeting culture. Documentation is a first-class artifact; decisions are written down.",
    hiringProcess: [
      "Recruiter screen",
      "Craft interview (React deep-dive)",
      "System design",
      "Values interview",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.3 },
    salaryRange: "$140k – $190k",
    offices: ["Sydney", "Remote — anywhere", "Bengaluru", "Austin"],
    news: [
      { title: "Atlassian reports 25% cloud revenue growth", date: "Jul 2026", source: "Reuters" },
      { title: "Jira platform team reorganizes around AI agents", date: "May 2026", source: "The Register" },
    ],
    reviews: [
      {
        role: "Fullstack Engineer",
        department: "Jira Platform",
        rating: 4.6,
        pros: "Genuine remote flexibility; writing culture keeps meetings rare.",
        cons: "AEST overlap can mean early mornings from India.",
      },
      {
        role: "Senior FE",
        department: "Confluence",
        rating: 4.3,
        pros: "Design system maturity; sane on-call.",
        cons: "Large codebase — first quarter is orientation.",
      },
    ],
    hiringTrend: trend([10, 11, 12, 14, 16, 18], [4, 4, 5, 6, 7, 8]),
    similar: ["vercel", "notion", "microsoft"],
    openJobs: [
      { role: "Fullstack Engineer, Jira Platform", salary: "$140k – $185k", location: "Remote — anywhere", match: 87 },
      { role: "Frontend Engineer, Confluence", salary: "$135k – $175k", location: "Remote — anywhere", match: 84 },
    ],
    ai: {
      insights: [
        "You already have an application **under review** here (applied 3 days ago).",
        "They reply to **72% of applicants** — median 8 days to first screen.",
        "Your async-writing portfolio piece maps to their **top-listed value**.",
      ],
      pros: ["True remote-anywhere", "Culture fit with async writing", "Application already in flight"],
      cons: ["AEST meeting overlap", "Slower process (~4 weeks)"],
      recommendation:
        "Strong fit already in motion — no action needed until the screen lands. Prep the values interview early; it filters more candidates than the craft round.",
      verdict: "apply",
      matchScore: 87,
    },
  },
  {
    id: "spotify",
    name: "Spotify",
    color: "#1DB954",
    verified: true,
    industry: "Consumer Tech",
    location: "Stockholm, Sweden",
    size: "8K+ employees",
    sizeCategory: "enterprise",
    founded: 2006,
    openPositions: 11,
    hiringStatus: "hiring",
    remoteFriendly: true,
    avgSalary: "$155k",
    aiScore: 90,
    cultureRating: 4.3,
    salaryRating: 3.9,
    responseRate: 81,
    employeeCount: "8,400",
    fundingStage: "Public (SPOT)",
    website: "https://www.lifeatspotify.com",
    mission: "Unlock the potential of human creativity through audio.",
    overview:
      "The world's largest audio streaming platform. Web Player and Desktop teams run one of the best-known squad models in the industry.",
    products: ["Spotify", "Web Player", "Spotify for Artists", "Encore DS"],
    techStack: ["React", "TypeScript", "Redux", "GraphQL", "Java", "GCP"],
    benefits: ["6 months parental leave", "Remote — EU", "Wellness budget", "Relocation to Stockholm"],
    culture:
      "Autonomous squads with embedded design and data science. Ship weekly, measure everything, low ego.",
    hiringProcess: [
      "Recruiter screen",
      "Codebase pairing (their code, not LeetCode)",
      "Panel with the squad",
      "Values chat",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.2 },
    salaryRange: "$135k – $175k",
    offices: ["Stockholm", "London", "New York", "Remote — EU"],
    news: [
      { title: "Spotify Web Player rebuilt on React Server Components", date: "Jun 2026", source: "InfoQ" },
      { title: "Audiobooks expansion adds 40 engineering roles", date: "May 2026", source: "Bloomberg" },
    ],
    reviews: [
      {
        role: "React Engineer",
        department: "Web Player",
        rating: 4.4,
        pros: "Real product autonomy; pairing culture; visa + relocation handled well.",
        cons: "EU salaries trail US bands.",
      },
      {
        role: "Engineer",
        department: "Platform",
        rating: 4.1,
        pros: "Squad model actually works here.",
        cons: "Reorg cadence — squads shuffle yearly.",
      },
    ],
    hiringTrend: trend([5, 6, 7, 8, 10, 11], [2, 3, 3, 4, 5, 6]),
    similar: ["netflix", "google"],
    openJobs: [
      { role: "React Engineer, Web Player", salary: "$135k – $175k", location: "Stockholm / Remote — EU", match: 92 },
      { role: "Frontend Engineer, Artists", salary: "$130k – $165k", location: "Remote — EU", match: 86 },
    ],
    ai: {
      insights: [
        "Your panel interview is **in 5 days** — they pair on their codebase, so practice reading unfamiliar Redux.",
        "**81% response rate** at panel stage — among the best in your pipeline.",
        "Employees consistently mention **strong work-life balance** in reviews.",
      ],
      pros: ["Panel already scheduled", "10/11 skill overlap", "Great work-life reviews"],
      cons: ["EU comp band", "Stockholm-hours overlap needed"],
      recommendation:
        "Momentum is strong — your interview probability here is higher than average. Focus prep on state-management trade-offs.",
      verdict: "apply",
      matchScore: 92,
    },
  },
  {
    id: "microsoft",
    name: "Microsoft",
    color: "#00A4EF",
    verified: true,
    industry: "Big Tech",
    location: "Redmond, WA",
    size: "220K+ employees",
    sizeCategory: "enterprise",
    founded: 1975,
    openPositions: 38,
    hiringStatus: "hiring",
    remoteFriendly: true,
    avgSalary: "$170k",
    aiScore: 88,
    cultureRating: 4.2,
    salaryRating: 4.4,
    responseRate: 64,
    employeeCount: "221,000",
    fundingStage: "Public (MSFT)",
    website: "https://careers.microsoft.com",
    mission: "Empower every person and organization on the planet to achieve more.",
    overview:
      "Teams, Office, and Azure run some of the largest React codebases in existence. Strong internal tooling and a mature hybrid policy.",
    products: ["Teams", "Office 365", "Azure", "Copilot"],
    techStack: ["React", "TypeScript", "C#", ".NET", "Azure", "Kubernetes"],
    benefits: ["ESPP + stock awards", "Industry-leading parental leave", "$1,500 learning budget", "Hybrid flexibility"],
    culture:
      "Growth-mindset culture that has genuinely improved. Team-dependent: Teams ships fast, Azure is steadier.",
    hiringProcess: [
      "Recruiter screen",
      "Hiring manager interview",
      "Virtual onsite loop — 4 rounds",
      "Offer + level calibration",
    ],
    interviewDifficulty: { label: "Hard", rating: 3.6 },
    salaryRange: "$145k – $210k",
    offices: ["Redmond", "Hyderabad", "Bengaluru", "Dublin"],
    news: [
      { title: "Copilot surfaces drive record Teams engagement", date: "Jul 2026", source: "The Verge" },
      { title: "Microsoft India adds 3,000 engineering roles", date: "Jun 2026", source: "Economic Times" },
    ],
    reviews: [
      {
        role: "SWE II",
        department: "Teams",
        rating: 4.2,
        pros: "Massive React codebase, great tooling, real work-life balance.",
        cons: "Level calibration can undershoot external offers.",
      },
      {
        role: "Senior SWE",
        department: "Azure",
        rating: 4.0,
        pros: "Stability and deep systems work.",
        cons: "Slower ship cadence than product orgs.",
      },
    ],
    hiringTrend: trend([20, 22, 25, 28, 33, 38], [8, 9, 10, 12, 13, 15]),
    similar: ["google", "amazon", "atlassian"],
    openJobs: [
      { role: "Software Engineer II, Teams Calling", salary: "$145k – $190k", location: "Seattle, WA", match: 91 },
      { role: "Frontend Engineer, Copilot", salary: "$155k – $200k", location: "Redmond, WA", match: 86 },
    ],
    ai: {
      insights: [
        "You hold a **live offer** here — L62, expiring in 6 days.",
        "First offers typically carry **8–12% negotiation headroom**.",
        "Their response rate drops to **64%** for cold applications — but you're past that stage.",
      ],
      pros: ["Offer in hand", "Comp headroom to negotiate", "Massive React surface"],
      cons: ["Offer clock ticking", "Hybrid Redmond for this team"],
      recommendation:
        "Decision time, not application time: ask for a one-week extension so your Google Round 2 result lands first.",
      verdict: "consider",
      matchScore: 91,
    },
  },
  {
    id: "notion",
    name: "Notion",
    color: "#111111",
    verified: true,
    industry: "Productivity SaaS",
    location: "San Francisco, CA",
    size: "800+ employees",
    sizeCategory: "startup",
    founded: 2013,
    openPositions: 7,
    hiringStatus: "hiring",
    remoteFriendly: false,
    avgSalary: "$180k",
    aiScore: 86,
    cultureRating: 4.4,
    salaryRating: 4.3,
    responseRate: 69,
    employeeCount: "850",
    fundingStage: "Series C ($10B valuation)",
    website: "https://www.notion.com/careers",
    mission: "Make software toolmaking ubiquitous.",
    overview:
      "The connected workspace — docs, wikis, projects, and AI in one surface. Small, craft-obsessed frontend team working on a famously hard rendering problem.",
    products: ["Notion", "Notion AI", "Notion Calendar", "Notion Mail"],
    techStack: ["React", "TypeScript", "Node.js", "Electron", "Postgres"],
    benefits: ["Top-decile equity", "In-office culture with flexibility", "Wellness stipend", "Team offsites"],
    culture:
      "Craft over speed. Small teams, extremely high design bar, engineers pair closely with designers.",
    hiringProcess: [
      "Intro call",
      "Technical screen",
      "Onsite: coding + product sense + values",
    ],
    interviewDifficulty: { label: "Hard", rating: 3.8 },
    salaryRange: "$160k – $230k",
    offices: ["San Francisco", "New York", "Dublin", "Hyderabad"],
    news: [
      { title: "Notion AI reaches 10M weekly users", date: "Jul 2026", source: "Forbes" },
      { title: "Notion opens Hyderabad engineering hub", date: "Apr 2026", source: "TechCrunch" },
    ],
    reviews: [
      {
        role: "Software Engineer",
        department: "Editor",
        rating: 4.5,
        pros: "The hardest, most interesting rendering problems in SaaS.",
        cons: "In-office expectation; high intensity.",
      },
      {
        role: "Product Engineer",
        department: "AI",
        rating: 4.2,
        pros: "Tiny teams shipping to millions.",
        cons: "Ambiguity is constant — you define your own scope.",
      },
    ],
    hiringTrend: trend([3, 3, 4, 5, 6, 7], [1, 1, 2, 2, 3, 3]),
    similar: ["vercel", "atlassian"],
    openJobs: [
      { role: "Software Engineer, Editor", salary: "$170k – $230k", location: "San Francisco, CA", match: 84 },
      { role: "Product Engineer, Notion AI", salary: "$165k – $220k", location: "Hyderabad, India", match: 86 },
    ],
    ai: {
      insights: [
        "The **Hyderabad hub** opened in April — India-based product engineers are now in scope.",
        "Editor-team interviews probe **rendering performance** — your LCP work is directly relevant.",
        "Response rate is **69%** but rises sharply with a design-engineering portfolio.",
      ],
      pros: ["Hyderabad = India option", "Craft culture matches yours", "Rendering perf overlap"],
      cons: ["In-office leaning", "Only 7 openings"],
      recommendation:
        "Apply to the Hyderabad AI role — your design-system + performance story is exactly their profile. Attach the portfolio, not just the resume.",
      verdict: "apply",
      matchScore: 86,
    },
  },
  {
    id: "netflix",
    name: "Netflix",
    color: "#E50914",
    verified: true,
    industry: "Streaming",
    location: "Los Gatos, CA",
    size: "13K+ employees",
    sizeCategory: "enterprise",
    founded: 1997,
    openPositions: 8,
    hiringStatus: "hiring",
    remoteFriendly: true,
    avgSalary: "$230k",
    aiScore: 85,
    cultureRating: 4.0,
    salaryRating: 4.9,
    responseRate: 58,
    employeeCount: "13,000",
    fundingStage: "Public (NFLX)",
    website: "https://jobs.netflix.com",
    mission: "Entertain the world.",
    overview:
      "280M+ members, everything engineered in-house. Famous for top-of-market pay, the keeper test, and context-over-control culture.",
    products: ["Netflix", "Games", "Ads Platform", "Open Connect"],
    techStack: ["React", "TypeScript", "Node.js", "Java", "GraphQL", "AWS"],
    benefits: ["Top-of-market, all-cash option", "Unlimited vacation", "Choice-of-stock program", "Premium family healthcare"],
    culture:
      "High talent density, high candor. You set direction and defend trade-offs; there is no ceremony to hide behind.",
    hiringProcess: [
      "Recruiter screen",
      "Hiring manager deep-dive",
      "Technical loop — 3 rounds",
      "Culture + keeper-test conversation",
    ],
    interviewDifficulty: { label: "Hard", rating: 4.1 },
    salaryRange: "$185k – $280k",
    offices: ["Los Gatos", "Los Angeles", "Remote — US"],
    news: [
      { title: "Ads tier passes 80M monthly actives", date: "Jul 2026", source: "Variety" },
      { title: "Player team ships sub-100ms interaction target", date: "May 2026", source: "Netflix TechBlog" },
    ],
    reviews: [
      {
        role: "Senior UI Engineer",
        department: "Player",
        rating: 4.2,
        pros: "Unmatched pay; you work only with strong engineers.",
        cons: "Keeper test is real — low tolerance for coasting.",
      },
      {
        role: "SWE",
        department: "Growth",
        rating: 3.8,
        pros: "Freedom and responsibility is not a slogan.",
        cons: "Feedback culture can feel blunt for the first months.",
      },
    ],
    hiringTrend: trend([4, 4, 5, 6, 7, 8], [2, 2, 2, 3, 3, 4]),
    similar: ["spotify", "meta", "google"],
    openJobs: [
      { role: "Lead UI Engineer, Player Experience", salary: "$185k – $240k", location: "Remote — US", match: 93 },
      { role: "UI Engineer, Ads Experience", salary: "$180k – $230k", location: "Los Angeles, CA", match: 82 },
    ],
    ai: {
      insights: [
        "Your recruiter screen went **6 days ago** with no reply — their median is 4. Nudge now.",
        "**Highest salary band** in your pipeline: $185k – $280k, all-cash option.",
        "Lead loops require **two technical-direction stories** — you have one prepped, need a second.",
      ],
      pros: ["Top-of-market comp", "Remote — US", "Player role matches your perf work"],
      cons: ["58% response rate", "Hardest culture bar on this list"],
      recommendation:
        "Send the follow-up today, then prep a second leadership story. High risk, highest reward on your board.",
      verdict: "consider",
      matchScore: 90,
    },
  },
  {
    id: "meta",
    name: "Meta",
    color: "#0866FF",
    verified: true,
    industry: "Big Tech",
    location: "Menlo Park, CA",
    size: "70K+ employees",
    sizeCategory: "enterprise",
    founded: 2004,
    openPositions: 27,
    hiringStatus: "hiring",
    remoteFriendly: true,
    avgSalary: "$195k",
    aiScore: 84,
    cultureRating: 3.9,
    salaryRating: 4.8,
    responseRate: 61,
    employeeCount: "71,000",
    fundingStage: "Public (META)",
    website: "https://www.metacareers.com",
    mission: "Build the future of human connection.",
    overview:
      "Creator of React itself. Reality Labs and the family of apps hire frontend heavily; internal tooling is world-class.",
    products: ["Instagram", "WhatsApp", "Quest", "Llama"],
    techStack: ["React", "TypeScript", "Hack", "GraphQL", "Relay", "Python"],
    benefits: ["Top-of-band equity grants", "Remote-first teams", "Quest hardware allowance", "Family-building support"],
    culture:
      "Move-fast culture with heavy metrics orientation. Perf review cycles are demanding; comp rewards impact.",
    hiringProcess: [
      "Recruiter screen",
      "Coding screens ×2",
      "Onsite: coding, design, behavioral",
      "Team match",
    ],
    interviewDifficulty: { label: "Hard", rating: 4.0 },
    salaryRange: "$160k – $260k",
    offices: ["Menlo Park", "London", "Remote — US"],
    news: [
      { title: "Reality Labs web team expands spatial UI hiring", date: "Jun 2026", source: "The Information" },
      { title: "React 20 roadmap published", date: "May 2026", source: "React Blog" },
    ],
    reviews: [
      {
        role: "Frontend Engineer",
        department: "Reality Labs",
        rating: 4.0,
        pros: "You use React with the team that invented it.",
        cons: "PSC review cycle drives short-term thinking.",
      },
      {
        role: "SWE",
        department: "Instagram",
        rating: 3.8,
        pros: "Compensation and internal tooling.",
        cons: "Metrics pressure; team churn.",
      },
    ],
    hiringTrend: trend([14, 15, 17, 20, 24, 27], [5, 6, 7, 8, 10, 11]),
    similar: ["google", "microsoft", "netflix"],
    openJobs: [
      { role: "Frontend Engineer, Reality Labs", salary: "$160k – $205k", location: "Remote — US", match: 94 },
      { role: "UI Engineer, Instagram Web", salary: "$165k – $215k", location: "Menlo Park, CA", match: 85 },
    ],
    ai: {
      insights: [
        "The Reality Labs posting you matched at **94% closes within 24 hours**.",
        "Design-system experience is **weighted heavily** for the spatial UI team.",
        "Their loops include **2 coding screens before onsite** — budget prep time.",
      ],
      pros: ["94% match role live now", "React's home team", "Strong remote policy"],
      cons: ["Closing-soon deadline", "Longest interview loop on this list"],
      recommendation:
        "Apply to the Reality Labs role today before it closes — everything else here can wait.",
      verdict: "apply",
      matchScore: 94,
    },
  },
  {
    id: "adobe",
    name: "Adobe",
    color: "#FA0F00",
    verified: true,
    industry: "Creative Software",
    location: "San Jose, CA",
    size: "30K+ employees",
    sizeCategory: "enterprise",
    founded: 1982,
    openPositions: 12,
    hiringStatus: "hiring",
    remoteFriendly: false,
    avgSalary: "$165k",
    aiScore: 74,
    cultureRating: 4.1,
    salaryRating: 4.2,
    responseRate: 61,
    employeeCount: "30,000",
    fundingStage: "Public (ADBE)",
    website: "https://careers.adobe.com",
    mission: "Change the world through personalized digital experiences.",
    overview:
      "Creative Cloud on the web is a huge React + Web Components investment. Spectrum design system is central to frontend hiring.",
    products: ["Photoshop Web", "Express", "Acrobat", "Firefly"],
    techStack: ["React", "TypeScript", "Web Components", "Lit", "AWS"],
    benefits: ["Creative Cloud license", "ESPP", "Wellness reimbursement", "Sabbatical program"],
    culture:
      "Mature, design-centric org. Steadier pace than startups; strong craft respect in the Spectrum ecosystem.",
    hiringProcess: [
      "Recruiter screen",
      "Portfolio/HM review",
      "Technical rounds ×2",
      "Team fit",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.1 },
    salaryRange: "$150k – $185k",
    offices: ["San Jose", "Noida", "Bengaluru", "London"],
    news: [
      { title: "Photoshop Web exits beta with 20M users", date: "Jun 2026", source: "The Verge" },
      { title: "Firefly video models ship in Premiere", date: "May 2026", source: "Engadget" },
    ],
    reviews: [
      {
        role: "UI Engineer",
        department: "Creative Cloud Web",
        rating: 4.0,
        pros: "Deep canvas/graphics problems; stable org.",
        cons: "Web Components stack diverges from the React mainstream.",
      },
      {
        role: "SWE",
        department: "Document Cloud",
        rating: 3.9,
        pros: "Work-life balance is genuinely good.",
        cons: "Slower promotion velocity.",
      },
    ],
    hiringTrend: trend([8, 8, 9, 10, 11, 12], [3, 3, 3, 4, 4, 5]),
    similar: ["microsoft", "google"],
    openJobs: [
      { role: "UI Engineer, Creative Cloud Web", salary: "$150k – $185k", location: "San Jose, CA", match: 82 },
      { role: "Frontend Engineer, Express", salary: "$145k – $180k", location: "Noida, India", match: 79 },
    ],
    ai: {
      insights: [
        "They rejected you **41 days ago** citing Web Components depth — the gap is closable.",
        "Reapply window opens in **~5 months**; a small **Lit/Web Components** OSS contribution would flip the earlier feedback.",
        "Your v4 resume scores **6 points higher** than the version they saw.",
      ],
      pros: ["Known feedback to act on", "India offices (Noida/Bengaluru)", "Stable, craft-respecting org"],
      cons: ["Recent rejection on file", "Stack divergence (Lit)"],
      recommendation:
        "Don't reapply yet. Ship one Web Components contribution, then re-enter in the reapply window with the v4 resume.",
      verdict: "wait",
      matchScore: 79,
    },
  },
  {
    id: "amazon",
    name: "Amazon",
    color: "#FF9900",
    verified: true,
    industry: "E-commerce & Cloud",
    location: "Seattle, WA",
    size: "1.5M+ employees",
    sizeCategory: "enterprise",
    founded: 1994,
    openPositions: 55,
    hiringStatus: "actively-hiring",
    remoteFriendly: false,
    avgSalary: "$175k",
    aiScore: 72,
    cultureRating: 3.6,
    salaryRating: 4.5,
    responseRate: 55,
    employeeCount: "1,540,000",
    fundingStage: "Public (AMZN)",
    website: "https://www.amazon.jobs",
    mission: "Be Earth's most customer-centric company.",
    overview:
      "The largest engineering organization on this list. Checkout, retail, and AWS console teams hire React engineers constantly — mostly onsite.",
    products: ["Amazon.com", "AWS", "Prime Video", "Alexa"],
    techStack: ["React", "TypeScript", "Java", "AWS", "Kotlin"],
    benefits: ["RSU vesting + sign-on bridge", "Career Choice funding", "Relocation packages", "20 weeks parental leave"],
    culture:
      "Leadership Principles drive everything. Intense ownership culture; experiences vary enormously by team.",
    hiringProcess: [
      "Online assessment",
      "Phone screen",
      "Onsite loop — 5 rounds incl. Bar Raiser",
    ],
    interviewDifficulty: { label: "Hard", rating: 3.7 },
    salaryRange: "$150k – $220k",
    offices: ["Seattle", "Bengaluru", "Hyderabad", "Dublin"],
    news: [
      { title: "Amazon mandates 5-day office return", date: "Jun 2026", source: "CNBC" },
      { title: "AWS console teams adopt React Server Components", date: "May 2026", source: "AWS Blog" },
    ],
    reviews: [
      {
        role: "FE Engineer II",
        department: "Checkout",
        rating: 3.7,
        pros: "Scale you can't get elsewhere; strong comp.",
        cons: "On-call weight; RTO 5 days.",
      },
      {
        role: "SDE II",
        department: "AWS",
        rating: 3.5,
        pros: "Deep systems learning; Bar Raiser keeps quality up.",
        cons: "Frugality shows in tooling; team roulette is real.",
      },
    ],
    hiringTrend: trend([30, 34, 38, 43, 49, 55], [10, 12, 13, 15, 17, 19]),
    similar: ["microsoft", "google", "flipkart"],
    openJobs: [
      { role: "Frontend Engineer II, Checkout", salary: "$150k – $195k", location: "Seattle, WA", match: 85 },
      { role: "UI Engineer, AWS Console", salary: "$155k – $205k", location: "Bengaluru, India", match: 83 },
    ],
    ai: {
      insights: [
        "You **withdrew** here 8 days ago over relocation — that reason is logged in their ATS.",
        "The **Bengaluru AWS console** role sidesteps the relocation blocker entirely.",
        "Remote-eligible frontend postings **re-open quarterly**; I'm watching for them.",
      ],
      pros: ["55 open roles — volume play", "Bengaluru option exists", "Strong comp"],
      cons: ["5-day RTO", "You withdrew recently", "Lowest culture rating on this list"],
      recommendation:
        "Only re-engage via the Bengaluru AWS role. The Seattle path conflicts with the relocation constraint you already enforced.",
      verdict: "consider",
      matchScore: 83,
    },
  },
  {
    id: "swiggy",
    name: "Swiggy",
    color: "#FC8019",
    verified: true,
    industry: "Consumer Tech",
    location: "Bengaluru, India",
    size: "5K+ employees",
    sizeCategory: "mid",
    founded: 2014,
    openPositions: 9,
    hiringStatus: "hiring",
    remoteFriendly: true,
    avgSalary: "₹38 LPA",
    aiScore: 82,
    cultureRating: 3.9,
    salaryRating: 4.0,
    responseRate: 74,
    employeeCount: "5,100",
    fundingStage: "Public (SWIGGY)",
    website: "https://careers.swiggy.com",
    mission: "Deliver unparalleled convenience to a billion Indians.",
    overview:
      "India's on-demand convenience platform. Consumer Web is a Next.js PWA under extreme performance constraints — low-end devices, flaky networks.",
    products: ["Swiggy", "Instamart", "Dineout", "Genie"],
    techStack: ["React", "Next.js", "TypeScript", "GraphQL", "Node.js"],
    benefits: ["Remote within India", "ESOPs", "Swiggy One membership", "Device allowance"],
    culture:
      "Sprint-heavy consumer culture with IPL-scale traffic events. Performance engineering is a first-class discipline.",
    hiringProcess: [
      "Recruiter screen",
      "Machine coding",
      "System design + Web perf deep-dive",
      "HM + HR",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.3 },
    salaryRange: "₹30L – ₹55L",
    offices: ["Bengaluru", "Remote — India"],
    news: [
      { title: "Instamart expands to 75 cities", date: "Jul 2026", source: "Mint" },
      { title: "Consumer web hits 95+ Lighthouse on low-end devices", date: "Apr 2026", source: "Swiggy Bytes" },
    ],
    reviews: [
      {
        role: "Senior FE",
        department: "Consumer Web",
        rating: 4.0,
        pros: "Hardest web-perf problems in India; remote-friendly.",
        cons: "Event-scale on-call (IPL, NYE) is intense.",
      },
      {
        role: "SDE II",
        department: "Instamart",
        rating: 3.7,
        pros: "Fast growth, visible impact.",
        cons: "Priorities shift quickly.",
      },
    ],
    hiringTrend: trend([4, 5, 5, 6, 8, 9], [2, 2, 2, 3, 3, 4]),
    similar: ["razorpay", "flipkart"],
    openJobs: [
      { role: "Senior Frontend Engineer, Consumer Web", salary: "₹35L – ₹55L", location: "Remote — India", match: 87 },
      { role: "Frontend Engineer, Instamart", salary: "₹28L – ₹45L", location: "Bengaluru", match: 83 },
    ],
    ai: {
      insights: [
        "Your Lighthouse-focused side projects are **directly relevant** — their web team blogs about exactly this.",
        "**Remote within India** and the Senior Consumer Web role closes in 24 hours.",
        "They respond to **74%** of applicants within a week.",
      ],
      pros: ["Remote — India", "Perf work matches your wins", "Fast process"],
      cons: ["Event on-call intensity", "Comp below Razorpay's band"],
      recommendation:
        "Solid backup to Razorpay with a remote edge. Apply to the closing Senior role today; it's a 10-minute Easy Apply.",
      verdict: "apply",
      matchScore: 87,
    },
  },
  {
    id: "flipkart",
    name: "Flipkart",
    color: "#2874F0",
    verified: true,
    industry: "E-commerce",
    location: "Bengaluru, India",
    size: "22K+ employees",
    sizeCategory: "enterprise",
    founded: 2007,
    openPositions: 16,
    hiringStatus: "hiring",
    remoteFriendly: false,
    avgSalary: "₹36 LPA",
    aiScore: 78,
    cultureRating: 3.8,
    salaryRating: 4.1,
    responseRate: 66,
    employeeCount: "22,000",
    fundingStage: "Walmart-owned",
    website: "https://www.flipkartcareers.com",
    mission: "Maximize customer delight for every Indian.",
    overview:
      "India's homegrown e-commerce leader. Storefront runs Big Billion Days — one of the largest e-commerce load events anywhere — on a custom SSR pipeline.",
    products: ["Flipkart", "Myntra", "Flipkart Health+", "Cleartrip"],
    techStack: ["React", "TypeScript", "Node.js", "Java", "Kubernetes"],
    benefits: ["ESOPs + bonus", "Parents' medical cover", "Relocation assistance", "Flipkart discounts"],
    culture:
      "Scale-first engineering culture; rendering strategy is a business decision. Onsite Bengaluru for most product teams.",
    hiringProcess: [
      "Recruiter screen",
      "Machine coding",
      "Rendering fundamentals round",
      "HM + bar review",
    ],
    interviewDifficulty: { label: "Moderate", rating: 3.4 },
    salaryRange: "₹30L – ₹50L",
    offices: ["Bengaluru", "Delhi NCR"],
    news: [
      { title: "Big Billion Days peaks at 28M concurrent users", date: "Oct 2025", source: "YourStory" },
      { title: "Storefront moves to streaming SSR", date: "Jun 2026", source: "Flipkart Tech" },
    ],
    reviews: [
      {
        role: "UI Engineer II",
        department: "Storefront",
        rating: 3.9,
        pros: "Event-scale traffic; strong SSR chops on the team.",
        cons: "Onsite mandate; legacy corners in the codebase.",
      },
      {
        role: "SDE II",
        department: "Myntra",
        rating: 3.7,
        pros: "Fashion-tech problems, good pace.",
        cons: "Cross-org dependencies slow launches.",
      },
    ],
    hiringTrend: trend([9, 10, 11, 12, 14, 16], [3, 4, 4, 5, 6, 6]),
    similar: ["amazon", "swiggy", "razorpay"],
    openJobs: [
      { role: "UI Engineer II, Storefront", salary: "₹30L – ₹50L", location: "Bengaluru", match: 83 },
      { role: "Frontend Engineer, Myntra", salary: "₹26L – ₹42L", location: "Bengaluru", match: 80 },
    ],
    ai: {
      insights: [
        "Interview loops focus on **rendering fundamentals** — historically your strongest topic.",
        "Your SSR experience matches their **streaming SSR migration** announced in June.",
        "Onsite Bengaluru only — consistent with your location, no relocation friction.",
      ],
      pros: ["SSR story matches roadmap", "Bengaluru-local", "Big-event scale on resume"],
      cons: ["No remote", "Culture rating middling"],
      recommendation:
        "A sensible parallel application while Razorpay closes. Lead with the checkout LCP win — it mirrors their KPIs.",
      verdict: "consider",
      matchScore: 83,
    },
  },
];

/** Distinct industries — used for the industry filter. */
export const INDUSTRIES = Array.from(new Set(COMPANIES.map((c) => c.industry))).sort();

/** Distinct locations — used for the location filter. */
export const LOCATIONS = Array.from(new Set(COMPANIES.map((c) => c.location))).sort();

export function companyById(id: string): CompanyProfile | undefined {
  return COMPANIES.find((c) => c.id === id);
}

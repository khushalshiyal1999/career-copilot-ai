/**
 * Mock data for the Jobs module. Shapes mirror the future backend contract
 * so swapping in real queries is a drop-in change.
 */

export interface JobCompany {
  id: string;
  name: string;
  /** Brand accent used for the monogram tile. */
  color: string;
  verified: boolean;
  about: string;
}

export const JOB_COMPANIES = {
  google: {
    id: "google",
    name: "Google",
    color: "#4285F4",
    verified: true,
    about:
      "Google builds products used by billions — Search, Android, Cloud, and the Gemini family of AI models.",
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft",
    color: "#00A4EF",
    verified: true,
    about:
      "Microsoft powers productivity for the world with Windows, Azure, Office, and Teams.",
  },
  adobe: {
    id: "adobe",
    name: "Adobe",
    color: "#FA0F00",
    verified: true,
    about:
      "Adobe's Creative Cloud is the industry standard for design, photo, video, and creative AI tooling.",
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    color: "#1DB954",
    verified: true,
    about:
      "Spotify is the world's largest audio streaming platform, serving 600M+ listeners across 180 markets.",
  },
  netflix: {
    id: "netflix",
    name: "Netflix",
    color: "#E50914",
    verified: true,
    about:
      "Netflix entertains 280M+ members with series, films, and games — and engineers everything in-house.",
  },
  atlassian: {
    id: "atlassian",
    name: "Atlassian",
    color: "#0052CC",
    verified: true,
    about:
      "Atlassian builds Jira, Confluence, and Trello — collaboration tools for 300K+ companies, fully distributed.",
  },
  razorpay: {
    id: "razorpay",
    name: "Razorpay",
    color: "#3395FF",
    verified: true,
    about:
      "Razorpay is India's leading full-stack payments and banking platform for businesses.",
  },
  swiggy: {
    id: "swiggy",
    name: "Swiggy",
    color: "#FC8019",
    verified: true,
    about:
      "Swiggy is India's on-demand convenience platform — food delivery, Instamart, and Genie.",
  },
  zomato: {
    id: "zomato",
    name: "Zomato",
    color: "#E23744",
    verified: true,
    about:
      "Zomato connects 100M+ customers with restaurants across food delivery, dining, and Hyperpure.",
  },
  flipkart: {
    id: "flipkart",
    name: "Flipkart",
    color: "#2874F0",
    verified: true,
    about:
      "Flipkart is India's homegrown e-commerce leader, serving 500M+ registered users.",
  },
  amazon: {
    id: "amazon",
    name: "Amazon",
    color: "#FF9900",
    verified: true,
    about:
      "Amazon is Earth's most customer-centric company, from e-commerce to AWS to devices.",
  },
  meta: {
    id: "meta",
    name: "Meta",
    color: "#0866FF",
    verified: true,
    about:
      "Meta builds Facebook, Instagram, WhatsApp, and the Reality Labs hardware and metaverse platforms.",
  },
} satisfies Record<string, JobCompany>;

export type WorkMode = "remote" | "hybrid" | "onsite";
export type ExperienceLevel = "junior" | "mid" | "senior" | "lead";
export type EmploymentType = "full-time" | "contract" | "part-time";

export interface MatchReason {
  label: string;
  hit: boolean;
}

export interface Job {
  id: string;
  company: JobCompany;
  role: string;
  level: ExperienceLevel;
  /** Display string, native currency. */
  salaryLabel: string;
  /** USD-normalized bounds for filtering and sorting. */
  salaryUsdMin: number;
  salaryUsdMax: number;
  location: string;
  workMode: WorkMode;
  type: EmploymentType;
  postedHoursAgo: number;
  closingSoon: boolean;
  easyApply: boolean;
  visaSponsorship: boolean;
  match: number;
  resumeMatch: number;
  skills: string[];
  missingSkills: string[];
  /** One-line AI explanation shown on the card. */
  aiReason: string;
  /** Longer AI summary shown in the drawer. `**bold**` is highlighted. */
  aiSummary: string;
  matchReasons: MatchReason[];
  description: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const JOBS: Job[] = [
  {
    id: "job-google-gemini",
    company: JOB_COMPANIES.google,
    role: "Senior Frontend Engineer, Gemini",
    level: "senior",
    salaryLabel: "$168k – $210k",
    salaryUsdMin: 168000,
    salaryUsdMax: 210000,
    location: "Mountain View, CA",
    workMode: "hybrid",
    type: "full-time",
    postedHoursAgo: 3,
    closingSoon: false,
    easyApply: true,
    visaSponsorship: true,
    match: 96,
    resumeMatch: 93,
    skills: ["React", "TypeScript", "Web Performance", "AI/UX", "Testing"],
    missingSkills: ["Angular", "Closure"],
    aiReason:
      "Excellent match — your React + TypeScript depth and AI-product work mirror this team's stack.",
    aiSummary:
      "This is your strongest opening this week. The Gemini web team wants **senior React + TypeScript** engineers who have shipped **AI-facing UIs** — which is exactly your last two projects. Your resume already covers 9 of their 11 listed skills.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "TypeScript", hit: true },
      { label: "AI product UX", hit: true },
      { label: "Angular", hit: false },
    ],
    description: [
      "The Gemini web experience team builds the interface used by hundreds of millions of people to talk to Google's most capable AI models. You will own user-facing surfaces end to end — from streaming response rendering to multimodal input.",
      "This role sits at the intersection of frontend craft and applied AI: latency budgets are tight, interactions are novel, and the platform evolves weekly.",
    ],
    responsibilities: [
      "Design and ship core conversation surfaces in React and TypeScript.",
      "Partner with research to prototype new multimodal interactions.",
      "Own streaming-rendering performance across devices.",
      "Mentor engineers and raise the team's frontend bar.",
    ],
    requirements: [
      "6+ years building production web applications.",
      "Deep React and TypeScript expertise.",
      "Track record with performance-critical UIs.",
      "Interest in AI/LLM product experiences.",
    ],
    benefits: [
      "Comprehensive health, dental, and vision coverage",
      "Annual bonus + equity refreshers",
      "On-site meals and wellness stipend",
      "20% time for exploratory projects",
    ],
  },
  {
    id: "job-meta-reality",
    company: JOB_COMPANIES.meta,
    role: "Frontend Engineer, Reality Labs",
    level: "senior",
    salaryLabel: "$160k – $205k",
    salaryUsdMin: 160000,
    salaryUsdMax: 205000,
    location: "Remote — US",
    workMode: "remote",
    type: "full-time",
    postedHoursAgo: 6,
    closingSoon: true,
    easyApply: true,
    visaSponsorship: true,
    match: 94,
    resumeMatch: 91,
    skills: ["React", "Three.js", "TypeScript", "WebGL", "Design Systems"],
    missingSkills: ["WebXR", "C++"],
    aiReason:
      "Strong match — your design-system and interactive-UI work fits their spatial interface team.",
    aiSummary:
      "Reality Labs is hiring for **spatial web interfaces** and weighs design-system experience heavily — your component-library work covers that. Applications **close within 24 hours**, so this one should move to the top of your list.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "Design systems", hit: true },
      { label: "Remote", hit: true },
      { label: "WebXR", hit: false },
    ],
    description: [
      "Reality Labs builds the interfaces for Meta's AR/VR platforms. This team owns the 2D web surfaces that make headsets manageable — device setup, store, and companion experiences.",
      "You will ship React applications with unusually high interaction polish, working beside Rift-era graphics engineers and modern web specialists.",
    ],
    responsibilities: [
      "Build companion web experiences for Quest devices.",
      "Evolve the shared spatial design system.",
      "Prototype 3D-adjacent interactions with Three.js.",
      "Collaborate with hardware teams on launch surfaces.",
    ],
    requirements: [
      "5+ years of React in production.",
      "Strong TypeScript and modern CSS.",
      "Any WebGL/Three.js exposure is a plus.",
      "Comfort in ambiguous, fast-moving programs.",
    ],
    benefits: [
      "Remote-first with quarterly team weeks",
      "Top-of-band equity grants",
      "Quest hardware allowance",
      "Family-building and wellness support",
    ],
  },
  {
    id: "job-netflix-player",
    company: JOB_COMPANIES.netflix,
    role: "Lead UI Engineer, Player Experience",
    level: "lead",
    salaryLabel: "$185k – $240k",
    salaryUsdMin: 185000,
    salaryUsdMax: 240000,
    location: "Remote — US",
    workMode: "remote",
    type: "full-time",
    postedHoursAgo: 2,
    closingSoon: false,
    easyApply: false,
    visaSponsorship: true,
    match: 93,
    resumeMatch: 90,
    skills: ["React", "TypeScript", "Video", "Performance", "A/B Testing"],
    missingSkills: ["Rx.js", "Media codecs"],
    aiReason:
      "Strong match — your playback-performance work maps directly to their player UI charter.",
    aiSummary:
      "A **lead-level** opening on the surface every Netflix member touches. They want someone who has owned **performance-critical React** — your dashboard and player-adjacent work reads as a direct fit, though expect deep media-stack questions.",
    matchReasons: [
      { label: "React at scale", hit: true },
      { label: "Performance", hit: true },
      { label: "Remote", hit: true },
      { label: "Media codecs", hit: false },
    ],
    description: [
      "The Player Experience team owns the playback UI across web and TV — the most-used surface at Netflix. You will lead the technical direction for controls, timed overlays, and accessibility.",
      "Netflix engineering culture is context-over-control: you set direction, defend trade-offs, and ship without ceremony.",
    ],
    responsibilities: [
      "Set technical direction for the web player UI.",
      "Drive playback interaction latency below 100ms.",
      "Lead A/B experiments on new player features.",
      "Level up engineers through design reviews.",
    ],
    requirements: [
      "8+ years of frontend engineering.",
      "Prior technical leadership of a product surface.",
      "Expert React, TypeScript, and browser internals.",
      "Experience with experimentation platforms.",
    ],
    benefits: [
      "Top-of-market compensation, all-cash option",
      "Unlimited vacation policy",
      "Choice-of-stock program",
      "Premium family healthcare",
    ],
  },
  {
    id: "job-spotify-webplayer",
    company: JOB_COMPANIES.spotify,
    role: "React Engineer, Web Player",
    level: "mid",
    salaryLabel: "$135k – $175k",
    salaryUsdMin: 135000,
    salaryUsdMax: 175000,
    location: "Stockholm / Remote — EU",
    workMode: "remote",
    type: "full-time",
    postedHoursAgo: 8,
    closingSoon: false,
    easyApply: true,
    visaSponsorship: true,
    match: 91,
    resumeMatch: 92,
    skills: ["React", "TypeScript", "Redux", "Styled Components", "GraphQL"],
    missingSkills: ["Backstage"],
    aiReason:
      "Excellent match — the web player stack is nearly identical to your last two projects.",
    aiSummary:
      "Your resume matches **10 of 11** listed skills — the highest overlap in today's feed. The team ships weekly and values **state-management depth**, where your Redux work stands out. Visa sponsorship and relocation are covered.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "Redux", hit: true },
      { label: "GraphQL", hit: true },
      { label: "Backstage", hit: false },
    ],
    description: [
      "The Web Player team builds open.spotify.com — a full streaming client in the browser used by tens of millions daily. You will work on playback flows, library management, and the design system that powers both.",
      "Squads are autonomous: you will scope, build, test, and ship your own features with a designer and data scientist beside you.",
    ],
    responsibilities: [
      "Ship features across the web player and desktop shell.",
      "Maintain shared state architecture in Redux.",
      "Contribute to the Encore design system.",
      "Run experiments and act on listening data.",
    ],
    requirements: [
      "3+ years of React in production.",
      "Solid TypeScript and testing discipline.",
      "Experience with large shared codebases.",
      "EU work authorization or relocation interest.",
    ],
    benefits: [
      "Relocation package to Stockholm or full-remote EU",
      "6 months parental leave",
      "Annual wellness and learning budgets",
      "Spotify Premium, obviously",
    ],
  },
  {
    id: "job-atlassian-jira",
    company: JOB_COMPANIES.atlassian,
    role: "Fullstack Engineer, Jira Platform",
    level: "senior",
    salaryLabel: "$140k – $185k",
    salaryUsdMin: 140000,
    salaryUsdMax: 185000,
    location: "Remote — anywhere",
    workMode: "remote",
    type: "full-time",
    postedHoursAgo: 12,
    closingSoon: false,
    easyApply: true,
    visaSponsorship: false,
    match: 89,
    resumeMatch: 87,
    skills: ["React", "Node.js", "GraphQL", "TypeScript", "Kubernetes"],
    missingSkills: ["Java", "Kotlin"],
    aiReason:
      "Strong match — your component-library experience fits their platform team charter.",
    aiSummary:
      "Atlassian is **fully distributed** — work from anywhere, no office requirement. The platform team wants React engineers who can also hold their own in **Node + GraphQL** services. Your fullstack side projects close that gap.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "GraphQL", hit: true },
      { label: "Remote anywhere", hit: true },
      { label: "Java services", hit: false },
    ],
    description: [
      "Jira Platform owns the shared UI foundation used by every Jira product — issue views, editors, boards. Your components ship to 100K+ companies the week you merge them.",
      "The team is distributed across 6 time zones and works async-first, with strong written culture.",
    ],
    responsibilities: [
      "Build shared React components for all Jira products.",
      "Design GraphQL contracts with product teams.",
      "Improve performance budgets on the issue view.",
      "Write the docs and RFCs that keep async teams aligned.",
    ],
    requirements: [
      "5+ years across frontend and backend.",
      "Production React and GraphQL experience.",
      "Strong async written communication.",
      "Overlap with AEST or PST stand-ups.",
    ],
    benefits: [
      "Work from anywhere, permanently",
      "Annual TEAM Anywhere travel budget",
      "Equity + 10% bonus target",
      "5 paid volunteer days",
    ],
  },
  {
    id: "job-microsoft-teams",
    company: JOB_COMPANIES.microsoft,
    role: "Software Engineer II, Teams Calling",
    level: "mid",
    salaryLabel: "$145k – $190k",
    salaryUsdMin: 145000,
    salaryUsdMax: 190000,
    location: "Seattle, WA",
    workMode: "hybrid",
    type: "full-time",
    postedHoursAgo: 26,
    closingSoon: false,
    easyApply: false,
    visaSponsorship: true,
    match: 88,
    resumeMatch: 85,
    skills: ["React", "TypeScript", "WebRTC", "Redux", "Azure"],
    missingSkills: ["WebRTC", "C#"],
    aiReason:
      "Strong match — heavy React + TypeScript surface, and they train WebRTC internally.",
    aiSummary:
      "Teams Calling runs one of the **largest React codebases** in the industry. WebRTC is listed but the hiring manager's post says they **train it internally** — your realtime dashboard work is the transferable piece to lead with.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "TypeScript", hit: true },
      { label: "Realtime UI", hit: true },
      { label: "WebRTC", hit: false },
    ],
    description: [
      "The Calling team owns the in-meeting experience in Microsoft Teams — the stage, controls, and realtime state sync for 300M+ users.",
      "You will work on latency-sensitive UI where every render matters, backed by one of the largest TypeScript monorepos anywhere.",
    ],
    responsibilities: [
      "Ship in-meeting UI features across desktop and web.",
      "Optimize render performance during live calls.",
      "Integrate media telemetry into the client.",
      "Participate in a healthy on-call rotation.",
    ],
    requirements: [
      "3+ years of production React.",
      "Strong TypeScript fundamentals.",
      "Interest in realtime/media systems.",
      "CS degree or equivalent experience.",
    ],
    benefits: [
      "Hybrid: 2 days/week in Redmond campus",
      "ESPP + annual stock awards",
      "Industry-leading parental leave",
      "$1,500 annual learning budget",
    ],
  },
  {
    id: "job-amazon-checkout",
    company: JOB_COMPANIES.amazon,
    role: "Frontend Engineer II, Checkout",
    level: "mid",
    salaryLabel: "$150k – $195k",
    salaryUsdMin: 150000,
    salaryUsdMax: 195000,
    location: "Seattle, WA",
    workMode: "onsite",
    type: "full-time",
    postedHoursAgo: 30,
    closingSoon: true,
    easyApply: false,
    visaSponsorship: true,
    match: 86,
    resumeMatch: 84,
    skills: ["React", "Performance", "AWS", "A/B Testing", "Node.js"],
    missingSkills: ["AWS", "Java"],
    aiReason:
      "Strong match — your checkout-performance work is exactly what this team owns.",
    aiSummary:
      "Every millisecond on this page moves revenue, and your resume leads with a **checkout performance win** — mirror their language when you apply. Note: **closing soon** and strictly onsite in Seattle.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "Performance", hit: true },
      { label: "E-commerce", hit: true },
      { label: "AWS depth", hit: false },
    ],
    description: [
      "Checkout is the highest-stakes surface at Amazon — hundreds of millions of orders flow through it. The team obsesses over speed, clarity, and trust at the moment of purchase.",
      "You will run experiments that measure in basis points and ship to production behind one of the most rigorous testing cultures in e-commerce.",
    ],
    responsibilities: [
      "Own checkout page features from design to rollout.",
      "Drive Core Web Vitals improvements.",
      "Design and analyze large-scale A/B tests.",
      "Harden the UI against payment edge cases.",
    ],
    requirements: [
      "3+ years of frontend engineering.",
      "Demonstrated performance optimization wins.",
      "Comfort with experimentation at scale.",
      "Onsite in Seattle (relocation supported).",
    ],
    benefits: [
      "Relocation package",
      "RSU vesting with sign-on bridge",
      "Career Choice education funding",
      "20 weeks parental leave (birthing parent)",
    ],
  },
  {
    id: "job-adobe-cc",
    company: JOB_COMPANIES.adobe,
    role: "UI Engineer, Creative Cloud Web (Contract)",
    level: "mid",
    salaryLabel: "$80 – $105 / hr",
    salaryUsdMin: 160000,
    salaryUsdMax: 210000,
    location: "San Francisco, CA",
    workMode: "hybrid",
    type: "contract",
    postedHoursAgo: 50,
    closingSoon: false,
    easyApply: true,
    visaSponsorship: false,
    match: 84,
    resumeMatch: 82,
    skills: ["React", "TypeScript", "Web Components", "Spectrum", "Canvas"],
    missingSkills: ["Web Components", "Lit"],
    aiReason:
      "Good match — strong React overlap; their Spectrum design system resembles the one you built.",
    aiSummary:
      "A **12-month contract** bringing Photoshop workflows to the browser. Hourly rate nets out **above most full-time offers** here, but no visa sponsorship and hybrid SF. Your design-system background is the wedge — Spectrum is their Achilles' heel for hiring.",
    matchReasons: [
      { label: "React", hit: true },
      { label: "Design systems", hit: true },
      { label: "Canvas/graphics", hit: true },
      { label: "Web Components", hit: false },
    ],
    description: [
      "Creative Cloud Web brings Photoshop and Express workflows to the browser. This contract role sits on the shared UI shell — the chrome around the canvas that every web-based editor uses.",
      "You will work in React and Adobe's Spectrum design system, with an option to convert to full-time after 12 months.",
    ],
    responsibilities: [
      "Build editor chrome: panels, toolbars, asset browsers.",
      "Extend Spectrum components for editor use cases.",
      "Keep the shell responsive beside heavy canvas work.",
      "Pair with full-time engineers on architecture.",
    ],
    requirements: [
      "4+ years of production frontend work.",
      "Design-system contribution experience.",
      "Familiarity with canvas or WebGL rendering.",
      "Hybrid: 3 days/week in San Francisco.",
    ],
    benefits: [
      "$80–105/hr on W2 with benefits",
      "12-month term, conversion path",
      "Creative Cloud all-apps license",
      "Hardware of your choice",
    ],
  },
  {
    id: "job-razorpay-fe2",
    company: JOB_COMPANIES.razorpay,
    role: "Frontend Engineer II, Payments",
    level: "mid",
    salaryLabel: "₹28L – ₹45L",
    salaryUsdMin: 34000,
    salaryUsdMax: 54000,
    location: "Bengaluru, India",
    workMode: "hybrid",
    type: "full-time",
    postedHoursAgo: 5,
    closingSoon: false,
    easyApply: true,
    visaSponsorship: false,
    match: 92,
    resumeMatch: 94,
    skills: ["React", "TypeScript", "Redux", "Micro-frontends", "Jest"],
    missingSkills: ["Golang"],
    aiReason:
      "Excellent match — you already know their checkout SDK patterns from your current role.",
    aiSummary:
      "Your **highest resume-match** in India this week (94%). The payments dashboard team uses the exact **React + Redux + micro-frontend** setup you work in today, and your fintech background reads as a culture fit. Easy Apply is enabled — this is a 10-minute application.",
    matchReasons: [
      { label: "React + Redux", hit: true },
      { label: "Fintech domain", hit: true },
      { label: "Micro-frontends", hit: true },
      { label: "Golang", hit: false },
    ],
    description: [
      "The Payments dashboard is the control room for 10M+ businesses — settlements, refunds, disputes, and reporting. You will own high-traffic surfaces where correctness is non-negotiable.",
      "Razorpay's frontend platform is a micro-frontend architecture with a shared design system (Blade) and strong testing culture.",
    ],
    responsibilities: [
      "Ship merchant-facing dashboard features weekly.",
      "Contribute to the Blade design system.",
      "Own quality: unit, integration, and visual tests.",
      "Collaborate with API teams on contracts.",
    ],
    requirements: [
      "3–5 years of React experience.",
      "Strong fundamentals: JS, a11y, security basics.",
      "Fintech or payments exposure preferred.",
      "Hybrid: 3 days/week in Bengaluru.",
    ],
    benefits: [
      "ESOPs with liquidity events",
      "Health cover incl. parents",
      "Learning wallet + conference budget",
      "Relocation support to Bengaluru",
    ],
  },
  {
    id: "job-swiggy-consumer",
    company: JOB_COMPANIES.swiggy,
    role: "Senior Frontend Engineer, Consumer Web",
    level: "senior",
    salaryLabel: "₹35L – ₹55L",
    salaryUsdMin: 42000,
    salaryUsdMax: 66000,
    location: "Bengaluru / Remote — India",
    workMode: "remote",
    type: "full-time",
    postedHoursAgo: 10,
    closingSoon: true,
    easyApply: true,
    visaSponsorship: false,
    match: 87,
    resumeMatch: 86,
    skills: ["React", "Next.js", "Performance", "PWA", "GraphQL"],
    missingSkills: ["React Native"],
    aiReason:
      "Strong match — their Next.js + PWA stack lines up with your side-project portfolio.",
    aiSummary:
      "Swiggy's consumer web is a **Next.js PWA** under extreme performance constraints — low-end devices, flaky networks. Your Lighthouse-focused side projects are surprisingly relevant here. **Closing within 24 hours**, remote within India.",
    matchReasons: [
      { label: "Next.js", hit: true },
      { label: "PWA/performance", hit: true },
      { label: "Remote (India)", hit: true },
      { label: "React Native", hit: false },
    ],
    description: [
      "Consumer Web owns swiggy.com and the PWA that serves users on every device tier in India. Speed on a ₹8,000 phone over 3G is the bar.",
      "You will lead performance and architecture for high-traffic ordering flows, including IPL-scale event traffic.",
    ],
    responsibilities: [
      "Lead Next.js architecture for ordering flows.",
      "Own Core Web Vitals on low-end devices.",
      "Build offline-tolerant PWA capabilities.",
      "Mentor mid-level engineers on the squad.",
    ],
    requirements: [
      "5+ years frontend, 2+ with Next.js.",
      "Proven low-end device optimization.",
      "Experience with SSR/ISR trade-offs.",
      "Based in India (remote-friendly).",
    ],
    benefits: [
      "Remote within India",
      "ESOPs + annual bonus",
      "Monthly Swiggy One membership",
      "Device + internet allowance",
    ],
  },
  {
    id: "job-zomato-growth",
    company: JOB_COMPANIES.zomato,
    role: "Frontend Engineer, Growth",
    level: "mid",
    salaryLabel: "₹25L – ₹42L",
    salaryUsdMin: 30000,
    salaryUsdMax: 50000,
    location: "Gurugram, India",
    workMode: "hybrid",
    type: "full-time",
    postedHoursAgo: 74,
    closingSoon: false,
    easyApply: false,
    visaSponsorship: false,
    match: 79,
    resumeMatch: 77,
    skills: ["React", "Next.js", "A/B Testing", "Analytics", "SEO"],
    missingSkills: ["SEO at scale", "AMP"],
    aiReason:
      "Good match — growth-stack overlap is solid, but they weight SEO experience you have less of.",
    aiSummary:
      "A solid **growth engineering** role — experiments, funnels, landing pages at massive scale. The gap: they weight **programmatic SEO** heavily and your resume shows little of it. Worth applying if you like experiment-driven work; expect an SEO take-home.",
    matchReasons: [
      { label: "React + Next.js", hit: true },
      { label: "Experimentation", hit: true },
      { label: "SEO at scale", hit: false },
      { label: "Hybrid Gurugram", hit: true },
    ],
    description: [
      "Growth engineering owns the acquisition surfaces — landing pages, onboarding, and the SEO infrastructure that brings 100M+ monthly visits.",
      "The team ships fast, measures everything, and kills features without sentiment.",
    ],
    responsibilities: [
      "Build and iterate acquisition funnels.",
      "Own programmatic SEO page generation.",
      "Run experiments with the data science pod.",
      "Watch dashboards, not opinions.",
    ],
    requirements: [
      "2–4 years of React/Next.js.",
      "Experiment-driven development experience.",
      "Basic SEO and analytics fluency.",
      "Hybrid: Gurugram HQ.",
    ],
    benefits: [
      "ESOPs",
      "Zomato Gold membership",
      "Free meals at HQ",
      "Annual offsite",
    ],
  },
  {
    id: "job-flipkart-storefront",
    company: JOB_COMPANIES.flipkart,
    role: "UI Engineer II, Storefront",
    level: "mid",
    salaryLabel: "₹30L – ₹50L",
    salaryUsdMin: 36000,
    salaryUsdMax: 60000,
    location: "Bengaluru, India",
    workMode: "onsite",
    type: "full-time",
    postedHoursAgo: 28,
    closingSoon: false,
    easyApply: true,
    visaSponsorship: false,
    match: 83,
    resumeMatch: 81,
    skills: ["React", "TypeScript", "SSR", "Webpack", "Performance"],
    missingSkills: ["Rendering infra", "Java"],
    aiReason:
      "Good match — strong React/SSR overlap; Big Billion Days scale is the step up.",
    aiSummary:
      "Storefront serves **Big Billion Days** traffic — one of the largest e-commerce load events anywhere. Your SSR experience matches, and the interview loops focus on **rendering fundamentals** where you test well. Onsite Bengaluru only.",
    matchReasons: [
      { label: "React + SSR", hit: true },
      { label: "TypeScript", hit: true },
      { label: "Infra at scale", hit: false },
      { label: "Onsite Bengaluru", hit: true },
    ],
    description: [
      "Storefront owns the homepage, category, and product pages for India's biggest e-commerce event days. Rendering strategy is a business decision here.",
      "You will work on the SSR pipeline and the component platform used by every storefront team.",
    ],
    responsibilities: [
      "Build storefront pages and shared components.",
      "Tune the SSR/streaming render pipeline.",
      "Prepare surfaces for event-scale traffic.",
      "Contribute to the internal component platform.",
    ],
    requirements: [
      "3+ years with React and SSR.",
      "Solid TypeScript and bundler knowledge.",
      "Performance profiling experience.",
      "Onsite in Bengaluru.",
    ],
    benefits: [
      "ESOPs + performance bonus",
      "Medical cover incl. parents",
      "Flipkart discount program",
      "Relocation assistance",
    ],
  },
];

/** Distinct skills across all jobs — used for the tech-stack filter. */
export const ALL_SKILLS = Array.from(
  new Set(JOBS.flatMap((job) => job.skills))
).sort();

/** Distinct locations — used for the location filter. */
export const ALL_LOCATIONS = Array.from(
  new Set(JOBS.map((job) => job.location))
).sort();

export function matchTier(match: number): {
  label: string;
  badgeVariant: "success" | "info" | "warning" | "draft";
} {
  if (match >= 90) return { label: "Excellent Match", badgeVariant: "success" };
  if (match >= 80) return { label: "Strong Match", badgeVariant: "info" };
  if (match >= 70) return { label: "Good Match", badgeVariant: "warning" };
  return { label: "Fair Match", badgeVariant: "draft" };
}

export function postedLabel(hoursAgo: number): string {
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const days = Math.floor(hoursAgo / 24);
  return days === 1 ? "1d ago" : `${days}d ago`;
}

# CareerCopilot AI — Product Architecture & Functional Specification

**Version:** 1.0 · **Date:** August 2026 · **Status:** Pre-backend specification
**Source of truth:** the implemented frontend (`frontend/src`), which runs entirely on realistic mock data. Every feature listed below exists in the UI today unless explicitly marked under *Missing Features*.

---

## 1. Product Summary

CareerCopilot AI is an AI-first job-search workspace. It behaves like an **AI employee** that finds jobs, tailors resumes, applies within user-defined rules, tracks every application, researches companies, and reports on performance — while the user supervises through eight modules:

| Module | Route | One-line purpose |
|---|---|---|
| Dashboard | `/dashboard` | Daily starting point — status of everything at a glance |
| Jobs | `/jobs` | AI-ranked job feed from connected boards |
| Applications | `/applications` | Personal ATS — every application from submission to offer |
| Companies | `/companies` | AI company research: where to apply before applying |
| Resume Manager | `/resumes` | AI resume workspace: versions, ATS scoring, tailoring |
| Automation Center | `/automation` | Mission control for autonomous workflows |
| Analytics | `/analytics` | Career intelligence: what works, what to improve |
| Settings | `/settings` | Career Control Center: everything the AI knows and how it behaves |

A shared app shell provides: sidebar navigation, top navbar with global search, notification menu, theme switcher (light/dark/system), breadcrumbs, and user menu.

**Persona used throughout the mock data:** Aarav Sharma — Senior Frontend Engineer, Bengaluru, 7 years of React/TypeScript, active processes at Google (Technical R2), Razorpay (HR round), Microsoft (live offer), Spotify (panel scheduled), Netflix (screening). All modules tell this one consistent story; the backend must preserve this cross-module consistency (single data spine, not per-module silos).

---

## 2. Module Specifications

### 2.1 Dashboard

**Purpose.** The daily launchpad. Answers "what happened while I was away and what should I do right now?" without opening any other module.

**Main features.**
- Personalized hero greeting with ambient AI background
- Stats grid (animated KPI counters)
- AI Recommendation banner (single highest-value next action)
- Job Matches — top AI-ranked roles with match %
- Recent Applications — latest pipeline entries with status
- Automation Status — running state, next scan, jobs scanned, scan-cycle progress
- AI Insights — short observations from the assistant
- Resume Health — active resume's score summary
- Activity Timeline — recent events across the product

**User actions.** Navigate to any module from each widget; open a matched job; open a recent application; "Manage automation" shortcut.

**AI features.** Daily recommendation; job-match ranking; insight feed; resume-health summary.

**Future backend requirements.** Aggregation/read-model endpoint composing data from all other modules; per-user KPI computation; recent-activity event store; caching (dashboard is read-heavy); personalization of the daily recommendation.

**Relationships.** Pure consumer — reads from Jobs, Applications, Resumes, Automation, Analytics and deep-links into each. It is the read-model over every other module's events.

---

### 2.2 Jobs

**Purpose.** Discovery. Surfaces roles from connected sources, ranked by AI match against the user's active resume and preferences, so the user (or automation) can decide what to pursue.

**Main features.**
- Filter rail: work mode, level, employment type, salary bounds, minimum match, skills, location, easy-apply/visa flags (desktop rail + mobile sheet)
- Toolbar: text search, sort (match/recency/salary), grid–list toggle, refresh, **AI Search**
- Smart Chips — one-tap AI filter presets
- Job cards: company mark + verified badge, role, salary, location, work-mode/type badges, closing-soon flag, skills, match ring, one-line AI reason
- Job detail drawer: AI summary, match analysis (resume match %, hit/miss reasons, missing skills), description, responsibilities, requirements, benefits, about company
- AI assistant rail: feed commentary, top-3 picks, bulk actions
- Result count line, skeleton loading, empty state with "let AI search wider"

**User actions.** Search; filter; sort; switch view; save/unsave job; apply / easy-apply; hide ("not interested") with undo; open details; refresh feed; run AI search; apply preset chips; "Apply to top matches"; navigate to Resume Manager ("Improve Resume").

**AI features.** Match scoring (0–100) with explainable hit/miss reasons; resume-match %; per-job AI reason and long-form summary; feed re-ranking (AI Search); preset smart filters; top-picks curation; missing-skill detection per job.

**Future backend requirements.** Job ingestion pipelines per source (scrape/API sync); dedup; full-text search; faceted filtering + sorting; salary normalization across currencies; match-scoring service (resume × job description); saved/hidden state per user; apply orchestration (Easy Apply vs external redirect); pagination; feed refresh/webhooks; "closing soon" TTL logic.

**Relationships.** Jobs → Applications (applying creates an application). Jobs ← Resume Manager (match % computed against active resume). Jobs ← Settings (preferences drive filters/defaults). Jobs ← Automation (workflows scan and pre-filter this feed). Jobs → Companies (company on a card links to research).

---

### 2.3 Applications

**Purpose.** A personal ATS. One place that answers "where does every application stand?" — 128 applications tracked from submission through offer/rejection.

**Main features.**
- Pipeline summary: 7 clickable stage cards (Applied, Screening, Interview, Technical Round, HR Round, Offer, Rejected) with count, weekly trend, share-of-pipeline bar
- Toolbar: search, status filter, company filter, date-range filter, **AI filter** (needs follow-up / interview this week / high match / going stale), 6 sorts, Add Application dialog, Import menu (LinkedIn/Greenhouse/Lever/CSV)
- Two-panel layout: application list + rich detail panel (drawer on mobile)
- List rows: logo, role, company, source, applied date, salary, location, stage badge (status-colored), next-interview countdown chip, priority indicator, AI match %
- Detail panel: meta grid (salary, location, recruiter, source, applied, resume/cover-letter used), AI analysis bubbles, suggested actions, upcoming-interview card (countdown, join link, prepare), vertical event timeline, notes (add inline), attachments (download), links
- Status color language: Applied/Screening/Interview/Offer/Rejected/Withdrawn/Accepted
- Skeletons, AI empty state, honest summary line (offers on the table, interviews this week)

**User actions.** Search/filter/sort; click a pipeline stage to filter; select application; add application manually; import; send follow-up (writes a timeline event); add note; download attachment; open links; join meeting; prepare interview; tailor resume again; view similar jobs.

**AI features.** Per-application insights ("no follow-up in 6 days", recruiter response-time patterns, company response rates, resume match); AI filters; follow-up drafting; interview prep pack generation; stale-application detection.

**Future backend requirements.** Application CRUD + stage/status state machine; timeline event log per application; notes CRUD; file attachments (upload/store/download); interview scheduling records; recruiter records; import connectors + CSV parser with dedup; reminder/notification jobs (follow-up nudges, interview countdowns); email/ATS-reply detection to auto-advance stages; per-company response-rate statistics.

**Relationships.** Applications ← Jobs (created on apply). Applications ← Resume Manager (which resume/cover letter was used — feeds resume performance). Applications → Analytics (funnel, response rates). Applications ↔ Automation (auto-submitted apps land here; follow-up workflow acts on stale ones). Applications → Companies (per-company history informs research verdicts). Applications → Dashboard (recent applications widget).

---

### 2.4 Companies

**Purpose.** Pre-application research. A LinkedIn + Glassdoor + Crunchbase blend with an AI verdict per company: *should you apply, and why?*

**Main features.**
- Filter rail: industry, company size, location, hiring status, remote-only, salary-rating and culture-rating minimums, saved-only
- Toolbar: search (names/industries/tech), saved toggle, 6 sorts, grid–list view
- Company cards: logo, verified, industry, location, size, founded, open positions, hiring-status badge, remote badge, avg salary, AI hiring score, culture/salary star ratings, response rate, Save / Follow / View Profile
- Profile drawer: header stats (employees, salary range, funding stage, response rate); **AI "Should you apply?"** card (verdict badge, insight bubbles, pros/cons, recommendation); 6-month hiring-trend chart (jobs opened vs interview invites); open jobs (Apply/Save/Compare) with match %; tech stack; products; numbered hiring process + interview difficulty; culture + benefits; employee reviews (pros/cons/rating/department); offices; recent news; Website/LinkedIn/Glassdoor links; similar companies (navigates drawer)
- AI insights rail: cross-company synthesis, ranked "apply next" top 3, research actions
- Skeletons, AI empty state

**User actions.** Search/filter/sort; save company; follow/unfollow; open profile; apply/save/compare an open job; watch for matches; deep-research top 3; enable hiring-change digest; hop between similar companies.

**AI features.** AI hiring score per company; apply/consider/wait verdict with pros/cons and recommendation; insights grounded in the user's own history (live offer at Microsoft, prior Adobe rejection, Amazon withdrawal); hiring-trend analysis; similar-company suggestions; cross-company ranking.

**Future backend requirements.** Company profile store + enrichment pipelines (news, funding, reviews, tech stack); follow/save state; per-user × company statistics (response rate, process history); hiring-trend aggregation; review ingestion or licensing; watch-alerts (new matching role at followed company); similar-company graph; scheduled deep-research jobs.

**Relationships.** Companies ← Applications (history drives verdicts). Companies → Jobs (open roles link to the feed/apply). Companies ← Settings (preferred/blacklisted company lists). Companies → Analytics (company analytics leaderboards). Companies ← Automation (Greenhouse Monitor watches company boards).

---

### 2.5 Resume Manager

**Purpose.** An AI resume workspace, not file storage. Keeps every resume scored, versioned, and continuously improving; produces tailored versions and cover letters for applications.

**Main features.**
- Three columns: Resume Library / live document preview / AI assistant (sheets on smaller screens)
- Library cards: name, target role, ATS score, status (Optimized/Draft/Needs work), version, file type, active-resume star, last updated; actions: set active, duplicate, rename, download, delete (undo)
- Create New Resume dialog (name, target role, template)
- Document preview: letterhead, summary, skills, experience, education, projects, certificates — restyled live by template
- Version switcher + "viewing old version" banner; version compare dialog (any two versions, Added/Removed/Changed diffs, AI improvement summary)
- ATS score card: animated ring + Formatting/Keywords/Structure/Readability bars
- AI panel: analysis findings (impact, +ATS, difficulty), quick-apply suggestion cards that **actually raise the score**, skills analysis (matched/missing/trending/suggested), potential-points counter
- AI actions: Optimize Resume (applies all pending), Tailor for Job (creates a real new version), Generate Cover Letter, Export PDF, Generate DOCX, Analyze ATS
- Cover letters list (download/regenerate); template gallery (6 templates); activity feed; skeletons; AI empty state with "Create with AI" / upload

**User actions.** Select/create/duplicate/rename/download/delete resume; set active; switch versions; compare versions; change template; apply suggestion; optimize; tailor; generate cover letter; export PDF/DOCX; re-analyze ATS; regenerate/download cover letters; upload (empty state).

**AI features.** ATS scoring with dimension breakdown; analysis findings with estimated score impact and difficulty; one-click suggestion application; auto-tailoring per job (new version with diff); cover-letter generation grounded in resume + posting; skills-gap analysis; version-over-version improvement summaries; profile-seeded resume drafting.

**Future backend requirements.** Resume CRUD + immutable version history with diffs; file upload + parsing (PDF/DOCX → structured resume); ATS-scoring service; LLM services for tailoring/rewrites/cover letters; PDF/DOCX rendering & export; template engine; per-version performance stats (joined from Applications); document storage; activity event log.

**Relationships.** Resume Manager → Jobs (match scores computed against active resume). Resume Manager → Applications ("resume used" per application). Resume Manager ↔ Automation (Resume Optimizer workflow; auto-tailor on apply). Resume Manager → Analytics (V1/V2/V3 performance comparison). Resume Manager ← Settings (automation resume selection, auto-tailor toggles).

---

### 2.6 Automation Center

**Purpose.** The flagship. Mission control for the AI employee: 8 workflows that scan, score, tailor, apply, remind, and follow up — with full transparency into every decision and log line.

**Main features.**
- Overview strip: 7 live cards (Automation Status, Running Jobs, Jobs Found Today, Applications Submitted, Resumes Optimized, Interviews Scheduled, Success Rate) with animated counters
- Workflow list: Daily Job Search, LinkedIn Auto Scan, Wellfound Scan, Greenhouse Monitor, Resume Optimizer, Cover Letter Generator (paused), Interview Reminder, Application Follow-up (failed/retrying) — each with status, last/next run, execution count, success %
- Workflow detail: description, schedule, recent-results chips, latest-run timeline (e.g. 09:00 scan → 24 jobs → AI analysis → 3 resumes optimized → 5 applied → digest sent), **AI decisions** (Selected with reason chips vs Skipped with reasons), rules grid, connected-source chips, execution-log table (time/source/action/result/duration/status) with search, status filter, export
- Controls: Run Now, Pause/Resume, Duplicate, Delete (undo)
- Right rail: AI assistant (insights + Optimize Resume / Raise Daily Limit / Review Skipped / Tailor Resume / **Pause All**), live activity feed (ticks every few seconds; counters climb), notifications list
- Job Sources grid: 8 sources with connection status, jobs scanned, last sync, success rate, Reconnect (Workday starts errored, Ashby syncing)
- Skeletons; empty state with "restore default workflows"

**User actions.** Select workflow; run now; pause/resume one; pause all; duplicate; delete; search/filter/export logs; reconnect a source; raise daily limit (edits the rule); review skipped jobs (navigates to decisions).

**AI features.** Rule-based + match-threshold job selection with explainable skip reasons; auto resume tailoring; auto cover letters; auto follow-ups; interview prep automation; assistant insights over the fleet (skipped-job diagnosis, limit recommendations, resume-version performance); early-bird posting alerts.

**Future backend requirements.** Workflow engine (schedules/cron, event triggers, retries, rate-limit handling); job queue + workers; execution logging & audit trail; decision records (selected/skipped + reasons); source connectors with OAuth/session management and health checks; real-time updates (WebSocket/SSE) for the live feed and counters; notification fan-out; per-workflow rule storage; quota/limit enforcement; failure alerting.

**Relationships.** Automation is the actor across everything: reads Jobs sources → writes Applications → invokes Resume Manager (tailor/optimize/cover letters) → respects Settings (limits, schedules, rules, AI aggressiveness) → emits events consumed by Dashboard, Analytics, and Notifications. Its source health mirrors Settings › Connected Accounts.

---

### 2.7 Analytics

**Purpose.** The career coach's review. Answers "how is my search performing and what should I improve?" — every number consistent with the rest of the app.

**Main features.**
- 8 KPI cards with animated values and month-over-month trends (Applications, Interviews, Offers, Response Rate, Interview Rate, Avg AI Match, Resume Score, Automation Success)
- Career Score card: 91/100 ring + 6 dimension bars (Resume, Skills, Applications, Interview Performance, Automation, Networking) with weakest-dimension callout
- Application funnel: Applied → Viewed → HR → Technical → Manager → Offer → Accepted with conversion % and biggest-drop-off insight
- Applications-over-time SVG chart with 7d / 30d / 90d / 1y switcher
- Resume performance: V1 vs V2 vs V3 across interview rate, offer rate, ATS, response rate, match — best highlighted
- Job source performance: layered bars (apps/interviews/offers) + success % for 7 sources
- Company analytics: top responsive, highest paying, fastest hiring, most applied, active processes
- Skills & market demand: demand bars, have/missing flags, trending badges
- Salary analytics: expected vs average/highest offer vs market, growth, desired-vs-received bars
- Automation analytics: scanned/qualified/submitted/skipped/optimizations/cover letters
- Right rail: AI insights with action buttons; Weekly Report (stats, best company, weakest area, recommendation); Goals with progress bars and add-goal form
- Export menu (PDF / CSV / PNG); skeletons; responsive

**User actions.** Switch timeline range; hover chart tooltips; add goals; export; follow insight actions into Resumes/Settings/Companies; raise automation limit.

**AI features.** Cross-module insight synthesis (best resume version, best-responding segment, best send-time, skill-gap impact estimate); weekly AI report with recommendation; career-score computation; goal tracking.

**Future backend requirements.** Analytics warehouse / event aggregation across all modules; time-series rollups; funnel computation; cohort comparisons (month-over-month); scheduled weekly-report generation (LLM summary over stats); goals CRUD + progress computation; export rendering (PDF/CSV/image); market-demand data feed for skills and salaries.

**Relationships.** Pure consumer of everything: Applications (funnel, rates), Resumes (version performance), Jobs (match averages), Automation (workflow stats), Companies (leaderboards), Settings (expected salary, skills). Its insights link back out to Resumes, Settings, and Companies.

---

### 2.8 Settings (Career Control Center)

**Purpose.** The single place that shapes AI behavior everywhere: who the user is, what they want, and how boldly the AI may act.

**Main features.**
- Persistent AI profile summary above all sections (competitiveness read, skill-boost suggestion that actually edits the skills list, salary calibration) + "all changes saved automatically" indicator
- **Profile:** photo, name, email, phone, location, timezone, portfolio/GitHub/LinkedIn/website, bio with character count
- **Career:** current/expected role, experience, notice period, current/expected salary, employment type, visa/relocate/remote toggles, preferred companies & domains chips, **skills list with drag-to-reorder and cyclable High/Medium/Low priority**
- **Job Preferences:** location chips, remote/hybrid/onsite toggles, salary band, company-type checkboxes, whitelist/blacklist chips, 8 source toggles
- **Automation:** daily apply limit, minimum match, working hours, schedule, resume selection, auto-tailor/cover-letter/follow-up toggles, master pause
- **AI Preferences:** Conservative/Balanced/Aggressive radio cards; explain-decisions, resume suggestions, tailor-every-resume, cover letters, interview coaching, learning mode
- **Connected Accounts:** 7 integrations with status/last sync/reconnect/disconnect
- **Notifications:** channels (email/browser/desktop) × types (interview/job/automation/weekly report)
- **Security:** password, 2FA, sessions & devices with revoke, API keys (future), delete account with confirm dialog
- **Billing (future):** free beta plan + Pro waitlist
- **About:** version, changelog
- **Activity:** live timeline of every settings change

**User actions.** Edit any field; reorder/re-prioritize/add/remove skills; manage chips; toggle switches; reconnect/disconnect accounts; revoke sessions; enable 2FA; delete account (confirmed); join Pro waitlist; apply AI suggestions.

**AI features.** Profile summary with market positioning; skill-priority suggestions; salary calibration; learning mode (AI learns from accepted suggestions).

**Future backend requirements.** User profile CRUD; preference storage consumed by all other services; OAuth integration management + token refresh; auth (password, 2FA, sessions, device management); settings audit log; notification-preference enforcement; account deletion/GDPR export; plan/billing scaffolding.

**Relationships.** Settings is the configuration source for everything: preferences → Jobs filtering & matching; rules/limits/schedules → Automation; skills & career data → match scoring, Analytics, and the AI summary; connected accounts → Automation sources and Applications import; notification prefs → all alert-producing modules.

---

## 3. Global Product Flow

```
Register / Sign in
      ↓
Complete Profile (Settings: profile, career, skills, preferences)
      ↓
Upload / Create Resume  →  AI Analysis (ATS score, findings, suggestions)
      ↓
Connect Accounts & Sources (LinkedIn, Greenhouse, …)
      ↓
Search Jobs (AI-matched feed)  ←—— Research Companies (should I apply?)
      ↓
Save Jobs → Apply (manual)          Configure Automation (rules, limits, schedule)
      ↓                                   ↓
Applications created  ←——— Automation applies within rules (tailored resume + cover letter)
      ↓
Track Applications (stages, timeline, notes, follow-ups)
      ↓
Interviews (reminders, prep packs, countdown)  →  Offers (negotiate; AI compares)
      ↓
Analytics reviews everything (funnel, resume versions, sources, salary)
      ↓
AI recommendations → adjust Settings / Resume / Automation → loop continues
```

The product is a **closed improvement loop**: outcomes recorded in Applications feed Analytics, whose insights adjust Settings/Resumes/Automation, which change future Jobs outcomes.

---

## 4. Canonical Entities (shared data spine)

These recur across modules and should be modeled once, not per module:

**User & Profile** · **Skill** (with priority) · **Preference set** · **Job** (posting, source, salary-normalized) · **Company** (profile, enrichment, per-user stats) · **Application** (stage machine, timeline events, notes, attachments, interviews, recruiter) · **Resume** (versions, diffs, ATS breakdown) · **Cover Letter** · **Workflow** (rules, runs, logs, decisions) · **Source/Integration** (connection health) · **Notification** · **Activity Event** (global feed) · **Goal** · **AI Insight/Recommendation** (generated, actionable, dismissible).

Cross-cutting backend needs implied everywhere: authentication/authorization, per-user data isolation, LLM service layer with explainability (every AI claim in the UI cites a reason), event bus feeding Dashboard/Analytics/Notifications, background job infrastructure, file storage, real-time channel, and full-text search.

---

## 5. Master Feature List (by module)

**Dashboard:** hero greeting · KPI stats grid · AI daily recommendation · job matches widget · recent applications widget · automation status widget · AI insights widget · resume health widget · activity timeline.

**Jobs:** multi-facet filters · search · sort · grid/list · smart chips · AI search/re-rank · match ring + tier · AI reason & summary · match analysis with hit/miss reasons · missing skills · save/hide/apply/easy-apply · closing-soon & visa badges · job drawer · AI rail with top picks & bulk apply · refresh · skeletons · empty state.

**Applications:** 7-stage pipeline cards with trends · search + status/company/date/AI filters · 6 sorts · add & import · two-panel + mobile drawer · rich rows (countdown chips, priority, match) · detail meta grid · AI analysis + actions (follow-up, prep, tailor, similar jobs) · interview card with join/countdown · event timeline · notes · attachments · links · status color system · summary line · skeletons · empty state.

**Companies:** 9 filters · search · saved toggle · 6 sorts · grid/list · rich cards (AI score, ratings, response rate) · follow & save · profile drawer (overview, mission, products, tech stack, benefits, culture, process, difficulty, salary range, offices, open jobs w/ apply-save-compare, news, links, reviews) · hiring-trend chart · AI verdict with pros/cons/recommendation · similar-company navigation · AI rail with ranked next-applies · watch for matches · deep research · skeletons · empty state.

**Resume Manager:** library with statuses & active flag · create/duplicate/rename/download/delete · templates (6) · live document preview · version history + old-version banner · version compare with diffs & AI summary · ATS ring + 4-dimension breakdown · findings (impact/Δscore/difficulty) · one-click suggestions that move the score · optimize · tailor-for-job (new version) · cover-letter generate/regenerate/download · export PDF/DOCX · analyze ATS · skills analysis · activity feed · skeletons · empty state.

**Automation Center:** 7 live overview cards · 8 workflows with status/schedule/next run/success · run-now/pause/resume/duplicate/delete · latest-run timeline · AI decisions (selected vs skipped with reasons) · rules grid · connected-source chips · log table with search/filter/export · AI rail with functional actions incl. pause-all & raise-limit · live activity feed with climbing counters · notifications · sources grid with reconnect · skeletons · empty state.

**Analytics:** 8 KPI cards with deltas · career score ring + 6 bars · application funnel with conversions · timeline chart with 4 ranges · resume V1/V2/V3 comparison · source performance bars · company leaderboards ×5 · skills demand bars · salary analytics + desired-vs-received · automation stats · AI insights with cross-module actions · weekly report · goals with add form · export PDF/CSV/PNG · skeletons.

**Settings:** AI profile summary with working actions · profile/career/skills (drag-reorder, priorities) · job preferences (modes, bands, lists, sources) · automation config + master pause · AI aggressiveness + 6 behavior toggles · connected accounts (reconnect/disconnect) · notification matrix · security (password, 2FA, sessions, delete) · billing preview · about/changelog · live settings activity log · autosave indicator.

**Shell:** sidebar + mobile nav · global search bar · notifications menu · theme switcher · breadcrumbs · user menu · toasts throughout · error boundary, loading, and not-found pages.

---

## 6. Missing Features (to specify before backend build — not yet implemented)

**Authentication & onboarding**
1. Register / login / OAuth sign-in (the app currently boots straight into the dashboard as a guest)
2. First-run onboarding wizard (profile → resume upload → source connect → first scan)

**Interviews**
3. Dedicated Interview Hub (all interviews across applications in one calendar/list — currently scattered per application)
4. Calendar integration (Google Calendar exists as a "connected account" but no calendar view/sync UI)
5. Interview preparation workspace (prep packs are toast-only today: question banks, mock interview, notes per round)
6. Post-interview feedback capture (feeds "Interview Performance" in the career score, which nothing currently measures)

**Offers & negotiation**
7. Offer comparison / negotiation workspace (Microsoft-vs-Google tension exists in copy only)
8. Deadline tracking for expiring offers with alerts

**Communication**
9. Real notification center with read/unread, history, and preference enforcement (current menu is static)
10. Email/message thread view per application (recruiter conversations; reply detection is only implied)
11. Outreach composer (the "follow-up sent" action has no editable draft surface)

**Content & files**
12. Real file upload flows (resume upload, attachments — currently toasts)
13. Resume editor (content is display-only; suggestions "apply" without an editable document)
14. Cover-letter viewer/editor (letters are list rows without an open/edit view)

**Discovery & tracking**
15. Job compare view ("Compare" buttons exist with no destination)
16. Saved-jobs view (saving exists; there is no saved list page/filter on Jobs)
17. Global search results page (top-bar search is UI-only)
18. Networking/referral tracker (Networking scores 62 in Analytics but no module manages contacts)

**Platform**
19. Pagination / infinite scroll for large lists (128 applications render in one list)
20. Data export & account deletion flows that actually produce artifacts (GDPR)
21. Real-time sync layer for live feeds (currently simulated with timers)
22. Billing & plans (marked Future in Settings)
23. Mobile push notifications (desktop/browser toggles exist; no push registration)
24. Team/coach sharing (share read-only pipeline or analytics with a mentor) — optional, noted for roadmap

---

*End of specification. This document is the input for Architecture Phase — Step 2 (backend architecture).*

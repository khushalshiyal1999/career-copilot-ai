# Job AI — Frontend

Production-ready Next.js 16 (App Router, Turbopack) frontend.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Tech stack

- **Framework**: Next.js 16 · React 19 · TypeScript
- **Styling**: Tailwind CSS v4 · Shadcn UI · Lucide React · tw-animate-css
- **Data**: TanStack Query · Axios
- **State**: Zustand
- **Forms**: React Hook Form · Zod (`@hookform/resolvers`)
- **UX**: Framer Motion · Sonner (toasts) · Recharts · React Day Picker
- **Theming**: next-themes (dark/light/system)

## Folder structure

```
src/
  app/            # App Router pages, layouts, error/loading/404 boundaries
  components/
    ui/           # Shadcn primitives (button, input, card, dialog, …)
    layout/       # Shell components (header, sidebar, …)
    dashboard/    # Feature components
    jobs/
    resume/
    analytics/
    automation/
    settings/
    common/       # Shared components (loading, error-boundary, theme-toggle)
  hooks/          # Reusable React hooks
  lib/            # Core setup (axios instance, cn utility)
  services/       # API layer — one <feature>.service.ts per feature
  store/          # Zustand stores
  utils/          # Pure helper functions
  types/          # Shared TypeScript types
  constants/      # Config, routes, breakpoints
  providers/      # Theme / Query / Toast providers composed in providers/index.tsx
  assets/         # Static assets imported by components
  styles/         # globals.css (theme tokens, breakpoints)
```

## Conventions

- Absolute imports via `@/*` (e.g. `import { Button } from "@/components/ui/button"`)
- Theme tokens are CSS variables in `src/styles/globals.css`; consume them via Tailwind classes (`bg-background`, `text-primary`, …)
- Add Shadcn components with `npx shadcn@latest add <name>`
- Data fetching: service function in `src/services` + TanStack Query hook in the feature folder
- Client-side global state lives in `src/store` (Zustand); server state belongs to TanStack Query

## Scripts

| Script          | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start dev server (Turbopack)      |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | Run ESLint                        |

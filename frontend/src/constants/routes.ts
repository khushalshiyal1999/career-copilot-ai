export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  jobs: "/jobs",
  applications: "/applications",
  companies: "/companies",
  resumes: "/resumes",
  automation: "/automation",
  analytics: "/analytics",
  settings: "/settings",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

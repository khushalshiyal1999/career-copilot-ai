export const APP_CONFIG = {
  name: "CareerCopilot AI",
  description: "AI-powered job application platform",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  timeout: 30_000,
} as const;

export const QUERY_CONFIG = {
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  retry: 1,
} as const;

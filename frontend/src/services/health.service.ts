import { apiClient } from "@/lib/axios";

// Example service — every feature (jobs, resume, analytics, …) gets its own
// <feature>.service.ts exposing plain async functions consumed by TanStack Query.
export const healthService = {
  async check(): Promise<{ status: string }> {
    const { data } = await apiClient.get<{ status: string }>("/health");
    return data;
  },
};

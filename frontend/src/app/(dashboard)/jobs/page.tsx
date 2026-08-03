import type { Metadata } from "next";

import { JobsExplorer } from "@/components/jobs";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Jobs",
};

export default function JobsPage() {
  return (
    <PageContainer
      title="Jobs"
      subtitle="AI-ranked opportunities from your connected job boards."
      className="max-w-(--breakpoint-2xl)"
    >
      <JobsExplorer />
    </PageContainer>
  );
}

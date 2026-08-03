import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { ResumeWorkspace } from "@/components/resume";

export const metadata: Metadata = {
  title: "Resume Manager",
};

export default function ResumesPage() {
  return (
    <PageContainer
      title="Resume Manager"
      subtitle="An AI workspace that keeps every resume scored, versioned, and improving."
      className="max-w-(--breakpoint-2xl)"
    >
      <ResumeWorkspace />
    </PageContainer>
  );
}

import type { Metadata } from "next";

import { ApplicationsTracker } from "@/components/applications";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Applications",
};

export default function ApplicationsPage() {
  return (
    <PageContainer
      title="Applications"
      subtitle="Your personal ATS — every application, from submission to offer."
      className="max-w-(--breakpoint-2xl)"
    >
      <ApplicationsTracker />
    </PageContainer>
  );
}

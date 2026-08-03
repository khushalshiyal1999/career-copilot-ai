import type { Metadata } from "next";

import { AnalyticsCenter } from "@/components/analytics";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <PageContainer
      title="Analytics"
      subtitle="What's working, what isn't, and what to improve next."
      className="max-w-(--breakpoint-2xl)"
    >
      <AnalyticsCenter />
    </PageContainer>
  );
}

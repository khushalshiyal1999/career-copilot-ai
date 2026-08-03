import type { Metadata } from "next";

import { CompaniesExplorer } from "@/components/companies";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Companies",
};

export default function CompaniesPage() {
  return (
    <PageContainer
      title="Companies"
      subtitle="AI-researched company intelligence — know where to apply before you apply."
      className="max-w-(--breakpoint-2xl)"
    >
      <CompaniesExplorer />
    </PageContainer>
  );
}

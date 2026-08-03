import type { Metadata } from "next";

import { AutomationCenter } from "@/components/automation";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Automation Center",
};

export default function AutomationPage() {
  return (
    <PageContainer
      title="Automation Center"
      subtitle="Mission control for the AI that searches, tailors, and applies while you sleep."
      className="max-w-(--breakpoint-2xl)"
    >
      <AutomationCenter />
    </PageContainer>
  );
}

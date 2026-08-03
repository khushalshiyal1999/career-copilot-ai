import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SettingsCenter } from "@/components/settings";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <PageContainer
      title="Settings"
      subtitle="Your career control center — everything the AI knows and how it behaves."
    >
      <SettingsCenter />
    </PageContainer>
  );
}

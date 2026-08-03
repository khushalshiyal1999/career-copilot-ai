import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  /** Right-aligned action buttons area. */
  actions?: ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Standard page wrapper — every dashboard page renders inside this. */
export function PageContainer({
  title,
  subtitle,
  actions,
  showBreadcrumbs = true,
  className,
  children,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
    >
      <AppHeader
        title={title}
        subtitle={subtitle}
        actions={actions}
        showBreadcrumbs={showBreadcrumbs}
      />
      {children}
    </div>
  );
}

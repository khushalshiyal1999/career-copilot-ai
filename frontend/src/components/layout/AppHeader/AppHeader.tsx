import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumb";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  /** Right-aligned action buttons area. */
  actions?: ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
}

/** Page-level header: breadcrumb trail, title, subtitle, and actions. */
export function AppHeader({
  title,
  subtitle,
  actions,
  showBreadcrumbs = true,
  className,
}: AppHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {showBreadcrumbs && <Breadcrumbs />}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground text-pretty">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}

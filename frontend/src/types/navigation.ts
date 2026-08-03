import type { LucideIcon } from "lucide-react";

import type { AppRoute } from "@/constants/routes";

export interface NavItem {
  label: string;
  href: AppRoute;
  icon: LucideIcon;
}

export interface BreadcrumbEntry {
  label: string;
  href: string;
  isCurrent: boolean;
}

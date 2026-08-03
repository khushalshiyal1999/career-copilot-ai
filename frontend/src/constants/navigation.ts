import {
  Briefcase,
  Building2,
  ChartColumn,
  ClipboardList,
  FileUser,
  LayoutDashboard,
  Settings,
  Workflow,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import type { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Jobs", href: ROUTES.jobs, icon: Briefcase },
  { label: "Applications", href: ROUTES.applications, icon: ClipboardList },
  { label: "Companies", href: ROUTES.companies, icon: Building2 },
  { label: "Resume Manager", href: ROUTES.resumes, icon: FileUser },
  { label: "Automation", href: ROUTES.automation, icon: Workflow },
  { label: "Analytics", href: ROUTES.analytics, icon: ChartColumn },
  { label: "Settings", href: ROUTES.settings, icon: Settings },
];

/** Route segment → human label, used for breadcrumb generation. */
export const ROUTE_LABELS: Record<string, string> = Object.fromEntries(
  NAV_ITEMS.map((item) => [item.href.replace("/", ""), item.label])
);

"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

import { UserMenu } from "@/components/layout/UserMenu";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";
import { useBreakpoint } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

import { SidebarNav } from "./SidebarNav";

/**
 * Desktop/tablet sidebar rail. Hidden on mobile (see MobileSidebar).
 * Tablet (md–lg) is always icon-only via CSS; desktop (lg+) is
 * user-collapsible with an animated width transition.
 */
export function AppSidebar() {
  const collapsed = useAppStore((state) => state.sidebarCollapsed);
  const isDesktop = useBreakpoint("lg");
  const iconOnly = !isDesktop || collapsed;

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "sticky top-0 z-40 hidden h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-in-out md:flex",
        collapsed ? "md:w-16" : "md:w-16 lg:w-64"
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-sidebar-border px-3">
        <Link
          href={ROUTES.dashboard}
          className="flex min-w-0 items-center gap-2.5 overflow-hidden rounded-lg px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span
            className={cn(
              "truncate whitespace-nowrap font-heading text-sm font-semibold text-sidebar-foreground transition-opacity duration-200",
              "hidden lg:inline",
              collapsed && "lg:opacity-0"
            )}
          >
            {APP_CONFIG.name}
          </span>
        </Link>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav variant="rail" iconOnly={iconOnly} />
      </div>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <UserMenu variant="sidebar" collapsed={iconOnly} responsive />
      </div>
    </aside>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  /** "rail" clips labels as the sidebar narrows; "drawer" always shows them. */
  variant: "rail" | "drawer";
  /** Show tooltips when the rail is icon-only. */
  iconOnly?: boolean;
  onNavigate?: () => void;
}

export function SidebarNav({ variant, iconOnly = false, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-1 px-3 py-3">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);

        const link = (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group/nav-item relative flex h-9 items-center gap-3 overflow-hidden rounded-lg px-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              isActive
                ? "text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`sidebar-active-${variant}`}
                className="absolute inset-0 rounded-lg bg-sidebar-accent"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <item.icon
              className={cn(
                "relative z-10 size-4 shrink-0 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-sidebar-foreground/60 group-hover/nav-item:text-sidebar-foreground"
              )}
            />
            <span
              className={cn(
                "relative z-10 min-w-0 flex-1 truncate whitespace-nowrap transition-opacity duration-200",
                variant === "rail" && "hidden lg:inline",
                variant === "rail" && iconOnly && "lg:opacity-0"
              )}
            >
              {item.label}
            </span>
          </Link>
        );

        if (variant === "rail" && iconOnly) {
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        }

        return link;
      })}
    </nav>
  );
}

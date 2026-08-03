"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { ROUTE_LABELS } from "@/constants/navigation";
import type { BreadcrumbEntry } from "@/types/navigation";

function toTitleCase(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Derives breadcrumb entries from the current pathname. */
export function useBreadcrumbs(): BreadcrumbEntry[] {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = (pathname ?? "").split("/").filter(Boolean);

    return segments.map((segment, index) => ({
      label: ROUTE_LABELS[segment] ?? toTitleCase(decodeURIComponent(segment)),
      href: `/${segments.slice(0, index + 1).join("/")}`,
      isCurrent: index === segments.length - 1,
    }));
  }, [pathname]);
}

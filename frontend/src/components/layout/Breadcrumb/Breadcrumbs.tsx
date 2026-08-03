"use client";

import { Fragment } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/constants/routes";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

/** Auto-generated breadcrumb trail derived from the current route. */
export function Breadcrumbs() {
  const crumbs = useBreadcrumbs();

  if (crumbs.length === 0) return null;

  const showHome = crumbs[0]?.href !== ROUTES.dashboard;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {showHome && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ROUTES.dashboard}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {crumbs.map((crumb, index) => (
          <Fragment key={crumb.href}>
            {(showHome || index > 0) && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.isCurrent ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

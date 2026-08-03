import * as React from "react";

import type { CompanyBrand } from "@/components/dashboard/data";
import { cn } from "@/lib/utils";

/** Brand-tinted monogram tile standing in for a company logo. */
export function CompanyMark({
  company,
  size = "default",
  className,
}: {
  company: CompanyBrand;
  size?: "default" | "lg";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-lg font-heading font-semibold ring-1 ring-inset ring-foreground/10",
        size === "lg" ? "size-10 text-base" : "size-8 text-sm",
        className
      )}
      style={{ backgroundColor: `${company.color}1f`, color: company.color }}
    >
      {company.name.charAt(0)}
    </span>
  );
}

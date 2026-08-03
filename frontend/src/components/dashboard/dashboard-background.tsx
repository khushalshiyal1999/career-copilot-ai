import * as React from "react";

/**
 * Ambient page background: a brand-tinted radial wash and a faint grid that
 * fades out below the hero. Sits behind all content, never interactive.
 */
export function DashboardBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-175 bg-[radial-gradient(65%_55%_at_50%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent_70%)]" />
      <div className="absolute top-0 right-0 h-100 w-2/3 bg-[radial-gradient(55%_55%_at_100%_0%,color-mix(in_oklch,var(--info)_5%,transparent),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-120 [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(70%_75%_at_50%_0%,black_15%,transparent_85%)]" />
    </div>
  );
}

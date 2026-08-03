import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingProps {
  label?: string;
  className?: string;
  fullScreen?: boolean;
}

export function Loading({ label, className, fullScreen = false }: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen ? "min-h-dvh" : "py-12",
        className
      )}
    >
      <Loader2 className="size-8 animate-spin text-primary" />
      {label ? (
        <p className="text-sm text-muted-foreground">{label}</p>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );
}

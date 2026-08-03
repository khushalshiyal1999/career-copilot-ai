"use client";

import type { ReactNode } from "react";

import { ErrorBoundary } from "@/components/common/error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <TooltipProvider delayDuration={200}>
            {children}
            <ToastProvider />
          </TooltipProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

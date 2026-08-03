import { Sparkles } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href={ROUTES.home} className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-5 text-primary" />
          {APP_CONFIG.name}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

import { UserMenu } from "@/components/layout/UserMenu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { APP_CONFIG } from "@/constants/config";
import { ROUTES } from "@/constants/routes";
import { useAppStore } from "@/store/use-app-store";

import { SidebarNav } from "./SidebarNav";

/** Mobile navigation drawer, opened from the top navbar hamburger. */
export function MobileSidebar() {
  const open = useAppStore((state) => state.mobileNavOpen);
  const setOpen = useAppStore((state) => state.setMobileNavOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="flex w-72 flex-col gap-0 bg-sidebar p-0"
      >
        <SheetHeader className="h-14 shrink-0 justify-center border-b border-sidebar-border px-4">
          <SheetTitle asChild>
            <Link
              href={ROUTES.dashboard}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <span className="font-heading text-sm font-semibold text-sidebar-foreground">
                {APP_CONFIG.name}
              </span>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarNav variant="drawer" onNavigate={() => setOpen(false)} />
        </div>

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <UserMenu variant="sidebar" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

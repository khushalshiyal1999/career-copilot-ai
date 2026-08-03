"use client";

import { Menu, PanelLeft } from "lucide-react";

import { NotificationMenu } from "@/components/layout/NotificationMenu";
import { SearchBar } from "@/components/layout/SearchBar";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { UserMenu } from "@/components/layout/UserMenu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/use-app-store";

export function TopNavbar() {
  const toggleSidebarCollapsed = useAppStore(
    (state) => state.toggleSidebarCollapsed
  );
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      {/* Mobile: open the drawer */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        className="md:hidden"
        onClick={() => setMobileNavOpen(true)}
      >
        <Menu />
      </Button>

      {/* Desktop: collapse the rail (tablet is always collapsed) */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle sidebar"
        className="hidden lg:inline-flex"
        onClick={toggleSidebarCollapsed}
      >
        <PanelLeft />
      </Button>

      <Separator
        orientation="vertical"
        className="hidden h-5! self-center lg:block"
      />

      <div className="flex flex-1 items-center">
        <SearchBar />
      </div>

      <div className="flex items-center gap-1">
        <NotificationMenu />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="mx-1 h-5! self-center" />
        <UserMenu variant="navbar" />
      </div>
    </header>
  );
}

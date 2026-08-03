"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

/**
 * Global search trigger. Opens the command palette once implemented;
 * currently a visual placeholder.
 */
export function SearchBar() {
  return (
    <>
      {/* Full search field on sm+ */}
      <button
        type="button"
        aria-label="Search"
        className="hidden h-8 w-full max-w-64 items-center gap-2 rounded-lg border border-input bg-background px-2.5 text-sm text-muted-foreground shadow-xs outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Search…</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      {/* Icon-only trigger on mobile */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="sm:hidden"
      >
        <Search />
      </Button>
    </>
  );
}

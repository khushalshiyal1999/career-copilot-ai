"use client";

import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

/** Placeholder until authentication lands. */
const PLACEHOLDER_USER = {
  name: "Guest User",
  email: "guest@example.com",
  initials: "GU",
};

interface UserMenuProps {
  /** "navbar" renders a compact avatar button; "sidebar" a full-width row. */
  variant?: "navbar" | "sidebar";
  /** Sidebar rail is icon-only; hide the name/email block. */
  collapsed?: boolean;
  /** Rail-only: also hide the name/email block below the lg breakpoint. */
  responsive?: boolean;
}

export function UserMenu({
  variant = "navbar",
  collapsed = false,
  responsive = false,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "navbar" ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Open user menu"
          >
            <Avatar className="size-7">
              <AvatarFallback className="text-xs">
                {PLACEHOLDER_USER.initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <button
            type="button"
            aria-label="Open user menu"
            className="flex w-full items-center gap-2.5 overflow-hidden rounded-lg p-1.5 text-left outline-none transition-colors hover:bg-sidebar-accent/60 focus-visible:ring-2 focus-visible:ring-sidebar-ring aria-expanded:bg-sidebar-accent"
          >
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="text-xs">
                {PLACEHOLDER_USER.initials}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "flex min-w-0 flex-1 flex-col transition-opacity duration-200",
                responsive && "hidden lg:flex",
                collapsed && "opacity-0"
              )}
            >
              <span className="truncate text-xs font-medium text-sidebar-foreground">
                {PLACEHOLDER_USER.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {PLACEHOLDER_USER.email}
              </span>
            </span>
            <ChevronsUpDown
              className={cn(
                "size-3.5 shrink-0 text-muted-foreground",
                responsive && "hidden lg:inline",
                collapsed && "opacity-0"
              )}
            />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={variant === "sidebar" ? "right" : "bottom"}
        sideOffset={8}
        className="w-56"
      >
        <DropdownMenuLabel className="flex flex-col">
          <span>{PLACEHOLDER_USER.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {PLACEHOLDER_USER.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={ROUTES.settings}>
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

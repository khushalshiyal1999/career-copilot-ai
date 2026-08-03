"use client";

import { Bell, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Notification bell. Content is a placeholder until notifications land. */
export function NotificationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell />
          <span
            aria-hidden
            className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-background"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          <Button variant="ghost" size="xs" disabled>
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
          <span className="grid size-10 place-items-center rounded-full bg-muted">
            <Inbox className="size-5 text-muted-foreground" />
          </span>
          <p className="text-sm font-medium">No notifications yet</p>
          <p className="text-xs text-muted-foreground">
            Updates about your job applications will appear here.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

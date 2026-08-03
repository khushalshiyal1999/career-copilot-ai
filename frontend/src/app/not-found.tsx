import { SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <SearchX className="size-10 text-muted-foreground" />
      <div className="space-y-1">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h2 className="text-lg font-semibold">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button asChild>
        <Link href={ROUTES.home}>Back to home</Link>
      </Button>
    </div>
  );
}

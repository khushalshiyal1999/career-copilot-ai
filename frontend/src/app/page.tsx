"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STACK = [
  "Next.js 16 · App Router · Turbopack",
  "TypeScript · ESLint",
  "Tailwind CSS v4 · Shadcn UI · Lucide",
  "TanStack Query · Axios",
  "Zustand · React Hook Form · Zod",
  "Framer Motion · Sonner · Recharts · React Day Picker",
];

const CONFIGURED = [
  "Absolute imports (@/*)",
  "Dark / light theme",
  "Global fonts & color variables",
  "Query, theme & toast providers",
  "Axios instance with interceptors",
  "Error boundary, loading & 404 pages",
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <Badge variant="secondary" className="gap-1.5">
            <CheckCircle2 className="size-3.5 text-success" />
            Project setup complete
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Job AI
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            The frontend architecture is configured and production-ready. Start
            building features in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              src/components
            </code>
            .
          </p>
          <Button
            onClick={() =>
              toast.success("Everything is wired up!", {
                description: "Sonner, providers and theming are working.",
              })
            }
          >
            <Rocket />
            Test toast
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="grid w-full gap-4 sm:grid-cols-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Tech stack</CardTitle>
              <CardDescription>Installed and ready to use</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {STACK.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configured</CardTitle>
              <CardDescription>Architecture &amp; conventions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {CONFIGURED.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </>
  );
}

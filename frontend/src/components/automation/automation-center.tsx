"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  AiAssistantCard,
  LiveActivityFeed,
  NotificationsCard,
} from "@/components/automation/ai-activity-panel";
import {
  ActivityPanelSkeleton,
  WorkflowDetailSkeleton,
  WorkflowListSkeleton,
} from "@/components/automation/automation-skeleton";
import {
  ACTIVITY_POOL,
  ACTIVITY_SEED,
  JOB_SOURCES,
  WORKFLOWS_SEED,
  type ActivityItem,
  type JobSource,
  type Workflow,
} from "@/components/automation/data";
import {
  OverviewCards,
  OverviewCardsSkeleton,
  type OverviewStats,
} from "@/components/automation/overview-cards";
import { SourcesGrid } from "@/components/automation/sources-grid";
import { WorkflowDetail } from "@/components/automation/workflow-detail";
import { WorkflowList } from "@/components/automation/workflow-list";
import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { PanelLeft, Sparkles, Workflow as WorkflowIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function nowLabel(): string {
  return new Date().toTimeString().slice(0, 5);
}

export function AutomationCenter() {
  const [workflows, setWorkflows] = React.useState<Workflow[]>(WORKFLOWS_SEED);
  const [sources, setSources] = React.useState<JobSource[]>(JOB_SOURCES);
  const [activity, setActivity] = React.useState<ActivityItem[]>(ACTIVITY_SEED);
  const [stats, setStats] = React.useState<OverviewStats>({
    jobsFoundToday: 47,
    applicationsSubmitted: 7,
    resumesOptimized: 3,
    interviewsScheduled: 2,
    successRate: 96,
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(
    WORKFLOWS_SEED[0]?.id ?? null
  );
  const [loading, setLoading] = React.useState(true);
  const [runningNowId, setRunningNowId] = React.useState<string | null>(null);
  const [reconnectingId, setReconnectingId] = React.useState<string | null>(null);
  const [listOpen, setListOpen] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);

  // Simulated fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const pushActivity = React.useCallback(
    (item: Omit<ActivityItem, "id" | "time">) => {
      setActivity((prev) =>
        [
          { ...item, id: `live-${Date.now()}-${prev.length}`, time: nowLabel() },
          ...prev,
        ].slice(0, 14)
      );
    },
    []
  );

  // The "AI employee at work" heartbeat: feed entries + slowly climbing counters.
  React.useEffect(() => {
    if (loading) return;
    let poolIndex = 0;
    const interval = setInterval(() => {
      const entry = ACTIVITY_POOL[poolIndex % ACTIVITY_POOL.length];
      poolIndex += 1;
      pushActivity(entry);
      if (poolIndex % 3 === 0) {
        setStats((prev) => ({
          ...prev,
          jobsFoundToday: prev.jobsFoundToday + 1 + (poolIndex % 2),
        }));
      }
      if (poolIndex % 5 === 0) {
        setStats((prev) => ({
          ...prev,
          applicationsSubmitted: prev.applicationsSubmitted + 1,
        }));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [loading, pushActivity]);

  const selected =
    workflows.find((w) => w.id === selectedId) ?? workflows[0] ?? null;
  const allPaused = workflows.every((w) => w.status !== "running");

  const updateWorkflow = (id: string, updater: (w: Workflow) => Workflow) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? updater(w) : w)));
  };

  /* ---------------- Workflow actions ---------------- */

  const selectWorkflow = (workflow: Workflow) => {
    setSelectedId(workflow.id);
    setListOpen(false);
  };

  const runNow = (workflow: Workflow) => {
    setRunningNowId(workflow.id);
    pushActivity({ text: `Manual run started — ${workflow.name}.`, tone: "running" });
    setTimeout(() => {
      updateWorkflow(workflow.id, (w) => ({
        ...w,
        status: w.status === "paused" ? "paused" : "running",
        lastRun: "Just now",
        executions: w.executions + 1,
      }));
      setRunningNowId(null);
      pushActivity({
        text: `${workflow.name} finished — results merged into your pipeline.`,
        tone: "success",
      });
      toast.success(`${workflow.name} ran successfully — check the latest-run timeline.`);
    }, 1600);
  };

  const toggleWorkflow = (workflow: Workflow) => {
    const pausing = workflow.status !== "paused";
    updateWorkflow(workflow.id, (w) => ({
      ...w,
      status: pausing ? "paused" : "running",
      nextRun: pausing ? "Paused" : w.schedule.replace("Daily at", "Tomorrow,"),
    }));
    pushActivity({
      text: `${workflow.name} ${pausing ? "paused" : "resumed"} by you.`,
      tone: pausing ? "warning" : "success",
    });
    toast(pausing ? `${workflow.name} paused.` : `${workflow.name} resumed.`);
  };

  const duplicateWorkflow = (workflow: Workflow) => {
    const copy: Workflow = {
      ...workflow,
      id: `${workflow.id}-copy-${Date.now()}`,
      name: `${workflow.name} (copy)`,
      status: "paused",
      nextRun: "Paused",
      executions: 0,
    };
    setWorkflows((prev) => {
      const index = prev.findIndex((w) => w.id === workflow.id);
      const next = [...prev];
      next.splice(index + 1, 0, copy);
      return next;
    });
    toast.success(`Duplicated ${workflow.name} — the copy starts paused.`);
  };

  const deleteWorkflow = (workflow: Workflow) => {
    const snapshot = workflows;
    setWorkflows((prev) => prev.filter((w) => w.id !== workflow.id));
    if (selectedId === workflow.id) setSelectedId(null);
    toast(`Deleted ${workflow.name}.`, {
      action: { label: "Undo", onClick: () => setWorkflows(snapshot) },
    });
  };

  /* ---------------- AI assistant actions ---------------- */

  const pauseAll = () => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.status === "running" ? { ...w, status: "paused", nextRun: "Paused" } : w
      )
    );
    pushActivity({ text: "All automation paused by you.", tone: "warning" });
    toast("All automation paused — nothing will run until you resume.");
  };

  const increaseLimit = () => {
    updateWorkflow("wf-daily-search", (w) => ({
      ...w,
      rules: w.rules.map((rule) =>
        rule.label === "Daily apply limit" ? { ...rule, value: "5 of 12 used" } : rule
      ),
    }));
    pushActivity({ text: "Daily apply limit raised from 8 to 12.", tone: "info" });
    toast.success(
      "Daily apply limit raised to 12 — tomorrow's run can use every qualified match."
    );
  };

  const reviewSkipped = () => {
    setSelectedId("wf-daily-search");
    toast("Opening Daily Job Search — the skipped jobs are under AI decisions.");
  };

  /* ---------------- Sources ---------------- */

  const reconnectSource = (source: JobSource) => {
    setReconnectingId(source.id);
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) =>
          s.id === source.id
            ? { ...s, status: "connected", lastSync: "just now", successRate: 98 }
            : s
        )
      );
      setReconnectingId(null);
      pushActivity({ text: `${source.name} reconnected — backfilling missed listings.`, tone: "success" });
      toast.success(`${source.name} reconnected — I'll backfill the 3 hours we missed.`);
    }, 1400);
  };

  /* ---------------- Columns ---------------- */

  const rightColumn = (
    <div className="flex flex-col gap-4">
      <AiAssistantCard
        allPaused={allPaused}
        onOptimizeResume={() =>
          toast.success("Resume Optimizer queued — running an off-schedule pass now.")
        }
        onIncreaseLimit={increaseLimit}
        onReviewSkipped={reviewSkipped}
        onTailorResume={() =>
          toast.success("Tailoring 'Senior Frontend — 2026' against today's top matches.")
        }
        onPauseAll={pauseAll}
      />
      <LiveActivityFeed items={activity} />
      <NotificationsCard />
    </div>
  );

  if (!loading && workflows.length === 0) {
    return (
      <EmptyState
        className="py-20"
        icon={<AiAvatar size="lg" />}
        title="No automations yet"
        description="Your AI employee is ready to work. Restore the default workflows and it starts scanning every connected job board within minutes."
        action={
          <Button variant="ai" onClick={() => setWorkflows(WORKFLOWS_SEED)}>
            <Sparkles data-icon="inline-start" />
            Restore default workflows
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <OverviewCardsSkeleton />
      ) : (
        <OverviewCards workflows={workflows} stats={stats} />
      )}

      {/* Mobile / tablet: buttons to open the side panels */}
      <div className="flex items-center gap-2 xl:hidden">
        <Button variant="outline" className="lg:hidden" onClick={() => setListOpen(true)}>
          <PanelLeft data-icon="inline-start" />
          Workflows
        </Button>
        <Button variant="ai" className="ml-auto" onClick={() => setPanelOpen(true)}>
          <Sparkles data-icon="inline-start" />
          AI + Activity
        </Button>
      </div>

      <div className="flex items-start gap-6">
        {/* Workflow list — desktop rail */}
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto pr-1 pb-4 lg:block">
          {loading ? (
            <WorkflowListSkeleton />
          ) : (
            <WorkflowList
              workflows={workflows}
              selectedId={selected?.id ?? null}
              onSelect={selectWorkflow}
            />
          )}
        </aside>

        {/* Detail — center */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {loading ? (
            <WorkflowDetailSkeleton />
          ) : selected ? (
            <FadeIn key={selected.id}>
              <WorkflowDetail
                workflow={selected}
                runningNow={runningNowId === selected.id}
                onRunNow={runNow}
                onToggle={toggleWorkflow}
                onDuplicate={duplicateWorkflow}
                onDelete={deleteWorkflow}
              />
            </FadeIn>
          ) : (
            <EmptyState
              className="py-16"
              icon={<WorkflowIcon className="size-6" />}
              title="Select a workflow"
              description="Pick an automation from the list to inspect its runs, rules, and logs."
            />
          )}
        </div>

        {/* AI + activity — desktop rail */}
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-80 shrink-0 overflow-y-auto pb-4 xl:block 2xl:w-88">
          {loading ? <ActivityPanelSkeleton /> : rightColumn}
        </aside>
      </div>

      {loading ? null : (
        <SourcesGrid
          sources={sources}
          reconnectingId={reconnectingId}
          onReconnect={reconnectSource}
        />
      )}

      {/* Workflow list — mobile sheet */}
      <Sheet open={listOpen} onOpenChange={setListOpen}>
        <SheetContent side="left" className="w-80 gap-0 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Workflows</SheetTitle>
            <SheetDescription>All automation workflows.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <WorkflowList
              workflows={workflows}
              selectedId={selected?.id ?? null}
              onSelect={selectWorkflow}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* AI + activity — mobile sheet */}
      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b">
            <SheetTitle>AI Assistant &amp; Activity</SheetTitle>
            <SheetDescription>Live feed and AI suggestions.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">{rightColumn}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

"use client";

import * as React from "react";
import { toast } from "sonner";

import { AiAvatar } from "@/components/dashboard/ai-avatar";
import { ActivityFeed } from "@/components/resume/activity-feed";
import { AiAssistantPanel } from "@/components/resume/ai-assistant-panel";
import { AtsScoreCard } from "@/components/resume/ats-score";
import { CoverLetters } from "@/components/resume/cover-letters";
import {
  ACTIVITY_SEED,
  COVER_LETTER_TARGETS,
  COVER_LETTERS_SEED,
  RESUMES_SEED,
  TEMPLATES,
  type ActivityKind,
  type CoverLetter,
  type Resume,
} from "@/components/resume/data";
import { CreateResumeDialog, RenameResumeDialog } from "@/components/resume/resume-dialogs";
import { ResumeLibrary } from "@/components/resume/resume-library";
import { ResumePreview } from "@/components/resume/resume-preview";
import {
  AiPanelSkeleton,
  ResumeLibrarySkeleton,
  ResumePreviewSkeleton,
} from "@/components/resume/resume-skeleton";
import { TemplateGallery } from "@/components/resume/template-gallery";
import { VersionCompareDialog } from "@/components/resume/version-compare";
import { FileUp, PanelLeft, Sparkles } from "@/components/icons";
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

export function ResumeWorkspace() {
  const [resumes, setResumes] = React.useState<Resume[]>(RESUMES_SEED);
  const [coverLetters, setCoverLetters] = React.useState<CoverLetter[]>(COVER_LETTERS_SEED);
  const [activity, setActivity] = React.useState(ACTIVITY_SEED);
  const [selectedId, setSelectedId] = React.useState<string | null>(
    RESUMES_SEED[0]?.id ?? null
  );
  const [viewVersion, setViewVersion] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [optimizing, setOptimizing] = React.useState(false);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [compareOpen, setCompareOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [renameTarget, setRenameTarget] = React.useState<Resume | null>(null);
  const [libraryOpen, setLibraryOpen] = React.useState(false);
  const [aiOpen, setAiOpen] = React.useState(false);
  const coverTargetIndex = React.useRef(0);

  // Simulated fetch so the skeleton state is part of the experience.
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const selected = resumes.find((r) => r.id === selectedId) ?? resumes[0] ?? null;
  const latestVersion = selected
    ? selected.versions[selected.versions.length - 1]
    : null;
  const shownVersion =
    selected && viewVersion !== null
      ? (selected.versions.find((v) => v.version === viewVersion) ?? latestVersion)
      : latestVersion;

  const updateResume = (id: string, updater: (resume: Resume) => Resume) => {
    setResumes((prev) => prev.map((r) => (r.id === id ? updater(r) : r)));
  };

  const pushActivity = (kind: ActivityKind, text: string) => {
    setActivity((prev) => [
      { id: `act-${Date.now()}-${prev.length}`, kind, text, daysAgo: 0 },
      ...prev,
    ]);
  };

  /* ---------------- Library actions ---------------- */

  const selectResume = (resume: Resume) => {
    setSelectedId(resume.id);
    setViewVersion(null);
    setLibraryOpen(false);
  };

  const duplicateResume = (resume: Resume) => {
    const copy: Resume = {
      ...resume,
      id: `${resume.id}-copy-${Date.now()}`,
      name: `${resume.name} (copy)`,
      isActive: false,
      status: "draft",
      versions: resume.versions.map((v) => ({ ...v })),
      suggestions: resume.suggestions.map((s) => ({ ...s })),
    };
    setResumes((prev) => {
      const index = prev.findIndex((r) => r.id === resume.id);
      const next = [...prev];
      next.splice(index + 1, 0, copy);
      return next;
    });
    pushActivity("created", `"${copy.name}" duplicated from "${resume.name}".`);
    toast.success(`Duplicated ${resume.name}.`);
  };

  const renameResume = (id: string, name: string) => {
    updateResume(id, (r) => ({ ...r, name }));
    toast.success(`Renamed to ${name}.`);
  };

  const downloadResume = (resume: Resume) => {
    pushActivity("exported", `"${resume.name}" downloaded as ${resume.fileType}.`);
    toast(`Downloading ${resume.name}.${resume.fileType.toLowerCase()}…`);
  };

  const deleteResume = (resume: Resume) => {
    const snapshot = resumes;
    setResumes((prev) => prev.filter((r) => r.id !== resume.id));
    if (selectedId === resume.id) setSelectedId(null);
    toast(`Deleted ${resume.name}.`, {
      action: {
        label: "Undo",
        onClick: () => setResumes(snapshot),
      },
    });
  };

  const setActiveResume = (resume: Resume) => {
    setResumes((prev) => prev.map((r) => ({ ...r, isActive: r.id === resume.id })));
    toast.success(`${resume.name} is now your active resume — Easy Apply will use it.`);
  };

  const createResume = ({
    name,
    targetRole,
    template,
  }: {
    name: string;
    targetRole: string;
    template: string;
  }) => {
    const base = RESUMES_SEED[0];
    const fresh: Resume = {
      ...base,
      id: `resume-${Date.now()}`,
      name,
      targetRole,
      template,
      fileType: "PDF",
      status: "draft",
      isActive: false,
      versions: [
        {
          version: 1,
          createdDaysAgo: 0,
          atsScore: 72,
          breakdown: { formatting: 80, keywords: 62, structure: 76, readability: 74 },
          note: `Seeded from your profile for ${targetRole} roles.`,
          changes: { added: ["Profile-based first draft"], removed: [], changed: [] },
        },
      ],
      summary: `${targetRole} with 7+ years of React and TypeScript experience across fintech and e-commerce. First draft generated by CareerCopilot — refine the story with the suggestions on the right.`,
      suggestions: base.suggestions.map((s) => ({ ...s, applied: false })),
      findings: base.findings,
    };
    setResumes((prev) => [fresh, ...prev]);
    setSelectedId(fresh.id);
    setViewVersion(null);
    pushActivity(
      "created",
      `"${name}" created from the ${TEMPLATES.find((t) => t.id === template)?.name ?? "Professional"} template.`
    );
    toast.success(`Created ${name} — I drafted v1 from your profile.`);
  };

  /* ---------------- AI actions ---------------- */

  const applySuggestion = (suggestionId: string) => {
    if (!selected) return;
    const suggestion = selected.suggestions.find((s) => s.id === suggestionId);
    if (!suggestion) return;
    const before = selected.versions[selected.versions.length - 1].atsScore;
    const after = Math.min(before + suggestion.scoreDelta, 99);

    updateResume(selected.id, (r) => {
      const versions = r.versions.map((v, i) =>
        i === r.versions.length - 1
          ? {
              ...v,
              atsScore: after,
              breakdown: {
                ...v.breakdown,
                keywords: Math.min(v.breakdown.keywords + suggestion.scoreDelta * 2, 100),
              },
            }
          : v
      );
      return {
        ...r,
        versions,
        status: after >= 85 ? "optimized" : r.status,
        suggestions: r.suggestions.map((s) =>
          s.id === suggestionId ? { ...s, applied: true } : s
        ),
      };
    });
    setViewVersion(null);
    pushActivity("optimized", `"${selected.name}" — applied "${suggestion.title}".`);
    toast.success(`Applied "${suggestion.title}" — ATS ${before}% → ${after}%.`);
  };

  const optimize = () => {
    if (!selected) return;
    const pending = selected.suggestions.filter((s) => !s.applied);
    if (pending.length === 0) {
      toast("This resume is already fully optimized — no pending suggestions.");
      return;
    }
    setOptimizing(true);
    const id = selected.id;
    const name = selected.name;
    const before = selected.versions[selected.versions.length - 1].atsScore;
    const gain = pending.reduce((sum, s) => sum + s.scoreDelta, 0);
    setTimeout(() => {
      const after = Math.min(before + gain, 99);
      updateResume(id, (r) => ({
        ...r,
        status: after >= 85 ? "optimized" : r.status,
        suggestions: r.suggestions.map((s) => ({ ...s, applied: true })),
        versions: r.versions.map((v, i) =>
          i === r.versions.length - 1
            ? {
                ...v,
                atsScore: after,
                breakdown: {
                  formatting: Math.min(v.breakdown.formatting + 3, 100),
                  keywords: Math.min(v.breakdown.keywords + gain, 100),
                  structure: Math.min(v.breakdown.structure + 2, 100),
                  readability: Math.min(v.breakdown.readability + 2, 100),
                },
              }
            : v
        ),
      }));
      setOptimizing(false);
      setViewVersion(null);
      pushActivity("optimized", `"${name}" optimized — ATS score ${before} → ${after}.`);
      toast.success(
        `Applied ${pending.length} ${pending.length === 1 ? "suggestion" : "suggestions"} — ATS ${before}% → ${after}%.`
      );
    }, 1400);
  };

  const tailorForJob = () => {
    if (!selected || !latestVersion) return;
    const target = COVER_LETTER_TARGETS[coverTargetIndex.current % COVER_LETTER_TARGETS.length];
    coverTargetIndex.current += 1;
    const nextVersion = latestVersion.version + 1;
    const after = Math.min(latestVersion.atsScore + 3, 98);
    updateResume(selected.id, (r) => ({
      ...r,
      versions: [
        ...r.versions,
        {
          version: nextVersion,
          createdDaysAgo: 0,
          atsScore: after,
          breakdown: {
            ...latestVersion.breakdown,
            keywords: Math.min(latestVersion.breakdown.keywords + 5, 100),
          },
          note: `Tailored for ${r.targetRole} at ${target.name}.`,
          changes: {
            added: [
              `${target.name}-specific keywords from the live job description`,
              "Reordered top bullets to mirror the listing's priorities",
            ],
            removed: ["Two bullets irrelevant to this listing"],
            changed: [`Summary re-anchored on ${target.name}'s stack`],
          },
        },
      ],
    }));
    setViewVersion(null);
    pushActivity("tailored", `"${selected.name}" tailored for ${target.name} — v${nextVersion} created.`);
    toast.success(
      `Tailored for ${target.name} — saved as v${nextVersion} (ATS ${after}%). The original is untouched.`
    );
  };

  const generateCoverLetter = () => {
    if (!selected) return;
    const target = COVER_LETTER_TARGETS[coverTargetIndex.current % COVER_LETTER_TARGETS.length];
    coverTargetIndex.current += 1;
    setCoverLetters((prev) => [
      {
        id: `cl-${Date.now()}`,
        company: target,
        role: selected.targetRole,
        resumeName: selected.name,
        createdDaysAgo: 0,
      },
      ...prev,
    ]);
    pushActivity("cover", `Cover letter generated for ${target.name} — ${selected.targetRole}.`);
    toast.success(
      `Cover letter for ${target.name} is ready — grounded in "${selected.name}" and their posting.`
    );
  };

  const exportAs = (format: "PDF" | "DOCX") => {
    if (!selected) return;
    pushActivity("exported", `"${selected.name}" exported as ${format}.`);
    toast.success(`Exported ${selected.name} as ${format} — ATS-safe fonts embedded.`);
  };

  const analyze = () => {
    if (!selected || !latestVersion) return;
    setAnalyzing(true);
    const score = latestVersion.atsScore;
    const name = selected.name;
    setTimeout(() => {
      setAnalyzing(false);
      pushActivity("analyzed", `"${name}" re-analyzed against 6 ATS parsers.`);
      toast.success(
        `Analysis complete — parsed cleanly by all 6 vendors. Score confirmed at ${score}%.`
      );
    }, 1100);
  };

  /* ---------------- Columns ---------------- */

  const libraryColumn = (
    <div className="flex flex-col gap-6">
      <ResumeLibrary
        resumes={resumes}
        selectedId={selected?.id ?? null}
        onSelect={selectResume}
        onCreate={() => setCreateOpen(true)}
        onDuplicate={duplicateResume}
        onRename={setRenameTarget}
        onDownload={downloadResume}
        onDelete={deleteResume}
        onSetActive={setActiveResume}
      />
      {selected && (
        <TemplateGallery
          selectedTemplate={selected.template}
          onSelect={(templateId) => {
            updateResume(selected.id, (r) => ({ ...r, template: templateId }));
            toast.success(
              `Switched to the ${TEMPLATES.find((t) => t.id === templateId)?.name} template — content untouched.`
            );
          }}
        />
      )}
      <ActivityFeed entries={activity} />
    </div>
  );

  const aiColumn = selected && shownVersion && (
    <div className="flex flex-col gap-4">
      <AtsScoreCard
        score={shownVersion.atsScore}
        breakdown={shownVersion.breakdown}
        analyzing={analyzing}
      />
      <AiAssistantPanel
        resume={selected}
        optimizing={optimizing}
        analyzing={analyzing}
        onApplySuggestion={applySuggestion}
        onOptimize={optimize}
        onTailor={tailorForJob}
        onGenerateCoverLetter={generateCoverLetter}
        onExportPdf={() => exportAs("PDF")}
        onExportDocx={() => exportAs("DOCX")}
        onAnalyze={analyze}
      />
    </div>
  );

  if (!loading && resumes.length === 0) {
    return (
      <>
        <EmptyState
          className="py-20"
          icon={<AiAvatar size="lg" />}
          title="Your resume workspace is empty"
          description="Upload an existing resume or let me draft one from your profile — I'll score it against real ATS parsers as we go."
          action={
            <Button variant="ai" onClick={() => setCreateOpen(true)}>
              <Sparkles data-icon="inline-start" />
              Create with AI
            </Button>
          }
          secondaryAction={
            <Button
              variant="outline"
              onClick={() => toast("Drop a PDF or DOCX — I'll parse and score it.")}
            >
              <FileUp data-icon="inline-start" />
              Upload resume
            </Button>
          }
        />
        <CreateResumeDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onCreate={createResume}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile / tablet: buttons to open the side panels */}
      <div className="flex items-center gap-2 xl:hidden">
        <Button variant="outline" className="lg:hidden" onClick={() => setLibraryOpen(true)}>
          <PanelLeft data-icon="inline-start" />
          Library
        </Button>
        <Button variant="ai" className="ml-auto" onClick={() => setAiOpen(true)}>
          <Sparkles data-icon="inline-start" />
          AI Assistant
        </Button>
      </div>

      <div className="flex items-start gap-6">
        {/* Library — desktop rail */}
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto pr-1 pb-4 lg:block">
          {loading ? <ResumeLibrarySkeleton /> : libraryColumn}
        </aside>

        {/* Preview — center */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {loading ? (
            <ResumePreviewSkeleton />
          ) : selected && shownVersion ? (
            <FadeIn key={selected.id}>
              <div className="flex flex-col gap-6">
                <ResumePreview
                  resume={selected}
                  version={shownVersion}
                  onVersionChange={setViewVersion}
                  onCompare={() => setCompareOpen(true)}
                />
                <CoverLetters
                  letters={coverLetters}
                  onDownload={(letter) =>
                    toast(`Downloading Cover Letter — ${letter.company.name}.pdf…`)
                  }
                  onRegenerate={(letter) => {
                    setCoverLetters((prev) =>
                      prev.map((l) =>
                        l.id === letter.id ? { ...l, createdDaysAgo: 0 } : l
                      )
                    );
                    pushActivity("cover", `Cover letter for ${letter.company.name} regenerated.`);
                    toast.success(
                      `Regenerated the ${letter.company.name} cover letter with your latest resume changes.`
                    );
                  }}
                />
              </div>
            </FadeIn>
          ) : null}
        </div>

        {/* AI assistant — desktop rail */}
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-80 shrink-0 overflow-y-auto pb-4 xl:block 2xl:w-88">
          {loading ? <AiPanelSkeleton /> : aiColumn}
        </aside>
      </div>

      {/* Library — mobile sheet */}
      <Sheet open={libraryOpen} onOpenChange={setLibraryOpen}>
        <SheetContent side="left" className="w-80 gap-0 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Resume Library</SheetTitle>
            <SheetDescription>All your resumes and templates.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">{libraryColumn}</div>
        </SheetContent>
      </Sheet>

      {/* AI assistant — mobile sheet */}
      <Sheet open={aiOpen} onOpenChange={setAiOpen}>
        <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b">
            <SheetTitle>AI Assistant</SheetTitle>
            <SheetDescription>ATS score and suggestions.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">{aiColumn}</div>
        </SheetContent>
      </Sheet>

      {selected && (
        <VersionCompareDialog
          key={`${selected.id}-v${selected.versions.length}`}
          resume={selected}
          open={compareOpen}
          onOpenChange={setCompareOpen}
        />
      )}
      <CreateResumeDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={createResume}
      />
      <RenameResumeDialog
        key={renameTarget?.id ?? "rename-closed"}
        resume={renameTarget}
        onOpenChange={(open) => {
          if (!open) setRenameTarget(null);
        }}
        onRename={renameResume}
      />
    </div>
  );
}

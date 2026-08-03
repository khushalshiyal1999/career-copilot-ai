"use client";

import * as React from "react";

import {
  RESUME_OWNER,
  TEMPLATES,
  updatedLabel,
  type Resume,
  type ResumeVersion,
} from "@/components/resume/data";
import {
  Award,
  BriefcaseBusiness,
  FolderGit2,
  GitCompareArrows,
  GraduationCap,
  History,
  Mail,
  MapPin,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  resume: Resume;
  /** Version currently shown (defaults to latest). */
  version: ResumeVersion;
  onVersionChange: (version: number) => void;
  onCompare: () => void;
}

function SectionHeading({
  icon: Icon,
  children,
  accent,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <h4
      className="flex items-center gap-1.5 border-b pb-1 font-heading text-[11px] font-semibold tracking-widest uppercase"
      style={{ color: accent }}
    >
      {Icon && <Icon aria-hidden className="size-3" />}
      {children}
    </h4>
  );
}

/** Center column — a document-styled live preview of the selected resume. */
export function ResumePreview({
  resume,
  version,
  onVersionChange,
  onCompare,
}: ResumePreviewProps) {
  const latest = resume.versions[resume.versions.length - 1];
  const viewingOld = version.version !== latest.version;
  const template = TEMPLATES.find((t) => t.id === resume.template) ?? TEMPLATES[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Version switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={String(version.version)}
          onValueChange={(value) => onVersionChange(Number(value))}
        >
          <SelectTrigger aria-label="Resume version" className="w-44">
            <History aria-hidden className="size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[...resume.versions].reverse().map((v) => (
              <SelectItem key={v.version} value={String(v.version)}>
                Version {v.version} · {v.atsScore}%
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {resume.versions.length > 1 && (
          <Button variant="outline" onClick={onCompare}>
            <GitCompareArrows data-icon="inline-start" />
            Compare Versions
          </Button>
        )}
        <Badge variant="outline" className="ml-auto">
          {template.name} template
        </Badge>
      </div>

      {viewingOld && (
        <p className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2 text-xs font-medium text-[color-mix(in_oklch,var(--warning),var(--foreground)_35%)] dark:text-warning">
          <History aria-hidden className="size-3.5 shrink-0" />
          Viewing version {version.version} ({updatedLabel(version.createdDaysAgo).toLowerCase()}) —{" "}
          {latest.version - version.version}{" "}
          {latest.version - version.version === 1 ? "version" : "versions"} behind the
          latest.
        </p>
      )}

      {/* Document */}
      <article
        aria-label={`Preview of ${resume.name}`}
        className={cn(
          "flex flex-col gap-4 rounded-xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-7",
          viewingOld && "opacity-90 saturate-[0.85]"
        )}
      >
        {/* Letterhead */}
        <header
          className="flex flex-col gap-1 border-l-4 pl-3"
          style={{ borderColor: template.accent }}
        >
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            {RESUME_OWNER.name}
          </h3>
          <p className="text-sm font-medium" style={{ color: template.accent }}>
            {resume.targetRole}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden className="size-3" />
              {RESUME_OWNER.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail aria-hidden className="size-3" />
              {RESUME_OWNER.email}
            </span>
          </p>
        </header>

        {/* Summary */}
        <section className="flex flex-col gap-1.5">
          <SectionHeading accent={template.accent}>Summary</SectionHeading>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resume.summary}
          </p>
        </section>

        {/* Skills */}
        <section className="flex flex-col gap-1.5">
          <SectionHeading accent={template.accent}>Skills</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="flex flex-col gap-3">
          <SectionHeading icon={BriefcaseBusiness} accent={template.accent}>
            Experience
          </SectionHeading>
          {resume.experience.map((entry) => (
            <div key={`${entry.company}-${entry.role}`} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="text-sm font-medium">
                  {entry.role}
                  <span className="text-muted-foreground"> · {entry.company}</span>
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {entry.period}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-1 shrink-0 rounded-full"
                      style={{ backgroundColor: template.accent }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="flex flex-col gap-1.5">
          <SectionHeading icon={GraduationCap} accent={template.accent}>
            Education
          </SectionHeading>
          {resume.education.map((entry) => (
            <div
              key={entry.school}
              className="flex flex-wrap items-baseline justify-between gap-x-2"
            >
              <span className="text-sm">
                <span className="font-medium">{entry.degree}</span>
                <span className="text-muted-foreground"> · {entry.school}</span>
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {entry.period}
              </span>
            </div>
          ))}
        </section>

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section className="flex flex-col gap-2">
            <SectionHeading icon={FolderGit2} accent={template.accent}>
              Projects
            </SectionHeading>
            {resume.projects.map((project) => (
              <div key={project.name} className="flex flex-col gap-1">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {project.description}
                </span>
                <div className="flex flex-wrap gap-1">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certificates */}
        {resume.certificates.length > 0 && (
          <section className="flex flex-col gap-1.5">
            <SectionHeading icon={Award} accent={template.accent}>
              Certificates
            </SectionHeading>
            {resume.certificates.map((certificate) => (
              <div
                key={certificate.name}
                className="flex flex-wrap items-baseline justify-between gap-x-2"
              >
                <span className="text-sm">
                  <span className="font-medium">{certificate.name}</span>
                  <span className="text-muted-foreground"> · {certificate.issuer}</span>
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {certificate.year}
                </span>
              </div>
            ))}
          </section>
        )}
      </article>
    </div>
  );
}

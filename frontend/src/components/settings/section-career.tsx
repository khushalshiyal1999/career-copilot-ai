"use client";

import * as React from "react";
import { Reorder } from "framer-motion";

import {
  CAREER_DEFAULTS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_OPTIONS,
  NOTICE_OPTIONS,
  PRIORITY_META,
  SALARY_OPTIONS,
  type Skill,
  type SkillPriority,
} from "@/components/settings/data";
import {
  ChipInput,
  ChipList,
  SelectField,
  SettingsCard,
  SwitchRow,
  TextField,
} from "@/components/settings/settings-ui";
import { GripVertical, X } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PRIORITY_CYCLE: Record<SkillPriority, SkillPriority> = {
  high: "medium",
  medium: "low",
  low: "high",
};

interface CareerSectionProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  log: (text: string) => void;
}

export function CareerSection({ skills, onSkillsChange, log }: CareerSectionProps) {
  const [career, setCareer] = React.useState(CAREER_DEFAULTS);
  const [companies, setCompanies] = React.useState(CAREER_DEFAULTS.preferredCompanies);
  const [domains, setDomains] = React.useState(CAREER_DEFAULTS.preferredDomains);

  const setField =
    <K extends keyof typeof CAREER_DEFAULTS>(key: K) =>
    (value: (typeof CAREER_DEFAULTS)[K]) =>
      setCareer((prev) => ({ ...prev, [key]: value }));

  const toggle = (key: "visaSponsorship" | "openToRelocate" | "openToRemote", label: string) =>
    (checked: boolean) => {
      setField(key)(checked);
      log(`${label} turned ${checked ? "on" : "off"}.`);
    };

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard title="Career profile">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="cr-current"
            label="Current role"
            value={career.currentRole}
            onChange={setField("currentRole")}
            onCommit={() => log("Current role updated.")}
          />
          <SelectField
            id="cr-exp"
            label="Experience"
            value={career.experience}
            options={EXPERIENCE_OPTIONS}
            onChange={(value) => {
              setField("experience")(value);
              log(`Experience set to ${value}.`);
            }}
          />
          <TextField
            id="cr-expected"
            label="Expected role"
            value={career.expectedRole}
            onChange={setField("expectedRole")}
            onCommit={() => log("Expected role updated.")}
          />
          <SelectField
            id="cr-notice"
            label="Notice period"
            value={career.noticePeriod}
            options={NOTICE_OPTIONS}
            onChange={(value) => {
              setField("noticePeriod")(value);
              log(`Notice period set to ${value}.`);
            }}
          />
          <TextField
            id="cr-salary-now"
            label="Current salary"
            value={career.currentSalary}
            onChange={setField("currentSalary")}
            onCommit={() => log("Current salary updated.")}
          />
          <SelectField
            id="cr-salary-want"
            label="Expected salary"
            value={career.expectedSalary}
            options={SALARY_OPTIONS}
            onChange={(value) => {
              setField("expectedSalary")(value);
              log(`Expected salary set to ${value}.`);
            }}
          />
          <SelectField
            id="cr-type"
            label="Employment type"
            value={career.employmentType}
            options={EMPLOYMENT_TYPES}
            onChange={(value) => {
              setField("employmentType")(value);
              log(`Employment type set to ${value}.`);
            }}
          />
        </div>
        <div className="flex flex-col divide-y">
          <SwitchRow
            label="Needs visa sponsorship"
            description="Filters out roles that can't sponsor."
            checked={career.visaSponsorship}
            onCheckedChange={toggle("visaSponsorship", "Visa sponsorship")}
          />
          <SwitchRow
            label="Open to relocate"
            checked={career.openToRelocate}
            onCheckedChange={toggle("openToRelocate", "Open to relocate")}
          />
          <SwitchRow
            label="Open to remote"
            checked={career.openToRemote}
            onCheckedChange={toggle("openToRemote", "Open to remote")}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="Skills"
        description="Drag to reorder — the AI weighs skills top to bottom. Click a priority to cycle it."
      >
        <Reorder.Group
          axis="y"
          values={skills}
          onReorder={onSkillsChange}
          className="flex flex-col gap-1.5"
        >
          {skills.map((skill) => {
            const priority = PRIORITY_META[skill.priority];
            return (
              <Reorder.Item
                key={skill.id}
                value={skill}
                className="flex cursor-grab items-center gap-2 rounded-lg bg-background px-2.5 py-1.5 ring-1 ring-foreground/10 active:cursor-grabbing"
              >
                <GripVertical aria-hidden className="size-3.5 shrink-0 text-muted-foreground/60" />
                <span className="flex-1 truncate text-sm font-medium">{skill.name}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`${skill.name} priority: ${priority.label}. Click to change.`}
                      onClick={() => {
                        const next = PRIORITY_CYCLE[skill.priority];
                        onSkillsChange(
                          skills.map((s) =>
                            s.id === skill.id ? { ...s, priority: next } : s
                          )
                        );
                        log(`${skill.name} priority set to ${PRIORITY_META[next].label}.`);
                      }}
                    >
                      <Badge variant={priority.badgeVariant}>{priority.label}</Badge>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Click to cycle priority</TooltipContent>
                </Tooltip>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove ${skill.name}`}
                  onClick={() => {
                    onSkillsChange(skills.filter((s) => s.id !== skill.id));
                    log(`${skill.name} removed from skills.`);
                  }}
                >
                  <X />
                </Button>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <ChipInput
          placeholder="Add a skill…"
          onAdd={(name) => {
            if (skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
            onSkillsChange([
              ...skills,
              { id: `sk-${Date.now()}`, name, priority: "medium" },
            ]);
            log(`${name} added to skills.`);
          }}
        />
      </SettingsCard>

      <SettingsCard title="Preferred companies">
        <ChipList
          items={companies}
          tone="positive"
          onRemove={(item) => {
            setCompanies((prev) => prev.filter((c) => c !== item));
            log(`${item} removed from preferred companies.`);
          }}
        />
        <ChipInput
          placeholder="Add a company…"
          onAdd={(item) => {
            setCompanies((prev) => (prev.includes(item) ? prev : [...prev, item]));
            log(`${item} added to preferred companies.`);
          }}
        />
      </SettingsCard>

      <SettingsCard title="Preferred domains">
        <ChipList
          items={domains}
          onRemove={(item) => {
            setDomains((prev) => prev.filter((d) => d !== item));
            log(`${item} removed from preferred domains.`);
          }}
        />
        <ChipInput
          placeholder="Add a domain…"
          onAdd={(item) => {
            setDomains((prev) => (prev.includes(item) ? prev : [...prev, item]));
            log(`${item} added to preferred domains.`);
          }}
        />
      </SettingsCard>
    </div>
  );
}

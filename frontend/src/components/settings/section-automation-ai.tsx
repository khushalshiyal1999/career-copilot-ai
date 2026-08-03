"use client";

import * as React from "react";

import {
  AGGRESSIVENESS_OPTIONS,
  AI_DEFAULTS,
  AUTOMATION_DEFAULTS,
  HOURS,
  LIMIT_OPTIONS,
  MATCH_OPTIONS,
  RESUME_OPTIONS,
  SCHEDULE_OPTIONS,
  type Aggressiveness,
} from "@/components/settings/data";
import { SelectField, SettingsCard, SwitchRow } from "@/components/settings/settings-ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AutomationSection({ log }: { log: (text: string) => void }) {
  const [settings, setSettings] = React.useState(AUTOMATION_DEFAULTS);

  const select =
    (key: keyof typeof AUTOMATION_DEFAULTS, label: string) => (value: string) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      log(`${label} set to ${value}.`);
    };

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard
        title="Limits & thresholds"
        description="Hard rules the automation never crosses."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="au-limit"
            label="Daily application limit"
            value={settings.dailyLimit}
            options={LIMIT_OPTIONS}
            onChange={select("dailyLimit", "Daily application limit")}
          />
          <SelectField
            id="au-match"
            label="Minimum AI match"
            value={settings.minMatch}
            options={MATCH_OPTIONS}
            onChange={select("minMatch", "Minimum AI match")}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Schedule" description="When the AI is allowed to work.">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="au-start"
            label="Working hours start"
            value={settings.workingHoursStart}
            options={HOURS}
            onChange={select("workingHoursStart", "Working hours start")}
          />
          <SelectField
            id="au-end"
            label="Working hours end"
            value={settings.workingHoursEnd}
            options={HOURS}
            onChange={select("workingHoursEnd", "Working hours end")}
          />
          <div className="sm:col-span-2">
            <SelectField
              id="au-schedule"
              label="Automation schedule"
              value={settings.schedule}
              options={SCHEDULE_OPTIONS}
              onChange={select("schedule", "Automation schedule")}
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Resume & documents"
        description="What gets attached when the AI applies."
      >
        <SelectField
          id="au-resume"
          label="Resume used for automation"
          value={settings.resume}
          options={RESUME_OPTIONS}
          onChange={select("resume", "Automation resume")}
        />
        <div className="flex flex-col divide-y">
          <SwitchRow
            label="Auto-tailor resume"
            description="Create a tailored version for every strong match."
            checked={settings.autoTailor}
            onCheckedChange={(checked) => {
              setSettings((prev) => ({ ...prev, autoTailor: checked }));
              log(`Auto-tailor resume turned ${checked ? "on" : "off"}.`);
            }}
          />
          <SwitchRow
            label="Auto-generate cover letter"
            description="Draft a letter for each queued application."
            checked={settings.autoCoverLetter}
            onCheckedChange={(checked) => {
              setSettings((prev) => ({ ...prev, autoCoverLetter: checked }));
              log(`Auto cover letters turned ${checked ? "on" : "off"}.`);
            }}
          />
          <SwitchRow
            label="Auto follow-up"
            description="Nudge recruiters after 6 days of silence."
            checked={settings.autoFollowUp}
            onCheckedChange={(checked) => {
              setSettings((prev) => ({ ...prev, autoFollowUp: checked }));
              log(`Auto follow-up turned ${checked ? "on" : "off"}.`);
            }}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="Master switch"
        className={cn(settings.paused && "ring-warning/40")}
      >
        <SwitchRow
          label="Pause all automation"
          description={
            settings.paused
              ? "Everything is paused — nothing runs until you flip this back."
              : "Flip to stop every workflow immediately."
          }
          checked={settings.paused}
          onCheckedChange={(checked) => {
            setSettings((prev) => ({ ...prev, paused: checked }));
            log(`All automation ${checked ? "paused" : "resumed"}.`);
          }}
        />
      </SettingsCard>
    </div>
  );
}

export function AiPrefsSection({ log }: { log: (text: string) => void }) {
  const [prefs, setPrefs] = React.useState(AI_DEFAULTS);

  const toggle =
    (key: Exclude<keyof typeof AI_DEFAULTS, "aggressiveness">, label: string) =>
    (checked: boolean) => {
      setPrefs((prev) => ({ ...prev, [key]: checked }));
      log(`${label} turned ${checked ? "on" : "off"}.`);
    };

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard
        title="AI aggressiveness"
        description="How boldly the AI acts on your behalf."
      >
        <RadioGroup
          value={prefs.aggressiveness}
          onValueChange={(value) => {
            setPrefs((prev) => ({ ...prev, aggressiveness: value as Aggressiveness }));
            const option = AGGRESSIVENESS_OPTIONS.find((o) => o.value === value);
            log(`AI aggressiveness changed to ${option?.label}.`);
          }}
          className="grid gap-2 lg:grid-cols-3"
        >
          {AGGRESSIVENESS_OPTIONS.map((option) => {
            const active = prefs.aggressiveness === option.value;
            return (
              <Label
                key={option.value}
                htmlFor={`ai-agg-${option.value}`}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1.5 rounded-xl p-3.5 ring-1 transition-all",
                  active
                    ? "bg-accent/40 ring-2 ring-primary"
                    : "ring-foreground/10 hover:ring-foreground/25"
                )}
              >
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm font-medium">{option.label}</span>
                  <RadioGroupItem id={`ai-agg-${option.value}`} value={option.value} />
                </span>
                <span className="text-xs leading-relaxed font-normal text-muted-foreground">
                  {option.description}
                </span>
              </Label>
            );
          })}
        </RadioGroup>
      </SettingsCard>

      <SettingsCard title="Behavior">
        <div className="flex flex-col divide-y">
          <SwitchRow
            label="Explain decisions"
            description="Show why each job was selected or skipped."
            checked={prefs.explainDecisions}
            onCheckedChange={toggle("explainDecisions", "Explain decisions")}
          />
          <SwitchRow
            label="Suggest resume changes"
            description="Continuous ATS suggestions in the Resume Manager."
            checked={prefs.suggestResumeChanges}
            onCheckedChange={toggle("suggestResumeChanges", "Resume suggestions")}
          />
          <SwitchRow
            label="Tailor every resume"
            description="Tailor even for medium-strength matches (uses more credits)."
            checked={prefs.tailorEveryResume}
            onCheckedChange={toggle("tailorEveryResume", "Tailor every resume")}
          />
          <SwitchRow
            label="Generate cover letters"
            description="Draft letters automatically when applying."
            checked={prefs.generateCoverLetter}
            onCheckedChange={toggle("generateCoverLetter", "Cover letter generation")}
          />
          <SwitchRow
            label="Interview coaching"
            description="Prep packs and likely questions before every interview."
            checked={prefs.interviewCoaching}
            onCheckedChange={toggle("interviewCoaching", "Interview coaching")}
          />
          <SwitchRow
            label="Learning mode"
            description="Let the AI learn from which suggestions you accept."
            checked={prefs.learningMode}
            onCheckedChange={toggle("learningMode", "Learning mode")}
          />
        </div>
      </SettingsCard>
    </div>
  );
}

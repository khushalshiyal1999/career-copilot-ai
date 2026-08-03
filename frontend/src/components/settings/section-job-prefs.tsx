"use client";

import * as React from "react";

import {
  JOB_PREFS_DEFAULTS,
  SOURCE_LABELS,
} from "@/components/settings/data";
import {
  ChipInput,
  ChipList,
  SelectField,
  SettingsCard,
  SwitchRow,
} from "@/components/settings/settings-ui";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SALARY_STOPS = ["₹18 LPA", "₹24 LPA", "₹28 LPA", "₹35 LPA", "₹45 LPA", "₹60 LPA"];

const SIZE_LABELS: { id: keyof typeof JOB_PREFS_DEFAULTS.companySize; label: string }[] = [
  { id: "startup", label: "Startup" },
  { id: "enterprise", label: "Enterprise" },
  { id: "product", label: "Product" },
  { id: "service", label: "Service" },
];

export function JobPrefsSection({ log }: { log: (text: string) => void }) {
  const [prefs, setPrefs] = React.useState(JOB_PREFS_DEFAULTS);

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard title="Locations" description="Where the AI should look for roles.">
        <ChipList
          items={prefs.locations}
          onRemove={(item) => {
            setPrefs((prev) => ({
              ...prev,
              locations: prev.locations.filter((l) => l !== item),
            }));
            log(`${item} removed from locations.`);
          }}
        />
        <ChipInput
          placeholder="Add a location…"
          onAdd={(item) => {
            setPrefs((prev) =>
              prev.locations.includes(item)
                ? prev
                : { ...prev, locations: [...prev.locations, item] }
            );
            log(`${item} added to locations.`);
          }}
        />
        <div className="flex flex-col divide-y border-t pt-2">
          {(
            [
              ["remote", "Remote", "Fully distributed roles."],
              ["hybrid", "Hybrid", "Part office, part home."],
              ["onsite", "Onsite", "Office-based roles."],
            ] as const
          ).map(([key, label, description]) => (
            <SwitchRow
              key={key}
              label={label}
              description={description}
              checked={prefs.workModes[key]}
              onCheckedChange={(checked) => {
                setPrefs((prev) => ({
                  ...prev,
                  workModes: { ...prev.workModes, [key]: checked },
                }));
                log(`${label} roles turned ${checked ? "on" : "off"}.`);
              }}
            />
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Salary band" description="Roles outside this band are skipped by automation.">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="jp-min-salary"
            label="Minimum salary"
            value={prefs.minSalary}
            options={SALARY_STOPS}
            onChange={(value) => {
              setPrefs((prev) => ({ ...prev, minSalary: value }));
              log(`Minimum salary set to ${value}.`);
            }}
          />
          <SelectField
            id="jp-max-salary"
            label="Maximum salary"
            value={prefs.maxSalary}
            options={SALARY_STOPS}
            onChange={(value) => {
              setPrefs((prev) => ({ ...prev, maxSalary: value }));
              log(`Maximum salary set to ${value}.`);
            }}
          />
        </div>
      </SettingsCard>

      <SettingsCard title="Company type">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SIZE_LABELS.map(({ id, label }) => {
            const checkboxId = `jp-size-${id}`;
            return (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={checkboxId}
                  checked={prefs.companySize[id]}
                  onCheckedChange={(checked) => {
                    setPrefs((prev) => ({
                      ...prev,
                      companySize: { ...prev.companySize, [id]: checked === true },
                    }));
                    log(`${label} companies turned ${checked ? "on" : "off"}.`);
                  }}
                />
                <Label htmlFor={checkboxId} className="cursor-pointer text-sm">
                  {label}
                </Label>
              </div>
            );
          })}
        </div>
      </SettingsCard>

      <SettingsCard
        title="Company lists"
        description="Whitelisted companies always surface; blacklisted ones never do."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-success">Whitelisted</span>
            <ChipList
              items={prefs.whitelisted}
              tone="positive"
              onRemove={(item) => {
                setPrefs((prev) => ({
                  ...prev,
                  whitelisted: prev.whitelisted.filter((c) => c !== item),
                }));
                log(`${item} removed from whitelist.`);
              }}
            />
            <ChipInput
              placeholder="Whitelist a company…"
              onAdd={(item) => {
                setPrefs((prev) =>
                  prev.whitelisted.includes(item)
                    ? prev
                    : { ...prev, whitelisted: [...prev.whitelisted, item] }
                );
                log(`${item} added to whitelist.`);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-destructive">Blacklisted</span>
            <ChipList
              items={prefs.blacklisted}
              tone="negative"
              onRemove={(item) => {
                setPrefs((prev) => ({
                  ...prev,
                  blacklisted: prev.blacklisted.filter((c) => c !== item),
                }));
                log(`${item} removed from blacklist.`);
              }}
            />
            <ChipInput
              placeholder="Blacklist a company…"
              onAdd={(item) => {
                setPrefs((prev) =>
                  prev.blacklisted.includes(item)
                    ? prev
                    : { ...prev, blacklisted: [...prev.blacklisted, item] }
                );
                log(`${item} added to blacklist.`);
              }}
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Preferred sources" description="Which boards the automation scans.">
        <div className="flex flex-col divide-y">
          {SOURCE_LABELS.map(({ id, label }) => (
            <SwitchRow
              key={id}
              label={label}
              checked={prefs.sources[id]}
              onCheckedChange={(checked) => {
                setPrefs((prev) => ({
                  ...prev,
                  sources: { ...prev.sources, [id]: checked },
                }));
                log(`${label} ${checked ? "added to" : "removed from"} preferred sources.`);
              }}
            />
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

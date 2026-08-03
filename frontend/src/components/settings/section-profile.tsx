"use client";

import * as React from "react";
import { toast } from "sonner";

import { PROFILE_DEFAULTS, TIMEZONES } from "@/components/settings/data";
import { SelectField, SettingsCard, TextField } from "@/components/settings/settings-ui";
import { Camera } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileSection({ log }: { log: (text: string) => void }) {
  const [profile, setProfile] = React.useState(PROFILE_DEFAULTS);

  const set = (key: keyof typeof PROFILE_DEFAULTS) => (value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const commit = (label: string) => () => log(`${label} updated.`);

  return (
    <div className="flex flex-col gap-4">
      <SettingsCard
        title="Photo"
        description="Shown on applications where the source supports it."
      >
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="grid size-16 place-items-center rounded-full bg-linear-to-br from-primary/25 to-info/25 font-heading text-xl font-semibold text-primary ring-1 ring-foreground/10"
          >
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <div className="flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() => toast("Drop an image — square, at least 400×400 works best.")}
            >
              <Camera data-icon="inline-start" />
              Change photo
            </Button>
            <span className="text-xs text-muted-foreground">
              PNG or JPG, up to 2 MB.
            </span>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="pf-name" label="Name" value={profile.name} onChange={set("name")} onCommit={commit("Name")} />
          <TextField id="pf-email" label="Email" type="email" value={profile.email} onChange={set("email")} onCommit={commit("Email")} />
          <TextField id="pf-phone" label="Phone" value={profile.phone} onChange={set("phone")} onCommit={commit("Phone")} />
          <TextField id="pf-location" label="Location" value={profile.location} onChange={set("location")} onCommit={commit("Location")} />
          <SelectField
            id="pf-timezone"
            label="Timezone"
            value={profile.timezone}
            options={TIMEZONES}
            onChange={(value) => {
              set("timezone")(value);
              log(`Timezone changed to ${value}.`);
            }}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="Links"
        description="The AI uses these as portfolio signal when scoring matches."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="pf-portfolio" label="Portfolio" value={profile.portfolio} onChange={set("portfolio")} onCommit={commit("Portfolio link")} />
          <TextField id="pf-github" label="GitHub" value={profile.github} onChange={set("github")} onCommit={commit("GitHub link")} />
          <TextField id="pf-linkedin" label="LinkedIn" value={profile.linkedin} onChange={set("linkedin")} onCommit={commit("LinkedIn link")} />
          <TextField id="pf-website" label="Website" value={profile.website} onChange={set("website")} onCommit={commit("Website link")} />
        </div>
      </SettingsCard>

      <SettingsCard title="Bio" description="Used as grounding for cover letters and outreach.">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-bio" className="sr-only">
            Bio
          </Label>
          <Textarea
            id="pf-bio"
            value={profile.bio}
            rows={4}
            onChange={(event) => set("bio")(event.target.value)}
            onBlur={() => log("Bio updated.")}
          />
          <span className="text-xs text-muted-foreground tabular-nums">
            {profile.bio.length} / 400 characters
          </span>
        </div>
      </SettingsCard>
    </div>
  );
}

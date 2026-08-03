"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  APPLICATION_COMPANIES,
  SOURCES,
  STAGE_LABEL,
  type Application,
  type Source,
  type Stage,
} from "@/components/applications/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ADDABLE_STAGES: Stage[] = ["applied", "screening", "interview", "technical", "hr", "offer"];

interface AddApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (app: Application) => void;
}

/** Quick manual entry for applications submitted outside CareerCopilot. */
export function AddApplicationDialog({ open, onOpenChange, onAdd }: AddApplicationDialogProps) {
  const [companyId, setCompanyId] = React.useState("");
  const [role, setRole] = React.useState("");
  const [source, setSource] = React.useState<Source>("LinkedIn");
  const [stage, setStage] = React.useState<Stage>("applied");
  const [salary, setSalary] = React.useState("");
  const [location, setLocation] = React.useState("");

  const reset = () => {
    setCompanyId("");
    setRole("");
    setSource("LinkedIn");
    setStage("applied");
    setSalary("");
    setLocation("");
  };

  const submit = () => {
    const company = APPLICATION_COMPANIES.find((c) => c.id === companyId);
    if (!company || !role.trim()) {
      toast.error("Pick a company and add the job title.");
      return;
    }

    const status =
      stage === "interview" || stage === "technical" || stage === "hr"
        ? "interview"
        : (stage as Application["status"]);

    onAdd({
      id: `app-manual-${Date.now()}`,
      company,
      role: role.trim(),
      source,
      appliedDaysAgo: 0,
      stage,
      status,
      nextInterview: null,
      salaryLabel: salary.trim() || "Not disclosed",
      salaryUsd: 0,
      location: location.trim() || "Remote",
      match: 75 + (role.trim().length % 18),
      priority: "medium",
      recruiter: null,
      resumeUsed: "Resume — Frontend 2026 v4.pdf",
      coverLetterUsed: null,
      timeline: [
        {
          kind: "applied",
          title: "Applied",
          description: `Application logged manually — submitted via ${source}.`,
          daysAgo: 0,
          time: new Date().toTimeString().slice(0, 5),
        },
      ],
      insights: [
        "I'm analyzing this application — match score is an early estimate.",
        `**${company.name}** typically screens new applicants within **8 days**.`,
      ],
      notes: [],
      attachments: [
        { name: "Resume — Frontend 2026 v4.pdf", kind: "resume", size: "176 KB" },
      ],
      links: [],
      responseRate: 68,
      lastActivityDays: 0,
    });
    toast.success(`Added ${role.trim()} at ${company.name} to your pipeline.`);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add application</DialogTitle>
          <DialogDescription>
            Track an application you submitted outside CareerCopilot.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-app-company">Company</Label>
              <Select value={companyId} onValueChange={setCompanyId}>
                <SelectTrigger id="add-app-company" className="w-full">
                  <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                  {APPLICATION_COMPANIES.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-app-source">Source</Label>
              <Select value={source} onValueChange={(value) => setSource(value as Source)}>
                <SelectTrigger id="add-app-source" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="add-app-role">Job title</Label>
            <Input
              id="add-app-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-app-stage">Current stage</Label>
              <Select value={stage} onValueChange={(value) => setStage(value as Stage)}>
                <SelectTrigger id="add-app-stage" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ADDABLE_STAGES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {STAGE_LABEL[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="add-app-salary">Salary (optional)</Label>
              <Input
                id="add-app-salary"
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                placeholder="e.g. $140k – $180k"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="add-app-location">Location (optional)</Label>
            <Input
              id="add-app-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Remote — US"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Add application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import { toast } from "sonner";

import { TEMPLATES, type Resume } from "@/components/resume/data";
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

const TARGET_ROLES = [
  "Frontend Engineer",
  "React Developer",
  "Senior Frontend Engineer",
  "Full Stack Engineer",
];

interface CreateResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (input: { name: string; targetRole: string; template: string }) => void;
}

/** New-resume dialog — name, target role, template. */
export function CreateResumeDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateResumeDialogProps) {
  const [name, setName] = React.useState("");
  const [targetRole, setTargetRole] = React.useState(TARGET_ROLES[0]);
  const [template, setTemplate] = React.useState(TEMPLATES[0].id);

  const submit = () => {
    if (!name.trim()) {
      toast.error("Give the resume a name.");
      return;
    }
    onCreate({ name: name.trim(), targetRole, template });
    setName("");
    setTargetRole(TARGET_ROLES[0]);
    setTemplate(TEMPLATES[0].id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new resume</DialogTitle>
          <DialogDescription>
            I&apos;ll seed it from your profile — you refine from there.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-resume-name">Resume name</Label>
            <Input
              id="create-resume-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Design Systems — 2026"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-resume-role">Target role</Label>
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger id="create-resume-role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TARGET_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-resume-template">Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger id="create-resume-template" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATES.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Create resume</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface RenameResumeDialogProps {
  resume: Resume | null;
  onOpenChange: (open: boolean) => void;
  onRename: (id: string, name: string) => void;
}

export function RenameResumeDialog({
  resume,
  onOpenChange,
  onRename,
}: RenameResumeDialogProps) {
  // The parent keys this dialog by the target resume, so the initializer
  // picks up the current name via remount each time a rename starts.
  const [name, setName] = React.useState(resume?.name ?? "");

  const submit = () => {
    if (!resume) return;
    if (!name.trim()) {
      toast.error("The name can't be empty.");
      return;
    }
    onRename(resume.id, name.trim());
    onOpenChange(false);
  };

  return (
    <Dialog open={resume !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename resume</DialogTitle>
          <DialogDescription className="sr-only">
            Choose a new name for this resume.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rename-resume-name">Resume name</Label>
          <Input
            id="rename-resume-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit();
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

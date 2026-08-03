"use client";

/**
 * Internal design-system reference. Not part of the product navigation —
 * delete or gate this route before shipping to real users.
 */
import * as React from "react";

import {
  AiIcon,
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  FileText,
  Inbox,
  Mail,
  Plus,
  Search,
  Wand2,
} from "@/components/icons";
import { PageContainer } from "@/components/layout/PageContainer";
import { ActionCard } from "@/components/ui/action-card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Divider } from "@/components/ui/divider";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/ui/fade-in";
import { Field, FieldLabel } from "@/components/ui/field";
import { InfoCard } from "@/components/ui/info-card";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { MetricCard } from "@/components/ui/metric-card";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SkeletonAvatar,
  SkeletonCard,
  SkeletonText,
} from "@/components/ui/skeletons";
import { Spinner } from "@/components/ui/spinner";
import { StatusDot } from "@/components/ui/status-dot";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { TextareaField } from "@/components/ui/textarea-field";
import {
  Body,
  BodyLarge,
  Caption,
  Display,
  H1,
  H2,
  H3,
  H4,
  LabelText,
  Muted,
  SmallText,
} from "@/components/ui/typography";

const ROLE_OPTIONS = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "backend", label: "Backend Engineer" },
  { value: "fullstack", label: "Full-stack Engineer" },
  { value: "design", label: "Product Designer" },
  { value: "pm", label: "Product Manager" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={title} />
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [role, setRole] = React.useState("");
  const [stack, setStack] = React.useState<string[]>(["frontend", "design"]);
  const [loading, setLoading] = React.useState(false);

  return (
    <PageContainer
      title="Design System"
      subtitle="Internal reference for every reusable UI component."
      actions={
        <Button variant="ai" size="sm">
          <AiIcon data-icon="inline-start" />
          AI Action
        </Button>
      }
    >
      <div className="flex flex-col gap-10 pb-10">
        <Section title="Typography">
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Display>Display</Display>
              <H1>Heading 1</H1>
              <H2>Heading 2</H2>
              <H3>Heading 3</H3>
              <H4>Heading 4</H4>
              <BodyLarge>
                Body large — for lead paragraphs and prominent copy.
              </BodyLarge>
              <Body>
                Body — the default paragraph style across the application.
              </Body>
              <SmallText>Small text — secondary inline information.</SmallText>
              <LabelText>Label — compact medium-weight labels.</LabelText>
              <Caption>Caption — timestamps and fine print.</Caption>
              <Muted>Muted — de-emphasized supporting text.</Muted>
            </CardContent>
          </Card>
        </Section>

        <Section title="Buttons">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="ai">
                  <Wand2 data-icon="inline-start" />
                  AI Action
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Add">
                  <Plus />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline">
                  <Mail data-icon="inline-start" />
                  Left icon
                </Button>
                <Button variant="outline">
                  Right icon
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button disabled>Disabled</Button>
                <Button
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 2000);
                  }}
                >
                  {loading ? "Saving…" : "Click to load"}
                </Button>
                <Button variant="secondary" loading>
                  Loading
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section title="Badges & Status">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="draft">Draft</Badge>
                <Badge variant="running">
                  <StatusDot tone="running" size="sm" />
                  Running
                </Badge>
                <Badge variant="scheduled">Scheduled</Badge>
                <Badge variant="completed">Completed</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <StatusDot tone="success" label="Operational" />
                <StatusDot tone="warning" label="Degraded" />
                <StatusDot tone="error" label="Down" />
                <StatusDot tone="info" label="Syncing" />
                <StatusDot tone="running" label="Running" />
                <StatusDot tone="neutral" label="Idle" />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
                <AvatarGroup>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section title="Inputs">
          <Card>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Full name"
                placeholder="Ada Lovelace"
                description="Shown on your public profile."
              />
              <TextField
                type="email"
                label="Email"
                placeholder="you@example.com"
                leftIcon={<Mail aria-hidden />}
              />
              <TextField
                type="password"
                label="Password"
                placeholder="••••••••"
                description="Minimum 8 characters."
              />
              <TextField
                type="search"
                label="Search"
                placeholder="Search jobs…"
              />
              <TextField
                type="url"
                label="Portfolio"
                prefix="https://"
                placeholder="yoursite.com"
              />
              <TextField
                type="number"
                label="Expected salary"
                prefix="$"
                suffix="per year"
                placeholder="120000"
              />
              <TextField
                label="Company"
                defaultValue="Initech"
                error="This company is already in your list."
              />
              <TextField
                label="LinkedIn"
                defaultValue="linkedin.com/in/ada"
                success="Profile URL verified."
              />
              <TextField label="Disabled" placeholder="Read only" disabled />
              <TextareaField
                label="Cover letter intro"
                placeholder="Write a short introduction…"
                description="Auto-resizes as you type."
                maxLength={280}
                showCount
              />
            </CardContent>
          </Card>
        </Section>

        <Section title="Selection Controls">
          <Card>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="ds-select">Select</FieldLabel>
                <Select>
                  <SelectTrigger id="ds-select" className="w-full">
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Combobox</FieldLabel>
                <Combobox
                  options={ROLE_OPTIONS}
                  value={role}
                  onValueChange={setRole}
                  placeholder="Pick a role…"
                />
              </Field>
              <Field>
                <FieldLabel>Multi select</FieldLabel>
                <MultiSelect
                  options={ROLE_OPTIONS}
                  value={stack}
                  onValueChange={setStack}
                  placeholder="Pick roles…"
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="ds-check" defaultChecked />
                <FieldLabel htmlFor="ds-check">
                  Email me weekly job matches
                </FieldLabel>
              </Field>
              <Field>
                <FieldLabel>Work location</FieldLabel>
                <RadioGroup defaultValue="remote" className="gap-2">
                  <Field orientation="horizontal">
                    <RadioGroupItem value="remote" id="ds-remote" />
                    <FieldLabel htmlFor="ds-remote">Remote</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="hybrid" id="ds-hybrid" />
                    <FieldLabel htmlFor="ds-hybrid">Hybrid</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="onsite" id="ds-onsite" />
                    <FieldLabel htmlFor="ds-onsite">On-site</FieldLabel>
                  </Field>
                </RadioGroup>
              </Field>
              <Field orientation="horizontal">
                <Switch id="ds-switch" defaultChecked />
                <FieldLabel htmlFor="ds-switch">Auto-apply enabled</FieldLabel>
              </Field>
            </CardContent>
          </Card>
        </Section>

        <Section title="Cards">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Applications"
              value="128"
              delta="+12.5%"
              trend="up"
              icon={<Briefcase />}
              caption="vs. last month"
            />
            <MetricCard
              label="Response rate"
              value="23%"
              delta="-2.1%"
              trend="down"
              icon={<Mail />}
              caption="vs. last month"
            />
            <MetricCard label="Interviews" value="9" trend="neutral" delta="0" />
            <MetricCard
              label="Offers"
              value="2"
              delta="+2"
              trend="up"
              caption="2 pending decisions"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Standard card</CardTitle>
                <CardDescription>
                  Header, title, description, content and footer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Body>
                  Cards use a hairline ring instead of shadows and inherit the
                  global radius scale.
                </Body>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
            <div className="flex flex-col gap-4">
              <ActionCard
                icon={<Bot />}
                title="Generate tailored resume"
                description="Let AI adapt your resume to a job description."
              />
              <InfoCard
                tone="info"
                icon={<Bell />}
                title="Interview reminder"
                description="Your interview with Initech starts in 45 minutes."
                action={
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                }
              />
              <InfoCard
                tone="warning"
                icon={<FileText />}
                title="Resume missing keywords"
                description="3 required skills from the job post aren't mentioned."
              />
            </div>
          </div>
        </Section>

        <Section title="Loading">
          <Card>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <Spinner />
                <Spinner className="size-6" />
                <Button loading variant="outline">
                  Button loader
                </Button>
                <SkeletonAvatar size="sm" />
                <SkeletonAvatar />
                <SkeletonAvatar size="lg" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SkeletonCard />
                <div className="flex flex-col justify-center">
                  <SkeletonText lines={4} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section title="Empty State">
          <FadeIn>
            <EmptyState
              icon={<Inbox />}
              title="No applications yet"
              description="Track your job applications in one place. Start by adding your first one."
              action={
                <Button size="sm">
                  <Plus data-icon="inline-start" />
                  Add application
                </Button>
              }
              secondaryAction={
                <Button variant="outline" size="sm">
                  <Search data-icon="inline-start" />
                  Browse jobs
                </Button>
              }
            />
          </FadeIn>
        </Section>

        <Section title="Dividers">
          <Card>
            <CardContent className="flex flex-col gap-6">
              <Divider />
              <Divider>or continue with</Divider>
            </CardContent>
          </Card>
        </Section>
      </div>
    </PageContainer>
  );
}

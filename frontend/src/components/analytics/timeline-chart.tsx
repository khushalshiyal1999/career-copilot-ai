"use client";

import * as React from "react";

import { TIMELINE, type RangeKey } from "@/components/analytics/data";
import { TrendingUp } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "90d", label: "90 Days" },
  { key: "1y", label: "1 Year" },
];

const WIDTH = 600;
const HEIGHT = 160;
const PAD = 8;

/** Applications sent over time — SVG area chart with a range switcher. */
export function TimelineChart() {
  const [range, setRange] = React.useState<RangeKey>("30d");
  const { points } = TIMELINE[range];

  const max = Math.max(...points.map((p) => p.value), 1);
  const stepX = (WIDTH - PAD * 2) / (points.length - 1);
  const coords = points.map((point, index) => ({
    x: PAD + index * stepX,
    y: PAD + (1 - point.value / max) * (HEIGHT - PAD * 2),
  }));
  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${coords[coords.length - 1].x.toFixed(1)},${HEIGHT - PAD} L${PAD},${HEIGHT - PAD} Z`;
  const total = points.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 font-heading text-sm font-semibold">
          <TrendingUp aria-hidden className="size-3.5 text-muted-foreground" />
          Applications Over Time
        </h3>
        <div
          className="flex items-center rounded-lg border border-input p-0.5"
          role="group"
          aria-label="Time range"
        >
          {RANGES.map((option) => (
            <Button
              key={option.key}
              variant="ghost"
              size="xs"
              aria-pressed={range === option.key}
              className={cn(range === option.key && "bg-muted text-foreground")}
              onClick={() => setRange(option.key)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground tabular-nums">{total}</span>{" "}
        applications · {TIMELINE[range].label.toLowerCase()} · peak of{" "}
        <span className="font-medium text-foreground tabular-nums">{max}</span> in one period
      </p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={`Applications sent, ${TIMELINE[range].label}`}
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1={PAD}
            x2={WIDTH - PAD}
            y1={PAD + fraction * (HEIGHT - PAD * 2)}
            y2={PAD + fraction * (HEIGHT - PAD * 2)}
            className="stroke-border"
            strokeWidth="0.5"
            strokeDasharray="3 4"
          />
        ))}
        <path d={areaPath} className="fill-primary/10" />
        <path
          d={linePath}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary"
        />
        {coords.map((coordinate, index) => (
          <circle
            key={index}
            cx={coordinate.x}
            cy={coordinate.y}
            r="2.5"
            className="fill-card stroke-primary"
            strokeWidth="1.5"
          >
            <title>
              {points[index].label || "·"}: {points[index].value} applications
            </title>
          </circle>
        ))}
      </svg>

      <div className="flex justify-between text-[10px] text-muted-foreground">
        {points.map((point, index) => (
          <span key={index} className="flex-1 text-center">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

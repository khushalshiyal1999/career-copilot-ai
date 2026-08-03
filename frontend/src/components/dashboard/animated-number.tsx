"use client";

import * as React from "react";
import { animate, useReducedMotion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
}

/** Counts up from 0 on mount; renders the final value for reduced motion. */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 0.9,
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  const format = React.useCallback(
    (v: number) =>
      `${prefix}${new Intl.NumberFormat("en-US").format(Math.round(v))}${suffix}`,
    [prefix, suffix]
  );

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [value, duration, format, reducedMotion]);

  // SSR/no-JS shows the final value; the effect restarts the count from 0.
  return <span ref={ref}>{format(value)}</span>;
}

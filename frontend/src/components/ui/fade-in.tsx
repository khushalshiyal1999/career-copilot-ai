"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

/**
 * Subtle entrance animation (fade + 4px rise, 200ms). Wrap content that
 * appears after loading; respects prefers-reduced-motion.
 */
function FadeIn({
  delay = 0,
  className,
  children,
}: {
  /** Seconds; use small values (e.g. 0.05 * index) to stagger lists. */
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { FadeIn }

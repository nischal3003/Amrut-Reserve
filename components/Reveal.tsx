"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const CALM = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** translateY distance (px) the element rises from. */
  distance?: number;
  /** also scale up from 0.97 (used for image reveals). */
  scale?: boolean;
  /** entrance delay in seconds — use for staggering siblings. */
  delay?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "transition" | "viewport">;

/**
 * One-time scroll reveal: fade + slight rise (and optional scale), triggered
 * when ~15% of the element enters the viewport. Mirrors the design reference's
 * IntersectionObserver reveals with calm cubic-bezier(0.16,1,0.3,1) easing.
 */
export function Reveal({
  children,
  distance = 28,
  scale = false,
  delay = 0,
  duration = 0.9,
  className,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance, scale: scale ? 0.97 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: CALM, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

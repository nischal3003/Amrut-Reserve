"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CALM } from "./Reveal";

const WORDMARK = "Amrut Reserve";
const SESSION_KEY = "amrut-reserve-preloader-shown";
// Smooth ease-in-out (gentle start AND end) for the exit wipe — CALM is
// ease-out biased (snaps to full speed immediately), which read as an abrupt
// yank for a full-panel slide instead of a graceful glide.
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;

// useEffect only runs after the browser has already painted, so on a repeat
// visit the full intro (solid panel + logo draw-in) would still flash for
// one frame before the skip kicked in. useLayoutEffect flushes synchronously
// before paint, so the skip is invisible instead. It's a no-op on the server
// (this is a client component, so that's fine — there's nothing to skip
// during SSR anyway).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Brand intro: logo fades in, then the wordmark types in letter by letter,
 * then the whole panel slides up off-screen to reveal the site underneath.
 * Runs once per browser session (sessionStorage-gated) so it doesn't replay
 * on every soft reload during development or repeat visits.
 *
 * `visible` starts `true` unconditionally (rather than reading sessionStorage
 * in the initializer) so the server-rendered markup and the client's first
 * render always agree — the skip check happens in an effect instead.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (reduce || sessionStorage.getItem(SESSION_KEY) === "1") {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setShowText(true), 800);
    const t2 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EXIT_EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-[clamp(20px,4vw,36px)] bg-forest"
        >
          <svg
            aria-hidden
            viewBox="0 0 100 140"
            className="h-[clamp(64px,10vw,110px)] w-auto"
            fill="none"
          >
            <motion.path
              d="M50 5 C78 32, 78 108, 50 135 C22 108, 22 32, 50 5 Z"
              stroke="#C9A15F"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: CALM }}
            />
            <motion.path
              d="M50 28 L50 112"
              stroke="#C9A15F"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: CALM, delay: 0.5 }}
            />
            <motion.path
              d="M50 55 L34 45"
              stroke="#C9A15F"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: CALM, delay: 0.75 }}
            />
            <motion.path
              d="M50 73 L34 63"
              stroke="#C9A15F"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: CALM, delay: 0.85 }}
            />
            <motion.path
              d="M50 91 L34 81"
              stroke="#C9A15F"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: CALM, delay: 0.95 }}
            />
          </svg>

          <div className="flex overflow-hidden px-6">
            {WORDMARK.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: CALM, delay: i * 0.035 }}
                className="font-serif text-[clamp(40px,8vw,84px)] font-normal leading-none tracking-[-0.01em] text-ivory"
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

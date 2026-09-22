"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CALM } from "./Reveal";

const WORDMARK = "Amrut Reserve";
const SESSION_KEY = "amrut-reserve-preloader-shown";
// Smooth ease-in-out (gentle start AND end) for the exit wipe — CALM is
// ease-out biased (snaps to full speed immediately), which read as an abrupt
// yank for a full-panel slide instead of a graceful glide.
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
// How long to hold the finished logo/wordmark on screen before sliding away.
const HOLD_AFTER_INTRO = 500;
// Absolute safety net: forces the exit even if an onAnimationComplete
// callback never fires for some reason, so the preloader can never get
// stuck on screen indefinitely.
const FALLBACK_MS = 6000;

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
 * The exit used to fire off a flat `setTimeout(2500)`, which assumed the SVG
 * draw-in and letter-by-letter type-in would always finish within that
 * window. Under any real contention (slow device, first-load JS parsing,
 * several concurrent path animations), they don't — the panel would start
 * sliding away mid-draw. The exit is now gated on the actual last vein path
 * and last wordmark letter reporting completion via onAnimationComplete, so
 * it can never fire before what's on screen has genuinely finished
 * animating, however long that takes.
 *
 * `visible` starts `true` unconditionally (rather than reading sessionStorage
 * in the initializer) so the server-rendered markup and the client's first
 * render always agree — the skip check happens in an effect instead.
 *
 * `onDone` fires the moment `visible` flips to false (skip or real finish),
 * not when the exit slide itself completes — it's the signal callers use to
 * defer their own main-thread-heavy mounts (Lenis's rAF loop, the grain
 * overlay's blend-mode filter) so they aren't competing with the logo's
 * draw-in animation for frames.
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  const wordmarkStarted = useRef(false);
  const logoDone = useRef(false);
  const wordmarkDone = useRef(false);
  const finished = useRef(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout>>();
  const holdTimer = useRef<ReturnType<typeof setTimeout>>();

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    clearTimeout(fallbackTimer.current);
    clearTimeout(holdTimer.current);
    setVisible(false);
    onDone?.();
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage can throw in locked-down contexts (private mode,
      // disabled storage) — the intro just replays next time, harmless.
    }
  };

  // Called once both the logo and the wordmark have genuinely finished
  // animating (not just "enough time has probably passed").
  const maybeHoldThenFinish = () => {
    if (logoDone.current && wordmarkDone.current) {
      holdTimer.current = setTimeout(finish, HOLD_AFTER_INTRO);
    }
  };

  useIsomorphicLayoutEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Treat an inaccessible sessionStorage as "not skipped" — worst case
      // the intro replays, which is safe.
    }

    if (reduce || skip) {
      finished.current = true;
      setVisible(false);
      onDone?.();
      return;
    }

    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      wordmarkStarted.current = true;
      setShowText(true);
    }, 800);
    fallbackTimer.current = setTimeout(finish, FALLBACK_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(fallbackTimer.current);
      clearTimeout(holdTimer.current);
    };
    // onDone is passed a fresh arrow function each render by design (see
    // AmbientEffects) — only re-running this for `reduce` changes is correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              onAnimationComplete={() => {
                logoDone.current = true;
                maybeHoldThenFinish();
              }}
            />
          </svg>

          <div className="flex overflow-hidden px-6">
            {WORDMARK.split("").map((ch, i) => {
              const isLast = i === WORDMARK.length - 1;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, ease: CALM, delay: i * 0.035 }}
                  onAnimationComplete={
                    isLast
                      ? () => {
                          // Guards against the no-op "animate === initial"
                          // completion Framer Motion may report on mount,
                          // before showText (and the real animation) starts.
                          if (!wordmarkStarted.current) return;
                          wordmarkDone.current = true;
                          maybeHoldThenFinish();
                        }
                      : undefined
                  }
                  // Each letter is its own flex item, and a lone space
                  // character as the sole content of a flex item gets its
                  // width collapsed to 0 by the browser — whitespace-pre
                  // stops that trim so the word gap actually renders.
                  className="whitespace-pre font-serif text-[clamp(40px,8vw,84px)] font-normal leading-none tracking-[-0.01em] text-ivory"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

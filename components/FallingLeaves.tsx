"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Leaf = {
  id: number;
  left: number; // vw
  size: number; // px
  duration: number; // s
  rotateFrom: number;
  rotateTo: number;
  drift: number; // px, horizontal sway by the time it lands
};

const MAX_LEAVES = 10;
const SPAWN_THROTTLE_MS = 260;
const SCROLL_DELTA_THRESHOLD = 12;

let nextLeafId = 0;

/**
 * A few tea leaves drift down whenever the visitor scrolls, thinning out
 * once they stop — a light brand touch, not a constant animation. Listens
 * to the native `scroll` event (which Lenis drives, see SmoothScroll.tsx)
 * rather than coupling to the Lenis instance directly.
 */
export function FallingLeaves() {
  const reduce = useReducedMotion();
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const lastScrollY = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    if (reduce) return;
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY.current);
      lastScrollY.current = y;

      if (delta < SCROLL_DELTA_THRESHOLD) return;
      if (now - lastSpawnTime.current < SPAWN_THROTTLE_MS) return;
      lastSpawnTime.current = now;

      const leaf: Leaf = {
        id: nextLeafId++,
        left: 6 + Math.random() * 88,
        size: 18 + Math.random() * 16,
        duration: 3.6 + Math.random() * 2.2,
        rotateFrom: Math.random() * 60 - 30,
        rotateTo: Math.random() * 360 - 180,
        drift: Math.random() * 90 - 45,
      };
      setLeaves((prev) => [...(prev.length >= MAX_LEAVES ? prev.slice(1) : prev), leaf]);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  if (reduce) return null;

  const removeLeaf = (id: number) =>
    setLeaves((prev) => prev.filter((l) => l.id !== id));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.img
            key={leaf.id}
            src="/leaf-decorative.png"
            alt=""
            initial={{ y: "-10vh", x: 0, rotate: leaf.rotateFrom, opacity: 0 }}
            animate={{
              y: "110vh",
              x: leaf.drift,
              rotate: leaf.rotateTo,
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: leaf.duration,
              ease: "linear",
              opacity: { duration: leaf.duration, times: [0, 0.08, 0.85, 1] },
            }}
            onAnimationComplete={() => removeLeaf(leaf.id)}
            style={{
              position: "absolute",
              left: `${leaf.left}vw`,
              top: 0,
              width: leaf.size,
              height: leaf.size,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

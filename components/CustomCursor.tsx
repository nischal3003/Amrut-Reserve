"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A small dot that follows the pointer and grows over links/buttons.
 * mix-blend-difference inverts against whatever's underneath, so the same
 * light dot reads correctly over both dark (forest) and light (ivory)
 * sections without per-section color logic.
 *
 * Skipped entirely on touch devices (checked once on mount) since there's
 * no persistent pointer to follow there.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setActive(!!(e.target as HTMLElement).closest("a, button"));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300"
    >
      <motion.div
        animate={{ scale: active ? 2.4 : 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="h-3 w-3 rounded-full bg-ivory"
      />
    </motion.div>
  );
}

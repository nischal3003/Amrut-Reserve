"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertia-smoothed scrolling for the whole page — the "buttery" feel behind
 * most premium/editorial sites. Framer Motion's scroll hooks (useScroll,
 * whileInView) read the native scroll position, which Lenis keeps in sync,
 * so existing reveal/parallax animations work unchanged.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

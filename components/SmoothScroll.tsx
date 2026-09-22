"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Clamp scroll velocity (px/frame) before it feeds the depth transform below,
// so a hard flick can't rotate/scale the page past a subtle, tasteful range.
const MAX_VELOCITY = 45;

/**
 * Inertia-smoothed scrolling for the whole page — the "buttery" feel behind
 * most premium/editorial sites. Framer Motion's scroll hooks (useScroll,
 * whileInView) read the native scroll position, which Lenis keeps in sync,
 * so existing reveal/parallax animations work unchanged.
 *
 * The page content (#scroll-content, wrapped in perspective by globals.css)
 * also gets a slight velocity-driven rotateX + scale each frame — it tilts
 * gently into the screen while scrolling and settles flat at rest, reading
 * as depth rather than a flat pan.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 5),
    });

    const content = document.getElementById("scroll-content");

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      if (content) {
        const v = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, lenis.velocity));
        const tilt = v * -0.035;
        const scale = 1 - Math.abs(v) * 0.0006;
        content.style.transform = `rotateX(${tilt}deg) scale(${scale})`;
      }
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (content) content.style.transform = "";
    };
  }, []);

  return null;
}

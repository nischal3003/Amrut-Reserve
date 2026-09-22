"use client";

import { useState } from "react";
import { Preloader } from "./Preloader";
import { SmoothScroll } from "./SmoothScroll";
import { GrainOverlay } from "./GrainOverlay";
import { CustomCursor } from "./CustomCursor";
import { FallingLeaves } from "./FallingLeaves";

/**
 * Lenis (SmoothScroll) starts a continuous rAF loop the instant it mounts,
 * and GrainOverlay's full-viewport blend-mode filter isn't free to
 * composite either — both were competing with the preloader's own SVG
 * draw-in animation for the main thread during the intro, making the logo
 * animate roughly instead of smoothly. Deferring their mount until the
 * preloader signals it's done removes that contention; nothing is lost,
 * since page scroll is impossible anyway while the preloader covers the
 * screen (body overflow: hidden while it's up).
 */
export function AmbientEffects() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Preloader onDone={() => setIntroDone(true)} />
      <CustomCursor />
      <FallingLeaves />
      {introDone && (
        <>
          <SmoothScroll />
          <GrainOverlay />
        </>
      )}
    </>
  );
}

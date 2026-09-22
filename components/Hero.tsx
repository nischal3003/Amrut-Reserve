"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroLattice } from "./HeroLattice";
import { CALM } from "./Reveal";
import { hero } from "@/lib/content";

// Entrance: fade + rise, staggered to mirror the reference timing.
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: CALM, delay },
});

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 400], [0, reduce ? 0 : 60]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden"
    >
      <Image
        src="/hero-tea-hills.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <HeroLattice />

      {/* Legibility gradient over the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,23,0.15)_0%,rgba(26,26,23,0.05)_40%,rgba(26,26,23,0.35)_100%)]"
      />

      {/* Content */}
      <motion.div
        style={{ y: parallax }}
        className="relative z-[2] mx-auto flex w-full max-w-[780px] flex-col items-center gap-[22px] px-[clamp(24px,6vw,56px)] text-center"
      >
        <motion.div
          {...rise(0.1)}
          className="flex flex-wrap items-center justify-center gap-[10px]"
        >
          <span className="inline-block h-px w-7 bg-brass" />
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass">
            {hero.eyebrow[0]}
          </span>
          <span className="inline-block h-[3px] w-[3px] rounded-full bg-brass opacity-60" />
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass">
            {hero.eyebrow[1]}
          </span>
        </motion.div>

        <motion.h1
          {...rise(0.25)}
          className="m-0 font-serif text-[clamp(48px,9vw,96px)] font-normal leading-[1.02] tracking-[-0.01em] text-ivory"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          {...rise(0.4)}
          className="m-0 max-w-[480px] font-sans text-[clamp(12px,1.3vw,14px)] font-medium uppercase leading-[1.6] tracking-[0.14em] text-brass"
        >
          {hero.tagline}
        </motion.p>

        <motion.div
          {...rise(0.48)}
          className="h-[2px] w-[46px] rounded-[1px] bg-[linear-gradient(90deg,transparent,#A98B5D_25%,#C9A15F_50%,#A98B5D_75%,transparent)] animate-liquor-shimmer"
        />

        <motion.div
          {...rise(0.55)}
          className="mt-[14px] flex flex-wrap justify-center gap-4"
        >
          <a
            href="#tea"
            className="border-none bg-ivory px-8 py-[15px] font-sans text-[13px] font-medium tracking-[0.06em] text-forest transition-[background,transform] duration-300 hover:-translate-y-0.5 hover:bg-parchment"
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#about"
            className="border border-ivory/40 bg-transparent px-8 py-[15px] font-sans text-[13px] font-medium tracking-[0.06em] text-ivory transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brass"
          >
            {hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
        className="absolute bottom-9 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-ivory/55">
          Scroll
        </span>
        <span className="h-[30px] w-px bg-[linear-gradient(to_bottom,rgba(245,240,230,0.6),transparent)] animate-scroll-cue" />
      </motion.div>

      {/* Floating decorative leaf, drifting gently as if caught in a breeze */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={
          reduce
            ? { opacity: 0.9 }
            : { opacity: 0.9, y: [0, -16, 0], rotate: [-6, 6, -6] }
        }
        transition={
          reduce
            ? { duration: 1, delay: 0.6 }
            : { duration: 7, delay: 0.6, ease: "easeInOut", repeat: Infinity }
        }
        className="absolute left-[clamp(16px,5vw,64px)] top-[clamp(96px,16vh,160px)] z-[2] hidden w-[clamp(70px,9vw,110px)] min-[860px]:block"
      >
        <Image
          src="/leaf-decorative.png"
          alt=""
          width={360}
          height={360}
          className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
        />
      </motion.div>

      {/* Decorative striped leaf card (desktop only) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
        className="absolute bottom-[clamp(20px,5vh,48px)] right-[clamp(20px,4vw,56px)] z-[2] hidden h-[clamp(160px,19vw,230px)] w-[clamp(120px,14vw,170px)] overflow-hidden border border-ivory/25 min-[860px]:block"
      >
        <svg
          viewBox="0 0 220 300"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <pattern
              id="leafStripes"
              width="10"
              height="10"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(169,139,93,0.35)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="220" height="300" fill="url(#leafStripes)" />
        </svg>
      </motion.div>
    </section>
  );
}



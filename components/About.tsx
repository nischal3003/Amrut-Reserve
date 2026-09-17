"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import { about } from "@/lib/content";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex flex-col items-center gap-[22px] overflow-hidden bg-forest px-[clamp(20px,6vw,64px)] py-[clamp(64px,10vw,112px)] text-center"
    >
      <motion.div style={{ y }} className="absolute inset-[-60px]">
        <Image
          src={about.bgImage}
          alt={about.bgAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,26,20,0.75),rgba(15,26,20,0.6))]"
      />

      <span className="relative z-[1] font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass">
        {about.eyebrow}
      </span>

      <Reveal
        distance={24}
        className="group relative z-[1] max-w-[760px]"
      >
        <p className="m-0 font-serif text-[clamp(22px,3.4vw,34px)] italic leading-[1.5] text-ivory transition-colors duration-500 group-hover:text-brass-deep">
          {about.quote}
        </p>
      </Reveal>

      <p className="relative z-[1] m-0 font-sans text-[13px] tracking-[0.06em] text-ivory/60">
        {about.byline}
      </p>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, CALM } from "./Reveal";
import { PendingPhoto } from "./PendingPhoto";
import { FrameCorners } from "./FrameCorners";
import { sustain } from "@/lib/content";

export function Sustainability() {
  return (
    <section
      id="sustain"
      className="relative overflow-hidden bg-parchment bg-dots-ink px-[clamp(20px,6vw,64px)] py-[clamp(56px,8vw,96px)]"
    >
      <Image
        aria-hidden
        src="/leaf-decorative.png"
        alt=""
        width={360}
        height={360}
        className="pointer-events-none absolute -left-8 -bottom-8 hidden w-[clamp(90px,10vw,140px)] rotate-[-25deg] opacity-70 sm:block"
      />

      <div className="flex flex-col items-center gap-[clamp(40px,6vw,64px)]">
      <Reveal className="flex flex-col items-center gap-[14px] text-center">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass-deep">
          {sustain.eyebrow}
        </span>
        <h2 className="m-0 font-serif text-[clamp(32px,5vw,52px)] font-normal text-forest">
          {sustain.heading}
        </h2>
      </Reveal>

      <div className="grid w-full max-w-content-narrow grid-cols-1 items-center gap-[clamp(28px,4vw,48px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative">
          <Reveal
            scale
            distance={32}
            className="relative aspect-[4/3] overflow-hidden bg-forest"
          >
            <PendingPhoto
              src={sustain.image}
              alt={sustain.imageAlt}
              tone="light"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </Reveal>
          <FrameCorners />
        </div>

        <div className="flex flex-col gap-7">
          {sustain.stats.map((stat, i) => (
            <div key={stat.text} className="flex flex-col gap-[10px]">
              <motion.div
                className="h-[2px] bg-brass"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: CALM, delay: 0.15 + i * 0.15 }}
              />
              <Reveal delay={i * 0.15} duration={0.7}>
                <p className="m-0 font-serif text-[18px] leading-[1.4] text-forest">{stat.text}</p>
                <p className="mt-2 m-0 font-sans text-[11px] tracking-[0.04em] text-brass-deep">
                  {stat.caption}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

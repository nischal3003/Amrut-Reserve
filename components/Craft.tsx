"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { Reveal, CALM } from "./Reveal";
import { FrameCorners } from "./FrameCorners";
import { RingOutline } from "./Decor";
import { craft } from "@/lib/content";

export function Craft() {
  return (
    <section
      id="craft"
      className="relative overflow-hidden bg-ivory bg-dots-ink px-[clamp(20px,6vw,64px)] py-[clamp(56px,8vw,96px)]"
    >
      <RingOutline className="left-[4%] top-[8%] hidden h-24 w-24 border-brass/20 sm:block" />
      <RingOutline className="bottom-[6%] right-[5%] hidden h-12 w-12 border-brass-deep/25 sm:block" />

      <div className="flex flex-col items-center gap-[clamp(40px,6vw,64px)]">
      <Reveal className="flex flex-col items-center gap-[14px] text-center">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass-deep">
          {craft.eyebrow}
        </span>
        <h2 className="m-0 font-serif text-[clamp(32px,5vw,52px)] font-normal text-forest">
          {craft.heading}
        </h2>
      </Reveal>

      <div className="flex w-full max-w-content-narrow flex-wrap items-stretch justify-center gap-[clamp(20px,3vw,32px)]">
        {craft.steps.map((step, i) => (
          <Fragment key={step.num}>
            {i > 0 && (
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 80 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: CALM, delay: i * 0.1 }}
                className="hidden w-px self-center bg-forest/[0.12] md:block"
              />
            )}
            <Reveal
              delay={i * 0.1}
              duration={0.7}
              className="relative flex w-[140px] flex-col items-center gap-2 text-center"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 left-1/2 -z-10 -translate-x-1/2 select-none font-serif text-[88px] leading-none text-forest/[0.06]"
              >
                {step.num}
              </span>
              <span className="font-serif text-[22px] text-brass-deep">{step.num}</span>
              <p className="m-0 font-sans text-[14px] font-semibold tracking-[0.04em] text-ink">
                {step.label}
              </p>
              <p className="m-0 font-sans text-[13px] leading-[1.5] text-ink/55">{step.desc}</p>
            </Reveal>
          </Fragment>
        ))}
      </div>

      <div className="relative w-full max-w-content-narrow">
        <Reveal
          scale
          distance={32}
          className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]"
        >
          <Image
            src={craft.bannerImage}
            alt={craft.bannerAlt}
            fill
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,58,46,0.15),rgba(31,58,46,0.35))]"
          />
        </Reveal>
        <FrameCorners />
      </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { brew } from "@/lib/content";

export function BrewGuide() {
  return (
    <section className="relative overflow-hidden bg-forest bg-dots-ivory px-[clamp(20px,6vw,64px)] py-[clamp(48px,7vw,80px)]">
      <Image
        aria-hidden
        src="/tea-leaves-pile.png"
        alt=""
        width={728}
        height={468}
        className="pointer-events-none absolute -left-16 bottom-0 hidden w-[clamp(200px,22vw,320px)] rotate-[-8deg] opacity-80 md:block"
      />
      <Image
        aria-hidden
        src="/tea-leaves-green.png"
        alt=""
        width={900}
        height={565}
        className="pointer-events-none absolute -right-16 top-0 hidden w-[clamp(200px,22vw,320px)] rotate-[8deg] opacity-80 md:block"
      />

      <div className="relative flex flex-col items-center gap-[clamp(32px,5vw,48px)]">
      <Reveal className="flex max-w-[560px] flex-col items-center gap-[14px] text-center">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass">
          {brew.eyebrow}
        </span>
        <h2 className="m-0 font-serif text-[clamp(28px,4.5vw,44px)] font-normal text-ivory">
          {brew.heading}
        </h2>
        <p className="m-0 font-sans text-[15px] leading-[1.7] text-ivory/70">{brew.intro}</p>
      </Reveal>

      <div className="grid w-full max-w-content-narrow grid-cols-2 gap-x-[clamp(20px,4vw,32px)] gap-y-10 sm:grid-cols-4">
        {brew.steps.map((step, i) => (
          <Reveal
            key={step.label}
            delay={i * 0.08}
            duration={0.6}
            className="flex flex-col items-center gap-1 text-center"
          >
            <span className="font-serif text-[clamp(22px,3vw,30px)] text-brass">{step.value}</span>
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-ivory">
              {step.label}
            </span>
            <span className="font-sans text-[12px] leading-[1.5] text-ivory/55">{step.note}</span>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

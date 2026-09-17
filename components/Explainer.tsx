"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { explainer } from "@/lib/content";

export function Explainer() {
  return (
    <section className="relative overflow-hidden bg-parchment bg-dots-ink px-[clamp(20px,6vw,64px)] py-[clamp(48px,7vw,80px)]">
      <Image
        aria-hidden
        src="/leaf-decorative.png"
        alt=""
        width={360}
        height={360}
        className="pointer-events-none absolute -right-6 -top-10 hidden w-[clamp(90px,10vw,140px)] rotate-[35deg] scale-x-[-1] opacity-70 sm:block"
      />

      <div className="relative flex flex-col items-center gap-[clamp(32px,5vw,48px)]">
      <Reveal className="flex max-w-[560px] flex-col items-center gap-[14px] text-center">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass-deep">
          {explainer.eyebrow}
        </span>
        <h2 className="m-0 font-serif text-[clamp(28px,4.5vw,44px)] font-normal text-forest">
          {explainer.heading}
        </h2>
        <p className="m-0 font-sans text-[15px] leading-[1.7] text-ink/60">{explainer.intro}</p>
      </Reveal>

      <div className="grid w-full max-w-content-narrow grid-cols-1 gap-[clamp(24px,4vw,32px)] sm:grid-cols-3">
        {explainer.points.map((point, i) => (
          <Reveal
            key={point.label}
            delay={i * 0.1}
            duration={0.7}
            className="flex flex-col items-center gap-2 rounded-card border border-brass/20 bg-ivory px-6 py-8 text-center"
          >
            <p className="m-0 font-serif text-[18px] text-forest">{point.label}</p>
            <p className="m-0 font-sans text-[13px] leading-[1.6] text-ink/55">{point.desc}</p>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "./Reveal";
import { PendingPhoto } from "./PendingPhoto";
import { FrameCorners } from "./FrameCorners";
import { origin } from "@/lib/content";

export function Origin() {
  return (
    <section id="origin" className="bg-forest bg-dots-ivory px-[clamp(20px,6vw,64px)] py-[clamp(56px,8vw,96px)]">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-2">
        <div className="flex flex-col gap-[18px]">
          <Reveal>
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass">
              {origin.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="m-0 font-serif text-[clamp(32px,5vw,48px)] font-normal text-ivory">
              {origin.heading}
            </h2>
          </Reveal>
          {origin.body.map((line, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="m-0 max-w-[440px] font-sans text-[15px] leading-[1.7] text-ivory/75">
                {line}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="relative">
          <Reveal
            scale
            distance={32}
            className="group relative aspect-[4/3] overflow-hidden border border-transparent bg-forest-2 transition-colors duration-500 hover:border-brass/50"
          >
            <div className="h-full w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]">
              <PendingPhoto
                src={origin.image}
                alt={origin.imageAlt}
                tone="light"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
          </Reveal>
          <FrameCorners />
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { GlowBlob, RingOutline } from "./Decor";
import { tea } from "@/lib/content";

export function OurTea() {
  return (
    <section
      id="tea"
      className="relative overflow-hidden bg-ivory bg-dots-ink px-[clamp(20px,6vw,64px)] py-[clamp(56px,8vw,96px)]"
    >
      <GlowBlob className="left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/3 bg-brass/[0.12]" />
      <RingOutline className="right-[6%] top-[18%] hidden h-16 w-16 border-brass/25 sm:block" />
      <RingOutline className="bottom-[10%] left-[8%] hidden h-9 w-9 border-brass-deep/20 sm:block" />

      <div className="relative flex flex-col items-center gap-[clamp(40px,6vw,64px)]">
      <Reveal className="flex flex-col items-center gap-[14px] text-center">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brass-deep">
          {tea.eyebrow}
        </span>
        <h2 className="m-0 font-serif text-[clamp(32px,5vw,52px)] font-normal text-forest">
          {tea.heading}
        </h2>
      </Reveal>

      <div className="grid w-full max-w-[920px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(28px,4vw,48px)]">
        {tea.products.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.1}
            duration={0.8}
            className="group relative flex flex-col gap-[14px] transition-transform duration-[350ms] hover:-translate-y-[6px]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 right-0 -z-10 select-none font-serif text-[120px] leading-none text-forest/[0.06]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative aspect-[220/160] overflow-hidden border border-transparent bg-parchment transition-[box-shadow,border-color] duration-[350ms] group-hover:border-brass/40 group-hover:shadow-[0_18px_32px_-18px_rgba(31,58,46,0.35)]">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 920px) 100vw, 440px"
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
            <p className="m-0 font-serif text-[22px] text-ink">{p.name}</p>
            <p className="m-0 font-sans text-[11px] uppercase tracking-[0.08em] text-brass-deep">
              {p.category}
            </p>
            <p className="m-0 font-sans text-[14px] leading-[1.5] text-ink/60">{p.note}</p>
            <div className="mt-0.5 flex items-center gap-2">
              <span
                className={[
                  "h-[14px] w-[14px] shrink-0 rounded-full border border-ink/15",
                  p.liquor === "liquor-classic" ? "bg-liquor-classic" : "bg-liquor-kadak",
                ].join(" ")}
              />
              <span className="font-sans text-[11px] tracking-[0.03em] text-ink/65">
                Liquor colour
              </span>
            </div>
            <p className="m-0 font-sans text-[12px] text-ink/65">{p.sizes}</p>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

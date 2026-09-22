"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CALM } from "@/components/Reveal";
import { notFound } from "@/lib/content";

// Entrance: fade + rise, mirrors Hero.tsx's staggered reveal.
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: CALM, delay },
});

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center gap-[22px] overflow-hidden bg-forest bg-dots-ivory px-[clamp(24px,6vw,56px)] text-center">
      <motion.div {...rise(0)}>
        <Image
          src="/logo-icon-gold.png"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
      </motion.div>

      <motion.p
        {...rise(0.1)}
        className="m-0 font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-brass"
      >
        {notFound.eyebrow}
      </motion.p>

      <motion.h1
        {...rise(0.2)}
        className="m-0 max-w-[720px] font-serif text-[clamp(32px,5.5vw,56px)] font-normal leading-[1.1] text-ivory"
      >
        {notFound.heading}
      </motion.h1>

      <motion.p
        {...rise(0.3)}
        className="m-0 max-w-[440px] font-sans text-[15px] leading-[1.7] text-ivory/75"
      >
        {notFound.body}
      </motion.p>

      <motion.div {...rise(0.4)} className="mt-[10px] flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="border-none bg-ivory px-8 py-[15px] font-sans text-[13px] font-medium tracking-[0.06em] text-forest transition-[background,transform] duration-300 hover:-translate-y-0.5 hover:bg-parchment"
        >
          {notFound.ctaPrimary}
        </Link>
        <Link
          href="/#tea"
          className="border border-ivory/40 bg-transparent px-8 py-[15px] font-sans text-[13px] font-medium tracking-[0.06em] text-ivory transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brass"
        >
          {notFound.ctaSecondary}
        </Link>
      </motion.div>
    </section>
  );
}

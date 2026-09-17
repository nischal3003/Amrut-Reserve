"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, nav } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const allMobileLinks = [...nav.links, ...nav.mobileExtra];

  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-50 flex h-[84px] items-center justify-between",
          "px-[clamp(20px,5vw,56px)] transition-[background,border-color,box-shadow] duration-[400ms] ease-in-out",
          scrolled
            ? "border-b border-ink/[0.08] bg-ivory shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
            : "border-b border-transparent bg-[linear-gradient(to_bottom,rgba(15,26,20,0.55),rgba(15,26,20,0))]",
        ].join(" ")}
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="relative block h-[30px] w-[30px]">
            <Image
              src="/logo-icon-gold.png"
              alt=""
              fill
              sizes="30px"
              className={`object-contain transition-opacity duration-[400ms] ${scrolled ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/logo-icon-forest.png"
              alt=""
              fill
              sizes="30px"
              className={`object-contain transition-opacity duration-[400ms] ${scrolled ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <span
            className={`font-serif text-[15px] font-medium tracking-[0.12em] transition-colors duration-[400ms] ${scrolled ? "text-forest" : "text-ivory"}`}
          >
            {brand.wordmark}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 min-[860px]:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                "group relative font-sans text-[13px] font-medium tracking-[0.06em] opacity-[0.88]",
                "transition-colors duration-[400ms] hover:text-brass",
                scrolled ? "text-ink" : "text-ivory",
              ].join(" ")}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col gap-[5px] p-2 min-[860px]:hidden"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[1.5px] w-[22px] transition-colors duration-[400ms] ${scrolled || menuOpen ? "bg-ink" : "bg-ivory"}`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[84px] z-[49] flex flex-col gap-[18px] border-b border-ink/[0.08] bg-ivory px-[clamp(20px,5vw,56px)] py-5 min-[860px]:hidden"
          >
            {allMobileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-[15px] tracking-[0.04em] text-ink"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

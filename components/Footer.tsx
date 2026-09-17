import Image from "next/image";
import { Reveal } from "./Reveal";
import { GlowBlob, RingOutline } from "./Decor";
import { brand, footer } from "@/lib/content";

function Tape({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 95 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 45L70.282 5L88.282 36.1769L19 76.1769L1 45Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-parchment bg-dots-ink px-[clamp(20px,6vw,64px)] pb-[clamp(40px,6vw,56px)] pt-[clamp(48px,7vw,80px)]">
      <GlowBlob className="-left-16 -top-16 h-56 w-56 bg-brass/[0.1]" />
      <RingOutline className="bottom-[8%] right-[4%] hidden h-10 w-10 border-brass-deep/20 md:block" />
      <Reveal className="relative mx-auto flex max-w-content flex-col gap-9 rounded-card bg-ivory px-[clamp(24px,5vw,48px)] py-[clamp(36px,5vw,56px)] shadow-footer-card">
        {/* Tape accents overlapping the card's top edge */}
        <Tape className="absolute -top-[18px] left-[clamp(8px,3vw,40px)] h-12 w-14 rotate-[-8deg] text-brass-deep opacity-85" />
        <Tape className="absolute -top-[18px] right-[clamp(8px,3vw,40px)] h-12 w-14 rotate-[96deg] text-brass-deep opacity-85" />

        {/* Top row: three columns */}
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex max-w-[280px] flex-col gap-3">
            <div className="flex items-center gap-[10px]">
              <Image
                src="/logo-icon-forest.png"
                alt=""
                width={26}
                height={26}
                className="h-[26px] w-[26px] object-contain"
              />
              <span className="font-serif text-[18px] tracking-[0.02em] text-forest">
                {brand.name}
              </span>
            </div>
            <p className="m-0 font-sans text-[13px] leading-[1.6] text-ink/55">
              {footer.tagline}
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col items-start gap-[10px]">
            <span className="mb-1 font-sans text-[11px] uppercase tracking-[0.1em] text-brass-deep">
              Explore
            </span>
            {footer.explore.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[13px] text-ink/65 transition-colors duration-300 hover:text-brass-deep"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start gap-[10px]">
            <span className="mb-1 font-sans text-[11px] uppercase tracking-[0.1em] text-brass-deep">
              Contact
            </span>
            <a
              href={`mailto:${footer.contactEmail}`}
              className="font-sans text-[13px] text-ink/65 transition-colors duration-300 hover:text-brass-deep"
            >
              {footer.contactEmail}
            </a>
            <span className="font-sans text-[13px] text-ink/65">{footer.contactLocation}</span>
          </div>
        </div>

        <div className="h-px w-full bg-ink/10" />

        {/* Bottom row */}
        <div className="flex w-full flex-wrap justify-between gap-3">
          <span className="font-sans text-[12px] text-ink/45">{footer.copyright}</span>
          <div className="flex gap-4">
            {footer.social.map((s) => (
              <span key={s.label} className="cursor-default font-sans text-[12px] text-ink/50">
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

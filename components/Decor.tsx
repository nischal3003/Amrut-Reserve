/**
 * Small circular decorative accents — a restrained, on-brand take on the
 * playful bubble/planet motifs from the reference site. Two variants:
 * a soft blurred glow (depth, no hard edge) and a thin ring outline.
 */
export function GlowBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
    />
  );
}

export function RingOutline({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full border ${className ?? ""}`}
    />
  );
}

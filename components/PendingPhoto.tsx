import Image from "next/image";

type PendingPhotoProps = {
  /** Real image path once the client supplies it. */
  src: string | null;
  alt: string;
  /** "light" placeholder on dark sections, "dark" on light sections. */
  tone?: "light" | "dark";
  sizes?: string;
};

/**
 * Renders the client photo when available, otherwise a labelled placeholder.
 *
 * Origin and Sustainability photos were supplied directly by the client during
 * the design session and are NOT in the handoff bundle. Do not substitute stock
 * photography — drop the real file into /public and set the `image` field in
 * lib/content.ts. Until then this placeholder makes the gap visible.
 */
export function PendingPhoto({ src, alt, tone = "dark", sizes }: PendingPhotoProps) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />;
  }

  const isLight = tone === "light";
  return (
    <div
      role="img"
      aria-label={`${alt} (client photograph pending)`}
      className={[
        "flex h-full w-full flex-col items-center justify-center gap-2 text-center",
        isLight ? "text-ivory/45" : "text-forest/50",
      ].join(" ")}
    >
      <span
        className={[
          "font-sans text-[10px] uppercase tracking-[0.18em]",
          isLight ? "text-brass" : "text-brass-deep",
        ].join(" ")}
      >
        Photograph pending
      </span>
      <span className="max-w-[220px] font-sans text-[11px] leading-[1.5]">
        Client-supplied estate photo — add to /public and set in content.
      </span>
    </div>
  );
}

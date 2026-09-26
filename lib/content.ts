/**
 * Single source of truth for all homepage copy and data.
 *
 * `NEEDS_CLIENT_COPY` / `DRAFT` markers below correspond to the outstanding
 * content gaps in the design handoff. Replace each with real, approved copy
 * before launch. See README "Outstanding content gaps".
 */

export const NEEDS_CLIENT_COPY = "[NEEDS CLIENT COPY]";
export const DRAFT = "[DRAFT — confirm with client]";

export const brand = {
  name: "Amrut Reserve",
  wordmark: "AMRUT RESERVE",
  tagline: "Where Purity Meets The Finest Harvest",
  taglineSentence: "Where purity meets the finest harvest.",
};

export const nav = {
  // Anchor links to page sections. `about` is menu-only on desktop, per handoff.
  links: [
    { label: "Our Tea", href: "#tea" },
    { label: "Origin", href: "#origin" },
    { label: "Craft", href: "#craft" },
    { label: "Sustainability", href: "#sustain" },
  ],
  mobileExtra: [{ label: "About", href: "#about" }],
};

export const hero = {
  eyebrow: ["Assam, India", "CTC Tea"],
  headline: "Amrut Reserve",
  tagline: "Where Purity Meets The Finest Harvest",
  ctaPrimary: "Explore the Reserve",
  ctaSecondary: "Our Story",
};

export const brew = {
  eyebrow: "Brewing Guide",
  heading: "How To Brew It Right",
  intro: "A stronger, more robust cup than orthodox teas — built to hold up to milk and sugar.",
  steps: [
    { label: "Water Temp", value: "100°C", note: "Full rolling boil" },
    { label: "Leaf Ratio", value: "1 tsp", note: "Per 200ml cup" },
    { label: "Steep Time", value: "3–4 min", note: "Longer for a stronger cup" },
    { label: "Best Served", value: "With milk", note: "A splash, added after steeping" },
  ],
};

export const explainer = {
  eyebrow: "The Basics",
  heading: "What Is CTC Tea?",
  intro:
    "CTC — Crush, Tear, Curl — is the process behind the bold, full-bodied liquor Assam is known for. Here's what that means for your cup.",
  points: [
    {
      label: "Bold & Brisk",
      desc: "A stronger, more robust cup than orthodox teas — built for milk and sugar.",
    },
    {
      label: "Quick To Brew",
      desc: "Tightly rolled granules infuse fast, so your morning cup never keeps you waiting.",
    },
    {
      label: "Consistent, Cup After Cup",
      desc: "Uniform granules mean an even, repeatable brew every single time.",
    },
  ],
};

export const tea = {
  eyebrow: "The Range",
  heading: "Our Tea",
  products: [
    {
      name: "Amrut Reserve Classic",
      category: "Everyday · CTC · Assam",
      note: "Refreshing",
      sizes: "100g · 250g · 500g",
      image: "/product-tea-1.jpg",
      imageAlt: "Curled orthodox black tea leaves",
      liquor: "liquor-classic" as const,
    },
    {
      name: "Amrut Reserve Kadak",
      category: "Premium · CTC · Assam",
      note: "Refreshing",
      sizes: "100g · 250g · 500g",
      image: "/product-tea-kadak.jpg",
      imageAlt: "Dark, tightly rolled Kadak black tea leaves",
      liquor: "liquor-kadak" as const,
    },
  ],
};

export const origin = {
  eyebrow: "Where It Grows",
  heading: "Origin & Estate",
  body: [
    "Grown in Sivasagar district, Upper Assam — in the historic Moran–Sepon tea belt on the south bank of the Brahmaputra. Low-lying plains, rich loamy soil, generous rainfall and a warm, humid climate give Assam tea its signature character.",
    "The result is a strong, full-bodied cup — malty, brisk and deep amber in colour — with the strength to hold its own through milk and sugar. Exactly what a good Indian chai needs.",
  ],
  image: "/origin-estate.jpg" as string | null,
  imageAlt: "Misty tea-growing hills of the estate",
};

export const craft = {
  eyebrow: "The Craft",
  heading: "From Leaf to Cup",
  steps: [
    { num: "01", label: "Pluck", desc: "Two leaves and a bud, hand-picked each morning across the estate." },
    { num: "02", label: "Wither", desc: "Fresh leaves rest and soften, losing moisture until pliable." },
    { num: "03", label: "CTC", desc: "Leaves are crushed, torn, and curled into tight, even granules." },
    { num: "04", label: "Oxidize", desc: "The granules develop their deep colour and malty character." },
    { num: "05", label: "Dry", desc: "Gentle heat locks in flavour, leaving the leaf shelf-stable." },
  ],
  bannerImage: "/craft-pickers-band.jpg",
  bannerAlt: "Pluckers hand-picking tea in the estate",
};

export const sustain = {
  eyebrow: "Commitment",
  heading: "Grown With Care",
  image: "/sustain-pickers.jpg" as string | null,
  imageAlt: "Tea pluckers at work in the estate",
  stats: [
    { text: "Hand-plucked, small-batch harvests", caption: "Two leaves and a bud, by hand" },
    { text: "Fair wages for every estate worker", caption: "Paid above the regional minimum" },
    { text: "No synthetic pesticides on the estate", caption: "Naturally grown, chemical-free" },
  ],
};

export const about = {
  eyebrow: "The Brand",
  // Full brand story to be finalised with the client on a call — see README.
  quote: "Reserved by name. Made for everyone.",
  byline: "Mayavanshi & Sons, Founders of Amrut Reserve",
  bgImage: "/about-tea-rows.jpg",
  bgAlt: "Rows of tea bushes",
};

export const notFound = {
  eyebrow: "404",
  heading: "This Page Has Wandered Off The Estate",
  body: "The page you're looking for doesn't exist, or may have moved. Let's get you back.",
  ctaPrimary: "Back to Home",
  ctaSecondary: "Explore the Reserve",
};

export const footer = {
  tagline: brand.taglineSentence,
  explore: [
    { label: "Our Tea", href: "#tea" },
    { label: "Origin", href: "#origin" },
    { label: "Craft", href: "#craft" },
    { label: "Sustainability", href: "#sustain" },
    { label: "About", href: "#about" },
  ],
  // Placeholder email — real address to be set once the domain is onboarded.
  contactEmail: "hello@amrutreserve.com",
  contactLocation: "Grown in Assam · Packed in Anand, Gujarat",
  copyright: "© 2026 Amrut Reserve. All rights reserved.",
  // Placeholder handles — not linked until real accounts are confirmed.
  social: [
    { label: "IG", href: null as string | null },
    { label: "X", href: null as string | null },
  ],
};

# Amrut Reserve — Homepage

Premium editorial brand-showcase homepage for **Amrut Reserve**, an Assam CTC tea brand.
Single scrolling page: Hero → Our Tea → Origin & Estate → Craft → Sustainability → About → Footer.
Not e-commerce (no cart/checkout).

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**, recreating
the design handoff pixel-accurately with idiomatic components (Tailwind tokens, not inline styles).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

The first `npm run dev`/`npm run build` fetches **Fraunces** and **Inter** from Google Fonts via
`next/font/google` — an internet connection is required for that initial fetch (fonts are then
self-hosted/cached by Next automatically).

```bash
npm run build && npm run start   # production
```

## Project structure

```
app/
  layout.tsx        Fonts (next/font), metadata, <html> font CSS variables
  globals.css       Tailwind layers, base resets, nav-offset scroll padding
  page.tsx          Assembles the sections in order
components/
  Nav.tsx           Fixed nav: transparent→solid on scroll, logo cross-fade, mobile menu
  Hero.tsx          Full-viewport hero, staggered entrance, CTAs, scroll cue, leaf card
  HeroLattice.tsx   Generative canvas backdrop (spring lattice, brass pulses, mouse/click physics)
  OurTea.tsx        Two-product grid with liquor swatches
  Origin.tsx        Dark section, text + estate photo, reveal + hover scale
  Craft.tsx         5-step process row + full-width banner
  Sustainability.tsx  Stat list with growing brass rules
  About.tsx         Full-bleed photo, italic pull-quote
  Footer.tsx        Taped-card footer
  Reveal.tsx        Shared Framer Motion scroll-reveal wrapper
  PendingPhoto.tsx  Placeholder for client photos not yet supplied
lib/
  content.ts        Single source of truth for all copy + data (client-copy gaps flagged)
public/             Logos + product/craft/about photography
```

## Design tokens

Registered in `tailwind.config.ts`:

| Token | Hex | Usage |
|---|---|---|
| `forest` | `#1F3A2E` | Dark section backgrounds, primary ink on light |
| `forest-2` | `#3C5B47` | Secondary dark accents |
| `ivory` | `#F5F0E6` | Light section backgrounds |
| `parchment` | `#EDE6D6` | Alternating light background |
| `brass` | `#A98B5D` | Thin rules, small accents, hover — never large fills |
| `brass-deep` | `#8A7148` | Link/hover accent, eyebrow labels |
| `ink` | `#1A1A17` | Body text on light |

Type: **Fraunces** (serif headings, incl. italic for the About quote), **Inter** (body/UI).
Radius `card` = 28px (footer). Shadow `footer-card`. Easing `ease-calm` = `cubic-bezier(0.16,1,0.3,1)`.

All entrance/scroll motion is Framer Motion; continuous loops (liquor shimmer, scroll cue) are
Tailwind keyframes. `prefers-reduced-motion` is respected (hero canvas paints a single static frame).

## Outstanding content gaps — resolve before launch

Copy is centralized in `lib/content.ts`; every gap is marked there.

- **Origin** — done (Sivasagar district, Moran–Sepon belt). Estate name is confidential — keep it off the site.
- **About** — short quote ("Reserved by name. Made for everyone.") and byline (Mayavanshi & Sons) are client-approved; the full brand story is to be finalised with the client on a call.
- **Footer** — contact email is a placeholder until the domain is onboarded. IG / X handles still needed (currently unlinked).
- **Craft, Sustainability, Brewing Guide** — client confirmed as correct.

### Photography

Origin and Sustainability photos have been supplied and are wired up (`origin-estate.jpg`,
`sustain-pickers.jpg`). If either needs to change, drop the new file into `public/` and update
`origin.image` / `sustain.image` in `lib/content.ts`. The client is happy with the current photos; replacing them is fine only with
clearly licensed, copyright-safe images.

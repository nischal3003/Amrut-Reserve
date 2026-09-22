import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1F3A2E",
        "forest-2": "#3C5B47",
        ivory: "#F5F0E6",
        parchment: "#EDE6D6",
        brass: "#A98B5D",
        "brass-deep": "#806943",
        ink: "#1A1A17",
        // Product liquor swatches
        "liquor-classic": "#B5651D",
        "liquor-kadak": "#7A3B12",
      },
      fontFamily: {
        // Bound to next/font CSS variables set in app/layout.tsx
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
        "content-narrow": "1080px",
      },
      borderRadius: {
        card: "28px",
      },
      boxShadow: {
        "footer-card": "0 24px 60px -30px rgba(31,58,46,0.25)",
      },
      transitionTimingFunction: {
        // Brand easing — calm, no overshoot
        calm: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        liquorShimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        scrollCueDrift: {
          "0%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(10px)", opacity: "0.3" },
          "100%": { transform: "translateY(0)", opacity: "0.9" },
        },
      },
      animation: {
        "liquor-shimmer": "liquorShimmer 3.2s ease-in-out infinite",
        "scroll-cue": "scrollCueDrift 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

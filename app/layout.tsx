import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrainOverlay } from "@/components/GrainOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// TODO(client): set the production domain here (and in NEXT_PUBLIC_SITE_URL
// if used elsewhere) before launch — needed for absolute OG/canonical URLs.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "Amrut Reserve — Where Purity Meets the Finest Harvest";
const DESCRIPTION =
  "Amrut Reserve — a premium Assam CTC tea. Single-estate character, small-batch harvests, crafted from leaf to cup.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: "/logo-icon-forest.png" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Amrut Reserve",
    // TODO(client): swap for a dedicated 1200x630 social share image.
    images: [{ url: "/product-tea-1.jpg", width: 1200, height: 630, alt: "Amrut Reserve tea" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/product-tea-1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1F3A2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

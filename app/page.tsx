import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Explainer } from "@/components/Explainer";
import { OurTea } from "@/components/OurTea";
import { Origin } from "@/components/Origin";
import { Craft } from "@/components/Craft";
import { BrewGuide } from "@/components/BrewGuide";
import { Sustainability } from "@/components/Sustainability";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-ivory">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Explainer />
      <OurTea />
      <Origin />
      <Craft />
      <BrewGuide />
      <Sustainability />
      <About />
      <Footer />
    </main>
  );
}

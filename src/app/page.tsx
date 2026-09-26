// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BandSection from "@/components/sections/BandSection";
import MusicSection from "@/components/sections/MusicSection";
import GallerySection from "@/components/sections/GallerySection";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <HeroSection />
      <AboutSection />
      <BandSection />
      <MusicSection />
      <GallerySection />
    </main>
  );
}

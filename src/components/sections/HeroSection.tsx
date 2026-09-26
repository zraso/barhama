// src/components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex h-screen flex-col bg-secondary z-10"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src="/barhama-homepage.jpg"
          alt="Barhama Cham Hero"
          fill
          className="object-cover object-[center_75%] opacity-80"
          priority
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 items-center justify-center text-center px-4 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white drop-shadow-lg mb-4 sm:mb-5 tracking-tight">
              Barhama Cham
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-accent font-medium drop-shadow-md tracking-tight">
              The Voice of The Gambia
            </p>
          </motion.div>
        </div>

        {/* Spotify player */}
        <motion.div
          className="w-full flex items-center justify-center px-2 pb-20 min-h-[120px] sm:pb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-full max-w-xl flex items-center justify-center opacity-90">
            <iframe
              src="https://open.spotify.com/embed/artist/0jTXrnQV2eR82q1EBCUwVJ?theme=0"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
              className="rounded-lg opacity-95"
              style={{ filter: "brightness(0.95)" }}
            ></iframe>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/60"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

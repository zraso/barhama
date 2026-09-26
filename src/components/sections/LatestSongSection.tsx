// src/components/sections/LatestSongSection.tsx
"use client";

import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";

export default function LatestSongSection() {
  return (
    <section
      id="latest"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 relative z-20 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-10 sm:mb-12 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Latest Song
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <VideoPlayer videoId="R6PFbL8zA-A" />
        </motion.div>
      </div>
    </section>
  );
}

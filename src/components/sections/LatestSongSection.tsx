// src/components/sections/LatestSongSection.tsx
"use client";

import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";

export default function LatestSongSection() {
  return (
    <section
      id="latest"
      className="bg-background py-8 sm:py-16 px-6 sm:px-8 relative z-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VideoPlayer videoId="RkXamNeUJow" />
        </motion.div>
      </div>
    </section>
  );
}

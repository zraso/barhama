// src/components/sections/MusicSection.tsx
"use client";

import { motion } from "framer-motion";
import { videoIds } from "@/lib/data";
import VideoPlayer from "@/components/VideoPlayer";

export default function MusicSection() {
  return (
    <section
      id="music"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 relative z-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-6 sm:mb-8 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Listen
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-gray-400 text-center mb-10 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Explore Barhama&#39;s music videos
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {videoIds.map((videoId, idx) => (
            <motion.div
              key={videoId}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <VideoPlayer videoId={videoId} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

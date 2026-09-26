// src/components/VideoPlayer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
      {!isPlaying ? (
        <>
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <motion.button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: "#2053be" }}
              whileHover={{ scale: 1.1 }}
            >
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.button>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
      )}
    </div>
  );
}

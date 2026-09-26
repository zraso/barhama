// src/components/sections/GallerySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section
      id="gallery"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 pb-24 relative z-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-10 sm:mb-12 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          See
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10"
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
          {galleryImages.map((src, idx) => (
            <motion.div
              key={src}
              className="relative overflow-hidden shadow-2xl bg-gray-900 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
              onClick={() => openLightbox(idx)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={src}
                alt={`Barhama Cham Gallery ${idx + 1}`}
                width={600}
                height={800}
                className="object-cover w-full h-80 sm:h-96 md:h-[28rem]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </section>
  );
}

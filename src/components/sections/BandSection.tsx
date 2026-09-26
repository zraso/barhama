// src/components/sections/BandSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { musicians } from "@/lib/data";

export default function BandSection() {
  return (
    <section
      id="band"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 relative z-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-8 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Band
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-5 tracking-tight">
            Sita-Baa Band: The Big Baobab
          </h3>
          <div className="space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed">
            <p>
              In our quest for authentic representation as Africans, and
              particularly as Gambians, we believe our identity goes beyond mere
              names or sounds. It must resonate deeply with our history,
              culture, and community traditions.
            </p>
            <p>
              Sita-Baa is a musical band dedicated to revitalizing traditional
              Gambian sounds while seamlessly blending them with global
              influences. This fusion not only honors our roots but also bridges
              connections with the world beyond, allowing us to share our rich
              heritage.
            </p>
            <p>
              The baobab tree, or &quot;sitaa ba,&quot; serves as our emblem.
              More than just an African icon, it symbolizes resilience, life,
              and the profound interconnectedness of nature and culture. These
              majestic giants have stood for centuries, witnessing the ebb and
              flow of African history while providing sustenance, shelter, and
              spiritual guidance to countless communities.
            </p>
            <p>
              As a band, we embody the essence of the baobab, drawing strength
              from our traditions while reaching out to create meaningful
              connections through music. We are not just a band; we are a living
              testament to the enduring power of our cultural legacy.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src="/sita-baa-group1.jpg"
                alt="Sitaa Ba group photo"
                fill
                className="object-cover object-[center_42%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="/barhama-performance.jpg"
                alt="Barhama Cham performing live"
                fill
                className="object-cover object-[center_42%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center tracking-tight">
            Musicians
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {musicians.map((musician) => (
              <motion.article
                key={musician.name}
                className="p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-4">
                  <Image
                    src={musician.imageSrc}
                    alt={musician.name}
                    fill
                    className={`object-cover ${
                      musician.name === "Samuel Peter Thomas"
                        ? "object-[center_24%]"
                        : musician.name === "Abdoulie Kuyateh"
                          ? "object-[center_32%]"
                          : musician.name === "Mbemba Saho"
                            ? "object-[center_44%]"
                            : "object-center"
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-medium text-white mb-1">
                  {musician.name}
                </h4>
                <p className="text-sm text-accent mb-3">{musician.role}</p>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {musician.summary}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

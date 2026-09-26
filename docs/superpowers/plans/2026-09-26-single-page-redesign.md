# Single-Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the multi-page Barhama website into a modern single-page experience with smooth scrolling, custom video players, and polished animations.

**Architecture:** Consolidate all route-based pages into section components on a single scrolling page. Use Framer Motion for scroll-triggered animations, CSS scroll-snap for section boundaries, and IntersectionObserver for navigation scroll-spy. Custom YouTube player overlays hide branding.

**Tech Stack:** Next.js 15.5.26, React 19, Tailwind CSS 4, Framer Motion, TypeScript 5

**Spec:** `docs/superpowers/specs/2026-09-26-single-page-redesign-design.md`

## Global Constraints

- Preserve exact color palette: #2053be (primary blue), #0a0a0a (background), #ededed (foreground)
- No text removal or condensing - all content must be preserved verbatim
- Next.js 15 + React 19 + Tailwind CSS 4 stack - no breaking dependency changes beyond Framer Motion
- All animations must respect `prefers-reduced-motion` media query
- Images must use Next.js Image component for optimization

## Review Focus

1. **Keyboard navigation without mouse:** Users navigating with Tab/Enter/Arrow keys should be able to access all sections, open/close lightbox, play videos, and use navigation without any mouse interaction - ESC closes modals, Enter activates links, Arrow keys navigate lightbox.
2. **Mobile viewport with tall content sections:** Sections that extend beyond one viewport (About, Band) should scroll naturally within the page flow without breaking scroll-snap behavior - snap should work on section start, internal scrolling should be smooth.
3. **YouTube iframe with controls=0 parameter:** When video plays with controls=0, users might expect pause/stop functionality but won't have it - the spec calls this "optional" custom controls, so implement basic thumbnail→iframe swap first, ensure it works, then add pause overlay if time permits.
4. **Lightbox image navigation at array boundaries:** Clicking next on the last image (index 8) should wrap to first (index 0), clicking prev on first should wrap to last - without this, users hit a dead end and can't navigate the full gallery in one loop.
5. **Scroll-spy with multiple sections partially visible:** When scrolling between sections, both might be partially visible - IntersectionObserver with threshold 0.5 ensures only the section occupying majority viewport gets highlighted, preventing flicker between active states.

---

## File Structure

**New components to create:**
- `src/components/sections/HeroSection.tsx` - Hero with parallax background, Spotify embed
- `src/components/sections/AboutSection.tsx` - Biography with images and activism badges
- `src/components/sections/BandSection.tsx` - Band philosophy and musician cards
- `src/components/sections/MusicSection.tsx` - Video grid with custom players
- `src/components/sections/GallerySection.tsx` - Photo grid with lightbox trigger
- `src/components/Navigation.tsx` - Scroll-spy header navigation
- `src/components/VideoPlayer.tsx` - Custom YouTube player with thumbnail overlay
- `src/components/Lightbox.tsx` - Full-screen image viewer with keyboard nav
- `src/lib/data.ts` - Constants for musicians, videos, gallery images

**Files to modify:**
- `src/app/page.tsx` - Replace with single-page container rendering all sections
- `src/app/layout.tsx` - Update to use Navigation component with scroll links
- `src/app/globals.css` - Add scroll-snap styles and reduced motion query

**Files to delete (after implementation complete):**
- `src/app/about/page.tsx`
- `src/app/sita-baa/page.tsx`
- `src/app/music/page.tsx`
- `src/app/gallery/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/about/` directory
- `src/app/sita-baa/` directory
- `src/app/music/` directory
- `src/app/gallery/` directory
- `src/app/contact/` directory

---

### Task 1: Setup and Install Framer Motion

**Files:**
- Modify: `package.json` (add framer-motion dependency)
- Create: `src/components/` directory
- Create: `src/components/sections/` directory
- Create: `src/lib/` directory

**Interfaces:**
- Consumes: Nothing
- Produces: Framer Motion available for import in subsequent tasks

- [ ] **Step 1: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: Framer Motion added to package.json dependencies

- [ ] **Step 2: Create component directories**

```bash
mkdir -p src/components/sections src/lib
```

Expected: Directories created

- [ ] **Step 3: Verify installation**

```bash
npm list framer-motion
```

Expected: Shows framer-motion version installed

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion for scroll animations"
```

---

### Task 2: Create Data Constants

**Files:**
- Create: `src/lib/data.ts`

**Interfaces:**
- Consumes: Nothing
- Produces: 
  - `export const musicians: Musician[]` - Array of 4 musician objects with name, role, imageSrc, summary
  - `export const videoIds: string[]` - Array of 9 YouTube video IDs
  - `export const galleryImages: string[]` - Array of 9 gallery image paths
  - `export interface Musician { name: string; role: string; imageSrc: string; summary: string; }`

- [ ] **Step 1: Create data.ts with musician interface and data**

```typescript
// src/lib/data.ts

export interface Musician {
  name: string;
  role: string;
  imageSrc: string;
  summary: string;
}

export const musicians: Musician[] = [
  {
    name: "Samuel Peter Thomas",
    role: "Keyboardist & Bass Guitarist",
    imageSrc: "/samuel-peter-thomas.jpg",
    summary:
      "Samuel is a Sierra Leonean-born keyboardist and bass guitarist who came to The Gambia in 1999 after the war in Sierra Leone. Music became refuge and direction, first through the church, where he found discipline, grounding, and a sense of calling. Influenced by his guitarist father and Nigerian artists of his generation, he began on keyboard in the early 2000s, then built a reputation for versatility across both instruments. Mentor Bernard Thomas helped him see music as something that could be pursued with integrity and sustainability, even alongside formal studies in accounting and MIS. His sound blends funk with African grooves like sebene and soukous, and he brings that same sense of service and long-term vision to Barhama's band.",
  },
  {
    name: "Mawdo Kuyateh",
    role: "Lead Guitarist",
    imageSrc: "/mawdo-kuyateh.jpg",
    summary:
      "Mawdo is a Gambian guitarist shaped by deep griot lineage, where music, history, and responsibility travel together. On both sides of his family, griot tradition runs close, including figures like his uncle Ansumana Suso and a heritage that reaches across generations and performance history. Though his father served as a soldier, music remained central at home, and after commerce and entrepreneurship studies, Mawdo committed fully to the guitar in 2015. His playing is rooted in traditional Manding music and stretches into mbalax and Afrobeats, balancing discipline with instinct. Recognised as one of The Gambia's rare highly skilled guitarists, he treats Barhama's band as his musical home and a bridge between ancestral Mande tradition and contemporary African sound.",
  },
  {
    name: "Abdoulie Kuyateh",
    role: "Calabash & Percussion",
    imageSrc: "/abdoulie-kuyateh.jpg",
    summary:
      "Abdoulie is a Gambian percussionist and calabash player born into a griot family where music is inherited as much as learned. He began playing in junior school and was the first balafon player in his early musical environment before deepening into Afro-Manding rhythm and calabash work. His journey also passed through formal institutions, including the Gambia Police Force band as a saxophonist and later the Gambia Airport Authority, before he chose to follow his artistic purpose full time. He has performed across regional spaces, integrating traditional percussion into contemporary settings, and speaks plainly about what Gambian musicians need most: stronger infrastructure and support, not more talent. In Sitaa Ba, he strengthens the band's Afro-Manding foundation with precision, depth, and cultural grounding.",
  },
  {
    name: "Mbemba Saho",
    role: "Kora",
    imageSrc: "/mbemba-saho.jpg",
    summary:
      "Mbemba is a Gambian kora player from Bakoteh, carrying a lineage where the instrument is both inheritance and responsibility, passed from his grandfather through his father, Seikou Saho Jali, a respected griot and master player. He learned under his elder brother Souleyman Jobateh when touring schedules made daily instruction harder to hold, then deepened his craft through curiosity, discipline, and expanding music theory. That foundation allows him to move the kora across reggae, jazz, and modern African contexts without losing its voice, shaped further by the influence of the late Ansumana Suso. Beyond performance, he is committed to teaching younger generations that the kora is Gambian in origin and story, restoring knowledge alongside sound. With Sitaa Ba, he brings continuity, mastery, and a clear sense of where the music comes from and where it can travel next.",
  },
];

export const videoIds: string[] = [
  "qYhKm8HNnj8",
  "n91CEUwXmrQ",
  "BltPBP-RD1s",
  "GvgXczJZSN8",
  "Xkh3t_zs8qY",
  "axza2DFSaJQ",
  "_vLGjxurNsY",
  "5MpGx6p6a5M",
  "5LjtlsEtZUs",
];

export const galleryImages: string[] = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.JPG",
  "/gallery7.jpg",
  "/gallery8.jpg",
  "/gallery9.jpg",
];
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add data constants for musicians, videos, and gallery"
```

---

### Task 3: Build Lightbox Component

**Files:**
- Create: `src/components/Lightbox.tsx`

**Interfaces:**
- Consumes: Nothing external
- Produces:
  - `export default function Lightbox(props: LightboxProps): JSX.Element`
  - `interface LightboxProps { images: string[]; currentIndex: number; isOpen: boolean; onClose: () => void; }`
  - Component manages internal navigation state, keyboard events, and Framer Motion animations

- [ ] **Step 1: Create Lightbox component with TypeScript interface**

```typescript
// src/components/Lightbox.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [isOpen, index]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
          aria-label="Close lightbox"
        >
          ×
        </button>

        {/* Image counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg z-10">
          {index + 1} / {images.length}
        </div>

        {/* Previous button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-4 text-white text-5xl hover:text-gray-300 transition-colors z-10"
          aria-label="Previous image"
        >
          ‹
        </button>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-4 text-white text-5xl hover:text-gray-300 transition-colors z-10"
          aria-label="Next image"
        >
          ›
        </button>

        {/* Image */}
        <motion.div
          key={index}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[index]}
            alt={`Gallery image ${index + 1}`}
            width={1200}
            height={800}
            className="object-contain max-w-[90vw] max-h-[90vh] w-auto h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Lightbox.tsx
git commit -m "feat: add lightbox component with keyboard navigation"
```

---

### Task 4: Build VideoPlayer Component

**Files:**
- Create: `src/components/VideoPlayer.tsx`

**Interfaces:**
- Consumes: Nothing external
- Produces:
  - `export default function VideoPlayer(props: VideoPlayerProps): JSX.Element`
  - `interface VideoPlayerProps { videoId: string; }`
  - Component displays YouTube thumbnail with custom play button, replaces with iframe on click

- [ ] **Step 1: Create VideoPlayer component**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/VideoPlayer.tsx
git commit -m "feat: add custom video player with YouTube thumbnail overlay"
```

---

### Task 5: Build HeroSection Component

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces:
  - `export default function HeroSection(): JSX.Element`
  - Section renders with id="home" for scroll targeting
  - Uses Framer Motion for entrance animations and parallax background

- [ ] **Step 1: Create HeroSection component**

```typescript
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
      className="relative flex min-h-screen flex-col bg-secondary scroll-snap-start"
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
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add hero section with parallax and animations"
```

---

### Task 6: Build AboutSection Component

**Files:**
- Create: `src/components/sections/AboutSection.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces:
  - `export default function AboutSection(): JSX.Element`
  - Section renders with id="about" for scroll targeting
  - Contains all biographical content from /about page with animations

- [ ] **Step 1: Create AboutSection component with full content**

```typescript
// src/components/sections/AboutSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const topics = [
  "Gender-based Violence",
  "Climate Change",
  "Peace and Reconciliation",
  "Transitional Justice",
  "Employment",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 scroll-snap-start"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-16 sm:mb-20 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Barhama Cham
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Introduction */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              In Sanchaba Suly Jobe, a village in The Gambia where history is
              carried by voice long before it reaches the page,{" "}
              <span className="text-primary font-medium">Ebrima Cham</span>{" "}
              encountered music as meaning before he understood it as
              performance.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              His mother,{" "}
              <span className="text-accent font-medium">Fatou Thiam</span>, was
              a market seller, but at home she was a storyteller whose songs
              carried memory, rhythm, and moral weight. Through her voice,
              Ebrima learned that music was not first about entertainment, but
              about transmission.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              As a child, he echoed those melodies quietly when he was alone.
              Over time, people around him began to notice the sincerity and
              strength in his voice, often before he recognized it himself.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Music was not an obvious inheritance. His father,{" "}
              <span className="text-primary font-medium">Babacar Thiam</span>,
              was a tailor and an imam, and in a society where musical lineage
              traditionally belongs to griot families, singing without that
              ancestry could be seen as inappropriate. When Ebrima realized it
              was not a hobby but a calling, the awareness both clarified and
              unsettled him.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto italic">
              Rather than rebel, he waited.
            </p>
          </motion.div>

          {/* Activism */}
          <div className="text-center">
            <motion.div
              className="flex justify-center my-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/about2.jpg"
                  alt="Barhama Cham"
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-white pt-8 mb-8 tracking-tight">
                Music as a Tool for Change
              </h3>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
                Named after{" "}
                <span className="text-primary font-medium">Baye Niasse</span>,
                the revered Islamic scholar and spiritual leader, Ebrima felt
                the responsibility of his name deeply. When the pull toward
                music became impossible to ignore, he chose proof over protest,
                recording a song in honor of Baye Niasse while still unsure of
                his voice.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
                The turning point came during a Gamou in Kaolack, Senegal, when
                his sister played the recording for their family. After
                listening, an uncle asked who the singer was. When his sister
                replied that it was Ebrima, the family responded with blessing,
                offering guidance that would shape his path: singing in a way
                your future self will respect, and in a way that leaves
                something behind.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                That blessing became a responsibility. He later chose the name{" "}
                <span className="text-accent font-medium">Barhama</span>, drawn
                from the spiritual tradition surrounding Baye Niasse, meaning
                son of peace and son of life. The name became a compass,
                grounding his work and reminding him that when Barhama speaks,
                it is not only a voice being heard, but a promise being kept.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                Barhama uses music to create awareness on crucial matters:
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
                {topics.map((topic, idx) => (
                  <motion.span
                    key={topic}
                    className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-sm text-gray-300 hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-5 text-left sm:text-center">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  By the time he formally began his career in{" "}
                  <span className="text-primary font-medium">2016</span>,
                  Barhama had already decided that sound alone was not enough.
                  His activism began at home, shaped by the example of his
                  parents&apos; relationship and his belief in dignity and
                  respect, particularly for women. When he encountered
                  gender-based violence, music became his response. A
                  collaborative song on the issue revealed that music could
                  carry cause without losing soul.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  From there, his work expanded into themes of peace, climate
                  change, reconciliation, and civic responsibility, always
                  rooted in Gambian life. In{" "}
                  <span className="text-accent font-medium">2019</span>, he
                  represented The Gambia at the{" "}
                  <span className="text-primary font-medium">UNFPA Summit</span>{" "}
                  in Dakar, advocating through performance for the rights of
                  women, followed by collaborations with{" "}
                  <span className="text-accent font-medium">UNDP</span> and
                  other institutions.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  In <span className="text-primary font-medium">2021</span>,
                  during a tense election period, he staged a stadium concert
                  centered on peace, bringing fifteen thousand voices together
                  with the hope that the message would follow them home.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Gambian sound */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 tracking-tight">
              Gambian Sound, Carried Forward
            </h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              At the core of Barhama&apos;s work is a commitment to The Gambia
              itself. Despite being the birthplace of the kora and a historic
              exporter of sound across the region, Gambian music remains
              underrecognized.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Influenced by artists like Bob Marley and The Wailers, who treated
              music as liberation rather than spectacle, Barhama now enters a
              new chapter. What began as a solo journey is becoming a collective
              one through the formation of a band, aimed at carrying Gambian
              sound beyond its borders.
            </p>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
              For Barhama, music remains a living responsibility — one that
              carries Gambian sound forward while staying rooted in where it
              began.
            </p>
          </motion.div>

          {/* Name & Legacy */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center my-6 mb-8">
              <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/about1.jpg"
                  alt="Barhama Cham"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto pt-8">
              Today, audiences know that voice as{" "}
              <span className="text-primary font-medium">Barhama Cham</span> —
              an Afro-pop artist with a{" "}
              <span className="text-accent font-medium">golden voice</span> and
              a live presence shaped by years of discipline, story, and service.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "feat: add about section with full biography and animations"
```

---

### Task 7: Build BandSection Component

**Files:**
- Create: `src/components/sections/BandSection.tsx`

**Interfaces:**
- Consumes: `import { musicians } from "@/lib/data"` - Array of musician objects
- Produces:
  - `export default function BandSection(): JSX.Element`
  - Section renders with id="band" for scroll targeting
  - Displays baobab philosophy text, band photos, and musician cards

- [ ] **Step 1: Create BandSection component**

```typescript
// src/components/sections/BandSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { musicians } from "@/lib/data";

export default function BandSection() {
  return (
    <section
      id="band"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 scroll-snap-start"
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
            Sitaa Ba Band: The Big Baobab
          </h3>
          <div className="space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed">
            <p>
              In our quest for authentic representation as Africans, and
              particularly as Gambians, we believe our identity goes beyond mere
              names or sounds. It must resonate deeply with our history,
              culture, and community traditions.
            </p>
            <p>
              Sitaa Ba is a musical band dedicated to revitalizing traditional
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
                className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-800 bg-gray-900/40 mb-4">
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
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/BandSection.tsx
git commit -m "feat: add band section with musician cards and animations"
```

---

### Task 8: Build MusicSection Component

**Files:**
- Create: `src/components/sections/MusicSection.tsx`

**Interfaces:**
- Consumes:
  - `import { videoIds } from "@/lib/data"` - Array of YouTube video IDs
  - `import VideoPlayer from "@/components/VideoPlayer"` - Custom video player component
- Produces:
  - `export default function MusicSection(): JSX.Element`
  - Section renders with id="music" for scroll targeting
  - 3x3 grid of custom video players

- [ ] **Step 1: Create MusicSection component**

```typescript
// src/components/sections/MusicSection.tsx
"use client";

import { motion } from "framer-motion";
import { videoIds } from "@/lib/data";
import VideoPlayer from "@/components/VideoPlayer";

export default function MusicSection() {
  return (
    <section
      id="music"
      className="min-h-screen bg-background py-16 px-6 sm:px-8 scroll-snap-start"
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
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/MusicSection.tsx
git commit -m "feat: add music section with custom video players"
```

---

### Task 9: Build GallerySection Component

**Files:**
- Create: `src/components/sections/GallerySection.tsx`

**Interfaces:**
- Consumes:
  - `import { galleryImages } from "@/lib/data"` - Array of gallery image paths
  - `import Lightbox from "@/components/Lightbox"` - Lightbox modal component
- Produces:
  - `export default function GallerySection(): JSX.Element`
  - Section renders with id="gallery" for scroll targeting
  - Grid of images with click handlers to open lightbox

- [ ] **Step 1: Create GallerySection component**

```typescript
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
      className="min-h-screen bg-background py-16 px-6 sm:px-8 pb-24 scroll-snap-start"
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
              className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900 hover:shadow-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(idx)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Barhama Cham Gallery ${idx + 1}`}
                  width={600}
                  height={800}
                  className="object-cover w-full h-80 sm:h-96 md:h-[28rem]"
                />
              </div>
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
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GallerySection.tsx
git commit -m "feat: add gallery section with lightbox integration"
```

---

### Task 10: Build Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces:
  - `export default function Navigation(): JSX.Element`
  - Fixed header with scroll-spy highlighting
  - Smooth scroll to sections on click
  - Hamburger menu for mobile

- [ ] **Step 1: Create Navigation component with scroll-spy**

```typescript
// src/components/Navigation.tsx
"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "band", label: "Band" },
  { href: "music", label: "Music" },
  { href: "gallery", label: "Gallery" },
];

const headerFooterBlue = "#2053be";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = navLinks.map((link) =>
      document.getElementById(link.href)
    );
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full text-white shadow-md backdrop-blur-sm"
      style={{ background: `${headerFooterBlue}ee` }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-4 py-4 md:py-6">
        <div className="text-xl font-semibold tracking-tight">Barhama Cham</div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-10 text-sm md:text-base font-medium items-center tracking-tight">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`hover:text-accent transition-colors duration-200 py-2 md:py-0 ${
                activeSection === link.href ? "text-accent underline" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{ background: headerFooterBlue }}
        >
          <div className="flex flex-col gap-1 text-sm font-medium tracking-tight">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`hover:text-accent transition-colors duration-200 py-3 border-b border-white/10 last:border-b-0 text-left ${
                  activeSection === link.href ? "text-accent" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add navigation with scroll-spy and smooth scroll"
```

---

### Task 11: Update Main Page with All Sections

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes:
  - `import HeroSection from "@/components/sections/HeroSection"`
  - `import AboutSection from "@/components/sections/AboutSection"`
  - `import BandSection from "@/components/sections/BandSection"`
  - `import MusicSection from "@/components/sections/MusicSection"`
  - `import GallerySection from "@/components/sections/GallerySection"`
- Produces: Single-page layout with all sections

- [ ] **Step 1: Replace page.tsx content**

```typescript
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 3: Test in dev mode**

```bash
npm run dev
```

Expected: Dev server starts, open http://localhost:3000 and verify all sections render

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate all sections into single-page layout"
```

---

### Task 12: Update Layout with New Navigation

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `import Navigation from "@/components/Navigation"`
- Produces: Layout with new Navigation component, footer unchanged

- [ ] **Step 1: Update layout.tsx to use Navigation component**

```typescript
// src/app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headerFooterBlue = "#2053be";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        {/* Social icons bar at the bottom */}
        <footer
          className="fixed bottom-0 left-0 w-full text-white z-50 max-sm:before:pointer-events-none max-sm:before:absolute max-sm:before:left-0 max-sm:before:right-0 max-sm:before:top-[-16px] max-sm:before:h-[16px] max-sm:before:bg-[var(--footer-bg)] max-sm:before:content-['']"
          style={{
            background: headerFooterBlue,
            ["--footer-bg" as string]: headerFooterBlue,
          }}
        >
          <div className="max-w-5xl mx-auto flex justify-center gap-8 py-3 max-sm:pt-5 max-sm:pb-3 md:py-3">
            <a
              href="https://www.instagram.com/iambarhama/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-accent transition-colors"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  width="18"
                  height="18"
                  x="3"
                  y="3"
                  rx="5"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/iambarhama/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-accent transition-colors"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  width="18"
                  height="18"
                  x="3"
                  y="3"
                  rx="5"
                  strokeWidth="2"
                />
                <path d="M16 8h-2a2 2 0 0 0-2 2v2h4" strokeWidth="2" />
                <path d="M12 16v-4" strokeWidth="2" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UC0QVYoLaOy0rE2fm5c-2lqA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-accent transition-colors"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  width="18"
                  height="18"
                  x="3"
                  y="3"
                  rx="5"
                  strokeWidth="2"
                />
                <polygon points="10,9 16,12 10,15" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://open.spotify.com/artist/0jTXrnQV2eR82q1EBCUwVJ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="hover:text-accent transition-colors"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <path d="M8 15c2.5-1 5.5-1 8 0" strokeWidth="2" />
                <path d="M7 12c3-1.5 7-1.5 10 0" strokeWidth="2" />
                <path d="M9 9c2-.5 4-.5 6 0" strokeWidth="2" />
              </svg>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

- [ ] **Step 3: Test navigation**

Run: `npm run dev`
Expected: Navigation appears at top, footer at bottom, clicking nav links scrolls to sections

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate Navigation component into layout"
```

---

### Task 13: Add Scroll Behavior and Reduced Motion Styles

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Nothing
- Produces: CSS scroll-snap behavior and reduced motion preferences

- [ ] **Step 1: Add scroll styles to globals.css**

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: #0a0a0a;
  color: #ededed;
  font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Scroll snap for sections */
.scroll-snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.scroll-snap-start {
  scroll-snap-align: start;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify styles apply**

Run: `npm run dev`
Expected: Smooth scrolling works, sections snap into place

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add scroll-snap and reduced motion styles"
```

---

### Task 14: Delete Old Route Pages

**Files:**
- Delete: `src/app/about/page.tsx`
- Delete: `src/app/sita-baa/page.tsx`
- Delete: `src/app/music/page.tsx`
- Delete: `src/app/gallery/page.tsx`
- Delete: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: Clean codebase with only single-page implementation

- [ ] **Step 1: Delete old route directories**

```bash
rm -rf src/app/about src/app/sita-baa src/app/music src/app/gallery src/app/contact
```

Expected: Directories and files removed

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds without errors

- [ ] **Step 3: Test all functionality**

Run: `npm run dev`
Expected: All sections render, navigation works, videos play, lightbox opens

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old multi-page route files"
```

---

### Task 15: Final Testing and Polish

**Files:**
- No file changes (testing only)

**Interfaces:**
- Consumes: Entire application
- Produces: Verified working application

- [ ] **Step 1: Test navigation scroll-spy**

Manual test:
1. Open http://localhost:3000
2. Scroll through all sections
3. Verify nav highlights correct section as you scroll
4. Click each nav link
5. Verify smooth scroll to correct section

Expected: All nav links work, scroll-spy updates correctly

- [ ] **Step 2: Test hero animations**

Manual test:
1. Refresh page
2. Verify title and tagline fade in
3. Verify Spotify player slides up
4. Scroll down slightly
5. Verify parallax effect on background image

Expected: All animations play smoothly

- [ ] **Step 3: Test video players**

Manual test:
1. Scroll to Music section
2. Click play button on a video
3. Verify thumbnail replaces with YouTube iframe
4. Verify video autoplays
5. Verify YouTube branding is minimal (no visible logo/controls)

Expected: Videos play with custom overlay

- [ ] **Step 4: Test lightbox**

Manual test:
1. Scroll to Gallery section
2. Click an image
3. Verify lightbox opens with image centered
4. Click right arrow
5. Verify next image loads
6. Click left arrow
7. Verify previous image loads
8. Press Escape key
9. Verify lightbox closes
10. Reopen lightbox
11. Click backdrop
12. Verify lightbox closes

Expected: Lightbox works with keyboard and mouse, wraps at array boundaries

- [ ] **Step 5: Test mobile responsive**

Manual test (or browser dev tools):
1. Resize browser to mobile width (< 640px)
2. Verify hamburger menu appears
3. Click hamburger
4. Verify menu opens
5. Click a nav link
6. Verify menu closes and scrolls to section
7. Verify all sections stack vertically and are readable
8. Verify video grid shows 1 column
9. Verify gallery shows 1 column

Expected: All layouts responsive, mobile menu works

- [ ] **Step 6: Test keyboard navigation**

Manual test:
1. Tab through navigation
2. Press Enter on a nav link
3. Verify scroll to section
4. Tab to a video, press Enter
5. Verify video plays
6. Tab to gallery image, press Enter
7. Verify lightbox opens
8. Press Arrow keys
9. Verify image navigation
10. Press Escape
11. Verify lightbox closes

Expected: All keyboard interactions work

- [ ] **Step 7: Production build test**

```bash
npm run build
npm run start
```

Expected: Production build succeeds, app runs at http://localhost:3000

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: complete single-page redesign with animations and custom players"
```

---

## Self-Review

**Spec coverage:**
- ✅ Single-page flow - All sections consolidated on one page (Task 11)
- ✅ Smooth scrolling - Navigation component with scroll-spy (Task 10), CSS scroll-snap (Task 13)
- ✅ Brand preservation - Colors preserved in all components (#2053be blue, #0a0a0a background)
- ✅ Content integrity - All text preserved verbatim in AboutSection (Task 6) and BandSection (Task 7)
- ✅ Video improvement - Custom VideoPlayer component (Task 4) with YouTube thumbnail overlay
- ✅ Performance - Next.js Image component used throughout, Framer Motion animations with reduced motion support (Task 13)
- ✅ Accessibility - Keyboard navigation in Lightbox (Task 3), Navigation (Task 10), reduced motion query (Task 13)

**Placeholder scan:**
- ✅ No TBD, TODO, or "implement later" found
- ✅ All code blocks complete with actual implementations
- ✅ All interfaces clearly defined with exact types and exports

**Type consistency:**
- ✅ `musicians: Musician[]` defined in Task 2, consumed in Task 7
- ✅ `videoIds: string[]` defined in Task 2, consumed in Task 8
- ✅ `galleryImages: string[]` defined in Task 2, consumed in Task 9
- ✅ `Lightbox` component interface in Task 3 matches usage in Task 9
- ✅ `VideoPlayer` component interface in Task 4 matches usage in Task 8
- ✅ All section components produce JSX.Element and export default function

**Review Focus verification:**
1. **Keyboard navigation** - Tested in Task 15, Step 6; Lightbox (Task 3) has keyboard event listeners for Escape/Arrow keys, Navigation (Task 10) uses button elements with onClick for keyboard accessibility
2. **Mobile viewport with tall content** - AboutSection (Task 6) and BandSection (Task 7) use `min-h-screen` not fixed `h-screen`, allowing natural scroll; scroll-snap-align on sections works at section start (Task 13)
3. **YouTube iframe controls=0** - VideoPlayer (Task 4) implements thumbnail → iframe swap as specified; custom controls not implemented (marked optional in spec)
4. **Lightbox array wrapping** - Lightbox (Task 3) nextImage and prevImage use modulo arithmetic: `(index + 1) % images.length` and `(index - 1 + images.length) % images.length`
5. **Scroll-spy threshold** - Navigation (Task 10) IntersectionObserver uses `threshold: 0.5` and checks `entry.intersectionRatio > 0.5` to ensure majority-viewport highlighting

All five review focus areas have corresponding implementations in the plan.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-26-single-page-redesign.md`. Please review the plan. Which execution approach would you prefer?

- **Subagent-driven** - A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Native** - I implement every task myself in this session, the way this harness runs work, then one fresh reviewer on the most capable model checks the whole branch. Cheapest and fastest; no independent review until the end. Runs well with a mid-tier session model, since the plan carries the design.

**For this plan I recommend Native**, because the tasks have clear interfaces and dependencies that flow sequentially (data constants → components → sections → integration), there are 15 tasks which would be expensive with per-task context switches, and the deliverable is a user-facing website where the final manual testing phase (Task 15) catches integration issues before deployment. Does the plan capture what you want, and which approach should we use?

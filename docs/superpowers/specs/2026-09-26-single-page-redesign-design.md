# Barhama Website Single-Page Redesign

**Date:** 2026-09-26  
**Purpose:** Transform the multi-page Barhama Cham artist website into a modern single-page experience with smooth scrolling flow, inspired by wizkidofficial.com, while preserving the existing brand identity and all content.

## Background

The current Barhama website is a multi-page Next.js application with separate routes for Home, About, The Band (Sita Baa), Music (Listen), Gallery (See), and Contact. The design is functional but feels dated compared to modern artist websites. The goal is to create a more immersive, flowing single-page experience that showcases Barhama's story, music, and visual identity in a contemporary way.

**Reference:** The Wizkid official website demonstrates the target aesthetic - single-page vertical flow with full-viewport sections, smooth scrolling, and modern minimalist design.

## Success Criteria

1. **Single-page flow:** All content consolidated onto one scrolling page with distinct full-viewport sections
2. **Smooth experience:** Buttery scroll animations and section transitions that feel polished and modern
3. **Brand preservation:** Exact color palette maintained (#2053be blue, dark backgrounds, existing accent colors)
4. **Content integrity:** All existing text, images, and information preserved without condensing or removal
5. **Video improvement:** Custom video player overlays that hide YouTube branding while maintaining functionality
6. **Performance:** Fast load times, smooth 60fps animations, no jank
7. **Accessibility:** Keyboard navigation, screen reader support, reduced motion preferences respected

## Constraints

- **No color changes:** The royal blue (#2053be) and existing palette must remain exactly as-is
- **No text removal:** All biographical content, musician bios, and descriptive text stays intact
- **Framework:** Must work within existing Next.js 15 + React 19 + Tailwind CSS 4 stack
- **No breaking changes:** Should not require major dependency upgrades beyond Framer Motion
- **Contact removal:** The contact form section will be removed (social icons footer provides contact channels)

## Design Overview

### Architecture

The redesign transforms the site from a multi-page architecture to a single-page application:

**Current structure:**
```
/               (page.tsx)
/about          (about/page.tsx)
/sita-baa       (sita-baa/page.tsx)
/music          (music/page.tsx)
/gallery        (gallery/page.tsx)
/contact        (contact/page.tsx)
```

**New structure:**
```
/               (page.tsx with 5 section components)
```

All route-based pages will be removed and their content consolidated into section components on the main page.

### Navigation System

**Minimal Scroll-Spy Header:**
- Fixed position header (50-60px height)
- Translucent background with backdrop blur for modern glass effect
- Logo/name on left: "Barhama Cham"
- Navigation links on right: Home • About • Band • Music • Gallery
- Active section highlighted with blue (#2053be) underline or text color
- Smooth scroll behavior on link click (scroll to section, not route change)
- Mobile: Hamburger menu retained, but links scroll to sections instead of navigating routes

**Footer:**
- Keep existing fixed footer with social media icons (Instagram, Facebook, YouTube, Spotify)
- Remains visible at bottom throughout scroll experience

**Scroll-spy implementation:**
- Use IntersectionObserver to track which section occupies majority of viewport
- Update navigation active state dynamically as user scrolls
- Smooth scroll via CSS `scroll-behavior: smooth` or JavaScript scrollIntoView

### Section Structure

Each major section follows a full-viewport layout pattern:

**Common patterns:**
- Full viewport height (`min-h-screen` or `100vh`)
- CSS scroll-snap points for clean section boundaries
- Dark background (#0a0a0a) or image-based backgrounds
- Framer Motion animations triggered on viewport entry
- Consistent padding/spacing system
- Content max-width constraints (5xl-6xl) for readability

**Scroll behavior:**
- CSS `scroll-snap-type: y mandatory` on main container
- Each section has `scroll-snap-align: start`
- Smooth native scroll with snap points for clean transitions
- Optional: scroll indicator (animated down arrow) on hero section

## Section-by-Section Design

### 1. Hero Section (Home)

**Purpose:** Create an immediate visual impact and establish Barhama's identity.

**Layout:**
- Full viewport height (100vh)
- Hero image background: `/barhama-homepage.jpg`
- Gradient overlays: dark gradient from top and bottom for text readability
- Centered content: "Barhama Cham" heading + "The Voice of The Gambia" tagline
- Spotify player embedded at bottom of hero section
- Scroll indicator at very bottom (animated down arrow icon)

**Typography:**
- Heading: 4xl/5xl/7xl responsive, bold, white, drop shadow
- Tagline: 2xl/3xl responsive, accent color, drop shadow
- Existing Geist Sans font preserved

**Visual effects:**
- Parallax: Background image moves at 0.5x scroll speed for depth
- Text fade-in on page load with slight scale-up effect
- Spotify player slides up from bottom
- Scroll indicator subtle bounce animation

**Technical details:**
- Keep existing hero image and gradient approach
- Add Framer Motion for entrance animations
- Parallax via `transform: translateY()` based on scroll position
- Spotify iframe unchanged from current implementation

**Why:** The hero is the first impression and needs to be dramatic and immersive. The parallax effect and full-viewport treatment immediately signals a modern, polished experience.

---

### 2. About Section

**Purpose:** Tell Barhama's origin story, musical journey, and activism work in depth.

**Content (preserved from current /about page):**
- Full biographical narrative from Sanchaba Suly Jobe origins to present
- Story of mother Fatou Thiam and father Babacar Thiam
- Musical calling and the Barhama name choice
- Activism section with topic badges (Gender-based Violence, Climate Change, Peace and Reconciliation, Transitional Justice, Employment)
- UNFPA Summit, UNDP collaborations, 2021 stadium concert details
- Gambian sound philosophy and Bob Marley influence
- All existing paragraph text preserved verbatim

**Layout:**
- May extend beyond single viewport (content dictates height)
- Two-column layout on desktop: text left, images right
- Stacked single column on mobile
- Images: `/about1.jpg` and `/about2.jpg` positioned within content flow
- Topic badges as pill-shaped elements with hover effects
- Comfortable reading width (max-w-3xl to 4xl for text blocks)

**Visual treatment:**
- Dark background (#0a0a0a)
- Section title: "About Barhama Cham" with subtle blue accent underline
- Text in gray-200 to gray-300 for hierarchy
- Images in rounded containers with borders
- Activism topics as interactive badge elements

**Animations:**
- Section title fades in from top
- Text paragraphs fade in from left with stagger
- Images fade in from right with stagger
- Topic badges cascade in with delay
- Scroll-triggered: elements animate as they enter viewport (not all at once)

**Technical details:**
- Reuse existing about page content structure
- Framer Motion `whileInView` for scroll-triggered animations
- Responsive grid/flex layout for text-image columns
- Preserve all existing text without summarization

**Why:** The about section contains rich, meaningful content that shouldn't be rushed. Allowing it to extend beyond one viewport is fine - the scroll-snap keeps navigation clean while letting the story breathe.

---

### 3. The Band Section (Sitaa Ba)

**Purpose:** Introduce the band concept, philosophy, and individual musicians with their complete stories.

**Content (preserved from current /sita-baa page):**
- "The Band" main heading
- "Sitaa Ba Band: The Big Baobab" subheading
- Full baobab tree symbolism text (all 4 paragraphs about identity, resilience, cultural connection)
- Band photos: `/sita-baa-group1.jpg` and `/barhama-performance.jpg`
- Four musician profiles with complete biographies:
  - Samuel Peter Thomas (Keyboardist & Bass Guitarist)
  - Mawdo Kuyateh (Lead Guitarist)
  - Abdoulie Kuyateh (Calabash & Percussion)
  - Mbemba Saho (Kora)
- Each musician's full summary text preserved

**Layout:**
- Section extends beyond single viewport to accommodate content
- Top: Section title and subtitle centered
- Baobab philosophy text in centered, comfortable reading width
- Band photos: two images side-by-side (responsive to stack on mobile)
- Musician cards: 2x2 grid on desktop, 2x1 on tablet, 1x1 on mobile
- Each card: musician photo, name, role, full biography paragraph

**Visual treatment:**
- Dark background with subtle texture or gradient variation
- Section title styled consistently with other sections
- Band photos in rounded containers with borders
- Musician cards: dark background (gray-900/40), rounded, bordered, with padding
- Card images with aspect ratio preserved, rounded corners
- Name in white, role in accent color, bio in gray-300

**Animations:**
- Title and subtitle fade in
- Baobab text paragraphs fade in with slight stagger
- Band photos scale in from 0.9 to 1.0 with opacity fade
- Musician cards cascade in with staggered delays (each card 100ms after previous)
- Hover: cards lift slightly with increased shadow

**Technical details:**
- Reuse existing musicians array data structure
- Responsive grid for cards (CSS Grid with auto-fit or defined breakpoints)
- Framer Motion staggerChildren for card entrance animations
- Maintain existing image object-position values for musician photos

**Why:** The band section is content-rich and educational. The four musician bios provide depth and showcase the collective. No content should be cut - the full stories honor each musician's contribution.

---

### 4. Music Section (Listen)

**Purpose:** Showcase Barhama's music videos in a clean, modern interface without YouTube branding.

**Content (preserved from current /music page):**
- 9 YouTube video embeds (same video IDs)
- Section title: "Listen"
- Optional subtitle: "Explore Barhama's music videos"

**Custom Video Player Implementation:**

The key innovation here is hiding YouTube branding while maintaining functionality:

**Approach:**
1. Display video thumbnails initially (not iframes)
   - YouTube provides thumbnails: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`
   - Overlay custom play button icon (styled with blue #2053be)
2. On click, replace thumbnail with YouTube iframe
   - Use YouTube IFrame API for programmatic control
   - Parameters: `?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`
   - `controls=0` hides default YouTube controls
3. Optional: Overlay minimal custom controls (play/pause button)
   - Positioned over iframe
   - Styled to match brand (blue accent)
   - JavaScript controls via YouTube IFrame API

**Layout:**
- Full viewport height for grid
- 3x3 grid on desktop
- 2x3 grid on tablet (may overflow viewport, that's fine)
- 1xN column on mobile
- Equal aspect ratio tiles (16:9 video aspect)
- Gap between tiles

**Visual treatment:**
- Dark background
- Section title centered at top
- Video thumbnails with rounded corners
- Custom play button: circle with triangle icon, blue background, centered on thumbnail
- Hover: thumbnail scales slightly (1.05), play button pulses
- Active video: iframe fills tile, custom controls overlay if implemented

**Animations:**
- Grid tiles fade in with stagger (row by row or all with delay)
- Play button scale/pulse on hover
- Thumbnail → iframe transition: crossfade or scale effect
- Between videos: smooth iframe swap if lightbox-style implementation

**Technical details:**
- Extract video IDs from existing YouTube URLs
- State management for which video is playing (if modal approach)
- YouTube IFrame API integration:
  ```javascript
  new YT.Player('player-id', {
    videoId: 'VIDEO_ID',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0
    }
  });
  ```
- Responsive grid with CSS Grid or Tailwind grid utilities
- Framer Motion AnimatePresence for video swap animations

**Why:** The YouTube iframe branding (play button, YouTube logo, video suggestions) detracts from the brand experience. Custom overlays and controls keep the focus on Barhama's content while still leveraging YouTube's hosting and reliability.

---

### 5. Gallery Section (See)

**Purpose:** Display photo gallery with lightbox functionality for full-size viewing.

**Content (preserved from current /gallery page):**
- 9 gallery images: `/gallery1.jpg` through `/gallery9.jpg` (note: gallery6 is `.JPG` uppercase)
- Section title: "See"

**Layout:**
- Full viewport height for grid
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- Images displayed with consistent aspect ratio and sizing

**Lightbox Modal:**

When user clicks an image:
1. Dark backdrop overlay (rgba(0,0,0,0.95))
2. Large centered image (max 90vw/90vh, maintain aspect ratio)
3. Navigation controls:
   - Left arrow: previous image
   - Right arrow: next image
   - Close button (X) in top-right corner
4. Image counter: "3 / 9" display
5. Keyboard support:
   - Left/Right arrow keys: navigate
   - ESC key: close lightbox
6. Click backdrop to close

**Visual treatment:**
- Grid images: rounded corners, subtle border
- Hover: image scales to 1.05, shadow increases, cursor pointer
- Lightbox backdrop: very dark with slight blur on background content
- Lightbox image: drop shadow for elevation
- Navigation arrows and close button: white with hover effects

**Animations:**
- Grid images fade in with stagger
- Hover: smooth scale and shadow transition
- Lightbox enter: backdrop fade in, image scale from 0.9 to 1.0
- Lightbox exit: backdrop fade out, image scale to 0.9
- Image navigation: crossfade or slide transition between images

**Technical details:**
- State: `isLightboxOpen`, `currentImageIndex`
- Framer Motion AnimatePresence for enter/exit animations
- Keyboard event listeners (useEffect with addEventListener)
- Click handlers: image click opens lightbox, backdrop click closes
- Navigation functions: nextImage(), prevImage(), closeLibox()
- Array wrapping for prev/next (index 0 → length-1, length-1 → 0)

**Why:** A gallery needs lightbox functionality for proper viewing. The full-size modal experience lets viewers appreciate the photography while keeping the grid clean and scannable.

---

## Technical Implementation Details

### Technology Stack

**Dependencies (existing):**
- Next.js 15.5.26
- React 19.0.0
- Tailwind CSS 4
- TypeScript 5

**New dependency:**
- Framer Motion (latest): `npm install framer-motion`
  - For scroll animations, section transitions, lightbox effects
  - Lightweight at ~60kb, well-maintained, excellent React integration

### File Structure Changes

**Remove these route pages:**
```
src/app/about/page.tsx          → delete
src/app/sita-baa/page.tsx       → delete
src/app/music/page.tsx          → delete
src/app/gallery/page.tsx        → delete
src/app/contact/page.tsx        → delete
```

**Create these components:**
```
src/components/sections/HeroSection.tsx
src/components/sections/AboutSection.tsx
src/components/sections/BandSection.tsx
src/components/sections/MusicSection.tsx
src/components/sections/GallerySection.tsx
```

**Create these shared components:**
```
src/components/Navigation.tsx       (scroll-spy nav)
src/components/VideoPlayer.tsx      (custom YouTube player)
src/components/Lightbox.tsx         (gallery lightbox modal)
```

**Modify these files:**
```
src/app/page.tsx                    (main single-page container)
src/app/layout.tsx                  (update nav to scroll links, not route links)
```

### Scroll Implementation

**CSS scroll-snap approach:**
```css
/* Main container */
.scroll-container {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: scroll;
  height: 100vh;
}

/* Each section */
.section {
  scroll-snap-align: start;
  min-height: 100vh;
}
```

**Scroll-spy navigation:**
```typescript
// IntersectionObserver tracking
const [activeSection, setActiveSection] = useState('home');

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

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);
```

**Smooth scroll to section:**
```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
```

### Animation Patterns

**Section entrance (Framer Motion):**
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Section content */}
</motion.div>
```

**Staggered children:**
```typescript
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Parallax effect (hero background):**
```typescript
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Apply to background
<div style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
```

### YouTube Custom Player

**Implementation approach:**

1. Load YouTube IFrame API:
```html
<script src="https://www.youtube.com/iframe_api"></script>
```

2. Create player component:
```typescript
interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YT.Player | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    // Initialize YouTube player with controls hidden
  };

  return (
    <div className="relative aspect-video">
      {!isPlaying ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-xl"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
              {/* Play icon SVG */}
            </div>
          </button>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0`}
          className="w-full h-full rounded-xl"
          allow="autoplay; encrypted-media"
        />
      )}
    </div>
  );
};
```

### Lightbox Implementation

**Modal component with Framer Motion:**
```typescript
interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);

  const nextImage = () => setIndex((index + 1) % images.length);
  const prevImage = () => setIndex((index - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [index]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.img
          key={index}
          src={images[index]}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        {/* Navigation arrows and close button */}
      </motion.div>
    </AnimatePresence>
  );
};
```

### Responsive Design

**Breakpoints (Tailwind defaults):**
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (sm to lg)
- Desktop: > 1024px (lg+)

**Section-specific responsive patterns:**

**Hero:**
- Font sizes scale: 4xl → 5xl → 7xl
- Spotify player width: 100% mobile, max-w-xl desktop

**About:**
- Two-column → single column on mobile
- Images stack below text on mobile
- Padding adjusts for smaller screens

**Band:**
- Musician grid: 1 col mobile, 2 cols tablet, 2x2 desktop
- Band photos: side-by-side → stacked on mobile

**Music:**
- Video grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- Maintain 16:9 aspect ratio across breakpoints

**Gallery:**
- Photo grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- Lightbox adapts to screen size (max 90vw/90vh)

### Performance Considerations

**Image optimization:**
- Use Next.js Image component for automatic optimization
- Lazy load images below the fold
- Proper sizing props to avoid layout shift

**Animation performance:**
- Use CSS transforms (not top/left) for animations
- `will-change` property for elements that will animate
- Reduce motion media query for accessibility:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

**Bundle size:**
- Framer Motion tree-shaking (import only needed components)
- YouTube IFrame API loaded once
- Code splitting for lightbox component (dynamic import)

**Scroll performance:**
- Use CSS scroll-snap (native, performant)
- Debounce parallax scroll handlers
- IntersectionObserver for viewport detection (more efficient than scroll events)

## Testing Strategy

**Manual testing checklist:**

1. **Navigation:**
   - [ ] Scroll-spy updates active link correctly
   - [ ] Click nav links scrolls to correct section smoothly
   - [ ] Mobile hamburger menu works, links scroll correctly
   - [ ] Footer social icons remain accessible and functional

2. **Hero section:**
   - [ ] Image loads and displays correctly
   - [ ] Parallax effect works smoothly (no jank)
   - [ ] Spotify player embeds and plays
   - [ ] Text animations play on page load
   - [ ] Scroll indicator animates and invites interaction

3. **About section:**
   - [ ] All text content displays without truncation
   - [ ] Images load and position correctly
   - [ ] Animations trigger as section enters viewport
   - [ ] Two-column layout → single column on mobile
   - [ ] Topic badges display and hover correctly

4. **Band section:**
   - [ ] All baobab philosophy text displays
   - [ ] Band photos load and display correctly
   - [ ] All 4 musician cards render with complete bios
   - [ ] Card grid responsive (2x2 → 2x1 → 1x1)
   - [ ] Card hover effects work
   - [ ] Animations stagger correctly

5. **Music section:**
   - [ ] Video thumbnails load for all 9 videos
   - [ ] Custom play buttons display and hover correctly
   - [ ] Click play button loads YouTube iframe
   - [ ] Videos autoplay when loaded
   - [ ] Grid responsive (3x3 → 2x3 → 1xN)
   - [ ] YouTube branding minimized/hidden

6. **Gallery section:**
   - [ ] All 9 images load in grid
   - [ ] Image hover effects work
   - [ ] Click image opens lightbox
   - [ ] Lightbox displays image full-size
   - [ ] Left/right arrows navigate between images
   - [ ] Keyboard arrows navigate (left/right)
   - [ ] ESC key closes lightbox
   - [ ] Click backdrop closes lightbox
   - [ ] Image counter displays correctly

7. **Cross-browser:**
   - [ ] Chrome/Edge (Chromium)
   - [ ] Firefox
   - [ ] Safari (macOS and iOS)
   - [ ] Mobile browsers (iOS Safari, Chrome Android)

8. **Performance:**
   - [ ] Page loads in < 3 seconds
   - [ ] Animations run at 60fps
   - [ ] No layout shift (CLS score)
   - [ ] Images lazy load appropriately

9. **Accessibility:**
   - [ ] Keyboard navigation works (tab, arrow keys, enter, esc)
   - [ ] Screen reader announces sections correctly
   - [ ] Focus states visible
   - [ ] Reduced motion preference respected
   - [ ] Sufficient color contrast (WCAG AA)

## Migration Plan

**Phase 1: Setup (foundational changes)**
1. Install Framer Motion dependency
2. Create new component directories and files
3. Extract data (musicians, videos, gallery images) into constants/data files

**Phase 2: Build sections (parallel work possible)**
1. Build HeroSection component
2. Build AboutSection component
3. Build BandSection component
4. Build MusicSection component with custom VideoPlayer
5. Build GallerySection component with Lightbox

**Phase 3: Integration**
1. Update main page.tsx to import and render all sections
2. Build Navigation component with scroll-spy
3. Update layout.tsx to use new Navigation
4. Wire up scroll behavior and section IDs

**Phase 4: Polish**
1. Add all Framer Motion animations
2. Implement parallax effect on hero
3. Add hover states and micro-interactions
4. Responsive testing and adjustments
5. Performance optimization (lazy loading, etc.)

**Phase 5: Cleanup**
1. Delete old route pages
2. Remove unused imports and code
3. Test all functionality end-to-end
4. Deploy

**Rollback plan:**
- Git branch for redesign work
- Keep old route pages until new single-page version is tested and approved
- Can revert by checking out previous commit if issues arise

## Open Questions

None at this time. All requirements have been clarified with the user.

## Appendix

### Color Palette Reference

**Preserved from current site:**
- Primary blue (header/footer): `#2053be`
- Background: `#0a0a0a`
- Foreground text: `#ededed`
- Accent: (from Tailwind theme, appears to be a red/orange tone for tagline)
- Gray scale: gray-200, gray-300, gray-400, gray-800, gray-900

These colors remain exactly as-is. No palette changes.

### Content Inventory

**Images to preserve:**
- `/barhama-homepage.jpg` (hero)
- `/about1.jpg` (about section)
- `/about2.jpg` (about section)
- `/sita-baa-group1.jpg` (band section)
- `/barhama-performance.jpg` (band section)
- `/samuel-peter-thomas.jpg` (musician)
- `/mawdo-kuyateh.jpg` (musician)
- `/abdoulie-kuyateh.jpg` (musician)
- `/mbemba-saho.jpg` (musician)
- `/gallery1.jpg` through `/gallery9.jpg` (gallery, note gallery6 is `.JPG`)

**Video IDs (YouTube):**
From current music page URLs, extract IDs:
- qYhKm8HNnj8
- n91CEUwXmrQ
- BltPBP-RD1s
- GvgXczJZSN8
- Xkh3t_zs8qY
- axza2DFSaJQ
- _vLGjxurNsY
- 5MpGx6p6a5M
- 5LjtlsEtZUs

**External links:**
- Spotify artist: https://open.spotify.com/artist/0jTXrnQV2eR82q1EBCUwVJ
- Instagram: https://www.instagram.com/iambarhama/
- Facebook: https://www.facebook.com/iambarhama/
- YouTube: https://www.youtube.com/channel/UC0QVYoLaOy0rE2fm5c-2lqA

All preserved and linked in fixed footer and Spotify embed.

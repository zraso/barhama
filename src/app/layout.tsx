"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sita-baa", label: "The Band" },
  { href: "/music", label: "Listen" },
  { href: "/gallery", label: "See" },
  { href: "/contact", label: "Contact" },
];

// Blazer-inspired blue (softened slightly vs the sharpest sampled tone)
const headerFooterBlue = "#2053be";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav
          className="sticky top-0 z-50 w-full text-white shadow-md md:relative"
          style={{ background: headerFooterBlue }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-4 py-4 md:py-6">
            {/* Logo or site name could go here */}
            <div className="text-xl font-semibold tracking-tight">Barhama Cham</div>
            {/* Hamburger icon for mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
            {/* Desktop menu */}
            <div className="hidden md:flex gap-10 text-sm md:text-base font-medium items-center tracking-tight">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors duration-200 py-2 md:py-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4" style={{ background: headerFooterBlue }}>
              <div className="flex flex-col gap-1 text-sm font-medium tracking-tight">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-accent transition-colors duration-200 py-3 border-b border-white/10 last:border-b-0"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
        {children}
        {/* Social icons bar at the bottom */}
        <footer
          className="fixed bottom-0 left-0 w-full text-white z-50 max-sm:before:pointer-events-none max-sm:before:absolute max-sm:before:left-0 max-sm:before:right-0 max-sm:before:top-[-16px] max-sm:before:h-[16px] max-sm:before:bg-[var(--footer-bg)] max-sm:before:content-['']"
          style={{ background: headerFooterBlue, ["--footer-bg" as string]: headerFooterBlue }}
        >
          <div className="max-w-5xl mx-auto flex justify-center gap-8 py-3 max-sm:pt-5 max-sm:pb-3 md:py-3">
            <a href="https://www.instagram.com/iambarhama/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors">
              {/* Instagram SVG */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="5" strokeWidth="2"/><circle cx="12" cy="12" r="4" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://www.facebook.com/iambarhama/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent transition-colors">
              {/* Facebook SVG */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="5" strokeWidth="2"/><path d="M16 8h-2a2 2 0 0 0-2 2v2h4" strokeWidth="2"/><path d="M12 16v-4" strokeWidth="2"/></svg>
            </a>
            <a href="https://www.youtube.com/channel/UC0QVYoLaOy0rE2fm5c-2lqA" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-accent transition-colors">
              {/* YouTube SVG */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="5" strokeWidth="2"/><polygon points="10,9 16,12 10,15" fill="currentColor"/></svg>
            </a>
            <a href="https://open.spotify.com/artist/0jTXrnQV2eR82q1EBCUwVJ" target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="hover:text-accent transition-colors">
              {/* Spotify SVG */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="2"/><path d="M8 15c2.5-1 5.5-1 8 0" strokeWidth="2"/><path d="M7 12c3-1.5 7-1.5 10 0" strokeWidth="2"/><path d="M9 9c2-.5 4-.5 6 0" strokeWidth="2"/></svg>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}

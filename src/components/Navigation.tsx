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
    setActiveSection(sectionId);
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

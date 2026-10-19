import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/portfolioData';
import { CinematicWriterDeskHero } from './EditorialArt';

interface HeroProps {
  onNavigate: (path: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onScrollToSection }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollOffset(Math.min(window.scrollY, 550));
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      aria-label="01 / The Writer — Editorial Cover & Hybrid ID Card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="surface-hero relative w-full min-h-[88vh] 2xl:min-h-[82vh] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 flex flex-col justify-between border-b border-[#DED6C6] overflow-hidden"
    >
      {/* Subtle Vertical Editorial Margin Rule (Desktop) */}
      <div
        aria-hidden="true"
        className="hidden xl:block absolute top-0 bottom-0 left-10 w-[1px] bg-[#E5DEC9]/70 pointer-events-none"
      />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center py-4 sm:py-8">
          {/* =========================================================================
              LEFT COLUMN (6 of 12 Columns):
              Liquid Glass Identity Object -> Editorial Serif Headline -> Intro -> Glass CTA
              ========================================================================= */}
          <div
            style={{
              transform: `translate3d(0, ${scrollOffset * -0.02}px, 0)`
            }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8 transition-transform duration-300 ease-out"
          >
            {/* Section 2: Sophisticated Liquid-Glass Object Reacting to Cursor */}
            <div className="inline-flex">
              <div
                style={{
                  transform: `perspective(800px) rotateX(${mouseOffset.y * -2.5}deg) rotateY(${
                    mouseOffset.x * 3.5
                  }deg) translate3d(${mouseOffset.x * 3}px, ${mouseOffset.y * 2}px, 0)`
                }}
                className="acrylic-glass relative px-4 py-2.5 inline-flex flex-wrap items-center gap-x-3.5 gap-y-1 transition-transform duration-300 ease-out"
              >
                {/* Cursor-reactive specular highlight */}
                <div
                  aria-hidden="true"
                  style={{
                    background: `radial-gradient(120px circle at ${
                      50 + mouseOffset.x * 40
                    }% ${50 + mouseOffset.y * 40}%, rgba(255,255,255,0.75), transparent 75%)`
                  }}
                  className="pointer-events-none absolute inset-0"
                />
                <span className="relative z-10 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A] font-semibold">
                  CREATIVE IDENTITY 001
                </span>
                <span aria-hidden="true" className="relative z-10 w-4 h-[1px] bg-[#B8AC99]" />
                <span className="relative z-10 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#141311]">
                  WORDS / IDEAS / STORIES
                </span>
              </div>
            </div>

            {/* Dramatic Scale Editorial Serif Headline with Living Staggered Reveal */}
            <h1 className="font-serif-editorial text-[54px] sm:text-[74px] lg:text-[84px] xl:text-[92px] text-[#141311] leading-[0.91] tracking-[-0.028em]">
              <span className="block headline-reveal-1">I WRITE</span>
              <span className="block headline-reveal-2">THE THINGS</span>
              <span className="block headline-reveal-3">PEOPLE</span>
              <span className="block italic font-normal text-[#74482A] mt-1 headline-reveal-4">
                REMEMBER.
              </span>
            </h1>

            {/* Short, Confident Introduction */}
            <div className="space-y-3 max-w-[44ch]">
              <p className="text-base sm:text-[17px] text-[#3F3B36] leading-[1.72]">
                I&rsquo;m <strong className="font-semibold text-[#141311]">{DESIGNER_PROFILE.name}</strong>, a
                copywriter, content strategist, and published author turning brand
                truths into language with clarity, warmth, and character.
              </p>
              <p className="font-handwritten text-xl text-[#74482A]">
                &ldquo;Good words. Create better stories.&rdquo;
              </p>
            </div>

            {/* Section 5: Liquid Glass Interaction Button + Primary Dark Editorial Button */}
            <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-6">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('selected-work');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onNavigate('/portfolio');
                  }
                }}
                className="btn-glass-interactive group px-7 py-4 text-xs font-mono-tabular tracking-[0.2em] uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74482A]"
              >
                <span>VIEW WORK</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 btn-editorial-arrow text-[#74482A]"
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onNavigate('/contact');
                  }
                }}
                className="btn-editorial-primary group px-7 py-4 text-xs font-mono-tabular tracking-[0.2em] uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74482A]"
              >
                <span>LET&rsquo;S TALK</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 btn-editorial-arrow"
                />
              </button>
            </div>

            {/* Micro-Detail Editorial Colophon Bar */}
            <div className="pt-6 border-t border-[#DED6C6] flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#6E685F]">
              <span>5+ YEARS · 80+ CAMPAIGNS · 2 PUBLISHED BOOKS</span>
              <span>FOLIO 01 / 06</span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (6 of 12 Columns):
              Section 3 — Interactive Hybrid ID Card (Paper + Glass + Print, Click-to-Flip)
              ========================================================================= */}
          <div className="lg:col-span-6 lg:pl-4">
            <CinematicWriterDeskHero
              mouseOffset={mouseOffset}
              scrollOffset={scrollOffset}
              onSelectProjectSlug={(slug) => onNavigate(`/portfolio/${slug}`)}
              onScrollToSection={onScrollToSection}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

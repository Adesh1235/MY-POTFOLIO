import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Feather } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/portfolioData';

interface AboutSectionProps {
  onViewWork: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onViewWork }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const centerOffset =
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.04;
        setScrollOffset(Math.max(-18, Math.min(18, centerOffset)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const writerFacts = [
    {
      value: '5+',
      label: 'YEARS / EXPERIENCE'
    },
    {
      value: '80+',
      label: 'CAMPAIGNS'
    },
    {
      value: '12+',
      label: 'INDUSTRIES'
    },
    {
      value: '02',
      label: 'BOOKS / PUBLICATIONS'
    }
  ];

  const acrylicDisciplines = [
    'CREATIVE WRITING',
    'BRAND STORYTELLING',
    'CONTENT STRATEGY',
    'CAMPAIGNS'
  ];

  return (
    <section
      id="about-preview"
      ref={sectionRef}
      aria-label="02 / About The Writer"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 border-b border-[#DED6C6] overflow-hidden"
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto">
        {/* Printed Editorial Spread Surface */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`paper-mount relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Editorial Crop Corner Accents */}
          <div
            aria-hidden="true"
            className="hidden sm:block absolute top-3 left-3 w-3 h-3 border-t border-l border-[#9C8E7B]"
          />
          <div
            aria-hidden="true"
            className="hidden sm:block absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#9C8E7B]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* =========================================================================
                LEFT SIDE (55%): 02 / ABOUT THE WRITER + Large Serif Heading + Facts
                ========================================================================= */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              {/* 1. Small Label */}
              <div className="flex items-center gap-3 text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A]">
                <span>02 / ABOUT THE WRITER</span>
                <span aria-hidden="true" className="w-8 h-[1px] bg-[#C8BFA8]" />
                <span className="text-[#6E685F]">{DESIGNER_PROFILE.brandMark}</span>
              </div>

              {/* 2. Main Editorial Headline */}
              <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[58px] text-[#141311] leading-[0.96] tracking-[-0.02em]">
                <span className="block">Words with</span>
                <span className="block italic font-normal text-[#74482A] mt-1">
                  something to say.
                </span>
              </h2>

              {/* 3. Concise Biography from Canva Portfolio */}
              <p className="text-sm sm:text-base text-[#4A4640] leading-[1.72] max-w-[50ch]">
                I&rsquo;m <strong className="font-medium text-[#141311]">{DESIGNER_PROFILE.name}</strong>, a
                copywriter, content strategist, and published author who believes
                every brand has a human story waiting to be told. Whether scripting
                a campaign film, shaping brand voice, or writing long-form stories,
                I craft language that makes people pause and remember.
              </p>

              {/* 4. Compact 4-Fact Row Using Verified Portfolio Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-b border-[#DED5C5]">
                {writerFacts.map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <div className="font-serif-editorial text-3xl sm:text-4xl text-[#141311] leading-none">
                      {fact.value}
                    </div>
                    <div className="text-[10px] font-mono-tabular tracking-[0.14em] uppercase text-[#6E685F] leading-snug">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5. Action Row */}
              <div className="pt-1 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onViewWork}
                  className="btn-glass-interactive group px-7 py-3.5 text-xs font-mono-tabular tracking-[0.18em] uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74482A]"
                >
                  <span>VIEW WORK</span>
                  <ArrowUpRight className="w-4 h-4 btn-editorial-arrow text-[#74482A]" />
                </button>

                <span className="font-handwritten text-xl text-[#74482A]">
                  — Tanishq Sharma
                </span>
              </div>
            </div>

            {/* =========================================================================
                RIGHT SIDE (45%): Portrait / Studio Spread + Transparent Acrylic Sheet Panel
                ========================================================================= */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
              {/* Background Tilted Canva Bio / CV Plate (Slide 03) */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * -4}px, ${
                    mouseOffset.y * -3 + scrollOffset * 0.35
                  }px, 0) rotate(-3.5deg)`
                }}
                className="hidden sm:block absolute left-2 top-3 z-10 w-[52%] bg-[#FFFDF9] p-2 border border-[#D8CFC0] shadow-[0_16px_34px_-12px_rgba(23,22,20,0.18)] transition-transform duration-500 ease-out"
              >
                <img
                  src="/assets/slide-3.png"
                  alt="Writer Experience & Published Books Spread"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Main Foreground Polaroid Frame: Canva Bio & Portrait Plate (Slide 02) */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 3}px, ${
                    mouseOffset.y * 2 - scrollOffset * 0.25
                  }px, 0) rotate(1.2deg)`
                }}
                className="relative z-20 w-full sm:w-[78%] sm:ml-auto bg-[#FFFDF9] p-3 pb-5 border border-[#DED5C5] shadow-[0_24px_48px_-14px_rgba(23,22,20,0.22)] transition-transform duration-500 ease-out"
              >
                <div
                  aria-hidden="true"
                  className="archival-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 -rotate-1"
                />

                <div className="overflow-hidden bg-[#F3EDE2] border border-[#E5DEC9]">
                  <img
                    src="/assets/slide-2.png"
                    alt="Tanishq Sharma — Writer's Studio Bio & Portrait"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#55524D]">
                  <span>WRITER&rsquo;S DOSSIER — FOLIO 02</span>
                  <Feather className="w-3.5 h-3.5 text-[#74482A]" />
                </div>
              </div>

              {/* Section 8: Transparent Acrylic Sheet Information Panel Placed Over Editorial Page */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 6}px, ${
                    mouseOffset.y * -4
                  }px, 0)`
                }}
                className="acrylic-glass hidden sm:block absolute -top-3 right-0 z-30 w-52 p-4 transition-transform duration-500 ease-out"
              >
                <div className="flex items-center justify-between text-[9px] font-mono-tabular uppercase tracking-[0.22em] text-[#74482A] pb-2 mb-2 border-b border-[#B8AC99]/50 font-semibold">
                  <span>ABOUT</span>
                  <span>INDEX 02</span>
                </div>
                <ul className="space-y-1.5">
                  {acrylicDisciplines.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#141311]"
                    >
                      <span>{item}</span>
                      <span className="w-1 h-1 rounded-full bg-[#74482A]" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Handwritten Note: "Curiosity first. Words second." */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * -5}px, ${
                    mouseOffset.y * 4 + scrollOffset * 0.4
                  }px, 0) rotate(-3deg)`
                }}
                className="paper-note-foreground absolute -bottom-3 left-2 sm:left-4 z-30 w-44 sm:w-48 p-3.5 transition-transform duration-500 ease-out"
              >
                <div
                  aria-hidden="true"
                  className="archival-tape absolute -top-2 left-8 w-10 h-3 rotate-1"
                />
                <p className="font-handwritten text-xl sm:text-2xl text-[#2B241E] leading-[1.12]">
                  &ldquo;Curiosity first.
                  <br />
                  <span className="text-[#74482A]">Words second.&rdquo;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

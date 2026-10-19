import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/portfolioData';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

interface NavItem {
  label: string;
  path: string;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', path: '/#about', sectionId: 'about-preview' },
  { label: 'Work', path: '/portfolio', sectionId: 'selected-work' },
  { label: 'Process', path: '/#process', sectionId: 'process-section' },
  { label: 'Books', path: '/#books', sectionId: 'books-section' },
  { label: 'Services', path: '/services', sectionId: 'services-section' },
  { label: 'Contact', path: '/contact', sectionId: 'contact-section' }
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const ScrambleText: React.FC<{ label: string }> = ({ label }) => {
  const [displayText, setDisplayText] = useState(label);

  const handleMouseEnter = () => {
    let frame = 0;
    const maxFrames = 5;
    const interval = setInterval(() => {
      frame++;
      if (frame >= maxFrames) {
        setDisplayText(label);
        clearInterval(interval);
      } else {
        const scrambled = label
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < Math.floor((frame / maxFrames) * label.length)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        setDisplayText(scrambled);
      }
    }, 35);
  };

  const handleMouseLeave = () => {
    setDisplayText(label);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
      {displayText}
    </span>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  onNavigate,
  onScrollToSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorX, setCursorX] = useState<number | null>(null);
  const navBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const handleLinkClick = (item: NavItem) => {
    setMobileMenuOpen(false);
    if (item.sectionId && currentPath === '/' && onScrollToSection) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        onScrollToSection(item.sectionId);
        return;
      }
    }
    onNavigate(item.path);
  };

  const handleLetsTalk = () => {
    setMobileMenuOpen(false);
    if (currentPath === '/' && onScrollToSection) {
      const el = document.getElementById('contact-section');
      if (el) {
        onScrollToSection('contact-section');
        return;
      }
    }
    onNavigate('/contact');
  };

  const isItemActive = (item: NavItem) => {
    if (item.path === '/portfolio') {
      return currentPath === '/portfolio' || currentPath.startsWith('/portfolio/');
    }
    return currentPath === item.path;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navBarRef.current) return;
    const rect = navBarRef.current.getBoundingClientRect();
    setCursorX(e.clientX - rect.left);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#171614] focus:text-[#FAF8F4] focus:text-xs focus:font-mono-tabular focus:uppercase"
      >
        Skip to content
      </a>

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Minimal Floating Glass Navigation Panel (Crisp Architectural Frame, No Giant Pill) */}
        <nav
          ref={navBarRef}
          aria-label="Primary Editorial Navigation"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setCursorX(null)}
          className={`acrylic-glass-nav relative px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14 sm:h-[58px]' : 'h-16 sm:h-[66px]'
          }`}
        >
          {/* Cursor-Following Liquid Highlight Inside Glass Bar */}
          {cursorX !== null && (
            <div
              aria-hidden="true"
              style={{
                background: `radial-gradient(160px circle at ${cursorX}px 50%, rgba(255, 255, 255, 0.72), transparent 80%)`
              }}
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            />
          )}

          {/* LEFT: Writer's Name + Identity */}
          <button
            type="button"
            onClick={() => {
              if (currentPath === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onNavigate('/');
              }
            }}
            className="relative z-10 group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
          >
            <span className="block font-serif-editorial text-lg sm:text-xl tracking-[0.05em] uppercase text-[#141311] group-hover:text-[#74482A] transition-colors">
              {DESIGNER_PROFILE.name}
            </span>
            <span className="hidden lg:block font-mono-tabular text-[8px] tracking-[0.22em] uppercase text-[#6E685F] -mt-0.5">
              ID 001 · COPYWRITER &amp; CONTENT WRITER
            </span>
          </button>

          {/* CENTER: ABOUT · WORK · PROCESS · BOOKS · SERVICES · CONTACT */}
          <div className="relative z-10 hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLinkClick(item)}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative py-1 text-[11px] font-mono-tabular tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-[1.5px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A] ${
                    active
                      ? 'text-[#141311] font-semibold'
                      : 'text-[#55524D] hover:text-[#141311]'
                  }`}
                >
                  <ScrambleText label={item.label} />
                  {/* Active Tiny Indicator Dot / Rule */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-[#74482A] transition-all duration-300 ${
                      active ? 'w-4 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT: CV + Glass Interaction Button */}
          <div className="relative z-10 hidden md:flex items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('/resume')}
              className={`text-[10px] font-mono-tabular tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-[1px] cursor-pointer ${
                currentPath === '/resume'
                  ? 'text-[#74482A] font-semibold'
                  : 'text-[#6E685F] hover:text-[#141311]'
              }`}
            >
              CV
            </button>

            <button
              type="button"
              onClick={handleLetsTalk}
              className="btn-glass-interactive group px-4 py-2 text-[10px] font-mono-tabular tracking-[0.18em] uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
            >
              <span>LET&rsquo;S TALK</span>
              <ArrowUpRight
                aria-hidden="true"
                className="w-3.5 h-3.5 btn-editorial-arrow text-[#74482A]"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="relative z-10 md:hidden p-2 text-[#141311] hover:text-[#74482A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Compact Mobile Glass Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden acrylic-glass-nav mt-1.5 px-5 pt-2 pb-5"
          >
            <div className="flex flex-col divide-y divide-[#DED6C6]/80">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (currentPath === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    onNavigate('/');
                  }
                }}
                className="py-3 flex items-center justify-between text-left text-xs font-mono-tabular tracking-[0.18em] uppercase text-[#141311] cursor-pointer"
              >
                <span>Home</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#74482A]" />
              </button>
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleLinkClick(item)}
                    className={`py-3 flex items-center justify-between text-left text-xs font-mono-tabular tracking-[0.18em] uppercase cursor-pointer ${
                      active ? 'text-[#74482A] font-semibold' : 'text-[#141311]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#74482A]" />
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/resume');
                }}
                className="py-3 flex items-center justify-between text-left text-xs font-mono-tabular tracking-[0.18em] uppercase text-[#141311] cursor-pointer"
              >
                <span>Resume / CV</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#74482A]" />
              </button>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleLetsTalk}
                className="btn-editorial-primary w-full py-3.5 px-5 text-xs font-mono-tabular tracking-[0.18em] uppercase cursor-pointer"
              >
                <span>LET&rsquo;S TALK</span>
                <ArrowUpRight className="w-4 h-4 btn-editorial-arrow" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

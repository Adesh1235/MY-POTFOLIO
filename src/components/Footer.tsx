import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="w-full bg-[#171614] text-[#FAF8F5] border-t border-[#2E2A25] no-print"
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Top Editorial Masthead Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#C49A6C]">
              COMMISSION &amp; COLLABORATION
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl text-[#FAF8F5] leading-[0.95] tracking-tight">
              Have an idea worth
              <span className="block italic font-normal text-[#C49A6C] mt-1">
                turning into a visual story?
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#FAF8F5] text-[#171614] text-xs font-mono-tabular tracking-[0.18em] uppercase hover:bg-[#C49A6C] hover:text-[#171614] active:scale-98 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C49A6C]"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Middle Directory Columns */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 text-xs">
          <div className="lg:col-span-5 space-y-3">
            <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#FAF8F5] font-semibold">
              TANISHQ SHARMA
            </span>
            <p className="text-sm text-[#B8B0A4] max-w-sm leading-relaxed">
              Independent Copywriter &amp; Content Strategist crafting brand narratives, campaign copy, social IPs, and editorial systems.
            </p>
            <p className="text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#8E867B] pt-1">
              {DESIGNER_PROFILE.location}
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <span className="block text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#8E867B]">
              INDEX
            </span>
            <ul className="space-y-2.5 font-mono-tabular text-[11px] tracking-[0.18em] uppercase">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/portfolio')}
                  className="text-[#D8D0C5] hover:text-[#C49A6C] transition-colors cursor-pointer"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/#about')}
                  className="text-[#D8D0C5] hover:text-[#C49A6C] transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="text-[#D8D0C5] hover:text-[#C49A6C] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/resume')}
                  className="text-[#D8D0C5] hover:text-[#C49A6C] transition-colors cursor-pointer"
                >
                  Resume / CV
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <span className="block text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#8E867B]">
              DIRECT CONTACT &amp; SOCIALS
            </span>
            <div className="space-y-2 text-sm text-[#D8D0C5]">
              <a
                href={`mailto:${DESIGNER_PROFILE.email}`}
                className="block hover:text-[#C49A6C] transition-colors"
              >
                {DESIGNER_PROFILE.email}
              </a>
              <a
                href={`tel:${DESIGNER_PROFILE.phone.replace(/\s+/g, '')}`}
                className="block font-mono-tabular text-xs text-[#B8B0A4] hover:text-[#C49A6C] transition-colors"
              >
                {DESIGNER_PROFILE.phone}
              </a>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-5 font-mono-tabular text-[11px] tracking-[0.16em] uppercase">
              <a
                href={DESIGNER_PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8B0A4] hover:text-[#FAF8F5] transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={DESIGNER_PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8B0A4] hover:text-[#FAF8F5] transition-colors"
              >
                Instagram ↗
              </a>
              <a
                href={DESIGNER_PROFILE.canvaPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8B0A4] hover:text-[#FAF8F5] transition-colors"
              >
                Archive Deck ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon & Back to Top */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono-tabular tracking-[0.16em] uppercase text-[#8E867B]">
          <span>&copy; {new Date().getFullYear()} TANISHQ SHARMA. ALL RIGHTS RESERVED.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-[#D8D0C5] hover:text-[#C49A6C] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

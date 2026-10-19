import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface NotFoundProps {
  onNavigateHome: () => void;
  onNavigatePortfolio: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  onNavigateHome,
  onNavigatePortfolio
}) => {
  return (
    <section
      aria-label="Page Not Found"
      className="w-full min-h-[75vh] pt-28 pb-20 flex items-center justify-center px-4 sm:px-8"
    >
      <div className="max-w-xl w-full border-t border-b border-[#DED6C6] py-14 space-y-6">
        <span className="block text-[11px] font-mono-tabular uppercase tracking-[0.22em] text-[#74482A]">
          404 / PAGE NOT FOUND
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#141311] leading-none">
          This page is outside the archive.
        </h1>
        <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed">
          The page or case study you requested may have moved. Return to the
          main issue or browse the selected works index.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#171614] text-[#FAF8F5] text-xs font-mono-tabular tracking-[0.18em] uppercase hover:bg-[#74482A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>RETURN HOME</span>
          </button>

          <button
            type="button"
            onClick={onNavigatePortfolio}
            className="group inline-flex items-center gap-1.5 text-xs font-mono-tabular tracking-[0.18em] uppercase text-[#141311] hover:text-[#74482A] transition-colors cursor-pointer"
          >
            <span className="underline underline-offset-8 decoration-[#C8BFA8] group-hover:decoration-[#74482A]">
              VIEW SELECTED WORK
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, BookOpen, X } from 'lucide-react';
import { BOOKS_DATA, Book, DESIGNER_PROFILE } from '../data/portfolioData';

export const BooksSection: React.FC = () => {
  const [selectedBookForExcerpt, setSelectedBookForExcerpt] = useState<Book | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBookForExcerpt(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="books-section"
      aria-label="04 / Books — Published Titles by Tanishq Sharma"
      className="surface-books relative w-full py-20 sm:py-28 border-b border-[#DED6C6] overflow-hidden"
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Editorial Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#DED6C6] mb-16">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
              <span>04 / BOOKS</span>
              <span aria-hidden="true" className="w-6 h-[1px] bg-[#C8BFA8]" />
              <span className="text-[#6E685F]">LITERARY PUBLICATIONS</span>
            </div>

            <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[68px] text-[#141311] leading-[0.94] tracking-[-0.025em]">
              <span className="block">Stories that</span>
              <span className="block italic font-normal text-[#74482A] mt-1">
                live beyond the screen.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end justify-between space-y-3">
            <p className="text-sm sm:text-base text-[#4A4640] leading-[1.7] max-w-md lg:text-right">
              When I&rsquo;m not writing for brands, I write for people. Two
              published titles exploring modern relationships, heartbreak, and human
              connection.
            </p>
            <span className="font-handwritten text-xl text-[#74482A]">
              &ldquo;Words worth keeping on paper.&rdquo;
            </span>
          </div>
        </div>

        {/* Editorial Bookshelf Spread (2 Physical Book Compositions) */}
        <div className="space-y-16 sm:space-y-24">
          {BOOKS_DATA.map((book, idx) => {
            const isFirst = idx === 0;
            const coverSrc =
              book.coverTheme === 'happy-breakup'
                ? '/assets/MAHWM02S4Jg.png'
                : '/assets/MAHWM_xmY7c.png';

            return (
              <article
                key={book.id}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 sm:pb-20 border-b border-[#DED6C6] last:border-b-0 last:pb-0"
              >
                {/* Physical Book Plinth Column (5 Columns) */}
                <div
                  className={`lg:col-span-5 relative flex items-center justify-center ${
                    isFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Subtle Offset Manuscript Backing Sheet */}
                  <div
                    aria-hidden="true"
                    className={`hidden sm:block absolute w-[84%] h-[90%] bg-[#EAE2D3] border border-[#D8CEBE] transition-transform duration-500 ${
                      isFirst
                        ? '-rotate-2 group-hover:-rotate-3'
                        : 'rotate-2 group-hover:rotate-3'
                    }`}
                  />

                  {/* Physical Paper Plinth with 3D-Mounted Book Cover */}
                  <div className="paper-mount relative z-10 w-full max-w-[390px] p-6 sm:p-8 flex flex-col items-center">
                    <div
                      aria-hidden="true"
                      className="archival-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 rotate-1"
                    />

                    {/* Physical Book Object with Spine Shadow & Page Edge */}
                    <div className="relative w-full max-w-[260px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.02]">
                      {/* Book Page-Edge Thickness on Right */}
                      <div
                        aria-hidden="true"
                        className="absolute top-1.5 bottom-1.5 -right-2 w-2.5 bg-gradient-to-r from-[#E6DEC8] via-[#FAF6EE] to-[#D5CCB8] border-y border-r border-[#C9BFA8]"
                      />
                      {/* Book Cover Image */}
                      <div className="relative overflow-hidden bg-[#1D1A17] border border-[#2C2621]/20 shadow-[-12px_20px_38px_-10px_rgba(23,20,17,0.34),0_6px_14px_rgba(23,20,17,0.12)] group-hover:shadow-[-16px_28px_48px_-10px_rgba(23,20,17,0.42),0_10px_20px_rgba(23,20,17,0.16)] transition-shadow duration-500">
                        {/* Subtle Spine Crease Highlight */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0 bottom-0 left-2.5 w-[2px] z-20 bg-white/20 shadow-[1px_0_3px_rgba(0,0,0,0.35)]"
                        />
                        <img
                          src={coverSrc}
                          alt={`${book.title} — Book Cover by ${DESIGNER_PROFILE.name}`}
                          loading="lazy"
                          className="w-full h-auto object-contain block"
                        />
                      </div>
                    </div>

                    {/* Hover Reveal Micro-Caption Inside Plinth */}
                    <div className="w-full pt-5 mt-5 border-t border-[#EAE2D3] flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#6E685F]">
                      <span>EDITION N° 0{idx + 1}</span>
                      <span className="font-handwritten text-base normal-case tracking-normal text-[#74482A] opacity-80 group-hover:opacity-100 transition-opacity">
                        {book.publishYear}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Book Details & Excerpt Column (7 Columns) */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isFirst ? 'lg:order-2' : 'lg:order-1 lg:pr-6'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#6E685F]">
                    <span className="text-[#74482A] font-semibold">
                      PUBLISHED BOOK 0{idx + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{book.publishYear}</span>
                    <span aria-hidden="true">·</span>
                    <span>{book.format}</span>
                  </div>

                  <h3 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[54px] text-[#141311] leading-[0.98] tracking-tight group-hover:text-[#74482A] transition-colors">
                    {book.title}
                  </h3>

                  <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#74482A] leading-snug">
                    {book.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-[#4A4640] leading-[1.75] max-w-[56ch]">
                    {book.synopsis}
                  </p>

                  {/* Short Chapter Preview Pull-Quote */}
                  <div className="p-5 bg-[#FFFDF9] border border-[#DDD3C2] shadow-[0_12px_28px_-14px_rgba(23,20,17,0.1)] space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#74482A]">
                      <span>FROM {book.sampleChapterTitle}</span>
                      <span>AUTHOR: {DESIGNER_PROFILE.name}</span>
                    </div>
                    <p className="font-serif-editorial italic text-lg text-[#141311] leading-relaxed">
                      &ldquo;{book.sampleExcerpt[0]}&rdquo;
                    </p>
                  </div>

                  {/* Publication Metadata + Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-6">
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-primary group/btn px-6 py-3.5 text-xs font-mono-tabular tracking-[0.18em] uppercase"
                    >
                      <span>ORDER ON AMAZON</span>
                      <ArrowUpRight className="w-4 h-4 btn-editorial-arrow" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedBookForExcerpt(book)}
                      className="group/read inline-flex items-center gap-2 py-2 text-xs font-mono-tabular tracking-[0.18em] uppercase text-[#141311] hover:text-[#74482A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#74482A]" />
                      <span className="underline underline-offset-8 decoration-[#C8BFA8] group-hover/read:decoration-[#74482A]">
                        READ SAMPLE CHAPTER
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Physical Literary Manuscript Excerpt Modal */}
      {selectedBookForExcerpt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Excerpt from ${selectedBookForExcerpt.title}`}
          className="fixed inset-0 z-50 bg-[#141311]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedBookForExcerpt(null)}
        >
          <div
            className="paper-mount max-w-2xl w-full max-h-[88vh] overflow-y-auto p-7 sm:p-12 text-[#141311]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#DED6C6]">
              <div>
                <p className="font-mono-tabular text-[10px] uppercase tracking-[0.22em] text-[#74482A] mb-1.5">
                  BOOK EXCERPT · {selectedBookForExcerpt.publishYear}
                </p>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141311]">
                  {selectedBookForExcerpt.title}
                </h3>
                <p className="text-[11px] font-mono-tabular text-[#6E685F] mt-1">
                  BY {DESIGNER_PROFILE.name.toUpperCase()} · {selectedBookForExcerpt.isbn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookForExcerpt(null)}
                aria-label="Close book reader"
                className="p-2 border border-[#DED6C6] text-[#55524D] hover:text-[#141311] hover:border-[#141311] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-8">
              <h4 className="font-serif-editorial italic text-2xl text-[#74482A] mb-6">
                {selectedBookForExcerpt.sampleChapterTitle}
              </h4>
              <div className="space-y-5 font-serif-editorial text-xl leading-[1.75] text-[#141311]">
                {selectedBookForExcerpt.sampleExcerpt.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#DED6C6] flex flex-wrap items-center justify-between gap-4">
              <span className="text-[11px] font-mono-tabular uppercase tracking-[0.16em] text-[#6E685F]">
                AVAILABLE IN PAPERBACK &amp; KINDLE EDITION
              </span>
              <a
                href={selectedBookForExcerpt.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary px-6 py-3 text-xs font-mono-tabular tracking-[0.18em] uppercase"
              >
                <span>GET FULL BOOK ON AMAZON</span>
                <ArrowUpRight className="w-3.5 h-3.5 btn-editorial-arrow" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

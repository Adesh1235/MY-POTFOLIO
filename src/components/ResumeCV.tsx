import React, { useState } from 'react';
import { Printer, Copy, Check, ArrowUpRight, BookOpen } from 'lucide-react';
import { DESIGNER_PROFILE, RESUME_DATA, BOOKS_DATA } from '../data/portfolioData';

interface ResumeCVProps {
  onNavigate: (path: string) => void;
}

export const ResumeCV: React.FC<ResumeCVProps> = ({ onNavigate }) => {
  const [copiedText, setCopiedText] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlainText = async () => {
    const plainText = `${DESIGNER_PROFILE.name} — ${DESIGNER_PROFILE.roles.join(' · ')}
Location: ${DESIGNER_PROFILE.location}
Email: ${DESIGNER_PROFILE.email} | Phone: ${DESIGNER_PROFILE.phone}

SUMMARY
${RESUME_DATA.summary}

EXPERIENCE
${RESUME_DATA.experience
  .map(
    (e) =>
      `${e.role} | ${e.company} (${e.period}, ${e.location})\n${e.highlights
        .map((h) => `- ${h}`)
        .join('\n')}`
  )
  .join('\n\n')}

EDUCATION
${RESUME_DATA.education
  .map((ed) => `${ed.degree} — ${ed.institution} (${ed.year})`)
  .join('\n')}

PUBLISHED BOOKS
${BOOKS_DATA.map((b) => `- "${b.title}" (${b.publishYear}) — ${b.subtitle}`).join('\n')}
`;
    try {
      await navigator.clipboard.writeText(plainText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  return (
    <div className="w-full py-12 sm:py-16">
      <div className="max-w-[1180px] 2xl:max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Action Bar (Hidden when printing) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print">
          <div>
            <span className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52]">
              CURRICULUM VITAE &amp; BIBLIOGRAPHY
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyPlainText}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#171717] rounded-full liquid-glass-pill hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9A6F52]"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Copied Plain-Text CV</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#9A6F52]" />
                  <span>Copy Plain-Text CV</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FAF9F6] bg-[#171717] rounded-full hover:bg-[#653F3B] active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9A6F52]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Monograph Resume Document Card in Liquid Glass */}
        <div className="rounded-3xl liquid-glass-card p-7 sm:p-12">
          {/* CV Header */}
          <header className="pb-8 border-b border-[#C9C3B8] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#171717] leading-none mb-3">
                {DESIGNER_PROFILE.name}
              </h1>
              <p className="font-mono-tabular text-xs sm:text-sm text-[#9A6F52] tracking-wider uppercase">
                {DESIGNER_PROFILE.roles.join(' · ')}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-[#55524D] space-y-1 md:text-right font-mono-tabular">
              <div>{DESIGNER_PROFILE.email} · {DESIGNER_PROFILE.phone}</div>
              <div>{DESIGNER_PROFILE.location}</div>
              <div className="text-[#9A6F52]">{DESIGNER_PROFILE.availability}</div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="py-8 border-b border-[#C9C3B8]">
            <h2 className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52] mb-3">
              01. Profile Summary
            </h2>
            <p className="font-serif-editorial text-xl sm:text-2xl text-[#171717] leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </section>

          {/* Experience Timeline */}
          <section className="py-8 border-b border-[#C9C3B8]">
            <h2 className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52] mb-6">
              02. Career Experience
            </h2>
            <div className="space-y-8">
              {RESUME_DATA.experience.map((exp) => (
                <div key={`${exp.role}-${exp.company}`} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <div className="font-mono-tabular text-xs font-semibold text-[#171717]">
                      {exp.period}
                    </div>
                    <div className="text-sm font-semibold text-[#9A6F52] mt-0.5">
                      {exp.company}
                    </div>
                    <div className="text-xs text-[#55524D] mt-0.5">{exp.location}</div>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-serif-editorial text-2xl text-[#171717] mb-2">
                      {exp.role}
                    </h3>
                    <ul className="space-y-2 text-sm text-[#55524D] leading-relaxed">
                      {exp.highlights.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Published Bibliography */}
          <section className="py-8 border-b border-[#C9C3B8]">
            <h2 className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52] mb-6">
              03. Published Books &amp; Literary Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BOOKS_DATA.map((book) => (
                <div
                  key={book.id}
                  className="p-5 rounded-2xl bg-white/60 border border-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-[#55524D] mb-2">
                      <span>{book.publishYear}</span>
                      <span>{book.isbn}</span>
                    </div>
                    <h3 className="font-serif-editorial text-2xl text-[#171717] mb-1">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#55524D] mb-3">
                      {book.subtitle}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#C9C3B8]/60 flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-[#9A6F52]">{book.readersCount}</span>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#171717] hover:text-[#9A6F52] font-semibold"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Amazon Listing ↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Core Disciplines */}
          <section className="py-8 border-b border-[#C9C3B8]">
            <h2 className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52] mb-6">
              04. Core Disciplines &amp; Craft
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESUME_DATA.coreCompetencies.map((group) => (
                <div key={group.group}>
                  <h3 className="font-serif-editorial text-xl text-[#171717] mb-2">
                    {group.group}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55524D] leading-loose">
                    {group.skills.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Recognitions */}
          <section className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52] mb-4">
                05. Education
              </h2>
              <div className="space-y-4">
                {RESUME_DATA.education.map((edu) => (
                  <div key={edu.degree}>
                    <div className="font-mono-tabular text-xs text-[#55524D]">
                      {edu.year}
                    </div>
                    <h3 className="font-serif-editorial text-xl text-[#171717]">
                      {edu.degree}
                    </h3>
                    <div className="text-xs sm:text-sm font-medium text-[#171717]">
                      {edu.institution}
                    </div>
                    <div className="text-xs text-[#9A6F52] mt-0.5">{edu.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono-tabular text-xs uppercase tracking-widest text-[#9A6F52] mb-4">
                06. Selected Honors &amp; Milestones
              </h2>
              <div className="space-y-3">
                {RESUME_DATA.honors.map((honor) => (
                  <div key={honor} className="pb-3 border-b border-[#C9C3B8]/60 last:border-b-0">
                    <div className="text-sm font-medium text-[#171717]">
                      {honor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl liquid-glass-card no-print">
          <div>
            <h3 className="font-serif-editorial text-2xl text-[#171717]">
              Interested in commissioning Tanishq for an upcoming project or retainer?
            </h3>
            <p className="text-xs sm:text-sm text-[#55524D]">
              Direct inquiries and creative briefs receive a response within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#FAF9F6] bg-[#171717] rounded-full hover:bg-[#653F3B] active:scale-95 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9A6F52]"
          >
            <span>Initiate Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

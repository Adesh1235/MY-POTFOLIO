import React, { useState } from 'react';
import { ArrowUpRight, Check, Plus, Minus } from 'lucide-react';
import { SERVICES_DATA, ServicePackage } from '../data/portfolioData';

interface ServicesProps {
  onSelectServiceForInquiry: (service: ServicePackage) => void;
}

const FAQ_ITEMS = [
  {
    q: 'How does a typical copywriting or brand strategy engagement begin?',
    a: 'Every project starts with a 45-minute discovery conversation and a deep-dive brand questionnaire. Within 48 hours, you receive a tailored scope roadmap, fixed milestone schedule, and deliverable checklist.'
  },
  {
    q: 'Do you collaborate directly with graphic designers and in-house product teams?',
    a: 'Yes. Over 70% of my engagements involve working directly inside shared Figma files, packaging dielines, or agency storyboards alongside art directors, designers, and developers so copy and visual layout evolve together.'
  },
  {
    q: 'How many rounds of revisions are included in a standard engagement?',
    a: 'All project packages include two comprehensive rounds of collaborative refinement plus a final polish pass for typographical and layout alignment.'
  },
  {
    q: 'Can we book a fast-turnaround campaign sprint or verbal audit?',
    a: 'Yes—if you have an upcoming product launch or website refresh, we can structure an intensive 10-day verbal sprint focused on hero headlines, positioning, and key conversion pages.'
  }
];

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id="services-section"
      aria-label="Services & Capabilities"
      className="surface-work w-full py-20 sm:py-28 border-b border-[#DED6C6]"
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#DED6C6] mb-14">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
              <span>06 / SERVICES &amp; CAPABILITIES</span>
              <span aria-hidden="true" className="w-6 h-[1px] bg-[#C8BFA8]" />
              <span className="text-[#6E685F]">COMMISSIONS</span>
            </div>

            <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[66px] text-[#141311] leading-[0.95] tracking-[-0.02em]">
              <span className="block">Words Engineered to</span>
              <span className="block italic font-normal text-[#74482A] mt-1">
                Build Brands &amp; Move Markets.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:text-right space-y-2">
            <p className="text-sm sm:text-base text-[#4A4640] leading-[1.7] max-w-md lg:ml-auto">
              Whether launching a new consumer brand from scratch, refreshing
              packaging copy across twenty SKUs, or scripting a national campaign.
            </p>
            <p className="font-handwritten text-xl text-[#74482A]">
              &ldquo;Draft → Edit → Refine&rdquo;
            </p>
          </div>
        </header>

        {/* 6 Editorial Rate-Card Sheets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-16 border-b border-[#DED6C6]">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.id}
              className="paper-mount group p-7 sm:p-9 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#EAE2D3]">
                  <span className="font-mono-tabular text-xs font-semibold tracking-[0.2em] text-[#74482A]">
                    FOLIO {service.number}
                  </span>
                  <div className="text-[11px] font-mono-tabular text-[#6E685F]">
                    <span>{service.timeline}</span>
                    <span className="mx-2">·</span>
                    <strong className="text-[#141311]">{service.investmentRange}</strong>
                  </div>
                </div>

                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141311] leading-tight mb-2 group-hover:text-[#74482A] transition-colors">
                  {service.title}
                </h3>

                <p className="font-serif-editorial italic text-lg text-[#74482A] mb-4">
                  {service.subtitle}
                </p>

                <p className="text-sm text-[#4A4640] leading-[1.7] mb-6">
                  {service.description}
                </p>

                <div className="mb-7">
                  <h4 className="font-mono-tabular text-[10px] uppercase tracking-[0.2em] text-[#6E685F] mb-3">
                    INCLUDED DELIVERABLES
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#141311]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#74482A] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#EAE2D3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#6E685F] max-w-xs leading-relaxed">
                  <strong className="text-[#141311] font-medium">Ideal for:</strong>{' '}
                  {service.idealFor}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectServiceForInquiry(service)}
                  className="btn-editorial-primary px-5 py-3 text-[11px] font-mono-tabular tracking-[0.18em] uppercase shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
                >
                  <span>INQUIRE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 btn-editorial-arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial FAQ Accordion */}
        <div className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <span className="block text-[10px] font-mono-tabular uppercase tracking-[0.22em] text-[#74482A]">
              WORKING TOGETHER
            </span>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141311] leading-tight">
              Common Questions on Process &amp; Scope.
            </h3>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#DED6C6] border-t border-b border-[#DED6C6]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
                  >
                    <span className="font-serif-editorial text-xl sm:text-2xl text-[#141311]">
                      {item.q}
                    </span>
                    <span className="text-[#74482A] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pt-3 text-sm text-[#4A4640] leading-[1.7] max-w-2xl">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

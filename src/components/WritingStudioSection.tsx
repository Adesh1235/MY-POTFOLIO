import React from 'react';
import {
  Compass,
  Sparkles,
  Heart,
  Target,
  BookOpen,
  Music,
  Coffee,
  Feather,
  MapPin,
  Lightbulb
} from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/portfolioData';

const WRITING_PRINCIPLES = [
  {
    title: 'CURIOSITY',
    subtitle: 'Ask better questions.',
    icon: Compass
  },
  {
    title: 'CLARITY',
    subtitle: 'Find the simple truth.',
    icon: Sparkles
  },
  {
    title: 'EMOTION',
    subtitle: 'Write for real people.',
    icon: Heart
  },
  {
    title: 'STRATEGY',
    subtitle: 'Connect words with goals.',
    icon: Target
  },
  {
    title: 'STORY',
    subtitle: 'Turn messages into meaning.',
    icon: BookOpen
  }
];

const WRITING_PROCESS_STEPS = [
  {
    number: '01',
    title: 'LISTEN',
    description:
      'Understand the brand, the audience, the cultural tension, and the real problem before writing a single headline.',
    annotation: 'Research & immersion'
  },
  {
    number: '02',
    title: 'THINK',
    description:
      'Find the human truth underneath the brief—the angle that feels fresh, honest, and impossible to ignore.',
    annotation: 'Positioning & angle'
  },
  {
    number: '03',
    title: 'WRITE',
    description:
      'Turn the idea into memorable language with rhythm, voice, and emotional resonance across every touchpoint.',
    annotation: 'First & second drafts'
  },
  {
    number: '04',
    title: 'REFINE',
    description:
      'Strip away every unnecessary adjective until only the sharpest, clearest words remain on the page.',
    annotation: 'Draft → Edit → Refine'
  }
];

const OFF_THE_PAGE_INTERESTS = [
  {
    category: 'Books',
    detail: 'Writing & reading contemporary fiction, poetry, and essays on human relationships.',
    icon: BookOpen
  },
  {
    category: 'Music',
    detail: 'Curating late-night acoustic & indie playlists that set the cadence for long-form drafts.',
    icon: Music
  },
  {
    category: 'Design',
    detail: 'Studying print magazines, book covers, packaging dielines, and Swiss-editorial grids.',
    icon: Feather
  },
  {
    category: 'Travel',
    detail: 'Observing local street signs, café conversations, and city rhythms across India.',
    icon: MapPin
  },
  {
    category: 'Ideas',
    detail: 'Collecting overheard one-liners and raw campaign hooks in pocket notebooks.',
    icon: Lightbulb
  },
  {
    category: 'Coffee',
    detail: 'Black pour-over for morning first drafts; warm filter coffee for midnight edits.',
    icon: Coffee
  }
];

export const WritingStudioSection: React.FC = () => {
  return (
    <section
      aria-label="Writing Philosophy, Process & Off The Page"
      className="surface-process relative w-full py-20 sm:py-28 border-b border-[#DED6C6] overflow-hidden"
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-28">
        {/* =========================================================================
            PART 1: WRITING PHILOSOPHY ("Curiosity first. Words second.")
            ========================================================================= */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 border-b border-[#D8CEBE]">
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
                <span>05 / WRITING PHILOSOPHY</span>
                <span aria-hidden="true" className="w-6 h-[1px] bg-[#C8BFA8]" />
                <span className="text-[#6E685F]">THE CRAFT</span>
              </div>

              <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[66px] text-[#141311] leading-[0.95] tracking-[-0.02em]">
                <span className="block">&ldquo;Curiosity first.</span>
                <span className="block italic font-normal text-[#74482A] mt-1">
                  Words second.&rdquo;
                </span>
              </h2>
            </div>

            <div className="lg:col-span-6 lg:pl-6 space-y-3">
              <p className="font-serif-editorial text-2xl sm:text-3xl text-[#141311] leading-[1.32]">
                Good writing should do more than sound good. It should make
                people pause, feel something, understand an idea, and remember it
                later.
              </p>
              <p className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#6E685F]">
                — {DESIGNER_PROFILE.name}, {DESIGNER_PROFILE.brandMark}
              </p>
            </div>
          </div>

          {/* Five Principles with Tiny Line Icons (Unboxed Editorial Strip) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#D8CEBE] border-b border-[#D8CEBE]">
            {WRITING_PRINCIPLES.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="py-7 sm:px-6 first:sm:pl-0 last:sm:pr-0 flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono-tabular tracking-[0.2em] text-[#74482A]">
                    <span>0{idx + 1}</span>
                    <IconComponent
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#74482A] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="font-mono-tabular text-xs font-semibold tracking-[0.2em] uppercase text-[#141311] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="font-serif-editorial italic text-xl text-[#4A4640]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PART 2: WRITING PROCESS (Four Tactile Paper Sheets: LISTEN · THINK · WRITE · REFINE)
            ========================================================================= */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <span className="block text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
                THE EDITORIAL METHOD · FOUR STAGES
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-5xl text-[#141311] leading-none">
                How an Idea Becomes Copy.
              </h3>
            </div>

            {/* Handwritten Annotation */}
            <div className="paper-note-foreground px-4 py-2.5 -rotate-1">
              <p className="font-handwritten text-xl text-[#2B241E]">
                &ldquo;Think. Write. <span className="text-[#74482A]">Refine.&rdquo;</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {WRITING_PROCESS_STEPS.map((step, idx) => (
              <article
                key={step.number}
                className={`paper-mount group relative p-6 sm:p-7 flex flex-col justify-between min-h-[250px] hover:-translate-y-1.5 ${
                  idx % 2 === 1 ? 'lg:mt-4' : ''
                }`}
              >
                {/* Top Masking Tape Detail */}
                <div
                  aria-hidden="true"
                  className="archival-tape absolute -top-2 left-8 w-12 h-3 rotate-1"
                />

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[#EAE2D3] pb-3">
                    <span className="font-serif-editorial italic text-3xl sm:text-4xl text-[#74482A] leading-none">
                      {step.number}
                    </span>
                    <span className="text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#6E685F]">
                      STAGE 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-serif-editorial text-2xl sm:text-3xl text-[#141311] tracking-tight group-hover:text-[#74482A] transition-colors">
                    <span className="highlight-pen px-1">{step.title}</span>
                  </h4>

                  <p className="text-sm text-[#4A4640] leading-[1.68]">
                    {step.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#EAE2D3] flex items-center justify-between">
                  <span className="font-handwritten text-base text-[#74482A]">
                    {step.annotation}
                  </span>
                  <span className="text-[9px] font-mono-tabular uppercase tracking-[0.16em] text-[#8C8478]">
                    SHEET 0{idx + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PART 3: PERSONAL / OFF-THE-PAGE ("When I'm not writing…")
            ========================================================================= */}
        <div className="pt-4">
          <div className="paper-mount relative p-7 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <span className="block text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
                  OFF THE CLOCK · PERSONAL NOTES
                </span>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[44px] text-[#141311] leading-[1.0]">
                  When I&rsquo;m not
                  <br />
                  <span className="italic font-normal text-[#74482A]">writing&hellip;</span>
                </h3>
                <p className="text-sm text-[#4A4640] leading-[1.68] pt-1">
                  Good copywriting comes from paying attention to life outside the
                  brief—books, late-night playlists, quiet cafés, and everyday
                  conversations.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {OFF_THE_PAGE_INTERESTS.map((interest) => {
                  const IconComp = interest.icon;
                  return (
                    <div
                      key={interest.category}
                      className="p-4 bg-[#FAF6EE] border border-[#E5DEC9] space-y-2 transition-colors hover:border-[#74482A]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif-editorial text-2xl text-[#141311]">
                          {interest.category}
                        </span>
                        <IconComp className="w-3.5 h-3.5 text-[#74482A]" />
                      </div>
                      <p className="text-xs text-[#4A4640] leading-[1.65]">
                        {interest.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

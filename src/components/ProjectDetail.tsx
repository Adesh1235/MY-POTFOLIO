import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Project, PROJECTS_DATA } from '../data/portfolioData';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
  onInquireWithContext: (category: string, messagePrefill: string) => void;
}

/**
 * Maps each project ID to its authentic exported Canva presentation slides
 * so each case study displays the real presentation artwork without distortion or cropping.
 */
const PROJECT_CANVA_SLIDES: Record<
  string,
  { src: string; title: string; note: string; layout: 'full' | 'half' }[]
> = {
  'proj-01': [
    {
      src: '/assets/slide-11.png',
      title: 'Slide 01 — Big CLiQ Sale (P1): “Everything Is On Loop”',
      note: 'Core campaign hook & 360° creative approach rooted in “No Limits. No Rules.”',
      layout: 'full'
    },
    {
      src: '/assets/slide-12.png',
      title: 'Slide 02 — Campaign Execution & Rollout',
      note: 'Teaser scripts, Hero-Hub-Hygiene content architecture, and binding visual direction.',
      layout: 'full'
    }
  ],
  'proj-02': [
    {
      src: '/assets/slide-8.png',
      title: 'Slide 01 — Cupid Sale: “Love It.”',
      note: 'Reframing Valentine’s fashion commerce around effortless self-expression.',
      layout: 'full'
    },
    {
      src: '/assets/slide-9.png',
      title: 'Slide 02 — Social & Campaign Touchpoints',
      note: 'Multi-format storytelling across social, site banners, and creator scripts.',
      layout: 'half'
    },
    {
      src: '/assets/slide-10.png',
      title: 'Slide 03 — Visual Mood & Direction',
      note: 'Cohesive campaign language and tonal guidelines.',
      layout: 'half'
    }
  ],
  'proj-03': [
    {
      src: '/assets/slide-20.png',
      title: 'Slide 01 — GAS Milano India: #ArtOfItalianDenim',
      note: 'Translating Italian denim heritage into contemporary Indian fashion culture.',
      layout: 'full'
    },
    {
      src: '/assets/slide-21-hero.png',
      title: 'Slide 02 — Campaign Hero Visuals & Narrative',
      note: 'Editorial art direction and social-first campaign execution.',
      layout: 'half'
    },
    {
      src: '/assets/slide-22.png',
      title: 'Slide 03 — Lookbook & Digital Rollout',
      note: 'Craftsmanship details and digital storytelling assets.',
      layout: 'half'
    }
  ],
  'proj-04': [
    {
      src: '/assets/slide-16.png',
      title: 'Slide 01 — All You Can 2026: The Drip Dept. Pop-Up',
      note: 'Experiential booth concept, spatial copy, and on-ground engagement strategy.',
      layout: 'full'
    },
    {
      src: '/assets/slide-17.png',
      title: 'Slide 02 — On-Ground Experience & Social Amplification',
      note: 'Interactive touchpoints and live event content coverage.',
      layout: 'half'
    },
    {
      src: '/assets/slide-18.png',
      title: 'Slide 03 — Pop-Up Visual Identity & Collateral',
      note: 'Spatial graphics, signage, and takeaway print assets.',
      layout: 'half'
    }
  ],
  'proj-05': [
    {
      src: '/assets/slide-14.png',
      title: 'Slide 01 — Tata CLiQ Fashion × Miyo Dessert Bar',
      note: 'Cross-category brand collaboration merging fashion discovery with artisanal desserts.',
      layout: 'full'
    },
    {
      src: '/assets/slide-15.png',
      title: 'Slide 02 — Scoop, Spill & Win In-Store Activation',
      note: 'Packaging sleeves, custom menu copy, and interactive store mechanics.',
      layout: 'full'
    }
  ],
  'proj-06': [
    {
      src: '/assets/slide-23-hero.png',
      title: 'Slide 01 — GAS Milano AW’25 Moto Documentary',
      note: 'Narrative direction and script architecture for the AW’25 Moto collection.',
      layout: 'full'
    },
    {
      src: '/assets/slide-20.png',
      title: 'Slide 02 — Brand World & Heritage Context',
      note: 'Connecting moto culture with Italian denim craftsmanship.',
      layout: 'full'
    }
  ],
  'proj-07': [
    {
      src: '/assets/slide-24-hero.png',
      title: 'Slide 01 — Summer Stories SS’26 & Little Birdie',
      note: 'Seasonal campaign storytelling and warm editorial visual direction.',
      layout: 'full'
    },
    {
      src: '/assets/slide-25-hero.png',
      title: 'Slide 02 — Kidswear & Lifestyle Narrative Spreads',
      note: 'Playful, craft-led visual and verbal communication.',
      layout: 'half'
    },
    {
      src: '/assets/slide-26.png',
      title: 'Slide 03 — Campaign Rollout & Social Assets',
      note: 'Carousel concepts, shoot direction, and digital storytelling.',
      layout: 'half'
    }
  ],
  'proj-08': [
    {
      src: '/assets/slide-19.png',
      title: 'Slide 01 — Topical Campaigns & Cultural Moments',
      note: 'High-velocity cultural storytelling and brand moment hijacks.',
      layout: 'full'
    },
    {
      src: '/assets/slide-27-hero.png',
      title: 'Slide 02 — Celebrity & Creator Collaborations',
      note: 'Script-led reels, vox pops, and high-engagement social executions.',
      layout: 'half'
    },
    {
      src: '/assets/slide-28.png',
      title: 'Slide 03 — Extended Social & Campaign Archive',
      note: 'Multi-channel creative executions and performance highlights.',
      layout: 'half'
    }
  ],
  'proj-09': [
    {
      src: '/assets/slide-5.png',
      title: 'Slide 01 — Creative Toolkit & Direct-Response Ecosystem',
      note: '360° campaign ideation, CRM, WhatsApp, emailers, dark ads, and AOP pitch decks.',
      layout: 'full'
    },
    {
      src: '/assets/slide-13.png',
      title: 'Slide 02 — Multi-Channel Campaign Architecture',
      note: 'Cohesive communication across digital, social, and retention touchpoints.',
      layout: 'full'
    }
  ]
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onSelectProject,
  onInquireWithContext
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const slides = PROJECT_CANVA_SLIDES[project.id] || PROJECT_CANVA_SLIDES['proj-01'];

  // Find next project for "NEXT PROJECT →" editorial footer
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const nextProject =
    PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length] || PROJECTS_DATA[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % slides.length : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + slides.length) % slides.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, slides.length]);

  return (
    <article className="w-full pt-24 sm:pt-32 pb-20 bg-[#FAF8F5] text-[#141311]">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Back Navigation */}
        <div className="pb-8 border-b border-[#DED6C6] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#55524D] hover:text-[#171614] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO SELECTED WORK</span>
          </button>

          <span className="text-[11px] font-mono-tabular tracking-[0.2em] uppercase text-[#74482A]">
            CASE STUDY / {project.year}
          </span>
        </div>

        {/* =========================================================================
            1. PROJECT TITLE & MINIMAL METADATA
            ========================================================================= */}
        <header className="py-12 sm:py-16 border-b border-[#DED6C6]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#74482A]">
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.client}</span>
              </div>

              <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[68px] text-[#141311] leading-[0.96] tracking-[-0.02em]">
                {project.showcaseTitle}
              </h1>

              <p className="text-base sm:text-lg text-[#4A4640] leading-[1.68] max-w-2xl pt-1">
                {project.excerpt}
              </p>
            </div>

            {/* Minimal Unboxed Metadata Column */}
            <dl className="lg:col-span-4 grid grid-cols-2 gap-y-5 gap-x-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#DED6C6] lg:pl-8">
              <div>
                <dt className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#6E685F] mb-1">
                  CLIENT
                </dt>
                <dd className="text-sm font-medium text-[#141311]">{project.client}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#6E685F] mb-1">
                  YEAR
                </dt>
                <dd className="text-sm font-mono-tabular text-[#141311]">{project.year}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#6E685F] mb-1">
                  DISCIPLINE &amp; SCOPE
                </dt>
                <dd className="text-sm text-[#4A4640]">{project.industry}</dd>
              </div>
            </dl>
          </div>

          {/* Verified External Links (if present in portfolio slide) */}
          {project.externalLinks && project.externalLinks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E8E0D2] flex flex-wrap items-center gap-6">
              <span className="text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#6E685F]">
                LIVE CAMPAIGN LINKS:
              </span>
              {project.externalLinks.map((ext, i) => (
                <a
                  key={i}
                  href={ext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs font-mono-tabular tracking-[0.14em] uppercase text-[#171614] hover:text-[#74482A] transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-[#C8BFA8] group-hover:decoration-[#74482A]">
                    {ext.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* =========================================================================
            2. LARGE HERO ARTWORK (Authentic Original Slide 01)
            ========================================================================= */}
        <section aria-label="Hero Project Artwork" className="py-10 sm:py-14 border-b border-[#DED6C6]">
          <div className="bg-[#F2ECE1] p-3 sm:p-6 border border-[#DED5C5]">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative w-full block overflow-hidden bg-[#EAE2D3] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
            >
              <img
                src={slides[0].src}
                alt={slides[0].title}
                className="w-full h-auto max-h-[760px] object-contain mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
              <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#171614]/85 text-[#FAF8F5] text-[10px] font-mono-tabular tracking-[0.18em] uppercase inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" />
                <span>Inspect Full Slide</span>
              </span>
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono-tabular tracking-[0.16em] uppercase text-[#6E685F]">
            <span>{slides[0].title}</span>
            <span>ORIGINAL PORTFOLIO PLATE</span>
          </div>
        </section>

        {/* =========================================================================
            3. THE BRIEF & THE IDEA (Asymmetric Editorial Spread, No Card Boxes)
            ========================================================================= */}
        <section
          aria-label="The Brief and The Idea"
          className="py-16 sm:py-24 border-b border-[#DED6C6] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* THE BRIEF */}
          <div className="lg:col-span-6 space-y-4">
            <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A]">
              01 / THE BRIEF
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#141311] leading-tight">
              What needed to be solved?
            </h2>
            <p className="text-base text-[#4A4640] leading-[1.75] pt-1">
              {project.challenge}
            </p>
            <p className="text-sm text-[#55524D] leading-[1.75]">
              {project.description}
            </p>
          </div>

          {/* THE IDEA */}
          <div className="lg:col-span-6 space-y-4 lg:pl-8 lg:border-l border-[#DED6C6]">
            <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A]">
              02 / THE IDEA
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#141311] leading-tight">
              What was the creative thinking?
            </h2>
            <p className="text-base text-[#4A4640] leading-[1.75] pt-1">
              {project.solution}
            </p>

            {project.copySpecimens[0] && (
              <blockquote className="pt-6 mt-6 border-t border-[#DED6C6]">
                <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#74482A] leading-snug mb-2">
                  &ldquo;{project.copySpecimens[0].headline}&rdquo;
                </p>
                <footer className="text-xs font-mono-tabular uppercase tracking-[0.16em] text-[#6E685F]">
                  {project.copySpecimens[0].context}
                </footer>
              </blockquote>
            )}
          </div>
        </section>

        {/* =========================================================================
            4. THE WORDS (Selected Copywriting Excerpts & Scripts from Portfolio)
            ========================================================================= */}
        {project.copySpecimens && project.copySpecimens.length > 0 && (
          <section
            aria-label="The Words — Copywriting Specimens"
            className="py-16 sm:py-24 border-b border-[#DED6C6]"
          >
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A] mb-2">
                  03 / THE WORDS
                </span>
                <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#141311] leading-tight">
                  Selected Copy &amp; Verbal Specimens
                </h2>
              </div>
              <span className="font-handwritten text-xl text-[#74482A]">
                &ldquo;Words written for real people.&rdquo;
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {project.copySpecimens.map((specimen, idx) => (
                <article
                  key={specimen.context + idx}
                  className="paper-mount p-6 sm:p-7 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#74482A] pb-3 border-b border-[#EAE2D3]">
                      <span>SPECIMEN 0{idx + 1}</span>
                      <span className="text-[#6E685F]">{specimen.context}</span>
                    </div>
                    <h3 className="font-serif-editorial italic text-2xl text-[#141311] leading-snug">
                      &ldquo;{specimen.headline}&rdquo;
                    </h3>
                    <p className="text-sm text-[#4A4640] leading-[1.7]">
                      {specimen.bodyCopy}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EAE2D3] text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#8C8478]">
                    ORIGINAL COPY DECK · {project.client}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            5. THE FINAL WORK (Curated Presentation Gallery of Original Slides)
            ========================================================================= */}
        <section aria-label="The Final Work Gallery" className="py-16 sm:py-24 border-b border-[#DED6C6]">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A] mb-2">
                04 / THE FINAL WORK
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#141311] leading-tight">
                Campaign Plates &amp; Visual Documentation
              </h2>
            </div>
            <span className="text-xs font-mono-tabular tracking-[0.16em] uppercase text-[#6E685F]">
              {slides.length} PRESENTATION PLATES
            </span>
          </div>

          {/* Art-Directed Slide Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {slides.map((slide, idx) => {
              const isFull = slide.layout === 'full' || slides.length <= 2;
              return (
                <figure
                  key={slide.src + idx}
                  className={isFull ? 'lg:col-span-12 space-y-3' : 'lg:col-span-6 space-y-3'}
                >
                  <div className="paper-mount p-3 sm:p-5">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative w-full block overflow-hidden bg-[#EAE2D3] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
                    >
                      <img
                        src={slide.src}
                        alt={slide.title}
                        loading="lazy"
                        className="w-full h-auto object-contain mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </button>
                  </div>
                  <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
                    <span className="text-xs font-mono-tabular tracking-[0.15em] uppercase text-[#141311]">
                      {slide.title}
                    </span>
                    <span className="text-xs text-[#55524D]">{slide.note}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            5. THE PROCESS (Unboxed Hairline Columns)
            ========================================================================= */}
        <section aria-label="The Process" className="py-16 sm:py-24 border-b border-[#DED6C6]">
          <div className="mb-12">
            <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A] mb-2">
              04 / THE PROCESS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#141311]">
              From Brief to Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {project.process.map((step) => (
              <div key={step.phase} className="pt-5 border-t border-[#C8BFA8] space-y-2.5">
                <span className="block text-[11px] font-mono-tabular tracking-[0.18em] uppercase text-[#74482A]">
                  {step.phase}
                </span>
                <h3 className="font-serif-editorial text-2xl text-[#141311] leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A4640] leading-[1.68]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. THE RESULT (Verified Outcomes & Capabilities)
            ========================================================================= */}
        <section
          aria-label="The Result"
          className="py-16 sm:py-24 border-b border-[#DED6C6] grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A] mb-2">
                05 / THE RESULT
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#141311]">
                Verified Outcomes &amp; Deliverables
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
              {project.results.map((metric) => (
                <div key={metric.label} className="pt-4 border-t border-[#DED6C6]">
                  <div className="font-serif-editorial text-3xl sm:text-4xl text-[#141311] mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono-tabular uppercase tracking-[0.15em] text-[#74482A] mb-1.5">
                    {metric.label}
                  </div>
                  <p className="text-xs text-[#55524D] leading-relaxed">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-10 lg:border-l border-[#DED6C6] space-y-6">
            <div>
              <span className="block text-[11px] font-mono-tabular tracking-[0.2em] uppercase text-[#6E685F] mb-3">
                CAPABILITIES APPLIED
              </span>
              <p className="text-sm text-[#141311] leading-loose">
                {project.tools.join('  ·  ')}
              </p>
            </div>

            <div className="pt-6 border-t border-[#DED6C6] space-y-4">
              <p className="font-serif-editorial italic text-2xl text-[#141311]">
                Interested in a similar {project.category.toLowerCase()} project?
              </p>
              <button
                type="button"
                onClick={() =>
                  onInquireWithContext(
                    project.category,
                    `Hello, I reviewed the "${project.showcaseTitle}" case study (${project.client}) and would like to discuss a ${project.category} project.`
                  )
                }
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#171614] text-[#FAF8F5] text-xs font-mono-tabular tracking-[0.18em] uppercase hover:bg-[#74482A] transition-colors cursor-pointer"
              >
                <span>START A CONVERSATION</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. NEXT PROJECT → (Editorial Footer Navigation)
            ========================================================================= */}
        <footer className="pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <span className="block text-[11px] font-mono-tabular tracking-[0.22em] uppercase text-[#74482A] mb-3">
              NEXT PROJECT
            </span>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject.slug)}
              className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
            >
              <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#141311] group-hover:text-[#74482A] transition-colors leading-none">
                {nextProject.showcaseTitle}
              </h2>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject.slug)}
            className="group inline-flex items-center gap-3 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#141311] hover:text-[#74482A] transition-colors cursor-pointer self-start sm:self-end"
          >
            <span className="underline underline-offset-8 decoration-[#C8BFA8] group-hover:decoration-[#74482A]">
              CONTINUE READING
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>
        </footer>
      </div>

      {/* =========================================================================
          FULLSCREEN SLIDE LIGHTBOX
          ========================================================================= */}
      {lightboxIndex !== null && slides[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Presentation Slide Viewer"
          className="fixed inset-0 z-50 bg-[#141311]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between text-xs font-mono-tabular tracking-[0.18em] uppercase text-[#E5DEC9]">
            <span>
              PLATE {lightboxIndex + 1} OF {slides.length} — {slides[lightboxIndex].title}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close slide viewer"
              className="p-2 text-[#FAF8F5] hover:text-[#D6A676] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex - 1 + slides.length) % slides.length)
                }
                aria-label="Previous slide"
                className="absolute left-2 sm:left-6 z-10 p-3 bg-[#171614]/80 border border-white/15 text-[#FAF8F5] hover:border-[#D6A676] cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <img
              src={slides[lightboxIndex].src}
              alt={slides[lightboxIndex].title}
              className="max-h-[82vh] max-w-full object-contain"
            />

            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % slides.length)}
                aria-label="Next slide"
                className="absolute right-2 sm:right-6 z-10 p-3 bg-[#171614]/80 border border-white/15 text-[#FAF8F5] hover:border-[#D6A676] cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="text-center text-xs text-[#C9C3B8]">
            {slides[lightboxIndex].note}
          </div>
        </div>
      )}
    </article>
  );
};

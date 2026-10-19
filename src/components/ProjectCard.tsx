import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectArtworkCanvas } from './EditorialArt';
import { EditorialImageReveal } from './PageTransition';

export type EditorialProjectVariant =
  | 'feature'
  | 'offset'
  | 'full-bleed'
  | 'editorial-column'
  | 'typography-spread'
  | 'featured-large'
  | 'dark-showcase'
  | 'default';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onSelectProject: (slug: string) => void;
  variant?: EditorialProjectVariant;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onSelectProject,
  variant = 'editorial-column'
}) => {
  const indexLabel = String(index + 1).padStart(2, '0');
  const selectedWritingSample =
    project.copySpecimens?.[0]?.headline || project.excerpt;

  // =========================================================================
  // PROJECT 01: Large Feature Spread (~65% Image Width + Overlapping Glass Caption)
  // =========================================================================
  if (variant === 'feature' || variant === 'featured-large') {
    return (
      <article className="group relative w-full pb-16 sm:pb-24 border-b border-[#DED6C6]">
        <button
          type="button"
          onClick={() => onSelectProject(project.slug)}
          className="w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
        >
          {/* Large Physical Photographic Mount (8 of 12 Columns) */}
          <div className="lg:col-span-8 relative">
            <div
              aria-hidden="true"
              className="hidden sm:block absolute inset-0 translate-x-2.5 translate-y-2.5 bg-[#EAE2D3] border border-[#D8CEBE] -rotate-[0.5deg] transition-transform duration-500 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
            />

            <div className="paper-mount relative z-10 p-3 sm:p-5 pb-4">
              <div className="relative">
                <EditorialImageReveal delayMs={(index % 4) * 80} className="w-full aspect-[16/10] bg-[#EAE2D3]">
                  <ProjectArtworkCanvas
                    artType={project.artType}
                    title={project.showcaseTitle}
                    subtitle={project.client}
                    className="w-full h-full project-image-zoom"
                  />
                </EditorialImageReveal>

                {/* Section 7: Subtle Liquid-Glass Refraction Strip on Lower Portion of Image */}
                <div
                  aria-hidden="true"
                  className="liquid-refraction-lens pointer-events-none absolute inset-x-0 bottom-0 h-16 z-20"
                />

                {/* Section 6: Floating Translucent Liquid-Glass Caption Overlapping Image Edge */}
                <div className="acrylic-glass-caption hidden sm:flex absolute -bottom-5 right-5 z-30 px-4 py-3 flex-col gap-0.5 min-w-[215px]">
                  <div className="flex items-center justify-between text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#74482A] font-semibold">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-0.5 text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#141311]">
                    <span>{project.client}</span>
                    <span className="inline-flex items-center gap-1 text-[#74482A]">
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-3 h-3 btn-editorial-arrow" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#6E685F]">
                <span>
                  PLATE {indexLabel} — {project.client}
                </span>
                <span className="font-handwritten text-base normal-case tracking-normal text-[#74482A] sm:pr-56">
                  Original campaign sheet
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Story & Copy Column (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-5 lg:pb-2">
            <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#6E685F]">
              <span className="text-[#74482A] font-semibold">{indexLabel}</span>
              <span aria-hidden="true">/</span>
              <span>{project.category}</span>
            </div>

            <h3 className="project-title-lift font-serif-editorial text-3xl sm:text-4xl lg:text-[44px] text-[#141311] leading-[1.0] tracking-tight">
              {project.showcaseTitle}
            </h3>

            <p className="text-sm sm:text-[15px] text-[#4A4640] leading-[1.7]">
              {project.excerpt}
            </p>

            {selectedWritingSample && (
              <div className="p-4 bg-[#FAF6EE] border-l-2 border-[#74482A]">
                <span className="block text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#74482A] mb-1">
                  SELECTED COPY LINE
                </span>
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#141311] leading-snug line-clamp-2">
                  &ldquo;{selectedWritingSample}&rdquo;
                </p>
              </div>
            )}

            <div className="pt-2">
              <span className="btn-glass-interactive px-5 py-2.5 text-[11px] font-mono-tabular tracking-[0.18em] uppercase">
                <span>VIEW PROJECT</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 btn-editorial-arrow text-[#74482A]"
                />
              </span>
            </div>
          </div>
        </button>
      </article>
    );
  }

  // =========================================================================
  // PROJECT 02: Offset Image Composition + Overlapping Liquid-Glass Caption
  // =========================================================================
  if (variant === 'offset') {
    return (
      <article className="group relative w-full pb-16 sm:pb-24 border-b border-[#DED6C6]">
        <button
          type="button"
          onClick={() => onSelectProject(project.slug)}
          className="w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
        >
          {/* Left Editorial Column (5 Columns) */}
          <div className="lg:col-span-5 lg:pr-6 order-2 lg:order-1 space-y-5">
            <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#6E685F]">
              <span className="text-[#74482A] font-semibold">{indexLabel}</span>
              <span aria-hidden="true">/</span>
              <span>{project.category}</span>
            </div>

            <h3 className="project-title-lift font-serif-editorial text-3xl sm:text-4xl lg:text-[42px] text-[#141311] leading-[1.02] tracking-tight">
              {project.showcaseTitle}
            </h3>

            <p className="text-sm sm:text-[15px] text-[#4A4640] leading-[1.7] max-w-[42ch]">
              {project.excerpt}
            </p>

            {selectedWritingSample && (
              <div className="pt-3 border-t border-[#DED5C5] max-w-[40ch]">
                <span className="block text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#74482A] mb-1">
                  SELECTED COPY EXCERPT
                </span>
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#141311] line-clamp-2">
                  &ldquo;{selectedWritingSample}&rdquo;
                </p>
              </div>
            )}

            <div className="pt-2">
              <span className="btn-glass-interactive px-5 py-2.5 text-[11px] font-mono-tabular tracking-[0.18em] uppercase">
                <span>VIEW PROJECT</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 btn-editorial-arrow text-[#74482A]"
                />
              </span>
            </div>
          </div>

          {/* Right Offset Physical Image Mount (7 Columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative lg:pl-6">
            <div className="paper-mount relative z-10 p-3 sm:p-5 pb-4 sm:rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-500">
              <div className="relative">
                <EditorialImageReveal delayMs={(index % 4) * 80} className="w-full aspect-[16/10] bg-[#EAE2D3]">
                  <ProjectArtworkCanvas
                    artType={project.artType}
                    title={project.showcaseTitle}
                    subtitle={project.client}
                    className="w-full h-full project-image-zoom"
                  />
                </EditorialImageReveal>

                {/* Subtle Refraction Layer */}
                <div
                  aria-hidden="true"
                  className="liquid-refraction-lens pointer-events-none absolute inset-x-0 bottom-0 h-14 z-20"
                />

                {/* Overlapping Translucent Liquid-Glass Caption */}
                <div className="acrylic-glass-caption hidden sm:flex absolute -bottom-4 left-5 z-30 px-4 py-2.5 flex-col gap-0.5 min-w-[205px]">
                  <div className="flex items-center justify-between text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#74482A] font-semibold">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#141311]">
                    <span>{project.client}</span>
                    <ArrowUpRight className="w-3 h-3 btn-editorial-arrow text-[#74482A]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#6E685F]">
                <span className="sm:pl-52">
                  FIG. {indexLabel} — {project.client}
                </span>
                <span className="font-handwritten text-base normal-case tracking-normal text-[#74482A]">
                  Brand narrative &amp; positioning
                </span>
              </div>
            </div>
          </div>
        </button>
      </article>
    );
  }

  // =========================================================================
  // PROJECT 03: Full-Width Campaign Composition + Floating Glass Caption
  // =========================================================================
  if (variant === 'full-bleed') {
    return (
      <article className="group relative w-full pb-16 sm:pb-24 border-b border-[#DED6C6]">
        <button
          type="button"
          onClick={() => onSelectProject(project.slug)}
          className="w-full text-left space-y-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
        >
          {/* Full-Width Physical Campaign Mount */}
          <div className="paper-mount relative w-full p-3 sm:p-6 pb-4">
            <div className="relative">
              <EditorialImageReveal delayMs={(index % 4) * 80} className="w-full aspect-[16/9] sm:aspect-[20/10] bg-[#EAE2D3]">
                <ProjectArtworkCanvas
                  artType={project.artType}
                  title={project.showcaseTitle}
                  subtitle={project.client}
                  className="w-full h-full project-image-zoom"
                />
              </EditorialImageReveal>

              {/* Subtle Liquid Refraction Lens */}
              <div
                aria-hidden="true"
                className="liquid-refraction-lens pointer-events-none absolute inset-x-0 bottom-0 h-16 z-20"
              />

              {/* Floating Glass Metadata Caption */}
              <div className="acrylic-glass-caption hidden sm:flex absolute -bottom-5 right-6 z-30 px-4 py-3 flex-col gap-0.5 min-w-[230px]">
                <div className="flex items-center justify-between text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#74482A] font-semibold">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#141311]">
                  <span>{project.client}</span>
                  <span className="inline-flex items-center gap-1 text-[#74482A]">
                    <span>DIRECTION</span>
                    <ArrowUpRight className="w-3 h-3 btn-editorial-arrow" />
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3.5 flex items-center justify-between text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#6E685F]">
              <span>
                FULL-SPREAD CAMPAIGN PLATE {indexLabel} — {project.client}
              </span>
              <span className="font-handwritten text-base normal-case tracking-normal text-[#74482A] sm:pr-60">
                Words that move people
              </span>
            </div>
          </div>

          {/* Editorial Caption Spread Below Full-Width Plate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-baseline pt-2">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#6E685F] mb-2">
                <span className="text-[#74482A] font-semibold">{indexLabel}</span>
                <span aria-hidden="true">/</span>
                <span>{project.category}</span>
              </div>
              <h3 className="project-title-lift font-serif-editorial text-3xl sm:text-4xl text-[#141311] leading-tight">
                {project.showcaseTitle}
              </h3>
            </div>

            <div className="lg:col-span-5 space-y-2">
              <p className="text-sm sm:text-[15px] text-[#4A4640] leading-[1.7]">
                {project.excerpt}
              </p>
              {selectedWritingSample && (
                <p className="font-serif-editorial italic text-base text-[#74482A] line-clamp-1">
                  &ldquo;{selectedWritingSample}&rdquo;
                </p>
              )}
            </div>

            <div className="lg:col-span-3 lg:text-right pt-2 lg:pt-0">
              <span className="btn-glass-interactive px-5 py-2.5 text-[11px] font-mono-tabular tracking-[0.18em] uppercase">
                <span>VIEW PROJECT</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 btn-editorial-arrow text-[#74482A]"
                />
              </span>
            </div>
          </div>
        </button>
      </article>
    );
  }

  // =========================================================================
  // PROJECT 05: Large Typography + Supporting Artwork Spread
  // =========================================================================
  if (variant === 'typography-spread') {
    return (
      <article className="group relative w-full pb-16 sm:pb-24 border-b border-[#DED6C6]">
        <button
          type="button"
          onClick={() => onSelectProject(project.slug)}
          className="w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
        >
          {/* Left 7 Columns: Oversized Editorial Pull-Quote + Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#6E685F]">
              <span className="text-[#74482A] font-semibold">{indexLabel}</span>
              <span aria-hidden="true">/</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>TYPOGRAPHIC SPREAD</span>
            </div>

            <blockquote className="font-serif-editorial italic text-3xl sm:text-5xl lg:text-[52px] text-[#141311] leading-[1.04] tracking-tight">
              &ldquo;{selectedWritingSample || project.showcaseTitle}&rdquo;
            </blockquote>

            <div className="pt-4 border-t border-[#DED5C5] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <h3 className="project-title-lift font-serif-editorial text-2xl sm:text-3xl text-[#141311]">
                  {project.showcaseTitle}
                </h3>
                <p className="text-sm text-[#4A4640] leading-[1.68]">
                  {project.excerpt}
                </p>
              </div>

              <span className="btn-glass-interactive px-5 py-2.5 text-[11px] font-mono-tabular tracking-[0.18em] uppercase shrink-0">
                <span>VIEW PROJECT</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 btn-editorial-arrow text-[#74482A]"
                />
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Supporting Physical Artwork Mount + Floating Glass Label */}
          <div className="lg:col-span-5 relative">
            <div className="paper-mount relative p-3 sm:p-4 pb-3.5 sm:-rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <div className="relative">
                <EditorialImageReveal delayMs={(index % 4) * 80} className="w-full aspect-[4/3] bg-[#EAE2D3]">
                  <ProjectArtworkCanvas
                    artType={project.artType}
                    title={project.showcaseTitle}
                    subtitle={project.client}
                    className="w-full h-full project-image-zoom"
                  />
                </EditorialImageReveal>

                <div className="acrylic-glass-caption absolute -bottom-3 right-3 z-30 px-3.5 py-2 flex items-center gap-3 text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#141311]">
                  <span className="text-[#74482A] font-semibold">{project.year}</span>
                  <span>·</span>
                  <span>{project.client}</span>
                  <ArrowUpRight className="w-3 h-3 btn-editorial-arrow text-[#74482A]" />
                </div>
              </div>

              <div className="pt-2.5 flex items-center justify-between text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#6E685F]">
                <span>ARCHIVE PLATE {indexLabel}</span>
                <span className="font-handwritten text-sm normal-case text-[#74482A] pr-28">
                  {project.category}
                </span>
              </div>
            </div>
          </div>
        </button>
      </article>
    );
  }

  // =========================================================================
  // PROJECT 04: Two-Image Editorial Spread Column Item + Floating Glass Caption
  // =========================================================================
  return (
    <article className="group flex flex-col justify-between">
      <button
        type="button"
        onClick={() => onSelectProject(project.slug)}
        className="w-full text-left flex flex-col space-y-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
      >
        {/* Physical Paper Artwork Mount + Overlapping Glass Caption */}
        <div className="paper-mount relative w-full p-3 sm:p-4 pb-3.5">
          <div className="relative">
            <EditorialImageReveal delayMs={(index % 4) * 80} className="w-full aspect-[16/10] bg-[#EAE2D3]">
              <ProjectArtworkCanvas
                artType={project.artType}
                title={project.showcaseTitle}
                subtitle={project.client}
                className="w-full h-full project-image-zoom"
              />
            </EditorialImageReveal>

            <div
              aria-hidden="true"
              className="liquid-refraction-lens pointer-events-none absolute inset-x-0 bottom-0 h-12 z-20"
            />

            <div className="acrylic-glass-caption absolute -bottom-3.5 right-3.5 z-30 px-3.5 py-2 flex items-center gap-2.5 text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#141311]">
              <span className="text-[#74482A] font-semibold">{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
              <ArrowUpRight className="w-3 h-3 btn-editorial-arrow text-[#74482A]" />
            </div>
          </div>

          <div className="pt-2.5 flex items-center justify-between text-[9px] font-mono-tabular tracking-[0.18em] uppercase text-[#6E685F]">
            <span>
              PLATE {indexLabel} — {project.client}
            </span>
          </div>
        </div>

        {/* Unboxed Editorial Typography */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.22em] uppercase text-[#6E685F]">
            <span className="text-[#74482A] font-semibold">{indexLabel}</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
          </div>

          <h3 className="project-title-lift font-serif-editorial text-2xl sm:text-3xl text-[#141311] leading-snug">
            {project.showcaseTitle}
          </h3>

          <p className="text-sm text-[#4A4640] leading-[1.68] line-clamp-2 max-w-[54ch]">
            {project.excerpt}
          </p>

          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#141311] group-hover:text-[#74482A] transition-colors">
              <span className="underline underline-offset-8 decoration-[#C8BFA8] group-hover:decoration-[#74482A]">
                VIEW PROJECT
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="w-3.5 h-3.5 btn-editorial-arrow"
              />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
};

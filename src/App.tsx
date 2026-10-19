import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';

import {
  PROJECTS_DATA,
  PORTFOLIO_CATEGORIES,
  ProjectCategory,
  DESIGNER_PROFILE
} from './data/portfolioData';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectCard } from './components/ProjectCard';
import { ProjectFilter } from './components/ProjectFilter';
import { ProjectDetail } from './components/ProjectDetail';
import { BooksSection } from './components/BooksSection';
import { WritingStudioSection } from './components/WritingStudioSection';
import { Services } from './components/Services';
import { ResumeCV } from './components/ResumeCV';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import {
  PageTransition,
  ScrollProgressAndCursor,
  SmoothReveal
} from './components/PageTransition';
import { NotFound } from './components/NotFound';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const initialPath = window.location.pathname || '/';
    return initialPath === '/about' ? '/' : initialPath;
  });

  // Homepage Selected Work Filter State
  const [homeWorkCategory, setHomeWorkCategory] = useState<'All' | ProjectCategory>('All');

  // Full Portfolio Archive Filter State
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Contact form prefill state when navigating from Services or Project Detail
  const [contactPrefill, setContactPrefill] = useState<{
    projectType: string;
    budget: string;
    message: string;
  }>({
    projectType: '',
    budget: '',
    message: ''
  });

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || '/';
      if (nextPath === '/about') {
        setCurrentPath('/');
        window.setTimeout(() => {
          document.getElementById('about-preview')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }
      setCurrentPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = (path: string) => {
    if (path === '/about' || path === '/#about') {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        window.setTimeout(() => {
          document.getElementById('about-preview')?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById('about-preview')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path === '/#books') {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        window.setTimeout(() => {
          document.getElementById('books-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById('books-section')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update document title dynamically based on route
  useEffect(() => {
    if (currentPath === '/') {
      document.title = `${DESIGNER_PROFILE.name} — Copywriter, Content Strategist & Published Author`;
    } else if (currentPath === '/portfolio') {
      document.title = `Selected Work & Case Studies — ${DESIGNER_PROFILE.name}`;
    } else if (currentPath.startsWith('/portfolio/')) {
      const slug = currentPath.replace('/portfolio/', '');
      const proj = PROJECTS_DATA.find((p) => p.slug === slug);
      document.title = proj
        ? `${proj.showcaseTitle} — Case Study | ${DESIGNER_PROFILE.name}`
        : `Project Not Found | ${DESIGNER_PROFILE.name}`;
    } else if (currentPath === '/services') {
      document.title = `Services & Capabilities — ${DESIGNER_PROFILE.name}`;
    } else if (currentPath === '/resume') {
      document.title = `Resume / CV — ${DESIGNER_PROFILE.name}`;
    } else if (currentPath === '/contact') {
      document.title = `Contact & Project Inquiry — ${DESIGNER_PROFILE.name}`;
    } else {
      document.title = `404 Page Not Found — ${DESIGNER_PROFILE.name}`;
    }
  }, [currentPath]);

  // Filtered Projects for Homepage Selected Work
  const homeSelectedProjects = useMemo(() => {
    if (homeWorkCategory === 'All') {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter((p) => p.category === homeWorkCategory);
  }, [homeWorkCategory]);

  // Filtered Projects for Full Portfolio Archive Page
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.showcaseTitle.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.industry.toLowerCase().includes(q) ||
        project.excerpt.toLowerCase().includes(q) ||
        project.tools.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectServicePackage = (service: {
    projectTypeKey: string;
    investmentRange: string;
    title: string;
  }) => {
    setContactPrefill({
      projectType: service.projectTypeKey,
      budget: service.investmentRange,
      message: `Hello Tanishq, I’m interested in your "${service.title}" offering (${service.investmentRange}) and would like to discuss timelines and scope.`
    });
    if (currentPath === '/') {
      scrollToSection('contact-section');
    } else {
      navigate('/contact');
    }
  };

  const handleInquireFromProject = (category: string, messagePrefill: string) => {
    setContactPrefill({
      projectType:
        category === 'Branding'
          ? 'Brand Storytelling & Strategy'
          : category === 'Packaging'
          ? 'Packaging & Product Copy'
          : category === 'Social Media'
          ? 'Social Media & Content Strategy'
          : category === 'Advertising'
          ? 'Advertising & Campaign Copy'
          : 'Brand Storytelling & Strategy',
      budget: '$3,000 – $5,000',
      message: messagePrefill
    });
    navigate('/contact');
  };

  const renderCurrentView = () => {
    if (currentPath === '/') {
      const p1 = homeSelectedProjects[0];
      const p2 = homeSelectedProjects[1];
      const p3 = homeSelectedProjects[2];
      const p4 = homeSelectedProjects[3];
      const p5 = homeSelectedProjects[4];
      const p6 = homeSelectedProjects[5];

      return (
        <>
          {/* =========================================================================
              1. LITERARY MAGAZINE COVER HERO (Warm Ivory Surface)
              ========================================================================= */}
          <Hero onNavigate={navigate} onScrollToSection={scrollToSection} />

          {/* =========================================================================
              2. ABOUT THE WRITER (Tactile Cream Paper Spread)
              ========================================================================= */}
          <div className="surface-about">
            <AboutSection
              onViewWork={() => {
                const el = document.getElementById('selected-work');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/portfolio');
                }
              }}
            />
          </div>

          {/* =========================================================================
              3. SELECTED WORK — CURATED EDITORIAL MAGAZINE GALLERY (Parchment Surface)
              ========================================================================= */}
          <section
            id="selected-work"
            aria-label="03 / Selected Work Showcase"
            className="surface-work relative w-full py-20 sm:py-28 text-[#141311] border-b border-[#DED6C6]"
          >
            <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
              <SmoothReveal>
                {/* Dramatic Scale Editorial Section Header (Section 5) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#DED6C6] mb-12">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
                      <span>03 / SELECTED WORK</span>
                      <span aria-hidden="true" className="w-6 h-[1px] bg-[#C8BFA8]" />
                      <span className="text-[#6E685F]">PORTFOLIO INDEX</span>
                    </div>

                    <h2 className="font-serif-editorial text-5xl sm:text-6xl lg:text-[74px] text-[#141311] leading-[0.92] tracking-[-0.025em]">
                      <span className="block">WORDS</span>
                      <span className="block">
                        THAT{' '}
                        <span className="italic font-normal text-[#74482A]">
                          MOVE
                        </span>
                      </span>
                      <span className="block">PEOPLE.</span>
                    </h2>
                  </div>

                  <div className="lg:col-span-5 flex flex-col lg:items-end justify-between space-y-4">
                    <p className="text-sm sm:text-base text-[#4A4640] leading-[1.7] max-w-md lg:text-right">
                      Words that do more than fill space. A curated exhibition of
                      ad campaigns, brand narratives, social copy, and packaging
                      stories.
                    </p>
                    <span className="font-handwritten text-xl text-[#74482A]">
                      &ldquo;Every project begins with a human truth.&rdquo;
                    </span>
                  </div>
                </div>

                {/* Quiet Unboxed Discipline Filter Row */}
                <div className="mb-16 flex flex-wrap items-center justify-between gap-4">
                  <div
                    role="tablist"
                    aria-label="Filter selected works by discipline"
                    className="flex flex-wrap items-center gap-x-7 gap-y-2"
                  >
                    {PORTFOLIO_CATEGORIES.map((cat) => {
                      const active = homeWorkCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setHomeWorkCategory(cat)}
                          className={`relative py-1 text-xs font-mono-tabular tracking-[0.2em] uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A] ${
                            active
                              ? 'text-[#141311] font-semibold'
                              : 'text-[#6E685F] hover:text-[#141311]'
                          }`}
                        >
                          <span>{cat}</span>
                          <span
                            aria-hidden="true"
                            className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#74482A] transition-transform duration-300 origin-left ${
                              active ? 'scale-x-100' : 'scale-x-0'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/portfolio')}
                    className="group inline-flex items-center gap-2 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#141311] hover:text-[#74482A] transition-colors cursor-pointer"
                  >
                    <span className="underline underline-offset-8 decoration-[#C8BFA8] group-hover:decoration-[#74482A]">
                      FULL ARCHIVE ({PROJECTS_DATA.length} WORKS)
                    </span>
                    <ArrowUpRight className="w-4 h-4 btn-editorial-arrow" />
                  </button>
                </div>

                {/* Curated Magazine Spreads (Project 01..06) */}
                <div className="space-y-16 sm:space-y-24">
                  {/* PROJECT 01: Large Feature Project (~65% Image Width) */}
                  {p1 && (
                    <ProjectCard
                      project={p1}
                      index={0}
                      variant="feature"
                      onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                    />
                  )}

                  {/* PROJECT 02: Offset Image Composition */}
                  {p2 && (
                    <ProjectCard
                      project={p2}
                      index={1}
                      variant="offset"
                      onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                    />
                  )}

                  {/* PROJECT 03: Full-Width Campaign Composition */}
                  {p3 && (
                    <ProjectCard
                      project={p3}
                      index={2}
                      variant="full-bleed"
                      onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                    />
                  )}

                  {/* PROJECT 04 & PROJECT 05: Two-Image Asymmetrical Editorial Spread */}
                  {(p4 || p5) && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-16 sm:pb-24 border-b border-[#DED6C6]">
                      {p4 && (
                        <div className="lg:col-span-7">
                          <ProjectCard
                            project={p4}
                            index={3}
                            variant="editorial-column"
                            onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                          />
                        </div>
                      )}
                      {p5 && (
                        <div className="lg:col-span-5 lg:mt-16">
                          <ProjectCard
                            project={p5}
                            index={4}
                            variant="editorial-column"
                            onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* PROJECT 06: Large Typography + Supporting Artwork Spread */}
                  {p6 && (
                    <ProjectCard
                      project={p6}
                      index={5}
                      variant="typography-spread"
                      onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                    />
                  )}
                </div>

                {/* Bottom Archive Footer Row */}
                <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[11px] font-mono-tabular text-[#6E685F] uppercase tracking-[0.2em]">
                    CURATED EXHIBITION — {Math.min(6, homeSelectedProjects.length)} OF{' '}
                    {PROJECTS_DATA.length} CASE STUDIES
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('/portfolio')}
                    className="btn-editorial-primary px-7 py-4 text-xs font-mono-tabular tracking-[0.2em] uppercase cursor-pointer"
                  >
                    <span>EXPLORE ALL {PROJECTS_DATA.length} PROJECTS</span>
                    <ArrowUpRight className="w-4 h-4 btn-editorial-arrow" />
                  </button>
                </div>
              </SmoothReveal>
            </div>
          </section>

          {/* =========================================================================
              4. PUBLISHED BOOKS — PHYSICAL BOOKSHELF SPREAD
              ========================================================================= */}
          <SmoothReveal>
            <BooksSection />
          </SmoothReveal>

          {/* =========================================================================
              5. WRITING PHILOSOPHY, 4-STEP PROCESS & "WHEN I'M NOT WRITING..."
              ========================================================================= */}
          <SmoothReveal>
            <WritingStudioSection />
          </SmoothReveal>

          {/* =========================================================================
              6. SERVICES & CAPABILITIES
              ========================================================================= */}
          <SmoothReveal>
            <Services onSelectServiceForInquiry={handleSelectServicePackage} />
          </SmoothReveal>

          {/* =========================================================================
              7. CLOSING MAGAZINE SPREAD — CONTACT & PROJECT INQUIRY
              ========================================================================= */}
          <SmoothReveal>
            <ContactForm
              initialProjectType={contactPrefill.projectType}
              initialBudget={contactPrefill.budget}
              initialMessage={contactPrefill.message}
              onViewWork={() => scrollToSection('selected-work')}
            />
          </SmoothReveal>
        </>
      );
    }

    if (currentPath === '/portfolio') {
      return (
        <section
          aria-label="Portfolio Case Studies Archive"
          className="surface-work w-full pt-28 sm:pt-36 pb-20"
        >
          <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <header className="pb-12 border-b border-[#DED6C6] mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-3">
                <span className="block font-mono-tabular text-[11px] uppercase tracking-[0.24em] text-[#74482A]">
                  PORTFOLIO ARCHIVE / {PROJECTS_DATA.length} CASE STUDIES
                </span>
                <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl text-[#141311] leading-[0.94] tracking-tight">
                  Words That Move People.
                </h1>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed">
                  Campaigns, brand narratives, social copy, packaging stories,
                  and editorial documentation.
                </p>
              </div>
            </header>

            <ProjectFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={PROJECTS_DATA.length}
              filteredCount={filteredProjects.length}
            />

            {filteredProjects.length === 0 ? (
              <div className="py-16 border-t border-b border-[#DED6C6] text-center space-y-4">
                <h2 className="font-serif-editorial text-3xl text-[#141311]">
                  No matching projects found
                </h2>
                <p className="text-sm text-[#55524D] max-w-md mx-auto">
                  Try clearing your search query or selecting another discipline.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="btn-editorial-primary px-6 py-3 text-xs font-mono-tabular tracking-[0.18em] uppercase cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-16 sm:space-y-24">
                {filteredProjects.map((project, index) => {
                  const variantPattern =
                    index % 4 === 0
                      ? 'feature'
                      : index % 4 === 1
                      ? 'offset'
                      : index % 4 === 2
                      ? 'full-bleed'
                      : 'typography-spread';
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      variant={variantPattern}
                      onSelectProject={(slug) => navigate(`/portfolio/${slug}`)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      );
    }

    if (currentPath.startsWith('/portfolio/')) {
      const slug = currentPath.replace('/portfolio/', '');
      const project = PROJECTS_DATA.find((p) => p.slug === slug);

      if (!project) {
        return (
          <NotFound
            onNavigateHome={() => navigate('/')}
            onNavigatePortfolio={() => navigate('/portfolio')}
          />
        );
      }

      return (
        <ProjectDetail
          project={project}
          onBack={() => navigate('/portfolio')}
          onSelectProject={(nextSlug) => navigate(`/portfolio/${nextSlug}`)}
          onInquireWithContext={handleInquireFromProject}
        />
      );
    }

    if (currentPath === '/services') {
      return (
        <div className="w-full pt-20 sm:pt-24">
          <Services onSelectServiceForInquiry={handleSelectServicePackage} />
          <WritingStudioSection />
          <BooksSection />
          <ContactForm
            initialProjectType={contactPrefill.projectType}
            initialBudget={contactPrefill.budget}
            initialMessage={contactPrefill.message}
            onViewWork={() => navigate('/portfolio')}
          />
        </div>
      );
    }

    if (currentPath === '/resume') {
      return (
        <div className="w-full pt-20 sm:pt-24">
          <ResumeCV onNavigate={navigate} />
        </div>
      );
    }

    if (currentPath === '/contact') {
      return (
        <div className="w-full pt-20 sm:pt-24">
          <ContactForm
            initialProjectType={contactPrefill.projectType}
            initialBudget={contactPrefill.budget}
            initialMessage={contactPrefill.message}
            onViewWork={() => navigate('/portfolio')}
          />
        </div>
      );
    }

    return (
      <NotFound
        onNavigateHome={() => navigate('/')}
        onNavigatePortfolio={() => navigate('/portfolio')}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#141311] selection:bg-[#74482A] selection:text-[#FAF8F4] overflow-x-hidden">
      {/* Subtle Top Reading Progress Line */}
      <ScrollProgressAndCursor />

      {/* Editorial Navigation Header */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigate}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content with Subtle Route Transition */}
      <main id="main-content" className="flex-1">
        <PageTransition routeKey={currentPath}>{renderCurrentView()}</PageTransition>
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;

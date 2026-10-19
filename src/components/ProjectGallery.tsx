import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Project, ProjectCategory } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface ProjectGalleryProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onResetFilters: () => void;
  selectedCategory: 'All' | ProjectCategory;
  searchQuery: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  onSelectProject,
  onResetFilters,
  selectedCategory,
  searchQuery
}) => {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl bg-[#FFFDF9] border border-[#E2D9C8] p-12 text-center max-w-xl mx-auto my-8">
        <p className="font-mono-tabular text-xs text-[#8C5E3C] tracking-widest uppercase mb-2">
          NO MATCHING ARCHIVE ENTRY
        </p>
        <h3 className="font-serif-editorial font-bold text-2xl sm:text-3xl text-[#1C1613] mb-3">
          No case studies match &ldquo;{searchQuery || selectedCategory}&rdquo;
        </h3>
        <p className="text-sm text-[#5C534B] leading-relaxed mb-6">
          Try clearing your search filter or exploring all seven creative disciplines in Tanishq Sharma&rsquo;s portfolio.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-[#FAF6F0] bg-[#1C1613] rounded-lg hover:bg-[#332822] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
};

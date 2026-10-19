import React from 'react';
import { Search, X } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, ProjectCategory } from '../data/portfolioData';

interface ProjectFilterProps {
  selectedCategory: 'All' | ProjectCategory;
  onSelectCategory: (category: 'All' | ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
  filteredCount: number;
  categoryCounts?: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount
}) => {
  return (
    <div className="mb-12 space-y-5">
      <div className="pb-4 border-b border-[#DED6C6] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Clean Editorial Category Links */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap items-center gap-x-6 gap-y-2.5"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(cat)}
                className={`relative py-1 text-xs font-mono-tabular tracking-[0.18em] uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A] ${
                  active
                    ? 'text-[#171614] font-semibold'
                    : 'text-[#6E685F] hover:text-[#171614]'
                }`}
              >
                <span>{cat}</span>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#74482A] transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Minimal Editorial Search Input */}
        <div className="relative w-full lg:w-64">
          <Search className="w-3.5 h-3.5 text-[#6E685F] absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full pl-6 pr-6 py-1.5 text-xs bg-transparent border-b border-[#C8BFA8] text-[#171614] placeholder-[#7D756B] focus:outline-none focus:border-[#171614] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6E685F] hover:text-[#171614] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#6E685F]">
        <span>
          SHOWING {filteredCount} OF {totalCount} WORKS
        </span>
        {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="text-[#74482A] hover:text-[#171614] underline underline-offset-4 transition-colors cursor-pointer"
          >
            Reset filter
          </button>
        )}
      </div>
    </div>
  );
};

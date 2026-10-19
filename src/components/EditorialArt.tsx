import React, { useState, useRef } from 'react';
import {
  ImagePlus,
  Upload,
  Trash2,
  Maximize2,
  Feather,
  RotateCw,
  ArrowUpRight
} from 'lucide-react';
import { GallerySlide, DESIGNER_PROFILE } from '../data/portfolioData';

interface HeroPortraitStageProps {
  mouseOffset: { x: number; y: number };
  scrollOffset?: number;
  onSelectProjectSlug: (slug: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onNavigate?: (path: string) => void;
  onScrollToBooks?: () => void;
}

const HERO_IMAGE_STORAGE_KEY = 'editorial_hero_custom_image_v1';
const HERO_IMAGE_FIT_STORAGE_KEY = 'editorial_hero_custom_image_fit_v1';
const DEFAULT_WRITER_PORTRAIT = '/assets/MAHVoz-Qrh0.png';

/**
 * Section 3: Interactive Hybrid ID Card (PAPER + GLASS + PRINT)
 * - Front: Editorial Paper + Transparent Warm Liquid Glass + Print Metadata
 *   (NAME, COPYWRITER / CONTENT WRITER, ID 001, LOCATION, AVAILABLE FOR SELECT PROJECTS)
 * - Hover: Tilts smoothly toward cursor (clamped to X: ±6°, Y: ±8°), moving glass reflection,
 *   subtle liquid distortion, image magnification, 1–2px typography shift.
 * - Click / Tap: Flips 180° to a Dark Translucent Glass Dossier back surface.
 */
export const CinematicWriterDeskHero: React.FC<HeroPortraitStageProps> = ({
  mouseOffset,
  scrollOffset = 0,
  onScrollToSection
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 35 });

  const [portraitSrc, setPortraitSrc] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
      if (saved === '__REMOVED__') return null;
      return saved || DEFAULT_WRITER_PORTRAIT;
    } catch {
      return DEFAULT_WRITER_PORTRAIT;
    }
  });

  const [imageFit, setImageFit] = useState<'cover' | 'contain'>(() => {
    try {
      const saved = localStorage.getItem(HERO_IMAGE_FIT_STORAGE_KEY);
      return saved === 'cover' ? 'cover' : 'contain';
    } catch {
      return 'contain';
    }
  });

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const nx = (relX - 0.5) * 2; // -1 to 1
    const ny = (relY - 0.5) * 2; // -1 to 1

    // Strictly clamp tilt to X: ±6°, Y: ±8°
    const clampedRotateX = Math.max(-6, Math.min(6, -ny * 6));
    const clampedRotateY = Math.max(-8, Math.min(8, nx * 8));

    setCardTilt({
      rotateX: clampedRotateX,
      rotateY: clampedRotateY,
      glareX: Math.round(relX * 100),
      glareY: Math.round(relY * 100)
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 35 });
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : null;
      if (dataUrl) {
        setPortraitSrc(dataUrl);
        try {
          localStorage.setItem(HERO_IMAGE_STORAGE_KEY, dataUrl);
        } catch {
          // Ignore storage quota errors for very large files
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPortraitSrc(null);
    try {
      localStorage.setItem(HERO_IMAGE_STORAGE_KEY, '__REMOVED__');
    } catch {
      // Ignore storage errors
    }
  };

  const handleRestoreDefaultPortrait = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPortraitSrc(DEFAULT_WRITER_PORTRAIT);
    try {
      localStorage.removeItem(HERO_IMAGE_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleToggleFit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextFit = imageFit === 'cover' ? 'contain' : 'cover';
    setImageFit(nextFit);
    try {
      localStorage.setItem(HERO_IMAGE_FIT_STORAGE_KEY, nextFit);
    } catch {
      // Ignore storage errors
    }
  };

  const px = mouseOffset.x;
  const py = mouseOffset.y;

  return (
    <div className="relative w-full py-4 sm:py-6 flex items-center justify-center lg:justify-end select-none">
      <div
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="perspective-stage relative w-full max-w-[475px] xl:max-w-[510px] 2xl:max-w-[540px]"
      >
        {/* Hidden File Input for Image Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload writer portrait image"
        />

        {/* Editorial Crop Marks (Top-Left & Bottom-Right) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute -top-3 -left-3 w-4 h-4 border-t border-l border-[#9C8E7B]"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute -bottom-3 -right-3 w-4 h-4 border-b border-r border-[#9C8E7B]"
        />

        {/* Subtle Offset Editorial Paper Backing Sheet */}
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${px * -3}px, ${py * -2}px, 0) rotate(1.8deg)`
          }}
          className="absolute inset-0 translate-x-3 translate-y-3 bg-[#EAE2D3] border border-[#D8CFC0] transition-transform duration-500 ease-out"
        />

        {/* Supporting Studio Detail #1: Published Book Polaroid Peeking from Bottom-Left */}
        <div
          style={{
            transform: `translate3d(${px * -5}px, ${py * 3 - scrollOffset * 0.018}px, 0) rotate(-4deg)`
          }}
          onClick={() => onScrollToSection('books-section')}
          className="hidden sm:block absolute -left-11 bottom-12 z-10 w-32 bg-[#FFFDF9] p-2 pb-3.5 border border-[#D8CFC0] shadow-[0_18px_34px_-10px_rgba(23,22,20,0.22)] transition-transform duration-500 ease-out cursor-pointer hover:z-30 hover:scale-[1.03]"
          title="Explore Published Books"
        >
          <div className="w-full h-36 overflow-hidden bg-[#221F1D]">
            <img
              src="/assets/MAHWM02S4Jg.png"
              alt="Published Book — Happy With My Heartbreak"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="pt-1.5 font-handwritten text-xs text-[#2B241E] text-center leading-none">
            Published Author · 2024
          </p>
        </div>

        {/* Supporting Studio Detail #2: Handwritten Note (Upper Right) */}
        <div
          style={{
            transform: `translate3d(${px * 4}px, ${py * -3}px, 0) rotate(2.5deg)`
          }}
          className="absolute -top-5 right-3 sm:right-5 z-30 w-40 sm:w-44 bg-[#F7F1E3] p-3 border border-[#DFD5C2] shadow-[0_14px_28px_-8px_rgba(23,22,20,0.18)] transition-transform duration-500 ease-out pointer-events-none"
        >
          <div
            aria-hidden="true"
            className="archival-tape absolute -top-2 left-1/2 -translate-x-1/2 w-11 h-3 -rotate-1"
          />
          <p className="font-handwritten text-lg sm:text-xl text-[#2B241E] leading-[1.12]">
            &ldquo;Good words.
            <br />
            <span className="text-[#74482A]">Create better stories.&rdquo;</span>
          </p>
        </div>

        {/* =========================================================================
            HYBRID ID CARD 3D STAGE (Tilts ±6°/±8° on Hover + Flips 180° on Click)
            ========================================================================= */}
        <div
          style={{
            transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${
              (isFlipped ? 180 : 0) + cardTilt.rotateY
            }deg)`
          }}
          className="preserve-3d relative z-20 w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* =====================================================================
              FRONT OF HYBRID ID CARD: PAPER + TRANSPARENT LIQUID GLASS + PRINT
              ===================================================================== */}
          <figure
            onClick={() => setIsFlipped(true)}
            className="backface-hidden group relative bg-[#FFFDF9]/95 backdrop-blur-[2px] p-3.5 sm:p-4 pb-5 border border-[#DED5C5] shadow-[0_28px_60px_-12px_rgba(23,22,20,0.22),0_12px_24px_-8px_rgba(116,72,42,0.12)] cursor-pointer overflow-hidden"
          >
            {/* Cursor-Following Specular Glass Reflection Across Card Surface */}
            <div
              aria-hidden="true"
              style={{
                background: `radial-gradient(280px circle at ${cardTilt.glareX}% ${cardTilt.glareY}%, rgba(255, 255, 255, 0.52), transparent 72%)`
              }}
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            />

            {/* Top Hybrid Liquid-Glass Header Strip Inside ID Card */}
            <div className="acrylic-glass relative z-20 px-3.5 py-2.5 mb-3 flex items-center justify-between gap-2 text-[9px] font-mono-tabular uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2 text-[#141311] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B40]" />
                <span>ID 001</span>
                <span aria-hidden="true" className="text-[#9C8E7B]">
                  ·
                </span>
                <span className="text-[#74482A]">PRESS &amp; CREATIVE PASS</span>
              </div>
              <span className="text-[#55524D] hidden sm:inline">
                AVAILABLE FOR SELECT PROJECTS
              </span>
            </div>

            {/* Portrait Framed Inside Glass-Like Window */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDrop}
              className={`relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-gradient-to-b from-[#DFC5A2] via-[#C9A072] to-[#A6784B] border border-white/70 shadow-[inset_0_2px_18px_rgba(23,22,20,0.16)] transition-all duration-300 ${
                isDraggingOver ? 'ring-2 ring-[#171614] ring-inset' : ''
              }`}
            >
              {/* Warm Window-Blind Light Streaks with Subtle Depth-of-Field Blur */}
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-105 blur-[3px] drop-shadow-[0_16px_28px_rgba(23,22,20,0.22)] bg-[linear-gradient(120deg,rgba(38,24,12,0.22)_0%,rgba(38,24,12,0.22)_14%,transparent_15%,transparent_30%,rgba(38,24,12,0.18)_31%,rgba(38,24,12,0.18)_44%,transparent_45%,transparent_62%,rgba(38,24,12,0.16)_63%,rgba(38,24,12,0.16)_76%,transparent_77%)]"
              />

              {portraitSrc ? (
                <>
                  <img
                    src={portraitSrc}
                    alt="Tanishq Sharma — Copywriter & Content Writer"
                    className={`relative z-10 w-full h-full ${
                      imageFit === 'contain'
                        ? 'object-contain object-bottom'
                        : 'object-cover object-center'
                    } drop-shadow-[0_18px_28px_rgba(23,22,20,0.28)] transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                  />

                  {/* Subtle Liquid-Glass Refraction Band Across Lower Edge of Portrait (Section 7) */}
                  <div
                    aria-hidden="true"
                    className="liquid-refraction-lens pointer-events-none absolute inset-x-0 bottom-0 h-14 z-20"
                  />

                  {/* Hover Image Upload / Fit / Remove Controls (Stop propagation so clicking doesn't flip card) */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 left-3 z-30 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#171614]/85 text-[#FAF8F4] text-[9px] font-mono-tabular uppercase tracking-[0.14em] hover:bg-[#74482A] transition-colors cursor-pointer"
                      title="Upload custom portrait image"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      <span>Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleToggleFit}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFFDF9]/90 text-[#171614] border border-[#DED5C5] text-[9px] font-mono-tabular uppercase tracking-[0.12em] hover:bg-[#171614] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                      title="Toggle image fit (Cover / Contain)"
                    >
                      <Maximize2 className="w-2.5 h-2.5" />
                      <span>{imageFit === 'cover' ? 'Contain' : 'Cover'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center justify-center p-1 bg-[#FFFDF9]/90 text-[#171614] border border-[#DED5C5] hover:bg-[#8B261D] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                      title="Remove image"
                      aria-label="Remove portrait image"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </>
              ) : (
                /* Interactive Add Image Option Inside Portrait Window */
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-30 w-full h-full flex flex-col items-center justify-center p-6 text-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group/upload flex flex-col items-center justify-center gap-3 px-7 py-6 bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] border border-dashed border-[#74482A]/60 hover:border-[#171614] shadow-[0_16px_36px_-10px_rgba(23,22,20,0.22)] transition-all duration-200 cursor-pointer"
                  >
                    <span className="w-11 h-11 flex items-center justify-center bg-[#F3EDE0] border border-[#DED5C5] text-[#74482A] group-hover/upload:bg-[#171614] group-hover/upload:text-[#FAF8F4] transition-colors">
                      <ImagePlus className="w-5 h-5" />
                    </span>
                    <span className="font-serif-editorial text-xl text-[#171614]">
                      Add Portrait Image
                    </span>
                    <span className="text-[10px] font-mono-tabular tracking-[0.16em] uppercase text-[#55524D]">
                      Click to browse or drag &amp; drop photo
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRestoreDefaultPortrait}
                    className="text-[10px] font-mono-tabular uppercase tracking-[0.16em] text-[#FFFDF9] underline underline-offset-4 hover:text-[#F7F1E3] cursor-pointer"
                  >
                    Restore Writer&rsquo;s Studio Portrait
                  </button>
                </div>
              )}

              {/* Subtle Warm Sunlight Wash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 backdrop-blur-[1px] bg-gradient-to-tr from-[#2E1A0C]/15 via-transparent to-[#FFF0D4]/25"
              />
            </div>

            {/* Bottom Hybrid Print + Glass Credential Block (Typography shifts 1–2px on hover) */}
            <figcaption className="pt-3.5 space-y-2.5 transition-transform duration-300 group-hover:translate-x-[1.5px] group-hover:-translate-y-[1px]">
              <div className="flex items-baseline justify-between gap-2 border-b border-[#EAE2D3] pb-2.5">
                <div>
                  <div className="font-serif-editorial text-2xl sm:text-[28px] text-[#141311] leading-none tracking-tight">
                    {DESIGNER_PROFILE.name}
                  </div>
                  <div className="text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#74482A] mt-1">
                    COPYWRITER / CONTENT WRITER
                  </div>
                </div>

                <div className="text-right text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#55524D]">
                  <div>ID 001</div>
                  <div>MUMBAI, IN</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono-tabular tracking-[0.18em] uppercase text-[#6E685F]">
                <span className="inline-flex items-center gap-1.5 text-[#141311]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B40]" />
                  <span>AVAILABLE FOR SELECT PROJECTS</span>
                </span>

                <span className="inline-flex items-center gap-1 text-[#74482A] group-hover:text-[#141311] transition-colors">
                  <RotateCw className="w-3 h-3" />
                  <span>FLIP CARD</span>
                </span>
              </div>
            </figcaption>
          </figure>

          {/* =====================================================================
              BACK OF HYBRID ID CARD: MATERIAL 03 — DARK TRANSLUCENT GLASS SURFACE
              ===================================================================== */}
          <div
            onClick={() => setIsFlipped(false)}
            className="backface-hidden rotate-y-180 dark-acrylic-glass absolute inset-0 p-6 sm:p-8 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Dossier Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/15 text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#D6C6B2]">
                <span>CREATIVE IDENTITY · ID 001 (BACK)</span>
                <span className="inline-flex items-center gap-1 text-[#E6B88A]">
                  <RotateCw className="w-3 h-3" />
                  <span>FLIP TO FRONT</span>
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-mono-tabular uppercase tracking-[0.22em] text-[#E6B88A] mb-1">
                  WRITER&rsquo;S CREDENTIAL DOSSIER
                </span>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#FAF8F4] leading-tight">
                  {DESIGNER_PROFILE.name}
                </h3>
                <p className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#C8BFA8] mt-1">
                  COPYWRITER · CONTENT STRATEGIST · PUBLISHED AUTHOR
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#E5DEC9]/90 leading-[1.68] pt-1">
                5+ years crafting campaign scripts, brand narratives, social
                storytelling, and packaging copy across 80+ brand campaigns and
                12+ consumer industries.
              </p>
            </div>

            {/* Verified Portfolio Matrix */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/15">
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="font-serif-editorial text-2xl sm:text-3xl text-[#FAF8F4]">
                  80+
                </div>
                <div className="text-[9px] font-mono-tabular uppercase tracking-[0.16em] text-[#C8BFA8]">
                  BRAND CAMPAIGNS
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <div className="font-serif-editorial text-2xl sm:text-3xl text-[#FAF8F4]">
                  02
                </div>
                <div className="text-[9px] font-mono-tabular uppercase tracking-[0.16em] text-[#C8BFA8]">
                  PUBLISHED BOOKS
                </div>
              </div>
              <div className="col-span-2 p-3 bg-white/5 border border-white/10 space-y-1">
                <div className="text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#E6B88A]">
                  CORE CAPABILITIES
                </div>
                <div className="text-xs text-[#FAF8F4] leading-relaxed">
                  Campaign Copywriting · Brand Voice · Social &amp; Content Strategy ·
                  Packaging &amp; Editorial Books
                </div>
              </div>
            </div>

            {/* Back Footer Actions */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between gap-3 pt-2"
            >
              <button
                type="button"
                onClick={() => onScrollToSection('selected-work')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F4] text-[#141311] text-[10px] font-mono-tabular uppercase tracking-[0.18em] hover:bg-[#E6B88A] transition-colors cursor-pointer"
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#D6C6B2] hover:text-white transition-colors cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
                <span>RETURN TO PORTRAIT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Aliases for seamless backwards compatibility
export const HeroEditorialPortraitStage = CinematicWriterDeskHero;
export const HeroCreativeDesk = CinematicWriterDeskHero;


/**
 * Layered Polaroid & Writer's Studio Collage for "01 / ABOUT" & "Tanishq Sharma: A Writer's About Page"
 */
export const AboutPolaroidCollage: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activePlate, setActivePlate] = useState<'polaroid' | 'slide2' | 'slide3'>('polaroid');

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: nx * 4, y: -ny * 4 });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative w-full py-4 px-2 sm:px-4 select-none perspective-stage"
    >
      {/* Top Plate Switcher Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="font-mono-tabular text-[10px] uppercase tracking-[0.18em] text-[#8C5E3C]">
          WRITER&rsquo;S STUDIO COLLAGE · CANVA SLIDES 02–03
        </span>
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#EAE3D5] border border-[#D5CBB8]">
          {[
            { id: 'polaroid', label: 'Studio Polaroid' },
            { id: 'slide2', label: 'Slide 02: Bio' },
            { id: 'slide3', label: 'Slide 03: CV & Books' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePlate(tab.id as 'polaroid' | 'slide2' | 'slide3')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono-tabular uppercase tracking-wider transition-colors cursor-pointer ${
                activePlate === tab.id
                  ? 'bg-[#171614] text-[#FAF9F6]'
                  : 'text-[#55524D] hover:text-[#171614]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activePlate === 'slide2' ? (
        <div className="rounded-2xl overflow-hidden border border-[#D5CBB8] shadow-xl bg-[#FAF6EE] p-2">
          <img
            src="/assets/slide-2.png"
            alt="Canva Slide 2 — Hello! My Name Is Tanishq Sharma · Get To Know Me"
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>
      ) : activePlate === 'slide3' ? (
        <div className="rounded-2xl overflow-hidden border border-[#D5CBB8] shadow-xl bg-[#FAF6EE] p-2">
          <img
            src="/assets/slide-3.png"
            alt="Canva Slide 3 — Work Experience, Published Books & Contact"
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>
      ) : (
        /* Layered Editorial Polaroid & Archival Print Collage */
        <div className="relative min-h-[430px] sm:min-h-[460px] rounded-3xl bg-[#EAE3D5]/75 border border-[#D5CBB8] p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-center gap-6 overflow-hidden">
          {/* Background Tilted Canva Slide 02 Print (Top-Left) */}
          <div
            style={{
              transform: `translate3d(${tilt.x * -1.2}px, ${tilt.y * -1.2}px, -10px) rotate(-5deg)`
            }}
            className="hidden sm:flex w-48 h-64 rounded-2xl bg-[#FFFDF9] border border-[#D5CBB8] shadow-md p-3.5 -mr-8 z-0 flex-col justify-between transition-transform duration-200"
          >
            <div className="rounded-xl overflow-hidden border border-[#E5DEC9] h-28 bg-[#FAF6EE]">
              <img
                src="/assets/slide-2.png"
                alt="Get to know me — Canva Slide 2"
                className="w-full h-full object-cover object-left-top"
              />
            </div>
            <div className="p-2.5 rounded-xl bg-[#171614] text-[#FAF9F6] space-y-1">
              <span className="font-mono-tabular text-[9px] tracking-widest text-[#D6A676] block">
                WHERE I STUDIED
              </span>
              <p className="font-serif-editorial text-sm leading-tight">
                Pearl Academy, Mumbai
              </p>
              <p className="text-[10px] text-[#E3DED4]/80">
                PG in Fashion Communication (2022–24)
              </p>
              <p className="text-[10px] text-[#E3DED4]/75 pt-1 border-t border-white/15">
                IMED Pune · BBA (2019–22)
              </p>
            </div>
          </div>

          {/* Center Main Polaroid Frame with Real Portrait & Red Thought Sketch */}
          <div
            data-cursor="VIEW"
            style={{
              transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) rotate(1.5deg)`
            }}
            className="relative z-10 w-64 sm:w-72 rounded-2xl bg-[#FFFDF9] border border-[#D5CBB8] shadow-[0_24px_48px_-12px_rgba(23,22,20,0.22)] p-4 pb-5 transition-transform duration-200"
          >
            {/* Archival Tape Strip */}
            <div
              aria-hidden="true"
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#D6A676]/40 border border-[#8C5E3C]/25 rotate-1"
            />

            <div className="w-full h-64 rounded-xl bg-gradient-to-b from-[#F4EFE4] via-[#E5DEC9] to-[#CFC6B4] relative overflow-hidden flex items-end justify-center border border-[#DCD3C2]">
              {/* Signature Red Creative Thought-Cloud Sketch (from Slide 2) */}
              <svg
                viewBox="0 0 120 90"
                className="absolute top-2 right-3 w-20 h-16 pointer-events-none opacity-85"
                aria-hidden="true"
              >
                <path
                  d="M35 55 C18 52 14 32 28 22 C34 8 58 6 70 18 C88 14 104 28 96 44 C104 58 86 70 68 64 C56 72 40 66 35 55 Z"
                  fill="none"
                  stroke="#D93829"
                  strokeWidth="2.2"
                />
                <path
                  d="M42 36 C48 24 68 26 62 40 C56 50 38 42 48 32 C58 22 76 34 64 46 C52 54 40 40 54 34"
                  fill="none"
                  stroke="#D93829"
                  strokeWidth="1.8"
                />
                <path
                  d="M32 62 Q26 70 30 75 Q24 80 20 84"
                  fill="none"
                  stroke="#D93829"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <img
                src="/assets/MAHVoz-Qrh0.png"
                alt="Tanishq Sharma — Portrait from Canva Portfolio"
                className="w-[92%] h-[92%] object-contain object-bottom drop-shadow-md"
              />
              <div className="absolute top-3 left-3 font-mono-tabular text-[9px] text-[#171614] tracking-widest bg-[#FFFDF9]/90 border border-[#DCD3C2] px-2.5 py-0.5 rounded-full">
                HELLO! I&rsquo;M TANISHQ
              </div>
            </div>

            {/* Pinned Role Note on Right Edge */}
            <div className="absolute -right-4 top-24 rounded-xl bg-[#FFFDF9] border border-[#D5CBB8] shadow-md px-3 py-2 rotate-3">
              <div className="font-mono-tabular text-[9px] font-semibold tracking-widest text-[#8C5E3C] leading-relaxed">
                <div>COPY</div>
                <div>CONTENT</div>
                <div>STRATEGY</div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="font-serif-editorial italic text-2xl text-[#171614] leading-none">
                The Writer Behind the Words.
              </div>
              <div className="font-handwritten text-base text-[#8C5E3C] mt-1">
                &ldquo;Would I send this to my bestie?&rdquo;
              </div>
            </div>
          </div>

          {/* Right Overlapping Archival Toolkit Note */}
          <div
            style={{
              transform: `translate3d(${tilt.x * 1.4}px, ${tilt.y * 1.4}px, 15px) rotate(-2.5deg)`
            }}
            className="w-full sm:w-48 rounded-2xl bg-[#FFFDF9] border border-[#D5CBB8] shadow-lg p-4 z-10 transition-transform duration-200"
          >
            <div className="border-b border-[#DCD3C2] pb-1.5 mb-2.5 font-mono-tabular text-[9px] tracking-widest text-[#8C5E3C] uppercase font-semibold">
              WRITER&rsquo;S BENCHMARK
            </div>
            <div className="font-serif-editorial text-base sm:text-lg text-[#171614] space-y-1 leading-snug">
              <div>360° Sale Campaigns</div>
              <div>BAU Reels &amp; Carousels</div>
              <div>CRM, WhatsApp &amp; Ads</div>
              <div>Moodboards &amp; Styling</div>
              <div className="italic text-[#8C5E3C]">2 Published Books</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BookCover3D: React.FC<{
  theme: 'happy-breakup' | 'creative-mindset';
}> = ({ theme }) => {
  const isHeartbreak = theme === 'happy-breakup';
  const coverImgSrc = isHeartbreak
    ? '/assets/MAHWM02S4Jg.png'
    : '/assets/MAHWM_xmY7c.png';
  const spineColor = isHeartbreak
    ? 'bg-[#C48289] border-[#A8686F]'
    : 'bg-[#192340] border-[#0F1629]';

  return (
    <div className="relative w-52 sm:w-60 h-72 sm:h-80 mx-auto group">
      <div className="relative w-full h-full">
        {/* Book Spine Detail */}
        <div
          className={`absolute inset-y-1 -left-2.5 w-3 ${spineColor} border-l border-y shadow-xs`}
        />
        {/* Book Cover Plate */}
        <div className="w-full h-full overflow-hidden border border-[#DED5C5] shadow-[0_20px_40px_-15px_rgba(23,22,20,0.22)] bg-[#FAF8F5]">
          <img
            src={coverImgSrc}
            alt={
              isHeartbreak
                ? 'Happy With My Heartbreak Book Cover'
                : 'Everythingship! Novel Cover'
            }
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Maps each project's artType to its real Canva portfolio slide image
 */
const CANVA_SLIDE_MAP: Record<
  GallerySlide['artType'],
  { primary: string; secondary: string; badge: string }
> = {
  'fragrance-campaign': {
    primary: '/src/assets/images/regenerated_image_1792420965057.jpg',
    secondary: '/assets/slide-12.png',
    badge: 'TATA CLIQ FASHION · BIG CLIQ SALE (P1)'
  },
  'coffee-social': {
    primary: '/assets/slide-8.png',
    secondary: '/assets/slide-9.png',
    badge: 'TATA CLIQ FASHION · CUPID SALE (LOVE IT.)'
  },
  'sneaker-ad': {
    primary: '/assets/slide-20.png',
    secondary: '/assets/slide-21-hero.png',
    badge: 'GAS MILANO INDIA · #ARTOFITALIANDENIM'
  },
  'architecture-strategy': {
    primary: '/assets/slide-16.png',
    secondary: '/assets/slide-17.png',
    badge: 'ALL YOU CAN 2026 · THE DRIP DEPT. POP-UP'
  },
  'apothecary-packaging': {
    primary: '/assets/slide-14.png',
    secondary: '/assets/slide-15.png',
    badge: 'TATA CLIQ × MIYO DESSERT BAR COLLAB'
  },
  'packaging-unboxing': {
    primary: '/assets/slide-15.png',
    secondary: '/assets/slide-14.png',
    badge: 'SCOOP, SPILL & WIN · IN-STORE ACTIVATION'
  },
  'monograph-type': {
    primary: '/assets/slide-23-hero.png',
    secondary: '/assets/slide-20.png',
    badge: 'GAS MILANO AW’25 MOTO DOCUMENTARY'
  },
  'editorial-spread': {
    primary: '/assets/slide-13.png',
    secondary: '/assets/slide-10.png',
    badge: 'CANVA PORTFOLIO ARCHIVE SPREAD'
  },
  'botanical-illustration': {
    primary: '/assets/slide-24-hero.png',
    secondary: '/assets/slide-25-hero.png',
    badge: 'SS’26 SUMMER STORIES & LITTLE BIRDIE'
  },
  'luxury-ev': {
    primary: '/assets/slide-19.png',
    secondary: '/assets/slide-27-hero.png',
    badge: 'TOPICAL CAMPAIGNS & VIRAT KOHLI COLLAB'
  },
  'fintech-ui': {
    primary: '/assets/slide-5.png',
    secondary: '/assets/slide-3.png',
    badge: 'CRM, WHATSAPP, APP COPY & AOP TOOLKIT'
  }
};

export const ProjectArtworkCanvas: React.FC<{
  artType: GallerySlide['artType'];
  title?: string;
  subtitle?: string;
  secondaryView?: boolean;
  className?: string;
}> = ({ artType, title, secondaryView = false, className = '' }) => {
  const mapped = CANVA_SLIDE_MAP[artType] || CANVA_SLIDE_MAP['fragrance-campaign'];
  const activeImg = secondaryView ? mapped.secondary : mapped.primary;

  return (
    <div
      className={`relative overflow-hidden bg-[#EAE2D3] flex items-center justify-center ${className}`}
    >
      <img
        src={activeImg}
        alt={title || mapped.badge}
        loading="lazy"
        className="w-full h-full object-contain bg-[#EAE2D3] transition-transform duration-500 ease-out"
      />
    </div>
  );
};


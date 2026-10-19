import React, { useEffect, useState, useRef } from 'react';

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

/**
 * Subtle Editorial Page Transition
 * Uses a restrained opacity & gentle 8px upward settle without flashy wipes.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ routeKey, children }) => {
  const [visibleKey, setVisibleKey] = useState(routeKey);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (routeKey !== visibleKey) {
      setIsEntering(true);
      const timer = window.setTimeout(() => {
        setVisibleKey(routeKey);
        setIsEntering(false);
      }, 160);
      return () => window.clearTimeout(timer);
    }
  }, [routeKey, visibleKey]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isEntering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  );
};

/**
 * Quiet Top Reading Progress Line (1.5px Warm Caramel Line)
 */
export const ScrollProgressAndCursor: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          docHeight > 0
            ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100))
            : 0;
        setScrollProgress(pct);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsPointerFine(true);
    }
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent pointer-events-none"
      >
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-[#74482A] transition-[width] duration-100 ease-out"
        />
      </div>

      {isPointerFine && cursorPos && (
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${cursorPos.x - 12}px, ${cursorPos.y - 12}px, 0)`
          }}
          className="fixed top-0 left-0 z-[65] w-6 h-6 rounded-full pointer-events-none transition-transform duration-75 ease-out opacity-40 mix-blend-multiply"
        >
          <div className="w-full h-full rounded-full bg-[#74482A]/15 blur-[2px] scale-110" />
        </div>
      )}
    </>
  );
};

/**
 * Subtle Editorial Viewport Reveal
 * Smoothly reveals sections with a restrained 12px upward fade.
 */
export const SmoothReveal: React.FC<{
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}> = ({ children, delayMs = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Section 11: Cinematic Magazine Page Image Reveal
 * Cream paper mask slides away while the image gently settles from scale 1.035 to 1.
 */
export const EditorialImageReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}> = ({ children, className = '', delayMs = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
      } ${className}`}
    >
      {/* Cream Paper Mask Curtain */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 bg-[#EAE2D3] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom ${
          revealed ? 'scale-y-0' : 'scale-y-100'
        }`}
      />
      <div
        className={`w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          revealed ? 'scale-100' : 'scale-[1.04]'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

import React, { forwardRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const SSAVideoNavigation = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const scrollToLabel = (label: string) => {
    const st = ScrollTrigger.getById('the-signal-master');
    if (st && st.animation) {
      const time = (st.animation as any).labels?.[label];
      const duration = st.animation.duration();
      if (time !== undefined && duration) {
        const progress = time / duration;
        const scrollTarget = st.start + (st.end - st.start) * progress;
        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div
      ref={ref}
      className="absolute top-24 left-6 md:top-28 md:left-12 z-30 text-[0.65rem] tracking-[0.25em] font-mono uppercase text-white/70 flex flex-col items-start gap-2.5 select-none"
    >
      <div className="flex items-center gap-2 text-white/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>SSA / THE SIGNAL</span>
      </div>

      <nav aria-label="Cinematic scenes" className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
        <button
          onClick={() => scrollToLabel('scene01')}
          className="px-2.5 py-1 rounded border border-white/10 bg-black/40 backdrop-blur hover:border-emerald-400 hover:text-white transition-all cursor-pointer font-bold"
        >
          01
        </button>
        <button
          onClick={() => scrollToLabel('scene02')}
          className="px-2.5 py-1 rounded border border-white/10 bg-black/40 backdrop-blur hover:border-emerald-400 hover:text-white transition-all cursor-pointer font-bold"
        >
          02
        </button>
        <button
          onClick={() => scrollToLabel('scene03')}
          className="px-2.5 py-1 rounded border border-white/10 bg-black/40 backdrop-blur hover:border-emerald-400 hover:text-white transition-all cursor-pointer font-bold"
        >
          03
        </button>
        <button
          onClick={() => scrollToLabel('constellation')}
          className="px-2.5 py-1 rounded border border-white/10 bg-black/40 backdrop-blur hover:border-emerald-400 hover:text-white transition-all cursor-pointer font-bold"
        >
          CONSTELLATION
        </button>
        <button
          onClick={() => scrollToLabel('featured')}
          className="px-2.5 py-1 rounded border border-white/10 bg-black/40 backdrop-blur hover:border-emerald-400 hover:text-white transition-all cursor-pointer font-bold"
        >
          FEATURED
        </button>
        <button
          onClick={() => scrollToLabel('archive')}
          className="px-2.5 py-1 rounded border border-emerald-400/40 bg-emerald-950/40 text-emerald-300 backdrop-blur hover:bg-emerald-400 hover:text-black transition-all cursor-pointer font-bold"
        >
          ARCHIVE ↓
        </button>
      </nav>
    </div>
  );
});

SSAVideoNavigation.displayName = 'SSAVideoNavigation';


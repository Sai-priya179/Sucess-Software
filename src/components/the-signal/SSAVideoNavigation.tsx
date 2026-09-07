import React, { forwardRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const SSAVideoNavigation = forwardRef<HTMLDivElement, {}>((_, ref) => {

  const scrollToScene = (label: string) => {
    const st = ScrollTrigger.getById('the-signal-master');
    if (st && st.animation) {
      const time = st.animation.labels[label];
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
    <div ref={ref} className="absolute top-12 right-12 z-40 text-[0.65rem] tracking-[0.3em] font-bold uppercase text-white/70 mix-blend-difference flex flex-col items-end gap-2">
      <p className="opacity-50">Explore</p>
      <div className="flex items-center gap-4 mt-2">
        <button onClick={() => scrollToScene('scene01')} className="hover:text-white hover:scale-110 transition-all cursor-pointer">01</button>
        <button onClick={() => scrollToScene('scene02')} className="hover:text-white hover:scale-110 transition-all cursor-pointer">02</button>
        <button onClick={() => scrollToScene('scene03')} className="hover:text-white hover:scale-110 transition-all cursor-pointer">03</button>
        <button onClick={() => scrollToScene('scene04')} className="hover:text-white hover:scale-110 transition-all cursor-pointer">ALL</button>
      </div>
    </div>
  );
});
SSAVideoNavigation.displayName = 'SSAVideoNavigation';

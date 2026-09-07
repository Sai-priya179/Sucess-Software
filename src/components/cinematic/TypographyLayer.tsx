import React, { forwardRef } from 'react';

interface Props {
  refs: {
    tIntro: React.RefObject<HTMLDivElement>;
    tProg: React.RefObject<HTMLHeadingElement>;
    tWeb: React.RefObject<HTMLHeadingElement>;
    tTech: React.RefObject<HTMLHeadingElement>;
    identityBox: React.RefObject<HTMLDivElement>;
    identityLine1: React.RefObject<HTMLHeadingElement>;
    identityLine2: React.RefObject<HTMLHeadingElement>;
    cta: React.RefObject<HTMLDivElement>;
  }
}

export const TypographyLayer = forwardRef<HTMLDivElement, Props>(({ refs }, ref) => {
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-20">
      
      {/* Scene 1 */}
      <div ref={refs.tIntro} className="absolute left-6 md:left-16 bottom-16 md:bottom-24 max-w-[80vw]">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SSA Watch</h1>
        <h2 className="text-lg md:text-2xl text-emerald-400 font-bold tracking-[0.2em] uppercase">LEARN. BUILD. BECOME.</h2>
      </div>
      
      {/* Scene 2 */}
      <h1 ref={refs.tProg} className="absolute left-6 md:left-16 top-16 md:top-24 text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 to-emerald-600/50">
        Programming
      </h1>

      {/* Scene 3 */}
      <h1 ref={refs.tWeb} className="absolute left-6 md:left-16 bottom-16 md:bottom-24 text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-tr from-blue-400 to-indigo-600/50">
        Web<br/>Development
      </h1>

      {/* Scene 4 */}
      <h1 ref={refs.tTech} className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter text-right bg-clip-text text-transparent bg-gradient-to-bl from-purple-400 to-fuchsia-600/50">
        Projects &<br/>Technology
      </h1>

      {/* Scene 6 (Identity) */}
      <div ref={refs.identityBox} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="border-2 md:border-4 border-emerald-500/30 p-4 md:p-10 mb-4 md:mb-6 inline-block backdrop-blur-xl bg-black/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <h2 ref={refs.identityLine1} className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white whitespace-nowrap">
            One team.
          </h2>
        </div>
        <h3 ref={refs.identityLine2} className="text-xl sm:text-3xl md:text-5xl text-neutral-400 font-bold tracking-[0.1em] uppercase">
          Endless possibilities.
        </h3>
      </div>

      {/* Scene 7 (CTA) */}
      <div ref={refs.cta} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none -z-10" />
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-10 tracking-tighter drop-shadow-2xl">READY TO START?</h2>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pointer-events-auto">
          <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-black font-black rounded-full hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all duration-300 uppercase tracking-widest text-xs md:text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto">
            Explore Courses
          </button>
          <button className="px-8 md:px-10 py-4 md:py-5 bg-black/50 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 uppercase tracking-widest text-xs md:text-sm backdrop-blur-md w-full sm:w-auto">
            Contact SSA
          </button>
        </div>
      </div>
    </div>
  );
});
TypographyLayer.displayName = 'TypographyLayer';

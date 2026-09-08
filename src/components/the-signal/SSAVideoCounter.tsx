import React, { forwardRef } from 'react';

export const SSAVideoCounter = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-24 right-6 md:top-28 md:right-12 z-30 font-mono select-none pointer-events-none"
    >
      <div className="flex items-center gap-3 md:gap-4">
        {/* Rolling Number Reel */}
        <div className="relative overflow-hidden h-10 md:h-14 w-12 md:w-16 text-right">
          <div className="counter-numbers absolute top-0 right-0 flex flex-col font-bold text-3xl md:text-5xl text-white tracking-tighter will-change-transform">
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">01</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">02</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">03</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">04</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">05</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">06</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">07</span>
            <span className="h-10 md:h-14 flex items-center justify-end leading-none">08</span>
          </div>
        </div>

        {/* Divider & Total Count */}
        <span className="text-xl md:text-3xl font-light text-white/30">/</span>
        <span className="text-xl md:text-3xl font-light text-white/40 tracking-wider">08</span>
      </div>

      <div className="text-right mt-1">
        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-emerald-400 font-mono">
          CHRONICLE
        </span>
      </div>
    </div>
  );
});

SSAVideoCounter.displayName = 'SSAVideoCounter';


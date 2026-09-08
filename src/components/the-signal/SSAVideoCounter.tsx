import React, { forwardRef } from 'react';

export const SSAVideoCounter = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div ref={ref} className="absolute bottom-12 right-12 z-40 font-mono text-sm tracking-[0.3em] text-white/50 mix-blend-difference">
      <div className="flex items-center gap-4">
        <div className="relative overflow-hidden h-6 w-8 text-right">
          {/* Numbers stack that we animate vertically via GSAP */}
          <div className="counter-numbers absolute top-0 right-0 flex flex-col transition-none text-white">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
          </div>
        </div>
        <span className="w-8 h-[1px] bg-white/20"></span>
        <span>08</span>
      </div>
    </div>
  );
});
SSAVideoCounter.displayName = 'SSAVideoCounter';

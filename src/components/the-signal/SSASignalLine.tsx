import React, { forwardRef } from 'react';

export const SSASignalLine = forwardRef<HTMLDivElement, { progress?: number }>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-16 md:right-16 z-30 pointer-events-none flex flex-col gap-2"
    >
      <div className="flex items-center justify-between text-[0.6rem] font-mono tracking-[0.3em] uppercase text-white/40">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SIGNAL SPINE</span>
        </div>
        <div className="flex items-center gap-6">
          <span>01</span>
          <span className="hidden sm:inline text-white/20">////////////////</span>
          <span>08</span>
        </div>
      </div>

      {/* SVG Signal Path with scrubbing beacon */}
      <div className="relative w-full h-3 flex items-center">
        {/* Background Guide Line */}
        <div className="w-full h-px bg-white/10" />

        {/* Active Signal Scrub Bar */}
        <div
          className="signal-scrub-bar absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-300 to-white origin-left will-change-transform"
          style={{ width: '100%', transform: 'scaleX(0)' }}
        />

        {/* Tracking Beacon Point */}
        <div
          className="signal-beacon absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(52,211,153,0.9)] border border-emerald-400 transition-none will-change-transform"
          style={{ left: '0%' }}
        />
      </div>
    </div>
  );
});

SSASignalLine.displayName = 'SSASignalLine';

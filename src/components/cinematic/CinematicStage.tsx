import React, { forwardRef } from 'react';

interface Props {
  children: React.ReactNode;
  mousePos: { x: number; y: number };
}

export const CinematicStage = forwardRef<HTMLDivElement, Props>(({ children, mousePos }, ref) => {
  return (
    <div className="h-[12000px]">
      <div ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center perspective-1500 bg-[#02050A] font-sans">
        {/* Dynamic Mouse Spotlight overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle 800px at ' + mousePos.x + 'px ' + mousePos.y + 'px, rgba(16,185,129,0.15), rgba(0,0,0,0))'
          }}
        />
        {children}
      </div>
    </div>
  );
});
CinematicStage.displayName = 'CinematicStage';

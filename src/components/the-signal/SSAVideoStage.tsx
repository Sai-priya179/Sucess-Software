import React, { forwardRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export const SSAVideoStage = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div className="h-[20000px] w-full" id="the-signal-scroll-container">
      <div 
        ref={ref} 
        className="relative w-full h-screen overflow-hidden bg-[#050505] text-white perspective-1500"
      >
        {/* Deep background ambient glow */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,_rgba(30,40,45,0.4),_rgba(5,5,5,1))]" />
        
        {/* Grain overlay for cinematic texture */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Content plane */}
        <div className="absolute inset-0 z-10 transform-style-3d">
          {children}
        </div>
      </div>
    </div>
  );
});
SSAVideoStage.displayName = 'SSAVideoStage';

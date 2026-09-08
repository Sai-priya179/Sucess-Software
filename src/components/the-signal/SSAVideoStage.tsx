import React, { forwardRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export const SSAVideoStage = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div className="w-full relative" id="the-signal-stage-root">
      {/* Pinned Viewport Frame */}
      <div 
        ref={ref} 
        className="relative w-full h-screen overflow-hidden bg-[#030303] text-white perspective-1500"
      >
        {/* Subtle Ambient Light Core */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_50%_45%,_rgba(16,185,129,0.18),_rgba(3,3,3,1)_70%)]" />
        <div className="signal-aurora absolute -inset-1/3 z-0 pointer-events-none rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,transparent,rgba(16,185,129,0.12),transparent,rgba(240,165,0,0.1),transparent)] blur-3xl opacity-50 will-change-transform" />
        
        {/* Fine Architectural Grid Lines */}
        <div className="signal-grid absolute inset-0 z-0 pointer-events-none opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        
        {/* Signal Orbit Rings */}
        <div className="signal-orbit absolute left-1/2 top-1/2 z-0 h-[min(75vw,1000px)] w-[min(75vw,1000px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/10 pointer-events-none will-change-transform" />
        <div className="absolute left-1/2 top-1/2 z-0 h-[min(50vw,700px)] w-[min(50vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] pointer-events-none" />

        {/* Cinematic Film Texture Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />

        {/* 3D Spatial Content Layer */}
        <div 
          style={{ transform: 'translate3d(calc(var(--pointer-x, 0) * 12px), calc(var(--pointer-y, 0) * 12px), 0)' }} 
          className="signal-content absolute inset-0 z-10 transform-style-3d will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
});

SSAVideoStage.displayName = 'SSAVideoStage';

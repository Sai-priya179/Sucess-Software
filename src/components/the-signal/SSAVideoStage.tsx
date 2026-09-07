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
        <div className="signal-aurora absolute -inset-1/4 z-0 pointer-events-none rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,transparent,rgba(16,185,129,0.16),transparent,rgba(59,130,246,0.14),transparent)] blur-3xl" />
        <div className="signal-grid absolute inset-0 z-0 pointer-events-none opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="signal-scanline absolute inset-0 z-30 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.12)_50%,transparent_100%)] bg-[length:100%_8px] mix-blend-screen" />
        <div className="signal-orbit absolute left-1/2 top-1/2 z-0 h-[min(70vw,900px)] w-[min(70vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10 pointer-events-none" />
        
        {/* Grain overlay for cinematic texture */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Content plane */}
        <div style={{ transform: 'translate3d(calc(var(--pointer-x, 0) * 10px), calc(var(--pointer-y, 0) * 10px), 0)' }} className="signal-content absolute inset-0 z-10 transform-style-3d">
          {children}
        </div>
      </div>
    </div>
  );
});
SSAVideoStage.displayName = 'SSAVideoStage';

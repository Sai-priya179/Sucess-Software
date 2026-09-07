import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface AdvancedCardProps {
  video: any;
  onClick: () => void;
}

export const AdvancedCard = React.forwardRef<HTMLDivElement, AdvancedCardProps>(({ video, onClick }, refEl) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current || !glareRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    innerRef.current.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
    
    // Glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    glareRef.current.style.opacity = '1';
    glareRef.current.style.background = 'radial-gradient(circle at ' + glareX + '% ' + glareY + '%, rgba(255,255,255,0.9) 0%, transparent 50%)';
  };

  const handleMouseLeave = () => {
    if (!innerRef.current || !glareRef.current) return;
    innerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    glareRef.current.style.opacity = '0';
  };

  return (
    <div 
      ref={refEl}
      className="absolute w-[280px] md:w-[450px] aspect-[4/3] md:aspect-video rounded-2xl pointer-events-auto will-change-transform perspective-1000 group -mt-[20%] md:-mt-[15%] -ml-[140px] md:-ml-[225px]"
      style={{ left: '50%', top: '50%' }} 
    >
      <div 
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={"Watch video: " + video.title}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5 cursor-pointer bg-neutral-900 focus:outline-none focus:ring-4 focus:ring-white/50 transform-style-3d will-change-transform transition-transform duration-200 ease-out"
      >
        {/* Animated glowing border */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent p-[1px] -z-10" />
        </div>

        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 filter group-hover:contrast-125"
        />
        
        {/* Glare Overlay */}
        <div 
          ref={glareRef} 
          className="absolute inset-0 pointer-events-none opacity-0 mix-blend-overlay z-10 transition-opacity duration-300"
          style={{ width: '200%', height: '200%', left: '-50%', top: '-50%' }}
        />

        {/* Enhanced Glassmorphic Data Panel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6 md:p-8 z-20">
          <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg shadow-white/5">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl px-3 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.2em] text-white/90 uppercase border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-white/30 transition-colors duration-500">
                {video.category}
              </div>
            </div>
            
            <h3 className="text-white text-xl md:text-3xl font-bold tracking-tight mb-2 drop-shadow-2xl translate-z-10 leading-tight">{video.title}</h3>
            
            <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] mt-2">
              <span className="text-white/60 text-sm font-medium tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                Click to explore <span className="text-white">?</span>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});
AdvancedCard.displayName = 'AdvancedCard';

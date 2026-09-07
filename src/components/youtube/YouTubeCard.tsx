import React from 'react';
import { VideoCardProps } from '../../lib/youtube/youtubeTypes';
import { Play } from 'lucide-react';

export const YouTubeCard: React.FC<VideoCardProps> = ({ video, index, activeIndex, progress, onClick }) => {
  // Static state for Phase 2, will be replaced by GSAP logic in Phase 6/7
  const isActive = index === activeIndex;
  
  return (
    <div 
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-out flex flex-col items-center justify-center`}
      onClick={() => onClick(index)}
      // In Phase 6, we'll map these to GSAP refs instead of raw style props. For Phase 2 we mock basic visuals.
      style={{
        width: '320px',
        aspectRatio: '16/9',
        transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.8}) translateY(${isActive ? 0 : 20 * (index - activeIndex)}px)`,
        opacity: isActive ? 1 : 0.6,
        zIndex: isActive ? 10 : 5
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-neutral-900">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
             <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
        
        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-white">
          {video.category}
        </div>
      </div>
      
      {/* Title info outside the card but moving with it */}
      <div className={`mt-6 text-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h3 className="text-white text-xl font-bold tracking-tight">{video.title}</h3>
        <p className="text-neutral-400 text-sm mt-2 max-w-sm">{video.description}</p>
      </div>
    </div>
  );
};

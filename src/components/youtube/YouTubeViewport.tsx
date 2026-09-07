import React, { useRef, useState, useEffect } from 'react';
import { YouTubeCard } from './YouTubeCard';
import { ssaVideos } from '../../lib/youtube/youtubeData';

export const YouTubeViewport: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Mock static layout for Phase 3 before GSAP integration
  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* Background Atmosphere Mock */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-50" />
      
      {/* Cards Layer */}
      <div className="relative w-full h-full max-w-6xl mx-auto perspective-1000">
        {ssaVideos.map((video, index) => (
          <YouTubeCard 
            key={video.id}
            video={video}
            index={index}
            activeIndex={activeIndex}
            progress={progress}
            onClick={(i) => setActiveIndex(i)}
          />
        ))}
      </div>
      
    </div>
  );
};

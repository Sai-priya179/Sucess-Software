import React, { forwardRef } from 'react';
import { ssaCinematicData } from '../../lib/youtube/ssaCinematicData';
import { AdvancedCard } from './AdvancedCard';

interface Props {
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  parallaxRef: React.MutableRefObject<HTMLDivElement | null>;
  onCardClick: (video: any) => void;
}

export const MediaLayer = forwardRef<HTMLDivElement, Props>(({ cardsRef, parallaxRef, onCardClick }, ref) => {
  return (
    <div ref={parallaxRef} className="absolute inset-0 pointer-events-none transform-style-3d will-change-transform z-10">
      {ssaCinematicData.map((video, idx) => (
        <AdvancedCard 
          key={video.id}
          video={video}
          onClick={() => onCardClick(video)}
          ref={(el: HTMLDivElement | null) => { cardsRef.current[idx] = el; }}
        />
      ))}
    </div>
  );
});
MediaLayer.displayName = 'MediaLayer';

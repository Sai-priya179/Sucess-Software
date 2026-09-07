import React from 'react';
import { YouTubeBackground } from '../youtube/YouTubeBackground';

export const BackgroundLayer: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black opacity-90 z-0 pointer-events-none" />
      <YouTubeBackground />
    </>
  );
};

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { youtubeConfig } from '../lib/youtube/youtubeConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useCinematicScroll = (
  sectionRef: React.RefObject<HTMLElement>,
  viewportRef: React.RefObject<HTMLDivElement>
) => {
  const masterTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !viewportRef.current) return;

    // Create the master timeline (paused)
    const tl = gsap.timeline({ paused: true });
    masterTimeline.current = tl;

    // Set up ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${youtubeConfig.scrollDistance}`,
      pin: viewportRef.current,
      scrub: youtubeConfig.scrub,
      animation: tl,
      onUpdate: (self) => {
        // You could dispatch custom events here if needed, but the timeline handles visual state
      }
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [sectionRef, viewportRef]);

  return masterTimeline;
};

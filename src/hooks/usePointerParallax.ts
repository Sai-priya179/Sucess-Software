import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { youtubeConfig } from '../lib/youtube/youtubeConfig';

export const usePointerParallax = (targetRef: React.RefObject<HTMLElement>) => {
  const requestRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!youtubeConfig.enableMouseParallax || youtubeConfig.reducedMotionFallback || !targetRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Interpolate for smooth movement
      target.current.x += (mouse.current.x - target.current.x) * 0.1;
      target.current.y += (mouse.current.y - target.current.y) * 0.1;

      if (targetRef.current) {
        // Apply tiny rotation and translation using GSAP for performance
        gsap.set(targetRef.current, {
          rotationY: target.current.x * 5, // ±5 degrees
          rotationX: -target.current.y * 5,
          x: target.current.x * 20, // ±20px
          y: target.current.y * 20
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [targetRef]);
};

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CinematicStage } from './CinematicStage';
import { BackgroundLayer } from './BackgroundLayer';
import { MediaLayer } from './MediaLayer';
import { TypographyLayer } from './TypographyLayer';
import { ForegroundLayer } from './ForegroundLayer';
import { buildCinematicTimeline } from './cinematicTimeline';
import { SSAYoutubeVideo } from '../../lib/youtube/youtubeTypes';
import { YouTubePlayer } from '../youtube/YouTubePlayer';

gsap.registerPlugin(ScrollTrigger);

export const SSACinematicSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Text Refs
  const tIntroRef = useRef<HTMLDivElement>(null);
  const tProgRef = useRef<HTMLHeadingElement>(null);
  const tWebRef = useRef<HTMLHeadingElement>(null);
  const tTechRef = useRef<HTMLHeadingElement>(null);
  const identityBoxRef = useRef<HTMLDivElement>(null);
  const identityLine1Ref = useRef<HTMLHeadingElement>(null);
  const identityLine2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [activeScene, setActiveScene] = useState('scene01');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeVideo, setActiveVideo] = useState<SSAYoutubeVideo | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current || !parallaxRef.current) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 320px)", () => {
        const textRefs = {
          tIntro: tIntroRef.current,
          tProg: tProgRef.current,
          tWeb: tWebRef.current,
          tTech: tTechRef.current,
          identityBox: identityBoxRef.current,
          identityLine1: identityLine1Ref.current,
          identityLine2: identityLine2Ref.current,
          cta: ctaRef.current,
        };

        const master = buildCinematicTimeline(
          sectionRef.current!,
          viewportRef.current!,
          parallaxRef.current!,
          cardsRef.current,
          textRefs,
          (p) => {
            setProgress(p);
            // Rough scene estimation based on progress
            if (p < 0.12) setActiveScene('01_INTRO');
            else if (p < 0.25) setActiveScene('02_PROGRAMMING');
            else if (p < 0.38) setActiveScene('03_WEB_DEV');
            else if (p < 0.50) setActiveScene('04_TECH');
            else if (p < 0.70) setActiveScene('05_COLLAGE');
            else if (p < 0.85) setActiveScene('06_IDENTITY');
            else setActiveScene('07_CTA');
          }
        );

        // Advanced Skew Parallax
        const proxy = { skew: 0 };
        const skewSetter = gsap.quickSetter(parallaxRef.current, "skewY", "deg");
        const clamp = gsap.utils.clamp(-10, 10);
        
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -300);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew)
              });
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-black text-white overflow-hidden" 
      id="ssa-watch-section"
      onMouseMove={(e) => {
        if (!viewportRef.current) return;
        const rect = viewportRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <CinematicStage ref={viewportRef} mousePos={mousePos}>
        <BackgroundLayer />
        
        <MediaLayer 
          parallaxRef={parallaxRef}
          cardsRef={cardsRef}
          onCardClick={setActiveVideo}
        />
        
        <TypographyLayer 
          refs={{
            tIntro: tIntroRef,
            tProg: tProgRef,
            tWeb: tWebRef,
            tTech: tTechRef,
            identityBox: identityBoxRef,
            identityLine1: identityLine1Ref,
            identityLine2: identityLine2Ref,
            cta: ctaRef
          }} 
        />
        
        <ForegroundLayer progress={progress} activeScene={activeScene} />

        {activeVideo && (
          <YouTubePlayer 
            video={activeVideo} 
            onClose={() => setActiveVideo(null)} 
          />
        )}
      </CinematicStage>
    </section>
  );
};

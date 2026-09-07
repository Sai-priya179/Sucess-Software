import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SSAVideoStage } from './SSAVideoStage';
import { SSAVideoObject } from './SSAVideoObject';
import { SSAVideoConstellation } from './SSAVideoConstellation';
import { SSAVideoNavigation } from './SSAVideoNavigation';
import { SSAVideoCounter } from './SSAVideoCounter';
import { SSASignalLine } from './SSASignalLine';
import { ssaVideoData, SSAVideo } from './SSAVideoData';
import { buildYoutubeTimeline } from './youtubeTimeline';
import { SSACinematicPlayer } from './SSACinematicPlayer';

gsap.registerPlugin(ScrollTrigger);

export const SSAVideoExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const counterNumbersRef = useRef<HTMLDivElement>(null);
  
  const videosRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const tHeadlineRef = useRef<HTMLHeadingElement>(null);
  const tSublineRef = useRef<HTMLHeadingElement>(null);
  const tCurrentCatRef = useRef<HTMLParagraphElement>(null);

  const [activeVideo, setActiveVideo] = useState<SSAVideo | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 320px)", () => {
        const textRefs = {
          tHeadline: tHeadlineRef.current,
          tSubline: tSublineRef.current,
          tCurrentCat: tCurrentCatRef.current
        };

        buildYoutubeTimeline(
          sectionRef.current!,
          viewportRef.current!,
          videosRef.current,
          textRefs,
          signalRef.current,
          counterNumbersRef.current,
          (progress) => {},
          prefersReducedMotion // Pass this flag to optionally simplify timeline
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black overflow-hidden" id="the-signal-section">
      <SSAVideoStage ref={viewportRef}>
        
        {/* Navigation & Counter Overlays */}
        <SSAVideoNavigation />
        <SSAVideoCounter ref={counterNumbersRef} />
        
        {/* Signal Tracking Line */}
        <SSASignalLine ref={signalRef} />

        {/* Global Editorial Typography */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center text-center">
          <p ref={tCurrentCatRef} className="text-emerald-400 text-xs tracking-[0.4em] uppercase font-bold mb-6">FEATURED VIDEO</p>
          <h1 ref={tHeadlineRef} className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mix-blend-difference z-30">SSA / VIDEO</h1>
          <h2 ref={tSublineRef} className="text-2xl md:text-4xl font-bold text-white/50 uppercase tracking-widest mt-2">The Signal</h2>
        </div>

        {/* Cinematic Constellation & Media Objects */}
        <SSAVideoConstellation>
          {ssaVideoData.map((video, idx) => {
            let baseClass = "w-[280px] md:w-[500px] aspect-video left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
            return (
              <SSAVideoObject
                key={video.id}
                ref={(el) => { videosRef.current[idx] = el; }}
                video={video}
                className={baseClass}
                onClick={() => setActiveVideo(video)}
              />
            );
          })}
        </SSAVideoConstellation>

        {activeVideo && (
          <SSACinematicPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </SSAVideoStage>
    </section>
  );
};

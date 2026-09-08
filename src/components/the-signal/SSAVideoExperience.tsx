import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SSAVideoStage } from './SSAVideoStage';
import { SSAVideoObject } from './SSAVideoObject';
import { SSAVideoConstellation } from './SSAVideoConstellation';
import { SSAVideoNavigation } from './SSAVideoNavigation';
import { SSAVideoCounter } from './SSAVideoCounter';
import { SSASignalLine } from './SSASignalLine';
import { SSAVideoMetadata } from './SSAVideoMetadata';
import { SSAVideoArchive } from './SSAVideoArchive';
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
  
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLHeadingElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const activeVideoNumberRef = useRef<HTMLSpanElement>(null);

  const [activeVideo, setActiveVideo] = useState<SSAVideo | null>(null);

  // Subtle 3D Pointer Tracking for ambient perspective
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        section.style.setProperty('--pointer-x', pointerX.toFixed(3));
        section.style.setProperty('--pointer-y', pointerY.toFixed(3));
        pointerFrame = 0;
      });
    };
    const resetPointer = () => {
      section.style.setProperty('--pointer-x', '0');
      section.style.setProperty('--pointer-y', '0');
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', resetPointer);
    return () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', resetPointer);
    };
  }, []);

  // GSAP ScrollTrigger Master Timeline Construction
  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      buildYoutubeTimeline({
        section: sectionRef.current!,
        viewport: viewportRef.current!,
        videos: videosRef.current,
        metadataRefs: {
          headline: headlineRef.current,
          subline: sublineRef.current,
          category: categoryRef.current,
          desc: descRef.current,
          activeVideoNumber: activeVideoNumberRef.current
        },
        signalLine: signalRef.current,
        counterNumbers: counterNumbersRef.current,
        prefersReducedMotion
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#030303] text-white overflow-hidden" 
      id="the-signal-section"
      aria-label="SSA The Signal - Cinematic Media System"
    >
      {/* Pinned Cinematic Stage */}
      <SSAVideoStage ref={viewportRef}>
        {/* Navigation & Signal Spine */}
        <SSAVideoNavigation />
        <SSAVideoCounter ref={counterNumbersRef} />
        <SSASignalLine ref={signalRef} />

        {/* Dynamic Editorial Typography Layer */}
        <SSAVideoMetadata
          headlineRef={headlineRef}
          sublineRef={sublineRef}
          categoryRef={categoryRef}
          descRef={descRef}
          activeVideoNumberRef={activeVideoNumberRef}
        />

        {/* 3D Constellation of Spatial Video Objects */}
        <SSAVideoConstellation>
          {ssaVideoData.map((video, idx) => {
            const baseClass = "w-[280px] sm:w-[360px] md:w-[540px] aspect-video left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
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
      </SSAVideoStage>

      {/* 42 — Final Editorial Media Archive (Post-Scroll Catalog) */}
      <div className="relative w-full bg-[#020202] border-t border-white/10 z-20">
        <SSAVideoArchive onSelectVideo={(video) => setActiveVideo(video)} />
      </div>

      {/* Single Active Immersive YouTube Player */}
      {activeVideo && (
        <SSACinematicPlayer 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </section>
  );
};


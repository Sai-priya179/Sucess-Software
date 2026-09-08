import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
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
  const progressRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);

  const [activeVideo, setActiveVideo] = useState<SSAVideo | null>(null);

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

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      let progressFrame = 0;
      let pendingProgress = 0;

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
          (progress) => {
            pendingProgress = progress;
            if (progressFrame) return;
            progressFrame = requestAnimationFrame(() => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${pendingProgress})`;
              if (progressLabelRef.current) progressLabelRef.current.textContent = `${Math.round(pendingProgress * 100).toString().padStart(2, '0')}%`;
              progressFrame = 0;
            });
          },
          prefersReducedMotion // Pass this flag to optionally simplify timeline
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black overflow-hidden" id="videos">
      <SSAVideoStage ref={viewportRef}>
        <div className="absolute left-8 top-8 z-40 flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/50 mix-blend-difference md:left-12 md:top-12">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
          <span>Live learning archive</span>
        </div>
        <div className="absolute bottom-10 left-8 z-40 flex w-44 flex-col gap-2 text-[0.6rem] font-mono uppercase tracking-[0.3em] text-white/50 mix-blend-difference md:left-12">
          <div className="flex justify-between"><span>Signal</span><span ref={progressLabelRef}>00%</span></div>
          <div className="h-px w-full overflow-hidden bg-white/20"><div ref={progressRef} className="h-full origin-left scale-x-0 bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" /></div>
        </div>
        
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
        <div className="absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/40">
          <span>Scroll to explore</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-emerald-300/80 to-transparent" />
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


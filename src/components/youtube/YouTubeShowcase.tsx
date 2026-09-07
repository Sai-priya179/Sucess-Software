import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ssaVideos } from '../../lib/youtube/youtubeData';
import { youtubeConfig } from '../../lib/youtube/youtubeConfig';
import { SSAYoutubeVideo } from '../../lib/youtube/youtubeTypes';
import { Play } from 'lucide-react';
import { YouTubeBackground } from './YouTubeBackground';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { YouTubeDebug } from './YouTubeDebug';
import { YouTubePlayer } from './YouTubePlayer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const YouTubeShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  const [activeVideo, setActiveVideo] = useState<SSAYoutubeVideo | null>(null);
  usePointerParallax(parallaxRef);
  
  // Refs for cards
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Refs for text scenes
  const tIntroRef = useRef<HTMLHeadingElement>(null);
  const tProgRef = useRef<HTMLHeadingElement>(null);
  const tWebRef = useRef<HTMLHeadingElement>(null);
  const tTechRef = useRef<HTMLHeadingElement>(null);
  
  const identityBoxRef = useRef<HTMLDivElement>(null);
  const identityLine1Ref = useRef<HTMLHeadingElement>(null);
  const identityLine2Ref = useRef<HTMLHeadingElement>(null);
  
  const ctaRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 320px)", () => {
        const master = gsap.timeline({
          scrollTrigger: {
            id: 'master-scroll',
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=8000',
            pin: viewportRef.current,
            scrub: 1,
          }
        });

        // ----------------------------------------------------
        // INITIAL STATE SETUP
        // ----------------------------------------------------
        gsap.set([tProgRef.current, tWebRef.current, tTechRef.current, identityBoxRef.current, ctaRef.current], { autoAlpha: 0 });
        gsap.set(tIntroRef.current, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)' });
        gsap.set(cardsRef.current, { autoAlpha: 0, z: -2000, scale: 0.5 });

        // SCENE 01: INTRO
        master.addLabel('scene01', 0)
          .fromTo(cardsRef.current[0], { x: '30vw', y: '-20vh', z: -1000, rotateY: -15, autoAlpha: 0 }, { x: '10vw', y: '-5vh', z: -200, rotateY: -5, autoAlpha: 1, scale: 1.2, duration: 2 }, 'scene01')
          .fromTo(cardsRef.current[1], { x: '50vw', y: '10vh', z: -1500, autoAlpha: 0 }, { x: '25vw', y: '5vh', z: -400, rotateZ: 5, autoAlpha: 0.8, scale: 0.9, duration: 2 }, 'scene01+=0.2')
          .fromTo(cardsRef.current[2], { x: '20vw', y: '40vh', z: -800, autoAlpha: 0 }, { x: '5vw', y: '25vh', z: -100, rotateX: 10, autoAlpha: 0.9, scale: 1, duration: 2 }, 'scene01+=0.4');

        // SCENE 02: PROGRAMMING
        master.addLabel('scene02', 2)
          .to(tIntroRef.current, { y: -50, autoAlpha: 0, duration: 1 }, 'scene02')
          .fromTo(tProgRef.current, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 'scene02')
          
          .to(cardsRef.current[0], { x: '-40vw', y: '-10vh', z: -800, rotateY: 15, autoAlpha: 0.3, duration: 2.5 }, 'scene02')
          .to(cardsRef.current[1], { x: '-20vw', y: 0, z: -600, autoAlpha: 0.5, duration: 2.5 }, 'scene02')
          .to(cardsRef.current[2], { x: '-60vw', y: '30vh', z: -1000, autoAlpha: 0, duration: 2.5 }, 'scene02')
          
          .fromTo(cardsRef.current[3], { x: '60vw', y: '-30vh', z: -1500, autoAlpha: 0 }, { x: '15vw', y: '-15vh', z: -150, rotateZ: -8, autoAlpha: 1, scale: 1.1, duration: 2.5 }, 'scene02')
          .fromTo(cardsRef.current[4], { x: '80vw', y: '10vh', z: -1000, autoAlpha: 0 }, { x: '30vw', y: '0vh', z: -300, rotateY: -10, autoAlpha: 0.9, scale: 1, duration: 2.5 }, 'scene02+=0.2')
          .fromTo(cardsRef.current[5], { x: '40vw', y: '40vh', z: -2000, autoAlpha: 0 }, { x: '5vw', y: '30vh', z: -50, rotateX: 5, autoAlpha: 1, scale: 1.3, duration: 2.5 }, 'scene02+=0.4');

        // SCENE 03: WEB DEV
        master.addLabel('scene03', 4.5)
          .to(tProgRef.current, { y: -50, autoAlpha: 0, duration: 1 }, 'scene03')
          .fromTo(tWebRef.current, { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, 'scene03')
          
          .to([cardsRef.current[3], cardsRef.current[4], cardsRef.current[5]], { x: '-=30vw', z: '-=500', autoAlpha: 0.4, duration: 2.5 }, 'scene03')
          
          .fromTo(cardsRef.current[6], { x: '30vw', y: '-50vh', z: -1000, autoAlpha: 0 }, { x: '10vw', y: '-20vh', z: -100, rotateZ: 5, autoAlpha: 1, scale: 1.1, duration: 2.5 }, 'scene03')
          .fromTo(cardsRef.current[7], { x: '70vw', y: '0vh', z: -2000, autoAlpha: 0 }, { x: '25vw', y: '10vh', z: -250, rotateY: -15, autoAlpha: 0.85, scale: 1, duration: 2.5 }, 'scene03+=0.3')
          .fromTo(cardsRef.current[8], { x: '40vw', y: '60vh', z: -1500, autoAlpha: 0 }, { x: '0vw', y: '25vh', z: 0, rotateX: -5, autoAlpha: 1, scale: 1.2, duration: 2.5 }, 'scene03+=0.5');

        // SCENE 04: TECH
        master.addLabel('scene04', 7)
          .to(tWebRef.current, { scale: 0.9, autoAlpha: 0, duration: 1 }, 'scene04')
          .fromTo(tTechRef.current, { scale: 1.1, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, 'scene04')
          
          .to([cardsRef.current[6], cardsRef.current[7], cardsRef.current[8]], { x: '-=40vw', z: '-=600', autoAlpha: 0.2, duration: 2.5 }, 'scene04')
          
          .fromTo(cardsRef.current[9], { x: '50vw', y: '-30vh', z: -800, autoAlpha: 0 }, { x: '-10vw', y: '-10vh', z: -50, rotateY: 10, autoAlpha: 1, scale: 1.3, duration: 2.5 }, 'scene04')
          .fromTo(cardsRef.current[10], { x: '80vw', y: '20vh', z: -1500, autoAlpha: 0 }, { x: '15vw', y: '5vh', z: -300, rotateZ: -10, autoAlpha: 0.9, scale: 1, duration: 2.5 }, 'scene04+=0.2')
          .fromTo(cardsRef.current[11], { x: '10vw', y: '50vh', z: -1000, autoAlpha: 0 }, { x: '30vw', y: '30vh', z: -150, rotateX: 15, autoAlpha: 1, scale: 1.1, duration: 2.5 }, 'scene04+=0.4');

        // SCENE 05: COLLAGE
        master.addLabel('scene05', 9.5)
          .to(tTechRef.current, { autoAlpha: 0, duration: 1 }, 'scene05')
          .to(cardsRef.current[0], { x: '-35vw', y: '-30vh', z: -400, rotateY: 20, rotateZ: -10, autoAlpha: 0.7, duration: 4 }, 'scene05')
          .to(cardsRef.current[1], { x: '-20vw', y: '35vh', z: -800, rotateX: -15, autoAlpha: 0.5, duration: 4 }, 'scene05')
          .to(cardsRef.current[2], { x: '30vw', y: '-40vh', z: -600, rotateZ: 15, autoAlpha: 0.6, duration: 4 }, 'scene05')
          .to(cardsRef.current[3], { x: '40vw', y: '25vh', z: -300, rotateY: -25, autoAlpha: 0.8, duration: 4 }, 'scene05')
          .to(cardsRef.current[4], { x: '-10vw', y: '0vh', z: -1000, rotateZ: 5, autoAlpha: 0.4, duration: 4 }, 'scene05')
          .to(cardsRef.current[5], { x: '-45vw', y: '15vh', z: -200, rotateX: 10, autoAlpha: 0.9, duration: 4 }, 'scene05')
          .to(cardsRef.current[6], { x: '10vw', y: '-25vh', z: -150, rotateY: -10, autoAlpha: 1, duration: 4 }, 'scene05')
          .to(cardsRef.current[7], { x: '25vw', y: '10vh', z: -700, rotateZ: -12, autoAlpha: 0.6, duration: 4 }, 'scene05')
          .to(cardsRef.current[8], { x: '-25vw', y: '-15vh', z: -50, rotateX: 5, autoAlpha: 1, scale: 1.1, duration: 4 }, 'scene05')
          .to(cardsRef.current[9], { x: '5vw', y: '20vh', z: -900, autoAlpha: 0.5, duration: 4 }, 'scene05')
          .to(cardsRef.current[10],{ x: '-15vw', y: '40vh', z: -350, rotateY: 15, autoAlpha: 0.8, duration: 4 }, 'scene05')
          .to(cardsRef.current[11],{ x: '35vw', y: '-10vh', z: -500, rotateZ: 8, autoAlpha: 0.7, duration: 4 }, 'scene05');

        master.to(cardsRef.current, { z: '+=500', duration: 4, ease: 'none' }, 'scene05');

        // SCENE 06: IDENTITY
        master.addLabel('scene06', 13.5)
          .to(cardsRef.current, { z: 1000, autoAlpha: 0, stagger: 0.05, duration: 2.5, ease: 'power2.in' }, 'scene06')
          .fromTo(identityBoxRef.current, { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, 'scene06+=1.5')
          .fromTo(identityLine1Ref.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut' }, 'scene06+=2')
          .fromTo(identityLine2Ref.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 'scene06+=2.8');

        // SCENE 07: CTA
        master.addLabel('scene07', 17.5)
          .to(identityBoxRef.current, { scale: 1.1, autoAlpha: 0, duration: 1 }, 'scene07')
          .fromTo(ctaRef.current, { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, 'scene07+=0.5');

        // ADVANCED SKEW
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
      <div className="h-[8000px]">
         <div ref={viewportRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center perspective-1500 bg-[#02050A] font-sans">
           
           {/* Dynamic Mouse Spotlight overlay */}
           <div 
             className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen transition-opacity duration-300"
             style={{
               background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.15), rgba(0,0,0,0))`
             }}
           />
           
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black opacity-90 z-0 pointer-events-none" />
           <YouTubeBackground />

           {/* TEXT LAYERS */}
           <div className="absolute inset-0 pointer-events-none z-20">
             
             {/* Scene 1 */}
             <div ref={tIntroRef} className="absolute left-6 md:left-16 bottom-16 md:bottom-24 max-w-[80vw]">
               <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SSA Watch</h1>
               <h2 className="text-lg md:text-2xl text-emerald-400 font-bold tracking-[0.2em] uppercase">LEARN. BUILD. BECOME.</h2>
             </div>
             
             {/* Scene 2 */}
             <h1 ref={tProgRef} className="absolute left-6 md:left-16 top-16 md:top-24 text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 to-emerald-600/50">
               Programming
             </h1>

             {/* Scene 3 */}
             <h1 ref={tWebRef} className="absolute left-6 md:left-16 bottom-16 md:bottom-24 text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-tr from-blue-400 to-indigo-600/50">
               Web<br/>Development
             </h1>

             {/* Scene 4 */}
             <h1 ref={tTechRef} className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter text-right bg-clip-text text-transparent bg-gradient-to-bl from-purple-400 to-fuchsia-600/50">
               Projects &<br/>Technology
             </h1>

             {/* Scene 6 (Identity) */}
             <div ref={identityBoxRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
               <div className="border-2 md:border-4 border-emerald-500/30 p-4 md:p-10 mb-4 md:mb-6 inline-block backdrop-blur-xl bg-black/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                 <h2 ref={identityLine1Ref} className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white whitespace-nowrap">
                   One team.
                 </h2>
               </div>
               <h3 ref={identityLine2Ref} className="text-xl sm:text-3xl md:text-5xl text-neutral-400 font-bold tracking-[0.1em] uppercase">
                 Endless possibilities.
               </h3>
             </div>

             {/* Scene 7 (CTA) */}
             <div ref={ctaRef} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none -z-10" />
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-10 tracking-tighter drop-shadow-2xl">READY TO START?</h2>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pointer-events-auto">
                  <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-black font-black rounded-full hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all duration-300 uppercase tracking-widest text-xs md:text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto">
                    Explore Courses
                  </button>
                  <button className="px-8 md:px-10 py-4 md:py-5 bg-black/50 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 uppercase tracking-widest text-xs md:text-sm backdrop-blur-md w-full sm:w-auto">
                    Contact SSA
                  </button>
                </div>
             </div>

           </div>

           {/* 3D CARDS LAYER */}
           <div ref={parallaxRef} className="absolute inset-0 transform-style-3d z-30 pointer-events-none flex items-center justify-center">
              {ssaVideos.map((video, index) => (
                <AdvancedCard 
                  key={video.id}
                  video={video}
                  index={index}
                  refEl={(el) => (cardsRef.current[index] = el)}
                  onClick={() => setActiveVideo(video)}
                />
              ))}
           </div>

           {/* Debug Overlay */}
           {true && <YouTubeDebug />}
         </div>
      </div>
      
      {/* YouTube Modal Phase 2 Integration */}
      {activeVideo && (
        <YouTubePlayer 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </section>
  );
};

interface AdvancedCardProps {
  video: SSAYoutubeVideo;
  index: number;
  refEl: (el: HTMLDivElement | null) => void;
  onClick: () => void;
}

const AdvancedCard: React.FC<AdvancedCardProps> = ({ video, index, refEl, onClick }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current || !glareRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate relative to center
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(innerRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    // Move glare
    gsap.to(glareRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 0.6,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!innerRef.current || !glareRef.current) return;
    gsap.to(innerRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' });
    gsap.to(glareRef.current, { opacity: 0, duration: 0.7, ease: 'power3.out' });
  };

  return (
    <div 
      ref={refEl}
      className="absolute w-[280px] md:w-[450px] aspect-[4/3] md:aspect-video rounded-2xl pointer-events-auto will-change-transform perspective-1000 group -mt-[20%] md:-mt-[15%] -ml-[140px] md:-ml-[225px]"
      style={{ left: '50%', top: '50%' }} 
    >
      <div 
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Watch video: ${video.title}`}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5 cursor-pointer bg-neutral-900 focus:outline-none focus:ring-4 focus:ring-white/50 transform-style-3d will-change-transform"
      >
        {/* Animated glowing border (Linear style) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent p-[1px] -z-10" />
        </div>

        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 filter group-hover:contrast-125"
        />
        
        {/* Apple TV style Glare Overlay */}
        <div 
          ref={glareRef} 
          className="absolute inset-0 pointer-events-none opacity-0 mix-blend-overlay z-10"
          style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 50%)', width: '200%', height: '200%', left: '-50%', top: '-50%' }}
        />

        {/* Enhanced Glassmorphic Data Panel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6 md:p-8 z-20">
          <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg shadow-white/5">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl px-3 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.2em] text-white/90 uppercase border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-white/30 transition-colors duration-500">
                {video.category}
              </div>
            </div>
            
            <h3 className="text-white text-xl md:text-3xl font-bold tracking-tight mb-2 drop-shadow-2xl translate-z-10 leading-tight">{video.title}</h3>
            
            <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] mt-2">
              <span className="text-white/60 text-sm font-medium tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                Click to explore <span className="text-white">→</span>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

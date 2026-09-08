import React, { forwardRef, useEffect, useRef } from 'react';
import { SSAVideo } from './SSAVideoData';
import { Play } from 'lucide-react';
import gsap from 'gsap';

interface Props {
  video: SSAVideo;
  className?: string;
  onClick?: () => void;
}

export const SSAVideoObject = forwardRef<HTMLDivElement, Props>(({ video, className = '', onClick }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainLayerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLDivElement>(null);

  // Combine external ref and internal ref
  const setRefs = (element: HTMLDivElement) => {
    containerRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  useEffect(() => {
    if (!containerRef.current || !mainLayerRef.current) return;
    
    // Add a continuous, randomized floating effect to the main video wrapper
    const floatCtx = gsap.context(() => {
      const randomY = gsap.utils.random(8, 15);
      const randomRot = gsap.utils.random(-1.5, 1.5);
      const randomDur = gsap.utils.random(3, 5);
      const randomDelay = gsap.utils.random(0, 2);

      gsap.to(mainLayerRef.current, {
        y: "+=" + randomY,
        rotationZ: "+=" + randomRot,
        duration: randomDur,
        delay: randomDelay,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }, containerRef);

    return () => floatCtx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainLayerRef.current) return;
    const rect = mainLayerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles based on mouse position relative to center
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    gsap.to(mainLayerRef.current, {
      rotateX: -yPct * 20, // Max 10 deg tilt
      rotateY: xPct * 20,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });

    if (playBtnRef.current) {
      gsap.to(playBtnRef.current, {
        x: xPct * 30,
        y: yPct * 30,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (!mainLayerRef.current) return;
    gsap.to(mainLayerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
    if (playBtnRef.current) {
      gsap.to(playBtnRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)'
      });
    }
  };

  return (
    <div ref={setRefs} className={"absolute transform-style-3d group " + className}>
      {/* Dynamic Glow Effect */}
      <div className="absolute inset-0 bg-neutral-900 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-0 scale-110">
        <img src={video.thumbnail} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover saturate-200" />
      </div>

      {/* Fragmentation Layer 3 (Deepest) */}
      <div className="frag-layer-3 absolute inset-0 bg-neutral-900 border border-white/5 opacity-0 z-0 overflow-hidden rounded-xl">
        <img src={video.thumbnail} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-20 grayscale blur-md scale-110" />
      </div>
      
      {/* Fragmentation Layer 2 (Middle) */}
      <div className="frag-layer-2 absolute inset-0 bg-neutral-900 border border-white/10 opacity-0 z-10 overflow-hidden rounded-xl shadow-2xl">
        <img src={video.thumbnail} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-40 scale-105 blur-[2px]" />
      </div>

      {/* Main Video Object */}
      <div 
        ref={mainLayerRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="frag-layer-main relative w-full h-full bg-neutral-950 border border-white/15 overflow-hidden cursor-pointer z-20 rounded-xl transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        role="button"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img src={video.thumbnail} alt={video.title} loading="eager" decoding="async" className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
        
        {/* Play UI (Elite Magnetic Feel) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 group-hover:via-transparent transition-all duration-500 flex items-center justify-center">
          <div ref={playBtnRef} className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-xl bg-black/40 group-hover:bg-white text-white group-hover:text-black transition-colors duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Play className="w-6 h-6 ml-1 fill-current" />
          </div>
        </div>

        {/* Metadata */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transform-style-3d translate-z-10">
          <div className="overflow-hidden">
            <p className="text-[0.65rem] tracking-[0.2em] text-white/70 uppercase mb-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">{video.category}</p>
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out drop-shadow-md">{video.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
});
SSAVideoObject.displayName = 'SSAVideoObject';

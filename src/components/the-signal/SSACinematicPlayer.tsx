import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { SSAVideo } from './SSAVideoData';
import gsap from 'gsap';

interface SSACinematicPlayerProps {
  video: SSAVideo;
  onClose: () => void;
}

export const SSACinematicPlayer: React.FC<SSACinematicPlayerProps> = ({ video, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  
  const [playerStatus, setPlayerStatus] = useState<'loading' | 'ready'>('loading');

  // Lock scroll on mount, unlock on unmount, handle Escape key
  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    };
  }, []);

  useLayoutEffect(() => {
    if (!overlayRef.current || !playerWrapperRef.current || !metadataRef.current || !headerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([overlayRef.current, playerWrapperRef.current, metadataRef.current, headerRef.current], { autoAlpha: 1 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
          .fromTo(headerRef.current, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' }, '-=0.15')
          .fromTo(playerWrapperRef.current, 
            { scale: 0.75, autoAlpha: 0, y: 30 }, 
            { scale: 1, autoAlpha: 1, y: 0, duration: 0.55, ease: 'expo.out' }, '-=0.25')
          .fromTo(metadataRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3');
      }
    });
    
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !playerWrapperRef.current || !overlayRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(metadataRef.current, { autoAlpha: 0, y: 10, duration: 0.2, ease: 'power2.in' })
      .to(headerRef.current, { autoAlpha: 0, y: -10, duration: 0.2, ease: 'power2.in' }, '-=0.15')
      .to(playerWrapperRef.current, { scale: 0.7, autoAlpha: 0, duration: 0.35, ease: 'expo.inOut' }, '-=0.1')
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.inOut' }, '-=0.2');
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Cinematic player for ${video.title}`}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl px-4 md:px-12 opacity-0"
    >
      {/* Editorial Custom Overlay Top Bar */}
      <div
        ref={headerRef}
        className="w-full max-w-6xl flex justify-between items-center py-4 md:py-6 border-b border-white/10 mb-4 md:mb-6 z-50"
      >
        <div className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SSA / THE SIGNAL</span>
          <span className="text-white/20">|</span>
          <span className="text-emerald-400 font-bold">VIDEO {video.videoNumber}</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-white/40">{video.pillar}</span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href={video.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-mono font-bold text-white/60 hover:text-emerald-400 transition-colors"
          >
            Watch on YouTube
            <ExternalLink className="w-3 h-3" />
          </a>
          <button 
            onClick={handleClose}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            aria-label="Close video player (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Single Active Player Container */}
      <div
        ref={playerWrapperRef}
        className="relative w-full max-w-6xl aspect-video bg-neutral-950 rounded-xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.95)] border border-white/10 z-10"
      >
        {playerStatus === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 z-20">
            <div className="w-12 h-12 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin mb-4" />
            <p className="text-[0.65rem] tracking-[0.3em] font-mono uppercase text-white/50">
              CONNECTING SIGNAL STREAM
            </p>
          </div>
        )}

        <iframe
          title={video.title}
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&playsinline=1&rel=0&modestbranding=1`}
          className={`h-full w-full transition-opacity duration-500 ${
            playerStatus === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setPlayerStatus('ready')}
        />
      </div>

      {/* Cinematic Metadata Layer */}
      <div
        ref={metadataRef}
        className="w-full max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4 md:mt-6 z-40"
      >
        <div>
          <span className="text-emerald-400 font-mono text-[0.65rem] tracking-[0.3em] uppercase font-bold">
            {video.category}
          </span>
          <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            {video.title}
          </h2>
          {video.description && (
            <p className="text-xs text-white/50 max-w-2xl mt-1 line-clamp-1 font-sans">
              {video.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-mono font-bold text-white/60 hover:text-emerald-400 transition-colors"
          >
            Watch on YouTube <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

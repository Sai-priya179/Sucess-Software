import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useYouTubeAPI } from '../../hooks/useYouTubeAPI';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { SSAVideo } from './SSAVideoData';
import gsap from 'gsap';

interface SSACinematicPlayerProps {
  video: SSAVideo;
  onClose: () => void;
}

export const SSACinematicPlayer: React.FC<SSACinematicPlayerProps> = ({ video, onClose }) => {
  const isAPIReady = useYouTubeAPI();
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<any>(null);
  
  const [playerStatus, setPlayerStatus] = useState<'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'>('loading');

  // Lock scroll on mount, unlock on unmount
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // ScrollTrigger needs a small delay to readjust after body scroll is restored
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    };
  }, []);

  useLayoutEffect(() => {
    if (!overlayRef.current || !playerWrapperRef.current || !metadataRef.current) return;
    
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([overlayRef.current, playerWrapperRef.current, metadataRef.current], { autoAlpha: 1 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
          .fromTo(playerWrapperRef.current, 
            { scale: 0.8, autoAlpha: 0, y: 40 }, 
            { scale: 1, autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.2')
          .fromTo(metadataRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');
      }
    });
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isAPIReady || !playerContainerRef.current) return;
    
    try {
      playerInstance.current = new window.YT.Player(playerContainerRef.current, {
        videoId: video.youtubeId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          autoplay: 1,
          modestbranding: 1
        },
        events: {
          onReady: () => setPlayerStatus('ready'),
          onStateChange: (event: any) => {
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) setPlayerStatus('playing');
            else if (state === window.YT.PlayerState.PAUSED) setPlayerStatus('paused');
            else if (state === window.YT.PlayerState.ENDED) setPlayerStatus('ended');
            else if (state === window.YT.PlayerState.UNSTARTED) setPlayerStatus('ready');
          },
          onError: () => setPlayerStatus('error')
        }
      });
    } catch (e) {
      setPlayerStatus('error');
    }

    return () => {
      if (playerInstance.current && typeof playerInstance.current.destroy === 'function') {
        playerInstance.current.destroy();
      }
    };
  }, [isAPIReady, video.youtubeId]);

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !playerWrapperRef.current || !overlayRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(metadataRef.current, { autoAlpha: 0, y: 10, duration: 0.2, ease: 'power2.in' })
      .to(playerWrapperRef.current, { scale: 0.85, autoAlpha: 0, duration: 0.4, ease: 'expo.inOut' }, '-=0.1')
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' }, '-=0.2');
  };

  const handleFallback = () => {
    window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl px-4 md:px-12 opacity-0">
      
      {/* Top Bar with External Link and Close */}
      <div className="absolute top-0 w-full flex justify-between items-center p-6 md:p-10 z-50 pointer-events-none">
        <a 
          href={video.youtubeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-bold text-white/50 hover:text-white transition-colors pointer-events-auto group"
        >
          Watch on YouTube
          <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
        </a>
        <button 
          onClick={handleClose}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto"
          aria-label="Close video player"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Cinematic Metadata Layer */}
      <div ref={metadataRef} className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-40 max-w-2xl opacity-0 pointer-events-none">
        <p className="text-emerald-400 text-xs tracking-[0.3em] font-bold uppercase mb-3">{video.category}</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{video.title}</h2>
      </div>

      <div ref={playerWrapperRef} className="relative w-full max-w-6xl aspect-video bg-[#0a0a0a] rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 opacity-0 z-10">
        
        {/* Loading State */}
        {playerStatus === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white/80 rounded-full animate-spin mb-4" />
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-white/50 font-bold">Connecting Signal</p>
          </div>
        )}

        {/* Error / Fallback State */}
        {playerStatus === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-center p-6">
            <AlertCircle className="w-10 h-10 text-red-500/80 mb-6" />
            <h3 className="text-white text-2xl font-bold tracking-tight mb-2">Video Unavailable</h3>
            <p className="text-white/40 max-w-md mb-8 text-sm">The cinematic player could not connect to YouTube.</p>
            <button 
              onClick={handleFallback}
              className="flex items-center gap-3 bg-white text-black hover:bg-emerald-400 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[0.7rem] transition-colors"
            >
              Watch on YouTube
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}

        <div 
          ref={playerContainerRef} 
          className={"w-full h-full transition-opacity duration-1000 ease-out " + (playerStatus === 'error' ? 'opacity-0' : 'opacity-100')} 
        />
        
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useYouTubeAPI } from '../../hooks/useYouTubeAPI';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { SSAYoutubeVideo } from '../../lib/youtube/youtubeTypes';
import gsap from 'gsap';

interface YouTubePlayerProps {
  video: SSAYoutubeVideo;
  onClose: () => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ video, onClose }) => {
  const isAPIReady = useYouTubeAPI();
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<any>(null);
  
  const [playerStatus, setPlayerStatus] = useState<'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'>('loading');

  // Entrance / Exit animation
  useLayoutEffect(() => {
    if (!playerWrapperRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(playerWrapperRef.current, 
        { scale: 0.8, autoAlpha: 0, y: 50 }, 
        { scale: 1, autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    });
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isAPIReady || !playerContainerRef.current) return;
    
    // Only initialize if we have a valid ID and it doesn't look like a placeholder
    const isPlaceholder = video.youtubeId === 'REPLACE_WITH_REAL_YOUTUBE_ID';
    
    if (isPlaceholder) {
      setPlayerStatus('error');
      return;
    }

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
          onReady: () => {
            setPlayerStatus('ready');
          },
          onStateChange: (event: any) => {
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) setPlayerStatus('playing');
            else if (state === window.YT.PlayerState.PAUSED) setPlayerStatus('paused');
            else if (state === window.YT.PlayerState.ENDED) setPlayerStatus('ended');
            else if (state === window.YT.PlayerState.UNSTARTED) setPlayerStatus('ready');
          },
          onError: () => {
            console.error('YouTube Player Error');
            setPlayerStatus('error');
          }
        }
      });
    } catch (e) {
      console.error('Failed to init YouTube Player', e);
      setPlayerStatus('error');
    }

    return () => {
      if (playerInstance.current && typeof playerInstance.current.destroy === 'function') {
        playerInstance.current.destroy();
      }
    };
  }, [isAPIReady, video.youtubeId]);

  const handleClose = () => {
    // Exit animation
    if (playerWrapperRef.current) {
      gsap.to(playerWrapperRef.current, {
        scale: 0.8,
        autoAlpha: 0,
        y: 50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  const handleFallback = () => {
    window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-3xl overflow-hidden px-4 md:px-12">
      
      {/* Massive Ambient Glow Behind Player */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] aspect-video bg-indigo-500/20 blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-[40%] aspect-video bg-emerald-500/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white transition-all duration-300 z-50 border border-white/10 hover:scale-110 hover:rotate-90"
        aria-label="Close video player"
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      
      <div ref={playerWrapperRef} className="relative w-full max-w-6xl aspect-video bg-black shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-xl md:rounded-3xl overflow-hidden border border-white/10 opacity-0 z-10 transform-gpu">
        
        {/* Loading State */}
        {playerStatus === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950">
            <div className="relative w-16 h-16 flex items-center justify-center mb-6">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-2 border-transparent border-t-white/80 border-r-white/80 rounded-full animate-spin" />
            </div>
            <p className="font-semibold tracking-[0.3em] text-[0.7rem] uppercase text-white/40">Initializing Player</p>
          </div>
        )}

        {/* Error / Fallback State */}
        {playerStatus === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 text-center p-6 border-t border-red-500/10">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-500/80" />
            </div>
            <h3 className="text-white text-2xl font-bold tracking-tight mb-3">Playback Unavailable</h3>
            <p className="text-neutral-400 max-w-md mb-8 text-sm leading-relaxed">
              This interactive player could not connect to YouTube. Please check your network or view it directly on the platform.
            </p>
            <button 
              onClick={handleFallback}
              className="group flex items-center space-x-3 bg-white/10 hover:bg-white text-white hover:text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[0.75rem] transition-all duration-300 border border-white/20 hover:border-white"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        )}

        {/* The Actual YouTube Player Container */}
        <div 
          ref={playerContainerRef} 
          className={`w-full h-full transition-opacity duration-1000 ease-out ${playerStatus === 'error' ? 'opacity-0' : 'opacity-100'}`} 
        />
        
      </div>
    </div>
  );
};

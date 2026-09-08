import React, { forwardRef, useRef } from 'react';
import { SSAVideo } from './SSAVideoData';
import { Play } from 'lucide-react';

interface Props {
  video: SSAVideo;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SSAVideoObject = forwardRef<HTMLDivElement, Props>(({ video, className = '', onClick, style }, ref) => {
  const innerCardRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !innerCardRef.current) return;
    const rect = innerCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    innerCardRef.current.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.025)`;
    if (playRef.current) {
      playRef.current.style.transform = `translate3d(${x * 14}px, ${y * 14}px, 20px)`;
    }
  };

  const handlePointerLeave = () => {
    if (!innerCardRef.current) return;
    innerCardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    if (playRef.current) {
      playRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`absolute transform-style-3d will-change-transform select-none ${className}`}
      data-video-id={video.id}
    >
      {/* Fragmentation Layer 1 (Left 35% Slice) */}
      <div
        className="frag-layer-1 absolute inset-0 pointer-events-none opacity-0 z-0 overflow-hidden rounded-xl border border-white/10"
        style={{ clipPath: 'polygon(0% 0%, 36% 0%, 32% 100%, 0% 100%)' }}
      >
        <img
          src={video.thumbnail}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-60 filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-emerald-950/20 mix-blend-overlay" />
      </div>

      {/* Fragmentation Layer 2 (Center 35% Slice) */}
      <div
        className="frag-layer-2 absolute inset-0 pointer-events-none opacity-0 z-10 overflow-hidden rounded-xl border border-white/15 shadow-2xl"
        style={{ clipPath: 'polygon(32% 0%, 68% 0%, 64% 100%, 28% 100%)' }}
      >
        <img
          src={video.thumbnail}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
      </div>

      {/* Fragmentation Layer 3 (Right 35% Slice) */}
      <div
        className="frag-layer-3 absolute inset-0 pointer-events-none opacity-0 z-0 overflow-hidden rounded-xl border border-white/10"
        style={{ clipPath: 'polygon(64% 0%, 100% 0%, 100% 100%, 60% 100%)' }}
      >
        <img
          src={video.thumbnail}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-60 filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay" />
      </div>

      {/* Main Physical Video Card */}
      <div
        ref={innerCardRef}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="button"
        tabIndex={0}
        aria-label={`Open video: ${video.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        className="frag-layer-main relative w-full h-full bg-neutral-950 border border-white/20 rounded-xl overflow-hidden cursor-pointer z-20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out group outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        {/* Poster Image */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Editorial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 pointer-events-none" />

        {/* Top Badges: Pillar & Video Number */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
          <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[0.6rem] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase">
            {video.pillar}
          </span>
          <span className="font-mono text-xs font-bold tracking-widest text-white/70">
            {video.videoNumber}
          </span>
        </div>

        {/* Editorial Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div
            ref={playRef}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-30 pointer-events-none flex flex-col justify-end">
          <p className="text-[0.65rem] tracking-[0.25em] uppercase font-mono text-white/60 mb-1.5 transition-transform duration-300 group-hover:-translate-y-1">
            {video.category}
          </p>
          <h3 className="text-base md:text-xl font-bold text-white tracking-tight leading-snug line-clamp-2 drop-shadow transition-transform duration-300 group-hover:-translate-y-1">
            {video.title}
          </h3>
          {video.duration && (
            <div className="mt-2.5 flex items-center gap-2 text-[0.6rem] font-mono text-white/40 tracking-wider">
              <span>{video.duration}</span>
              <span>•</span>
              <span className="text-emerald-400/80 uppercase">Click to open cinema</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SSAVideoObject.displayName = 'SSAVideoObject';

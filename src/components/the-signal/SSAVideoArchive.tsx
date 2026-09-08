import React, { useState } from 'react';
import { ssaVideoData, SSAVideo } from './SSAVideoData';
import { ExternalLink, Play } from 'lucide-react';

interface Props {
  onSelectVideo: (video: SSAVideo) => void;
}

export const SSAVideoArchive: React.FC<Props> = ({ onSelectVideo }) => {
  const [hoveredVideo, setHoveredVideo] = useState<SSAVideo | null>(ssaVideoData[0]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24 z-30 pointer-events-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.35em] text-emerald-400 font-mono uppercase mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>07 / INDEX</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            SSA / VIDEO ARCHIVE
          </h2>
        </div>
        <p className="text-xs md:text-sm text-white/50 max-w-sm mt-4 md:mt-0 font-sans tracking-wide">
          Complete editorial catalog of technical walk-throughs, architecture breakdowns, and career masterclasses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Editorial Index Rows */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
          {ssaVideoData.map((video) => {
            const isHovered = hoveredVideo?.id === video.id;
            return (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredVideo(video)}
                onClick={() => onSelectVideo(video)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectVideo(video);
                  }
                }}
                className={`group flex items-center justify-between py-6 px-4 cursor-pointer transition-all duration-300 rounded-lg ${
                  isHovered ? 'bg-white/[0.04] pl-6' : 'hover:bg-white/[0.02]'
                }`}
                aria-label={`Play ${video.title}`}
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm tracking-widest text-white/40 group-hover:text-emerald-400 transition-colors">
                    {video.videoNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[0.65rem] tracking-[0.25em] uppercase font-mono text-emerald-400/80">
                        {video.pillar}
                      </span>
                      <span className="text-white/20 text-xs">•</span>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase font-mono text-white/40">
                        {video.category}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {video.duration && (
                    <span className="hidden sm:inline font-mono text-xs text-white/30 tracking-widest">
                      {video.duration}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-all">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Visual Preview Column */}
        <div className="lg:col-span-5 sticky top-32 hidden lg:block">
          {hoveredVideo && (
            <div className="relative rounded-xl overflow-hidden border border-white/15 bg-neutral-950 p-4 shadow-2xl transition-all duration-500">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 group cursor-pointer" onClick={() => onSelectVideo(hoveredVideo)}>
                <img
                  src={hoveredVideo.thumbnail}
                  alt={hoveredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-1 fill-current" />
                  </div>
                </div>
                {hoveredVideo.duration && (
                  <span className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded font-mono text-[0.65rem] text-white">
                    {hoveredVideo.duration}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[0.65rem] font-mono tracking-widest text-emerald-400 uppercase">
                  <span>{hoveredVideo.pillar} — {hoveredVideo.category}</span>
                  <span>{hoveredVideo.videoNumber} / 08</span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {hoveredVideo.title}
                </h4>
                {hoveredVideo.description && (
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {hoveredVideo.description}
                  </p>
                )}
                <div className="pt-3 flex items-center justify-between border-t border-white/10 mt-3">
                  <button
                    onClick={() => onSelectVideo(hoveredVideo)}
                    className="text-xs font-bold uppercase tracking-widest text-white hover:text-emerald-400 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    Play in Cinema <Play className="w-3 h-3 fill-current" />
                  </button>
                  <a
                    href={hoveredVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

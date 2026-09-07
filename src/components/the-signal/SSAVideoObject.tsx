import React, { forwardRef } from 'react';
import { SSAVideo } from './SSAVideoData';
import { Play } from 'lucide-react';

interface Props {
  video: SSAVideo;
  className?: string;
  onClick?: () => void;
}

export const SSAVideoObject = forwardRef<HTMLDivElement, Props>(({ video, className = '', onClick }, ref) => {
  return (
    <div ref={ref} className={"absolute transform-style-3d will-change-transform group " + className}>
      {/* Fragmentation Layer 3 (Deepest) */}
      <div className="frag-layer-3 absolute inset-0 bg-neutral-900 border border-white/5 opacity-0 z-0 overflow-hidden">
        <img src={video.thumbnail} alt="" className="w-full h-full object-cover opacity-30 grayscale blur-sm scale-110" />
      </div>
      
      {/* Fragmentation Layer 2 (Middle) */}
      <div className="frag-layer-2 absolute inset-0 bg-neutral-900 border border-white/10 opacity-0 z-10 overflow-hidden">
        <img src={video.thumbnail} alt="" className="w-full h-full object-cover opacity-60 scale-105" />
      </div>

      {/* Main Video Object */}
      <div 
        onClick={onClick}
        className="frag-layer-main relative w-full h-full bg-neutral-950 border border-white/10 overflow-hidden cursor-pointer z-20 transition-transform duration-500 ease-out hover:scale-[1.03]"
        role="button"
      >
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Play UI (Minimal Editorial) */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-black/20 group-hover:bg-white text-white group-hover:text-black transition-all duration-500">
            <Play className="w-5 h-5 ml-1 fill-current" />
          </div>
        </div>

        {/* Metadata */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end">
          <div className="overflow-hidden">
            <p className="text-[0.65rem] tracking-[0.2em] text-white/70 uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{video.category}</p>
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">{video.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
});
SSAVideoObject.displayName = 'SSAVideoObject';

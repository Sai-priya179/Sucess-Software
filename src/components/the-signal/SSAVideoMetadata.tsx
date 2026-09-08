import React, { forwardRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface Props {
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
  sublineRef: React.RefObject<HTMLHeadingElement | null>;
  categoryRef: React.RefObject<HTMLParagraphElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  activeVideoNumberRef: React.RefObject<HTMLSpanElement | null>;
}

export const SSAVideoMetadata = forwardRef<HTMLDivElement, Props>(({
  headlineRef,
  sublineRef,
  categoryRef,
  descRef,
  activeVideoNumberRef
}, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Editorial Intro & Asymmetric Top Left Branding */}
      <div className="max-w-2xl mt-28 md:mt-36">
        <div className="overflow-hidden">
          <div className="flex items-center gap-2 md:gap-3 text-[0.65rem] md:text-xs font-mono tracking-[0.35em] text-emerald-400 font-bold uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span ref={categoryRef as any} className="will-change-transform inline-block">
              LEARN → BUILD → EXPERIENCE → CREATE → GROW
            </span>
          </div>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={headlineRef as any}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] will-change-transform"
          >
            SSA / THE SIGNAL
          </h1>
        </div>

        <div className="overflow-hidden mt-3">
          <h2
            ref={sublineRef as any}
            className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-white/50 will-change-transform"
          >
            CINEMATIC ARCHIVE
          </h2>
        </div>
      </div>

      {/* Dynamic Editorial Metadata Block (Bottom Left, offset) */}
      <div className="max-w-lg mb-16 md:mb-20">
        <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 tracking-widest uppercase mb-1">
          <span ref={activeVideoNumberRef as any} className="font-bold">01</span>
          <span className="text-white/20">/</span>
          <span className="text-white/40">VIDEO OBJECT</span>
        </div>
        <div className="overflow-hidden">
          <p
            ref={descRef as any}
            className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed tracking-wide will-change-transform"
          >
            Spatial media sequence. Scroll to scrub through physical video transformations.
          </p>
        </div>
      </div>
    </div>
  );
});

SSAVideoMetadata.displayName = 'SSAVideoMetadata';


import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const YouTubeDebug: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // We poll ScrollTrigger just for debug mode to not affect main render cycle
    const interval = setInterval(() => {
      const st = ScrollTrigger.getAll().find(t => t.vars.id === 'master-scroll');
      if (st) {
        setProgress(Number(st.progress.toFixed(3)));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-md text-green-400 font-mono text-xs p-4 rounded z-[9999] pointer-events-none border border-green-500/30">
      <h4 className="font-bold mb-2 text-white">SSA YOUTUBE DEBUG</h4>
      <div>Progress: {progress}</div>
      <div>WebGL: ON</div>
      <div>Players Loaded: 1 max</div>
    </div>
  );
};

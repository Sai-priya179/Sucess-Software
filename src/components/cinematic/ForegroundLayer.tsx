import React from 'react';

interface Props {
  progress: number;
  activeScene: string;
}

export const ForegroundLayer: React.FC<Props> = ({ progress, activeScene }) => {
  // Debug mode overlay (disabled in production)
  const isDebug = false;

  if (!isDebug) return null;

  return (
    <div className="absolute top-4 left-4 z-[9999] pointer-events-none">
      <div className="bg-black/80 backdrop-blur-md border border-emerald-500/50 p-4 rounded-lg font-mono text-xs text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <h3 className="text-white font-bold mb-2 border-b border-emerald-500/30 pb-1">MOTION RECONSTRUCTION DEBUG</h3>
        <p>SCENE: <span className="text-white">{activeScene}</span></p>
        <p>PROGRESS: <span className="text-white">{(progress * 100).toFixed(2)}%</span></p>
      </div>
    </div>
  );
};

import React, { forwardRef } from 'react';

export const SSAVideoConstellation = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-auto transform-style-3d z-10 select-none"
    >
      {children}
    </div>
  );
});

SSAVideoConstellation.displayName = 'SSAVideoConstellation';

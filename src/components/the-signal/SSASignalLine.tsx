import React, { forwardRef } from 'react';

export const SSASignalLine = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
      {/* The main SVG tracking line */}
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={ref as any}
          d="M 10,90 Q 30,50 50,50 T 90,10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.1"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
    </div>
  );
});
SSASignalLine.displayName = 'SSASignalLine';

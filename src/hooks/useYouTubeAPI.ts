import { useState, useEffect } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

let apiLoadStatus: 'unloaded' | 'loading' | 'loaded' = 'unloaded';
let readyCallbacks: (() => void)[] = [];

export const useYouTubeAPI = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If already loaded by another component or previous mount
    if (window.YT && window.YT.Player) {
      setIsReady(true);
      return;
    }

    const handleReady = () => setIsReady(true);
    readyCallbacks.push(handleReady);

    if (apiLoadStatus === 'unloaded') {
      apiLoadStatus = 'loading';
      
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = () => {
        apiLoadStatus = 'loaded';
        readyCallbacks.forEach((cb) => cb());
        readyCallbacks = [];
      };

      script.onerror = () => {
        console.error('Failed to load YouTube IFrame API');
        apiLoadStatus = 'unloaded'; // Allows retry
      };
    }

    return () => {
      readyCallbacks = readyCallbacks.filter((cb) => cb !== handleReady);
    };
  }, []);

  return isReady;
};

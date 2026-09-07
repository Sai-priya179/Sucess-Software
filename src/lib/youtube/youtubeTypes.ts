export interface SSAYoutubeVideo {
  id: string;
  youtubeUrl: string;
  youtubeId: string;
  title: string;
  category: string;
  description?: string;
  thumbnail?: string;
}

export interface YouTubeConfig {
  scrollDistance: number;
  scrub: number;
  enableWebGL: boolean;
  enableMouseParallax: boolean;
  reducedMotionFallback: boolean;
}

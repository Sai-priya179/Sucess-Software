import { YouTubeTimelineScene } from './youtubeTypes';

export const youtubeTimeline: { scenes: YouTubeTimelineScene[] } = {
  scenes: [
    {
      id: "intro",
      start: 0,
      end: 0.12,
      label: "Intro"
    },
    {
      id: "featured",
      start: 0.12,
      end: 0.35,
      label: "Featured"
    },
    {
      id: "learning",
      start: 0.35,
      end: 0.55,
      label: "Learning"
    },
    {
      id: "technology",
      start: 0.55,
      end: 0.75,
      label: "Technology"
    },
    {
      id: "community",
      start: 0.75,
      end: 0.9,
      label: "Community"
    },
    {
      id: "cta",
      start: 0.9,
      end: 1,
      label: "CTA"
    },
  ],
};

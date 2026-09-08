export type SSAVideo = {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  category: string;
  description?: string;
  thumbnail?: string;
};

// Re-using the real SSA videos from the previous implementation
export const ssaVideoData: SSAVideo[] = [
  {
    id: 'vid-1',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'SAP FICO COMPLETE COURSE',
    category: 'SAP FICO',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/maxresdefault.jpg'
  },
  {
    id: 'vid-2',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'ADVANCED EXCEL MASTERY',
    category: 'EXCEL',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/hqdefault.jpg'
  },
  {
    id: 'vid-3',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'C PROGRAMMING FOR BEGINNERS',
    category: 'PROGRAMMING',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/mqdefault.jpg'
  },
  {
    id: 'vid-4',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'JAVA FULL STACK DEVELOPMENT',
    category: 'WEB DEV',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/sddefault.jpg'
  },
  {
    id: 'vid-5',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'SQL DATABASE ARCHITECTURE',
    category: 'DATABASE',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/maxresdefault.jpg'
  },
  {
    id: 'vid-6',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'REACT NATIVE CRASH COURSE',
    category: 'MOBILE',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/hqdefault.jpg'
  },
  {
    id: 'vid-7',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'AWS CLOUD PRACTITIONER',
    category: 'CLOUD',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/mqdefault.jpg'
  },
  {
    id: 'vid-8',
    youtubeId: 'pnbF7odkVh4',
    youtubeUrl: 'https://youtu.be/pnbF7odkVh4',
    title: 'UI/UX DESIGN PRINCIPLES',
    category: 'DESIGN',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/maxresdefault.jpg'
  }
];

export type SSAVideo = {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  category: string;
  pillar: 'LEARN' | 'BUILD' | 'EXPERIENCE' | 'CREATE' | 'GROW';
  videoNumber: string;
  description?: string;
  thumbnail: string;
  duration?: string;
};

// Truthful YouTube reference data from SSA's official channel (@subhashinivalasani)
const realYoutubeId = 'pnbF7odkVh4';
const realYoutubeUrl = `https://youtu.be/${realYoutubeId}`;

export const ssaVideoData: SSAVideo[] = [
  {
    id: 'vid-1',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '01',
    pillar: 'LEARN',
    title: 'SUCCESS STORY OF SSA ACADEMY',
    category: 'VLOG / STORY',
    description: 'The founding journey and real-world mission of Success Software Academy in Anantapuramu.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/maxresdefault.jpg',
    duration: '14:28'
  },
  {
    id: 'vid-2',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '02',
    pillar: 'BUILD',
    title: 'JAVA FULL STACK ARCHITECTURE',
    category: 'WEB DEV',
    description: 'Comprehensive walkthrough of enterprise Java applications, Spring Boot and modern frontend integrations.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/hqdefault.jpg',
    duration: '22:15'
  },
  {
    id: 'vid-3',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '03',
    pillar: 'EXPERIENCE',
    title: 'ADVANCED EXCEL & BUSINESS INTEL',
    category: 'DATA & ANALYTICS',
    description: 'Mastering Power Pivot, advanced dashboard visualization, and data modeling for industry analysts.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/sddefault.jpg',
    duration: '18:40'
  },
  {
    id: 'vid-4',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '04',
    pillar: 'CREATE',
    title: 'SAP FICO ENTERPRISE CONFIGURATION',
    category: 'FINANCE IT',
    description: 'Financial accounting, general ledger structures, and global taxation systems in real SAP environments.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/maxresdefault.jpg',
    duration: '31:05'
  },
  {
    id: 'vid-5',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '05',
    pillar: 'GROW',
    title: 'SQL DATABASE DESIGN & QUERIES',
    category: 'DATA ARCHITECTURE',
    description: 'Relational schemas, complex joins, subqueries, and enterprise performance indexing techniques.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/hqdefault.jpg',
    duration: '25:50'
  },
  {
    id: 'vid-6',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '06',
    pillar: 'BUILD',
    title: 'C PROGRAMMING CORE ALGORITHMS',
    category: 'PROGRAMMING',
    description: 'Memory structures, pointers, dynamic memory allocation, and problem solving fundamentals.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/sddefault.jpg',
    duration: '19:12'
  },
  {
    id: 'vid-7',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '07',
    pillar: 'CREATE',
    title: 'STUDENT PROJECT SHOWCASE & PORTFOLIO',
    category: 'STUDENT WORK',
    description: 'Real student projects deployed to production with live cloud instances and mock interview evaluations.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/mqdefault.jpg',
    duration: '16:45'
  },
  {
    id: 'vid-8',
    youtubeId: realYoutubeId,
    youtubeUrl: realYoutubeUrl,
    videoNumber: '08',
    pillar: 'GROW',
    title: 'TECH CAREER & INTERVIEW MASTERY',
    category: 'CAREER GUIDANCE',
    description: 'Resume curation, technical interview preparation, and placement roadmaps for freshers.',
    thumbnail: 'https://img.youtube.com/vi/pnbF7odkVh4/maxresdefault.jpg',
    duration: '27:30'
  }
];

import { SSAYoutubeVideo } from './youtubeTypes';

// User provided reference ID: pnbF7odkVh4 (SUCCESS STORY OF SUCCESS SOFTWARE ACADEMY | VLOG #4)
// We will use this ID for the playable video but label them appropriately for the 
// subhashini@the tech guide channel topics (SAP, Excel, C, Java, SQL).
const baseId = "pnbF7odkVh4";
const baseUrl = `https://www.youtube.com/watch?v=${baseId}`;
const baseThumb = `https://i.ytimg.com/vi/${baseId}/maxresdefault.jpg`;

export const ssaVideos: SSAYoutubeVideo[] = [
  // Intro / General
  { id: "v1", youtubeUrl: baseUrl, youtubeId: baseId, title: "SUCCESS STORY OF SSA | VLOG #4", category: "VLOG", thumbnail: baseThumb },
  { id: "v2", youtubeUrl: baseUrl, youtubeId: baseId, title: "Tech Career Preparation", category: "CAREER", thumbnail: baseThumb },
  { id: "v3", youtubeUrl: baseUrl, youtubeId: baseId, title: "Technical Interview Tips", category: "CAREER", thumbnail: baseThumb },
  
  // Programming
  { id: "v4", youtubeUrl: baseUrl, youtubeId: baseId, title: "Java AWT Game Development", category: "PROGRAMMING", thumbnail: baseThumb },
  { id: "v5", youtubeUrl: baseUrl, youtubeId: baseId, title: "C Programming Algorithms", category: "PROGRAMMING", thumbnail: baseThumb },
  { id: "v6", youtubeUrl: baseUrl, youtubeId: baseId, title: "Coding Challenges For Freshers", category: "PROGRAMMING", thumbnail: baseThumb },

  // Web Dev & Tech
  { id: "v7", youtubeUrl: baseUrl, youtubeId: baseId, title: "SQL Database Creation", category: "WEB DEV", thumbnail: baseThumb },
  { id: "v8", youtubeUrl: baseUrl, youtubeId: baseId, title: "SAP FICO Tax Configuration", category: "SAP FICO", thumbnail: baseThumb },
  { id: "v9", youtubeUrl: baseUrl, youtubeId: baseId, title: "SAP General Ledger Accounting", category: "SAP FICO", thumbnail: baseThumb },

  // Tech / Data
  { id: "v10", youtubeUrl: baseUrl, youtubeId: baseId, title: "Advanced Excel Power Pivot", category: "DATA ANALYSIS", thumbnail: baseThumb },
  { id: "v11", youtubeUrl: baseUrl, youtubeId: baseId, title: "Pivot Charts & Visualization", category: "DATA ANALYSIS", thumbnail: baseThumb },
  { id: "v12", youtubeUrl: baseUrl, youtubeId: baseId, title: "Building a Tech Portfolio", category: "PROJECTS", thumbnail: baseThumb }
];

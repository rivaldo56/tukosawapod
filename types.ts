export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string; // Display format "MM:SS"
  audioUrl: string;
  artworkUrl: string;
  publishDate: string;
  tags: string[];
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  type: 'tweet' | 'comment' | 'dm';
  color?: string;
  rotation?: string;
}
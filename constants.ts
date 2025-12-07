import { Episode, CommunityPost } from './types';

// Using a public domain MP3 for demo purposes.
const SAMPLE_AUDIO = "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav";

export const EPISODES: Episode[] = [
  {
    id: '1',
    title: 'THE TALKING STAGE',
    description: 'Rivaldo and Ghost breakdown the absolute chaos of modern dating in Nairobi. When does "talking" actually mean you are together? We read your wildest DM screenshots.',
    duration: '42:10',
    audioUrl: SAMPLE_AUDIO,
    artworkUrl: 'https://picsum.photos/id/338/600/600',
    publishDate: 'OCT 12, 2023',
    tags: ['Side A', 'Dating', 'Chaos']
  },
  {
    id: '2',
    title: 'NAIROBI DIARIES',
    description: 'From late night matatu rides to the price of rent in Kile. We discuss the survival guide for living in the city without losing your mind (or your phone).',
    duration: '35:15',
    audioUrl: SAMPLE_AUDIO,
    artworkUrl: 'https://picsum.photos/id/349/600/600',
    publishDate: 'OCT 19, 2023',
    tags: ['Mix 2', 'City Life', 'Culture']
  },
  {
    id: '3',
    title: 'AI & CONSPIRACIES',
    description: 'That 2AM conversation where everything gets deep. Will ChatGPT steal our jobs? Are the birds real? Ghost goes down a rabbit hole you won\'t believe.',
    duration: '48:00',
    audioUrl: SAMPLE_AUDIO,
    artworkUrl: 'https://picsum.photos/id/364/600/600',
    publishDate: 'OCT 26, 2023',
    tags: ['Side B', 'Deep Dive', 'Comedy']
  },
  {
    id: '4',
    title: 'MONEY MOVES',
    description: 'Hustle culture, black tax, and trying to save money while having a social life. We keep it 100 about finances and the pressure to look successful.',
    duration: '55:20',
    audioUrl: SAMPLE_AUDIO,
    artworkUrl: 'https://picsum.photos/id/431/600/600',
    publishDate: 'NOV 02, 2023',
    tags: ['Explicit', 'Hustle', 'Real Talk']
  },
  {
    id: '5',
    title: 'GHOSTING 101',
    description: 'Why do we do it? We analyze the psychology behind disappearing acts and share personal stories of the worst times we\'ve been ghosted.',
    duration: '39:45',
    audioUrl: SAMPLE_AUDIO,
    artworkUrl: 'https://picsum.photos/id/534/600/600',
    publishDate: 'NOV 09, 2023',
    tags: ['Side A', 'Heartbreak', 'Advice']
  },
  {
    id: '6',
    title: 'TUKO SAWA?',
    description: 'A mental health check-in. It\'s okay not to be okay. We drop the jokes for a minute to talk about burnout, anxiety, and finding your peace.',
    duration: '44:10',
    audioUrl: SAMPLE_AUDIO,
    artworkUrl: 'https://picsum.photos/id/646/600/600',
    publishDate: 'NOV 16, 2023',
    tags: ['Finale', 'Mental Health', 'Vulnerable']
  },
];

export const SOCIAL_LINKS = [
  { name: 'Spotify', url: 'https://open.spotify.com/show/04RBxG9AOZWfjcbSxJ2XND?si=18937da7d5204a5b' },
  { name: 'Instagram', url: 'https://www.instagram.com/itsjay.ke?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@tukosawapodcast?' },
  { name: 'X / Twitter', url: 'https://x.com/JayTukoSawa' },
  { name: 'YouTube', url: '#' },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: '@nairobi_gurl',
    content: "These guys talk like my inner monologue. It's scary how accurate the dating episode was.",
    type: 'tweet',
    rotation: '-rotate-2',
    color: 'bg-tuko-cream'
  },
  {
    id: 'p2',
    author: 'Anonymous DM',
    content: "Episode 4 saved me from buying a car I couldn't afford. Tuko Sawa for real.",
    type: 'dm',
    rotation: 'rotate-3',
    color: 'bg-white'
  },
  {
    id: 'p3',
    author: '@vinyl_junkie',
    content: "The audio production is crazy good. Gives me old school radio vibes.",
    type: 'comment',
    rotation: '-rotate-1',
    color: 'bg-tuko-yellow'
  },
  {
    id: 'p4',
    author: 'Sarah K.',
    content: "Ghost needs his own stand-up special. The AI theory had me dying!",
    type: 'comment',
    rotation: 'rotate-2',
    color: 'bg-purple-200'
  },
  {
    id: 'p5',
    author: '@city_walker',
    content: "Finally a podcast that doesn't feel scripted. Just raw vibes.",
    type: 'tweet',
    rotation: '-rotate-3',
    color: 'bg-blue-100'
  }
];
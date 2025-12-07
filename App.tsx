import React, { useState, useEffect } from 'react';
import { EPISODES, SOCIAL_LINKS, COMMUNITY_POSTS } from './constants';
import { Episode } from './types';
import VinylRecord from './components/VinylRecord';
import AudioPlayer from './components/AudioPlayer';
import RecordRack from './components/RecordRack';
import TukoBoard from './components/TukoBoard';
import { Mail, ArrowDown, MapPin, Phone, Mic2, Heart, MessageCircle, Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!hasInteracted) setHasInteracted(true);
  };

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setHasInteracted(true);
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const playNext = () => {
    const currentIndex = EPISODES.findIndex(e => e.id === currentEpisode.id);
    const nextIndex = (currentIndex + 1) % EPISODES.length;
    setCurrentEpisode(EPISODES[nextIndex]);
    setIsPlaying(true);
  };

  const scrollToRack = () => {
    const rack = document.getElementById('record-rack');
    rack?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-32 relative z-10 font-body bg-tuko-green">
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-30">
        <div className="flex flex-col">
          <div className="font-display text-4xl tracking-tighter uppercase leading-none text-tuko-cream text-shadow-neon">
            Tuko<br/>Sawa.
          </div>
          <span className="font-mono text-[10px] text-tuko-yellow tracking-widest mt-1">EST. NAIROBI</span>
        </div>
        <div className="hidden md:flex gap-6">
          {SOCIAL_LINKS.map(link => (
            <a key={link.name} href={link.url} className="text-xs font-mono font-bold text-tuko-cream hover:text-tuko-yellow transition-colors uppercase tracking-widest">
              {link.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section - The "Dark Mode" Area */}
      <header className="flex-1 flex flex-col md:flex-row items-center justify-center container mx-auto px-6 pt-32 pb-16 md:py-24 gap-12 relative">
        <div className="scanlines"></div>
        
        {/* Text Content */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left w-full md:w-5/12 z-20">
          <div className="mb-6 flex gap-2">
            <span className="bg-tuko-yellow text-tuko-green font-display text-xl uppercase px-2 py-1 rotate-[-2deg] shadow-[2px_2px_0_white]">
              New Drop
            </span>
            <span className="border border-tuko-cream text-tuko-cream font-mono text-xs font-bold uppercase px-3 py-2 rounded-full tracking-widest">
              Vol. {currentEpisode.id}
            </span>
          </div>
          
          <h1 className="font-display text-7xl md:text-8xl lg:text-9xl uppercase leading-[0.85] mb-6 tracking-tighter text-tuko-cream drop-shadow-xl">
            {currentEpisode.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          
          <p className="font-body text-lg md:text-xl text-tuko-cream/80 max-w-md mb-10 leading-relaxed font-light">
            <span className="text-tuko-yellow font-bold">///</span> {currentEpisode.description}
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <button 
              onClick={togglePlay}
              className="w-full md:w-auto bg-tuko-cream text-tuko-green font-display uppercase text-2xl px-8 py-4 rounded-sm shadow-[4px_4px_0px_#EEC735] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#EEC735] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3 border-2 border-tuko-yellow"
            >
              {isPlaying ? 'Pause Chaos' : 'Play Chaos'}
            </button>
            <button 
              onClick={scrollToRack}
              className="font-mono text-sm font-bold uppercase text-tuko-yellow hover:text-white transition-colors flex items-center gap-2 tracking-widest border-b border-tuko-yellow/30 pb-1"
            >
              Explore Crate <ArrowDown size={14} />
            </button>
          </div>
        </div>

        {/* Vinyl Visual */}
        <div className="order-1 md:order-2 w-full md:w-6/12 flex justify-center items-center relative">
          {/* Glowing Aura */}
          <div className={`absolute w-[80%] h-[80%] rounded-full blur-[100px] transition-opacity duration-1000 ${isPlaying ? 'bg-tuko-yellow/20 opacity-100' : 'bg-tuko-green opacity-0'}`}></div>
          
          <div className="w-[85vw] md:w-[500px] lg:w-[600px] relative z-10">
            <VinylRecord 
              artworkUrl={currentEpisode.artworkUrl} 
              isPlaying={isPlaying} 
              onClick={togglePlay}
            />
          </div>
        </div>
      </header>

      {/* Episodes Carousel */}
      <RecordRack 
        episodes={EPISODES} 
        currentEpisodeId={currentEpisode.id} 
        onEpisodeSelect={playEpisode} 
      />

      {/* About Section */}
      <section className="bg-tuko-cream text-tuko-green py-24 px-6 relative">
         <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#133B2E_10px,#133B2E_20px)] opacity-10"></div>
         
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-start">
             {/* Left Column: Title & Text */}
             <div className="w-full md:w-1/2">
                <div className="inline-block border-2 border-tuko-green px-4 py-2 font-mono text-sm font-bold uppercase mb-6 shadow-[4px_4px_0_#133B2E]">
                  About The Show
                </div>
                <h2 className="font-display text-6xl md:text-8xl uppercase text-tuko-green mb-8 leading-[0.8]">
                  Raw.<br/>Honest.<br/><span className="text-tuko-yellow text-shadow-neon">Chaotic.</span>
                </h2>
                <p className="font-body text-xl text-tuko-green/80 leading-relaxed mb-8 font-medium">
                  Tuko Sawa is the underground Gen-Z podcast for anyone who’s lived, loved, cried, overthought, healed, failed, tried again — and pretended they’re “sawa.”
                </p>
                <p className="font-body text-lg text-tuko-green/70 leading-relaxed">
                  Hosted by Rivaldo & Ghost, two anonymous Nairobi storytellers, the show mixes late-night matatu vibes, chaotic honesty, and unplanned therapy sessions. No filters. No fake deep stuff.
                </p>
             </div>

            {/* Right Column: Hosts */}
            <div className="w-full md:w-1/2 grid gap-8">
              <div className="bg-white p-8 border-2 border-tuko-green shadow-[8px_8px_0_#133B2E] transform rotate-1 hover:rotate-0 transition-transform">
                <h3 className="font-display text-4xl text-tuko-green mb-2">Rivaldo</h3>
                <span className="font-mono text-xs uppercase bg-tuko-green text-tuko-cream px-2 py-1">The Host</span>
                <p className="text-tuko-green/70 mt-4">The chaotic storyteller. Loves tech, overthinks life, and gives relationship advice he never follows.</p>
              </div>

              <div className="bg-white p-8 border-2 border-tuko-green shadow-[8px_8px_0_#133B2E] transform -rotate-1 hover:rotate-0 transition-transform">
                <h3 className="font-display text-4xl text-tuko-green mb-2">Ghost</h3>
                <span className="font-mono text-xs uppercase bg-tuko-green text-tuko-cream px-2 py-1">Co-Host</span>
                <p className="text-tuko-green/70 mt-4">The calm one… until he’s not. Logic, hot takes, and unprovoked wisdom at random moments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Listen? Section */}
      <section className="py-24 px-6 bg-tuko-green relative overflow-hidden border-t border-tuko-cream/10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-tuko-yellow/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-tuko-cream uppercase mb-4 text-shadow-neon">
              Why Listen?
            </h2>
            <div className="inline-block bg-tuko-cream text-tuko-green px-4 py-1 font-mono text-sm font-bold uppercase rotate-[-2deg] mb-6">
              Real talk. Real chaos. Real life.
            </div>
            <p className="font-body text-xl md:text-2xl text-tuko-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
              Tuko Sawa isn’t just another podcast, it’s the late-night conversation you wish you recorded.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
             {[
               "Unfiltered Gen-Z honesty, the things everyone thinks but never says.",
               "Stories that feel like your life, Nairobi love, friendship, heartbreak, drama, and those decisions you regret at 2 a.m.",
               "Chaotic chemistry between Rivaldo & Ghost that makes even serious topics hilarious.",
               "Short, addictive episodes you can binge anywhere: matatu, class, gym, or bed.",
               "Anonymous hosts = zero filters, more truth, more madness.",
               "A vibe, not just a podcast: music, culture, and emotions woven into every episode."
             ].map((text, i) => (
               <div key={i} className="bg-[#0A1F18] border border-tuko-cream/10 p-8 rounded-sm hover:border-tuko-yellow/50 transition-colors group relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 font-display text-6xl text-tuko-yellow group-hover:opacity-10 transition-opacity select-none">{i+1}</div>
                 <div className="relative z-10 flex items-start gap-4">
                    {/* Retro bullet point */}
                    <div className="mt-2.5 flex-shrink-0 w-2 h-2 bg-tuko-yellow"></div>
                    <p className="text-tuko-cream/90 font-body text-lg leading-relaxed">{text}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="text-center">
            <div className="inline-block relative group cursor-default">
               <div className="absolute inset-0 bg-tuko-yellow transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
               <div className="relative bg-tuko-cream text-tuko-green border-2 border-tuko-green p-6 md:p-10 font-display text-2xl md:text-4xl uppercase text-center leading-tight">
                 If you’ve ever asked yourself <br/>“tuko sawa kweli?”<br/> This is your podcast.
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Board */}
      <TukoBoard posts={COMMUNITY_POSTS} />

      {/* Newsletter - Matatu Sticker Style */}
      <section className="py-24 px-6 bg-tuko-green relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
         <div className="container mx-auto text-center relative z-10 bg-tuko-green border-4 border-tuko-yellow p-8 md:p-16 max-w-4xl mx-auto shadow-[0_0_50px_rgba(238,199,53,0.1)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-tuko-yellow text-tuko-green px-6 py-2 font-display text-2xl uppercase shadow-md rotate-[-2deg]">
               Join The Gang
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-tuko-cream uppercase mb-6 mt-4">Get Chaos In Your Inbox</h2>
            <p className="font-body text-xl max-w-xl mx-auto mb-10 text-tuko-cream/80">
              New episodes, behind-the-scenes, and questions we can't post on TikTok.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <input type="email" placeholder="Your email address" className="px-6 py-4 bg-tuko-green border-2 border-tuko-cream text-tuko-cream font-mono text-lg focus:outline-none focus:border-tuko-yellow w-full md:w-96 placeholder-tuko-cream/30" />
              <button className="bg-tuko-yellow text-tuko-green px-8 py-4 font-display uppercase text-xl shadow-[4px_4px_0_#F4ECD8] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#F4ECD8] active:translate-y-[4px] active:shadow-none transition-all">
                Subscribe
              </button>
            </div>
         </div>
      </section>

      {/* Footer / Contact Section */}
      <footer className="bg-[#0A1F18] text-tuko-cream py-20 px-6 border-t border-white/5 pb-40">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
             <div className="flex items-center gap-3 mb-8">
               <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
               <span className="font-mono text-sm font-bold text-tuko-yellow uppercase tracking-widest">Live from Nairobi</span>
             </div>
            <h3 className="font-display text-5xl mb-8 uppercase text-white leading-none">
              Contact<br/>The Crew
            </h3>
            <p className="font-body text-neutral-400 max-w-md leading-relaxed mb-10 border-l-2 border-white/20 pl-4">
              We reply fast. Unless life is happening. Then we reply slow but honestly.
            </p>
            
            <div className="space-y-8 font-mono text-lg">
              <a href="mailto:tukosawapodcast@gmail.com" className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-4 -mx-4 rounded transition-colors">
                <Mail size={24} className="text-tuko-yellow" />
                <span className="text-neutral-300 group-hover:text-tuko-yellow transition-colors underline decoration-1 underline-offset-4 decoration-tuko-yellow/30">
                  tukosawapodcast@gmail.com
                </span>
              </a>
              
               <div className="flex items-center gap-4 group p-4 -mx-4">
                   <MapPin size={24} className="text-tuko-yellow" />
                   <span className="text-neutral-300">
                     Nairobi, Kenya
                   </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-12 font-mono text-sm text-neutral-500">
              <div>
                <h4 className="text-white mb-6 uppercase tracking-wider font-bold border-b border-white/10 pb-2">Listen On</h4>
                <ul className="space-y-4">
                  {['Spotify', 'Apple Podcasts', 'Google Podcasts', 'YouTube'].map(platform => (
                    <li key={platform}>
                      <a href="#" className="hover:text-tuko-yellow transition-colors hover:pl-2 duration-300 block">
                         ↗ {platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-6 uppercase tracking-wider font-bold border-b border-white/10 pb-2">Social</h4>
                <ul className="space-y-4">
                   {SOCIAL_LINKS.map(link => (
                    <li key={link.name}>
                      <a href={link.url} className="hover:text-tuko-yellow transition-colors hover:pl-2 duration-300 block">
                         @ {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-20 text-xs font-mono text-neutral-600 flex flex-col gap-2 uppercase tracking-widest">
              <span>© 2024 TUKO SAWA PODCAST.</span>
              <span>ALL RIGHTS RESERVED. TUKO SAWA HATA KAMA TUNA PRETEND.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Player */}
      <AudioPlayer 
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onNext={playNext}
        autoPlay={hasInteracted}
      />
    </div>
  );
};

export default App;
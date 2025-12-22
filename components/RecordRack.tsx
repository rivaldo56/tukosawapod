import React, { useState, useMemo } from 'react';
import { Episode } from '../types';
import { Play, RotateCw } from 'lucide-react';

interface RecordRackProps {
  episodes: Episode[];
  currentEpisodeId: string;
  onEpisodeSelect: (episode: Episode) => void;
}

const RecordRack: React.FC<RecordRackProps> = ({ episodes, currentEpisodeId, onEpisodeSelect }) => {
  const [flippedEpisodeId, setFlippedEpisodeId] = useState<string | null>(null);

  // Sort episodes by publish date to determine VOL number
  const sortedEpisodes = useMemo(() => {
    return [...episodes].sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
  }, [episodes]);

  const getVolNumber = (id: string) => {
    const index = sortedEpisodes.findIndex(e => e.id === id);
    return index !== -1 ? index + 1 : 0;
  };

  const handleCardClick = (episodeId: string) => {
    setFlippedEpisodeId(prev => prev === episodeId ? null : episodeId);
  };

  return (

    <div id="record-rack" className="py-20 border-t-8 border-tuko-yellow bg-neutral-900 relative overflow-hidden">
      {/* Brick Wall Background */}
      <div
        className="absolute inset-0 bg-[url('/assets/brick-wall.jpg')] bg-cover bg-center opacity-80"
        style={{ filter: 'contrast(1.1) brightness(0.8)' }}
      ></div>

      {/* Graffiti Overlay Container */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay">
        {/* Abstract Circle */}
        <svg className="absolute top-20 right-1/4 w-48 h-48 text-tuko-green" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="40" strokeDasharray="10 5" />
        </svg>

        {/* "THE CRATE" Tag */}
        <div className="absolute top-10 left-10 font-display text-8xl text-neutral-800 -rotate-6 blur-[1px]">
          THE CRATE
        </div>

        {/* Arrows */}
        <svg className="absolute bottom-10 right-10 w-32 h-32 text-neutral-900" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M90,10 C70,30 40,60 10,90" markerEnd="url(#arrowhead)" />
        </svg>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
        <div>
          <div className="inline-block bg-tuko-green text-tuko-cream px-3 py-1 font-mono text-xs font-bold mb-3 -rotate-2 transform">
            FRESH FROM THE STREETS
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-tuko-cream leading-[0.85] mb-4 drop-shadow-lg">
            The Crate
          </h2>
          <p className="font-body text-tuko-cream/70 text-lg max-w-md">
            Dig through the archives. Every record has a story.
          </p>
        </div>
        <div className="hidden md:block font-mono text-xs text-tuko-cream/50 animate-pulse border-b-2 border-tuko-cream/20 pb-1">
          /// SWIPE TO DIG
        </div>
      </div>

      <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar pl-6 md:pl-0">
        <div className="flex md:px-6 gap-8 min-w-max">
          {episodes.map((episode) => {
            const isSelected = currentEpisodeId === episode.id;
            const isFlipped = flippedEpisodeId === episode.id;
            const volNumber = getVolNumber(episode.id);
            const formattedVol = `VOL. ${volNumber.toString().padStart(2, '0')}`;

            return (
              <div
                key={episode.id}
                className={`group relative flex-shrink-0 w-64 md:w-80 cursor-pointer transition-all duration-500 ease-out`}
                style={{ transform: isSelected ? 'translateY(-20px)' : 'translateY(0)' }}
              >
                {/* Vinyl Disc Peeking Out */}
                <div className={`absolute top-2 left-2 right-2 h-[95%] rounded-full bg-black transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isSelected ? '-translate-y-16 rotate-12' : 'group-hover:-translate-y-8 group-hover:rotate-6'}`}>
                  <div className="absolute inset-[40%] rounded-full border-4 border-black bg-tuko-yellow"></div>
                </div>

                {/* 3D Flip Container */}
                <div
                  className="relative aspect-square z-10"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleCardClick(episode.id)}
                >
                  <div
                    className="w-full h-full relative transition-transform duration-300"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* FRONT FACE */}
                    <div
                      className="absolute inset-0 bg-neutral-100 shadow-[5px_10px_20px_rgba(0,0,0,0.2)] overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Worn texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none z-20 mix-blend-multiply"></div>

                      <img
                        src={episode.artworkUrl}
                        alt={episode.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      />

                      {/* Sticker Element */}
                      <div className="absolute top-4 right-4 bg-tuko-yellow text-tuko-green px-2 py-1 font-mono text-xs font-bold uppercase rotate-6 shadow-md z-30 border border-tuko-green">
                        {episode.tags[0]}
                      </div>

                      {/* Flip Hint */}
                      <div className="absolute bottom-3 right-3 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <RotateCw size={16} />
                      </div>

                      {/* Overlay when selected (playing) */}
                      {isSelected && !isFlipped && (
                        <div className="absolute inset-0 bg-tuko-green/60 flex items-center justify-center z-40 backdrop-blur-[2px]">
                          <div className="bg-tuko-yellow text-tuko-green p-4 rounded-full shadow-[4px_4px_0_black] animate-pulse">
                            <Play size={32} fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BACK FACE */}
                    <div
                      className="absolute inset-0 bg-tuko-cream border-2 border-tuko-green shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-between overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Grain Texture */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4 border-b border-tuko-green/10 pb-2">
                          <span className="font-mono text-[10px] text-tuko-green/60 uppercase tracking-widest">{formattedVol}</span>
                          <span className="font-mono text-[10px] font-bold text-tuko-green/60">{episode.duration}</span>
                        </div>

                        <h3 className="font-display text-3xl uppercase leading-[0.9] text-tuko-green mb-2">
                          <span className="border-b-4 border-tuko-yellow/50 inline-block pb-1">{episode.title}</span>
                        </h3>

                        <p className="font-body text-tuko-green/80 text-sm leading-relaxed line-clamp-3">
                          {episode.description}
                        </p>
                      </div>

                      <div className="relative z-10 flex justify-between items-end mt-2">
                        <div className="flex gap-1 flex-wrap max-w-[50%]">
                          {episode.tags.slice(1).map(tag => (
                            <span key={tag} className="text-[9px] uppercase font-mono border border-tuko-green/30 px-1.5 py-0.5 rounded-sm text-tuko-green/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEpisodeSelect(episode);
                          }}
                          className="bg-tuko-yellow text-tuko-green px-5 py-2.5 rounded-sm font-bold uppercase text-sm shadow-[3px_3px_0_#133B2E] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#133B2E] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2 border border-tuko-green"
                        >
                          <Play size={18} fill="currentColor" /> Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata styled as label (Always visible below) */}
                <div className="mt-4 bg-white border-2 border-tuko-green p-3 relative shadow-[4px_4px_0_#133B2E] transform group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-tuko-green/60">{formattedVol}</span>
                    <span className="font-mono text-xs font-bold text-tuko-green">{episode.duration}</span>
                  </div>
                  <h3 className={`font-display text-2xl uppercase leading-none text-tuko-green truncate`}>
                    {episode.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecordRack;
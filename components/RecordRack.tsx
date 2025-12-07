import React from 'react';
import { Episode } from '../types';
import { Play } from 'lucide-react';

interface RecordRackProps {
  episodes: Episode[];
  currentEpisodeId: string;
  onEpisodeSelect: (episode: Episode) => void;
}

const RecordRack: React.FC<RecordRackProps> = ({ episodes, currentEpisodeId, onEpisodeSelect }) => {
  return (
    <div id="record-rack" className="py-20 border-t-8 border-tuko-yellow bg-tuko-cream relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#133B2E 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
        <div>
           <div className="inline-block bg-tuko-green text-tuko-cream px-3 py-1 font-mono text-xs font-bold mb-3 -rotate-2 transform">
             FRESH FROM THE STREETS
           </div>
           <h2 className="font-display text-5xl md:text-7xl uppercase text-tuko-green leading-[0.85] mb-4">
            The Crate
          </h2>
          <p className="font-body text-tuko-green/70 text-lg max-w-md">
            Dig through the archives. Every record has a story.
          </p>
        </div>
        <div className="hidden md:block font-mono text-xs text-tuko-green/50 animate-pulse border-b-2 border-tuko-green/20 pb-1">
          /// SWIPE TO DIG
        </div>
      </div>

      <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar pl-6 md:pl-0">
        <div className="flex md:px-6 gap-8 min-w-max">
          {episodes.map((episode, index) => {
            const isSelected = currentEpisodeId === episode.id;
            return (
              <div 
                key={episode.id}
                onClick={() => onEpisodeSelect(episode)}
                className={`group relative flex-shrink-0 w-64 md:w-80 cursor-pointer transition-all duration-500 ease-out`}
                style={{ transform: isSelected ? 'translateY(-20px)' : 'translateY(0)' }}
              >
                {/* Vinyl Disc Peeking Out */}
                <div className={`absolute top-2 left-2 right-2 h-[95%] rounded-full bg-black transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isSelected ? '-translate-y-16 rotate-12' : 'group-hover:-translate-y-8 group-hover:rotate-6'}`}>
                   <div className="absolute inset-[40%] rounded-full border-4 border-black bg-tuko-yellow"></div>
                </div>
                
                {/* Cover Art Sleeve */}
                <div className="relative bg-neutral-100 shadow-[5px_10px_20px_rgba(0,0,0,0.2)] aspect-square overflow-hidden z-10 transform transition-transform group-hover:-rotate-1">
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

                  {/* Overlay when selected */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-tuko-green/60 flex items-center justify-center z-40 backdrop-blur-[2px]">
                       <div className="bg-tuko-yellow text-tuko-green p-4 rounded-full shadow-[4px_4px_0_black]">
                         <Play size={32} fill="currentColor" />
                       </div>
                    </div>
                  )}
                </div>

                {/* Metadata styled as label */}
                <div className="mt-4 bg-white border-2 border-tuko-green p-3 relative shadow-[4px_4px_0_#133B2E] transform group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center justify-between mb-1">
                     <span className="font-mono text-xs text-tuko-green/60">VOL. 0{index + 1}</span>
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
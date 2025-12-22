import React from 'react';
import { CommunityPost } from '../types';
import { MessageSquare, Heart } from 'lucide-react';

interface TukoBoardProps {
  posts: CommunityPost[];
}

const TukoBoard: React.FC<TukoBoardProps> = ({ posts }) => {
  return (
    <div className="py-20 bg-neutral-900 relative overflow-hidden min-h-[800px]">
      {/* Brick Wall Background */}
      <div
        className="absolute inset-0 bg-[url('/assets/brick-wall.jpg')] bg-cover bg-center opacity-80"
        style={{ filter: 'contrast(1.1) brightness(0.8)' }}
      ></div>

      {/* Graffiti Overlay Container */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay">
        {/* Abstract Scribbles */}
        <svg className="absolute top-10 left-10 w-64 h-64 text-tuko-green" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,50 Q30,20 50,50 T90,50" />
          <path d="M20,60 Q40,30 60,60 T80,60" />
        </svg>

        {/* "Tuko Sawa" Tag */}
        <div className="absolute top-20 right-20 font-display text-8xl text-neutral-800 rotate-12 blur-[1px]">
          TUKO SAWA?
        </div>

        {/* Arrows */}
        <svg className="absolute bottom-20 left-1/4 w-32 h-32 text-neutral-900" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M10,90 C30,80 50,50 80,20" markerEnd="url(#arrowhead)" />
        </svg>

        {/* Random Marks */}
        <div className="absolute top-1/2 left-10 font-mono text-4xl text-tuko-green rotate-90">
          /// EST. 2023
        </div>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="bg-tuko-green text-tuko-yellow px-4 py-2 font-display text-xl uppercase inline-block -rotate-2 mb-4 shadow-[4px_4px_0px_#EEC735]">
            The Streets Are Talking
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-tuko-cream uppercase leading-none drop-shadow-lg">
            The Tuko Board
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-6 shadow-[5px_8px_15px_rgba(0,0,0,0.3)] relative transform transition-transform hover:scale-105 hover:z-20 ${post.rotation} ${post.color}`}
            >
              {/* Tape visual at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-yellow-200/80 rotate-1 shadow-sm backdrop-blur-sm"></div>

              <div className="font-body text-tuko-green font-medium text-lg mb-4 leading-relaxed">
                "{post.content}"
              </div>

              <div className="flex items-center justify-between border-t border-tuko-green/10 pt-4 mt-2">
                <span className="font-mono text-sm font-bold text-tuko-green/60 uppercase">{post.author}</span>
                <div className="flex gap-3 text-tuko-green/40">
                  <Heart size={16} />
                  <MessageSquare size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TukoBoard;
import React from 'react';
import { CommunityPost } from '../types';
import { MessageSquare, Heart, Share } from 'lucide-react';

interface TukoBoardProps {
  posts: CommunityPost[];
}

const TukoBoard: React.FC<TukoBoardProps> = ({ posts }) => {
  return (
    <div className="py-20 bg-tuko-cream relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/crumpled-paper.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <span className="bg-tuko-green text-tuko-yellow px-4 py-2 font-display text-xl uppercase inline-block -rotate-2 mb-4 shadow-[4px_4px_0px_#EEC735]">
              The Streets Are Talking
           </span>
           <h2 className="font-display text-5xl md:text-7xl text-tuko-green uppercase leading-none">
             The Tuko Board
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className={`p-6 shadow-[5px_8px_15px_rgba(0,0,0,0.1)] relative transform transition-transform hover:scale-105 hover:z-20 ${post.rotation} ${post.color}`}
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
import React from 'react';

interface VinylRecordProps {
  artworkUrl: string;
  isPlaying: boolean;
  className?: string;
  onClick?: () => void;
}

const VinylRecord: React.FC<VinylRecordProps> = ({ artworkUrl, isPlaying, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative rounded-full bg-tuko-dark p-[2%] cursor-pointer transform transition-all duration-500 hover:scale-[1.02] active:scale-95 ${className}`}
      style={{
        boxShadow: isPlaying 
          ? '0 0 30px rgba(238, 199, 53, 0.4), 0 0 10px rgba(112, 0, 255, 0.2)' 
          : '0 20px 50px rgba(0,0,0,0.6)',
        aspectRatio: '1/1'
      }}
    >
      {/* Rotating Container */}
      <div 
        className="w-full h-full relative rounded-full animate-spin-slow"
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        {/* Vinyl Grooves Texture */}
        <div className="absolute inset-0 rounded-full border-4 border-tuko-dark/50 opacity-90"
             style={{
               background: 'repeating-radial-gradient(#111 0, #111 2px, #222 3px, #222 4px)'
             }}>
        </div>
        
        {/* Center Label Area */}
        <div className="absolute inset-[32%] rounded-full overflow-hidden border-[6px] border-tuko-dark bg-tuko-yellow shadow-inner flex items-center justify-center">
          <img 
            src={artworkUrl} 
            alt="Album Art" 
            className="w-full h-full object-cover opacity-80 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500" 
          />
          
          {/* Label Ring Decoration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-full h-full border-[1px] border-tuko-green/30 rounded-full m-2"></div>
          </div>

          {/* Spindle Hole */}
          <div className="absolute w-4 h-4 bg-tuko-cream rounded-full z-10 border-2 border-gray-600 shadow-inner"></div>
        </div>
      </div>

      {/* Dynamic Shine/Reflection (Static overlay to simulate light source) */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-30' : 'opacity-10'}`}></div>
    </div>
  );
};

export default VinylRecord;
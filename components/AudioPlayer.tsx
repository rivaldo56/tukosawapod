import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, ListMusic, AudioWaveform } from 'lucide-react';
import { Episode, PlayerState } from '../types';

interface AudioPlayerProps {
  currentEpisode: Episode;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentEpisode,
  isPlaying,
  onPlayPause,
  onNext,
  autoPlay = false
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
  });

  // Handle Play/Pause side effects based on prop
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentEpisode.id]);

  // Handle source change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (autoPlay && isPlaying) {
        audioRef.current.play().catch(e => console.error("Autoplay failed", e));
      }
    }
  }, [currentEpisode, autoPlay]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !playerState.isMuted;
      audioRef.current.muted = newMuteState;
      setPlayerState(prev => ({ ...prev, isMuted: newMuteState }));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audioRef.current?.currentTime || 0,
        duration: audioRef.current?.duration || 0,
      }));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 px-0 pb-0 md:pb-6 transition-transform duration-300 ease-in-out ${isPlaying ? 'translate-y-0' : 'translate-y-[120%]'}`}>
      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onPlayPause()}
      />

      {/* Cassette Deck Container */}
      <div className="max-w-5xl mx-auto bg-tuko-green border-t-4 border-tuko-yellow/50 md:border-4 md:border-neutral-800 md:rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Metal Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>

        <div className="relative p-4 md:p-5 flex flex-col md:flex-row items-center gap-6">

          {/* LED Display (Info) */}
          <div className="w-full md:w-1/3 bg-black border-2 border-neutral-700 rounded p-3 flex items-center gap-4 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            <div className={`w-2 h-2 rounded-full absolute top-2 right-2 ${isPlaying ? 'bg-red-500 animate-pulse shadow-[0_0_10px_red]' : 'bg-red-900'}`}></div>

            <div className="w-12 h-12 bg-neutral-900 rounded border border-neutral-800 flex-shrink-0 overflow-hidden relative group">
              <img src={currentEpisode.artworkUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-tuko-yellow/10 mix-blend-overlay"></div>
            </div>

            <div className="overflow-hidden flex-1">
              <div className="font-mono text-[10px] text-tuko-yellow uppercase tracking-widest mb-1 opacity-70">Now Spinning</div>
              <div className="font-display uppercase text-white tracking-wide truncate text-lg leading-none">
                {currentEpisode.title}
              </div>
            </div>
          </div>

          {/* Controls & Meters */}
          <div className="flex-1 w-full flex flex-col gap-2">

            {/* Visualizer & Time */}
            <div className="flex items-end justify-between px-1 mb-1">
              {/* Fake LED Meter */}
              <div className="hidden md:flex gap-1 h-6 items-end pb-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`w-2 bg-tuko-yellow rounded-sm transition-all duration-100 ${isPlaying ? 'animate-bounce' : 'h-1 opacity-30'}`}
                    style={{ height: isPlaying ? `${Math.random() * 100}%` : '4px', animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>

              <div className="font-mono text-tuko-yellow text-sm md:text-xl tracking-widest text-shadow-neon bg-black/50 px-2 rounded border border-tuko-yellow/20">
                {formatTime(playerState.currentTime)} <span className="text-neutral-500">/</span> {formatTime(playerState.duration)}
              </div>
            </div>

            {/* Scrubber */}
            <input
              type="range"
              min="0"
              max={playerState.duration || 100}
              value={playerState.currentTime}
              onChange={handleSeek}
              className="w-full h-3 bg-neutral-900 rounded-sm appearance-none cursor-pointer border border-neutral-700 accent-tuko-yellow hover:accent-tuko-cream transition-all shadow-[inset_0_1px_3px_black]"
            />

            {/* Buttons Row */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-4">
                <button
                  onClick={onPlayPause}
                  className="w-12 h-10 bg-neutral-200 text-black rounded-sm shadow-[0_4px_0_#999] hover:translate-y-[2px] hover:shadow-[0_2px_0_#999] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center border-t border-white"
                >
                  {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
                </button>
                <button
                  onClick={onNext}
                  className="w-12 h-10 bg-neutral-300 text-neutral-600 rounded-sm shadow-[0_4px_0_#888] hover:translate-y-[2px] hover:shadow-[0_2px_0_#888] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center border-t border-white hidden md:flex"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={toggleMute} className="text-neutral-400 hover:text-tuko-yellow transition-colors">
                  {playerState.isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <a href="#record-rack" className="text-neutral-400 hover:text-tuko-yellow transition-colors">
                  <ListMusic size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
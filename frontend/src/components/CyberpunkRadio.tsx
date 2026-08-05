"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Pause, Play, SkipForward, X, Radio } from 'lucide-react';
import { sounds } from '@/lib/sounds';

const tracks = [
  { name: 'Midnight Protocol', artist: 'ZK Synthwave', src: '/audio/track1.mp3' },
  { name: 'Dark Pool Drift', artist: 'Cipher Beats', src: '/audio/track2.mp3' },
];

export default function CyberpunkRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(16).fill(4));
  const animRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPlaying) {
      const animateBars = () => {
        setBars(prev => prev.map(() => Math.random() * 20 + 3));
        animRef.current = requestAnimationFrame(() => {
          timeoutId = setTimeout(() => {
            animRef.current = requestAnimationFrame(animateBars);
          }, 120);
        });
      };
      
      animateBars();
      audioRef.current?.play().catch(e => {
        console.warn("Audio play failed (maybe missing file):", e);
        setIsPlaying(false);
      });
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBars(Array(16).fill(4));
      audioRef.current?.pause();
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Set initial mute state
    if (audioRef.current) {
      audioRef.current.muted = sounds.getMuted();
    }
    // Subscribe to global mute toggles
    const unsubscribe = sounds.onMuteChange((muted) => {
      if (audioRef.current) {
        audioRef.current.muted = muted;
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // When track changes, if we are playing, play the new one
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrack].src;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn(e));
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    sounds.playClick();
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  if (!isVisible) return null;

  const track = tracks[currentTrack];

  return (
    <div className="fixed bottom-28 right-6 z-40 bg-slate-900/90 backdrop-blur-2xl border border-teal-500/40 rounded-2xl shadow-2xl p-3 w-64 animate-fadeIn">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} onEnded={nextTrack} />
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Cyberpunk Radio</span>
        </div>
        <button onClick={() => setIsVisible(false)} className="text-slate-500 hover:text-white p-0.5">
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Visualizer Bars */}
      <div className="flex items-end gap-[2px] h-6 mb-2 px-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-100"
            style={{
              height: `${h}px`,
              background: `linear-gradient(to top, rgba(20,184,166,0.8), rgba(59,130,246,0.6))`,
              opacity: isPlaying ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Track Info & Controls */}
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1 mr-2">
          <p className="text-xs font-bold text-white truncate">{track.name}</p>
          <p className="text-[10px] text-slate-400 font-mono truncate">{track.artist}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center text-white transition-all shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <SkipForward className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

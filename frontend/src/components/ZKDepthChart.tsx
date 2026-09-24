"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Layers, Shield, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function ZKDepthChart() {
  const [showFog, setShowFog] = useState(true);
  const [hoverData, setHoverData] = useState<{ price: string; volume: string; side: string } | null>(null);

  const toggleFog = () => {
    sounds.playClick();
    setShowFog(!showFog);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/70 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl relative font-sans">
      
      {/* Top Controls */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-950/90">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-500/10 flex items-center justify-center border border-zinc-700/20 text-zinc-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide flex items-center gap-2">
              Market Depth & ZK Fog of War
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-500/10 text-zinc-300 border border-zinc-700/30">
                ZK SHIELDED WALLS
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">Bids (Green) vs Asks (Red)</p>
          </div>
        </div>

        <button
          onClick={toggleFog}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
            showFog
              ? 'bg-zinc-500/10 text-zinc-300 border-zinc-700/40 shadow-[0_0_15px_rgba(161,161,170,0.15)]'
              : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          {showFog ? <Eye className="w-3.5 h-3.5 text-zinc-400" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Fog of War: {showFog ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Main Visualizer SVG Area */}
      <div className="flex-1 p-6 relative flex flex-col justify-between overflow-hidden">
        
        {/* Fog of War Blurry Layers */}
        {showFog && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Left Outer Fog (Deep Bids) */}
            <div className="absolute top-0 bottom-0 left-0 w-[30%] bg-zinc-900/20 blur-xl border-r border-zinc-700/30 animate-pulse-glow" />
            <div className="absolute top-8 left-4 text-[10px] font-mono text-zinc-300 bg-zinc-950/80 px-2 py-1 rounded border border-zinc-700/30 z-20">
              🔒 ZK Fog: Deep Bids Masked (&lt; $1.380)
            </div>

            {/* Right Outer Fog (Deep Asks) */}
            <div className="absolute top-0 bottom-0 right-0 w-[30%] bg-zinc-900/20 blur-xl border-l border-zinc-700/30 animate-pulse-glow" />
            <div className="absolute top-8 right-4 text-[10px] font-mono text-zinc-300 bg-zinc-950/80 px-2 py-1 rounded border border-zinc-700/30 z-20">
              🔒 ZK Fog: Institutional Asks Masked (&gt; $1.460)
            </div>
          </div>
        )}

        {/* Mid Oracle Reference Marker */}
        <div className="absolute left-1/2 top-4 bottom-10 -translate-x-1/2 w-0 border-l border-dashed border-zinc-600/50 z-10 pointer-events-none flex flex-col justify-between items-center">
          <span className="bg-zinc-900 border border-zinc-700/40 text-zinc-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
            Oracle $1.420
          </span>
        </div>

        {/* Interactive SVG Area Chart */}
        <div className="relative w-full h-80 my-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 400">
            <defs>
              <linearGradient id="bidsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="asksGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Bids Green Curve (Left side) */}
            <path
              d="M0,80 Q150,120 300,240 T500,380 L500,400 L0,400 Z"
              fill="url(#bidsGradient)"
            />
            <path
              d="M0,80 Q150,120 300,240 T500,380"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />

            {/* Asks Red Curve (Right side) */}
            <path
              d="M500,380 Q700,240 850,120 T1000,60 L1000,400 L500,400 Z"
              fill="url(#asksGradient)"
            />
            <path
              d="M500,380 Q700,240 850,120 T1000,60"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Bottom Price Scale */}
        <div className="flex justify-between text-[11px] font-mono text-zinc-500 border-t border-white/5 pt-3 relative z-20">
          <span>$1.340</span>
          <span>$1.380</span>
          <span className="text-zinc-400 font-bold">$1.420</span>
          <span>$1.460</span>
          <span>$1.500</span>
        </div>
      </div>
    </div>
  );
}

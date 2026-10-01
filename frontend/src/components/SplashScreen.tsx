"use client";

import React, { useState, useEffect } from 'react';
import { Hexagon, Lock } from 'lucide-react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if splash was already shown this session
    if (sessionStorage.getItem('midnight_splash_viewed')) {
      setPhase('done');
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('midnight_splash_viewed', 'true');
          setTimeout(() => setPhase('done'), 300);
          return 100;
        }
        // Smooth linear progression with slight easing near the end
        const step = prev < 70 ? 4 : 2.5;
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (phase === 'done') return null;

  const currentPercent = Math.min(100, Math.round(progress));

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-opacity duration-400 selection:bg-none"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* Rotating Logo */}
      <div className="relative mb-7 flex items-center justify-center">
        <div className="relative w-16 h-16 rounded-2xl bg-zinc-950/95 border border-zinc-700/80 shadow-[0_0_35px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden backdrop-blur-xl">
          {/* Subtle interior gradient sweep */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

          {/* Smooth 360-degree Rotating Hexagon Brand Mark */}
          <Hexagon className="w-8 h-8 text-white stroke-[1.6] animate-spin-slow drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
        </div>
      </div>

      {/* Brand Title with Live Pulse */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <h1 className="text-sm font-semibold tracking-tight text-white">Midnight Dark Pool</h1>
      </div>

      {/* Cryptographic Subtitle */}
      <p className="text-[11px] font-mono text-zinc-400 mb-6 flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-cyan-400" />
        <span>Initializing Zero-Knowledge circuits...</span>
      </p>

      {/* High-Tech Progress Bar (Clearly visible track + Vibrant Neon Cyan fill) */}
      <div className="w-64 h-2 bg-zinc-800/90 rounded-full overflow-hidden border border-zinc-700/80 relative shadow-inner mb-3">
        <div
          className="h-full bg-cyan-400 rounded-full transition-all duration-75 shadow-[0_0_14px_#06b6d4]"
          style={{ width: `${currentPercent}%` }}
        />
      </div>

      {/* Telemetry Status Line */}
      <div className="flex items-center justify-between w-64 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
        <span className="text-zinc-300">
          {progress < 30
            ? 'Loading Compact Circuits...'
            : progress < 65
            ? 'Preparing Client Prover...'
            : progress < 95
            ? 'Syncing Shielded Ledger...'
            : 'Ready'}
        </span>
        <span className="font-semibold text-cyan-400">{currentPercent}%</span>
      </div>
    </div>
  );
}

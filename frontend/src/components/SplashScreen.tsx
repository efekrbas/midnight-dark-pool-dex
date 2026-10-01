"use client";

import React, { useState, useEffect } from 'react';
import { Hexagon, Lock } from 'lucide-react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 400);
          return 100;
        }
        return prev + Math.random() * 12 + 6;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  if (phase === 'done') return null;

  const currentPercent = Math.min(100, Math.round(progress));

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-opacity duration-500 selection:bg-none"
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
        <Lock className="w-3 h-3 text-zinc-400" />
        <span>Initializing Zero-Knowledge circuits...</span>
      </p>

      {/* High-Tech Progress Bar */}
      <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative shadow-inner mb-3">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          style={{ width: `${currentPercent}%` }}
        />
      </div>

      {/* Telemetry Status Line */}
      <div className="flex items-center justify-between w-64 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
        <span>
          {progress < 25
            ? 'Loading Compact Circuits...'
            : progress < 55
            ? 'Preparing Client Prover...'
            : progress < 85
            ? 'Connecting Preprod Gateway...'
            : progress < 99
            ? 'Verifying State Commitments...'
            : 'Ready'}
        </span>
        <span className="font-bold text-zinc-300">{currentPercent}%</span>
      </div>
    </div>
  );
}

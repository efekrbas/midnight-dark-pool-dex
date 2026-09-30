"use client";

import React, { useState, useEffect } from 'react';
import { Hexagon, Shield, Lock, Sparkles } from 'lucide-react';

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
      {/* Dynamic Rotating Logo & Orbital Core */}
      <div className="relative mb-7 flex items-center justify-center">
        {/* Ambient ZK Glow Field */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-sky-500/15 via-indigo-500/20 to-purple-500/15 blur-2xl animate-pulse-glow pointer-events-none" />

        {/* Outer Counter-Rotating Orbital Ring */}
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-zinc-700/50 animate-spin-reverse-slow pointer-events-none" />

        {/* Secondary Concentric Ring with Orbit Dots */}
        <div className="absolute w-20 h-20 rounded-2xl border border-dashed border-zinc-600/30 animate-spin-slow pointer-events-none" />

        {/* Central Monogram Squircle Badge */}
        <div className="relative w-16 h-16 rounded-2xl bg-zinc-950/95 border border-zinc-700/80 shadow-[0_0_35px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden backdrop-blur-xl group">
          {/* Subtle interior gradient sweep */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

          {/* Smooth 360-degree Rotating Hexagon Brand Mark */}
          <Hexagon className="w-8 h-8 text-white stroke-[1.6] animate-spin-slow drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] transition-transform" />

          {/* Center Concentric Pulse Core */}
          <div className="absolute flex items-center justify-center pointer-events-none">
            <Shield className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20 stroke-[1.75] animate-pulse" />
          </div>
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
      <div className="w-64 h-[3px] bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative shadow-inner mb-3">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-white to-indigo-400 transition-all duration-200 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          style={{ width: `${currentPercent}%` }}
        />
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none" />
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

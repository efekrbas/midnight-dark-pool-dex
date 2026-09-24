"use client";

import React, { useState, useEffect } from 'react';
import { Hexagon, Shield, Lock } from 'lucide-react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fadeIn transition-opacity duration-500" style={{ opacity: progress >= 100 ? 0 : 1 }}>
      {/* Institutional Monogram */}
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shadow-2xl">
          <Hexagon className="w-7 h-7 text-white stroke-[1.5]" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
        <h1 className="text-sm font-semibold tracking-tight text-white">Midnight Dark Pool</h1>
      </div>
      <p className="text-[11px] font-mono text-zinc-400 mb-6 flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-zinc-400" />
        <span>Initializing Zero-Knowledge circuits...</span>
      </p>

      {/* Progress Bar */}
      <div className="w-56 h-[2px] bg-zinc-900 rounded-none overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-[10px] font-mono text-zinc-400 mt-3 uppercase tracking-wider">
        {progress < 30 ? 'Loading Compact Circuits...' : progress < 60 ? 'Connecting Preprod Gateway...' : progress < 90 ? 'Verifying State Commitments...' : 'Ready'}
      </p>
    </div>
  );
}

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
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-fadeIn transition-opacity duration-500" style={{ opacity: progress >= 100 ? 0 : 1 }}>
      {/* Logo */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-xl bg-slate-900 flex items-center justify-center shadow-[0_0_60px_rgba(15,23,42,0.6)] border border-slate-700 animate-pulse">
          <Hexagon className="w-10 h-10 text-teal-400" />
        </div>
        <div className="absolute -inset-4 rounded-xl bg-slate-800/30 blur-2xl" />
      </div>

      <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Midnight Dark Pool</h1>
      <p className="text-[10px] font-mono text-slate-400 mb-8 flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-teal-400" />
        <span>Initializing Zero-Knowledge circuits...</span>
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-slate-800 rounded-none overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-200 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-[10px] font-mono text-slate-500 mt-3">
        {progress < 30 ? 'Loading ZK circuits...' : progress < 60 ? 'Connecting to Midnight Preprod...' : progress < 90 ? 'Verifying state commitments...' : 'Ready'}
      </p>
    </div>
  );
}

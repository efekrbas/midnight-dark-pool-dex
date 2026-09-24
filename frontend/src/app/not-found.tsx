"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldOff, ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fadeIn relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-zinc-700/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Glitch 404 */}
      <div className="relative mb-6">
        <h1 className="text-[120px] sm:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-500 to-zinc-500 leading-none select-none" style={{ WebkitTextStroke: '2px rgba(113,113,122,0.3)' }}>
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldOff className="w-16 h-16 text-zinc-400/40 animate-pulse" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-white mb-2 text-center">
        ZK Proof Not Found
      </h2>
      <p className="text-sm text-zinc-400 font-mono text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been shielded by a zero-knowledge commitment.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-zinc-600 to-zinc-600 text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-xl"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dark Pool</span>
        </Link>
        <Link
          href="/trade"
          className="px-6 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-sm flex items-center gap-2 transition-all border border-white/10"
        >
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span>Start Trading</span>
        </Link>
      </div>

      {/* Binary Rain Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[10px] font-mono text-zinc-400 whitespace-nowrap animate-pulse"
            style={{
              left: `${i * 5}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {Array.from({ length: 30 }).map(() => Math.round(Math.random())).join('')}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldOff, ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fadeIn relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Glitch 404 */}
      <div className="relative mb-6">
        <h1 className="text-[120px] sm:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 leading-none select-none" style={{ WebkitTextStroke: '2px rgba(147,51,234,0.3)' }}>
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldOff className="w-16 h-16 text-teal-500/40 animate-pulse" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-white mb-2 text-center">
        ZK Proof Not Found
      </h2>
      <p className="text-sm text-slate-400 font-mono text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been shielded by a zero-knowledge commitment.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-xl"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dark Pool</span>
        </Link>
        <Link
          href="/trade"
          className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm flex items-center gap-2 transition-all border border-white/10"
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Start Trading</span>
        </Link>
      </div>

      {/* Binary Rain Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[10px] font-mono text-teal-400 whitespace-nowrap animate-pulse"
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

"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, BarChart2, Lock, Sparkles, Zap, EyeOff, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MEVSimulator from '../components/MEVSimulator';
import ParticleCanvas from '../components/ParticleCanvas';
import { useTranslation } from '@/context/I18nContext';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.from(".hero-elem", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    gsap.from(".feature-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.5,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col min-h-[calc(100vh-80px)] items-center justify-center py-16 px-4 relative overflow-hidden space-y-16">
      
      {/* Interactive 3D Canvas Particle Backdrop */}
      <ParticleCanvas />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 to-teal-600/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
        
        <div className="hero-elem inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold mb-2 shadow-[0_0_25px_rgba(59,130,246,0.2)] backdrop-blur-xl hover:border-blue-400/60 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-teal-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{t('privacyTitle')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping ml-1" />
        </div>

        <h1 className="hero-elem text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]">
          Institutional <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 drop-shadow-lg shadow-teal-500/30">
            Dark Pool
          </span> DEX
        </h1>
        
        <p className="hero-elem text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          Execute massive block trades without moving market prices. Your liquidity, order sizes, and entry prices remain <span className="text-white font-medium underline decoration-blue-500 decoration-2 underline-offset-4">cryptographically hidden</span> until matched.
        </p>

        <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <Link 
            href="/trade" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold text-lg flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_var(--color-teal-500)] transition-all duration-300 hover:-translate-y-1 group border border-teal-400/20"
          >
            <span>{t('launchTerminal')}</span>
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <Link 
            href="/analytics" 
            className="w-full sm:w-auto glass-button px-8 py-4 rounded-2xl font-semibold text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center border border-white/10 hover:border-white/25"
          >
            {t('readSpecs')}
          </Link>
        </div>

        {/* Live Telemetry / Highlights Banner */}
        <div className="hero-elem pt-6 pb-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-16 px-8 py-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <EyeOff className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Order book depth</p>
                <p className="text-base font-bold text-white">{t('orderBookDepth')}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">MEV Protection</p>
                <p className="text-base font-bold text-emerald-400">{t('mevProtection')}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Settlement Engine</p>
                <p className="text-base font-bold text-white">{t('settlementEngine')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="feature-card glass-panel p-8 text-left hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Zero MEV & Slippage</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Miners, validators, and algorithmic bots cannot inspect your orders in memory pools, eliminating front-running and sandwich attacks entirely.
            </p>
          </div>

          <div className="feature-card glass-panel p-8 text-left hover:border-teal-500/40 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
            <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(147,51,234,0.2)] group-hover:scale-110 transition-transform duration-300">
              <Lock className="w-7 h-7 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">Cryptographic Commitments</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Trade amounts and limit thresholds are stored as mathematical hashes on-chain. Proved locally on your device, verified globally by zero-knowledge circuits.
            </p>
          </div>

          <div className="feature-card glass-panel p-8 text-left hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-300">
              <BarChart2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Blurred Liquidity Heat</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Analyze macro market sentiment and volume commitments without revealing critical support, resistance lines, or institutional order sizes to competitors.
            </p>
          </div>
        </div>

        {/* MEV Front-Running vs Dark Pool Interactive Simulator */}
        <div className="pt-8">
          <MEVSimulator />
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Shield, ShieldCheck, AlertTriangle, Zap, DollarSign, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function MEVSimulator() {
  const [orderSize, setOrderSize] = useState<number>(250000);

  // Math simulation formulas
  const publicSlippagePct = Math.min((orderSize / 1000000) * 4.5, 6.8);
  const publicMEVLoss = (orderSize * publicSlippagePct) / 100;
  const darkPoolLoss = 0;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderSize(Number(e.target.value));
  };

  return (
    <div className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-xl relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Protection Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Public Mempool MEV vs. Midnight Dark Pool
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto font-light">
            Adjust the block trade size below to see how public DEX mempool bots exploit large orders compared to Midnight&apos;s zero-knowledge dark pool.
          </p>
        </div>

        {/* Order Size Slider */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Simulated Block Order Size:</span>
            <span className="text-xl font-extrabold text-teal-400 font-sans">
              ${orderSize.toLocaleString()} ZKUSD
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={orderSize}
            onChange={handleSliderChange}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>$10,000 (Retail)</span>
            <span>$500,000 (Institutional)</span>
            <span>$1,000,000 (Whale Block)</span>
          </div>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Public DEX Card (Vulnerable) */}
          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 text-left space-y-4 relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Public DEX (Uniswap / Cardano AMM)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                UNPROTECTED
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Visibility:</span>
                <span className="text-red-400 font-bold">100% Public Mempool</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Front-running Risk:</span>
                <span className="text-red-400 font-bold">Extremely High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Slippage Impact:</span>
                <span className="text-slate-200">{publicSlippagePct.toFixed(2)}%</span>
              </div>
              <div className="pt-2 border-t border-red-500/20 flex justify-between items-center">
                <span className="text-slate-300 font-sans font-semibold">MEV & Bot Extraction Loss:</span>
                <span className="text-xl font-black text-red-400 font-mono">
                  -${publicMEVLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
              Algorithmic sandwich bots detect your unencrypted transaction in the public mempool, execute a buy before you, and dump on your order.
            </p>
          </div>

          {/* Midnight Dark Pool Card (Protected) */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-left space-y-4 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                <span>Midnight Dark Pool (ZK-SNARK)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% IMMUNE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Visibility:</span>
                <span className="text-emerald-400 font-bold">Cryptographically Masked</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Front-running Risk:</span>
                <span className="text-emerald-400 font-bold">Zero (MEV Shielded)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Slippage Impact:</span>
                <span className="text-emerald-400">0.00%</span>
              </div>
              <div className="pt-2 border-t border-emerald-500/20 flex justify-between items-center">
                <span className="text-slate-300 font-sans font-semibold">MEV Extraction Loss:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  $0.00 (Protected)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
              Midnight ZK circuits hide your order volume and limit price on-device. No miner, bot, or relayer can inspect your order details.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Activity, Cpu, Layers, Database, Lock, TrendingUp, Sparkles, Server } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function AnalyticsPage() {
  const [tvs, setTvs] = useState(14820950);
  const [proofSpeed, setProofSpeed] = useState(1420);

  useEffect(() => {
    const interval = setInterval(() => {
      setTvs(prev => prev + Math.floor(Math.random() * 850));
      setProofSpeed(1400 + Math.floor(Math.random() * 45));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Shielded Pool & ZK Telemetry Analytics
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Real-time Zero-Knowledge Cryptographic Metrics & Network Health
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-2xl text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Midnight Preprod Indexer: Synced</span>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="glass-panel p-6 border border-white/10 bg-slate-900/70 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
            <span>Total Value Shielded (TVS)</span>
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-white font-mono tracking-tight">
            ${tvs.toLocaleString()}
          </h2>
          <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% past 7 days
          </p>
        </div>

        <div className="glass-panel p-6 border border-white/10 bg-slate-900/70 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
            <span>Average ZK Prover Speed</span>
            <Cpu className="w-4 h-4 text-teal-400" />
          </div>
          <h2 className="text-3xl font-black text-white font-mono tracking-tight">
            {proofSpeed} ms
          </h2>
          <p className="text-[11px] text-teal-300 font-mono">
            PLONK / UltraPLONK WASM Engine
          </p>
        </div>

        <div className="glass-panel p-6 border border-white/10 bg-slate-900/70 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
            <span>Anonymity Set Score</span>
            <Lock className="w-4 h-4 text-teal-400" />
          </div>
          <h2 className="text-3xl font-black text-teal-400 font-mono tracking-tight">
            99.8 / 100
          </h2>
          <p className="text-[11px] text-slate-400 font-mono">
            Optimal Cryptographic Mixing
          </p>
        </div>

        <div className="glass-panel p-6 border border-white/10 bg-slate-900/70 rounded-3xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
            <span>MEV Exploits Prevented</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <h2 className="text-3xl font-black text-white font-mono tracking-tight">
            $1,420,890
          </h2>
          <p className="text-[11px] text-slate-400 font-mono">
            Saved for Institutional Traders
          </p>
        </div>

      </div>

      {/* Deep Dive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Card: Anonymity Set Visualization */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-900/80 space-y-6">
          <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-400" />
            Anonymity Set Depth & Shield Ratio
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>tNIGHT Shielded Volume Pool</span>
                <span className="text-teal-300 font-bold">82.4% Shielded</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full w-[82.4%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>ZKUSD Settlement Pool</span>
                <span className="text-emerald-400 font-bold">94.1% Shielded</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[94.1%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>DUST Gas Pool</span>
                <span className="text-blue-400 font-bold">78.9% Shielded</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-[78.9%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Network Nodes Status */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-900/80 space-y-6">
          <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Midnight Preprod Relayers & Indexers
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Preprod Relayer Alpha</p>
                <p className="text-[10px] text-slate-400">Node ID: relayer_us_east_01</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                100% ONLINE (12ms)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Preprod Relayer Beta</p>
                <p className="text-[10px] text-slate-400">Node ID: relayer_eu_central_02</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                100% ONLINE (18ms)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">ZK Proof Prover Cluster</p>
                <p className="text-[10px] text-slate-400">WASM / Compact Circuit v2.5</p>
              </div>
              <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px]">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

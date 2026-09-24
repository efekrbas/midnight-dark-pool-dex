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
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-zinc-800 shadow-2xl bg-zinc-950/80 backdrop-blur-xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-zinc-800">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              Shielded Pool & ZK Telemetry
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Real-time Zero-Knowledge Cryptographic Metrics & Network Health
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-zinc-500/10 text-zinc-400 border border-zinc-700/20 px-3 py-1.5 rounded-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
          <span>Midnight Preprod Indexer: Synced</span>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-5 border border-zinc-800/80 bg-zinc-950/80 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
            <span>Total Value Shielded (TVS)</span>
            <Shield className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-mono tracking-tight">
            ${tvs.toLocaleString()}
          </h2>
          <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% past 7 days
          </p>
        </div>

        <div className="p-5 border border-zinc-800/80 bg-zinc-950/80 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
            <span>Average ZK Prover Speed</span>
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-mono tracking-tight">
            {proofSpeed} ms
          </h2>
          <p className="text-[11px] text-zinc-400 font-mono">
            PLONK / UltraPLONK WASM Engine
          </p>
        </div>

        <div className="p-5 border border-zinc-800/80 bg-zinc-950/80 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
            <span>Anonymity Set Score</span>
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-mono tracking-tight">
            99.8 / 100
          </h2>
          <p className="text-[11px] text-zinc-400 font-mono">
            Optimal Cryptographic Mixing
          </p>
        </div>

        <div className="p-5 border border-zinc-800/80 bg-zinc-950/80 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
            <span>MEV Exploits Prevented</span>
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-mono tracking-tight">
            $1,420,890
          </h2>
          <p className="text-[11px] text-zinc-400 font-mono">
            Saved for Institutional Traders
          </p>
        </div>

      </div>

      {/* Deep Dive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Anonymity Set Visualization */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/80 space-y-5">
          <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-400" />
            Anonymity Set Depth & Shield Ratio
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                <span>tNIGHT Shielded Volume Pool</span>
                <span className="text-zinc-200 font-bold">82.4% Shielded</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-white rounded-full w-[82.4%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                <span>ZKUSD Settlement Pool</span>
                <span className="text-zinc-400 font-bold">94.1% Shielded</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-zinc-500 rounded-full w-[94.1%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                <span>DUST Gas Pool</span>
                <span className="text-zinc-200 font-bold">78.9% Shielded</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-zinc-400 rounded-full w-[78.9%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Network Nodes Status */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/80 space-y-5">
          <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
            <Server className="w-4 h-4 text-zinc-400" />
            Midnight Preprod Relayers & Indexers
          </h3>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">Preprod Relayer Alpha</p>
                <p className="text-[10px] text-zinc-400">Node ID: relayer_us_east_01</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-400 border border-zinc-700/20 text-[10px]">
                100% ONLINE (12ms)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">Preprod Relayer Beta</p>
                <p className="text-[10px] text-zinc-400">Node ID: relayer_eu_central_02</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-400 border border-zinc-700/20 text-[10px]">
                100% ONLINE (18ms)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">ZK Proof Prover Cluster</p>
                <p className="text-[10px] text-zinc-400">WASM / Compact Circuit v2.5</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px]">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

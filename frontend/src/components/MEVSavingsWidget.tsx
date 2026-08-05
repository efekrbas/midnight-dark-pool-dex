"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function MEVSavingsWidget() {
  const [savedMEV, setSavedMEV] = useState(1420.50);
  const [yieldApy, setYieldApy] = useState(8.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setSavedMEV((prev) => prev + Number((Math.random() * 2.5).toFixed(2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/80 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
            MEV Protection & Yield Telemetry
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Zero front-running extraction saved + extra shielded liquidity APY
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 font-mono">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. MEV Saved</span>
          <span className="text-xl font-black text-emerald-400">
            ${savedMEV.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Shielded Yield APY</span>
          <span className="text-xl font-black text-teal-300 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-teal-400" /> {yieldApy}%
          </span>
        </div>
      </div>
    </div>
  );
}

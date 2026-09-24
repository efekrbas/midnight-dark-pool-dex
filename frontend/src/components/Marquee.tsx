"use client";

import React from 'react';
import { Shield, Sparkles, Zap, Lock, Cpu, Activity, TrendingUp } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function Marquee() {
  const tickerItems = [
    { icon: Lock, text: "INSTITUTIONAL ZK-SNARK PRIVACY", highlight: "100% MASKED" },
    { icon: Shield, text: "MEV & FRONT-RUNNING SHIELD", highlight: "ENFORCED" },
    { icon: Sparkles, text: "SHIELDED LIQUIDITY", highlight: "$14.8M ZKUSD" },
    { icon: Cpu, text: "MIDNIGHT PREPROD BLOCK", highlight: "#892,104" },
    { icon: Activity, text: "SNARK PROOF LATENCY", highlight: "1,420 ms" },
    { icon: Zap, text: "MATCHED BLOCK TRADE", highlight: "50,000 tNIGHT @ $1.420" },
    { icon: TrendingUp, text: "ANONYMITY SET SCORE", highlight: "99.8 / 100" },
  ];

  return (
    <div className="w-full bg-black/90 border-b border-zinc-800/60 overflow-hidden py-2 relative z-30 select-none backdrop-blur-md">
      {/* Gradient Fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 transition-colors cursor-pointer shrink-0 text-[11px] font-mono group"
            >
              <Icon className="w-3 h-3 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
              <span className="text-zinc-400 tracking-wider uppercase">{item.text}:</span>
              <span className="font-semibold text-zinc-200 tracking-tight">{item.highlight}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

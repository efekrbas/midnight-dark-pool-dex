"use client";

import React from 'react';
import { Shield, Sparkles, Zap, Lock, Cpu, Activity, TrendingUp } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function Marquee() {
  const tickerItems = [
    { icon: Lock, text: "INSTITUTIONAL ZK-SNARK PRIVACY", highlight: "100% MASKED", color: "text-teal-400" },
    { icon: Shield, text: "ZERO MEV & FRONT-RUNNING SHIELD", highlight: "IMMUNE", color: "text-emerald-400" },
    { icon: Sparkles, text: "TOTAL VALUE SHIELDED", highlight: "$14.8M ZKUSD", color: "text-blue-400" },
    { icon: Cpu, text: "MIDNIGHT PREPROD BLOCK HEIGHT", highlight: "#892,104", color: "text-teal-300" },
    { icon: Activity, text: "SNARK PROOF LATENCY", highlight: "1,420 ms", color: "text-emerald-300" },
    { icon: Zap, text: "RECENT MATCHED BLOCK TRADE", highlight: "50,000 tNIGHT @ $1.420", color: "text-yellow-400" },
    { icon: TrendingUp, text: "ANONYMITY SET SCORE", highlight: "99.8 / 100", color: "text-indigo-400" },
  ];

  return (
    <div className="w-full bg-slate-950/90 border-b border-white/10 overflow-hidden py-2.5 relative z-30 select-none backdrop-blur-md">
      {/* Gradient Fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8">
        {/* Repeat list twice for smooth infinite loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer shrink-0 text-xs font-mono group"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="text-slate-300 tracking-wider font-medium">{item.text}:</span>
              <span className={`font-black ${item.color} tracking-tight`}>{item.highlight}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

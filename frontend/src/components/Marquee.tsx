"use client";

import React from 'react';
import { Shield, Sparkles, Zap, Lock, Cpu, Activity, TrendingUp } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function Marquee() {
  const tickerItems = [
    { icon: Lock, text: "INSTITUTIONAL ZK PRIVACY", highlight: "100% MASKED", color: "text-purple-400" },
    { icon: Shield, text: "MEV & FRONT-RUNNING SHIELD", highlight: "ENFORCED", color: "text-cyan-400" },
    { icon: Sparkles, text: "SHIELDED LIQUIDITY", highlight: "$14.8M ZKUSD", color: "text-emerald-400" },
    { icon: Cpu, text: "MIDNIGHT PREPROD BLOCK", highlight: "#892,104", color: "text-zinc-200" },
    { icon: Activity, text: "SNARK PROOF LATENCY", highlight: "1,420 ms", color: "text-emerald-400" },
    { icon: Zap, text: "MATCHED BLOCK TRADE", highlight: "50,000 tNIGHT @ $1.420", color: "text-amber-300" },
    { icon: TrendingUp, text: "ANONYMITY SET SCORE", highlight: "99.8 / 100", color: "text-cyan-300" },
  ];

  return (
    <div className="w-full bg-black/70 border-b border-white/[0.05] overflow-hidden py-1.5 relative z-30 select-none backdrop-blur-xl group/marquee">
      {/* Ambient Gradient Fades on edges for smooth infinite loop masking */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Ticker (pauses on hover for comfortable inspection) */}
      <div className="animate-marquee flex items-center gap-7 group-hover/marquee:[animation-play-state:paused]">
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2 px-2 py-0.5 rounded transition-all duration-150 cursor-pointer shrink-0 text-[10.5px] font-mono hover:bg-white/[0.04]"
              title="Click for telemetry details"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse shrink-0" />
              <Icon className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              <span className="text-zinc-400 tracking-wider uppercase font-medium">{item.text}:</span>
              <span className={`font-semibold tracking-tight ${item.color}`}>{item.highlight}</span>
              <span className="ml-3 text-zinc-800 select-none">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Eye } from 'lucide-react';

const INITIAL_SELLS = [
  { price: '1.455', heat: 80 },
  { price: '1.440', heat: 45 },
  { price: '1.432', heat: 90 },
  { price: '1.428', heat: 30 },
  { price: '1.425', heat: 60 },
  { price: '1.422', heat: 20 },
];

const INITIAL_BUYS = [
  { price: '1.418', heat: 50 },
  { price: '1.415', heat: 70 },
  { price: '1.410', heat: 35 },
  { price: '1.405', heat: 85 },
  { price: '1.390', heat: 25 },
  { price: '1.385', heat: 95 },
];


export default function DarkOrderBook() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".sell-row", {
      x: -15,
      opacity: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: "power2.out"
    });

    gsap.from(".spread-row", {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      delay: 0.25,
      ease: "back.out(1.5)"
    });

    gsap.from(".buy-row", {
      x: -15,
      opacity: 0,
      duration: 0.35,
      delay: 0.3,
      stagger: 0.04,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col text-sm font-mono select-none">
      <div className="grid grid-cols-2 text-slate-400 text-xs pb-2.5 px-2 border-b border-white/10 mb-2.5 font-sans font-medium">
        <span>Price (ZKUSD)</span>
        <span className="text-right flex items-center justify-end gap-1">
          <Eye className="w-3 h-3 text-teal-400" /> Hover to Reveal
        </span>
      </div>
      
      {/* Sells */}
      <div className="flex flex-col-reverse gap-1 mb-3">
        {INITIAL_SELLS.map((level, i) => (
          <div key={i} className="sell-row relative group cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div 
              className="absolute top-0 right-0 h-full bg-red-500/10 group-hover:bg-red-500/20 rounded-lg origin-right transition-all duration-500"
              style={{ width: `${level.heat}%` }}
            />
            <div className="grid grid-cols-2 relative z-10 items-center">
              <span className="text-red-400 font-bold group-hover:text-red-300 transition-colors">{level.price}</span>
              <span className="text-right text-gray-400 blur-[4px] group-hover:blur-none group-hover:text-white transition-all duration-300 font-mono text-xs">
                ~{(level.heat * 1234).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Spread Divider */}
      <div className="spread-row py-3 px-4 text-center border-y border-teal-500/30 my-2.5 bg-gradient-to-r from-teal-900/30 via-slate-900/60 to-blue-900/30 text-emerald-400 font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.15)] flex items-center justify-center gap-2">
        <span>1.420</span>
        <span className="text-xs text-teal-300/90 font-sans font-medium bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30 flex items-center">
          <Sparkles className="w-3 h-3 mr-1 inline" /> Spread: Hidden
        </span>
      </div>

      {/* Buys */}
      <div className="flex flex-col gap-1 mt-3">
        {INITIAL_BUYS.map((level, i) => (
          <div key={i} className="buy-row relative group cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-all duration-300 border border-transparent hover:border-emerald-500/20">
            <div 
              className="absolute top-0 right-0 h-full bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-lg origin-right transition-all duration-500"
              style={{ width: `${level.heat}%` }}
            />
            <div className="grid grid-cols-2 relative z-10 items-center">
              <span className="text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors">{level.price}</span>
              <span className="text-right text-gray-400 blur-[4px] group-hover:blur-none group-hover:text-white transition-all duration-300 font-mono text-xs">
                ~{(level.heat * 1456).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center px-3 py-2 bg-slate-950/60 rounded-xl border border-white/5">
        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
          Liquidity depth is masked via ZK circuits. <span className="text-teal-300 font-medium">Heat bars</span> indicate relative volume commitments without leaking precise order sizes.
        </p>
      </div>
    </div>
  );
}
// Level 6 ZK liquidity blur visual tweak

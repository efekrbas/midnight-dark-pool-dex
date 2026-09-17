"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Eye, Radio, AlertCircle } from 'lucide-react';
import { INDEXER_URL } from '@/lib/contract';

interface OrderLevel {
  price: string;
  heat: number;
  estimatedVolume?: string;
  isSimulated: boolean;
}

const DEMO_SELLS: OrderLevel[] = [
  { price: '1.455', heat: 80, isSimulated: true },
  { price: '1.440', heat: 45, isSimulated: true },
  { price: '1.432', heat: 90, isSimulated: true },
  { price: '1.428', heat: 30, isSimulated: true },
  { price: '1.425', heat: 60, isSimulated: true },
  { price: '1.422', heat: 20, isSimulated: true },
];

const DEMO_BUYS: OrderLevel[] = [
  { price: '1.418', heat: 50, isSimulated: true },
  { price: '1.415', heat: 70, isSimulated: true },
  { price: '1.410', heat: 35, isSimulated: true },
  { price: '1.405', heat: 85, isSimulated: true },
  { price: '1.390', heat: 25, isSimulated: true },
  { price: '1.385', heat: 95, isSimulated: true },
];

export default function DarkOrderBook() {
  const container = useRef<HTMLDivElement>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  useEffect(() => {
    // Probe live Midnight Preprod indexer
    async function checkIndexer() {
      try {
        const res = await fetch(INDEXER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'query { block { height } }' }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data?.block?.height) {
            setBlockHeight(json.data.block.height);
            setIsLiveConnected(true);
          }
        }
      } catch {
        setIsLiveConnected(false);
      }
    }
    checkIndexer();
  }, []);

  useGSAP(() => {
    gsap.from(".sell-row", {
      x: -15,
      opacity: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: "power2.out",
    });

    gsap.from(".spread-row", {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      delay: 0.25,
      ease: "back.out(1.5)",
    });

    gsap.from(".buy-row", {
      x: -15,
      opacity: 0,
      duration: 0.35,
      delay: 0.3,
      stagger: 0.04,
      ease: "power2.out",
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      role="region"
      aria-label="Shielded Dark Pool Order Book"
      className="flex flex-col text-sm font-mono select-none w-full max-w-full overflow-x-hidden"
    >
      {/* Clear Status & Demo Data Disclosure Banner */}
      <div className="mb-3 px-3 py-2 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center justify-between text-[10px] font-mono">
        <span className="flex items-center gap-1.5 text-amber-300 font-bold">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>[DEMO DATA - SIMULATED LEVELS]</span>
        </span>
        <span className="text-slate-400 flex items-center gap-1">
          <Radio className={`w-3 h-3 ${isLiveConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
          <span>{isLiveConnected ? `Preprod #${blockHeight}` : 'Indexer Syncing'}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 text-slate-400 text-xs pb-2.5 px-2 border-b border-white/10 mb-2.5 font-sans font-medium">
        <span>Price (ZKUSD)</span>
        <span className="text-right flex items-center justify-end gap-1">
          <Eye className="w-3 h-3 text-teal-400" /> Hover to Reveal
        </span>
      </div>

      {/* Sells */}
      <div className="flex flex-col-reverse gap-1 mb-3">
        {DEMO_SELLS.map((level, i) => (
          <div
            key={i}
            role="row"
            aria-label={`Ask level at price ${level.price}`}
            className="sell-row relative group cursor-pointer px-2.5 py-2 min-h-[36px] rounded-lg hover:bg-red-500/10 transition-all duration-300 border border-transparent hover:border-red-500/20"
          >
            <div
              className="absolute top-0 right-0 h-full bg-red-500/10 group-hover:bg-red-500/20 rounded-lg origin-right transition-all duration-500"
              style={{ width: `${level.heat}%` }}
            />
            <div className="grid grid-cols-2 relative z-10 items-center">
              <span className="text-red-400 font-bold group-hover:text-red-300 transition-colors flex items-center gap-1.5">
                {level.price}
                <span className="text-[9px] font-normal px-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">DEMO</span>
              </span>
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
          <Sparkles className="w-3 h-3 mr-1 inline" /> Spread: Hidden (ZK Shielded)
        </span>
      </div>

      {/* Buys */}
      <div className="flex flex-col gap-1 mt-3">
        {DEMO_BUYS.map((level, i) => (
          <div
            key={i}
            role="row"
            aria-label={`Bid level at price ${level.price}`}
            className="buy-row relative group cursor-pointer px-2.5 py-2 min-h-[36px] rounded-lg hover:bg-emerald-500/10 transition-all duration-300 border border-transparent hover:border-emerald-500/20"
          >
            <div
              className="absolute top-0 right-0 h-full bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-lg origin-right transition-all duration-500"
              style={{ width: `${level.heat}%` }}
            />
            <div className="grid grid-cols-2 relative z-10 items-center">
              <span className="text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                {level.price}
                <span className="text-[9px] font-normal px-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">DEMO</span>
              </span>
              <span className="text-right text-gray-400 blur-[4px] group-hover:blur-none group-hover:text-white transition-all duration-300 font-mono text-xs">
                ~{(level.heat * 1456).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center px-3 py-2 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
          Individual order values remain confidential inside Compact circuits.
        </p>
        <p className="text-[10px] text-amber-400/80 font-mono">
          Note: Macro depth levels are labelled demo mockups until dark pool crossing triggers on Preprod.
        </p>
      </div>
    </div>
  );
}

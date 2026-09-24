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
      {/* Clear Status Disclosure Banner */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-between text-[11px] font-mono">
        <span className="flex items-center gap-1.5 text-zinc-400">
          <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span>Macro Depth Benchmark</span>
        </span>
        <span className="text-zinc-500 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isLiveConnected ? 'bg-zinc-400' : 'bg-zinc-600'}`} />
          <span>{isLiveConnected ? `Preprod #${blockHeight}` : 'Indexer Syncing'}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 text-zinc-500 text-[11px] pb-2 px-2 border-b border-zinc-900 mb-2 font-mono uppercase tracking-wider">
        <span>Price (ZKUSD)</span>
        <span className="text-right flex items-center justify-end gap-1">
          <Eye className="w-3 h-3 text-zinc-400" /> Hover to Reveal
        </span>
      </div>

      {/* Sells */}
      <div className="flex flex-col-reverse gap-0.5 mb-2">
        {DEMO_SELLS.map((level, i) => (
          <div
            key={i}
            role="row"
            aria-label={`Ask level at price ${level.price}`}
            className="sell-row relative group cursor-pointer px-2 py-1.5 rounded hover:bg-rose-950/20 transition-colors"
          >
            <div
              className="absolute top-0 right-0 h-full bg-rose-500/[0.08] rounded origin-right transition-all"
              style={{ width: `${level.heat}%` }}
            />
            <div className="grid grid-cols-2 relative z-10 items-center font-mono text-xs">
              <span className="text-rose-400 font-medium">
                {level.price}
              </span>
              <span className="text-right text-zinc-500 blur-[3px] group-hover:blur-none group-hover:text-zinc-200 transition-all">
                ~{(level.heat * 1234).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Spread Divider */}
      <div className="spread-row py-2 px-3 text-center border-y border-zinc-850 my-2 bg-zinc-900/60 font-mono text-xs text-white rounded flex items-center justify-between">
        <span className="font-bold text-sm">1.420</span>
        <span className="text-[10px] text-zinc-400 font-mono bg-zinc-800 px-2 py-0.5 rounded">
          Spread: Zero-Knowledge Shielded
        </span>
      </div>

      {/* Buys */}
      <div className="flex flex-col gap-0.5 mt-2">
        {DEMO_BUYS.map((level, i) => (
          <div
            key={i}
            role="row"
            aria-label={`Bid level at price ${level.price}`}
            className="buy-row relative group cursor-pointer px-2 py-1.5 rounded hover:bg-zinc-950/20 transition-colors"
          >
            <div
              className="absolute top-0 right-0 h-full bg-zinc-500/[0.08] rounded origin-right transition-all"
              style={{ width: `${level.heat}%` }}
            />
            <div className="grid grid-cols-2 relative z-10 items-center font-mono text-xs">
              <span className="text-zinc-400 font-medium">
                {level.price}
              </span>
              <span className="text-right text-zinc-500 blur-[3px] group-hover:blur-none group-hover:text-zinc-200 transition-all">
                ~{(level.heat * 1456).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center px-3 py-2 bg-black rounded-lg border border-zinc-900 space-y-1">
        <p className="text-[10px] text-zinc-500 font-mono">
          Order amounts and limits remain confidential inside Compact ZK circuits.
        </p>
      </div>
    </div>
  );
}

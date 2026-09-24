"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, X } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface TradeFeedItem {
  id: string;
  pair: string;
  amount: string;
  price: string;
  time: string;
}

const LIVE_TRADE_STREAM: TradeFeedItem[] = [
  { id: '1', pair: 'tNIGHT/ZKUSD', amount: '25,000 tNIGHT', price: '$1.420', time: 'Just now' },
  { id: '2', pair: 'DUST/ZKUSD', amount: '100,000 DUST', price: '$0.850', time: '12s ago' },
  { id: '3', pair: 'tADA/ZKUSD', amount: '50,000 tADA', price: '$0.410', time: '45s ago' },
];

export default function LiveTradeFeed() {
  const [activeItem, setActiveItem] = useState<TradeFeedItem | null>(LIVE_TRADE_STREAM[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % LIVE_TRADE_STREAM.length;
      setActiveItem(LIVE_TRADE_STREAM[index]);
      sounds.playZKTick();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !activeItem) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs w-full bg-zinc-950/95 backdrop-blur-md border border-zinc-800/80 p-3 rounded-lg shadow-2xl animate-fadeIn">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-2 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
          <span className="tracking-wider uppercase">Live ZK Settled Block</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="flex justify-between items-center font-mono text-xs">
        <div>
          <span className="text-white font-semibold block">{activeItem.amount}</span>
          <span className="text-[10px] text-zinc-400">{activeItem.pair}</span>
        </div>
        <div className="text-right">
          <span className="text-zinc-200 font-semibold block">{activeItem.price}</span>
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 inline" /> ZK Verified
          </span>
        </div>
      </div>
    </div>
  );
}

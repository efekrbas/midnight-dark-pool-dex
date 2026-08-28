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
    <div className="fixed bottom-6 left-6 z-40 max-w-xs w-full bg-slate-900/90 backdrop-blur-2xl border border-teal-500/40 p-3.5 rounded-2xl shadow-lg shadow-teal-500/20 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-teal-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <Sparkles className="w-3 h-3" />
          <span>LIVE ZK MATCHED BLOCK</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-0.5 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="flex justify-between items-center font-mono text-xs">
        <div>
          <span className="text-white font-bold block">{activeItem.amount}</span>
          <span className="text-[10px] text-slate-400">{activeItem.pair}</span>
        </div>
        <div className="text-right">
          <span className="text-teal-400 font-bold block">{activeItem.price}</span>
          <span className="text-[10px] text-teal-300 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 inline" /> ZK Settled
          </span>
        </div>
      </div>
    </div>
  );
}

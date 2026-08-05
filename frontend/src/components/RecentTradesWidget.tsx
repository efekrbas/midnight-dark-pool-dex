"use client";

import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, TrendingDown, ArrowRightLeft, Shield } from 'lucide-react';

interface Trade {
  id: string;
  pair: string;
  side: 'BUY' | 'SELL';
  price: string;
  amount: string;
  time: string;
}

export default function RecentTradesWidget() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const pairs = ['tNIGHT/DUST', 'ZKUSD/tNIGHT', 'DUST/ZKUSD'];
    const generateTrade = (): Trade => {
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const side = Math.random() > 0.5 ? 'BUY' : 'SELL';
      const price = (Math.random() * 50 + 1).toFixed(4);
      const amount = (Math.random() * 10000 + 100).toFixed(2);
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      return { id: Math.random().toString(36).slice(2, 9), pair, side, price, amount, time };
    };

    // Initial trades
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrades(Array.from({ length: 8 }, generateTrade));

    // Add new trade every 3-6 seconds
    const interval = setInterval(() => {
      setTrades(prev => [generateTrade(), ...prev.slice(0, 7)]);
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
          <ArrowRightLeft className="w-3.5 h-3.5 text-teal-400" />
          <span>Recent Dark Pool Fills</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Trades List */}
      <div className="divide-y divide-white/5">
        {trades.map((trade) => (
          <div key={trade.id} className="px-4 py-2.5 flex items-center justify-between text-[11px] font-mono hover:bg-white/[0.02] transition-colors animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${trade.side === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {trade.side === 'BUY' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              </div>
              <div>
                <span className="text-white font-bold">{trade.pair}</span>
                <span className={`ml-2 ${trade.side === 'BUY' ? 'text-emerald-400' : 'text-red-400'}`}>{trade.side}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>{trade.price}</span>
              <span className="text-slate-500 w-20 text-right">{trade.amount}</span>
              <span className="text-slate-600 w-16 text-right flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-teal-400/50" />
                {trade.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

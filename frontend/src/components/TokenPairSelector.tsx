"use client";

import React, { useState } from 'react';
import { ChevronDown, Check, Sparkles, TrendingUp, Lock } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export interface TokenPair {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  type: 'DARK_POOL' | 'SHIELDED';
  sparkline: string;
}

export const availablePairs: TokenPair[] = [
  {
    symbol: 'tNIGHT / ZKUSD',
    name: 'Midnight Native Token',
    price: '$1.420',
    change: '+2.4%',
    isPositive: true,
    type: 'DARK_POOL',
    sparkline: 'M0,15 L10,12 L20,18 L30,10 L40,8 L50,5'
  },
  {
    symbol: 'DUST / ZKUSD',
    name: 'Midnight Gas Asset',
    price: '$0.850',
    change: '+5.1%',
    isPositive: true,
    type: 'SHIELDED',
    sparkline: 'M0,18 L10,14 L20,10 L30,12 L40,6 L50,3'
  },
  {
    symbol: 'tADA / ZKUSD',
    name: 'Wrapped Cardano Testnet',
    price: '$0.410',
    change: '-0.8%',
    isPositive: false,
    type: 'DARK_POOL',
    sparkline: 'M0,5 L10,8 L20,6 L30,14 L40,16 L50,18'
  }
];

interface TokenPairSelectorProps {
  currentPair: TokenPair;
  onSelectPair: (pair: TokenPair) => void;
}

export default function TokenPairSelector({ currentPair, onSelectPair }: TokenPairSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (pair: TokenPair) => {
    sounds.playClick();
    onSelectPair(pair);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Selector Button */}
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-blue-500/40 transition-all text-left group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center font-extrabold text-xs text-white shadow-md shadow-teal-500/30 border border-teal-400/20">
          {currentPair.symbol.split(' ')[0]}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-white">{currentPair.symbol}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-[10px] text-slate-400 font-mono">{currentPair.type}</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 p-2 space-y-1 animate-fadeIn">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 flex items-center justify-between">
              <span>Select Dark Pool Pair</span>
              <Lock className="w-3 h-3 text-teal-400" />
            </div>

            {availablePairs.map((pair) => {
              const isSelected = pair.symbol === currentPair.symbol;
              return (
                <button
                  key={pair.symbol}
                  onClick={() => handleSelect(pair)}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-all text-left ${
                    isSelected
                      ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                      : 'hover:bg-white/5 border border-transparent text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400">
                      {pair.symbol.split(' ')[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{pair.symbol}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{pair.name}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <svg className="w-10 h-5" viewBox="0 0 50 20">
                      <path
                        d={pair.sparkline}
                        fill="none"
                        stroke={pair.isPositive ? '#10b981' : '#ef4444'}
                        strokeWidth="2"
                      />
                    </svg>
                    <div>
                      <p className="text-xs font-mono font-bold text-white">{pair.price}</p>
                      <p className={`text-[10px] font-mono ${pair.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pair.change}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

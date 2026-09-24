"use client";

import React, { useState } from 'react';
import DarkOrderBook from '../../components/DarkOrderBook';
import OrderEntry from '../../components/OrderEntry';
import ZKCandlestickChart from '../../components/ZKCandlestickChart';
import ZKDepthChart from '../../components/ZKDepthChart';
import RecentTradesWidget from '../../components/RecentTradesWidget';
import TokenPairSelector, { availablePairs, TokenPair } from '../../components/TokenPairSelector';
import { ShieldCheck, Lock, TrendingUp, BarChart2, Layers, LayoutGrid } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function TradePage() {
  const [selectedPair, setSelectedPair] = useState<TokenPair>(availablePairs[0]);
  const [activeChartView, setActiveChartView] = useState<'CANDLES' | 'DEPTH'>('CANDLES');
  const [layoutMode, setLayoutMode] = useState<'STANDARD' | 'CHART_FOCUS' | 'ORDERBOOK_FOCUS'>('STANDARD');

  const getGridCols = () => {
    switch (layoutMode) {
      case 'CHART_FOCUS':
        return { chart: 'lg:col-span-8', orderbook: 'lg:col-span-2', form: 'lg:col-span-2' };
      case 'ORDERBOOK_FOCUS':
        return { chart: 'lg:col-span-4', orderbook: 'lg:col-span-5', form: 'lg:col-span-3' };
      default:
        return { chart: 'lg:col-span-6', orderbook: 'lg:col-span-3', form: 'lg:col-span-3' };
    }
  };

  const cols = getGridCols();

  return (
    <div className="w-full max-w-[1700px] mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      
      {/* Institutional Telemetry Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 gap-4">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          
          {/* Token Pair Switcher */}
          <TokenPairSelector currentPair={selectedPair} onSelectPair={(p) => setSelectedPair(p)} />

          <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

          <div>
            <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Oracle Price</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-white font-mono font-bold text-base">{selectedPair.price}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                selectedPair.isPositive ? 'text-zinc-400 bg-zinc-950/40 border border-zinc-800/40' : 'text-rose-400 bg-rose-950/40 border border-rose-900/40'
              }`}>
                <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" /> {selectedPair.change}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

          <div>
            <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">24h Shielded Depth</p>
            <p className="text-zinc-300 font-mono font-medium text-sm mt-0.5">~1,420,000 ZKUSD</p>
          </div>
        </div>
        
        {/* Right Header Status Badges & Chart View Toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
          
          {/* Terminal Grid Layout Switcher */}
          <div className="flex bg-black p-1 rounded-lg border border-zinc-850 text-xs font-mono">
            {(['STANDARD', 'CHART_FOCUS', 'ORDERBOOK_FOCUS'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sounds.playClick();
                  setLayoutMode(mode);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  layoutMode === mode
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {mode === 'STANDARD' ? 'Standard' : mode === 'CHART_FOCUS' ? 'Chart' : 'Book'}
              </button>
            ))}
          </div>

          {/* Chart Mode Switcher */}
          <div className="flex bg-black p-1 rounded-lg border border-zinc-850 text-xs font-mono">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveChartView('CANDLES');
              }}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 text-[11px] font-medium transition-all cursor-pointer ${
                activeChartView === 'CANDLES'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <BarChart2 className="w-3 h-3" />
              <span>Candles</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveChartView('DEPTH');
              }}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 text-[11px] font-medium transition-all cursor-pointer ${
                activeChartView === 'DEPTH'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Depth</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
        
        {/* Left Column - Dynamic Chart View */}
        <div className={`${cols.chart} flex flex-col transition-all duration-500`}>
          {activeChartView === 'CANDLES' ? <ZKCandlestickChart /> : <ZKDepthChart />}
        </div>

        {/* Middle Column - Dark Order Book */}
        <div className={`${cols.orderbook} glass-panel overflow-hidden flex flex-col border border-white/10 hover:border-zinc-700/30 transition-all duration-500 shadow-2xl bg-zinc-900/70 backdrop-blur-xl rounded-2xl`}>
          <div className="p-4 border-b border-white/10 bg-zinc-950/40 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide">Dark Order Book</h3>
              <p className="text-[10px] text-zinc-300 mt-0.5 font-mono flex items-center">
                <Lock className="w-2.5 h-2.5 mr-1 inline" /> Volumes cryptographically blurred
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
            <DarkOrderBook />
          </div>
        </div>

        {/* Right Column - Order Entry Form */}
        <div className={`${cols.form} glass-panel overflow-hidden flex flex-col border border-white/10 hover:border-zinc-700/30 transition-all duration-500 shadow-2xl bg-zinc-900/70 backdrop-blur-xl rounded-2xl`}>
          <OrderEntry />
        </div>
      </div>

      {/* Recent Trades */}
      <RecentTradesWidget />

    </div>
  );
}

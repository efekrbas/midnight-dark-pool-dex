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
      <div className="flex flex-col lg:flex-row items-center justify-between glass-panel p-5 rounded-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] bg-slate-900/80 backdrop-blur-2xl gap-4">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          
          {/* Token Pair Switcher */}
          <TokenPairSelector currentPair={selectedPair} onSelectPair={(p) => setSelectedPair(p)} />

          <div className="h-10 w-px bg-white/10 hidden sm:block" />

          <div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Oracle Reference Price</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-emerald-400 font-mono font-bold text-lg">{selectedPair.price}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded flex items-center font-mono ${
                selectedPair.isPositive ? 'text-emerald-400/80 bg-emerald-500/10' : 'text-red-400/80 bg-red-500/10'
              }`}>
                <TrendingUp className="w-3 h-3 mr-1 inline" /> {selectedPair.change}
              </span>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10 hidden sm:block" />

          <div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">24h Blurred Volume</p>
            <p className="text-slate-200 font-mono font-bold text-lg mt-0.5">~1,250,000 - 1,500,000 ZKUSD</p>
          </div>
        </div>
        
        {/* Right Header Status Badges & Chart View Toggle */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          
          {/* Terminal Grid Layout Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {(['STANDARD', 'CHART_FOCUS', 'ORDERBOOK_FOCUS'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sounds.playClick();
                  setLayoutMode(mode);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  layoutMode === mode
                    ? 'bg-teal-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'STANDARD' ? 'Standard' : mode === 'CHART_FOCUS' ? 'Chart Focus' : 'Book Focus'}
              </button>
            ))}
          </div>

          {/* Chart Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveChartView('CANDLES');
              }}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activeChartView === 'CANDLES'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Candles</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveChartView('DEPTH');
              }}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activeChartView === 'DEPTH'
                  ? 'bg-teal-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
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
        <div className={`${cols.orderbook} glass-panel overflow-hidden flex flex-col border border-white/10 hover:border-teal-500/30 transition-all duration-500 shadow-2xl bg-slate-900/70 backdrop-blur-xl rounded-2xl`}>
          <div className="p-4 border-b border-white/10 bg-slate-950/40 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide">Dark Order Book</h3>
              <p className="text-[10px] text-teal-300 mt-0.5 font-mono flex items-center">
                <Lock className="w-2.5 h-2.5 mr-1 inline" /> Volumes cryptographically blurred
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
            <DarkOrderBook />
          </div>
        </div>

        {/* Right Column - Order Entry Form */}
        <div className={`${cols.form} glass-panel overflow-hidden flex flex-col border border-white/10 hover:border-blue-500/30 transition-all duration-500 shadow-2xl bg-slate-900/70 backdrop-blur-xl rounded-2xl`}>
          <OrderEntry />
        </div>
      </div>

      {/* Recent Trades */}
      <RecentTradesWidget />

    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Activity, Eye, EyeOff, Sparkles, Cpu } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  zkBand: 'HIGH_LIQUIDITY' | 'MEDIUM_LIQUIDITY' | 'MASKED';
}

const CANDLESTICK_FEED: CandleData[] = [
  { time: '12:00', open: 1.35, high: 1.38, low: 1.34, close: 1.37, volume: 140000, zkBand: 'MEDIUM_LIQUIDITY' },
  { time: '13:00', open: 1.37, high: 1.40, low: 1.36, close: 1.39, volume: 220000, zkBand: 'HIGH_LIQUIDITY' },
  { time: '14:00', open: 1.39, high: 1.41, low: 1.38, close: 1.38, volume: 180000, zkBand: 'MEDIUM_LIQUIDITY' },
  { time: '15:00', open: 1.38, high: 1.43, low: 1.37, close: 1.42, volume: 310000, zkBand: 'HIGH_LIQUIDITY' },
  { time: '16:00', open: 1.42, high: 1.44, low: 1.40, close: 1.41, volume: 195000, zkBand: 'MASKED' },
  { time: '17:00', open: 1.41, high: 1.45, low: 1.41, close: 1.44, volume: 420000, zkBand: 'HIGH_LIQUIDITY' },
  { time: '18:00', open: 1.44, high: 1.46, low: 1.42, close: 1.43, volume: 280000, zkBand: 'MEDIUM_LIQUIDITY' },
  { time: '19:00', open: 1.43, high: 1.45, low: 1.41, close: 1.42, volume: 350000, zkBand: 'HIGH_LIQUIDITY' },
];

export default function ZKCandlestickChart() {
  const [timeframe, setTimeframe] = useState<'1H' | '4H' | '1D' | '1W'>('4H');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  const minPrice = 1.30;
  const maxPrice = 1.50;

  const getPercent = (price: number) => {
    return ((price - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const handleHeatmapToggle = () => {
    sounds.playClick();
    setShowHeatmap(!showHeatmap);
  };

  const handleTimeframeChange = (tf: '1H' | '4H' | '1D' | '1W') => {
    sounds.playClick();
    setTimeframe(tf);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/70 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl relative font-sans">
      
      {/* Top Header Controls */}
      <div className="p-4 border-b border-white/10 flex flex-wrap justify-between items-center bg-slate-950/90 gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide flex items-center gap-2">
              ZK Oracle Candlestick & Liquidity Heatmap
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
                BLURRED DEPTH
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Reference Price: $1.420 ZKUSD (+2.4%)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Heatmap Overlay Toggle Button */}
          <button
            onClick={handleHeatmapToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
              showHeatmap
                ? 'bg-slate-800 text-blue-300 border-slate-600 shadow-md'
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            {showHeatmap ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>ZK Heatmap: {showHeatmap ? 'ON' : 'OFF'}</span>
          </button>

          {/* Timeframe Switcher */}
          <div className="flex gap-1 bg-slate-900/90 p-1 rounded-lg border border-white/10 text-xs font-mono">
            {(['1H', '4H', '1D', '1W'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`px-2.5 py-1 rounded transition-all font-semibold ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Area */}
      <div className="flex-1 p-6 relative flex flex-col justify-between overflow-hidden">
        
        {/* Background Grid & Heatmap Overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Top Blurred Order Accumulation Zone */}
            <div className="absolute top-[15%] left-0 right-0 h-[22%] bg-gradient-to-r from-blue-600/10 via-slate-600/10 to-blue-600/10 blur-xl border-y border-slate-700 animate-pulse-glow" />
            <div className="absolute top-[18%] left-4 text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 w-max">
              🔒 High Institutional Dark Liquidity Zone (~1.450 - 1.480)
            </div>

            {/* Bottom Blurred Liquidity Support Zone */}
            <div className="absolute bottom-[20%] left-0 right-0 h-[18%] bg-gradient-to-r from-emerald-600/15 via-blue-600/20 to-emerald-600/15 blur-xl border-y border-emerald-500/20" />
            <div className="absolute bottom-[23%] left-4 text-[10px] font-mono text-emerald-300/70 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 w-max">
              🔒 Shielded Support Accumulation (~1.340 - 1.360)
            </div>
          </div>
        )}

        {/* Horizontal Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-15 z-0">
          <div className="w-full border-b border-dashed border-slate-400 h-0" />
          <div className="w-full border-b border-dashed border-slate-400 h-0" />
          <div className="w-full border-b border-dashed border-slate-400 h-0" />
          <div className="w-full border-b border-dashed border-slate-400 h-0" />
        </div>

        {/* Right Price Scale */}
        <div className="absolute right-4 top-6 bottom-12 flex flex-col justify-between text-[11px] font-mono text-slate-500 pointer-events-none z-10">
          <span>$1.500</span>
          <span>$1.450</span>
          <span className="text-emerald-400 font-bold">$1.420 ◄</span>
          <span>$1.380</span>
          <span>$1.300</span>
        </div>

        {/* Live SNARK Circuit Status Tag */}
        <div className="relative z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl w-max shadow-lg">
          <Cpu className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-300">
            ZK Oracle Feed: <span className="text-emerald-400 font-semibold">Verified</span>
          </span>
        </div>

        {/* Candlesticks Visualization Container */}
        <div className="relative z-10 my-4 h-[240px] flex items-end justify-between px-8 gap-4">
          {CANDLESTICK_FEED.map((candle, idx) => {
            const isGreen = candle.close >= candle.open;
            const topPrice = Math.max(candle.open, candle.close);
            const bottomPrice = Math.min(candle.open, candle.close);
            
            const candleTopPct = 100 - getPercent(topPrice);
            const candleBottomPct = 100 - getPercent(bottomPrice);
            const highPct = 100 - getPercent(candle.high);
            const lowPct = 100 - getPercent(candle.low);
            
            // Precise candle height calculation
            const rawHeightPct = candleBottomPct - candleTopPct;
            const heightPct = Math.max(rawHeightPct, 1.2);
            const wickHeightPct = Math.max(lowPct - highPct, 1);

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end relative h-full group cursor-pointer"
                onMouseEnter={() => setHoveredCandle(candle)}
                onMouseLeave={() => setHoveredCandle(null)}
              >
                {/* Thin Wick line */}
                <div
                  className={`absolute w-[1.5px] transition-colors ${
                    isGreen ? 'bg-emerald-400/80 group-hover:bg-emerald-300' : 'bg-red-400/80 group-hover:bg-red-300'
                  }`}
                  style={{
                    top: `${highPct}%`,
                    height: `${wickHeightPct}%`
                  }}
                />

                {/* Sharp Rectangular Candle Body */}
                <div
                  className={`w-4 sm:w-5 rounded-[1px] transition-all duration-200 shadow-sm ${
                    isGreen
                      ? 'bg-emerald-500 border border-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.8)] group-hover:bg-emerald-400'
                      : 'bg-red-500 border border-red-400 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.8)] group-hover:bg-red-400'
                  }`}
                  style={{
                    position: 'absolute',
                    top: `${candleTopPct}%`,
                    height: `${heightPct}%`
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Hovered Candle Tooltip Overlay */}
        {hoveredCandle && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-3 rounded-xl shadow-2xl z-30 flex items-center gap-6 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono font-bold text-white">{hoveredCandle.time} UTC</span>
            </div>
            <div className="text-xs font-mono flex gap-4">
              <div><span className="text-slate-400">O:</span> <span className="text-slate-200">${hoveredCandle.open}</span></div>
              <div><span className="text-slate-400">H:</span> <span className="text-emerald-400">${hoveredCandle.high}</span></div>
              <div><span className="text-slate-400">L:</span> <span className="text-red-400">${hoveredCandle.low}</span></div>
              <div><span className="text-slate-400">C:</span> <span className="text-slate-200">${hoveredCandle.close}</span></div>
            </div>
            <div className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
              ZK Band: {hoveredCandle.zkBand}
            </div>
          </div>
        )}

        {/* Bottom Time Labels */}
        <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-white/5 relative z-10 px-4">
          {CANDLESTICK_FEED.map((c, i) => (
            <span key={i} className="text-slate-400">{c.time}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

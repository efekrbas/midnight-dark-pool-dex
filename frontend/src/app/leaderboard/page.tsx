"use client";

import React, { useState } from 'react';
import { Trophy, Medal, TrendingUp, Shield, Eye, EyeOff, Crown, Sparkles, ArrowUpDown } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface Trader {
  rank: number;
  wallet: string;
  volume: string;
  pnl: string;
  pnlPercent: number;
  trades: number;
  badge: string;
  badgeColor: string;
}

const traders: Trader[] = [
  { rank: 1, wallet: 'mn17f2...a91', volume: '$12,450,000', pnl: '+$842,300', pnlPercent: 34.2, trades: 1247, badge: '🐋 Whale', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { rank: 2, wallet: 'mn13e8...f02', volume: '$9,870,000', pnl: '+$621,000', pnlPercent: 28.1, trades: 983, badge: '🦈 Shark', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { rank: 3, wallet: 'mn1b14...c7d', volume: '$7,320,000', pnl: '+$489,500', pnlPercent: 22.7, trades: 756, badge: '🦈 Shark', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { rank: 4, wallet: 'mn19a1...e44', volume: '$5,100,000', pnl: '+$312,800', pnlPercent: 18.3, trades: 612, badge: '🐬 Dolphin', badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { rank: 5, wallet: 'mn12d6...b88', volume: '$4,200,000', pnl: '+$198,400', pnlPercent: 14.6, trades: 534, badge: '🐬 Dolphin', badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { rank: 6, wallet: 'mn1f73...112', volume: '$3,650,000', pnl: '+$145,200', pnlPercent: 11.2, trades: 423, badge: '🐡 Fish', badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { rank: 7, wallet: 'mn11c9...d55', volume: '$2,980,000', pnl: '-$67,300', pnlPercent: -4.1, trades: 387, badge: '🐡 Fish', badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { rank: 8, wallet: 'mn18b2...a09', volume: '$2,410,000', pnl: '+$89,100', pnlPercent: 7.8, trades: 298, badge: '🦐 Shrimp', badgeColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  { rank: 9, wallet: 'mn15e0...c31', volume: '$1,870,000', pnl: '+$42,600', pnlPercent: 3.2, trades: 245, badge: '🦐 Shrimp', badgeColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  { rank: 10, wallet: 'mn1d47...f76', volume: '$1,320,000', pnl: '-$28,400', pnlPercent: -2.8, trades: 189, badge: '🦐 Shrimp', badgeColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
];

type SortKey = 'rank' | 'volume' | 'pnl' | 'trades';

export default function LeaderboardPage() {
  const [showWallets, setShowWallets] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('rank');

  const handleSort = (key: SortKey) => {
    sounds.playClick();
    setSortBy(key);
  };

  const sorted = [...traders].sort((a, b) => {
    switch (sortBy) {
      case 'volume': return parseFloat(b.volume.replace(/[$,]/g, '')) - parseFloat(a.volume.replace(/[$,]/g, ''));
      case 'pnl': return b.pnlPercent - a.pnlPercent;
      case 'trades': return b.trades - a.trades;
      default: return a.rank - b.rank;
    }
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-4 h-4 text-amber-400" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-slate-300" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-amber-600" />;
    return <span className="text-xs text-slate-500 font-mono w-4 text-center">{rank}</span>;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(245,158,11,0.3)] border border-white/20">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dark Pool Leaderboard
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Top anonymous traders ranked by shielded volume. All wallets ZK-masked.
            </p>
          </div>
        </div>

        <button
          onClick={() => { sounds.playClick(); setShowWallets(!showWallets); }}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 border border-white/10 transition-all"
        >
          {showWallets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showWallets ? 'Mask Wallets' : 'Reveal Wallets'}</span>
        </button>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {traders.slice(0, 3).map((t, i) => {
          const heights = ['h-40', 'h-32', 'h-28'];
          const order = [1, 0, 2];
          const trader = traders[order[i]];
          const gradients = [
            'from-amber-500/20 to-amber-600/10 border-amber-500/40',
            'from-slate-400/20 to-slate-500/10 border-slate-400/40',
            'from-amber-700/20 to-amber-800/10 border-amber-700/40',
          ];
          return (
            <div key={trader.rank} className={`glass-panel rounded-2xl border bg-gradient-to-b ${gradients[i]} p-5 flex flex-col items-center justify-end ${heights[i]} transition-all hover:-translate-y-1`}>
              <span className="text-2xl mb-1">{trader.badge.split(' ')[0]}</span>
              <span className="text-lg font-black text-white">#{trader.rank}</span>
              <span className="text-xs font-mono text-slate-300 mt-1">{showWallets ? trader.wallet : 'mn1••••••'}</span>
              <span className="text-xs font-bold text-emerald-400 mt-1">{trader.pnl}</span>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="glass-panel rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 text-slate-400">
                <th className="text-left px-4 py-3 font-bold">#</th>
                <th className="text-left px-4 py-3 font-bold">Trader</th>
                <th className="text-left px-4 py-3 font-bold">Badge</th>
                <th className="text-left px-4 py-3 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('volume')}>
                  <span className="flex items-center gap-1">Volume <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('pnl')}>
                  <span className="flex items-center gap-1">PnL <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('trades')}>
                  <span className="flex items-center gap-1">Trades <ArrowUpDown className="w-3 h-3" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((trader) => (
                <tr key={trader.rank} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">{getRankIcon(trader.rank)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-teal-400/50" />
                      <span className="text-white font-bold">{showWallets ? trader.wallet : 'mn1••••••'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${trader.badgeColor}`}>
                      {trader.badge}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-bold">{trader.volume}</td>
                  <td className={`px-4 py-3 font-bold ${trader.pnlPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {trader.pnl} <span className="text-[10px] text-slate-500">({trader.pnlPercent > 0 ? '+' : ''}{trader.pnlPercent}%)</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{trader.trades.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
  { rank: 1, wallet: 'mn17f2...a91', volume: '$12,450,000', pnl: '+$842,300', pnlPercent: 34.2, trades: 1247, badge: '🐋 Whale', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-600/30' },
  { rank: 2, wallet: 'mn13e8...f02', volume: '$9,870,000', pnl: '+$621,000', pnlPercent: 28.1, trades: 983, badge: '🦈 Shark', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-700/30' },
  { rank: 3, wallet: 'mn1b14...c7d', volume: '$7,320,000', pnl: '+$489,500', pnlPercent: 22.7, trades: 756, badge: '🦈 Shark', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-700/30' },
  { rank: 4, wallet: 'mn19a1...e44', volume: '$5,100,000', pnl: '+$312,800', pnlPercent: 18.3, trades: 612, badge: '🐬 Dolphin', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-700/30' },
  { rank: 5, wallet: 'mn12d6...b88', volume: '$4,200,000', pnl: '+$198,400', pnlPercent: 14.6, trades: 534, badge: '🐬 Dolphin', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-700/30' },
  { rank: 6, wallet: 'mn1f73...112', volume: '$3,650,000', pnl: '+$145,200', pnlPercent: 11.2, trades: 423, badge: '🐡 Fish', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-700/30' },
  { rank: 7, wallet: 'mn11c9...d55', volume: '$2,980,000', pnl: '-$67,300', pnlPercent: -4.1, trades: 387, badge: '🐡 Fish', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-700/30' },
  { rank: 8, wallet: 'mn18b2...a09', volume: '$2,410,000', pnl: '+$89,100', pnlPercent: 7.8, trades: 298, badge: '🦐 Shrimp', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
  { rank: 9, wallet: 'mn15e0...c31', volume: '$1,870,000', pnl: '+$42,600', pnlPercent: 3.2, trades: 245, badge: '🦐 Shrimp', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
  { rank: 10, wallet: 'mn1d47...f76', volume: '$1,320,000', pnl: '-$28,400', pnlPercent: -2.8, trades: 189, badge: '🦐 Shrimp', badgeColor: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
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
    if (rank === 1) return <Crown className="w-4 h-4 text-zinc-400" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-zinc-300" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-amber-600" />;
    return <span className="text-xs text-zinc-500 font-mono w-4 text-center">{rank}</span>;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-zinc-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-400 to-zinc-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(161,161,170,0.3)] border border-white/20">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dark Pool Leaderboard
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Top anonymous traders ranked by shielded volume. All wallets ZK-masked.
            </p>
          </div>
        </div>

        <button
          onClick={() => { sounds.playClick(); setShowWallets(!showWallets); }}
          className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold flex items-center gap-2 border border-white/10 transition-all"
        >
          {showWallets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showWallets ? 'Mask Wallets' : 'Reveal Wallets'}</span>
        </button>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end pt-4 pb-2">
        {[
          {
            trader: traders[1], // Rank 2
            place: '2nd Place',
            medal: '🥈',
            orderClass: 'order-2 sm:order-1',
            minHeight: 'min-h-[250px]',
            border: 'border-zinc-400/50 hover:border-zinc-300/70 ring-1 ring-zinc-400/15',
            glow: 'shadow-[0_4px_24px_rgba(161,161,170,0.12)]',
            gradient: 'from-zinc-300/12 via-zinc-900/85 to-zinc-950',
            pillStyle: 'bg-zinc-700/80 text-zinc-200 border-zinc-500/50',
            badgeBg: 'bg-zinc-700/40 border-zinc-500/40',
            rankColor: 'text-zinc-200',
          },
          {
            trader: traders[0], // Rank 1
            place: '1st Place',
            medal: '🥇',
            orderClass: 'order-1 sm:order-2',
            minHeight: 'min-h-[295px]',
            border: 'border-amber-500/50 hover:border-amber-400/80 ring-1 ring-amber-500/25',
            glow: 'shadow-[0_8px_32px_rgba(245,158,11,0.18)]',
            gradient: 'from-amber-500/15 via-zinc-900/90 to-zinc-950',
            pillStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-black',
            badgeBg: 'bg-amber-500/15 border-amber-500/30 ring-2 ring-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]',
            rankColor: 'text-amber-300',
          },
          {
            trader: traders[2], // Rank 3
            place: '3rd Place',
            medal: '🥉',
            orderClass: 'order-3 sm:order-3',
            minHeight: 'min-h-[235px]',
            border: 'border-orange-800/35 hover:border-orange-700/50',
            glow: 'shadow-[0_4px_24px_rgba(120,63,12,0.08)]',
            gradient: 'from-orange-950/15 via-zinc-900/85 to-zinc-950',
            pillStyle: 'bg-orange-950/50 text-orange-400 border-orange-800/35',
            badgeBg: 'bg-orange-950/25 border-orange-900/35',
            rankColor: 'text-orange-400',
          },
        ].map((podium) => {
          const t = podium.trader;
          const creatureEmoji = t.badge.split(' ')[0];
          return (
            <div
              key={t.rank}
              className={`glass-panel rounded-3xl border bg-gradient-to-b ${podium.gradient} ${podium.border} ${podium.glow} ${podium.minHeight} ${podium.orderClass} p-5 flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden relative group`}
            >
              {/* Top Podium Place Pill */}
              <div className="w-full flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border flex items-center gap-1 ${podium.pillStyle}`}>
                  <span>{podium.medal}</span>
                  <span>{podium.place}</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400 font-semibold">{t.volume}</span>
              </div>

              {/* Center Creature Avatar & Rank */}
              <div className="flex flex-col items-center my-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-2.5 border transition-transform duration-300 group-hover:scale-110 ${podium.badgeBg}`}>
                  <span>{creatureEmoji}</span>
                </div>
                <div className={`text-2xl font-black tracking-tight ${podium.rankColor}`}>
                  #{t.rank}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-1">
                  <Shield className="w-3 h-3 text-zinc-500" />
                  <span>{showWallets ? t.wallet : 'mn1••••••'}</span>
                </div>
              </div>

              {/* Bottom PnL & Trade Count */}
              <div className="w-full pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 text-[11px]">{t.trades.toLocaleString()} trades</span>
                <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <span>{t.pnl}</span>
                  <span className="text-[10px] text-emerald-500/80 font-normal">(+{t.pnlPercent}%)</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="glass-panel rounded-2xl border border-white/10 bg-zinc-900/70 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5 text-zinc-400">
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
                      <Shield className="w-3 h-3 text-zinc-400/50" />
                      <span className="text-white font-bold">{showWallets ? trader.wallet : 'mn1••••••'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${trader.badgeColor}`}>
                      {trader.badge}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-bold">{trader.volume}</td>
                  <td className={`px-4 py-3 font-bold ${trader.pnlPercent >= 0 ? 'text-zinc-400' : 'text-red-400'}`}>
                    {trader.pnl} <span className="text-[10px] text-zinc-500">({trader.pnlPercent > 0 ? '+' : ''}{trader.pnlPercent}%)</span>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{trader.trades.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

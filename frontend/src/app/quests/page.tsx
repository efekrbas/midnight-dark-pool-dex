"use client";

import React, { useState } from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Trophy, Zap, Shield, Star } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  progress: number;
  total: number;
  completed: boolean;
  badge: string;
}

const initialQuests: Quest[] = [
  { id: 'q1', title: 'First Shielded Trade', description: 'Place and execute your first ZK-masked order in the dark pool.', xp: 250, progress: 1, total: 1, completed: true, badge: '🛡️ Initiate' },
  { id: 'q2', title: 'Prover Master', description: 'Run a ZK Hardware Benchmark test on /benchmark.', xp: 500, progress: 1, total: 1, completed: true, badge: '⚡ Prover' },
  { id: 'q3', title: 'Dark Liquidity Provider', description: 'Deposit tokens into any Shielded Vault on /vaults.', xp: 750, progress: 0, total: 1, completed: false, badge: '💎 Liquifier' },
  { id: 'q4', title: 'Institutional Verified', description: 'Generate a ZK Solvency Certificate on /certificate.', xp: 1000, progress: 0, total: 1, completed: false, badge: '🏆 Solvent' },
];

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const { notify } = useNotification();

  const handleClaim = (questId: string) => {
    sounds.playClick();
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: true, progress: q.total } : q));
    sounds.playZKSuccess();
    notify("Quest Completed!", "Earned XP and unlocked new ZK badge.", "success");
  };

  const totalXP = quests.filter(q => q.completed).reduce((sum, q) => sum + q.xp, 0);

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-teal-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] border border-white/20">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Midnight Quests & Achievements
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Complete Web3 privacy quests to earn XP, badges, and unlock exclusive features.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="text-right">
            <span className="text-slate-400 block">Total Earned XP</span>
            <span className="text-xl font-black text-pink-400 flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" /> {totalXP} XP
            </span>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`glass-panel p-6 rounded-3xl border ${
              quest.completed ? 'border-pink-500/40 bg-slate-900/80' : 'border-white/10 bg-slate-900/50'
            } space-y-4 transition-all hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl mb-1 block">{quest.badge.split(' ')[0]}</span>
                <h3 className="font-black text-lg text-white">{quest.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">{quest.description}</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-pink-500/20 text-pink-300 text-xs font-mono font-bold border border-pink-500/30">
                +{quest.xp} XP
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Progress</span>
                <span>{quest.progress} / {quest.total}</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Action */}
            {quest.completed ? (
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold pt-1">
                <CheckCircle2 className="w-4 h-4" /> <span>Completed & Claimed</span>
              </div>
            ) : (
              <button
                onClick={() => handleClaim(quest.id)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs font-mono transition-all shadow-md"
              >
                Complete Quest
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

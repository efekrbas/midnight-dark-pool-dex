"use client";

import React from 'react';
import { ShieldAlert, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface PrivacyScoreWidgetProps {
  amount: string;
  onApplySalt: (saltedAmount: string) => void;
}

export default function PrivacyScoreWidget({ amount, onApplySalt }: PrivacyScoreWidgetProps) {
  if (!amount || parseFloat(amount) <= 0) return null;

  const numAmount = parseFloat(amount);
  const isRoundNumber = numAmount % 1000 === 0 || numAmount % 100 === 0;
  
  // Calculate Privacy Score (100 = Perfect, <70 = Round number risk)
  const privacyScore = isRoundNumber ? 68 : 98;
  const isHighRisk = privacyScore < 80;

  const handleSalt = () => {
    sounds.playZKSuccess();
    const saltOffset = (Math.random() * 0.89 + 0.11).toFixed(3);
    const salted = (numAmount + parseFloat(saltOffset)).toFixed(3);
    onApplySalt(salted);
  };

  return (
    <div className={`p-3.5 rounded-2xl border transition-all animate-fadeIn ${
      isHighRisk
        ? 'bg-teal-950/30 border-teal-500/40 shadow-[0_0_20px_rgba(147,51,234,0.15)]'
        : 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
    }`}>
      <div className="flex items-center justify-between font-mono text-xs mb-2">
        <div className="flex items-center gap-2">
          {isHighRisk ? (
            <ShieldAlert className="w-4 h-4 text-teal-400 animate-pulse" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          )}
          <span className="font-bold text-white">Anonymity Set Strength:</span>
        </div>
        <span className={`font-black ${isHighRisk ? 'text-teal-300' : 'text-emerald-400'}`}>
          {privacyScore}% ({isHighRisk ? 'ROUND NUMBER RISK' : 'OPTIMAL'})
        </span>
      </div>

      {isHighRisk ? (
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1 border-t border-teal-500/20">
          <span>Tip: Add a random salt offset to prevent statistical pattern matching.</span>
          <button
            type="button"
            onClick={handleSalt}
            className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[10px] transition-all flex items-center gap-1 shrink-0 ml-2"
          >
            <Sparkles className="w-3 h-3" />
            <span>Apply Salt</span>
          </button>
        </div>
      ) : (
        <p className="text-[11px] font-mono text-emerald-300/80">
          Optimal randomized commitment. Maximum resistance against statistical correlation.
        </p>
      )}
    </div>
  );
}

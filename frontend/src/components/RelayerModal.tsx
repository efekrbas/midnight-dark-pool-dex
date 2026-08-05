"use client";

import React, { useState } from 'react';
import { Zap, X, Shield, Cpu, Clock, DollarSign, Check } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface RelayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RelayerModal({ isOpen, onClose }: RelayerModalProps) {
  const [selectedRelayer, setSelectedRelayer] = useState('fast');

  if (!isOpen) return null;

  const relayers = [
    { id: 'fast', name: 'Ultra Fast Relayer', fee: '0.002 tNIGHT', speed: '< 2.5s', privacy: 'Maximum' },
    { id: 'standard', name: 'Standard Relayer', fee: '0.001 tNIGHT', speed: '~ 5.0s', privacy: 'High' },
    { id: 'eco', name: 'Eco Batch Relayer', fee: '0.0005 tNIGHT', speed: '~ 12.0s', privacy: 'Standard' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-teal-500/40 bg-slate-900/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 border border-teal-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">ZK Relayer & Gas Settings</h3>
              <p className="text-[11px] text-slate-400 font-mono">Select proof submission node</p>
            </div>
          </div>
          <button onClick={() => { sounds.playClick(); onClose(); }} className="text-slate-500 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Relayer Options */}
        <div className="space-y-3 font-mono text-xs">
          {relayers.map((relayer) => {
            const isSelected = selectedRelayer === relayer.id;
            return (
              <div
                key={relayer.id}
                onClick={() => { sounds.playClick(); setSelectedRelayer(relayer.id); }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-teal-600/20 border-teal-500 text-white shadow-lg'
                    : 'bg-slate-950/60 border-white/10 text-slate-400 hover:border-teal-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    {relayer.name}
                    {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                  </span>
                  <span className="text-teal-400 font-bold">{relayer.fee}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>Speed: {relayer.speed}</span>
                  <span>Privacy: {relayer.privacy}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => { sounds.playClick(); onClose(); }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-xs font-mono transition-all shadow-xl hover:opacity-90"
        >
          Save Relayer Configuration
        </button>
      </div>
    </div>
  );
}

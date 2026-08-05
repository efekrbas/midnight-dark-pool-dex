"use client";

import React, { useState, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';
import { Loader2, Fingerprint, ShieldCheck, Cpu, Sparkles, Clock, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { sounds } from '@/lib/sounds';
import ZKProofVisualizerModal from './ZKProofVisualizerModal';
import PrivacyScoreWidget from './PrivacyScoreWidget';

export default function OrderEntry() {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'LIMIT' | 'TWAP' | 'ICEBERG'>('LIMIT');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);
  const { notify } = useNotification();
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    gsap.from(".form-item", {
      y: 15,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out"
    });
  }, { scope: formRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (!amount || !price) {
      sounds.playError();
      notify("Invalid Order", "Please enter valid amount and price thresholds.", "error");
      
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current, 
          { x: -6 }, 
          { x: 6, duration: 0.06, yoyo: true, repeat: 5, ease: "none", clearProps: "x" }
        );
      }
      return;
    }

    // Open step-by-step interactive ZK Proof Visualizer modal!
    setShowVisualizer(true);
  };

  return (
    <>
      <div className="flex flex-col h-full bg-slate-950/50 rounded-2xl overflow-hidden border border-white/5 font-sans">
        
        {/* Side Selector Tabs */}
        <div className="flex border-b border-white/10 bg-slate-950/80">
          <button 
            onClick={() => {
              sounds.playClick();
              setSide('BUY');
            }}
            className={`flex-1 py-3.5 font-extrabold text-xs tracking-wider transition-all duration-300 relative ${
              side === 'BUY' 
                ? 'bg-emerald-500/15 text-emerald-400 shadow-[inset_0_-2px_0_#10b981]' 
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
            }`}
          >
            BUY tNIGHT
          </button>
          <button 
            onClick={() => {
              sounds.playClick();
              setSide('SELL');
            }}
            className={`flex-1 py-3.5 font-extrabold text-xs tracking-wider transition-all duration-300 relative ${
              side === 'SELL' 
                ? 'bg-red-500/15 text-red-400 shadow-[inset_0_-2px_0_#ef4444]' 
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
            }`}
          >
            SELL tNIGHT
          </button>
        </div>

        {/* Order Type Tabs (Limit, TWAP, Iceberg) */}
        <div className="flex p-1.5 bg-slate-950 border-b border-white/5 text-[11px] font-mono gap-1">
          {(['LIMIT', 'TWAP', 'ICEBERG'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                sounds.playClick();
                setOrderType(type);
              }}
              className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                orderType === type
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-5 flex flex-col flex-1 justify-between space-y-4">
          <div className="space-y-4">
            
            <div className="form-item">
              <label className="text-xs text-gray-400 mb-1.5 font-mono uppercase block flex items-center justify-between">
                <span>Execution Circuit</span>
                <span className="text-teal-400 flex items-center text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1 inline" /> ZK-Encrypted
                </span>
              </label>
              <div className="bg-slate-900/90 border border-teal-500/30 rounded-xl px-3.5 py-2.5 text-xs font-mono text-teal-300 flex items-center justify-between shadow-[0_0_15px_rgba(147,51,234,0.1)]">
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-teal-400 animate-pulse" />
                  Hidden {orderType} Order (UltraPLONK)
                </span>
                <span className="w-2 h-2 rounded-full bg-teal-400" />
              </div>
            </div>

            <div className="form-item">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-mono">
                <label>Limit Price (ZKUSD)</label>
                <span className="text-slate-500">Bal: $14,052.00</span>
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.001"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm shadow-inner"
                  placeholder="1.420"
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-mono text-gray-500 pointer-events-none">ZKUSD</span>
              </div>
            </div>

            <div className="form-item">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-mono">
                <label>Amount (tNIGHT)</label>
                <span className="text-slate-500">Bal: 1,000.00</span>
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm shadow-inner"
                  placeholder="0.00"
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-mono text-gray-500 pointer-events-none">tNIGHT</span>
              </div>
            </div>

            {/* Privacy Score & Salt Suggestion Widget */}
            <div className="form-item">
              <PrivacyScoreWidget
                amount={amount}
                onApplySalt={(salted) => setAmount(salted)}
              />
            </div>
            
            {amount && price && (
              <div className="form-item p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 transition-all animate-fadeIn">
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>Total Commitment:</span>
                  <span className="font-bold text-white font-mono">${(parseFloat(amount) * parseFloat(price)).toFixed(2)} ZKUSD</span>
                </div>
                <div className="flex justify-between text-[11px] text-teal-300/80 font-mono">
                  <span>Slippage Protection:</span>
                  <span>100% (Dark Pool Match)</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-item pt-2 border-t border-white/10">
            <button 
              ref={buttonRef}
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden shadow-lg ${
                side === 'BUY' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.5)] border border-emerald-400/20' 
                  : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-[0_10px_25px_rgba(239,68,68,0.3)] hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)] border border-red-400/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 opacity-80" />
                <span className="text-sm">Submit Hidden {side} Order</span>
              </div>
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> 
              <span>Proved locally via Midnight Network</span>
            </div>
          </div>
        </form>
      </div>

      {/* Interactive ZK Circuit Visualizer Modal */}
      <ZKProofVisualizerModal
        isOpen={showVisualizer}
        onClose={() => {
          setShowVisualizer(false);
          setAmount('');
          setPrice('');
        }}
        orderSide={side}
        amount={amount || '5,000'}
        price={price || '1.420'}
      />
    </>
  );
}

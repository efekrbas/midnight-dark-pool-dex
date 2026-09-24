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
      <div className="flex flex-col h-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 font-sans">
        
        {/* Side Selector Tabs */}
        <div className="flex border-b border-zinc-850 bg-black">
          <button 
            type="button"
            onClick={() => {
              sounds.playClick();
              setSide('BUY');
            }}
            className={`flex-1 py-3 font-semibold text-xs tracking-wider transition-all cursor-pointer ${
              side === 'BUY' 
                ? 'bg-zinc-900 text-white shadow-[inset_0_-2px_0_#10b981]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            BUY tNIGHT
          </button>
          <button 
            type="button"
            onClick={() => {
              sounds.playClick();
              setSide('SELL');
            }}
            className={`flex-1 py-3 font-semibold text-xs tracking-wider transition-all cursor-pointer ${
              side === 'SELL' 
                ? 'bg-zinc-900 text-white shadow-[inset_0_-2px_0_#f43f5e]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            SELL tNIGHT
          </button>
        </div>

        {/* Order Type Tabs (Limit, TWAP, Iceberg) */}
        <div className="flex p-1 bg-black border-b border-zinc-850 text-[11px] font-mono gap-1">
          {(['LIMIT', 'TWAP', 'ICEBERG'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                sounds.playClick();
                setOrderType(type);
              }}
              className={`flex-1 py-1 rounded-md font-medium transition-all cursor-pointer ${
                orderType === type
                  ? 'bg-zinc-850 text-white font-semibold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-4 flex flex-col flex-1 justify-between space-y-4 font-sans text-xs">
          <div className="space-y-4">
            
            <div className="form-item">
              <label className="text-[11px] text-zinc-400 mb-1.5 font-mono uppercase block flex items-center justify-between">
                <span>Circuit Environment</span>
                <span className="text-zinc-400 flex items-center text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mr-1.5 inline-block" /> ZK-Encrypted
                </span>
              </label>
              <div className="bg-black border border-zinc-850 rounded-lg px-3 py-2 text-xs font-mono text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                  Hidden {orderType} Order (Compact WASM)
                </span>
              </div>
            </div>

            <div className="form-item">
              <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-mono">
                <label htmlFor="limit-price-input">Limit Price (ZKUSD)</label>
                <span className="text-zinc-500">Bal: $14,052.00</span>
              </div>
              <div className="relative">
                <input 
                  id="limit-price-input"
                  name="limitPrice"
                  type="number" 
                  step="0.001"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  aria-label="Order limit price in ZKUSD"
                  className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-500 transition-all font-mono text-sm shadow-inner"
                  placeholder="1.420"
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-mono text-zinc-500 pointer-events-none">ZKUSD</span>
              </div>
            </div>

            <div className="form-item">
              <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-mono">
                <label htmlFor="order-amount-input">Amount (tNIGHT)</label>
                <span className="text-zinc-500">Bal: 1,000.00</span>
              </div>
              <div className="relative">
                <input 
                  id="order-amount-input"
                  name="orderAmount"
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-label="Order token amount in tNIGHT"
                  className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-500 transition-all font-mono text-sm shadow-inner"
                  placeholder="0.00"
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-mono text-zinc-500 pointer-events-none">tNIGHT</span>
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
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>Total Commitment:</span>
                  <span className="font-bold text-white font-mono">${(parseFloat(amount) * parseFloat(price)).toFixed(2)} ZKUSD</span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-300/80 font-mono">
                  <span>Slippage Protection:</span>
                  <span>100% (Dark Pool Match)</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-item pt-2 border-t border-zinc-850">
            <button 
              ref={buttonRef}
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                side === 'BUY' 
                  ? 'bg-white text-black hover:bg-zinc-200 shadow-sm' 
                  : 'bg-rose-600 text-white hover:bg-rose-500 shadow-sm'
              }`}
            >
              <Fingerprint className="w-4 h-4 opacity-75" />
              <span className="text-xs font-semibold">Submit Shielded {side} Order</span>
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 mt-2 font-mono">
              <ShieldCheck className="w-3 h-3 text-zinc-400" /> 
              <span>Client-side proof generation on Midnight Preprod</span>
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

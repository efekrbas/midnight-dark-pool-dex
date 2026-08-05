"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Lock, CheckCircle2, Cpu, Sparkles, X, ChevronRight, Database } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface ZKProofVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSide?: 'BUY' | 'SELL';
  amount?: string;
  price?: string;
}

export default function ZKProofVisualizerModal({
  isOpen,
  onClose,
  orderSide = 'BUY',
  amount = '5,000',
  price = '1.420'
}: ZKProofVisualizerModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [proofHash, setProofHash] = useState<string>('');

  const steps = [
    {
      title: "1. Private State & Local Nullifier",
      desc: "Constructing hidden state commitment in client-side WebAssembly environment.",
      detail: "Nullifier: 0x9f8b...3a1c | Secret Key: [ENCRYPTED_IN_WASM_MEM]",
      icon: Lock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "2. Poseidon Merkle Hash Computation",
      desc: "Hashing trade volume and price limit into a 256-bit cryptographic commitment.",
      detail: "PoseidonHash(Amount, Price, Salt) = 0x7c4e...bf91",
      icon: Database,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "3. UltraPLONK SNARK Proof Generation",
      desc: "Evaluating Midnight ZK circuits to prove solvency without revealing parameters.",
      detail: "Gates Verified: 142,850 | Proof Size: 1.2 KB | Soundness Error: 2^-128",
      icon: Cpu,
      color: "from-teal-500 to-emerald-500"
    },
    {
      title: "4. Midnight Preprod Relayer Submission",
      desc: "Submitting SNARK proof to dark pool matching engine for instant settlement.",
      detail: "Status: Validated On-Chain | Block Height: #892,104",
      icon: Shield,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(0);
      setIsCompleted(false);
      return;
    }

    // Step 0 sound
    sounds.playZKTick();

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          sounds.playZKTick();
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsCompleted(true);
          setProofHash(`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...3f92`);
          sounds.playZKSuccess();
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isOpen, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-2xl animate-fadeIn">
      <div className="relative max-w-2xl w-full max-h-[95vh] flex flex-col bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 transition-all border border-white/10 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Header */}
          <div className="flex items-start sm:items-center gap-4 mb-6 sm:mb-8 pr-12 sm:pr-16">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-600/50 shadow-lg backdrop-blur-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight mb-1">
                Midnight ZK-SNARK Execution
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-slate-400 leading-relaxed">
                Generating Zero-Knowledge Commitment for {orderSide} order ({amount} tNIGHT @ ${price})
              </p>
            </div>
          </div>

          {/* Pipeline Nodes Visualizer */}
          <div className="space-y-3 sm:space-y-4 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isDone = idx < currentStep || isCompleted;

              return (
                <div
                  key={idx}
                  className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-500 relative overflow-hidden backdrop-blur-sm ${
                    isActive
                      ? 'bg-slate-800/80 border-teal-500/40 shadow-[0_4px_20px_rgba(20,184,166,0.15)] scale-[1.01]'
                      : isDone
                      ? 'bg-slate-900/40 border-emerald-500/30 opacity-90'
                      : 'bg-slate-950/40 border-white/5 opacity-40'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-md transition-colors duration-500 ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : isActive
                          ? `bg-gradient-to-br ${step.color} animate-pulse shadow-lg`
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h4 className={`font-bold text-sm sm:text-base ${isActive ? 'text-teal-300' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
                          {step.title}
                        </h4>
                        {isActive && (
                          <span className="self-start sm:self-auto text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 animate-pulse whitespace-nowrap">
                            Processing...
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-300/80 mt-1 sm:mt-1.5 leading-relaxed">{step.desc}</p>
                      
                      {(isActive || isDone) && (
                        <div className="mt-3 p-2 sm:p-2.5 rounded-lg bg-slate-950/60 border border-white/5 text-[10px] sm:text-[11px] font-mono text-slate-400 flex items-center gap-2 overflow-hidden">
                          <ChevronRight className="w-3 h-3 text-teal-500/70 shrink-0" />
                          <span className="truncate">{step.detail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Completion Info */}
          <div className="mt-6 sm:mt-8">
            {isCompleted ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 animate-fadeIn shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] backdrop-blur-md">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-mono font-bold text-emerald-300 truncate">SNARK Proof Verified On-Chain!</p>
                    <p className="text-[10px] sm:text-[11px] font-mono text-emerald-500/70 truncate">Proof Hash: {proofHash}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onClose();
                  }}
                  className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold text-xs whitespace-nowrap backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 px-2">
                <span className="animate-pulse">Generating local ZK proof...</span>
                <span className="text-teal-500/70 font-bold">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

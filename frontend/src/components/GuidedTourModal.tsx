"use client";

import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, X, Lock, BarChart2, Cpu } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface TourStep {
  title: string;
  desc: string;
  highlight: string;
  icon: React.ElementType;
}

const tourSteps: TourStep[] = [
  {
    title: "1. Multi-Asset Dark Pool Pair Switcher",
    desc: "Switch trading pairs seamlessly between tNIGHT/ZKUSD, DUST/ZKUSD, and tADA/ZKUSD with real-time sparklines.",
    highlight: "Select pairs at the top left of the trading terminal.",
    icon: Sparkles
  },
  {
    title: "2. ZK Oracle Candlestick & Liquidity Heatmap",
    desc: "Analyze reference price action while toggleable ZK Liquidity Heatmap layers obscure institutional limit walls.",
    highlight: "Toggle 'ZK Heatmap: ON/OFF' to inspect blurred liquidity depth.",
    icon: BarChart2
  },
  {
    title: "3. Cryptographically Masked Dark Order Book",
    desc: "Order depth and limit volumes are mathematically masked on-chain to prevent competitor price target matching.",
    highlight: "Inspect live blurred order depth in the middle column.",
    icon: Lock
  },
  {
    title: "4. ZK-Proof Order Entry & Privacy Score Engine",
    desc: "Submit hidden limit, TWAP, or Iceberg orders. Evaluates round number risk and provides 1-click random salt protection.",
    highlight: "Click 'Submit Hidden Order' to trigger step-by-step SNARK visualizer.",
    icon: Cpu
  },
  {
    title: "5. Command Palette & Cyberpunk Hotkeys",
    desc: "Press 'Ctrl + K' for instant global search or press '?' anytime to view terminal keyboard shortcuts.",
    highlight: "Use shortcuts 'B' (Buy), 'S' (Sell), 'M' (Mute) for high-speed trading.",
    icon: Compass
  }
];

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuidedTourModal({ isOpen, onClose }: GuidedTourModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = tourSteps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    sounds.playClick();
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sounds.playZKSuccess();
      onClose();
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative max-w-xl w-full bg-slate-900 border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(59,130,246,0.35)] overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white border border-teal-400/20 shadow-lg shadow-teal-500/30">
            <Icon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {step.title}
            </h2>
            <span className="text-xs font-mono text-blue-400">
              Step {currentStep + 1} of {tourSteps.length}
            </span>
          </div>
        </div>

        {/* Step Description */}
        <div className="space-y-4 my-6">
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {step.desc}
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-blue-500/30 text-xs font-mono text-blue-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{step.highlight}</span>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex gap-1.5">
            {tourSteps.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentStep ? 'w-6 bg-teal-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 text-white font-bold font-mono text-xs transition-all shadow-lg hover:shadow-teal-500/40 border border-teal-400/20 flex items-center gap-1.5"
          >
            <span>{currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Cookie, X, Shield } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = localStorage.getItem('midnight-privacy-consent');
      if (!accepted) {
        setVisible(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    sounds.playClick();
    localStorage.setItem('midnight-privacy-consent', 'true');
    setVisible(false);
  };

  const handleDismiss = () => {
    sounds.playClick();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:left-6 z-50 max-w-md w-[calc(100%-2rem)] animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-800">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-white mb-0.5 tracking-tight">Zero-Knowledge Architecture</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
              Midnight Dark Pool operates with zero persistent tracking or cookies. Balances and order commitments are computed client-side with Compact ZK circuits.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleAccept}
                className="px-3 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold text-[11px] transition-colors"
              >
                Acknowledge
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-[11px] transition-colors border border-zinc-800"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-zinc-500 hover:text-white p-0.5 flex-shrink-0 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

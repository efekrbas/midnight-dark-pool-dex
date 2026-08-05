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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-2xl border border-teal-500/30 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0 border border-teal-500/30">
            <Shield className="w-5 h-5 text-teal-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1">Privacy-First by Design</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Midnight Dark Pool uses zero-knowledge proofs to protect your trading privacy. We use minimal local storage for your preferences only. No tracking, no analytics, no cookies.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-md"
              >
                I Understand
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition-all border border-white/10"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-slate-500 hover:text-white p-0.5 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

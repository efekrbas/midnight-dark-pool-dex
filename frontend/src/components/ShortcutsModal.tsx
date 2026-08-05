"use client";

import React, { useEffect } from 'react';
import { Keyboard, X, Command, Volume2, Eye, Shield } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open on '?' key if not typing in input/textarea
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName);
      if (e.key === '?' && !isInput) {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: "B", label: "Switch to BUY Side", category: "Trading" },
    { key: "S", label: "Switch to SELL Side", category: "Trading" },
    { key: "Ctrl + K", label: "Open Cyberpunk Command Palette", category: "Navigation" },
    { key: "M", label: "Mute / Unmute UI Sound System", category: "System" },
    { key: "H", label: "Toggle ZK Heatmap / Fog of War", category: "Chart" },
    { key: "?", label: "Open / Close Shortcuts Cheat-Sheet", category: "Help" },
    { key: "Esc", label: "Close Active Modals", category: "System" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl animate-fadeIn">
      <div className="relative max-w-lg w-full bg-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(59,130,246,0.3)] overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

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
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Keyboard Shortcuts
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-blue-400 font-bold">?</kbd> anytime to toggle this cheat-sheet.
            </p>
          </div>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-2.5 my-4">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between font-mono text-xs hover:border-blue-500/30 transition-all"
            >
              <span className="text-slate-300 font-sans font-medium">{sc.label}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 text-blue-400 font-bold border border-blue-500/30 shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-500 text-center">
          Midnight Dark Pool Terminal Hotkeys v1.0
        </div>
      </div>
    </div>
  );
}

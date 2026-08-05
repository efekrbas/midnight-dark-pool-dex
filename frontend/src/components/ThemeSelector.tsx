"use client";

import React, { useState } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useTheme, ThemeId } from '@/context/ThemeContext';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  color: string;
}

export const themes: ThemeOption[] = [
  { id: 'obsidian', name: 'Midnight Obsidian', color: 'bg-[#14b8a6]' },
  { id: 'emerald', name: 'Cipher Emerald', color: 'bg-emerald-500' },
  { id: 'crimson', name: 'Syndicate Crimson', color: 'bg-red-500' },
  { id: 'amber', name: 'Institutional Amber', color: 'bg-amber-500' },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (t: ThemeOption) => {
    sounds.playClick();
    setTheme(t.id);
    setIsOpen(false);
  };

  const activeTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="relative">
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-teal-500/40 text-slate-300 hover:text-white transition-all text-xs font-mono group"
        title="Theme Palette"
      >
        <span className={`w-3 h-3 rounded-full ${activeTheme.color} shadow-sm animate-pulse`} />
        <Palette className="w-3.5 h-3.5 text-teal-400 hidden sm:inline" />
        <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-teal-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-2xl border border-teal-500/30 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 p-1.5 space-y-1 animate-fadeIn">
            {themes.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t)}
                  className={`w-full px-3 py-2 rounded-xl flex items-center justify-between transition-all text-xs font-mono ${
                    isSelected
                      ? 'bg-teal-600/20 text-white border border-teal-500/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${t.color}`} />
                    <span>{t.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-400" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

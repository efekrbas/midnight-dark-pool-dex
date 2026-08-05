"use client";

import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { SupportedLanguage } from '@/lib/i18n';
import { sounds } from '@/lib/sounds';
import { useTranslation } from '@/context/I18nContext';

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: SupportedLanguage) => {
    sounds.playClick();
    setLanguage(code);
    setIsOpen(false);
  };

  const activeLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-teal-500/40 text-slate-300 hover:text-white transition-all text-xs font-mono group"
        title="Select Language"
      >
        <span className="text-sm">{activeLang.flag}</span>
        <span className="font-bold hidden sm:inline uppercase">{activeLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-teal-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-36 bg-slate-900/95 backdrop-blur-2xl border border-teal-500/30 rounded-2xl shadow-lg shadow-teal-500/20 z-50 p-1.5 space-y-1 animate-fadeIn">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3 py-2 rounded-xl flex items-center justify-between transition-all text-xs font-mono ${
                    isSelected
                      ? 'bg-teal-600/20 text-white border border-teal-500/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
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

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
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 transition-colors text-xs font-mono group"
        title="Select Language"
      >
        <span className="text-xs">{activeLang.flag}</span>
        <span className="font-medium hidden sm:inline uppercase text-[11px]">{activeLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-36 bg-zinc-950 border border-white/[0.08] rounded-xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.9)] z-50 p-1.5 space-y-0.5 animate-fadeIn">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors text-xs font-mono ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-medium'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

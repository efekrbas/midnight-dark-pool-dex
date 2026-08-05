"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, dictionary, Translations } from '@/lib/i18n';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof Translations) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en'); // Default to EN

  useEffect(() => {
    const saved = localStorage.getItem('midnight_lang') as SupportedLanguage;
    if (saved && dictionary[saved]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    } else {
      // Default to 'en' if not set
      setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('midnight_lang', lang);
  };

  const t = (key: keyof Translations): string => {
    return dictionary[language]?.[key] || dictionary.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

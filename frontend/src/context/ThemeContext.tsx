"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'obsidian' | 'emerald' | 'crimson' | 'amber';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('obsidian');

  useEffect(() => {
    const saved = localStorage.getItem('midnight_theme') as ThemeId;
    if (saved && ['obsidian', 'emerald', 'crimson', 'amber'].includes(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'obsidian');
    }
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('midnight_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

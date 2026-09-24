"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'obsidian' | 'obsidian' | 'crimson' | 'amber';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('obsidian');

  useEffect(() => {
    // Clear any legacy theme from localStorage to enforce pure pitch-black institutional theme
    try {
      localStorage.removeItem('midnight_theme');
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.add('dark');
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
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

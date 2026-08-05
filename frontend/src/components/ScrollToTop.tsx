"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-slate-800/90 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 shadow-lg flex items-center justify-center text-slate-400 hover:text-white transition-all animate-fadeIn hover:scale-110"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

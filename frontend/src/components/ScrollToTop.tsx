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
      className="fixed bottom-20 right-6 z-40 w-9 h-9 rounded-md bg-zinc-900/90 backdrop-blur-md border border-zinc-800 hover:border-zinc-700 shadow-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all animate-fadeIn"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-3.5 h-3.5 stroke-[1.5]" />
    </button>
  );
}

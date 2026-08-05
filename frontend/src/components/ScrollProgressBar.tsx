"use client";

import React, { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[60]">
      <div
        className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-400 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(147,51,234,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Midnight Network official logo visualization
 * Exact replica: circle ring with left-side notch + 3 vertical square dots
 * Only subtle glow breathing — no orbiting particles or distracting effects
 */
export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);
    const logoRadius = scale * 0.28;
    const ringThickness = scale * 0.035;

    ctx.clearRect(0, 0, w, h);

    // === SUBTLE BACKGROUND GLOW (breathing) ===
    const glowIntensity = 0.04 + Math.sin(t * 1.2) * 0.015;
    const bgGlow = ctx.createRadialGradient(cx, cy, logoRadius * 0.5, cx, cy, logoRadius * 1.8);
    bgGlow.addColorStop(0, `rgba(255, 255, 255, ${glowIntensity})`);
    bgGlow.addColorStop(0.5, `rgba(255, 255, 255, ${glowIntensity * 0.3})`);
    bgGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // === MAIN CIRCLE RING ===
    // The Midnight logo has a circle with a small notch/indicator on the upper-left

    // Draw the ring (arc with a small gap for the notch)
    const notchAngle = -Math.PI * 0.62; // ~upper-left position (around 10 o'clock)
    const notchGap = 0.12; // small gap in radians

    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius, notchAngle + notchGap, notchAngle + Math.PI * 2 - notchGap);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = ringThickness;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Notch indicator line (small line extending outward from the gap)
    const notchOuterR = logoRadius + ringThickness * 0.9;
    const notchInnerR = logoRadius - ringThickness * 0.5;
    const notchMidAngle = notchAngle;

    ctx.beginPath();
    ctx.moveTo(
      cx + Math.cos(notchMidAngle) * notchInnerR,
      cy + Math.sin(notchMidAngle) * notchInnerR
    );
    ctx.lineTo(
      cx + Math.cos(notchMidAngle) * notchOuterR,
      cy + Math.sin(notchMidAngle) * notchOuterR
    );
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = ringThickness * 0.55;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Fill inside circle with black
    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius - ringThickness / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();

    // === THREE VERTICAL SQUARE DOTS (Midnight signature) ===
    const dotSize = scale * 0.025;
    const dotGap = scale * 0.055;

    for (let i = -1; i <= 1; i++) {
      const dy = cy + i * dotGap;

      // White square dot
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(
        cx - dotSize / 2,
        dy - dotSize / 2,
        dotSize,
        dotSize
      );
    }

  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();

    const loop = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, w, h, elapsed);

      animRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

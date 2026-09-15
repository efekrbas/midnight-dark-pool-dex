"use client";

import React, { useEffect, useRef, useCallback } from 'react';

export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);
    const logoRadius = scale * 0.28;
    const ringThickness = scale * 0.032;

    ctx.clearRect(0, 0, w, h);

    // Subtle breathing glow behind logo
    const glowAlpha = 0.035 + Math.sin(t * 1.2) * 0.012;
    const bgGlow = ctx.createRadialGradient(cx, cy, logoRadius * 0.5, cx, cy, logoRadius * 1.6);
    bgGlow.addColorStop(0, `rgba(255, 255, 255, ${glowAlpha})`);
    bgGlow.addColorStop(0.6, `rgba(255, 255, 255, ${glowAlpha * 0.2})`);
    bgGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // === COMPLETE CIRCLE RING (no gaps, no notches) ===
    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = ringThickness;
    ctx.stroke();

    // Fill inside with black
    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius - ringThickness / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();

    // === SMALL DOT SITTING ON THE RING (~10 o'clock position) ===
    const dotAngle = -Math.PI * 0.6;
    const outerDotRadius = ringThickness * 0.7;
    const outerDotX = cx + Math.cos(dotAngle) * logoRadius;
    const outerDotY = cy + Math.sin(dotAngle) * logoRadius;

    ctx.beginPath();
    ctx.arc(outerDotX, outerDotY, outerDotRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // === THREE VERTICAL SQUARE DOTS (centered inside) ===
    const dotSize = scale * 0.028;
    const dotGap = scale * 0.052;

    for (let i = -1; i <= 1; i++) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(
        cx - dotSize / 2,
        cy + i * dotGap - dotSize / 2,
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

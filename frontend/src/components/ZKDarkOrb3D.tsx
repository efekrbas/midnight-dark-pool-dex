"use client";

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Midnight Network branded visualization
 * Based on the ACTUAL Midnight logo: circle ring + 3 vertical dots
 * Enhanced with ZK privacy-themed ambient animations
 * Official palette: #0A0A0A, #FFFFFF, #0000FE
 */
export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);
    const logoRadius = scale * 0.22;
    const mx = (mouseRef.current.x - 0.5) * 2;
    const my = (mouseRef.current.y - 0.5) * 2;

    ctx.clearRect(0, 0, w, h);

    // === AMBIENT BACKGROUND GLOW ===
    const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, logoRadius * 3);
    bgGlow.addColorStop(0, 'rgba(0, 0, 254, 0.06)');
    bgGlow.addColorStop(0.4, 'rgba(0, 0, 254, 0.02)');
    bgGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, w, h);

    // === OUTER PARTICLE ORBITS (ZK commitments flowing) ===
    for (let ring = 0; ring < 3; ring++) {
      const orbitR = logoRadius * (1.6 + ring * 0.35);
      const count = 20 - ring * 5;
      const speed = 0.15 + ring * 0.08;
      const direction = ring % 2 === 0 ? 1 : -1;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t * speed * direction;
        const wobble = Math.sin(t * 1.5 + i * 2 + ring) * 2;
        const px = cx + Math.cos(angle) * (orbitR + wobble) + mx * 4;
        const py = cy + Math.sin(angle) * (orbitR + wobble) * 0.7 + my * 4;

        const alpha = 0.08 + Math.sin(t * 2 + i + ring) * 0.05;
        const size = 1 + Math.sin(t + i * 0.5) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = ring === 0
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(0, 0, 254, ${alpha + 0.05})`;
        ctx.fill();
      }
    }

    // === ORBIT RING GUIDES (subtle) ===
    for (let i = 0; i < 3; i++) {
      const r = logoRadius * (1.6 + i * 0.35);
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.7, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.025 - i * 0.005})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // === FLOATING DATA STREAMS (proof data) ===
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.1;
      const progress = ((t * 0.3 + i * 0.15) % 1);
      const streamR = logoRadius * (1.15 + progress * 1.2);
      const sx = cx + Math.cos(angle) * streamR;
      const sy = cy + Math.sin(angle) * streamR * 0.7;
      const alpha = (1 - progress) * 0.12;

      ctx.beginPath();
      ctx.arc(sx, sy, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 254, ${alpha})`;
      ctx.fill();
    }

    // === MAIN LOGO: OUTER CIRCLE RING ===
    // Glow behind ring
    const ringGlow = ctx.createRadialGradient(cx, cy, logoRadius * 0.85, cx, cy, logoRadius * 1.25);
    ringGlow.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
    ringGlow.addColorStop(0.5, 'rgba(0, 0, 254, 0.04)');
    ringGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = ringGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, logoRadius * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // Ring breathing
    const breathe = 1 + Math.sin(t * 1.2) * 0.008;
    const currentRadius = logoRadius * breathe;
    const ringThickness = scale * 0.022;

    // Outer ring stroke (white, thick — matching the Midnight logo)
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = ringThickness;
    ctx.stroke();

    // Subtle blue outer glow on the ring
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 0, 254, ${0.15 + Math.sin(t * 2) * 0.08})`;
    ctx.lineWidth = ringThickness + 6;
    ctx.stroke();

    // Draw ring again on top (so glow is behind)
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = ringThickness;
    ctx.stroke();

    // Fill inside with dark
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius - ringThickness / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();

    // === THREE VERTICAL DOTS (Midnight signature) ===
    const dotRadius = scale * 0.018;
    const dotGap = scale * 0.065;

    for (let i = -1; i <= 1; i++) {
      const dy = cy + i * dotGap;
      const dotPulse = 1 + Math.sin(t * 2.5 + i * 0.6) * 0.08;
      const dr = dotRadius * dotPulse;

      // Dot glow
      const dGlow = ctx.createRadialGradient(cx, dy, 0, cx, dy, dr * 3);
      dGlow.addColorStop(0, `rgba(255, 255, 255, ${0.15 + Math.sin(t * 3 + i) * 0.05})`);
      dGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = dGlow;
      ctx.beginPath();
      ctx.arc(cx, dy, dr * 3, 0, Math.PI * 2);
      ctx.fill();

      // Main dot (white rectangle/square like the real logo)
      const rectSize = dr * 1.6;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cx - rectSize / 2, dy - rectSize / 2, rectSize, rectSize);
    }

    // === SCANNING LINE (ZK proof verification sweep) ===
    const scanAngle = t * 0.6;
    const scanLen = logoRadius * 1.5;
    const scanX = cx + Math.cos(scanAngle) * scanLen;
    const scanY = cy + Math.sin(scanAngle) * scanLen * 0.7;

    const scanGrad = ctx.createLinearGradient(cx, cy, scanX, scanY);
    scanGrad.addColorStop(0, 'rgba(0, 0, 254, 0)');
    scanGrad.addColorStop(0.6, 'rgba(0, 0, 254, 0.06)');
    scanGrad.addColorStop(1, 'rgba(0, 0, 254, 0)');

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(scanX, scanY);
    ctx.strokeStyle = scanGrad;
    ctx.lineWidth = 1;
    ctx.stroke();

    // === ZK PROOF NODE MARKERS (orbiting around logo) ===
    const nodeCount = 4;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + t * 0.35;
      const nr = logoRadius * 1.35;
      const nx = cx + Math.cos(angle) * nr;
      const ny = cy + Math.sin(angle) * nr * 0.7;
      const nodeSize = 2.5 + Math.sin(t * 2.5 + i) * 0.8;

      // Node glow
      const nGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeSize * 4);
      nGlow.addColorStop(0, 'rgba(0, 0, 254, 0.3)');
      nGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = nGlow;
      ctx.beginPath();
      ctx.arc(nx, ny, nodeSize * 4, 0, Math.PI * 2);
      ctx.fill();

      // Node
      ctx.beginPath();
      ctx.arc(nx, ny, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
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
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase pointer-events-none flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/8 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0000FE] animate-pulse" />
        Association · Commerce · Expression
      </div>
    </div>
  );
}

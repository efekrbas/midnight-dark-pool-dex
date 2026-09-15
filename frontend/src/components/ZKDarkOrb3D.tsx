"use client";

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Midnight-branded interactive visualization:
 * - Clock face motif (hands at "midnight" position)
 * - Three-dot freedom motif (association, commerce, expression)
 * - ZK proof data streams orbiting
 * - Official Midnight palette: #0A0A0A, #FFFFFF, #0000FE
 */
export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.3;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // === BACKGROUND SUBTLE RADIAL GRADIENT ===
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 2.5);
    bgGrad.addColorStop(0, 'rgba(0, 0, 254, 0.04)');
    bgGrad.addColorStop(0.5, 'rgba(0, 0, 254, 0.015)');
    bgGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // === ZK DATA STREAM PARTICLES (outer orbit) ===
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + t * 0.3;
      const orbitRadius = baseRadius * (1.5 + Math.sin(t * 0.5 + i * 0.3) * 0.2);
      const wobble = Math.sin(t * 2 + i * 0.7) * 3;
      const px = cx + Math.cos(angle) * orbitRadius + wobble * (mx - 0.5);
      const py = cy + Math.sin(angle) * orbitRadius * 0.65 + wobble * (my - 0.5);
      
      const alpha = 0.15 + Math.sin(t * 3 + i) * 0.1;
      const size = 1 + Math.sin(t * 2 + i * 0.5) * 0.5;
      
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 
        ? `rgba(0, 0, 254, ${alpha + 0.15})` 
        : `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    // === INNER ORBIT RING (ZK proof verification circle) ===
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 1.25, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 254, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Second orbit ring
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 1.55, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // === MAIN CLOCK FACE (Midnight motif) ===
    // Outer ring glow
    const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.9, cx, cy, baseRadius * 1.15);
    glowGrad.addColorStop(0, 'rgba(0, 0, 254, 0.12)');
    glowGrad.addColorStop(0.5, 'rgba(0, 0, 254, 0.04)');
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 1.15, 0, Math.PI * 2);
    ctx.fill();

    // Clock face circle (dark)
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();

    // Clock face border
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 254, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // === HOUR TICK MARKS ===
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const isMain = i % 3 === 0;
      const innerR = baseRadius * (isMain ? 0.82 : 0.87);
      const outerR = baseRadius * 0.93;
      
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
      ctx.strokeStyle = isMain ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = isMain ? 2 : 1;
      ctx.stroke();
    }

    // === CLOCK HANDS AT MIDNIGHT (both pointing up / 12 o'clock) ===
    const handAngle = -Math.PI / 2; // 12 o'clock position
    const sway = Math.sin(t * 0.8) * 0.02; // Very subtle breathing

    // Hour hand (shorter, thicker)
    const hourLen = baseRadius * 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(handAngle + sway) * hourLen,
      cy + Math.sin(handAngle + sway) * hourLen
    );
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Minute hand (longer, thinner)
    const minuteLen = baseRadius * 0.72;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(handAngle - sway * 0.5) * minuteLen,
      cy + Math.sin(handAngle - sway * 0.5) * minuteLen
    );
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#0000FE';
    ctx.fill();

    // === THREE-DOT FREEDOM MOTIF ===
    // Positioned at the bottom of the clock face, representing:
    // Association · Commerce · Expression
    const dotRadius = 3.5;
    const dotSpacing = 14;
    const dotY = cy + baseRadius * 0.45;
    const dotPulse = 0.7 + Math.sin(t * 2) * 0.3;

    for (let i = -1; i <= 1; i++) {
      const dx = cx + i * dotSpacing;
      
      // Glow behind dot
      const dotGlow = ctx.createRadialGradient(dx, dotY, 0, dx, dotY, dotRadius * 3);
      dotGlow.addColorStop(0, `rgba(0, 0, 254, ${0.3 * dotPulse})`);
      dotGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = dotGlow;
      ctx.beginPath();
      ctx.arc(dx, dotY, dotRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Dot itself
      ctx.beginPath();
      ctx.arc(dx, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0000FE';
      ctx.fill();
    }

    // === ORBITING ZK PROOF NODES ===
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + t * 0.5;
      const radius = baseRadius * 1.25;
      const nx = cx + Math.cos(angle) * radius;
      const ny = cy + Math.sin(angle) * radius * 0.65;
      const pulse = 2 + Math.sin(t * 3 + i * 1.2) * 1;
      
      // Node glow
      const nodeGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, pulse * 4);
      nodeGlow.addColorStop(0, 'rgba(0, 0, 254, 0.4)');
      nodeGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = nodeGlow;
      ctx.beginPath();
      ctx.arc(nx, ny, pulse * 4, 0, Math.PI * 2);
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(nx, ny, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#0000FE';
      ctx.fill();

      // Connect to next node with faint line
      const nextAngle = ((i + 1) / nodeCount) * Math.PI * 2 + t * 0.5;
      const nnx = cx + Math.cos(nextAngle) * radius;
      const nny = cy + Math.sin(nextAngle) * radius * 0.65;
      ctx.beginPath();
      ctx.moveTo(nx, ny);
      ctx.lineTo(nnx, nny);
      ctx.strokeStyle = 'rgba(0, 0, 254, 0.06)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // === DATA FLOW LINES (ZK commitments streaming) ===
    for (let i = 0; i < 8; i++) {
      const startAngle = (i / 8) * Math.PI * 2 + t * 0.2;
      const progress = ((t * 0.4 + i * 0.3) % 1);
      const lineR = baseRadius * (1.0 + progress * 0.8);
      const lx = cx + Math.cos(startAngle) * lineR;
      const ly = cy + Math.sin(startAngle) * lineR * 0.65;
      const alpha = (1 - progress) * 0.2;

      ctx.beginPath();
      ctx.arc(lx, ly, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 254, ${alpha})`;
      ctx.fill();
    }

    // === OUTER GLOW RING (breathing) ===
    const breathe = 0.08 + Math.sin(t * 1.5) * 0.04;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 1.02, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 0, 254, ${breathe})`;
    ctx.lineWidth = 8;
    ctx.stroke();

    // === SUBTLE "MIDNIGHT" TEXT ARC (clock-like) ===
    ctx.save();
    ctx.font = '8px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.textAlign = 'center';
    
    const text = 'PRIVACY · ASSOCIATION · COMMERCE · EXPRESSION · ZK-SNARK · DUAL-STATE · SHIELDED ·';
    const textRadius = baseRadius * 1.38;
    
    for (let i = 0; i < text.length; i++) {
      const charAngle = (i / text.length) * Math.PI * 2 - Math.PI / 2 + t * 0.05;
      const tx = cx + Math.cos(charAngle) * textRadius;
      const ty = cy + Math.sin(charAngle) * textRadius;
      
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(charAngle + Math.PI / 2);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();

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
      ctx.scale(dpr, dpr);
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

    let startTime = performance.now();

    const loop = () => {
      const t = (performance.now() - startTime) / 1000;
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = Math.min(window.devicePixelRatio, 2);
      ctx.scale(dpr, dpr);
      draw(ctx, w, h, t);
      ctx.restore();
      
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
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase pointer-events-none flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0000FE] animate-pulse" />
        Midnight · Rational Privacy
      </div>
    </div>
  );
}

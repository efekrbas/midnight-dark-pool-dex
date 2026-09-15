"use client";

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Midnight-themed Moon Phases Cycle visualization
 * Inspired by the "New Moon to Full" Midnight branding
 * Shows moon phases orbiting in a cycle with starfield background
 */
export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; size: number; twinkleSpeed: number; brightness: number }[]>([]);
  const initRef = useRef(false);

  const drawMoon = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number, radius: number,
    phase: number, // 0 = new moon (dark), 0.5 = full moon (bright), 1 = new moon again
    glowAmount: number
  ) => {
    // Moon glow
    if (glowAmount > 0.1) {
      const glow = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 2.5);
      glow.addColorStop(0, `rgba(200, 210, 230, ${glowAmount * 0.12})`);
      glow.addColorStop(0.5, `rgba(150, 170, 210, ${glowAmount * 0.04})`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Moon base (dark side)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();

    // Subtle crater texture on dark side
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Lit portion based on phase
    // phase 0 = new (all dark), 0.25 = first quarter, 0.5 = full, 0.75 = last quarter
    const illumination = Math.sin(phase * Math.PI); // 0 at new, 1 at full

    if (illumination > 0.01) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();

      // Determine the lit area shape
      const terminator = Math.cos(phase * Math.PI * 2) * radius;

      ctx.beginPath();
      // Right half arc
      ctx.arc(x, y, radius, -Math.PI / 2, Math.PI / 2);
      // Terminator curve (elliptical)
      ctx.ellipse(x, y, Math.abs(terminator), radius, 0, Math.PI / 2, -Math.PI / 2, terminator > 0);
      ctx.closePath();

      // Moon surface gradient (lit side)
      const moonGrad = ctx.createRadialGradient(
        x + radius * 0.15, y - radius * 0.1, radius * 0.1,
        x, y, radius
      );
      moonGrad.addColorStop(0, '#e8e8f0');
      moonGrad.addColorStop(0.3, '#d0d0de');
      moonGrad.addColorStop(0.7, '#b8b8cc');
      moonGrad.addColorStop(1, '#9898aa');
      ctx.fillStyle = moonGrad;
      ctx.fill();

      ctx.restore();
    }

    // Rim light (thin bright edge)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(180, 190, 220, ${0.08 + illumination * 0.12})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);

    ctx.clearRect(0, 0, w, h);

    // === STARFIELD ===
    if (!initRef.current || starsRef.current.length === 0) {
      starsRef.current = [];
      for (let i = 0; i < 80; i++) {
        starsRef.current.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.5 + 0.3,
          twinkleSpeed: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.4 + 0.1,
        });
      }
      initRef.current = true;
    }

    for (const star of starsRef.current) {
      const alpha = star.brightness + Math.sin(t * star.twinkleSpeed + star.x * 10) * 0.08;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
      ctx.fill();
    }

    // === ORBITAL PATH (blue arc connecting moon phases) ===
    const orbitRadiusX = scale * 0.32;
    const orbitRadiusY = scale * 0.28;
    const orbitTilt = 0.15;

    // Draw orbital path
    ctx.beginPath();
    ctx.ellipse(cx, cy, orbitRadiusX, orbitRadiusY, orbitTilt, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(60, 80, 180, 0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Subtle blue glow on orbital path
    ctx.beginPath();
    ctx.ellipse(cx, cy, orbitRadiusX, orbitRadiusY, orbitTilt, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(40, 60, 200, 0.06)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // === MOON PHASES arranged around the orbit ===
    const phaseCount = 8;
    const rotationOffset = t * 0.05; // Slow rotation

    // Draw connecting lines first (behind moons)
    for (let i = 0; i < phaseCount; i++) {
      const angle1 = (i / phaseCount) * Math.PI * 2 + rotationOffset;
      const angle2 = ((i + 1) / phaseCount) * Math.PI * 2 + rotationOffset;

      const x1 = cx + Math.cos(angle1 + orbitTilt) * orbitRadiusX;
      const y1 = cy + Math.sin(angle1 + orbitTilt) * orbitRadiusY;
      const x2 = cx + Math.cos(angle2 + orbitTilt) * orbitRadiusX;
      const y2 = cy + Math.sin(angle2 + orbitTilt) * orbitRadiusY;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(60, 80, 200, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Glow dot at connection points
      const glowGrad = ctx.createRadialGradient(x1, y1, 0, x1, y1, 4);
      glowGrad.addColorStop(0, 'rgba(80, 100, 220, 0.25)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x1, y1, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw moons (sorted by Y for depth)
    const moons: { x: number; y: number; phase: number; size: number; glow: number }[] = [];

    for (let i = 0; i < phaseCount; i++) {
      const angle = (i / phaseCount) * Math.PI * 2 + rotationOffset;
      const mx = cx + Math.cos(angle + orbitTilt) * orbitRadiusX;
      const my = cy + Math.sin(angle + orbitTilt) * orbitRadiusY;

      // Phase: 0=new, 0.5=full, 1=new
      const moonPhase = i / phaseCount;

      // Size variation: full moon is bigger
      const illumination = Math.sin(moonPhase * Math.PI);
      const moonSize = scale * (0.03 + illumination * 0.02);

      moons.push({ x: mx, y: my, phase: moonPhase, size: moonSize, glow: illumination });
    }

    // Sort by y so "closer" moons draw on top
    moons.sort((a, b) => a.y - b.y);

    for (const moon of moons) {
      drawMoon(ctx, moon.x, moon.y, moon.size, moon.phase, moon.glow);
    }

    // === CENTER: Large "Full Moon" hero ===
    const heroRadius = scale * 0.1;
    const heroPulse = 1 + Math.sin(t * 0.8) * 0.01;
    const heroR = heroRadius * heroPulse;

    // Hero moon glow
    const heroGlow = ctx.createRadialGradient(cx, cy, heroR * 0.5, cx, cy, heroR * 3);
    heroGlow.addColorStop(0, 'rgba(200, 210, 240, 0.1)');
    heroGlow.addColorStop(0.3, 'rgba(100, 120, 200, 0.04)');
    heroGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = heroGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, heroR * 3, 0, Math.PI * 2);
    ctx.fill();

    // Hero moon body
    drawMoon(ctx, cx, cy, heroR, 0.5, 1.0);

    // Midnight logo overlay on center moon (3 dots)
    const dotSize = heroR * 0.1;
    const dotGapY = heroR * 0.28;
    ctx.globalAlpha = 0.6;
    for (let i = -1; i <= 1; i++) {
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(cx - dotSize / 2, cy + i * dotGapY - dotSize / 2, dotSize, dotSize);
    }
    ctx.globalAlpha = 1;

    // === BOTTOM GLOW FLARE ===
    const flareGrad = ctx.createRadialGradient(cx, cy + scale * 0.3, 0, cx, cy + scale * 0.3, scale * 0.25);
    flareGrad.addColorStop(0, `rgba(100, 140, 255, ${0.04 + Math.sin(t * 1.5) * 0.015})`);
    flareGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flareGrad;
    ctx.beginPath();
    ctx.arc(cx, cy + scale * 0.3, scale * 0.25, 0, Math.PI * 2);
    ctx.fill();

  }, [drawMoon]);

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
      initRef.current = false; // regenerate stars on resize
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/25 tracking-[0.15em] uppercase pointer-events-none flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Midnight · Moon Phase Cycle
      </div>
    </div>
  );
}

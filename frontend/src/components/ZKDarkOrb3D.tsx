"use client";

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Midnight Moon Phase Cycle Visualization
 * Displays an elliptical orbit of 8 realistic moon phases connected by orbital lines,
 * with the official Midnight Network emblem (from photo 1) positioned in the center,
 * backed by celestial radial glow and starfield.
 */
export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; size: number; twinkleSpeed: number; brightness: number }[]>([]);
  const initRef = useRef(false);
  const logoImgRef = useRef<HTMLImageElement | null>(null);

  // Preload Midnight logo image (1st photo)
  useEffect(() => {
    const img = new Image();
    img.src = '/midnight-symbol-transparent.png';
    img.onload = () => {
      logoImgRef.current = img;
    };
  }, []);

  const drawMoon = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number, radius: number,
    phase: number, // 0 = new moon, 0.5 = full moon, 1 = new moon
    glowAmount: number
  ) => {
    // Atmospheric aura for brighter phases
    if (glowAmount > 0.15) {
      const glow = ctx.createRadialGradient(x, y, radius * 0.7, x, y, radius * 2.6);
      glow.addColorStop(0, `rgba(210, 225, 255, ${glowAmount * 0.18})`);
      glow.addColorStop(0.5, `rgba(130, 160, 230, ${glowAmount * 0.06})`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Base moon sphere (dark side)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#121324';
    ctx.fill();

    // Subtle edge rim on dark side
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Illuminated portion based on phase
    const illumination = Math.sin(phase * Math.PI); // 0 at new moon, 1 at full moon

    if (illumination > 0.02) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();

      // Terminator curve
      const isWaxing = phase <= 0.5;
      const terminator = Math.cos(phase * Math.PI * 2) * radius;

      ctx.beginPath();
      if (isWaxing) {
        // Waxing: lit on the right side
        ctx.arc(x, y, radius, -Math.PI / 2, Math.PI / 2, false);
        ctx.ellipse(x, y, Math.max(0.1, Math.abs(terminator)), radius, 0, Math.PI / 2, -Math.PI / 2, terminator > 0);
      } else {
        // Waning: lit on the left side
        ctx.arc(x, y, radius, Math.PI / 2, -Math.PI / 2, false);
        ctx.ellipse(x, y, Math.max(0.1, Math.abs(terminator)), radius, 0, -Math.PI / 2, Math.PI / 2, terminator < 0);
      }
      ctx.closePath();

      // Spherical gradient on lit face
      const gradX = isWaxing ? x + radius * 0.2 : x - radius * 0.2;
      const moonGrad = ctx.createRadialGradient(
        gradX, y - radius * 0.15, radius * 0.05,
        x, y, radius * 1.1
      );
      moonGrad.addColorStop(0, '#f2f4ff');
      moonGrad.addColorStop(0.25, '#dbe0f2');
      moonGrad.addColorStop(0.65, '#a4a9c2');
      moonGrad.addColorStop(1, '#6f748f');
      ctx.fillStyle = moonGrad;
      ctx.fill();

      // Soft crater detail
      ctx.fillStyle = 'rgba(80, 85, 110, 0.15)';
      ctx.beginPath();
      ctx.arc(x + radius * 0.1, y - radius * 0.1, radius * 0.18, 0, Math.PI * 2);
      ctx.arc(x - radius * 0.15, y + radius * 0.2, radius * 0.14, 0, Math.PI * 2);
      ctx.arc(x + radius * 0.25, y + radius * 0.15, radius * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Outer spherical rim highlight
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200, 215, 255, ${0.06 + illumination * 0.14})`;
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
      for (let i = 0; i < 90; i++) {
        starsRef.current.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.6 + 0.3,
          twinkleSpeed: Math.random() * 2.5 + 0.6,
          brightness: Math.random() * 0.45 + 0.1,
        });
      }
      initRef.current = true;
    }

    for (const star of starsRef.current) {
      const alpha = star.brightness + Math.sin(t * star.twinkleSpeed + star.x * 12) * 0.1;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 210, 255, ${Math.max(0.04, alpha)})`;
      ctx.fill();
    }

    // === ORBITAL PATHS (concentric faint dashed ellipses matching branding) ===
    const orbitRadiusX = scale * 0.35;
    const orbitRadiusY = scale * 0.27;
    const orbitTilt = -0.12; // Slight tilt like reference

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(orbitTilt);

    // Outer orbit line
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX * 1.04, orbitRadiusY * 1.04, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(90, 120, 230, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 5]);
    ctx.stroke();

    // Main orbit line
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(110, 145, 255, 0.2)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 6]);
    ctx.stroke();

    // Inner orbit line
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX * 0.96, orbitRadiusY * 0.96, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(80, 110, 220, 0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]);
    ctx.stroke();

    // Subtle blue glow ring
    ctx.beginPath();
    ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(70, 110, 255, 0.05)';
    ctx.lineWidth = 8;
    ctx.setLineDash([]);
    ctx.stroke();

    ctx.restore();

    // === 8 MOON PHASES orbiting in cycle ===
    const phaseCount = 8;
    const rotationOffset = t * 0.04; // Smooth slow orbit

    // Calculate positions
    const moons: { x: number; y: number; phase: number; size: number; glow: number }[] = [];
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i < phaseCount; i++) {
      const angle = (i / phaseCount) * Math.PI * 2 + rotationOffset;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Rotate with orbit tilt
      const rx = cosA * orbitRadiusX;
      const ry = sinA * orbitRadiusY;
      const mx = cx + rx * Math.cos(orbitTilt) - ry * Math.sin(orbitTilt);
      const my = cy + rx * Math.sin(orbitTilt) + ry * Math.cos(orbitTilt);

      points.push({ x: mx, y: my });

      const moonPhase = i / phaseCount;
      const illumination = Math.sin(moonPhase * Math.PI);
      const moonSize = scale * (0.028 + illumination * 0.016);

      moons.push({ x: mx, y: my, phase: moonPhase, size: moonSize, glow: illumination });
    }

    // Draw connecting chords and nodal glow dots
    for (let i = 0; i < phaseCount; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % phaseCount];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = 'rgba(80, 120, 240, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Vertex dot
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120, 160, 255, 0.35)';
      ctx.fill();
    }

    // Sort moons by Y for natural perspective depth
    const sortedMoons = [...moons].sort((a, b) => a.y - b.y);
    for (const moon of sortedMoons) {
      drawMoon(ctx, moon.x, moon.y, moon.size, moon.phase, moon.glow);
    }

    // === CENTER: MIDNIGHT EMBLEM (1st Photo) ===
    const heroRadius = scale * 0.12;
    const heroPulse = 1 + Math.sin(t * 1.2) * 0.015;
    const heroR = heroRadius * heroPulse;

    // Ambient moonlight glow radiating outward from center
    const ambientGlow = ctx.createRadialGradient(cx, cy, heroR * 0.2, cx, cy, heroR * 2.8);
    ambientGlow.addColorStop(0, 'rgba(170, 195, 255, 0.18)');
    ambientGlow.addColorStop(0.35, 'rgba(80, 115, 230, 0.08)');
    ambientGlow.addColorStop(0.7, 'rgba(40, 60, 160, 0.02)');
    ambientGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, heroR * 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Dark backdrop disc so orbital lines pass behind cleanly
    ctx.beginPath();
    ctx.arc(cx, cy, heroR * 1.05, 0, Math.PI * 2);
    ctx.fillStyle = '#07080f';
    ctx.fill();

    // Faint outer rim on center disc
    ctx.beginPath();
    ctx.arc(cx, cy, heroR * 1.05, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Render official 1st photo emblem
    if (logoImgRef.current && logoImgRef.current.complete) {
      ctx.save();
      // Draw centered image
      const imgSize = heroR * 2.1;
      ctx.drawImage(
        logoImgRef.current,
        cx - imgSize / 2,
        cy - imgSize / 2,
        imgSize,
        imgSize
      );
      ctx.restore();
    } else {
      // Vector fallback matching 1st photo precisely
      ctx.save();
      const ringR = heroR * 0.72;
      const ringThick = heroR * 0.12;

      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = ringThick;
      ctx.stroke();

      // 3 vertical white squares in top half (Midnight 12:00 hand)
      const sqSize = heroR * 0.13;
      const sqY1 = cy - heroR * 0.52;
      const sqY2 = cy - heroR * 0.32;
      const sqY3 = cy - heroR * 0.12;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cx - sqSize / 2, sqY1 - sqSize / 2, sqSize, sqSize);
      ctx.fillRect(cx - sqSize / 2, sqY2 - sqSize / 2, sqSize, sqSize);
      ctx.fillRect(cx - sqSize / 2, sqY3 - sqSize / 2, sqSize, sqSize);
      ctx.restore();
    }

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
      initRef.current = false;
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 tracking-[0.16em] uppercase pointer-events-none flex items-center gap-2 bg-black/60 px-3.5 py-1.2 rounded-full border border-white/10 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Midnight · Moon Phase Cycle
      </div>
    </div>
  );
}

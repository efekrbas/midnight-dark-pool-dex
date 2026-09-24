"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ZKDarkOrb3D - Midnight Celestial Proving Mesh & Moon Phase Cycle
 * 
 * Features:
 * - Sleek, wide horizontal elliptical orbit (matches original aesthetic with plenty of vertical breathing room)
 * - True 3D depth sorting (background moons orbit behind the central core, foreground moons orbit in front)
 * - Luminous Midnight Quantum Reactor Core with layered nebula corona, neon bloom, and chronometer ticks
 * - High-fidelity 2.5D moon rendering (smooth phase terminators, subtle craters, earthshine, and lunar coronas)
 * - Flowing ZK proof energy particles streaming along the orbit
 * - Unobtrusive, non-overlapping bottom pill badge
 */
export default function ZKDarkOrb3D({ className = "w-full h-[400px]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; size: number; speed: number; alpha: number }[]>([]);
  const particlesRef = useRef<{ progress: number; speed: number; size: number; hue: number }[]>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isReady, setIsReady] = useState(false);

  // Preload Midnight emblem
  useEffect(() => {
    const img = new Image();
    img.src = '/midnight-symbol-transparent.png';
    img.onload = () => {
      logoImgRef.current = img;
      setIsReady(true);
    };
    img.onerror = () => {
      setIsReady(true);
    };
  }, []);

  // Initialize stars and orbital particles
  useEffect(() => {
    // 95 ambient stars
    const stars: { x: number; y: number; size: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < 95; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 2.0 + 0.5,
        alpha: Math.random() * 0.45 + 0.1,
      });
    }
    starsRef.current = stars;

    // 24 flowing ZK proof packets
    const particles: { progress: number; speed: number; size: number; hue: number }[] = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        progress: Math.random(),
        speed: Math.random() * 0.035 + 0.015,
        size: Math.random() * 1.8 + 1.2,
        hue: 0, // Monochrome (hue unused)
      });
    }
    particlesRef.current = particles;
  }, []);

  // Mouse interactivity handler for subtle parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseRef.current.targetX = nx;
    mouseRef.current.targetY = ny;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  }, []);

  // Render high-fidelity Moon Sphere
  const drawRealisticMoon = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    phase: number, // 0 = New Moon, 0.5 = Full Moon, 1.0 = New Moon
    depthScale: number,
    glowIntensity: number
  ) => {
    if (radius <= 1) return;

    ctx.save();

    // 1. Ethereal atmospheric corona for lit phases
    if (glowIntensity > 0.08) {
      const coronaR = radius * (2.1 + glowIntensity * 0.7);
      const corona = ctx.createRadialGradient(x, y, radius * 0.75, x, y, coronaR);
      corona.addColorStop(0, `rgba(228, 228, 231, ${glowIntensity * 0.25 * depthScale})`);
      corona.addColorStop(0.4, `rgba(161, 161, 170, ${glowIntensity * 0.09 * depthScale})`);
      corona.addColorStop(0.75, `rgba(82, 82, 91, ${glowIntensity * 0.03 * depthScale})`);
      corona.addColorStop(1, 'transparent');

      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(x, y, coronaR, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Base Dark Sphere (Night side of the moon)
    const darkGrad = ctx.createRadialGradient(
      x - radius * 0.3, y - radius * 0.3, radius * 0.1,
      x, y, radius
    );
    darkGrad.addColorStop(0, '#161a2e');
    darkGrad.addColorStop(0.75, '#0c0f1c');
    darkGrad.addColorStop(1, '#060811');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = darkGrad;
    ctx.fill();

    // 3. Starlight / Earthshine rim on dark side (ensures dark moon is gracefully visible)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(161, 161, 170, ${0.12 * depthScale})`;
    ctx.lineWidth = Math.max(0.6, 0.9 * depthScale);
    ctx.stroke();

    // 4. Illumination Phase Geometry (terminator line)
    const illumination = Math.sin(phase * Math.PI); // 0 at new moon, 1 at full moon
    if (illumination > 0.015) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();

      const isWaxing = phase <= 0.5;
      const terminator = Math.cos(phase * Math.PI * 2) * radius;

      ctx.beginPath();
      if (isWaxing) {
        ctx.arc(x, y, radius, -Math.PI / 2, Math.PI / 2, false);
        ctx.ellipse(x, y, Math.max(0.2, Math.abs(terminator)), radius, 0, Math.PI / 2, -Math.PI / 2, terminator > 0);
      } else {
        ctx.arc(x, y, radius, Math.PI / 2, -Math.PI / 2, false);
        ctx.ellipse(x, y, Math.max(0.2, Math.abs(terminator)), radius, 0, -Math.PI / 2, Math.PI / 2, terminator < 0);
      }
      ctx.closePath();

      // Lit surface multi-stop gradient (silver-white starlight)
      const litGradX = isWaxing ? x + radius * 0.3 : x - radius * 0.3;
      const litGrad = ctx.createRadialGradient(
        litGradX, y - radius * 0.2, radius * 0.05,
        x, y, radius * 1.05
      );
      litGrad.addColorStop(0, '#ffffff');
      litGrad.addColorStop(0.2, '#f0f4ff');
      litGrad.addColorStop(0.55, '#cdd5eb');
      litGrad.addColorStop(0.85, '#9aa3c4');
      litGrad.addColorStop(1, '#5d6484');

      ctx.fillStyle = litGrad;
      ctx.fill();

      // Soft crater & mare shading
      ctx.fillStyle = 'rgba(70, 78, 108, 0.2)';
      ctx.beginPath();
      ctx.arc(x + radius * 0.12, y - radius * 0.15, radius * 0.2, 0, Math.PI * 2);
      ctx.arc(x - radius * 0.18, y + radius * 0.18, radius * 0.15, 0, Math.PI * 2);
      ctx.arc(x + radius * 0.26, y + radius * 0.12, radius * 0.11, 0, Math.PI * 2);
      ctx.arc(x - radius * 0.05, y - radius * 0.3, radius * 0.09, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 5. Crisp rim highlight on the illuminated limb
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.75, (0.12 + illumination * 0.55) * depthScale)})`;
    ctx.lineWidth = Math.max(0.7, 1.0 * depthScale);
    ctx.stroke();

    ctx.restore();
  }, []);

  // Main Render Loop
  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);

    // Smooth spring mouse parallax (subtle)
    const m = mouseRef.current;
    m.x += (m.targetX - m.x) * 0.05;
    m.y += (m.targetY - m.y) * 0.05;

    // === 1. DEEP SPACE NEBULA BACKDROP ===
    const nebulaGrad = ctx.createRadialGradient(
      cx + m.x * 15, cy + m.y * 12, scale * 0.1,
      cx, cy, scale * 0.7
    );
    nebulaGrad.addColorStop(0, 'rgba(63, 63, 70, 0.08)'); // Zinc
    nebulaGrad.addColorStop(0.35, 'rgba(39, 39, 42, 0.06)'); // Deep Blue
    nebulaGrad.addColorStop(0.7, 'rgba(63, 63, 70, 0.025)'); // Indigo
    nebulaGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebulaGrad;
    ctx.fillRect(0, 0, w, h);

    // === 2. STARFIELD ===
    for (const star of starsRef.current) {
      const alpha = star.alpha + Math.sin(t * star.speed + star.x * 15) * 0.12;
      if (alpha > 0.02) {
        ctx.beginPath();
        const sx = star.x * w + m.x * 6 * (star.size / 1.5);
        const sy = star.y * h + m.y * 6 * (star.size / 1.5);
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 230, 255, ${Math.min(0.8, Math.max(0.04, alpha))})`;
        ctx.fill();
      }
    }

    // === 3. SLEEK WIDE HORIZONTAL ORBIT GEOMETRY ===
    // We use a wide horizontal ellipse (like in the original photo), leaving plenty of top/bottom margin!
    const radiusX = scale * 0.36;
    const radiusY = scale * 0.22; // Flatter & wider: leaves plenty of clearance for the bottom badge!
    const orbitTilt = -0.11 + m.x * 0.04; // Slight diagonal tilt like original

    // Helper to compute rotated orbital coordinates
    // Depth z: positive = foreground (bottom), negative = background (top)
    const getOrbitPoint = (theta: number, rMult = 1.0) => {
      const rx = radiusX * rMult;
      const ry = radiusY * rMult;

      // Base point on flat ellipse
      const x0 = Math.cos(theta) * rx;
      const y0 = Math.sin(theta) * ry;

      // Rotate by orbitTilt
      const cosT = Math.cos(orbitTilt);
      const sinT = Math.sin(orbitTilt);

      const px = x0 * cosT - y0 * sinT;
      const py = x0 * sinT + y0 * cosT;

      // Depth is based on y position along the ellipse (sin(theta))
      const z = Math.sin(theta); // -1 (top/back) to +1 (bottom/front)
      // Perspective scale factor (0.85 in back, 1.15 in front)
      const perspScale = 1.0 + z * 0.15;

      return {
        screenX: cx + px + m.x * 4,
        screenY: cy + py + m.y * 4,
        z,
        scale: perspScale,
      };
    };

    // === 4. DRAW ORBITAL PATHS (Split into Background & Foreground) ===
    const drawOrbitArc = (minZ: number, maxZ: number, alphaMult: number) => {
      const segments = 80;
      ctx.beginPath();
      let started = false;

      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        const pt = getOrbitPoint(theta);

        if (pt.z >= minZ && pt.z <= maxZ) {
          if (!started) {
            ctx.moveTo(pt.screenX, pt.screenY);
            started = true;
          } else {
            ctx.lineTo(pt.screenX, pt.screenY);
          }
        } else {
          started = false;
        }
      }

      ctx.save();
      // Main dashed line
      ctx.strokeStyle = `rgba(161, 161, 170, ${0.22 * alphaMult})`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 6]);
      ctx.stroke();

      // Outer glow ribbon
      ctx.strokeStyle = `rgba(161, 161, 170, ${0.07 * alphaMult})`;
      ctx.lineWidth = 6;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();
    };

    // Draw background half of the orbit (z < 0)
    drawOrbitArc(-1.1, 0, 0.55);

    // === 5. CALCULATE 8 MOON POSITIONS ===
    const moonCount = 8;
    const rotationSpeed = t * 0.045; // Smooth slow orbit
    const moonsList: {
      index: number;
      screenX: number;
      screenY: number;
      z: number;
      scale: number;
      radius: number;
      phase: number;
      glow: number;
    }[] = [];

    for (let i = 0; i < moonCount; i++) {
      const theta = (i / moonCount) * Math.PI * 2 + rotationSpeed;
      const p = getOrbitPoint(theta);

      const moonPhase = i / moonCount;
      const illumination = Math.sin(moonPhase * Math.PI);

      // Base radius scaled with natural 3D perspective
      const baseRadius = scale * 0.034;
      const dynamicRadius = baseRadius * p.scale;

      moonsList.push({
        index: i,
        screenX: p.screenX,
        screenY: p.screenY,
        z: p.z,
        scale: p.scale,
        radius: dynamicRadius,
        phase: moonPhase,
        glow: illumination,
      });
    }

    // High-tech chord lines connecting moons
    ctx.save();
    ctx.setLineDash([2, 4]);
    for (let i = 0; i < moonCount; i++) {
      const m1 = moonsList[i];
      const m2 = moonsList[(i + 1) % moonCount];
      const avgZ = (m1.z + m2.z) / 2;
      const chordAlpha = avgZ < 0 ? 0.05 : 0.14;

      ctx.beginPath();
      ctx.moveTo(m1.screenX, m1.screenY);
      ctx.lineTo(m2.screenX, m2.screenY);
      ctx.strokeStyle = `rgba(161, 161, 170, ${chordAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    ctx.restore();

    // === 6. DRAW BACKGROUND MOONS (z < 0, behind central core) ===
    const backgroundMoons = moonsList.filter(m => m.z < 0).sort((a, b) => a.z - b.z);
    for (const moon of backgroundMoons) {
      drawRealisticMoon(ctx, moon.screenX, moon.screenY, moon.radius, moon.phase, moon.scale, moon.glow);
    }

    // === 7. DRAW CENTRAL MIDNIGHT CORE (at z = 0) ===
    const coreR = scale * 0.105; // Balanced size: leaves plenty of clearance
    const pulse = 1 + Math.sin(t * 1.4) * 0.018;
    const dynamicCoreR = coreR * pulse;

    // Layer A: Radiant Outer Nebula Aura
    const outerAura = ctx.createRadialGradient(cx, cy, dynamicCoreR * 0.4, cx, cy, dynamicCoreR * 2.8);
    outerAura.addColorStop(0, 'rgba(161, 161, 170, 0.24)'); // Zinc core glow
    outerAura.addColorStop(0.35, 'rgba(161, 161, 170, 0.12)'); // Soft zinc
    outerAura.addColorStop(0.7, 'rgba(63, 63, 70, 0.04)'); // Dark zinc
    outerAura.addColorStop(1, 'transparent');

    ctx.save();
    ctx.fillStyle = outerAura;
    ctx.beginPath();
    ctx.arc(cx, cy, dynamicCoreR * 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Layer B: Glassmorphic Core Disc
    const discGrad = ctx.createRadialGradient(
      cx - dynamicCoreR * 0.2, cy - dynamicCoreR * 0.2, dynamicCoreR * 0.05,
      cx, cy, dynamicCoreR * 1.05
    );
    discGrad.addColorStop(0, '#0a0f1d');
    discGrad.addColorStop(0.65, '#050711');
    discGrad.addColorStop(1, '#020307');

    ctx.beginPath();
    ctx.arc(cx, cy, dynamicCoreR * 1.05, 0, Math.PI * 2);
    ctx.fillStyle = discGrad;
    ctx.fill();

    // Subtle rim ring
    ctx.beginPath();
    ctx.arc(cx, cy, dynamicCoreR * 1.05, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(161, 161, 170, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Layer C: Elegant smooth halo rings (pure minimalist elegance, zero visual noise)
    ctx.beginPath();
    ctx.arc(cx, cy, dynamicCoreR * 1.16, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(161, 161, 170, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, dynamicCoreR * 1.28, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(161, 161, 170, 0.06)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Layer D: Midnight Emblem with self-illumination bloom
    ctx.save();
    if (logoImgRef.current && logoImgRef.current.complete) {
      ctx.shadowColor = 'rgba(161, 161, 170, 0.55)';
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.arc(cx, cy, dynamicCoreR * 0.98, 0, Math.PI * 2);
      ctx.clip();

      const imgSize = dynamicCoreR * 1.95;
      ctx.drawImage(
        logoImgRef.current,
        cx - imgSize / 2,
        cy - imgSize / 2,
        imgSize,
        imgSize
      );
    } else {
      // Vector fallback
      ctx.shadowColor = 'rgba(161, 161, 170, 0.65)';
      ctx.shadowBlur = 14;

      const ringR = dynamicCoreR * 0.7;
      const ringThick = dynamicCoreR * 0.12;

      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = ringThick;
      ctx.stroke();

      // 3 vertical white dashes
      const sqSize = dynamicCoreR * 0.12;
      const sqY1 = cy - dynamicCoreR * 0.48;
      const sqY2 = cy - dynamicCoreR * 0.28;
      const sqY3 = cy - dynamicCoreR * 0.08;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cx - sqSize / 2, sqY1 - sqSize / 2, sqSize, sqSize);
      ctx.fillRect(cx - sqSize / 2, sqY2 - sqSize / 2, sqSize, sqSize);
      ctx.fillRect(cx - sqSize / 2, sqY3 - sqSize / 2, sqSize, sqSize);
    }
    ctx.restore();
    ctx.restore(); // Restore core save

    // === 8. DRAW FOREGROUND ORBITAL ARC (z >= 0) ===
    drawOrbitArc(0, 1.1, 1.0);

    // === 9. FLOWING ZK PROOF ENERGY PARTICLES ===
    for (const p of particlesRef.current) {
      p.progress = (p.progress + p.speed * 0.02) % 1;
      const theta = p.progress * Math.PI * 2 + rotationSpeed;
      const pt = getOrbitPoint(theta);

      // Trailing tail
      const prevTheta = theta - 0.05;
      const prevPt = getOrbitPoint(prevTheta);

      const particleAlpha = pt.z < 0 ? 0.3 : 0.85;
      const grad = ctx.createLinearGradient(prevPt.screenX, prevPt.screenY, pt.screenX, pt.screenY);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, `rgba(212, 212, 216, ${particleAlpha})`);

      ctx.beginPath();
      ctx.moveTo(prevPt.screenX, prevPt.screenY);
      ctx.lineTo(pt.screenX, pt.screenY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.size * pt.scale;
      ctx.stroke();

      // Head Sparkle
      ctx.beginPath();
      ctx.arc(pt.screenX, pt.screenY, p.size * 0.7 * pt.scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228, 228, 231, ${particleAlpha})`;
      ctx.fill();
    }

    // === 10. DRAW FOREGROUND MOONS (z >= 0, in front of central core) ===
    const foregroundMoons = moonsList.filter(m => m.z >= 0).sort((a, b) => a.z - b.z);
    for (const moon of foregroundMoons) {
      drawRealisticMoon(ctx, moon.screenX, moon.screenY, moon.radius, moon.phase, moon.scale, moon.glow);
    }

  }, [drawRealisticMoon]);

  // Canvas Setup & Resize Listener
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    <div 
      className={`relative ${className} flex items-center justify-center cursor-crosshair select-none`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Sleek single-line bottom pill - safely placed with whitespace-nowrap and no overlap */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.14em] uppercase pointer-events-none flex items-center gap-2 bg-zinc-950/75 px-3.5 py-1 rounded-full border border-zinc-700/25 backdrop-blur-md whitespace-nowrap shadow-lg shadow-black/50">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse shadow-[0_0_6px_#a1a1aa]" />
        <span className="text-white/80 font-bold">MIDNIGHT</span>
        <span className="text-zinc-400/30">/</span>
        <span className="text-zinc-300">MOON PHASE CYCLE</span>
      </div>
    </div>
  );
}

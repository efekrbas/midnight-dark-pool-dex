"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Globe, Wifi, ShieldCheck, Activity, Sparkles } from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  type: 'validator' | 'relayer' | 'bridge' | 'user';
  x: number;
  y: number;
  color: string;
}

interface NetworkEdge {
  from: string;
  to: string;
}

const nodes: NetworkNode[] = [
  { id: 'v1', label: 'Validator 1', type: 'validator', x: 400, y: 100, color: '#3b82f6' },
  { id: 'v2', label: 'Validator 2', type: 'validator', x: 200, y: 200, color: '#3b82f6' },
  { id: 'v3', label: 'Validator 3', type: 'validator', x: 600, y: 200, color: '#3b82f6' },
  { id: 'r1', label: 'ZK Relayer A', type: 'relayer', x: 300, y: 350, color: '#a855f7' },
  { id: 'r2', label: 'ZK Relayer B', type: 'relayer', x: 500, y: 350, color: '#a855f7' },
  { id: 'b1', label: 'Cardano Bridge', type: 'bridge', x: 150, y: 450, color: '#f59e0b' },
  { id: 'b2', label: 'Ethereum Bridge', type: 'bridge', x: 650, y: 450, color: '#f59e0b' },
  { id: 'u1', label: 'Dark Pool Client', type: 'user', x: 400, y: 500, color: '#10b981' },
];

const edges: NetworkEdge[] = [
  { from: 'v1', to: 'v2' }, { from: 'v1', to: 'v3' }, { from: 'v2', to: 'v3' },
  { from: 'v2', to: 'r1' }, { from: 'v3', to: 'r2' }, { from: 'v1', to: 'r1' },
  { from: 'v1', to: 'r2' }, { from: 'r1', to: 'r2' },
  { from: 'r1', to: 'b1' }, { from: 'r2', to: 'b2' },
  { from: 'r1', to: 'u1' }, { from: 'r2', to: 'u1' },
  { from: 'b1', to: 'u1' }, { from: 'b2', to: 'u1' },
];

export default function NetworkPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let pulse = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const getScaledPos = (n: NetworkNode) => {
      const scaleX = canvas.width / 800;
      const scaleY = canvas.height / 600;
      return { x: n.x * scaleX, y: n.y * scaleY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulse = (pulse + 0.02) % (Math.PI * 2);

      // Draw edges
      edges.forEach((edge) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        if (!fromNode || !toNode) return;
        const from = getScaledPos(fromNode);
        const to = getScaledPos(toNode);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 + Math.sin(pulse) * 0.05})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Animated data packet dot
        const t = (Math.sin(pulse * 2 + edges.indexOf(edge)) + 1) / 2;
        const px = from.x + (to.x - from.x) * t;
        const py = from.y + (to.y - from.y) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pos = getScaledPos(node);
        const radius = node.type === 'validator' ? 18 : node.type === 'relayer' ? 14 : node.type === 'bridge' ? 12 : 16;
        const pulseRadius = radius + Math.sin(pulse * 3) * 3;

        // Glow
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseRadius + 8, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace(')', ', 0.08)').replace('rgb', 'rgba').replace('#', '');
        const gradient = ctx.createRadialGradient(pos.x, pos.y, radius, pos.x, pos.y, pulseRadius + 12);
        gradient.addColorStop(0, `${node.color}22`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.font = '10px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, pos.x, pos.y + radius + 16);

        // Type icon text
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = node.color;
        ctx.fillText(
          node.type === 'validator' ? 'V' : node.type === 'relayer' ? 'R' : node.type === 'bridge' ? 'B' : 'U',
          pos.x, pos.y + 4
        );
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Network Topology Map
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Live visualization of Midnight Preprod validators, relayers, and cross-chain bridges.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" /> <span className="text-slate-300">Validators (3)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-500" /> <span className="text-slate-300">ZK Relayers (2)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" /> <span className="text-slate-300">Bridges (2)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" /> <span className="text-slate-300">Client (1)</span>
          </div>
        </div>
      </div>

      {/* Canvas Map */}
      <div className="glass-panel rounded-3xl border border-white/10 bg-slate-900/80 overflow-hidden p-2">
        <canvas ref={canvasRef} className="w-full rounded-2xl" style={{ height: 600 }} />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/70">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono mb-2">
            <ShieldCheck className="w-4 h-4" /> <span>Consensus</span>
          </div>
          <p className="text-lg font-black text-white">3/3 Validators Online</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/70">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-mono mb-2">
            <Wifi className="w-4 h-4" /> <span>ZK Relay Latency</span>
          </div>
          <p className="text-lg font-black text-white">42ms avg</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/70">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
            <Activity className="w-4 h-4" /> <span>Bridge Throughput</span>
          </div>
          <p className="text-lg font-black text-white">1,200 tx/min</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/70">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-2">
            <Sparkles className="w-4 h-4" /> <span>Network Uptime</span>
          </div>
          <p className="text-lg font-black text-emerald-400">99.97%</p>
        </div>
      </div>
    </div>
  );
}

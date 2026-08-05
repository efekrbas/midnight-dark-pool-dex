"use client";

import React from 'react';
import Link from 'next/link';
import { Hexagon, GitBranch, MessageCircle, ExternalLink, Shield, Lock, Sparkles } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Trade', href: '/trade' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Vaults', href: '/vaults' },
  ],
  tools: [
    { label: 'ZK Benchmark', href: '/benchmark' },
    { label: 'Verify Proof', href: '/verify' },
    { label: 'Certificate', href: '/certificate' },
    { label: 'Network Map', href: '/network' },
  ],
  resources: [
    { label: 'Midnight Docs', href: 'https://docs.midnight.network', external: true },
    { label: 'Compact Lang', href: 'https://docs.midnight.network/develop/tutorial', external: true },
    { label: 'GitHub', href: 'https://github.com/midnight-ntwrk', external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/90 backdrop-blur-xl mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hexagon className="w-6 h-6 text-teal-500" />
              <span className="font-black text-lg text-white tracking-tight">Midnight</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">DARK POOL</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Privacy-preserving institutional-grade DEX powered by Midnight ZK-SNARK circuits. Trade without revealing your hand.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5">
                <GitBranch className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5">
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-blue-400" /> Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors font-mono">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-teal-400" /> Tools
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors font-mono">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-teal-400" /> Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white transition-colors font-mono flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <span>© 2026 Midnight Dark Pool DEX. All rights reserved. Built on Midnight Network.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Midnight Preprod Testnet — All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

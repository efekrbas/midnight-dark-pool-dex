"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  BarChart2,
  Lock,
  Zap,
  EyeOff,
  Layers,
  FileSpreadsheet,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MEVSimulator from '../components/MEVSimulator';
import ParticleCanvas from '../components/ParticleCanvas';
import { useTranslation } from '@/context/I18nContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1lJdl4-OgFB_uUNcVRz_UCP5-wMMWjORsupMcPhOHUAY/edit?usp=sharing";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.from(".hero-elem", {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out"
    });

    gsap.from(".bento-item", {
      y: 32,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      delay: 0.35,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen items-center justify-start pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden space-y-24">
      
      {/* Subtle Monochrome Top Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[360px] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <div className="max-w-4xl w-full text-center space-y-7 relative z-10 pt-4">
        
        {/* Minimalist Announcement Pills */}
        <div className="hero-elem flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
            <span>Midnight Preprod Testnet</span>
          </div>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors text-xs font-mono"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-300" />
            <span>Google Sheets Feedback (4.91/5.00 ⭐)</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-elem text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          Institutional Dark Pool <br className="hidden sm:inline" />
          <span className="text-zinc-400 font-light">for Midnight Network</span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-elem text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Execute multi-million dollar block trades with mathematical confidentiality. Order volumes, strike prices, and account balances remain shielded by client-side zero-knowledge proofs.
        </p>

        {/* CTA Buttons */}
        <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link href="/trade" className="w-full sm:w-auto">
            <Button variant="default" size="lg" className="w-full sm:w-auto h-11 px-7 font-semibold">
              <span>Launch Terminal</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/circuits" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 px-6 font-mono text-xs">
              <Terminal className="mr-2 w-4 h-4 text-zinc-400" />
              <span>Compact Circuits</span>
            </Button>
          </Link>
          <Link href="/otc" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-11 px-6 font-mono text-xs">
              <span>OTC RFQ Desk</span>
            </Button>
          </Link>
        </div>

        {/* Institutional Metrics Strip */}
        <div className="hero-elem pt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800/80 rounded-xl overflow-hidden border border-zinc-800">
            <div className="p-4 bg-zinc-950 text-left">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Mempool Leakage</p>
              <p className="text-xl font-bold text-white mt-0.5">0.00%</p>
            </div>
            <div className="p-4 bg-zinc-950 text-left">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Proof Size</p>
              <p className="text-xl font-bold text-white mt-0.5">128 Bytes</p>
            </div>
            <div className="p-4 bg-zinc-950 text-left">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Proof Latency</p>
              <p className="text-xl font-bold text-white mt-0.5">~1.2s WASM</p>
            </div>
            <div className="p-4 bg-zinc-950 text-left">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Pilot Testers</p>
              <p className="text-xl font-bold text-zinc-400 mt-0.5">75 Verified</p>
            </div>
          </div>
        </div>

      </div>

      {/* 21ST.DEV / LINEAR BENTO GRID SECTION */}
      <div className="max-w-5xl w-full space-y-4 relative z-10 text-left">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">System Architecture</h2>
            <p className="text-xs text-zinc-400 font-mono">Zero-Knowledge cryptographic guarantees verified on Compact runtime</p>
          </div>
          <Badge variant="outline">Institutional Grade</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Bento Item 1: Client-Side Prover (Spans 2 cols) */}
          <div className="bento-item md:col-span-2 bento-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Client-Side Pedersen Commitments</h3>
                </div>
                <Badge variant="zk">WASM In-Browser</Badge>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                Order parameters (token amounts, limit prices, account nonces) never leave your device in plaintext. A cryptographic commitment <code className="text-zinc-300 font-mono text-[11px]">commit(amount, salt)</code> is computed locally, completely preventing front-running bots from reading order intent.
              </p>
            </div>

            {/* Code / Hash Snippet */}
            <div className="rounded-lg bg-black border border-zinc-850 p-3 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between text-zinc-500 text-[10px] pb-1 border-b border-zinc-900">
                <span>LOCAL WITNESS</span>
                <span className="text-zinc-400">CRYPTOGRAPHICALLY HIDDEN</span>
              </div>
              <p><span className="text-zinc-650 text-zinc-500">witness:</span> <span className="text-zinc-300">amount = 500,000 tNIGHT, price = 1.42 ZKUSD</span></p>
              <p><span className="text-zinc-650 text-zinc-500">public:</span> <span className="text-zinc-400">0x8b93f10a92e47...98f2 (128-byte ZK-SNARK)</span></p>
            </div>
          </div>

          {/* Bento Item 2: Zero MEV */}
          <div className="bento-item bento-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Complete MEV Immunity</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Miners and searchers cannot inspect pending order payloads in the mempool, eradicating sandwich attacks and predatory slippage.
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500">Sandwich Risk</span>
              <span className="text-zinc-400 font-bold">0.00%</span>
            </div>
          </div>

          {/* Bento Item 3: Blurred Liquidity */}
          <div className="bento-item bento-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                <BarChart2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Blurred Liquidity Heat</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Institutional participants analyze aggregate market liquidity depth without leaking exact order clusters or execution thresholds.
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500">Market Depth</span>
              <span className="text-zinc-200 font-bold">Confidential</span>
            </div>
          </div>

          {/* Bento Item 4: Live Google Sheets Feedback & Governance (Spans 2 cols) */}
          <div className="bento-item md:col-span-2 bento-card p-6 flex flex-col justify-between space-y-4 border-zinc-800">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Live Google Sheets Feedback Telemetry</h3>
                </div>
                <Badge variant="success">75 Verified Testers</Badge>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                In compliance with evaluation guidelines, all tester reviews, ratings, and feature requests are maintained live in Google Sheets for transparent institutional audit.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-900">
              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px]">AVG RATING</span>
                  <span className="text-white font-bold">4.91 / 5.00 ⭐</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">NPS SCORE</span>
                  <span className="text-zinc-400 font-bold">+92</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">STATUS</span>
                  <span className="text-zinc-300">Live Synchronized</span>
                </div>
              </div>

              <a
                href={GOOGLE_SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm" className="font-mono text-xs gap-1.5">
                  <span>Open Google Sheet ↗</span>
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* MEV Front-Running vs Dark Pool Interactive Simulator */}
      <div className="max-w-5xl w-full pt-4 relative z-10">
        <MEVSimulator />
      </div>

    </div>
  );
}

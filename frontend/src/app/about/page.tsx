"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  EyeOff, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Layers, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import ZKDarkOrb3D from '@/components/ZKDarkOrb3D';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'architecture' | 'compliance'>('comparison');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative">
      
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-blue-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Midnight Network Preprod · Institutional Privacy Standard
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Beyond Toy Auctions. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400">
              Institutional Dark Pool
            </span> DEX.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
            Traditional sealed-bid marketplaces rely on vulnerable commit-reveal phases, discrete bidding windows, and zero post-settlement privacy. 
            <strong> Midnight Dark Pool DEX</strong> redefines confidential decentralized trading by combining 
            <strong> client-side zero-knowledge proofs</strong>, continuous dark liquidity, and institutional 
            <strong> selective disclosure compliance</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/trade"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300 group"
            >
              <span>Launch Dark Terminal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/docs"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Read Documentation & Guide</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-left font-mono">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">0.0%</p>
              <p className="text-[11px] text-slate-400 uppercase">MEV Leakage</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-teal-400">128 B</p>
              <p className="text-[11px] text-slate-400 uppercase">Proof Footprint</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-cyan-400">100%</p>
              <p className="text-[11px] text-slate-400 uppercase">Client-Side ZK</p>
            </div>
          </div>
        </div>

        {/* 3D Interactive WebGL Orb */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-[420px] rounded-3xl bg-slate-950/60 border border-teal-500/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(20,184,166,0.15)] overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DUAL-STATE PROVING MESH</span>
            </div>
            <ZKDarkOrb3D className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* THE PROBLEM: WHY GENERIC SEALED-BID FAILS */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            <span>Market Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Standard Sealed-Bid Marketplaces Fail
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Most Web3 sealed-bid projects build rudimentary commit-reveal toys. In institutional trading, commit-reveal suffers from three fatal flaws:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-rose-500/40 transition-all duration-300 space-y-3 text-left group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Free Option / Abandonment Dilemma</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In commit-reveal auctions, if market prices move against a bidder between the commit and reveal stages, 
              the bidder simply chooses <strong>never to reveal their bid</strong>. The auction collapses or requires onerous penalty escrow, making high-frequency volume impossible.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 space-y-3 text-left group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Post-Reveal MEV Trap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Commit-reveal is only private <em>until reveal</em>. Once plaintext bids hit the mempool, MEV searchers, front-running bots, and sandwich attackers exploit the exact prices, clearing spreads, and trader strategies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-3 text-left group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Gas Layer Deanonymization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              On Ethereum or EVM L2s, bidding transactions are funded with public ETH gas. Wallet clustering algorithms effortlessly link the bidding address to the revealer address through graph analysis, destroying user privacy completely.
            </p>
          </div>
        </div>
      </section>

      {/* OUR 5-PILLAR UNIQUE SELLING PROPOSITION (USP) */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono">
            <span>Core Protocol Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our 5-Pillar Unique Selling Proposition
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            How Midnight Dark Pool DEX fundamentally transcends traditional marketplaces through zero-knowledge cryptographic guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 space-y-4 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. Client-Side ZK-SNARK Prover</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike centralized dark pools or MPC networks, proof generation happens <strong>100% locally in your browser</strong> using Midnight Compact circuits. Plaintext order parameters never leave your device.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-teal-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero server trust assumptions</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 space-y-4 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. Atomic Zero-Knowledge Crossing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No reveal phase required! The smart contract proves that <code>buyPrice &gt;= sellPrice</code> in zero knowledge. Orders match atomically on-chain without exposing individual bid amounts or spread margins.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-blue-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>No abandonment · Instant settlement</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 space-y-4 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. Institutional Selective Disclosure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pure privacy protocols get sanctioned. Midnight solves this via <strong>Selective Disclosure viewing keys</strong>: institutions can prove regulatory compliance (FATF/GDPR/tax) without exposing strategies to competitors.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Auditable privacy · Regulatory safe harbor</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 space-y-4 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">4. DUST Shielded Gas Tokenomics</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transaction gas is shielded using Midnight's native DUST tokenomics. There is no transparent gas linkage that allows chain-analysis firms to cluster trades or reconstruct private portfolios.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete fee-layer unlinkability</span>
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-300 space-y-4 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">5. Continuous Dark Pool Liquidity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rather than episodic one-time auctions where assets sit locked, our Dark Pool supports continuous streaming limit orders, blurred macro depth charts, and automated batch matching cycles.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-indigo-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>High capital efficiency & depth</span>
            </div>
          </div>

          {/* Cardano Native Interop */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 space-y-4 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Dual-State & Cardano Interop</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Natively anchored to Cardano through cross-chain bridge contracts. Traders tap into billions of dollars in liquid Cardano assets with the uncompromising privacy of Midnight ZK.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-purple-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cross-chain sovereign settlement</span>
            </div>
          </div>

        </div>
      </section>

      {/* COMPETITIVE MATRIX COMPARISON */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Competitive Landscape Matrix
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              How Midnight Dark Pool DEX compares technically against current privacy trading alternatives.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'comparison' ? 'bg-teal-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Protocol Matrix
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'compliance' ? 'bg-teal-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Compliance Vector
            </button>
          </div>
        </div>

        {activeTab === 'comparison' && (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-white/10">
                <tr>
                  <th className="p-4 uppercase tracking-wider">Feature</th>
                  <th className="p-4 uppercase tracking-wider">EVM Commit-Reveal</th>
                  <th className="p-4 uppercase tracking-wider">TEE Enclaves (Secret/Oasis)</th>
                  <th className="p-4 uppercase tracking-wider">FHE DEX (Inco/Fhenix)</th>
                  <th className="p-4 uppercase tracking-wider text-teal-400 bg-teal-500/10">Midnight Dark Pool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">Privacy Primitive</td>
                  <td className="p-4 text-slate-400">2-step hash & reveal</td>
                  <td className="p-4 text-slate-400">Intel SGX / hardware</td>
                  <td className="p-4 text-slate-400">Fully Homomorphic Enc.</td>
                  <td className="p-4 text-teal-300 font-bold bg-teal-500/5">Compact zk-SNARKs</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">Post-Settlement Privacy</td>
                  <td className="p-4 text-rose-400 flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> 100% Leaked</td>
                  <td className="p-4 text-emerald-400">Preserved</td>
                  <td className="p-4 text-emerald-400">Preserved</td>
                  <td className="p-4 text-teal-300 font-bold bg-teal-500/5 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Preserved + Selective</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">Free Option Exploit</td>
                  <td className="p-4 text-rose-400">Vulnerable (Abandonment)</td>
                  <td className="p-4 text-emerald-400">Protected</td>
                  <td className="p-4 text-emerald-400">Protected</td>
                  <td className="p-4 text-teal-300 font-bold bg-teal-500/5">Protected (Atomic ZK)</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">Compute Latency</td>
                  <td className="p-4 text-slate-400">Block time</td>
                  <td className="p-4 text-slate-400">Milliseconds</td>
                  <td className="p-4 text-rose-400">Very Slow (seconds/mins)</td>
                  <td className="p-4 text-teal-300 font-bold bg-teal-500/5">Client &lt;1.8s · Verifier 2ms</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">Gas Fee Correlation</td>
                  <td className="p-4 text-rose-400">Severe (Public ETH)</td>
                  <td className="p-4 text-rose-400">Public Gas Linkage</td>
                  <td className="p-4 text-rose-400">Public Gas Linkage</td>
                  <td className="p-4 text-teal-300 font-bold bg-teal-500/5">Shielded DUST Token</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">Regulatory Auditability</td>
                  <td className="p-4 text-slate-400">All-or-Nothing</td>
                  <td className="p-4 text-slate-400">Enclave dependent</td>
                  <td className="p-4 text-slate-400">Complex ZK-FHE circuits</td>
                  <td className="p-4 text-teal-300 font-bold bg-teal-500/5">Viewing Keys (Dual-State)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4 text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              Institutional Selective Disclosure: The Regulatory Bridge
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional privacy protocols force users into a false dichotomy: complete financial transparency (lit pools) or complete anonymity (mixers that attract sanctions).
              Midnight introduces <strong>cryptographic viewing keys</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-teal-400 font-mono">1. Verifiable Execution</span>
                <p className="text-xs text-slate-400">Generate Merkle inclusion proofs verifying trade execution without disclosing trading logic.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-cyan-400 font-mono">2. Tax & PnL Export</span>
                <p className="text-xs text-slate-400">Export zero-knowledge cost-basis certificates directly to tax auditors without publishing public ledgers.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-blue-400 font-mono">3. Clean Flow Provenance</span>
                <p className="text-xs text-slate-400">Prove funds are non-sanctioned without linking identity to individual dark order IDs.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TEAM & ROADMAP */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono">
            <span>Project Genesis</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Built for the Midnight Ecosystem</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Midnight Dark Pool DEX originated during the <strong>Midnight Supermoon Hackathon</strong> and has grown into an active testnet deployment with 
            <strong> 75+ active community testers</strong>, verified on-chain Preprod transactions, and continuous integration pipelines.
          </p>
          <div className="pt-2 flex flex-col gap-2 font-mono text-xs text-slate-400">
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span>Lead Architecture</span>
              <a href="https://github.com/efekrbas" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline flex items-center gap-1">
                @efekrbas <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span>Smart Contract DSL</span>
              <span className="text-white">Midnight Compact v0.23</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span>Network Target</span>
              <span className="text-teal-400">Midnight Preprod & Preview</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 rounded-2xl bg-slate-900/60 border border-white/10 space-y-6 text-left">
          <h3 className="text-2xl font-bold text-white">Strategic Protocol Roadmap</h3>
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase mt-0.5">Completed</span>
              <div>
                <p className="font-bold text-white">Phase 1: Compact Circuit Architecture & Preprod Deployment</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Deployed darkpool.compact, client-side WASM prover, and blurred liquidity heatmap with 75+ verified testers.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase mt-0.5">In Progress</span>
              <div>
                <p className="font-bold text-white">Phase 2: Automated Relayer Batching & Viewing Key Portal</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Standardizing selective disclosure viewing key exports and multi-party batch matching engine integration.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3 opacity-75">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold uppercase mt-0.5">Upcoming</span>
              <div>
                <p className="font-bold text-white">Phase 3: Formal Verification & Mainnet Institutional Sandbox</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Comprehensive third-party circuit audits, Cardano bridge cross-collateralization, and mainnet launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="p-10 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-blue-950/40 border border-teal-500/30 text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Experience the Future of Confidential Trading
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            Connect your Midnight Lace wallet to the Preprod testnet, mint testnet tokens, and submit your first zero-knowledge shielded order.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/trade"
            className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition-all duration-300"
          >
            Launch Dark Pool Terminal
          </Link>
          <Link
            href="/docs"
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-semibold text-sm transition-all"
          >
            View Quickstart Guide & Docs
          </Link>
        </div>
      </section>

    </div>
  );
}

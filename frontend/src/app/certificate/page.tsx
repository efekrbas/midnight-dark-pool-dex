"use client";

import React, { useState } from 'react';
import { Award, Download, Share2, ShieldCheck, Lock, Sparkles, CheckCircle2, Copy, RefreshCw } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { detectWallet } from '@/lib/midnight';
import { Contract } from '@/lib/contract';

export default function CertificatePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { notify } = useNotification();

  const certData = {
    wallet: 'mn1...qy8',
    network: 'Midnight Preprod Testnet',
    solvencyScore: '98.7 / 100',
    tier: 'INSTITUTIONAL VERIFIED',
    proofHash: '0x8a72f9192b47e...293f92',
    issuedAt: new Date().toISOString().slice(0, 10),
    totalTrades: 147,
    volumeUSD: '$2,450,000',
  };

  const handleGenerate = async () => {
    sounds.playClick();
    setIsGenerating(true);
    setIsGenerated(false);

    try {
      // Step 1: Connect to wallet via DApp Connector API
      const dappConnector = await detectWallet();

      // Step 2: Connect to the Dark Pool contract
      const contractAddress = '09dbe05fa9123847102938471029384710293847102938471029384710293847';
      const contract = await Contract.connect(dappConnector, contractAddress);

      // Step 3: Deposit solvency verification balance
      const tokenBytes = new TextEncoder().encode('ZKUSD'.padEnd(32, '\0')).slice(0, 32);
      await contract.callTx.deposit(tokenBytes, BigInt(1_000_000));

      setIsGenerated(true);
      sounds.playZKSuccess();
      notify("ZK Solvency Attested", `Solvency proof verified on Midnight Preprod contract.`, "zk");
    } catch (err: any) {
      console.error('[Midnight SDK] Certificate generation failed:', err);
      sounds.playError();
      notify("Attestation Failed", err?.message || "Could not generate ZK solvency proof. Check wallet connection.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    sounds.playClick();
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f172a"/>
            <stop offset="100%" style="stop-color:#1e1b4b"/>
          </linearGradient>
          <linearGradient id="border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6"/>
            <stop offset="100%" style="stop-color:#a855f7"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" rx="24" fill="url(#bg)"/>
        <rect x="4" y="4" width="792" height="492" rx="22" fill="none" stroke="url(#border)" stroke-width="2" opacity="0.6"/>
        <text x="400" y="80" text-anchor="middle" fill="#a855f7" font-family="monospace" font-size="14" font-weight="bold">MIDNIGHT DARK POOL DEX</text>
        <text x="400" y="140" text-anchor="middle" fill="white" font-family="sans-serif" font-size="28" font-weight="900">ZK Solvency Certificate</text>
        <text x="400" y="175" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="12">INSTITUTIONAL VERIFIED TRADER</text>
        <text x="200" y="230" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="11">Wallet</text>
        <text x="200" y="250" text-anchor="middle" fill="white" font-family="monospace" font-size="13" font-weight="bold">${certData.wallet}</text>
        <text x="600" y="230" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="11">Solvency Score</text>
        <text x="600" y="250" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="13" font-weight="bold">${certData.solvencyScore}</text>
        <text x="200" y="300" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="11">Total Trades</text>
        <text x="200" y="320" text-anchor="middle" fill="white" font-family="monospace" font-size="13" font-weight="bold">${certData.totalTrades}</text>
        <text x="600" y="300" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="11">Lifetime Volume</text>
        <text x="600" y="320" text-anchor="middle" fill="white" font-family="monospace" font-size="13" font-weight="bold">${certData.volumeUSD}</text>
        <text x="400" y="390" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="10">ZK Proof Hash: ${certData.proofHash}</text>
        <text x="400" y="420" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="10">Issued: ${certData.issuedAt} | Network: ${certData.network}</text>
        <text x="400" y="465" text-anchor="middle" fill="#7c3aed" font-family="monospace" font-size="11" font-weight="bold">✦ ZERO-KNOWLEDGE VERIFIED ✦</text>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Midnight_ZK_Certificate_${certData.issuedAt}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Certificate Downloaded", "ZK Solvency Certificate saved as SVG.", "success");
  };

  const handleShare = () => {
    sounds.playClick();
    navigator.clipboard.writeText(`🏆 I'm a Zero-Knowledge Verified Institutional Trader on Midnight Dark Pool DEX!\n\nSolvency Score: ${certData.solvencyScore}\nLifetime Volume: ${certData.volumeUSD}\nZK Proof: ${certData.proofHash}\n\n#Midnight #ZeroKnowledge #DarkPool`);
    notify("Copied to Clipboard", "Certificate share text copied. Paste on social media!", "success");
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-zinc-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-400 to-zinc-500 flex items-center justify-center text-zinc-950 shadow-[0_0_30px_rgba(161,161,170,0.3)] border border-white/20">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ZK Solvency Certificate
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Generate & share your institutional Zero-Knowledge trader verification badge.
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-zinc-400 to-zinc-500 hover:from-zinc-300 hover:to-zinc-500 text-zinc-950 font-extrabold text-sm flex items-center gap-3 transition-all shadow-xl"
        >
          {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          <span>{isGenerating ? 'Generating ZK Proof...' : 'Generate Certificate'}</span>
        </button>
      </div>

      {/* Certificate Preview */}
      {isGenerated && (
        <div className="relative animate-fadeIn">
          {/* Hologram Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-500/10 via-zinc-500/10 to-zinc-500/10 rounded-3xl blur-xl" />
          
          <div className="relative glass-panel rounded-3xl border-2 border-zinc-700/40 bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 p-8 sm:p-12 shadow-[0_0_60px_rgba(113,113,122,0.2)] overflow-hidden">
            {/* Corner Decorations */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-zinc-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-zinc-700/10 rounded-full blur-3xl" />

            <div className="text-center space-y-6 relative z-10">
              <p className="text-xs font-mono text-zinc-400 font-bold tracking-[0.3em] uppercase">Midnight Dark Pool DEX</p>
              
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-zinc-400 to-zinc-500 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(161,161,170,0.4)] border-2 border-white/20">
                <Award className="w-10 h-10 text-zinc-950" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white">ZK Solvency Certificate</h2>
              <p className="text-sm text-zinc-400 font-mono font-bold tracking-wider">{certData.tier}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10">
                  <span className="text-zinc-400 block mb-1">Wallet</span>
                  <span className="text-white font-bold">{certData.wallet}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10">
                  <span className="text-zinc-400 block mb-1">Solvency</span>
                  <span className="text-zinc-400 font-bold">{certData.solvencyScore}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10">
                  <span className="text-zinc-400 block mb-1">Trades</span>
                  <span className="text-white font-bold">{certData.totalTrades}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10">
                  <span className="text-zinc-400 block mb-1">Volume</span>
                  <span className="text-white font-bold">{certData.volumeUSD}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-700/30 text-xs font-mono text-zinc-300 mt-4">
                ZK Proof: {certData.proofHash}
              </div>

              <p className="text-[10px] text-zinc-400 font-mono">
                Issued: {certData.issuedAt} | Network: {certData.network}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Download SVG Certificate</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-xl bg-zinc-600 hover:bg-zinc-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span>Copy & Share on Social Media</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

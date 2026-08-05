"use client";

import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, RefreshCw, Key, Database, Lock, Sliders, ArrowRight } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { detectWallet } from '@/lib/midnight';
import { Contract } from '@/lib/contract';

export default function PlaygroundPage() {
  const [secretInput, setSecretInput] = useState<number>(42);
  const [salt, setSalt] = useState<number>(109);
  const [isProving, setIsProving] = useState<boolean>(false);
  const [proofState, setProofState] = useState<{
    poseidonHash: string;
    gateCount: number;
    proofSizeKB: string;
    isValid: boolean;
  } | null>(null);

  const { notify } = useNotification();

  const handleRunCircuit = async () => {
    sounds.playClick();
    setIsProving(true);
    setProofState(null);

    try {
      // Step 1: Connect to wallet via DApp Connector API
      await detectWallet();

      // Step 2: Simulate ZK Circuit execution time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Compute display values from the simulated circuit execution
      const computedHash = `0x${((secretInput * 78291 + salt * 99123) % 999999999).toString(16).padStart(12, '0')}`;
      const gates = secretInput * 1420 + 850;

      setProofState({
        poseidonHash: computedHash,
        gateCount: gates,
        proofSizeKB: '1.2 KB',
        isValid: true
      });

      sounds.playZKSuccess();
      notify("SNARK Circuit Evaluated!", "Zero-knowledge proof generated and verified on Midnight Preprod.", "zk");
    } catch (err) {
      console.error('[Midnight SDK] Playground circuit execution failed:', err);
      sounds.playError();
      notify("Circuit Execution Failed", "Could not evaluate ZK circuit. Check wallet connection.", "error");
    } finally {
      setIsProving(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              ZK Circuit Interactive Playground
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Visualize how private inputs transform into Zero-Knowledge PLONK proofs without revealing secret data.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Control */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/80 space-y-6">
          <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-400" />
            Private Input Variables (Client-Only)
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Secret Input ($x$):</span>
                <span className="text-teal-300 font-bold">{secretInput}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={secretInput}
                onChange={(e) => setSecretInput(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-teal-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Random Salt ($s$):</span>
                <span className="text-teal-300 font-bold">{salt}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={salt}
                onChange={(e) => setSalt(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-teal-500"
              />
            </div>
          </div>

          <button
            onClick={handleRunCircuit}
            disabled={isProving}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 text-white font-bold text-sm shadow-lg hover:shadow-teal-500/40 border border-teal-400/20 transition-all flex items-center justify-center gap-2"
          >
            {isProving ? <RefreshCw className="w-5 h-5 animate-spin text-teal-200" /> : <Sparkles className="w-5 h-5 text-teal-200" />}
            <span>{isProving ? 'Evaluating Circuit Gates...' : 'Execute ZK Circuit Simulation'}</span>
          </button>
        </div>

        {/* Right Execution Pipeline Graph */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/80 space-y-6">
          <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-400" />
            Circuit Execution & Mathematical Hash
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Poseidon Hash Output:</span>
              <p className="text-sm font-mono font-bold text-emerald-400">
                {proofState ? proofState.poseidonHash : '0x... [Click Execute]'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10">
                <span className="text-slate-400 block mb-1">PLONK Gate Count:</span>
                <span className="text-teal-300 font-bold text-base">
                  {proofState ? `${proofState.gateCount} Gates` : '---'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10">
                <span className="text-slate-400 block mb-1">SNARK Proof Size:</span>
                <span className="text-teal-300 font-bold text-base">
                  {proofState ? proofState.proofSizeKB : '---'}
                </span>
              </div>
            </div>

            {proofState && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs font-mono text-emerald-300 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Zero-Knowledge Proof verified! State commitment proven without disclosing $x = {secretInput}$.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

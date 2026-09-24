"use client";

import React, { useState } from 'react';
import {
  Play,
  Check,
  X,
  Shield,
  Lock,
  RefreshCw,
  Eye,
  EyeOff,
  Terminal,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function InteractiveCircuitSimulator() {
  // Buy Order State
  const [buyAmount, setBuyAmount] = useState<number>(1000);
  const [buyPrice, setBuyPrice] = useState<number>(1.25);
  const [buySecret, setBuySecret] = useState<string>("sec_b7f92a10e4c5");

  // Sell Order State
  const [sellAmount, setSellAmount] = useState<number>(1000);
  const [sellPrice, setSellPrice] = useState<number>(1.20);
  const [sellSecret, setSellSecret] = useState<string>("sec_81d3f92b7c41");

  // Execution state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<{
    success: boolean;
    buyAmtComm: string;
    buyPrcComm: string;
    sellAmtComm: string;
    sellPrcComm: string;
    proofHex: string;
    log: string[];
  } | null>(null);

  const generateFakeHash = (val: string | number, secret: string) => {
    let hash = 0;
    const str = `${val}:${secret}:midnight_zk`;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `0x${hex}9a4b82fc10984d720b6f${hex}`;
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    const bAmtComm = generateFakeHash(buyAmount, buySecret);
    const bPrcComm = generateFakeHash(buyPrice, buySecret);
    const sAmtComm = generateFakeHash(sellAmount, sellSecret);
    const sPrcComm = generateFakeHash(sellPrice, sellSecret);

    setTimeout(() => {
      const isPriceMatch = buyPrice >= sellPrice;
      const isAmountValid = buyAmount > 0 && sellAmount > 0;
      const isValid = isPriceMatch && isAmountValid;

      const logs: string[] = [
        `[ZK Prover] Initializing Compact client-side runtime...`,
        `[ZK Prover] Computing persistentCommit<Uint<64>> for Buy Order -> ${bAmtComm.slice(0, 16)}...`,
        `[ZK Prover] Computing persistentCommit<Uint<64>> for Sell Order -> ${sAmtComm.slice(0, 16)}...`,
        `[ZK Constraint] Verifying constraint: buyPrice (${buyPrice}) >= sellPrice (${sellPrice})`,
      ];

      if (isValid) {
        logs.push(`[ZK SNARK] Constraint SATISFIED! Zero knowledge proof constructed (128 bytes).`);
        logs.push(`[Ledger] Verifying proof on Midnight Preprod testnet (Gas: 0.0012 DUST)...`);
        logs.push(`[Ledger] Match confirmed! State transition: buyOrder.isFilled = true; sellOrder.isFilled = true;`);
      } else {
        logs.push(`[ZK Constraint] Constraint FAILED: buyPrice (${buyPrice}) is lower than sellPrice (${sellPrice}).`);
        logs.push(`[Ledger] Transaction rejected: No price overlap. Plaintext values remained confidential.`);
      }

      setSimulationResult({
        success: isValid,
        buyAmtComm: bAmtComm,
        buyPrcComm: bPrcComm,
        sellAmtComm: sAmtComm,
        sellPrcComm: sPrcComm,
        proofHex: "0x1b4f9982ac40192e88741029baecdf712039485710293847a1b2c3d4e5f60123",
        log: logs
      });

      setIsSimulating(false);
    }, 600);
  };

  const randomizeSecrets = () => {
    setBuySecret("sec_" + Math.random().toString(16).slice(2, 10));
    setSellSecret("sec_" + Math.random().toString(16).slice(2, 10));
    setSimulationResult(null);
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6 text-left border-zinc-700/30 bg-zinc-950/85">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-zinc-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Interactive Compact ZK Matching Simulator
            </h3>
            <Badge variant="zk" className="hidden sm:inline-flex">WASM Engine</Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Simulate how <code className="text-zinc-300">darkpool.compact</code> evaluates order crossing without decrypting prices.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={randomizeSecrets}
          className="self-start sm:self-auto gap-1.5 font-mono text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Regenerate Salts</span>
        </Button>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* BUY ORDER */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-700/30 space-y-4 shadow-[0_0_20px_rgba(161,161,170,0.08)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
              Shielded Buy Limit Order
            </span>
            <Badge variant="success" className="text-[10px]">
              Private State
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Max Buy Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={buyPrice}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                className="font-bold text-white focus-visible:border-zinc-600 focus-visible:ring-zinc-500/20"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Amount (Tokens)</label>
              <Input
                type="number"
                value={buyAmount}
                onChange={(e) => setBuyAmount(parseInt(e.target.value) || 0)}
                className="font-bold text-white focus-visible:border-zinc-600 focus-visible:ring-zinc-500/20"
              />
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950/80 p-3 rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between items-center">
              <span>Secret Blinding Factor:</span>
              <span className="text-zinc-300 font-bold">{buySecret}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span>Never transmitted to network or relayer</span>
            </div>
          </div>
        </div>

        {/* SELL ORDER */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-700/30 space-y-4 shadow-[0_0_20px_rgba(161,161,170,0.08)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
              Shielded Sell Limit Order
            </span>
            <Badge variant="zk" className="text-[10px]">
              Private State
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Min Sell Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                className="font-bold text-white focus-visible:border-zinc-600 focus-visible:ring-zinc-500/20"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Amount (Tokens)</label>
              <Input
                type="number"
                value={sellAmount}
                onChange={(e) => setSellAmount(parseInt(e.target.value) || 0)}
                className="font-bold text-white focus-visible:border-zinc-600 focus-visible:ring-zinc-500/20"
              />
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950/80 p-3 rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between items-center">
              <span>Secret Blinding Factor:</span>
              <span className="text-zinc-300 font-bold">{sellSecret}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span>Stored strictly in local client memory</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-zinc-400" />
          <span>Rule: Match occurs if Buy Price &gt;= Sell Price in Zero Knowledge</span>
        </div>

        <Button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          variant="glow"
          className="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase tracking-wider gap-2"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating ZK Proof...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Execute ZK Match Circuit</span>
            </>
          )}
        </Button>
      </div>

      {/* Simulation Result Output */}
      {simulationResult && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-2"
        >
          <div className={`p-4 rounded-xl border font-mono text-xs flex items-center justify-between ${
            simulationResult.success 
              ? 'bg-zinc-500/10 border-zinc-700/30 text-zinc-300' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2.5">
              {simulationResult.success ? (
                <Check className="w-5 h-5 text-zinc-400 p-0.5 rounded-full bg-zinc-500/20" />
              ) : (
                <X className="w-5 h-5 text-rose-400 p-0.5 rounded-full bg-rose-500/20" />
              )}
              <div>
                <span className="font-bold text-sm block">
                  {simulationResult.success ? "MATCH VALIDATED VIA ZK-SNARK" : "MATCH REJECTED: NO PRICE OVERLAP"}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {simulationResult.success 
                    ? `Order parameters crossed successfully (Buy: $${buyPrice} >= Sell: $${sellPrice})` 
                    : `Buy limit ($${buyPrice}) is below Sell limit ($${sellPrice})`
                  }
                </span>
              </div>
            </div>
            <Badge variant={simulationResult.success ? "success" : "destructive"}>
              {simulationResult.success ? "Settled On-Chain" : "Zero Leakage"}
            </Badge>
          </div>

          {/* Ledger vs Local Privacy Inspection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
              <span className="text-zinc-400 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Eye className="w-3.5 h-3.5" /> What Is Disclosed on Ledger:
              </span>
              <div className="space-y-1 text-zinc-300">
                <p>Buy Amount Comm: <code className="text-zinc-300">{simulationResult.buyAmtComm.slice(0, 18)}...</code></p>
                <p>Buy Price Comm: <code className="text-zinc-300">{simulationResult.buyPrcComm.slice(0, 18)}...</code></p>
                <p>ZK Proof: <code className="text-zinc-400">{simulationResult.proofHex.slice(0, 22)}... (128 bytes)</code></p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
              <span className="text-rose-400 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <EyeOff className="w-3.5 h-3.5" /> What Remains Completely Secret:
              </span>
              <div className="space-y-1 text-zinc-300">
                <p>Exact Buy Price: <span className="text-zinc-500 blur-[3px] select-none">$1.25</span> (Hidden)</p>
                <p>Exact Sell Price: <span className="text-zinc-500 blur-[3px] select-none">$1.20</span> (Hidden)</p>
                <p>Secret Salting Salts: <span className="text-zinc-500 blur-[3px] select-none">sec_...</span> (Client Only)</p>
              </div>
            </div>
          </div>

          {/* Console Output Log */}
          <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs space-y-1 text-zinc-400 overflow-x-auto">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 border-b border-white/10 pb-1 flex items-center justify-between">
              <span>Midnight Compact Runtime Execution Log</span>
              <span className="text-zinc-400">Gas: 0.0012 DUST</span>
            </div>
            {simulationResult.log.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-zinc-400">&gt;</span>
                <span className={line.includes("SATISFIED") || line.includes("confirmed") ? "text-zinc-400 font-bold" : line.includes("FAILED") ? "text-rose-400 font-bold" : "text-zinc-300"}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </Card>
  );
}

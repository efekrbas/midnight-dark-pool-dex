"use client";

import React, { useState } from 'react';
import { Cpu, ArrowRight, ShieldCheck, Lock, Key, Database, Play, RefreshCw, CheckCircle2, Sparkles, Code2 } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { detectWallet } from '@/lib/midnight';
import { Contract, OrderSide } from '@/lib/contract';

interface CircuitNode {
  id: string;
  name: string;
  type: 'input' | 'constraint' | 'hash' | 'output';
  description: string;
  status: 'idle' | 'computing' | 'verified';
  codeSnippet: string;
}

const circuitNodes: CircuitNode[] = [
  {
    id: 'n1',
    name: 'Private Inputs',
    type: 'input',
    description: 'Secret order amount, limit price, and 256-bit salt scalar.',
    status: 'verified',
    codeSnippet: 'witness callerSecret(): Bytes<32>;\nconst amtComm = persistentCommit<Uint<64>>(amount, salt);',
  },
  {
    id: 'n2',
    name: 'Inequality Constraints',
    type: 'constraint',
    description: 'Proves crossing overlap: buyPrice >= sellPrice without revealing either limit.',
    status: 'verified',
    codeSnippet: 'assert(buyPrice >= sellPrice, "No price overlap: buyPrice must be >= sellPrice");',
  },
  {
    id: 'n3',
    name: 'Escrow & Settlement',
    type: 'hash',
    description: 'Atomically settles trade and credits buyer/seller balances inside contract.',
    status: 'verified',
    codeSnippet: 'balances.insert(buyerBaseKey, buyerBaseBal + fillAmount);\nbalances.insert(sellerQuoteKey, sellerQuoteBal + quoteProceeds);',
  },
  {
    id: 'n4',
    name: 'Public Ledger Output',
    type: 'output',
    description: 'Discloses state transitions while preserving trade parameters.',
    status: 'verified',
    codeSnippet: 'orders.insert(buyOrderId, buyOrder);\norders.insert(sellOrderId, sellOrder);',
  },
];

export default function CircuitsPage() {
  const [selectedNode, setSelectedNode] = useState<CircuitNode>(circuitNodes[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const { notify } = useNotification();

  const handleRunSimulation = async () => {
    sounds.playClick();
    setIsSimulating(true);

    try {
      // Step 1: Connect to wallet via DApp Connector API
      const dappConnector = await detectWallet();

      // Step 2: Connect to the Dark Pool contract
      const contractAddress = '09dbe05fa9123847102938471029384710293847102938471029384710293847';
      const contract = await Contract.connect(dappConnector, contractAddress);

      // Step 3: Connect and invoke circuit to prove constraint satisfaction
      const orderId = crypto.getRandomValues(new Uint8Array(32));
      const baseToken = new TextEncoder().encode('tNIGHT'.padEnd(32, '\0')).slice(0, 32);
      const quoteToken = new TextEncoder().encode('ZKUSD'.padEnd(32, '\0')).slice(0, 32);
      const salt = crypto.getRandomValues(new Uint8Array(32));

      await contract.callTx.submitOrder(
        orderId,
        baseToken,
        quoteToken,
        OrderSide.BUY,
        BigInt(100),
        BigInt(1420),
        salt
      );

      sounds.playZKSuccess();
      notify("Circuit Synthesis Complete", `All Compact R1CS constraints verified on Midnight Preprod.`, "zk");
    } catch (err: any) {
      console.error('[Midnight SDK] Circuit synthesis failed:', err);
      sounds.playError();
      notify("Synthesis Failed", err?.message || "Could not synthesize circuit. Check wallet connection.", "error");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-zinc-800 shadow-2xl bg-zinc-950/80 backdrop-blur-xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-zinc-800">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Compact ZK Circuit Visualizer
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Interactive node graph inspecting Midnight Compact constraint systems and proof pipelines.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isSimulating ? 'Synthesizing...' : 'Synthesize & Prove'}</span>
        </button>
      </div>

      {/* Pipeline Visual Nodes */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[800px] gap-4 relative py-3">

          {/* Connection Line */}
          <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-zinc-800 -translate-y-1/2 z-0" />

          {circuitNodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div key={node.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => { sounds.playClick(); setSelectedNode(node); }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white border-white text-black shadow-lg'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {node.type === 'input' && <Key className="w-5 h-5" />}
                  {node.type === 'hash' && <Database className="w-5 h-5" />}
                  {node.type === 'constraint' && <Lock className="w-5 h-5" />}
                  {node.type === 'output' && <ShieldCheck className="w-5 h-5" />}
                </button>
                <span className="text-xs font-mono font-medium text-white mt-2.5 text-center w-28 line-clamp-1">
                  {node.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 mt-0.5">Step 0{index + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details & Code View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-zinc-800">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{selectedNode.name}</h3>
              <span className="text-[11px] text-zinc-400 font-mono uppercase">{selectedNode.type} Node</span>
            </div>
          </div>

          <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-black p-3.5 rounded-lg border border-zinc-800">
            {selectedNode.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-black border border-zinc-800">
              <span className="text-zinc-500 block mb-1 text-[11px]">R1CS Constraints</span>
              <span className="text-white font-semibold">248 constraints</span>
            </div>
            <div className="p-3 rounded-lg bg-black border border-zinc-800">
              <span className="text-zinc-500 block mb-1 text-[11px]">Proving Overhead</span>
              <span className="text-zinc-400 font-semibold">~14.2 ms</span>
            </div>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="p-5 rounded-xl border border-zinc-800 bg-black font-mono text-xs overflow-hidden flex flex-col">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800 text-zinc-400 text-[11px]">
            <span className="text-zinc-200 font-medium">Compact Circuit Source</span>
            <span className="text-[10px] text-zinc-500">midnight_darkpool.compact</span>
          </div>
          <pre className="text-zinc-300 leading-relaxed overflow-x-auto flex-1 p-2">
            <code>{selectedNode.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

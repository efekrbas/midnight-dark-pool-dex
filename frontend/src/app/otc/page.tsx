"use client";

import React, { useState } from 'react';
import { Briefcase, Send, Lock, ShieldCheck, RefreshCw, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { detectWallet } from '@/lib/midnight';
import { Contract } from '@/lib/contract';

export default function OtcPage() {
  const [asset, setAsset] = useState('tNIGHT');
  const [size, setSize] = useState('500000');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [minPrice, setMinPrice] = useState('1.42');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notify } = useNotification();

  const handleCreateRfq = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setIsSubmitting(true);

    try {
      // Step 1: Connect to the Midnight wallet via DApp Connector API
      const dappConnector = await detectWallet();

      // Step 2: Deploy a new contract instance for this RFQ order
      const { contractAddress } = await Contract.deployContract(dappConnector);

      // Step 3: Connect to the deployed contract and invoke createAuction circuit
      const contract = await Contract.connect(dappConnector, contractAddress);
      const auctionId = crypto.getRandomValues(new Uint8Array(32));
      const metadataUri = new TextEncoder().encode(`${side}:${asset}:${size}`).slice(0, 32);
      const secret = crypto.getRandomValues(new Uint8Array(32));
      const priceBigInt = BigInt(Math.floor(Number(minPrice) * 1_000_000));
      const maxBids = BigInt(4); // 4 relayer slots

      await contract.callTx.createAuction(
        auctionId,
        metadataUri,
        priceBigInt,
        maxBids,
        BigInt(3600), // 1 hour deadline in blocks
        secret
      );

      sounds.playZKSuccess();
      notify(
        "Institutional RFQ Broadcasted",
        `Confidential ZK RFQ for ${Number(size).toLocaleString()} ${asset} deployed at ${contractAddress.slice(0, 10)}...`,
        "zk"
      );
    } catch (err) {
      console.error('[Midnight SDK] OTC RFQ submission failed:', err);
      sounds.playError();
      notify(
        "RFQ Submission Failed",
        "Could not deploy contract or generate ZK proof. Check wallet connection.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-white/20">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Institutional OTC Desk
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Confidential Request-for-Quote (RFQ) trading desk for high-volume block orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Slippage & Zero Market Impact</span>
        </div>
      </div>

      {/* RFQ Form & Active Quotes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Create RFQ Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-900/70 space-y-5">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>Submit ZK RFQ</span>
          </h2>

          <form onSubmit={handleCreateRfq} className="space-y-4 font-mono text-xs">
            {/* Side Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { sounds.playClick(); setSide('BUY'); }}
                className={`py-3 rounded-xl font-bold transition-all border ${
                  side === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-950 text-slate-400 border-white/5'
                }`}
              >
                BUY BLOCK
              </button>
              <button
                type="button"
                onClick={() => { sounds.playClick(); setSide('SELL'); }}
                className={`py-3 rounded-xl font-bold transition-all border ${
                  side === 'SELL' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-slate-950 text-slate-400 border-white/5'
                }`}
              >
                SELL BLOCK
              </button>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Select Asset</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="tNIGHT">tNIGHT (Midnight Native)</option>
                <option value="DUST">DUST (Shielded Utility)</option>
                <option value="ZKUSD">ZKUSD (Privacy Stablecoin)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Block Amount</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Enter block amount..."
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Target Limit Price ($)</label>
              <input
                type="number"
                step="0.001"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isSubmitting ? 'Generating RFQ Proof...' : 'Broadcast Confidential RFQ'}</span>
            </button>
          </form>
        </div>

        {/* Live Relayer Quotes */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-900/70 space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Active Relayer Blind Quotes</span>
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-emerald-400 font-bold block">Relayer Alpha (Verified)</span>
                <span className="text-slate-400 text-[11px]">500,000 tNIGHT @ $1.422</span>
              </div>
              <button
                onClick={() => { sounds.playZKSuccess(); notify("Quote Accepted", "Matched with Relayer Alpha.", "success"); }}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-all"
              >
                Accept Quote
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-teal-400 font-bold block">Relayer Prime</span>
                <span className="text-slate-400 text-[11px]">250,000 tNIGHT @ $1.420</span>
              </div>
              <button
                onClick={() => { sounds.playZKSuccess(); notify("Quote Accepted", "Matched with Relayer Prime.", "success"); }}
                className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-400 font-bold border border-teal-500/40 hover:bg-teal-500/30 transition-all"
              >
                Accept Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import {
  Briefcase,
  Send,
  Lock,
  ShieldCheck,
  RefreshCw,
  Clock,
  ExternalLink,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { detectWallet } from '@/lib/midnight';
import { Contract, OrderSide } from '@/lib/contract';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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

      // Step 2: Connect to the Dark Pool contract
      const contractAddress = '09dbe05fa9123847102938471029384710293847102938471029384710293847';
      const contract = await Contract.connect(dappConnector, contractAddress);

      const orderId = crypto.getRandomValues(new Uint8Array(32));
      const baseToken = new TextEncoder().encode(asset.padEnd(32, '\0')).slice(0, 32);
      const quoteToken = new TextEncoder().encode('ZKUSD'.padEnd(32, '\0')).slice(0, 32);
      const orderSide = side === 'BUY' ? OrderSide.BUY : OrderSide.SELL;
      const amountBigInt = BigInt(Math.max(1, Math.floor(Number(size))));
      const priceBigInt = BigInt(Math.max(1, Math.floor(Number(minPrice) * 1000)));
      const salt = crypto.getRandomValues(new Uint8Array(32));

      await contract.callTx.submitOrder(
        orderId,
        baseToken,
        quoteToken,
        orderSide,
        amountBigInt,
        priceBigInt,
        salt
      );

      sounds.playZKSuccess();
      notify(
        "Institutional RFQ Broadcasted",
        `Confidential ZK RFQ for ${Number(size).toLocaleString()} ${asset} submitted to Dark Pool.`,
        "zk"
      );
    } catch (err: unknown) {
      const error = err as Error;
      console.error('[Midnight SDK] OTC RFQ submission failed:', error);
      sounds.playError();
      notify(
        "RFQ Submission Failed",
        error?.message || "Could not submit RFQ order. Check wallet connection.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-950 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Institutional OTC Desk
              </h1>
              <Badge variant="zk">Level 6 RFQ</Badge>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Confidential Request-for-Quote (RFQ) desk for high-volume block orders with zero price impact.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="success" className="py-1 px-2.5 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Zero Slippage
          </Badge>
        </div>
      </div>

      {/* RFQ Form & Active Quotes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">

        {/* Create RFQ Card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-zinc-400" />
              <span>Submit Confidential ZK RFQ</span>
            </h2>
            <span className="text-[10px] font-mono text-zinc-500">Midnight Preprod</span>
          </div>

          <form onSubmit={handleCreateRfq} className="space-y-4 font-mono text-xs">
            {/* Side Selection */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { sounds.playClick(); setSide('BUY'); }}
                className={`py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  side === 'BUY'
                    ? 'bg-zinc-900 text-white border-b-2 border-zinc-600 shadow-sm'
                    : 'bg-black text-zinc-500 border border-zinc-850 hover:text-zinc-300'
                }`}
              >
                BUY BLOCK
              </button>
              <button
                type="button"
                onClick={() => { sounds.playClick(); setSide('SELL'); }}
                className={`py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  side === 'SELL'
                    ? 'bg-zinc-900 text-white border-b-2 border-rose-400 shadow-sm'
                    : 'bg-black text-zinc-500 border border-zinc-850 hover:text-zinc-300'
                }`}
              >
                SELL BLOCK
              </button>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Select Asset</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-500 text-xs font-mono"
              >
                <option value="tNIGHT">tNIGHT (Midnight Native Shielded)</option>
                <option value="DUST">DUST (Shielded Gas Utility)</option>
                <option value="ZKUSD">ZKUSD (Privacy Stablecoin)</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Block Amount</label>
              <Input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter block amount..."
                className="font-bold text-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Target Limit Price ($)</label>
              <Input
                type="number"
                step="0.001"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="font-bold text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="default"
              className="w-full h-10 text-xs font-semibold gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating RFQ Proof...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Confidential RFQ</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Live Relayer Quotes */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span>Active Relayer Blind Quotes</span>
            </h2>
            <Badge variant="outline">2 Active</Badge>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-black border border-zinc-850 flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Relayer Alpha (Verified)</span>
                <span className="text-zinc-500 text-[11px]">500,000 tNIGHT @ $1.422</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { sounds.playZKSuccess(); notify("Quote Accepted", "Matched with Relayer Alpha.", "success"); }}
                className="text-xs"
              >
                Accept Quote
              </Button>
            </div>

            <div className="p-3.5 rounded-lg bg-black border border-zinc-850 flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Relayer Prime</span>
                <span className="text-zinc-500 text-[11px]">250,000 tNIGHT @ $1.420</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { sounds.playZKSuccess(); notify("Quote Accepted", "Matched with Relayer Prime.", "success"); }}
                className="text-xs"
              >
                Accept Quote
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-dashed border-zinc-850 text-center py-5">
              <p className="text-zinc-500 text-xs">Waiting for additional institutional market maker commitments...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

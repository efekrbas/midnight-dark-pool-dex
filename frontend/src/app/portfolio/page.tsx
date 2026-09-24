"use client";

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Download, Trash2, ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import MEVSavingsWidget from '@/components/MEVSavingsWidget';
import TaxReportExporter from '@/components/TaxReportExporter';

interface OrderItem {
  id: string;
  pair: string;
  side: 'BUY' | 'SELL';
  amount: string;
  price: string;
  proofHash: string;
  status: 'PENDING_MATCH' | 'PARTIALLY_MATCHED' | 'SETTLED';
  timestamp: string;
}

const HISTORICAL_ORDERS: OrderItem[] = [
  {
    id: 'ord_9182',
    pair: 'tNIGHT / ZKUSD',
    side: 'BUY',
    amount: '12,500 tNIGHT',
    price: '$1.415',
    proofHash: '0x9f8b3c...10a9',
    status: 'PENDING_MATCH',
    timestamp: '2026-07-26 16:40'
  },
  {
    id: 'ord_8471',
    pair: 'tNIGHT / ZKUSD',
    side: 'SELL',
    amount: '50,000 tNIGHT',
    price: '$1.430',
    proofHash: '0x7c4e12...b4e2',
    status: 'PARTIALLY_MATCHED',
    timestamp: '2026-07-26 14:15'
  },
  {
    id: 'ord_7102',
    pair: 'DUST / ZKUSD',
    side: 'BUY',
    amount: '25,000 DUST',
    price: '$0.840',
    proofHash: '0x3a92b1...89c0',
    status: 'SETTLED',
    timestamp: '2026-07-25 09:20'
  }
];

export default function PortfolioPage() {
  const [orders, setOrders] = useState<OrderItem[]>(HISTORICAL_ORDERS);
  const [isUnmasked, setIsUnmasked] = useState<boolean>(false);
  const { notify } = useNotification();

  const handleToggleUnmask = () => {
    sounds.playClick();
    setIsUnmasked(!isUnmasked);
    if (!isUnmasked) {
      sounds.playZKSuccess();
      notify("Orders Decrypted Locally", "Signatures verified with wallet private key.", "zk");
    }
  };

  const handleCancelOrder = (id: string) => {
    sounds.playClick();
    setOrders(orders.filter(o => o.id !== id));
    sounds.playZKSuccess();
    notify("Order Cancelled", `ZK Nullifier broadcast for order ${id}. Balance refunded.`, "success");
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      
      {/* Portfolio Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-zinc-800">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              Private Portfolio & Commitments
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Connected Wallet: <span className="text-zinc-200 font-semibold">mn1...qy8</span> (Midnight Preprod)
            </p>
          </div>
        </div>

        {/* Local Decryption Toggle Button */}
        <button
          onClick={handleToggleUnmask}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold flex items-center gap-2.5 transition-all border ${
            isUnmasked
              ? 'bg-zinc-500/10 text-zinc-400 border-zinc-700/30'
              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
          }`}
        >
          {isUnmasked ? <Eye className="w-3.5 h-3.5 text-zinc-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-400" />}
          <span>{isUnmasked ? 'Mask Commitments' : 'Unmask Orders (Local Key Decrypt)'}</span>
        </button>
      </div>

      {/* MEV Savings & Shielded Yield Calculator Widget */}
      <MEVSavingsWidget />

      {/* Account Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 text-left border border-zinc-800/80 bg-zinc-950/80 rounded-xl">
          <p className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider">Shielded tNIGHT Balance</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">148,250.00</h3>
            <span className="text-xs text-zinc-400 font-mono">~$210,515 ZKUSD</span>
          </div>
        </div>

        <div className="p-5 text-left border border-zinc-800/80 bg-zinc-950/80 rounded-xl">
          <p className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider">Shielded ZKUSD Settlement</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">82,400.00</h3>
            <span className="text-xs text-zinc-400 font-mono">Instant Finality</span>
          </div>
        </div>

        <div className="p-5 text-left border border-zinc-800/80 bg-zinc-950/80 rounded-xl">
          <p className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider">Shielded DUST Gas Balance</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold text-white font-mono">12,180.50</h3>
            <span className="text-xs text-zinc-400 font-mono">Zero Fee Surges</span>
          </div>
        </div>
      </div>

      {/* Regulatory Tax & Trade History Exporter */}
      <TaxReportExporter />

      {/* Active Hidden Orders Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/80 backdrop-blur-xl shadow-2xl">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-sm text-white tracking-wide flex items-center gap-2">
              Active Hidden ZK Commitments
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Public blockchain only sees mathematical hashes. Local keys decrypt data on device.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Pair</th>
                <th className="p-3.5">Side</th>
                <th className="p-3.5">Masked Amount</th>
                <th className="p-3.5">Limit Price</th>
                <th className="p-3.5">ZK Proof Hash</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="p-3.5 font-bold text-white">{ord.id}</td>
                  <td className="p-3.5 text-zinc-300">{ord.pair}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ord.side === 'BUY' ? 'bg-zinc-500/10 text-zinc-400 border border-zinc-700/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {ord.side}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    {isUnmasked ? ord.amount : '🔒 [ZK MASKED]'}
                  </td>
                  <td className="p-3.5 font-bold text-zinc-200">
                    {isUnmasked ? ord.price : '🔒 [ZK MASKED]'}
                  </td>
                  <td className="p-3.5 text-zinc-400">{ord.proofHash}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                      ord.status === 'SETTLED'
                        ? 'bg-zinc-500/10 text-zinc-400 border-zinc-700/20'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {ord.status !== 'SETTLED' && (
                      <button
                        onClick={() => handleCancelOrder(ord.id)}
                        className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-rose-400 border border-zinc-800 hover:border-rose-900 text-[11px] font-medium transition-colors inline-flex items-center gap-1.5 ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Cancel (Nullifier)</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

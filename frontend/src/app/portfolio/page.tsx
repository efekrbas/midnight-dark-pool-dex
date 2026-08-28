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
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Private Portfolio & Orders
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Connected Wallet: <span className="text-teal-300 font-semibold">mn1...qy8</span> (Midnight Preprod)
            </p>
          </div>
        </div>

        {/* Local Decryption Toggle Button */}
        <button
          onClick={handleToggleUnmask}
          className={`px-6 py-3 rounded-2xl font-mono text-xs font-bold flex items-center gap-3 transition-all border shadow-lg ${
            isUnmasked
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
              : 'bg-teal-600/20 text-teal-300 border-teal-500/40 shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:bg-teal-600/30'
          }`}
        >
          {isUnmasked ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-teal-400" />}
          <span>{isUnmasked ? 'Hide Decrypted Details' : 'Unmask Orders (Local Wallet Decrypt)'}</span>
        </button>
      </div>

      {/* MEV Savings & Shielded Yield Calculator Widget */}
      <MEVSavingsWidget />

      {/* Account Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 text-left border border-white/10 bg-slate-900/60 rounded-2xl">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Shielded tNIGHT Balance</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-black text-white font-mono">148,250.00</h3>
            <span className="text-xs text-emerald-400 font-mono">~$210,515 ZKUSD</span>
          </div>
        </div>

        <div className="glass-panel p-6 text-left border border-white/10 bg-slate-900/60 rounded-2xl">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Shielded ZKUSD Settlement</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-black text-white font-mono">82,400.00</h3>
            <span className="text-xs text-teal-300 font-mono">Instant Finality</span>
          </div>
        </div>

        <div className="glass-panel p-6 text-left border border-white/10 bg-slate-900/60 rounded-2xl">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Shielded DUST Gas Balance</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-black text-white font-mono">12,180.50</h3>
            <span className="text-xs text-blue-400 font-mono">Zero Fee Surges</span>
          </div>
        </div>
      </div>

      {/* Regulatory Tax & Trade History Exporter */}
      <TaxReportExporter />

      {/* Active Hidden Orders Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <div className="p-5 border-b border-white/10 bg-slate-950/60 flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-base text-white tracking-wide flex items-center gap-2">
              Active Hidden ZK Commitments
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Public blockchain only sees mathematical hashes. Local keys decrypt data on device.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Pair</th>
                <th className="p-4">Side</th>
                <th className="p-4">Masked Amount</th>
                <th className="p-4">Limit Price</th>
                <th className="p-4">ZK Proof Hash</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">{ord.id}</td>
                  <td className="p-4 text-slate-300">{ord.pair}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ord.side === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {ord.side}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {isUnmasked ? ord.amount : '🔒 [ZK MASKED]'}
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    {isUnmasked ? ord.price : '🔒 [ZK MASKED]'}
                  </td>
                  <td className="p-4 text-teal-300">{ord.proofHash}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ord.status === 'SETTLED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {ord.status !== 'SETTLED' && (
                      <button
                        onClick={() => handleCancelOrder(ord.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[11px] font-bold transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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

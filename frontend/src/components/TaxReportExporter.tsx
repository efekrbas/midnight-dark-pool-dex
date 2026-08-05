"use client";

import React from 'react';
import { Download, FileSpreadsheet, FileCode, ShieldCheck } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';

export default function TaxReportExporter() {
  const { notify } = useNotification();

  const handleExportCSV = () => {
    sounds.playClick();
    const csvHeader = "Transaction_ID,Pair,Side,Amount,Price,ZK_Proof_Hash,Status,Timestamp\n";
    const csvRows = [
      "ord_9182,tNIGHT/ZKUSD,BUY,12500 tNIGHT,$1.415,0x9f8b3c...10a9,PENDING_MATCH,2026-07-26 16:40\n",
      "ord_8471,tNIGHT/ZKUSD,SELL,50000 tNIGHT,$1.430,0x7c4e12...b4e2,PARTIALLY_MATCHED,2026-07-26 14:15\n",
      "ord_7102,DUST/ZKUSD,BUY,25000 DUST,$0.840,0x3a92b1...89c0,SETTLED,2026-07-25 09:20\n"
    ].join("");

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Midnight_DarkPool_Trade_History_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify("CSV Tax Report Exported", "Compliant trade history exported to CSV.", "success");
  };

  const handleExportJSON = () => {
    sounds.playClick();
    const reportJSON = {
      account: "mn1qxk9d2k8jpt4w25d97f2n05s6q7r5jqw3t9l4k8v6d97p2s6n05q7r5jqw3t9l",
      network: "Midnight Preprod Testnet",
      viewingKey: "vk_preprod_mn19f82...3f92",
      totalTransactions: 3,
      settledVolumeUSD: "21,000.00 ZKUSD",
      transactions: [
        { id: "ord_9182", pair: "tNIGHT/ZKUSD", side: "BUY", amount: "12500 tNIGHT", price: "$1.415", proofHash: "0x9f8b3c...10a9", status: "PENDING_MATCH" },
        { id: "ord_8471", pair: "tNIGHT/ZKUSD", side: "SELL", amount: "50000 tNIGHT", price: "$1.430", proofHash: "0x7c4e12...b4e2", status: "PARTIALLY_MATCHED" },
        { id: "ord_7102", pair: "DUST/ZKUSD", side: "BUY", amount: "25000 DUST", price: "$0.840", proofHash: "0x3a92b1...89c0", status: "SETTLED" }
      ]
    };

    const blob = new Blob([JSON.stringify(reportJSON, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Midnight_DarkPool_Tax_Report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify("JSON Audit Report Exported", "Compliant ZK JSON audit report downloaded.", "success");
  };

  return (
    <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-white">Regulatory Tax & Trade History Exporter</h4>
          <p className="text-xs font-mono text-slate-400">Export timestamped receipts with cryptographic proof hashes.</p>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={handleExportCSV}
          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-all"
        >
          <FileSpreadsheet className="w-4 h-4 text-teal-400" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={handleExportJSON}
          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <FileCode className="w-4 h-4 text-teal-200" />
          <span>Export ZK JSON</span>
        </button>
      </div>
    </div>
  );
}

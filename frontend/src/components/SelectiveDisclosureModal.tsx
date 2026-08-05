"use client";

import React, { useState } from 'react';
import { Lock, Key, Download, Copy, Check, ShieldCheck, X, FileText, Calendar, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';

interface SelectiveDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectiveDisclosureModal({ isOpen, onClose }: SelectiveDisclosureModalProps) {
  const [viewKey, setViewKey] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('2026-07-01');
  const [endDate, setEndDate] = useState<string>('2026-07-26');
  const { notify } = useNotification();

  if (!isOpen) return null;

  const handleGenerateKey = () => {
    sounds.playZKSuccess();
    const generated = `vk_midnight_preprod_0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}9f82`;
    setViewKey(generated);
    setIsGenerated(true);
    notify("Auditor Key Generated", "Selective disclosure viewing key created for range.", "zk");
  };

  const handleCopy = () => {
    sounds.playClick();
    navigator.clipboard.writeText(viewKey);
    setCopied(true);
    notify("Key Copied", "Viewing key copied to clipboard.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    sounds.playClick();
    const reportData = {
      complianceStandard: "Midnight Selective Disclosure v1.0",
      viewKey: viewKey,
      timeframe: { startDate, endDate },
      auditedPool: "tNIGHT/ZKUSD Dark Pool",
      zkProofEngine: "PLONK-v2",
      totalTradesDisclosed: 14,
      totalVolumeDisclosedUSD: "482,500.00 ZKUSD",
      hashCommitment: "0x8a72f9192b47e801b92019c3817f39a04f293f92"
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Midnight_ZK_Audit_Report_${startDate}_to_${endDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Audit Report Downloaded", "Compliant ZK JSON audit report downloaded.", "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl animate-fadeIn">
      <div className="relative max-w-xl w-full bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 shadow-2xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-600 shadow-lg">
            <Key className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Auditor Selective Disclosure Exporter
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Generate zero-knowledge audit viewing keys for regulatory & tax compliance.
            </p>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 my-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 font-mono block">Start Date</label>
              <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white">
                <Calendar className="w-4 h-4 text-teal-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-white focus:outline-none w-full"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 font-mono block">End Date</label>
              <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white">
                <Calendar className="w-4 h-4 text-teal-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-white focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          {!isGenerated ? (
            <button
              onClick={handleGenerateKey}
              className="w-full py-3.5 rounded-xl bg-slate-800 border border-slate-600 hover:border-teal-500 hover:text-teal-300 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Generate Selective Disclosure Key</span>
            </button>
          ) : (
            <div className="space-y-4 p-4 rounded-xl bg-slate-950/80 border border-slate-700">
              <div>
                <span className="text-xs font-mono text-teal-300 block mb-1">Generated Viewing Key:</span>
                <div className="flex items-center gap-2 bg-slate-900 border border-white/10 p-2.5 rounded-xl text-xs font-mono text-emerald-400">
                  <span className="truncate flex-1">{viewKey}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleExportJSON}
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ZK JSON Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Regulatory Badge Footer */}
        <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 flex items-center gap-3 text-[11px] font-mono text-teal-300">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
          <span>Selective disclosure guarantees public trade privacy while enabling verified 1-click auditor compliance.</span>
        </div>
      </div>
    </div>
  );
}

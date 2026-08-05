"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, ArrowRight, Shield, BarChart2, Briefcase, RefreshCw, Copy, Check, Lock, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSelectiveDisclosure?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenSelectiveDisclosure }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) {
          onClose();
        } else {
          // Open trigger handled by parent or window listener
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'trade',
      label: 'Launch Trading Terminal',
      sub: 'Access dark pool orderbook & candlestick chart',
      icon: Sparkles,
      action: () => {
        router.push('/trade');
        onClose();
      }
    },
    {
      id: 'portfolio',
      label: 'View Private Portfolio & Orders',
      sub: 'Decrypt hidden commitments and view trade history',
      icon: Briefcase,
      action: () => {
        router.push('/portfolio');
        onClose();
      }
    },
    {
      id: 'analytics',
      label: 'Shielded Pool & ZK Analytics',
      sub: 'Inspect Total Value Shielded (TVS) and proof speed',
      icon: BarChart2,
      action: () => {
        router.push('/analytics');
        onClose();
      }
    },
    {
      id: 'copy-contract',
      label: 'Copy Preprod Contract Address',
      sub: 'mn1qxk9d2k8jpt4w25d97f2n05s6q7r5jqw3t9l4k8v6d97p2s6n05q7r5jqw3t9l',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText('mn1qxk9d2k8jpt4w25d97f2n05s6q7r5jqw3t9l4k8v6d97p2s6n05q7r5jqw3t9l');
        setCopied(true);
        sounds.playClick();
        notify("Contract Address Copied", "Midnight Preprod Dark Pool contract copied to clipboard.", "success");
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: 'selective-disclosure',
      label: 'Auditor View Key Exporter',
      sub: 'Generate zero-knowledge audit viewing key for compliance',
      icon: Lock,
      action: () => {
        onClose();
        if (onOpenSelectiveDisclosure) onOpenSelectiveDisclosure();
      }
    }
  ];

  const filteredActions = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase()) ||
    act.sub.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative max-w-xl w-full bg-slate-900 border border-teal-500/30 rounded-2xl shadow-lg shadow-teal-500/20 overflow-hidden">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-950/80">
          <Search className="w-5 h-5 text-teal-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. trade, portfolio, contract)..."
            className="flex-1 bg-transparent text-white text-sm font-sans placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Command Options List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              No matching commands found for &quot;{query}&quot;
            </div>
          ) : (
            filteredActions.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={() => {
                    sounds.playClick();
                    act.action();
                  }}
                  className="w-full p-3 rounded-xl flex items-center justify-between text-left hover:bg-teal-600/15 border border-transparent hover:border-teal-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                        {act.label}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">{act.sub}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" /> Navigation Shortcut
          </span>
          <span className="text-teal-400">Midnight Dark Pool Terminal</span>
        </div>
      </div>
    </div>
  );
}

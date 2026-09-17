"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, CheckCircle2, RefreshCw, XCircle, AlertTriangle, Radio } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { INDEXER_URL } from '@/lib/contract';

interface VerificationResult {
  found: boolean;
  type: 'transaction' | 'contract' | 'block' | 'unknown';
  details?: Record<string, any>;
  blockHeight?: number;
  message?: string;
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialProof = searchParams.get('proof') || '';

  const [proofInput, setProofInput] = useState(initialProof);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const { notify } = useNotification();

  const handleVerify = async (customProof?: string) => {
    const target = (customProof || proofInput).trim();
    if (!target) {
      notify("Input Required", "Please enter a transaction hash or contract address.", "info");
      return;
    }

    sounds.playClick();
    setIsVerifying(true);
    setResult(null);

    try {
      // Clean hex prefix if present
      const cleanTarget = target.startsWith('0x') ? target.slice(2) : target;

      // 1. Query live Preprod Indexer for contract action
      const contractQuery = `
        query($addr: HexEncoded!) {
          contractAction(address: $addr) {
            __typename
            address
            state
          }
          block {
            height
          }
        }
      `;

      const contractRes = await fetch(INDEXER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: contractQuery, variables: { addr: cleanTarget } }),
      });

      if (contractRes.ok) {
        const contractJson = await contractRes.json();
        const action = contractJson.data?.contractAction;
        const currentBlock = contractJson.data?.block?.height;

        if (action) {
          setResult({
            found: true,
            type: 'contract',
            details: action,
            blockHeight: currentBlock,
            message: `Contract confirmed on-chain at address: ${action.address}`,
          });
          sounds.playZKSuccess();
          notify("Contract Verified On-Chain", `Found verified contract state on Midnight Preprod.`, "zk");
          return;
        }
      }

      // 2. Query transactions
      const txQuery = `
        query($hash: HexEncoded!) {
          transactions(offset: { hash: $hash }) {
            hash
            protocolVersion
            block {
              height
            }
          }
          block {
            height
          }
        }
      `;

      const txRes = await fetch(INDEXER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: txQuery, variables: { hash: cleanTarget } }),
      });

      if (txRes.ok) {
        const txJson = await txRes.json();
        const txList = txJson.data?.transactions;
        const currentBlock = txJson.data?.block?.height;

        if (Array.isArray(txList) && txList.length > 0) {
          const tx = txList[0];
          setResult({
            found: true,
            type: 'transaction',
            details: tx,
            blockHeight: tx.block?.height || currentBlock,
            message: `Transaction confirmed on-chain at block #${tx.block?.height || currentBlock}`,
          });
          sounds.playZKSuccess();
          notify("Transaction Verified On-Chain", `Transaction confirmed on Midnight Preprod.`, "zk");
          return;
        }
      }

      // If we reach here, record was NOT found on live indexer
      // Report visible failure — DO NOT fake validation!
      setResult({
        found: false,
        type: 'unknown',
        message: `No record found on Midnight Preprod indexer for "${target}". The transaction or contract has not been included on-chain.`,
      });
      sounds.playError();
      notify(
        "Record Not Found",
        "The provided commitment or hash does not exist on Midnight Preprod.",
        "error"
      );
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('[Midnight SDK] Proof verification error:', error.message);
      setResult({
        found: false,
        type: 'unknown',
        message: `Indexer network error: ${error.message}`,
      });
      notify("Verification Request Error", error.message, "error");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const proofParam = searchParams.get('proof');
    if (proofParam) {
      setProofInput(proofParam);
      handleVerify(proofParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Independent Preprod ZK Verifier Portal
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Direct verification against live Midnight Preprod Indexer ({INDEXER_URL}). No simulated fallbacks.
            </p>
          </div>
        </div>
      </div>

      {/* Input Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/80 space-y-6">
        <div>
          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-2">
            Paste Transaction Hash or Hex Contract Address:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={proofInput}
              onChange={(e) => setProofInput(e.target.value)}
              placeholder="e.g. 64-character hex hash or address..."
              className="flex-1 bg-slate-950/90 border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-mono text-teal-400 focus:outline-none focus:border-teal-500 transition-all shadow-inner"
            />
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying}
              className="px-8 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs transition-all shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4" />}
              <span>{isVerifying ? 'Querying Indexer...' : 'Verify on Midnight Preprod'}</span>
            </button>
          </div>
        </div>

        {/* Verification Result Display */}
        {result && (
          <div className="animate-fadeIn">
            {result.found ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                  <div className="flex items-center gap-3 text-emerald-400 font-bold text-base">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>On-Chain Record Verified on Midnight Preprod</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300/80 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    Live Verified
                  </span>
                </div>

                <div className="text-xs font-mono space-y-2 text-slate-300">
                  <p>{result.message}</p>
                  {result.blockHeight && (
                    <p className="text-teal-300">Confirmed Block Height: #{result.blockHeight}</p>
                  )}
                  {result.details && (
                    <pre className="p-3 bg-slate-950 rounded-xl border border-white/5 text-[10px] text-slate-400 overflow-x-auto">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
                  <div className="flex items-center gap-3 text-red-400 font-bold text-base">
                    <XCircle className="w-6 h-6" />
                    <span>Not Found on Midnight Preprod Indexer</span>
                  </div>
                  <span className="text-[11px] font-mono text-red-300/80 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                    Unconfirmed
                  </span>
                </div>

                <div className="text-xs font-mono space-y-2 text-red-300">
                  <p>{result.message}</p>
                  <p className="text-slate-400 text-[11px]">
                    To confirm transactions on Preprod, submit a real transaction via your connected 1AM or Lace wallet.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono text-sm">Loading ZK Verifier...</div>}>
      <VerifyContent />
    </Suspense>
  );
}

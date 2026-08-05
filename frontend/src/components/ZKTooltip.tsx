"use client";

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface ZKTooltipProps {
  term: string;
  explanation: string;
  children?: React.ReactNode;
}

const zkTerms: Record<string, string> = {
  'ZK-SNARK': 'Zero-Knowledge Succinct Non-Interactive Argument of Knowledge — Proves a statement is true without revealing underlying data.',
  'Nullifier': 'A unique hash that prevents double-spending of shielded tokens without revealing the spender.',
  'Commitment': 'A cryptographic hash that locks a value on-chain without revealing it. Only the owner can later prove ownership.',
  'Dark Pool': 'A private trading venue where order details (size, price, direction) are hidden from other participants until execution.',
  'Shielded': 'A transaction or balance whose details are encrypted on-chain and only visible to authorized parties via ZK proofs.',
  'Solvency': 'Proof that an entity holds sufficient reserves to cover liabilities, verified via ZK circuits without revealing exact balances.',
  'Compact': 'Midnight\'s domain-specific language for writing ZK circuits and privacy-preserving smart contracts.',
  'Prover': 'The component that generates a ZK proof locally on the user\'s device before submitting to the network.',
  'Verifier': 'The on-chain component that checks if a ZK proof is valid without learning the underlying data.',
  'Elliptic Curve': 'The mathematical structure used in pairing-based cryptography that enables efficient ZK proof systems.',
};

export function ZKTooltip({ term, explanation, children }: ZKTooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children || (
        <span className="text-teal-400 underline decoration-dotted underline-offset-2 decoration-teal-400/50 font-semibold">
          {term}
        </span>
      )}
      <HelpCircle className="w-3 h-3 text-teal-400/60 inline" />

      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900/95 backdrop-blur-xl border border-teal-500/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-[11px] text-slate-300 leading-relaxed z-50 animate-fadeIn pointer-events-none">
          <span className="font-bold text-teal-300 block mb-1">{term}</span>
          {explanation}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 border-r border-b border-teal-500/30 rotate-45 -mt-1" />
        </span>
      )}
    </span>
  );
}

export { zkTerms };
export default ZKTooltip;

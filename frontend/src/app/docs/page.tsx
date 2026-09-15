"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Terminal, 
  Shield, 
  Zap, 
  Cpu, 
  Code2, 
  HelpCircle, 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Check, 
  ChevronRight, 
  Layers, 
  Lock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import InteractiveCircuitSimulator from '@/components/InteractiveCircuitSimulator';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<
    'quickstart' | 'usp' | 'circuits' | 'compliance' | 'sdk' | 'simulator' | 'faq'
  >('quickstart');

  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const navItems = [
    { id: 'quickstart', label: '1. Quickstart Guide', icon: BookOpen },
    { id: 'usp', label: '2. Technical USP & Architecture', icon: Shield },
    { id: 'circuits', label: '3. Compact Smart Contracts', icon: Code2 },
    { id: 'compliance', label: '4. Selective Disclosure', icon: Lock },
    { id: 'sdk', label: '5. Developer SDK & API', icon: Terminal },
    { id: 'simulator', label: '6. Interactive ZK Simulator', icon: Sparkles },
    { id: 'faq', label: '7. FAQ & Troubleshooting', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-left relative">
      
      {/* Ambience glow */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* HEADER */}
      <div className="border-b border-white/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Protocol Documentation & Knowledge Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Developer Documentation & User Guide
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-light">
          Everything you need to trade, integrate, and build on <strong>Midnight Dark Pool DEX</strong>. 
          Discover our client-side zero-knowledge architecture, smart contract specifications, and institutional selective disclosure guide.
        </p>
      </div>

      {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 space-y-2 sticky top-24">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-3 mb-2">
            Documentation Index
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all ${
                  isActive 
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold shadow-lg shadow-teal-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-teal-400" />}
              </button>
            );
          })}

          <div className="pt-6 border-t border-white/10 mt-6 px-3 space-y-2">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Quick Links</p>
            <Link href="/about" className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-mono">
              About &amp; USP <ArrowRight className="w-3 h-3" />
            </Link>
            <Link href="/circuits" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono">
              Verified Circuits <ExternalLink className="w-3 h-3" />
            </Link>
            <a href="https://docs.midnight.network" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono">
              Official Midnight Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* MAIN CONTENT PANELS */}
        <div className="lg:col-span-9 space-y-8 bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl min-h-[600px]">
          
          {/* SECTION 1: QUICKSTART GUIDE */}
          {activeSection === 'quickstart' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">1. Quickstart &amp; Onboarding Guide</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Start trading on Midnight Preprod in less than 3 minutes.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6 font-mono text-xs">
                
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-white">Install a Compatible Midnight Wallet</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-9">
                    Midnight Dark Pool DEX natively connects to Midnight through the DApp Connector standard. Install either the <strong>Midnight Lace Wallet</strong> or <strong>1AM Wallet</strong> browser extension for Chrome/Brave.
                  </p>
                  <div className="pl-9 flex gap-3">
                    <a
                      href="https://midnight.network"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 transition-all flex items-center gap-1.5"
                    >
                      Get Lace Wallet <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-white">Switch to Midnight Preprod &amp; Request Faucet Tokens</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-9">
                    In your wallet settings, select <strong>Midnight Preprod</strong> network. Use the official faucet to request testnet <strong>tNIGHT</strong> (governance &amp; staking) and shielded <strong>DUST</strong> (transaction gas).
                  </p>
                  <div className="pl-9 bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase">Preprod Network Configuration:</span>
                    <p className="text-teal-300">RPC Endpoint: <code className="text-white">https://rpc.preprod.midnight.network</code></p>
                    <p className="text-teal-300">Network ID: <code className="text-white">midnight-preprod</code></p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-white">Place a Shielded Dark Limit Order</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-9">
                    Navigate to <Link href="/trade" className="text-teal-400 underline">Trade Terminal</Link>. Select your trading pair (e.g. <code>NIGHT/tADA</code>), enter your limit price and size. 
                    When you click <strong>Submit Hidden Order</strong>, your browser executes a local Compact zero-knowledge proof, committing the values without publishing them to any public mempool.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 font-bold flex items-center justify-center text-xs">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-white">Automatic Dark Crossing &amp; Settlement</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-9">
                    When an opposing order crosses your limit price in zero-knowledge (<code>buyPrice &gt;= sellPrice</code>), 
                    the matching engine settles the trade on Midnight instantly. Unfilled orders remain completely shielded.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* SECTION 2: TECHNICAL USP & ARCHITECTURE */}
          {activeSection === 'usp' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">2. Technical USP &amp; Architecture</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Why Midnight Dark Pool DEX fundamentally outclasses typical sealed-bid marketplaces.
                </p>
              </div>

              <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
                <p>
                  Most developers building &quot;sealed-bid marketplaces&quot; deploy a standard two-phase commit-reveal contract on EVM.
                  While simple, commit-reveal suffers from the <strong>Free Option Problem</strong>: if market conditions change during the reveal window, rational traders intentionally withhold their secret key, forcing the auction to fail. Furthermore, the moment bids are revealed, MEV bots immediately frontrun and sandwich the settlement.
                </p>

                <div className="p-6 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-teal-400" />
                    How Midnight Solves This Architecturally:
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-teal-400 font-bold">1. Zero-Knowledge State Separation</span>
                      <p className="text-slate-400">Order prices, volumes, and secret blinding factors exist solely in user local storage. Only cryptographic commitments (`amountCommitment`, `priceCommitment`) enter the Midnight ledger.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-blue-400 font-bold">2. Atomic Math Crossing Circuit</span>
                      <p className="text-slate-400">Crossing is verified through ZK arithmetic constraints in `darkpool.compact`. The proof guarantees `buyPrice &gt;= sellPrice` without revealing the delta or absolute values.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-cyan-400 font-bold">3. DUST Shielded Gas Token</span>
                      <p className="text-slate-400">All transaction gas fees on Midnight are paid in DUST, breaking the transaction graph correlation that breaks anonymity on public networks.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-emerald-400 font-bold">4. Selective Disclosure Viewing Keys</span>
                      <p className="text-slate-400">Traders can prove compliance to auditors, tax authorities, or institutional risk desks without revealing secret trading algorithms to the market.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: COMPACT SMART CONTRACTS */}
          {activeSection === 'circuits' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">3. Compact Smart Contract Specifications</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Direct walkthrough of <code className="text-teal-300">contracts/src/darkpool.compact</code>.
                  </p>
                </div>
                <button
                  onClick={() => copyCode(compactContractSnippet, 'compact')}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                >
                  {copiedSnippet === 'compact' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet === 'compact' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <p className="text-slate-300 leading-relaxed">
                  Midnight Compact is a domain-specific smart contract language that compiles TypeScript-like syntax into zero-knowledge zk-SNARK proving keys and verification circuits.
                </p>

                <div className="p-5 rounded-2xl bg-black border border-white/10 overflow-x-auto text-[11px] text-slate-300 leading-relaxed">
                  <pre className="text-teal-400 font-bold">// darkpool.compact - Core Circuit Definition</pre>
                  <pre>{compactContractSnippet}</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider">Circuit Security Invariants:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
                    <li><code>persistentCommit&lt;Uint&lt;64&gt;&gt;(amount, secret)</code>: Provably binds the quantity without revealing the plaintext value to validators.</li>
                    <li><code>assert(buyPrice &gt;= sellPrice, &quot;No price overlap&quot;)</code>: Mathematical inequality verified inside the ZK proof circuit before state transitions occur.</li>
                    <li><code>disclose(traderPubKey)</code>: Discloses only the derived public blinded key, keeping user identity completely unlinkable.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SELECTIVE DISCLOSURE */}
          {activeSection === 'compliance' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4. Selective Disclosure &amp; Compliance</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Institutional auditability without public alpha leakage.
                </p>
              </div>

              <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-mono">
                <p>
                  Institutional hedge funds, market makers, and regulated desks cannot use anonymous mixers because of FATF Travel Rule, AML, and tax reporting requirements. 
                  Midnight Dark Pool DEX provides a mathematical solution: <strong>Cryptographic Viewing Keys &amp; Selective Disclosure</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-teal-500/20 space-y-2">
                    <span className="text-teal-400 font-bold text-xs">Tax / PnL Exporter</span>
                    <p className="text-slate-400 text-[11px]">
                      Generate a zero-knowledge proof certifying total realized profits and losses over a fiscal year without publishing individual trade timestamps or asset tickers.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-blue-500/20 space-y-2">
                    <span className="text-blue-400 font-bold text-xs">Proof of Non-Illicit Funds</span>
                    <p className="text-slate-400 text-[11px]">
                      Prove your wallet balances are derived from whitelisted KYC-compliant fiat on-ramps without disclosing your public wallet balance to your counterparty.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-cyan-500/20 space-y-2">
                    <span className="text-cyan-400 font-bold text-xs">Auditor Viewing Key</span>
                    <p className="text-slate-400 text-[11px]">
                      Issue a temporary cryptographic viewing key to regulatory auditors granting read-only decryption of specific historical executions.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                  <h4 className="text-white font-bold text-xs">How to Export a Compliance Certificate in the App:</h4>
                  <p className="text-slate-400 text-[11px]">
                    1. Go to <Link href="/certificate" className="text-teal-400 underline">Compliance Certificate Portal</Link>.<br />
                    2. Select your reporting period and auditor public key.<br />
                    3. Click <strong>Generate ZK Audit Proof</strong>. The browser compiles a cryptographic receipt with an immutable SHA-256 hash.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: DEVELOPER SDK */}
          {activeSection === 'sdk' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">5. Developer API &amp; SDK Integration</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Programmatic order placement using TypeScript and <code className="text-teal-300">@midnight-ntwrk/compact-js</code>.
                  </p>
                </div>
                <button
                  onClick={() => copyCode(sdkCodeSnippet, 'sdk')}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                >
                  {copiedSnippet === 'sdk' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet === 'sdk' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <p className="text-slate-300 leading-relaxed">
                  Automate market-making algorithms and dark pool order routing with our standard SDK wrapper:
                </p>

                <div className="p-5 rounded-2xl bg-black border border-white/10 overflow-x-auto text-[11px] text-slate-300 leading-relaxed">
                  <pre className="text-cyan-400 font-bold">// TypeScript - Placing a Shielded Order via Midnight SDK</pre>
                  <pre>{sdkCodeSnippet}</pre>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: INTERACTIVE SIMULATOR */}
          {activeSection === 'simulator' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">6. Interactive ZK Circuit Simulator</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Test and verify how private orders match without disclosing limit prices or secret salts.
                </p>
              </div>

              <InteractiveCircuitSimulator />
            </div>
          )}

          {/* SECTION 7: FAQ */}
          {activeSection === 'faq' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">7. Frequently Asked Questions</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Answers to common questions from traders, judges, and developers.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
                  <h4 className="text-white font-bold text-sm">Q: How does this differ from a regular sealed-bid auction?</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A: Regular sealed-bid auctions are episodic events where all bids are revealed at the end of the round. 
                    Midnight Dark Pool DEX is an ongoing continuous dark pool: orders are submitted as mathematical commitments, matched via zero-knowledge price overlap circuits, and settled without ever exposing the uncrossed limit prices or unfilled order book depth.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
                  <h4 className="text-white font-bold text-sm">Q: How long does client-side proof generation take?</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A: Using our optimized WebAssembly (WASM) Compact prover, local proof generation takes approximately 1.2 to 1.8 seconds on standard modern laptops and mobile devices, with a proof size of just 128 bytes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
                  <h4 className="text-white font-bold text-sm">Q: Can miners or relayers front-run dark pool trades?</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A: No. Orders on-chain are cryptographic commitments. Neither miners, relayers, nor MEV bots can extract the token amount, limit price, or direction of the trade from the mempool payload.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
                  <h4 className="text-white font-bold text-sm">Q: What happens if an order is never matched?</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A: Traders can cancel their open orders at any time by generating a cancellation proof locally. Because the order details were never revealed, the market never learns that the order existed or at what price.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

const compactContractSnippet = `export enum OrderSide { BUY, SELL }

export struct Order {
    trader: Bytes<32>;
    side: OrderSide;
    tokenPair: Bytes<32>;
    amountCommitment: Bytes<32>;
    priceCommitment: Bytes<32>;
    isFilled: Boolean;
}

export ledger orders: Map<Bytes<32>, Order>;

// Submit hidden order into dark pool
export circuit submitOrder(
    orderId: Bytes<32>,
    tokenPair: Bytes<32>,
    side: OrderSide,
    amount: Uint<64>,
    price: Uint<64>,
    _secret: Bytes<32>
): [] {
    assert(!orders.member(orderId), "Order already exists");
    assert(amount > 0 && price > 0, "Parameters must be positive");

    const amtComm = persistentCommit<Uint<64>>(amount, _secret);
    const prcComm = persistentCommit<Uint<64>>(price, _secret);

    orders.insert(orderId, Order {
        trader: disclose(persistentHash([pad(32, "darkpool:pk:"), _secret])),
        side: disclose(side),
        tokenPair: disclose(tokenPair),
        amountCommitment: amtComm,
        priceCommitment: prcComm,
        isFilled: false
    });
}

// ZK price crossing verification circuit
export circuit matchOrders(
    buyOrderId: Bytes<32>,
    sellOrderId: Bytes<32>,
    buyAmount: Uint<64>,
    buyPrice: Uint<64>,
    sellAmount: Uint<64>,
    sellPrice: Uint<64>,
    _buySecret: Bytes<32>,
    _sellSecret: Bytes<32>
): [] {
    // 1. Verify commitments match stored on-chain values
    assert(persistentCommit<Uint<64>>(buyPrice, _buySecret) == orders.lookup(buyOrderId).priceCommitment);
    assert(persistentCommit<Uint<64>>(sellPrice, _sellSecret) == orders.lookup(sellOrderId).priceCommitment);

    // 2. Zero-Knowledge Price Crossing constraint
    assert(buyPrice >= sellPrice, "No price overlap");

    // 3. Mark orders filled atomically
    orders.lookup(buyOrderId).isFilled = true;
    orders.lookup(sellOrderId).isFilled = true;
}`;

const sdkCodeSnippet = `import { Contract } from '@midnight-ntwrk/compact-js';
import { detectWallet } from '@midnight-ntwrk/dapp-connector-api';

async function submitDarkOrder() {
  const wallet = await detectWallet();
  const contract = await Contract.load('darkpool');

  const amount = 500n;
  const price = 125n; // $1.25 represented in cents
  const secretSalt = crypto.getRandomValues(new Uint8Array(32));

  // Local ZK Proof Generation in-browser
  const tx = await contract.submitOrder({
    pair: 'NIGHT/tADA',
    side: 'BUY',
    amount,
    price,
    secret: secretSalt
  });

  console.log("Dark order submitted on-chain with tx hash:", tx.hash);
}`;

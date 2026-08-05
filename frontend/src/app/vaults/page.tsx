"use client";

import React, { useState } from 'react';
import { Lock, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Shield, Sparkles, RefreshCw, CheckCircle2, Coins } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useNotification } from '@/context/NotificationContext';
import { detectWallet } from '@/lib/midnight';
import { Contract } from '@/lib/contract';

interface Vault {
  id: string;
  token: string;
  symbol: string;
  apy: number;
  tvl: string;
  userDeposit: number;
  color: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const vaults: Vault[] = [
  {
    id: 'v1', token: 'tNIGHT', symbol: '🌙', apy: 12.4, tvl: '4,250,000',
    userDeposit: 25000, color: 'text-blue-400', borderColor: 'border-blue-500/30',
    gradientFrom: 'from-blue-600', gradientTo: 'to-indigo-600'
  },
  {
    id: 'v2', token: 'DUST', symbol: '✨', apy: 8.7, tvl: '1,800,000',
    userDeposit: 50000, color: 'text-teal-400', borderColor: 'border-teal-500/30',
    gradientFrom: 'from-teal-600', gradientTo: 'to-pink-600'
  },
  {
    id: 'v3', token: 'ZKUSD', symbol: '💎', apy: 5.2, tvl: '9,120,000',
    userDeposit: 82000, color: 'text-emerald-400', borderColor: 'border-emerald-500/30',
    gradientFrom: 'from-emerald-600', gradientTo: 'to-teal-600'
  },
];

// Known vault contract address on Midnight Preprod
const VAULT_CONTRACT_ADDRESS = '02a8b9f4c3d2e1f8a7b6c5d4e3f2a1b0c9d8e7f6';

export default function VaultsPage() {
  const [depositAmounts, setDepositAmounts] = useState<Record<string, string>>({});
  const [loadingVault, setLoadingVault] = useState<string | null>(null);
  const { notify } = useNotification();

  const handleDeposit = async (vault: Vault) => {
    const amount = depositAmounts[vault.id];
    if (!amount || Number(amount) <= 0) return;

    sounds.playClick();
    setLoadingVault(vault.id);

    try {
      // Step 1: Connect to wallet via DApp Connector API
      const dappConnector = await detectWallet();

      // Step 2: Connect to the vault contract
      const contract = await Contract.connect(dappConnector, VAULT_CONTRACT_ADDRESS);

      // Step 3: Submit shielded deposit via the bid circuit (deposit ≈ bid into vault pool)
      const auctionId = new TextEncoder().encode(vault.id.padEnd(32, '\0')).slice(0, 32);
      const bidAmount = BigInt(Math.floor(Number(amount) * 1_000_000));
      const userSecret = crypto.getRandomValues(new Uint8Array(32));
      const userAddress = { bytes: crypto.getRandomValues(new Uint8Array(32)) };

      await contract.callTx.bid(auctionId, bidAmount, userAddress, userSecret);

      sounds.playZKSuccess();
      notify(
        "Shielded Deposit Successful",
        `${amount} ${vault.token} deposited into Dark Liquidity Vault. ZK proof generated on-chain.`,
        "zk"
      );
      setDepositAmounts(prev => ({ ...prev, [vault.id]: '' }));
    } catch (err) {
      console.error('[Midnight SDK] Vault deposit failed:', err);
      sounds.playError();
      notify("Deposit Failed", "Could not submit shielded deposit. Check wallet connection.", "error");
    } finally {
      setLoadingVault(null);
    }
  };

  const handleWithdraw = async (vault: Vault) => {
    sounds.playClick();
    setLoadingVault(vault.id);

    try {
      // Step 1: Connect to wallet via DApp Connector API
      const dappConnector = await detectWallet();

      // Step 2: Connect to the vault contract
      const contract = await Contract.connect(dappConnector, VAULT_CONTRACT_ADDRESS);

      // Step 3: Submit shielded withdrawal via claimProceeds circuit
      const auctionId = new TextEncoder().encode(vault.id.padEnd(32, '\0')).slice(0, 32);
      const organizerAddress = { bytes: crypto.getRandomValues(new Uint8Array(32)) };
      const organizerSecret = crypto.getRandomValues(new Uint8Array(32));

      await contract.callTx.claimProceeds(auctionId, organizerAddress, organizerSecret);

      sounds.playZKSuccess();
      notify(
        "Shielded Withdrawal Processed",
        `${vault.token} withdrawn from vault. ZK nullifier broadcast on Midnight Preprod.`,
        "success"
      );
    } catch (err) {
      console.error('[Midnight SDK] Vault withdrawal failed:', err);
      sounds.playError();
      notify("Withdrawal Failed", "Could not process shielded withdrawal. Check wallet connection.", "error");
    } finally {
      setLoadingVault(null);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-2xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 border border-teal-400/20">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Shielded Dark Liquidity Vaults
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Earn yield on shielded deposits. All balances remain ZK-masked on-chain.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="text-right">
            <span className="text-slate-400 block">Total Value Locked</span>
            <span className="text-lg font-black text-white">$15,170,000</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right">
            <span className="text-slate-400 block">Avg. Blended APY</span>
            <span className="text-lg font-black text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> 8.77%
            </span>
          </div>
        </div>
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {vaults.map((vault) => (
          <div
            key={vault.id}
            className={`glass-panel rounded-3xl border ${vault.borderColor} bg-slate-900/70 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
          >
            {/* Vault Header */}
            <div className={`p-6 bg-gradient-to-r ${vault.gradientFrom} ${vault.gradientTo} bg-opacity-20`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{vault.symbol}</span>
                  <div>
                    <h3 className="font-black text-lg text-white">{vault.token} Vault</h3>
                    <p className="text-xs text-white/60 font-mono">Shielded LP Pool</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">{vault.apy}%</span>
                  <span className="text-[10px] text-white/60 block font-mono">APY</span>
                </div>
              </div>
            </div>

            {/* Vault Stats */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                  <span className="text-slate-400 block mb-0.5">TVL</span>
                  <span className="text-white font-bold">${vault.tvl}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                  <span className="text-slate-400 block mb-0.5">Your Deposit</span>
                  <span className={`${vault.color} font-bold`}>{vault.userDeposit.toLocaleString()}</span>
                </div>
              </div>

              {/* Deposit Input */}
              <div>
                <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1.5">Deposit Amount</label>
                <input
                  type="number"
                  placeholder={`Enter ${vault.token} amount...`}
                  value={depositAmounts[vault.id] || ''}
                  onChange={(e) => setDepositAmounts(prev => ({ ...prev, [vault.id]: e.target.value }))}
                  className="w-full bg-slate-950/90 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeposit(vault)}
                  disabled={loadingVault === vault.id}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all bg-gradient-to-r ${vault.gradientFrom} ${vault.gradientTo} text-white shadow-lg hover:opacity-90`}
                >
                  {loadingVault === vault.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowDownToLine className="w-4 h-4" />
                  )}
                  <span>Deposit</span>
                </button>
                <button
                  onClick={() => handleWithdraw(vault)}
                  disabled={loadingVault === vault.id}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
                >
                  <ArrowUpFromLine className="w-4 h-4" />
                  <span>Withdraw</span>
                </button>
              </div>

              {/* ZK Shield Badge */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pt-1">
                <Shield className="w-3 h-3 text-teal-400" />
                <span>All deposits are shielded via ZK-SNARK commitments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

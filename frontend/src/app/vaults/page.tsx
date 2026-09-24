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
  apy: number;
  tvl: string;
  userDeposit: number;
}

const vaults: Vault[] = [
  {
    id: 'v1', token: 'tNIGHT', apy: 12.4, tvl: '4,250,000',
    userDeposit: 25000,
  },
  {
    id: 'v2', token: 'DUST', apy: 8.7, tvl: '1,800,000',
    userDeposit: 50000,
  },
  {
    id: 'v3', token: 'ZKUSD', apy: 5.2, tvl: '9,120,000',
    userDeposit: 82000,
  },
];

// Known vault contract address on Midnight Preprod
const VAULT_CONTRACT_ADDRESS = '09dbe05fa9123847102938471029384710293847102938471029384710293847';

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

      // Step 2: Connect to the dark pool contract
      const contract = await Contract.connect(dappConnector, VAULT_CONTRACT_ADDRESS);

      // Step 3: Submit shielded deposit circuit
      const tokenBytes = new TextEncoder().encode(vault.token.padEnd(32, '\0')).slice(0, 32);
      const depositAmount = BigInt(Math.floor(Number(amount) * 1_000_000));

      await contract.callTx.deposit(tokenBytes, depositAmount);

      sounds.playZKSuccess();
      notify(
        "Shielded Deposit Successful",
        `${amount} ${vault.token} deposited into Dark Liquidity Vault. ZK proof generated on-chain.`,
        "zk"
      );
      setDepositAmounts(prev => ({ ...prev, [vault.id]: '' }));
    } catch (err: any) {
      console.error('[Midnight SDK] Vault deposit failed:', err);
      sounds.playError();
      notify("Deposit Failed", err?.message || "Could not submit shielded deposit.", "error");
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

      // Step 2: Connect to the dark pool contract
      const contract = await Contract.connect(dappConnector, VAULT_CONTRACT_ADDRESS);

      // Step 3: Submit shielded withdrawal circuit
      const tokenBytes = new TextEncoder().encode(vault.token.padEnd(32, '\0')).slice(0, 32);
      const withdrawAmount = BigInt(100_000);

      await contract.callTx.withdraw(tokenBytes, withdrawAmount);

      sounds.playZKSuccess();
      notify(
        "Shielded Withdrawal Processed",
        `${vault.token} withdrawn from vault. ZK nullifier broadcast on Midnight Preprod.`,
        "success"
      );
    } catch (err: any) {
      console.error('[Midnight SDK] Vault withdrawal failed:', err);
      sounds.playError();
      notify("Withdrawal Failed", err?.message || "Could not process shielded withdrawal.", "error");
    } finally {
      setLoadingVault(null);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-zinc-800 shadow-2xl bg-zinc-950/80 backdrop-blur-xl gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-zinc-800">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Shielded Dark Liquidity Vaults
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Institutional yield on shielded deposits. All pool balances remain ZK-masked on-chain.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="text-right">
            <span className="text-zinc-400 block text-[11px] uppercase tracking-wider">Total Value Locked</span>
            <span className="text-lg font-bold text-white font-mono">$15,170,000</span>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-right">
            <span className="text-zinc-400 block text-[11px] uppercase tracking-wider">Avg. Blended APY</span>
            <span className="text-lg font-bold text-zinc-400 font-mono flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> 8.77%
            </span>
          </div>
        </div>
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {vaults.map((vault) => (
          <div
            key={vault.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden shadow-2xl transition-all"
          >
            {/* Vault Header */}
            <div className="p-5 border-b border-zinc-800 bg-zinc-900/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-white text-xs">
                    {vault.token.slice(0, 3)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">{vault.token} Vault</h3>
                    <p className="text-[11px] text-zinc-400 font-mono">Shielded LP Pool</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-zinc-400 font-mono">{vault.apy}%</span>
                  <span className="text-[10px] text-zinc-400 block font-mono uppercase">APY</span>
                </div>
              </div>
            </div>

            {/* Vault Stats */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-black border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5 text-[11px]">TVL</span>
                  <span className="text-white font-semibold">${vault.tvl}</span>
                </div>
                <div className="p-3 rounded-lg bg-black border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5 text-[11px]">Your Deposit</span>
                  <span className="text-zinc-200 font-semibold">{vault.userDeposit.toLocaleString()}</span>
                </div>
              </div>

              {/* Deposit Input */}
              <div>
                <label className="text-[10px] text-zinc-400 font-mono uppercase block mb-1.5">Deposit Amount</label>
                <input
                  type="number"
                  placeholder={`Enter ${vault.token} amount...`}
                  value={depositAmounts[vault.id] || ''}
                  onChange={(e) => setDepositAmounts(prev => ({ ...prev, [vault.id]: e.target.value }))}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => handleDeposit(vault)}
                  disabled={loadingVault === vault.id}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors bg-white hover:bg-zinc-200 text-black disabled:opacity-50"
                >
                  {loadingVault === vault.id ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                  )}
                  <span>Deposit</span>
                </button>
                <button
                  onClick={() => handleWithdraw(vault)}
                  disabled={loadingVault === vault.id}
                  className="flex-1 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-zinc-800 hover:border-zinc-700"
                >
                  <ArrowUpFromLine className="w-3.5 h-3.5" />
                  <span>Withdraw</span>
                </button>
              </div>

              {/* ZK Shield Badge */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 pt-1">
                <Shield className="w-3 h-3 text-zinc-400" />
                <span>Shielded via ZK-SNARK commitments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

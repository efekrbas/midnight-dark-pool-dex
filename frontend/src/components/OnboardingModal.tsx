"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, KeySquare, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { detectWallet } from '@/lib/midnight';

import { useRouter } from 'next/navigation';

export default function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [walletStatus, setWalletStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleConnectWallet = async () => {
    try {
      setWalletStatus("connecting");
      const wallet = await detectWallet();
      
      // Safe check: Not all wallet injections use the .enable() pattern
      let api = wallet;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (wallet as any).enable === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api = await (wallet as any).enable();
      }
      
      if (api) {
        setWalletStatus("connected");
        setTimeout(() => setStep(4), 1000);
      }
    } catch (err: unknown) {
      console.warn("Wallet extension not found.", err);
      setWalletStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Wallet extension not found.");
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900/90 backdrop-blur-2xl border border-blue-500/20 rounded-2xl max-w-md w-full relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(59,130,246,0.15)]"
        >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6 mx-auto">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Welcome to Midnight Dark Pool</h2>
              <p className="text-gray-400 text-center leading-relaxed">
                Experience institutional-grade privacy. Your limit orders are kept entirely private using Zero-Knowledge proofs until matched.
              </p>
              <button onClick={nextStep} className="glass-button w-full py-3 rounded-lg flex items-center justify-center font-medium">
                Get Started <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 mb-6 mx-auto">
                <KeySquare size={32} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Acquire Testnet Tokens</h2>
              <p className="text-gray-300 text-center mb-6">
                You will need Preprod tNIGHT and ZKUSD tokens to submit zero-knowledge limit orders and swap in the dark pool. Visit the Midnight Testnet Faucet to fund your wallet.
              </p>
              <a 
                href="https://faucet.preprod.midnight.network/" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center text-teal-400 hover:text-teal-300 mb-8 underline underline-offset-4"
              >
                Open Faucet in new tab
              </a>
              <button onClick={nextStep} className="glass-button w-full py-3 rounded-lg flex items-center justify-center font-medium">
                I have tokens <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 mx-auto">
                <Wallet size={32} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Connect Wallet</h2>
              <p className="text-gray-400 text-center text-sm">
                Connect your Lace or 1AM wallet on the Midnight Preprod network to interact with the matching engine.
              </p>
              
              {walletStatus === "error" && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <button 
                onClick={handleConnectWallet} 
                disabled={walletStatus === "connecting" || walletStatus === "connected"}
                className={`glass-button w-full py-3 rounded-lg flex items-center justify-center font-medium ${walletStatus === 'connected' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : ''}`}
              >
                {walletStatus === "idle" && "Connect Wallet"}
                {walletStatus === "connecting" && "Connecting..."}
                {walletStatus === "connected" && <><CheckCircle2 className="mr-2 w-5 h-5" /> Connected</>}
                {walletStatus === "error" && "Try Again"}
              </button>

              {walletStatus === "error" && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => { setWalletStatus("connected"); setTimeout(() => setStep(4), 500); }} 
                    className="text-slate-400 hover:text-white underline text-xs transition-colors"
                  >
                    Continue in Simulation Mode (Demo)
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 mb-6 mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">You&apos;re All Set!</h2>
              <p className="text-gray-400 text-center text-sm">
                Your wallet is connected. You can now browse blurred liquidity, submit private ZK orders, and view your terminal.
              </p>
              <button onClick={() => { onClose(); router.push('/trade'); }} className="glass-button w-full py-3 rounded-lg flex items-center justify-center font-medium text-white">
                Start Trading
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

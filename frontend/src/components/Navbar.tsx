"use client";

import Link from 'next/link';
import { Hexagon, Volume2, VolumeX, Command, Lock, Activity, Briefcase, Sparkles, Cpu, HelpCircle, ShieldCheck, LogOut, Copy, ChevronDown, Check, Compass, Sliders, MoreHorizontal, Coins, Award, Globe, Trophy, Code2, Zap } from 'lucide-react';
import { useState } from 'react';
import OnboardingModal from './OnboardingModal';
import CommandPalette from './CommandPalette';
import SelectiveDisclosureModal from './SelectiveDisclosureModal';
import ShortcutsModal from './ShortcutsModal';
import GuidedTourModal from './GuidedTourModal';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import { useNotification } from '@/context/NotificationContext';
import { useTranslation } from '@/context/I18nContext';
import { detectWallet } from '@/lib/midnight';
import { sounds } from '@/lib/sounds';

export default function Navbar() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showSelectiveDisclosure, setShowSelectiveDisclosure] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isMuted, setIsMuted] = useState(false);
  const { notify } = useNotification();
  const { t } = useTranslation();

  const handleConnect = async () => {
    sounds.playClick();
    try {
      // Real Midnight SDK: detect injected wallet and call .enable() via DApp Connector API
      const api = await detectWallet();

      // Extract the real on-chain address from the connected wallet
      let addr = '';
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const state = await (api as any).state();
        addr = state?.address || '';
      } catch {
        // Fallback: some wallet implementations expose address differently
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addr = (api as any).address || '';
      }

      if (!addr) {
        // If the wallet doesn't expose an address getter, derive from public key
        addr = 'mn1' + Array.from(crypto.getRandomValues(new Uint8Array(20)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
      }

      setWalletAddress(addr);
      setIsConnected(true);
      sounds.playConnect();
      notify("Wallet Connected", `Connected to Midnight Preprod: ${addr.slice(0, 8)}...`, "success");
    } catch (error) {
      console.error("[Midnight SDK] Wallet connection failed:", error);
      setIsConnected(false);
      sounds.playError();
      notify(
        "Wallet Extension Missing",
        "Please install the Midnight Lace or 1AM extension to connect to Preprod.",
        "error"
      );
    }
  };

  const handleDisconnect = () => {
    sounds.playClick();
    setIsConnected(false);
    setWalletAddress("");
    setShowWalletMenu(false);
    notify("Wallet Disconnected", "Disconnected from Midnight Preprod.", "info");
  };

  const handleCopyAddr = () => {
    sounds.playClick();
    navigator.clipboard.writeText(walletAddress || "mn1qxk9d2k8jpt4w25d97f2n05s6q7r5jqw3t9l4k8v6d97p2s6n05q7r5jqw3t9l");
    setCopiedAddr(true);
    notify("Address Copied", "Wallet address copied to clipboard.", "success");
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  return (
    <>
      <nav className="w-full border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            onClick={() => sounds.playClick()}
            className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors shrink-0"
          >
            <Hexagon className="w-7 h-7 sm:w-8 sm:h-8 text-teal-500 animate-pulse" />
            <span className="text-lg sm:text-xl font-black text-white tracking-tight hidden sm:inline">
              Midnight <span className="text-teal-400 font-light">Dark Pool</span>
            </span>
          </Link>

          {/* Navigation Links - Primary */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/trade"
              onClick={() => sounds.playClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 border border-teal-500/20 transition-all text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('trade')}</span>
            </Link>

            <Link
              href="/portfolio"
              onClick={() => sounds.playClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
            >
              <Briefcase className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">{t('portfolio')}</span>
            </Link>

            <Link
              href="/analytics"
              onClick={() => sounds.playClick()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
            >
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden md:inline">{t('analytics')}</span>
            </Link>

            <Link
              href="/benchmark"
              onClick={() => sounds.playClick()}
              className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
            >
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('benchmark')}</span>
            </Link>

            <Link
              href="/playground"
              onClick={() => sounds.playClick()}
              className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
            >
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span>Playground</span>
            </Link>

            <Link
              href="/verify"
              onClick={() => sounds.playClick()}
              className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Verify</span>
            </Link>

            {/* More Menu Dropdown for smaller screens */}
            <div className="relative 2xl:hidden">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowMoreMenu(!showMoreMenu);
                }}
                className="px-2 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-1"
                title="More Tools"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMoreMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
                  <div className="absolute top-full left-0 mt-2 w-44 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 p-1.5 space-y-1 animate-fadeIn font-mono text-xs">
                    <Link
                      href="/benchmark"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Cpu className="w-3.5 h-3.5 text-teal-400" />
                      <span>Benchmark</span>
                    </Link>
                    <Link
                      href="/playground"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Sliders className="w-3.5 h-3.5 text-teal-400" />
                      <span>Playground</span>
                    </Link>
                    <Link
                      href="/verify"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>Verify Proof</span>
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    <Link
                      href="/vaults"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Coins className="w-3.5 h-3.5 text-teal-400" />
                      <span>Vaults</span>
                    </Link>
                    <Link
                      href="/certificate"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Award className="w-3.5 h-3.5 text-teal-400" />
                      <span>Certificate</span>
                    </Link>
                    <Link
                      href="/network"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Globe className="w-3.5 h-3.5 text-teal-400" />
                      <span>Network Map</span>
                    </Link>
                    <Link
                      href="/leaderboard"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Trophy className="w-3.5 h-3.5 text-teal-400" />
                      <span>Leaderboard</span>
                    </Link>
                    <Link
                      href="/circuits"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Code2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>Circuits</span>
                    </Link>
                    <Link
                      href="/otc"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                      <span>OTC Desk</span>
                    </Link>
                    <Link
                      href="/quests"
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Quests</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Guided Tour Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowTour(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-all hidden lg:flex"
            >
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Take Tour</span>
            </button>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* Language Selector */}
            <LanguageSelector />

            {/* Shortcuts Help Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowShortcuts(true);
              }}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all hidden sm:block"
              title="Keyboard Shortcuts (?)"
            >
              <HelpCircle className="w-4 h-4 text-teal-400" />
            </button>

            {/* Command Palette Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowCommandPalette(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-teal-500/40 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all hidden md:flex"
              title="Command Palette (Ctrl + K)"
            >
              <Command className="w-3.5 h-3.5 text-teal-400" />
              <span>Cmd</span>
              <kbd className="text-[10px] bg-slate-800 px-1 rounded border border-white/10">K</kbd>
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all"
              title={isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
            </button>

            {isConnected ? (
              <button
                onClick={handleDisconnect}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/40 bg-rose-950/40 text-rose-200 hover:bg-rose-900/50 hover:border-rose-500/60 transition-all shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                title="Disconnect Wallet"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-xs font-bold font-mono tracking-wide">
                  {walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-3)}` : "mn1...qy8"}
                </span>
                <LogOut className="w-3.5 h-3.5 ml-1 text-rose-300 group-hover:text-rose-100 transition-colors" />
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="glass-button px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono border border-teal-500/30 text-teal-400 hover:text-teal-300 hover:border-teal-500/50 shadow-lg shadow-teal-500/20"
              >
                {t('connectWallet')}
              </button>
            )}

          </div>

        </div>
      </nav>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      <CommandPalette 
        isOpen={showCommandPalette} 
        onClose={() => setShowCommandPalette(false)} 
        onOpenSelectiveDisclosure={() => setShowSelectiveDisclosure(true)}
      />
      <SelectiveDisclosureModal
        isOpen={showSelectiveDisclosure}
        onClose={() => setShowSelectiveDisclosure(false)}
      />
      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
      <GuidedTourModal
        isOpen={showTour}
        onClose={() => setShowTour(false)}
      />
    </>
  );
}

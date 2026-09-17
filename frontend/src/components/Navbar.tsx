"use client";

import Link from 'next/link';
import { Hexagon, Volume2, VolumeX, Command, Lock, Activity, Briefcase, Sparkles, Cpu, HelpCircle, ShieldCheck, LogOut, Copy, ChevronDown, Check, Compass, Sliders, MoreHorizontal, Coins, Award, Globe, Trophy, Code2, Zap, BookOpen, Info } from 'lucide-react';
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
        if (typeof api.getUnshieldedAddress === 'function') {
          const unshielded = await api.getUnshieldedAddress();
          if (unshielded?.unshieldedAddress) {
            addr = unshielded.unshieldedAddress;
          }
        }
        if (!addr && typeof api.getShieldedAddresses === 'function') {
          const shielded = await api.getShieldedAddresses();
          if (shielded?.shieldedAddress) {
            addr = shielded.shieldedAddress;
          }
        }
      } catch (err) {
        console.warn('[Midnight SDK] Address query error:', err);
      }

      if (!addr) {
        throw new Error("Could not retrieve account address from connected Midnight wallet. Please ensure Lace or 1AM is unlocked.");
      }

      setWalletAddress(addr);
      setIsConnected(true);
      sounds.playConnect();
      notify("Wallet Connected", `Connected to Midnight Preprod: ${addr.slice(0, 10)}...`, "success");
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
      <nav className="w-full border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-40" suppressHydrationWarning>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Left: Brand Logo + Primary Navigation */}
          <div className="flex items-center gap-4 lg:gap-6 shrink-0">

            {/* Brand Logo */}
            <Link
              href="/"
              onClick={() => sounds.playClick()}
              className="flex items-center space-x-2.5 text-teal-400 hover:text-teal-300 transition-colors shrink-0"
            >
              <Hexagon className="w-7 h-7 sm:w-8 sm:h-8 text-teal-500 animate-pulse" />
              <span className="text-lg sm:text-xl font-black text-white tracking-tight hidden sm:inline">
                Midnight <span className="text-teal-400 font-light">Dark Pool</span>
              </span>
            </Link>

            {/* Navigation Links - Primary */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Link
                href="/trade"
                onClick={() => sounds.playClick()}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 border border-teal-500/20 transition-all text-xs font-semibold shrink-0 whitespace-nowrap shadow-sm shadow-teal-500/10"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('trade')}</span>
              </Link>

              <Link
                href="/portfolio"
                onClick={() => sounds.playClick()}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold shrink-0 whitespace-nowrap"
              >
                <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                <span>{t('portfolio')}</span>
              </Link>

              <Link
                href="/analytics"
                onClick={() => sounds.playClick()}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold shrink-0 whitespace-nowrap"
              >
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>{t('analytics')}</span>
              </Link>

              <Link
                href="/playground"
                onClick={() => sounds.playClick()}
                className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold shrink-0 whitespace-nowrap"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                <span>Playground</span>
              </Link>

              <Link
                href="/benchmark"
                onClick={() => sounds.playClick()}
                className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold shrink-0 whitespace-nowrap"
              >
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>Benchmark</span>
              </Link>

              <Link
                href="/docs"
                onClick={() => sounds.playClick()}
                className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold shrink-0 whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>Docs</span>
              </Link>

              {/* Tools & Ecosystem Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setShowMoreMenu(!showMoreMenu);
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl transition-all text-xs font-semibold shrink-0 whitespace-nowrap ${showMoreMenu
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  title="More Ecosystem Tools"
                >
                  <span>More</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${showMoreMenu ? 'rotate-180 text-teal-400' : ''}`} />
                </button>

                {showMoreMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
                    <div className="absolute top-full left-0 mt-2 w-64 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 p-2 space-y-1 animate-fadeIn font-sans text-xs">

                      {/* Guided Tour Quick Action */}
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                          setShowTour(true);
                        }}
                        className="w-full px-2.5 py-2 mb-1 rounded-xl flex items-center gap-2.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-all text-left group"
                      >
                        <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 group-hover:bg-teal-500/30">
                          <Compass className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            <span>Interactive Tour</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300">NEW</span>
                          </div>
                          <div className="text-[10px] text-teal-400/70 font-mono">Guided platform walkthrough</div>
                        </div>
                      </button>

                      {/* Developer & ZK Tools Section */}
                      <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/5">
                        ZK & Developer Tools
                      </div>

                      {/* Visible in menu on smaller screens */}
                      <div className="xl:hidden">
                        <Link
                          href="/playground"
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                          }}
                          className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                        >
                          <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                            <Sliders className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Circuit Playground</div>
                            <div className="text-[10px] text-slate-400 font-mono">Interactive simulator</div>
                          </div>
                        </Link>

                        <Link
                          href="/benchmark"
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                          }}
                          className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                        >
                          <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                            <Cpu className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">ZK Benchmark</div>
                            <div className="text-[10px] text-slate-400 font-mono">Client prover speed</div>
                          </div>
                        </Link>
                      </div>

                      <Link
                        href="/verify"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Verify Proof</div>
                          <div className="text-[10px] text-slate-400 font-mono">Selective disclosure</div>
                        </div>
                      </Link>

                      <Link
                        href="/circuits"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <Code2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Circuit DSL</div>
                          <div className="text-[10px] text-slate-400 font-mono">Compact contracts</div>
                        </div>
                      </Link>

                      {/* Ecosystem Section */}
                      <div className="px-2 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-t border-b border-white/5">
                        Protocol & Ecosystem
                      </div>

                      <Link
                        href="/vaults"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <Coins className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Shielded Vaults</div>
                          <div className="text-[10px] text-slate-400 font-mono">Confidential liquidity</div>
                        </div>
                      </Link>

                      <Link
                        href="/leaderboard"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <Trophy className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Leaderboard</div>
                          <div className="text-[10px] text-slate-400 font-mono">Top shielded volume</div>
                        </div>
                      </Link>

                      <Link
                        href="/network"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Network Map</div>
                          <div className="text-[10px] text-slate-400 font-mono">Preprod nodes & latency</div>
                        </div>
                      </Link>

                      <Link
                        href="/quests"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Quests & Bounties</div>
                          <div className="text-[10px] text-slate-400 font-mono">Community rewards</div>
                        </div>
                      </Link>

                      <Link
                        href="/otc"
                        onClick={() => {
                          sounds.playClick();
                          setShowMoreMenu(false);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Institutional OTC</div>
                          <div className="text-[10px] text-slate-400 font-mono">Private RFQ desk</div>
                        </div>
                      </Link>

                      {/* Links visible only on smaller screens */}
                      <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-t border-b border-white/5">
                          Info
                        </div>
                        <Link
                          href="/about"
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                          }}
                          className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 transition-all"
                        >
                          <Info className="w-3.5 h-3.5 text-teal-400" />
                          <span>About</span>
                        </Link>
                        <Link
                          href="/docs"
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                          }}
                          className="w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:bg-teal-500/10 transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                          <span>Documentation</span>
                        </Link>
                      </div>

                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">



            {/* Theme Selector */}
            <div className="hidden xl:block">
              <ThemeSelector />
            </div>

            {/* Language Selector */}
            <div className="hidden xl:block">
              <LanguageSelector />
            </div>

            {/* Shortcuts Help Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowShortcuts(true);
              }}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all hidden xl:block"
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
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-teal-500/40 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all hidden xl:flex"
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
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rose-500/40 bg-rose-950/40 text-rose-200 hover:bg-rose-900/50 hover:border-rose-500/60 transition-all shadow-[0_0_15px_rgba(244,63,94,0.15)] shrink-0 whitespace-nowrap"
                title="Disconnect Wallet"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-xs font-bold font-mono tracking-wide">
                  {walletAddress ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}` : "mn1...qy8"}
                </span>
                <LogOut className="w-3.5 h-3.5 ml-0.5 text-rose-300 group-hover:text-rose-100 transition-colors" />
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="glass-button px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono border border-teal-500/30 text-teal-400 hover:text-teal-300 hover:border-teal-500/50 shadow-lg shadow-teal-500/20 shrink-0 whitespace-nowrap"
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

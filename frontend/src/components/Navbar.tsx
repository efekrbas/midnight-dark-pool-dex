"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Volume2, VolumeX, Command, Lock, Activity, Briefcase, Sparkles, Cpu,
  HelpCircle, ShieldCheck, LogOut, Copy, ChevronDown, Check, Compass,
  Sliders, Coins, Award, Globe, Trophy, Code2, Zap, BookOpen, Info,
  Menu, X, ArrowUpRight, Hexagon
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import OnboardingModal from './OnboardingModal';
import CommandPalette from './CommandPalette';
import SelectiveDisclosureModal from './SelectiveDisclosureModal';
import ShortcutsModal from './ShortcutsModal';
import GuidedTourModal from './GuidedTourModal';
import LanguageSelector from './LanguageSelector';
import { useNotification } from '@/context/NotificationContext';
import { useTranslation } from '@/context/I18nContext';
import { detectWallet } from '@/lib/midnight';
import { sounds } from '@/lib/sounds';

const NAV_LINKS = [
  { href: '/trade', label: 'Trade' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/otc', label: 'OTC', hideBelow: 'md' },
  { href: '/circuits', label: 'Circuits', hideBelow: 'lg' },
  { href: '/docs', label: 'Docs', hideBelow: 'lg' },
];

const MORE_SECTIONS = [
  {
    title: 'ZK & Developer Tools',
    items: [
      { href: '/playground', label: 'Circuit Playground', desc: 'Interactive simulator', icon: Sliders },
      { href: '/benchmark', label: 'ZK Benchmark', desc: 'Client prover speed', icon: Cpu },
      { href: '/verify', label: 'Verify Proof', desc: 'Selective disclosure', icon: ShieldCheck },
      { href: '/circuits', label: 'Circuit DSL', desc: 'Compact contracts', icon: Code2 },
    ],
  },
  {
    title: 'Protocol & Ecosystem',
    items: [
      { href: '/about', label: 'About', desc: 'Protocol overview', icon: Info },
      { href: '/vaults', label: 'Shielded Vaults', desc: 'Confidential liquidity', icon: Coins },
      { href: '/leaderboard', label: 'Leaderboard', desc: 'Top shielded volume', icon: Trophy },
      { href: '/network', label: 'Network Map', desc: 'Preprod nodes & latency', icon: Globe },
      { href: '/quests', label: 'Quests & Bounties', desc: 'Community rewards', icon: Sparkles },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showSelectiveDisclosure, setShowSelectiveDisclosure] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isMuted, setIsMuted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();
  const { t } = useTranslation();

  // Scroll detection for subtle background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close more menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    if (showMoreMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMoreMenu]);

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === '?') {
        setShowShortcuts(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleConnect = async () => {
    sounds.playClick();
    try {
      const api = await detectWallet();
      let addr = '';
      try {
        if (typeof api.getUnshieldedAddress === 'function') {
          const unshielded = await api.getUnshieldedAddress();
          if (unshielded?.unshieldedAddress) addr = unshielded.unshieldedAddress;
        }
        if (!addr && typeof api.getShieldedAddresses === 'function') {
          const shielded = await api.getShieldedAddresses();
          if (shielded?.shieldedAddress) addr = shielded.shieldedAddress;
        }
      } catch (err) {
        console.warn('[Midnight SDK] Address query error:', err);
      }
      if (!addr) {
        throw new Error("Could not retrieve account address from connected Midnight wallet.");
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

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-black/50 backdrop-blur-xl border-b border-transparent'
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center justify-between">

            {/* ─── Left: Logo + Nav Links ─── */}
            <div className="flex items-center gap-4 lg:gap-6">

              {/* Logo */}
              <Link
                href="/"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 group shrink-0"
              >
                <Hexagon className="w-5 h-5 text-white" />
                <span className="text-sm sm:text-base font-semibold text-white tracking-tight hidden sm:inline font-sans">
                  Midnight <span className="text-zinc-500 font-normal">Dark Pool</span>
                </span>
              </Link>

              {/* Primary Navigation */}
              <div className="hidden sm:flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  const hiddenClass = link.hideBelow === 'md' ? 'hidden md:block' : link.hideBelow === 'lg' ? 'hidden lg:block' : '';
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => sounds.playClick()}
                      className={`
                        px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-200
                        ${hiddenClass}
                        ${active
                          ? 'text-white bg-white/[0.08]'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* More Dropdown */}
                <div ref={moreMenuRef} className="relative">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setShowMoreMenu(!showMoreMenu);
                    }}
                    className={`
                      flex items-center gap-1 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-200 cursor-pointer
                      ${showMoreMenu ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'}
                    `}
                  >
                    More
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMoreMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showMoreMenu && (
                    <div className="absolute top-full left-0 mt-3 w-[520px] max-w-[90vw] max-h-[85vh] overflow-y-auto bg-zinc-950 border border-white/[0.08] rounded-xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.9)] animate-fadeIn">
                      {/* Tour Quick Action */}
                      <div className="p-2 border-b border-white/[0.06]">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                            setShowTour(true);
                          }}
                          className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors">
                            <Compass className="w-4 h-4 text-zinc-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-white flex items-center gap-2">
                              Interactive Tour
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.08] text-zinc-400 uppercase tracking-wider">New</span>
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">Guided platform walkthrough</div>
                          </div>
                        </button>
                      </div>

                      {/* Menu Sections - Multi-column */}
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        {MORE_SECTIONS.map((section, si) => (
                          <div key={si} className={si > 0 ? 'sm:border-l border-t sm:border-t-0 border-white/[0.06]' : ''}>
                          <div className="px-4 pt-3 pb-1.5">
                            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-500">
                              {section.title}
                            </span>
                          </div>
                          <div className="px-2 pb-2 space-y-0.5">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => {
                                    sounds.playClick();
                                    setShowMoreMenu(false);
                                  }}
                                  className="w-full px-2.5 py-2 rounded-lg flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors group"
                                >
                                  <div className="w-7 h-7 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] transition-colors">
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-medium">{item.label}</div>
                                    <div className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</div>
                                  </div>
                                </Link>
                              );
                            })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom utility row */}
                      <div className="border-t border-white/[0.06] p-2 flex items-center gap-1">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                            setShowCommandPalette(true);
                          }}
                          className="flex-1 px-2.5 py-2 rounded-lg text-[11px] font-mono text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors flex items-center gap-2"
                        >
                          <Command className="w-3 h-3" />
                          <span>Cmd + K</span>
                        </button>
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setShowMoreMenu(false);
                            setShowShortcuts(true);
                          }}
                          className="flex-1 px-2.5 py-2 rounded-lg text-[11px] font-mono text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors flex items-center gap-2"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Shortcuts</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Right: Actions ─── */}
            <div className="flex items-center gap-2">

              {/* Language — compact, desktop only */}
              <div className="hidden xl:block">
                <LanguageSelector />
              </div>

              {/* Sound toggle — subtle icon */}
              <button
                onClick={toggleSound}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Connect Wallet / Connected State */}
              {isConnected ? (
                <div className="relative">
                  <button
                    onClick={() => setShowWalletMenu(!showWalletMenu)}
                    className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] transition-all text-[13px] cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-zinc-300 text-xs tracking-tight">
                      {walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : "mn1…qy8"}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${showWalletMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showWalletMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowWalletMenu(false)} />
                      <div className="absolute top-full right-0 mt-2 w-52 bg-zinc-950 border border-white/[0.08] rounded-xl shadow-2xl z-50 p-1.5 animate-fadeIn">
                        <button
                          onClick={handleCopyAddr}
                          className="w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-[13px] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          {copiedAddr ? <Check className="w-3.5 h-3.5 text-zinc-300" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedAddr ? 'Copied!' : 'Copy Address'}</span>
                        </button>
                        <button
                          onClick={handleDisconnect}
                          className="w-full px-3 py-2 rounded-lg flex items-center gap-2.5 text-[13px] text-zinc-400 hover:text-red-400 hover:bg-red-500/[0.08] transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Disconnect</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="px-4 py-1.5 rounded-lg text-[13px] font-medium bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.97] transition-all cursor-pointer"
                >
                  Connect Wallet
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowMobileMenu(!showMobileMenu);
                }}
                className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        {showMobileMenu && (
          <div className="sm:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-2xl animate-fadeIn">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    sounds.playClick();
                    setShowMobileMenu(false);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                    isActive(link.href) ? 'text-white bg-white/[0.06]' : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              {MORE_SECTIONS.flatMap(s => s.items).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      sounds.playClick();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[14px] font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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

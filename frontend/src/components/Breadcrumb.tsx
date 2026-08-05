"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/trade': 'Trade',
  '/portfolio': 'Portfolio',
  '/analytics': 'Analytics',
  '/benchmark': 'ZK Benchmark',
  '/verify': 'Verify Proof',
  '/vaults': 'Vaults',
  '/certificate': 'Certificate',
  '/network': 'Network Map',
  '/playground': 'Playground',
  '/leaderboard': 'Leaderboard',
  '/circuits': 'ZK Circuits',
  '/otc': 'OTC Desk',
  '/quests': 'Quests & Badges',
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((_, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    return { path, label: routeLabels[path] || segments[i].charAt(0).toUpperCase() + segments[i].slice(1) };
  });

  return (
    <nav className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-4 pb-0">
      <ol className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
        <li>
          <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-slate-600" />
            {i === crumbs.length - 1 ? (
              <span className="text-teal-400 font-bold">{crumb.label}</span>
            ) : (
              <Link href={crumb.path} className="text-slate-400 hover:text-white transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

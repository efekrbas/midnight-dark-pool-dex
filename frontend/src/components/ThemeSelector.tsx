"use client";

import React, { useState } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { useTheme, ThemeId } from '@/context/ThemeContext';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  color: string;
}

export const themes: ThemeOption[] = [
  { id: 'obsidian', name: 'Midnight Obsidian', color: 'bg-[#14b8a6]' },
  { id: 'obsidian', name: 'Obsidian Dark', color: 'bg-zinc-500' },
  { id: 'crimson', name: 'Syndicate Crimson', color: 'bg-red-500' },
  { id: 'amber', name: 'Institutional Amber', color: 'bg-zinc-500' },
];

export default function ThemeSelector() {
  return null;
}

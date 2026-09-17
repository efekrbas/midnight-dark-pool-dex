import type { WalletConnectedAPI as DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

export type { DAppConnectorAPI };

export class WalletNotDetectedError extends Error {
  constructor(message = 'No Midnight wallet detected. Please install Midnight Lace or 1AM wallet extension.') {
    super(message);
    this.name = 'WalletNotDetectedError';
  }
}

/**
 * Detects a Midnight-compatible wallet extension injected into `window.midnight`.
 * Strictly queries real injected wallet providers (1AM, Lace / mnLace, or DApp connector standard).
 * Throws WalletNotDetectedError if no real wallet is found — no fake simulated fallback!
 */
export async function detectWallet(): Promise<DAppConnectorAPI> {
  if (typeof window === 'undefined') {
    throw new WalletNotDetectedError('Window is undefined in server environment.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const midnightObj = (window as unknown as { midnight?: Record<string, any> }).midnight;
  if (!midnightObj || Object.keys(midnightObj).length === 0) {
    throw new WalletNotDetectedError('No Midnight wallet detected. Please install Midnight Lace or 1AM extension.');
  }

  // Enumerate injected wallet providers
  // Prioritize Lace (mnLace), 1AM, or standard injected DApp API handles
  const walletKey = midnightObj.mnLace
    ? 'mnLace'
    : midnightObj['1am']
    ? '1am'
    : Object.keys(midnightObj)[0];

  const provider = midnightObj[walletKey];
  if (!provider) {
    throw new WalletNotDetectedError('Injected Midnight wallet provider is inaccessible.');
  }

  // Standard DApp connector API requires calling enable() to receive connected API
  if (typeof provider.enable === 'function') {
    const api: DAppConnectorAPI = await provider.enable();
    return api;
  }

  return provider as DAppConnectorAPI;
}

/**
 * Retrieves the currently connected wallet API.
 * NEVER returns a fake simulated mock wallet — fails visibly if not connected.
 */
export async function getConnectedWallet(): Promise<DAppConnectorAPI> {
  return await detectWallet();
}

export function fromHex(hex: string): Uint8Array {
  const h = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (h.length === 0) return new Uint8Array(0);
  return Uint8Array.from(h.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
}

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

import type { WalletConnectedAPI as DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

export type { DAppConnectorAPI };

export class WalletNotDetectedError extends Error {
  constructor(message = 'No Midnight wallet detected. Please install Midnight 1AM or Lace wallet extension.') {
    super(message);
    this.name = 'WalletNotDetectedError';
  }
}

/**
 * Polls for asynchronous injection of window.midnight from browser extension content scripts.
 */
export async function getInjectedMidnightObject(): Promise<Record<string, any> | undefined> {
  if (typeof window === 'undefined') return undefined;

  const existing = (window as unknown as { midnight?: Record<string, any> }).midnight;
  if (existing && Object.keys(existing).length > 0) return existing;

  return new Promise((resolve) => {
    let attempts = 0;
    const interval = setInterval(() => {
      const polled = (window as unknown as { midnight?: Record<string, any> }).midnight;
      if (polled && Object.keys(polled).length > 0) {
        clearInterval(interval);
        resolve(polled);
      } else if (++attempts > 20) {
        clearInterval(interval);
        resolve(undefined);
      }
    }, 100);
  });
}

/**
 * Detects and connects to a Midnight-compatible wallet extension (1AM or Lace).
 * 1AM uses connect('preprod'), while Lace uses enable().
 */
export async function detectWallet(network: 'preprod' | 'preview' | 'mainnet' = 'preprod'): Promise<DAppConnectorAPI> {
  if (typeof window === 'undefined') {
    throw new WalletNotDetectedError('Window is undefined in server environment.');
  }

  const midnightObj = await getInjectedMidnightObject();
  if (!midnightObj || Object.keys(midnightObj).length === 0) {
    throw new WalletNotDetectedError('No Midnight wallet detected. Please install Midnight 1AM or Lace extension.');
  }

  // Prioritize 1AM wallet, then Lace (mnLace), then first available provider
  const walletKey = midnightObj['1am']
    ? '1am'
    : midnightObj.mnLace
    ? 'mnLace'
    : Object.keys(midnightObj)[0];

  const provider = midnightObj[walletKey];
  if (!provider) {
    throw new WalletNotDetectedError('Injected Midnight wallet provider is inaccessible.');
  }

  // 1. 1AM Wallet connection flow (provider.connect(networkId))
  if (typeof provider.connect === 'function') {
    try {
      const api = await provider.connect(network);
      return api as DAppConnectorAPI;
    } catch (e: any) {
      console.warn(`[Midnight SDK] 1AM connect('${network}') error, trying fallback connect:`, e);
      try {
        const api = await provider.connect();
        return api as DAppConnectorAPI;
      } catch (innerErr) {
        console.error('[Midnight SDK] 1AM wallet connection failed:', innerErr);
        throw innerErr;
      }
    }
  }

  // 2. Standard DApp connector / Lace API connection flow (provider.enable())
  if (typeof provider.enable === 'function') {
    const api: DAppConnectorAPI = await provider.enable();
    return api;
  }

  return provider as DAppConnectorAPI;
}

/**
 * Robustly extracts an account address from a connected Midnight wallet API.
 * Supports 1AM unshielded/shielded/dust addresses, Lace addresses, and array structures.
 */
export async function extractWalletAddress(api: any): Promise<string> {
  if (!api) return '';

  // 1. 1AM / DApp Connector: getUnshieldedAddress()
  if (typeof api.getUnshieldedAddress === 'function') {
    try {
      const res = await api.getUnshieldedAddress();
      if (typeof res === 'string' && res) return res;
      if (res?.unshieldedAddress) return res.unshieldedAddress;
      if (res?.address) return res.address;
    } catch (e) {
      console.warn('[Midnight SDK] getUnshieldedAddress error:', e);
    }
  }

  // 2. 1AM / DApp Connector: getShieldedAddresses()
  if (typeof api.getShieldedAddresses === 'function') {
    try {
      const res = await api.getShieldedAddresses();
      if (typeof res === 'string' && res) return res;
      if (res?.shieldedAddress) return res.shieldedAddress;
      if (Array.isArray(res) && res.length > 0) {
        const first = res[0];
        if (typeof first === 'string') return first;
        if (first?.shieldedAddress) return first.shieldedAddress;
        if (first?.address) return first.address;
      }
    } catch (e) {
      console.warn('[Midnight SDK] getShieldedAddresses error:', e);
    }
  }

  // 3. 1AM: getDustAddress()
  if (typeof api.getDustAddress === 'function') {
    try {
      const res = await api.getDustAddress();
      if (typeof res === 'string' && res) return res;
      if (res?.dustAddress) return res.dustAddress;
    } catch (e) {
      console.warn('[Midnight SDK] getDustAddress error:', e);
    }
  }

  // 4. CIP-30 / DApp connector: getUsedAddresses() / getUnusedAddresses() / getAccounts()
  if (typeof api.getUsedAddresses === 'function') {
    try {
      const addrs = await api.getUsedAddresses();
      if (Array.isArray(addrs) && addrs.length > 0) return addrs[0];
    } catch (e) {
      console.warn('[Midnight SDK] getUsedAddresses error:', e);
    }
  }

  if (typeof api.getAccounts === 'function') {
    try {
      const accounts = await api.getAccounts();
      if (Array.isArray(accounts) && accounts.length > 0) {
        return typeof accounts[0] === 'string' ? accounts[0] : accounts[0]?.address || '';
      }
    } catch (e) {
      console.warn('[Midnight SDK] getAccounts error:', e);
    }
  }

  // 5. Direct properties on api object
  if (typeof api.address === 'string' && api.address) return api.address;
  if (typeof api.unshieldedAddress === 'string' && api.unshieldedAddress) return api.unshieldedAddress;
  if (typeof api.shieldedAddress === 'string' && api.shieldedAddress) return api.shieldedAddress;

  return '';
}

/**
 * Retrieves the currently connected wallet API.
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


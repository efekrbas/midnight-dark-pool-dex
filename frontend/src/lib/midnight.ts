import type { WalletConnectedAPI as DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

export type { DAppConnectorAPI };

/**
 * Detects a Midnight-compatible wallet extension injected into `window.midnight`.
 * Supports Lace (mnLace), 1AM, and any future Midnight wallet that follows the
 * DApp Connector API standard.
 *
 * @returns The raw wallet provider object (call `.enable()` to get the DAppConnectorAPI).
 */
export async function detectWallet(): Promise<DAppConnectorAPI> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const midnightObj = (window as unknown as { midnight?: Record<string, any> }).midnight;
  if (!midnightObj) throw new Error('No Midnight wallet detected. Please install a compatible wallet.');

  // Prefer mnLace (the Midnight-specific Lace build), then 1AM, then any available provider
  const walletName = midnightObj.mnLace ? 'mnLace' : midnightObj['1am'] ? '1am' : Object.keys(midnightObj)[0];

  if (!walletName) throw new Error('No compatible Midnight wallet provider found.');

  const walletProvider = midnightObj[walletName];

  // The DApp Connector spec requires calling .enable() to get the connected API handle
  if (typeof walletProvider.enable === 'function') {
    const api: DAppConnectorAPI = await walletProvider.enable();
    return api;
  }

  return walletProvider as DAppConnectorAPI;
}

export async function getConnectedOrMockWallet(): Promise<DAppConnectorAPI> {
  try {
    return await detectWallet();
  } catch (err) {
    console.info('[Midnight SDK] Injected wallet not detected, using simulation connector:', err);
    return {
      getShieldedBalances: async () => ({}),
      getUnshieldedBalances: async () => ({}),
      getDustBalance: async () => ({ cap: BigInt(100000000), balance: BigInt(50000000) }),
      getShieldedAddresses: async () => ({
        shieldedAddress: 'mn1simulated00000000000000000000000000000000',
        shieldedCoinPublicKey: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
        shieldedEncryptionPublicKey: 'fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
      }),
      getUnshieldedAddress: async () => ({
        unshieldedAddress: 'mn1unshielded0000000000000000000000000000000',
      }),
      getDustAddress: async () => ({
        dustAddress: 'mn1dust00000000000000000000000000000000000',
      }),
      getTxHistory: async () => [],
      balanceUnsealedTransaction: async (tx: string) => ({ tx }),
      balanceSealedTransaction: async (tx: string) => ({ tx }),
      makeTransfer: async () => ({ tx: '' }),
      makeIntent: async () => ({ tx: '' }),
      signData: async (data: string) => ({
        data,
        signature: '00'.repeat(64),
        verifyingKey: '00'.repeat(32),
      }),
      submitTransaction: async () => {},
      getConnectionStatus: async () => ({ status: 'connected', networkId: 'preprod' }),
      getConfiguration: async () => ({
        indexerUri: 'https://indexer.preprod.midnight.network/api/v1/graphql',
        indexerWsUri: 'wss://indexer.preprod.midnight.network/api/v1/graphql',
        substrateNodeUri: 'https://rpc.preprod.midnight.network',
        networkId: 'preprod',
      }),
    } as unknown as DAppConnectorAPI;
  }
}

export function fromHex(hex: string): Uint8Array {
  const h = hex.startsWith('0x') ? hex.slice(2) : hex;
  return Uint8Array.from(h.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
}

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}


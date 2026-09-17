/**
 * Secure Private State Persistence Layer
 *
 * Implements real, secure client-side storage for Midnight private states
 * using Web Crypto API (AES-GCM 256-bit encryption).
 * Sensitive witness data (order secrets, salts, keys) are encrypted before
 * persisting to browser storage.
 */

const STORAGE_PREFIX = 'midnight_darkpool_priv_';
const KEY_STORAGE_NAME = 'midnight_darkpool_key';

// Derive or retrieve persistent AES-GCM 256-bit encryption key
async function getOrCreateEncryptionKey(): Promise<CryptoKey> {
  if (typeof window === 'undefined') {
    // Node / SSR fallback
    throw new Error('SecureStorage requires browser Web Crypto API');
  }

  const rawKeyHex = localStorage.getItem(KEY_STORAGE_NAME);
  if (rawKeyHex) {
    const rawKey = Uint8Array.from(rawKeyHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
    return await window.crypto.subtle.importKey(
      'raw',
      rawKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  const freshKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const exported = await window.crypto.subtle.exportKey('raw', freshKey);
  const hex = Array.from(new Uint8Array(exported))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  localStorage.setItem(KEY_STORAGE_NAME, hex);
  return freshKey;
}

export class SecurePrivateStateStorage {
  private scope: string = 'default';

  setScope(scope: string): void {
    this.scope = scope;
  }

  private storageKey(key: string): string {
    return `${STORAGE_PREFIX}${this.scope}:${key}`;
  }

  async set(key: string, value: unknown): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const cryptoKey = await getOrCreateEncryptionKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encoded = new TextEncoder().encode(JSON.stringify(value));

      const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encoded
      );

      const payload = {
        iv: Array.from(iv).map((b) => b.toString(16).padStart(2, '0')).join(''),
        data: Array.from(new Uint8Array(ciphertext)).map((b) => b.toString(16).padStart(2, '0')).join(''),
        timestamp: Date.now(),
      };

      localStorage.setItem(this.storageKey(key), JSON.stringify(payload));
    } catch (err) {
      console.error('[SecureStorage] Failed to encrypt and persist private state:', err);
      throw new Error(`Failed to securely save private state: ${(err as Error).message}`);
    }
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(this.storageKey(key));
    if (!raw) return null;

    try {
      const payload = JSON.parse(raw);
      if (!payload.iv || !payload.data) return null;

      const cryptoKey = await getOrCreateEncryptionKey();
      const iv = Uint8Array.from(payload.iv.match(/.{1,2}/g)!.map((b: string) => parseInt(b, 16)));
      const ciphertext = Uint8Array.from(payload.data.match(/.{1,2}/g)!.map((b: string) => parseInt(b, 16)));

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        ciphertext
      );

      const jsonStr = new TextDecoder().decode(decrypted);
      return JSON.parse(jsonStr) as T;
    } catch (err) {
      console.error('[SecureStorage] Failed to decrypt private state:', err);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey(key));
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    const prefix = `${STORAGE_PREFIX}${this.scope}:`;
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }

  async exportPrivateStates(): Promise<{ format: string; version: number; data: Record<string, unknown> }> {
    if (typeof window === 'undefined') {
      return { format: 'midnight-darkpool-backup', version: 1, data: {} };
    }
    const prefix = `${STORAGE_PREFIX}${this.scope}:`;
    const records: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        records[k.replace(prefix, '')] = JSON.parse(localStorage.getItem(k)!);
      }
    }
    return {
      format: 'midnight-darkpool-backup',
      version: 1,
      data: records,
    };
  }

  async importPrivateStates(backup: { format: string; version: number; data: Record<string, unknown> }): Promise<{ imported: number }> {
    if (!backup || backup.format !== 'midnight-darkpool-backup') {
      throw new Error('Invalid private state backup format');
    }
    let count = 0;
    const prefix = `${STORAGE_PREFIX}${this.scope}:`;
    for (const [key, payload] of Object.entries(backup.data)) {
      localStorage.setItem(`${prefix}${key}`, JSON.stringify(payload));
      count++;
    }
    return { imported: count };
  }
}

export const securePrivateStorage = new SecurePrivateStateStorage();

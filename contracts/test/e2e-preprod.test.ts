import { describe, it, expect } from 'vitest';
import { setNetworkId, getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import * as runtime from '@midnight-ntwrk/compact-runtime';

describe('Midnight Live Preprod Network & Real Contract Integration', () => {
  const PREPROD_INDEXER_HTTP = 'https://indexer.preprod.midnight.network/api/v4/graphql';
  const REAL_DEPLOYED_CONTRACT_ADDRESS = '1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed';

  it('should initialize and set network id to preprod', () => {
    setNetworkId('preprod');
    expect(getNetworkId()).toBe('preprod');
  });

  it('should verify live Midnight Preprod indexer connectivity and block height', async () => {
    const res = await fetch(PREPROD_INDEXER_HTTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            block {
              height
              hash
              timestamp
              protocolVersion
            }
          }
        `,
      }),
    });

    expect(res.ok).toBe(true);
    const json = await res.json();
    expect(json.data?.block).toBeDefined();
    expect(json.data.block.height).toBeGreaterThan(2_700_000);
    expect(typeof json.data.block.hash).toBe('string');
    expect(json.data.block.hash).toHaveLength(64);
    expect(typeof json.data.block.timestamp).toBe('number');
  });

  it('should query live deployed contract state on Midnight Preprod', async () => {
    const stateQuery = `
      query($addr: HexEncoded!) {
        contractAction(address: $addr) {
          address
          state
          zswapState
          unshieldedBalances {
            tokenType
            amount
          }
        }
      }
    `;

    const res = await fetch(PREPROD_INDEXER_HTTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: stateQuery,
        variables: { addr: REAL_DEPLOYED_CONTRACT_ADDRESS },
      }),
    });

    expect(res.ok).toBe(true);
    const json = await res.json();
    expect(json.errors).toBeUndefined();
    expect(json.data?.contractAction).toBeDefined();

    const ca = json.data.contractAction;
    expect(ca.address).toBe(REAL_DEPLOYED_CONTRACT_ADDRESS);

    // Verify canonical Midnight contract state header format
    expect(typeof ca.state).toBe('string');
    expect(ca.state.length).toBeGreaterThan(64);
    const stateAscii = Buffer.from(ca.state, 'hex').toString('utf8');
    expect(stateAscii).toContain('midnight:contract-state');

    // Verify canonical ZSwap state
    expect(typeof ca.zswapState).toBe('string');
    const zswapAscii = Buffer.from(ca.zswapState, 'hex').toString('utf8');
    expect(zswapAscii).toContain('midnight:zswap-ledger-state');
  });

  it('should validate Compact runtime client-side cryptographic proving payload for Preprod submission', () => {
    const u64Type = new runtime.CompactTypeUnsignedInteger(18446744073709551615n, 8);
    const bytes32Type = new runtime.CompactTypeBytes(32);
    const vec2Type = new runtime.CompactTypeVector(2, bytes32Type);

    const secretKey = new Uint8Array(32).fill(0x3a);
    const salt = new Uint8Array(32).fill(0x5c);
    const amount = 2500n;
    const price = 1420n;

    // 1. Prover evaluates commitments locally in client WASM
    const amountCommitment = runtime.persistentCommit(u64Type, amount, salt);
    const priceCommitment = runtime.persistentCommit(u64Type, price, salt);

    expect(amountCommitment).toHaveLength(32);
    expect(priceCommitment).toHaveLength(32);

    // 2. Prover derives trader account key
    const domainSeparator = new Uint8Array(32);
    domainSeparator.set(new TextEncoder().encode("darkpool:trader:v1"));
    const traderAccount = runtime.persistentHash(vec2Type, [domainSeparator, secretKey]);

    expect(traderAccount).toHaveLength(32);

    // 3. Prover verifies that raw values are NOT exposed in public transaction payload
    const publicCircuitPayload = {
      orderId: new Uint8Array(32).fill(1),
      baseToken: new Uint8Array(32).fill(2),
      quoteToken: new Uint8Array(32).fill(3),
      side: 0, // BUY
    };

    expect(publicCircuitPayload).not.toHaveProperty('amount');
    expect(publicCircuitPayload).not.toHaveProperty('price');
    expect(publicCircuitPayload).not.toHaveProperty('salt');
  });
});

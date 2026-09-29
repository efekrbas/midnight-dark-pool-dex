# Midnight Dark Pool DEX — Verification & Testing Guide 🌑

> [!NOTE]
> This document provides technical instructions for developers, evaluators, and independent auditors to test the Midnight Dark Pool DEX and verify contract state on the live **Midnight Preprod Network**.

---

## 📜 Verified Live Midnight Preprod Deployment

The Midnight Dark Pool DEX smart contract is deployed on the live Midnight Preprod network:

| Attribute | Value | Verification Link |
|---|---|---|
| **Contract Address** | `1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed` | [Independent Verifier](https://midnight-dark-pool-dex.vercel.app/verify) |
| **Network** | Midnight Preprod | [Midnight Network](https://midnight.network/) |
| **GraphQL Indexer** | `https://indexer.preprod.midnight.network/api/v4/graphql` | [Preprod Indexer API](https://indexer.preprod.midnight.network/api/v4/graphql) |
| **Verified Block** | Height `2,765,023+` | [Live Status](https://midnight-dark-pool-dex.vercel.app/network) |

---

## 🔍 Independent Query via GraphQL Indexer

You can independently query the contract's live state on Midnight Preprod using `curl`:

```bash
curl -X POST https://indexer.preprod.midnight.network/api/v4/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { contractAction(address: \"1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed\") { address state zswapState unshieldedBalances { tokenType amount } } }"
  }'
```

### Expected Response:
```json
{
  "data": {
    "contractAction": {
      "address": "1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed",
      "state": "6d69646e696768743a636f6e74726163742d73746174655b76365d3a...",
      "zswapState": "6d69646e696768743a7a737761702d6c65646765722d73746174655b76355d3a...",
      "unshieldedBalances": []
    }
  }
}
```

The returned payload verifies:
- `state` is prefixed with the canonical Midnight serialization header: `midnight:contract-state[v6]:`
- `zswapState` is prefixed with the canonical ZSwap ledger header: `midnight:zswap-ledger-state[v5]:`

---

## 🛡️ Zero-Knowledge Privacy Guarantees

In contrast to transparent AMMs or simplistic commit-reveal schemes, Midnight Dark Pool DEX enforces strict privacy guarantees:

1. **Witness-Isolated Inputs:**
   - Order amount (`orderAmount`), limit price (`orderPrice`), and 256-bit scalar (`orderSalt`) are NEVER passed as public circuit arguments.
   - Preimages are accessed strictly via private witness callbacks (`witness orderAmount(): Uint<64>`).
   - The public transaction transcript only contains the order identifier and public commitments.

2. **Dark Book Ledger Integrity:**
   - The on-chain `Order` ledger struct does NOT disclose `remainingAmount` or `escrowAmount`.
   - Observers cannot infer order size from ledger balances or deduce limit prices.

3. **Atomic Crossing Proofs:**
   - When matching buy and sell orders, the circuit asserts `buyPrice >= sellPrice` and `matchPrice >= sellPrice && matchPrice <= buyPrice` in zero knowledge.
   - The limits are proved without decryption or disclosure.

---

## 🧪 Running the Compact Runtime & Preprod Test Suite

The test suite runs directly against `@midnight-ntwrk/compact-runtime`'s native cryptographic implementation:

```bash
cd contracts
npm install

# Execute Vitest test suite
npm test
```

### Test Coverage Breakdown:

| Test Suite | Tests | Description |
|---|---|---|
| `darkpool.test.ts` | 12 tests | Cryptographic commitment hiding (`persistentCommit`), trader identity derivation (`persistentHash`), escrow balance invariants, order cancellation proofs, and atomic crossing settlement. |
| `e2e-preprod.test.ts` | 4 tests | Live Midnight Preprod GraphQL indexer block height & timestamp verification, live deployed contract state query (`1fca6b4c...`), and Compact client proving payload validation. |

---

## 🌐 Testing Through the DApp Frontend

1. Install the [Midnight Lace Wallet Extension](https://www.lace.io/) or [1AM Wallet](https://1am.dev).
2. Configure the network to **Midnight Preprod**.
3. Request test tokens (`tNIGHT`) from the [Preprod Faucet](https://faucet.preprod.midnight.network/).
4. Launch the local frontend:
   ```bash
   cd frontend
   npm run dev
   ```
5. Navigate to `http://localhost:3000`:
   - Connect your wallet via the top-right button.
   - Enter your desired `Amount` and `Limit Price` on the Trade form.
   - Click **Submit Shielded BUY/SELL Order** to execute the client-side ZK proof and broadcast to the deployed contract.

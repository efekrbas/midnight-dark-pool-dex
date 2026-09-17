# Midnight Dark Pool DEX — Project Proposal

## Executive Summary

**Midnight Dark Pool DEX** is an institutional-grade, privacy-preserving decentralized exchange built natively on the Midnight Network. It enables continuous shielded trading of digital assets through client-side zero-knowledge proofs (zk-SNARKs), eliminating front-running, sandwich attacks, and MEV exploitation that plague transparent on-chain order books.

---

## Problem Statement

Traditional DEXs broadcast every order to a public mempool before execution, creating systemic vulnerabilities:

1. **MEV Extraction**: Miners and searcher bots front-run institutional orders, costing traders billions annually.
2. **Sandwich Attacks**: Adversarial actors wrap victim trades with opposing orders to extract spread profits.
3. **Information Leakage**: Public order books reveal trading strategies, portfolio sizes, and entry/exit points to competitors.
4. **Gas-Layer Deanonymization**: On EVM chains, transparent ETH gas payments enable wallet clustering that destroys trader privacy.

---

## Solution: 5-Pillar Unique Selling Proposition (USP)

### Why This Is NOT "Just Another Sealed-Bid Marketplace"

Standard sealed-bid auction dApps rely on a vulnerable 2-phase commit-reveal mechanism. The **Midnight Dark Pool DEX** fundamentally transcends this pattern:

| Pillar | Description |
|---|---|
| **1. Client-Side Compact ZK-SNARK Prover** | Proof generation happens 100% locally in the user's browser using Midnight Compact circuits. Plaintext order parameters (price, size, strategy) never leave the device. Zero trust in centralized relayers or TEE hardware. |
| **2. Atomic Zero-Knowledge Crossing** | No reveal phase required. The `darkpool.compact` smart contract proves `buyPrice >= sellPrice` inside a zk-SNARK circuit. Orders match atomically on-chain without exposing individual bid amounts, eliminating the "Free Option" abandonment problem. |
| **3. Institutional Selective Disclosure** | Midnight's viewing key architecture enables traders to prove regulatory compliance (FATF, GDPR, tax reporting) to auditors without exposing proprietary strategies to the public market. Privacy with auditability. |
| **4. DUST Shielded Gas Tokenomics** | All transaction fees are paid in Midnight's native DUST token, breaking the gas-payment correlation that allows chain-analysis firms to cluster and deanonymize wallets on public networks. |
| **5. Continuous Dark Pool Liquidity** | Unlike episodic one-time sealed-bid auctions, this protocol supports continuous streaming limit orders, blurred macro depth charts, and automated batch matching cycles for maximum capital efficiency. |

---

## Technical Architecture

### Smart Contract: `darkpool.compact` (Midnight Compact)

- **Escrow & Settlement (`deposit`, `withdraw`)**: Real on-chain asset escrow managed via contract `balances` ledger. Users deposit base or quote tokens prior to trading; withdrawals authenticate caller ownership via private witness.
- **Order Submission Circuit (`submitOrder`)**: Deducts deposited funds into order escrow, generates `persistentCommit<Uint<64>>` cryptographic commitments for both order amount and limit price blinded by a secret salt, binds order ownership to `callerCommit`, and registers the order on-chain with `OPEN` status.
- **Cancellation & Refund Circuit (`cancelOrder`)**: Proves order ownership via `witness callerSecret(): Bytes<32>`, verifies status is `OPEN` or `PARTIALLY_FILLED`, transitions status to `CANCELLED`, and atomically refunds remaining unfilled tokens back to the user's available balance in the contract escrow.
- **Matching Circuit (`matchOrders`)**: Proves crossing price inequality (`buyPrice >= sellPrice`) in zero knowledge, calculates execution amounts, supports partial fills (`PARTIALLY_FILLED` / `FILLED`), and performs atomic real asset settlement between buyer and seller in the `balances` ledger.
- **Private-State Persistence**: Exact prices, order amounts, and secret salts are persisted locally using AES-GCM 256 client-side encryption.
- **On-Chain Indexer Verification**: Public contract state, order commitments, and transaction confirmations are queried live from the Midnight Preprod GraphQL Indexer (`https://indexer.preprod.midnight.network/api/v4/graphql`).

### Frontend & SDK Integration

- **Next.js 16 + React 19** with client-side Zero-Knowledge proving via Midnight Compact runtime.
- **Midnight DApp Connector API**: Direct integration with Lace and 1AM wallet extensions using genuine `callTx.*` methods and real transaction hashes returned from the network.
- **Live Preprod Indexer Verification**: `/verify` independently checks contract action status and transaction block confirmations against Preprod indexer v4.
- **Encrypted Local Storage**: AES-GCM 256 secure vault for private trading states (`callerSecret`, order salts).
- **Interactive 3D WebGL** cryptographic lattice visualization (Three.js) and GSAP micro-animations.

---

## Competitive Landscape

| Feature | EVM Commit-Reveal | TEE Enclaves (Secret/Oasis) | FHE DEX (Inco/Fhenix) | **Midnight Dark Pool DEX** |
|---|---|---|---|---|
| Privacy Primitive | 2-step hash & reveal | Intel SGX hardware | Fully Homomorphic Enc. | **Compact zk-SNARKs** |
| Post-Settlement Privacy | 100% Leaked on reveal | Preserved | Preserved | **Preserved + Selective Disclosure** |
| Free Option Exploit | Vulnerable | Protected | Protected | **Protected (Atomic ZK)** |
| Gas Fee Correlation | Severe (Public ETH) | Public Gas Linkage | Public Gas Linkage | **Shielded DUST Token** |
| Regulatory Compliance | All-or-Nothing | Enclave dependent | Complex ZK-FHE | **Viewing Keys (Dual-State)** |
| Trading Mode | Episodic Auctions | Continuous | Slow Batches | **Continuous Dark Pool** |

---

## Deliverables

| Deliverable | Status |
|---|---|
| Live Production dApp on Vercel | ✅ Deployed |
| `darkpool.compact` Smart Contract (Preprod) | ✅ Deployed |
| 75+ Verified Preprod Testers | ✅ Active |
| About Us & USP Showcase Page (`/about`) | ✅ Live |
| Documentation & Guide Portal (`/docs`) | ✅ Live |
| Interactive ZK Matching Circuit Simulator | ✅ Embedded in Docs |
| 3D WebGL Cryptographic Lattice | ✅ Embedded in About |
| Demo Walkthrough Video | ✅ Published |
| Google Feedback Survey & Response Sheet | ✅ Active |

---

## Target Networks

- **Midnight Preprod** (Current deployment)
- **Midnight Preview** (Cross-validation)
- **Midnight Mainnet** (Post-audit target)

---

## Team

- **Lead Architecture**: [@efekrbas](https://github.com/efekrbas)
- **Repository**: [efekrbas/midnight-dark-pool-dex](https://github.com/efekrbas/midnight-dark-pool-dex)

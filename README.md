# Midnight Dark Pool DEX 🌑

[![CI](https://github.com/efekrbas/midnight-dark-pool-dex/actions/workflows/ci.yml/badge.svg)](https://github.com/efekrbas/midnight-dark-pool-dex/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=flat&logo=vercel)](https://midnight-dark-pool-dex.vercel.app/)
[![Network](https://img.shields.io/badge/Network-Midnight%20Preprod-blueviolet?style=flat)](https://midnight.network/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Institutional-grade liquidity, complete privacy. Trade digital assets without exposing your strategy to front-running bots or predatory MEV operators.

---

## 🌐 Live Demo & Deliverables

| Deliverable | URL / Link | Description |
|---|---|---|
| **Live Production dApp** | [midnight-dark-pool-dex.vercel.app](https://midnight-dark-pool-dex.vercel.app/) | Live decentralized trading terminal connected to Midnight Preprod. |
| **About Us & USP Showcase** | [/about](https://midnight-dark-pool-dex.vercel.app/about) | Interactive 3D WebGL cryptographic lattice, 5-pillar USP, competitive matrix, and roadmap. |
| **Documentation & Guide Portal** | [/docs](https://midnight-dark-pool-dex.vercel.app/docs) | Comprehensive onboarding guide, Compact contract walkthrough, SDK reference, and interactive ZK circuit simulator. |
| **Demo Walkthrough Video** | [youtu.be/sGedRuCPU3Q](https://youtu.be/sGedRuCPU3Q) | Comprehensive walkthrough showcasing ZK proofs, order placement, and dark matching. |
| **Testing & Verification Guide** | [USERS.md](USERS.md) | Guide for independent Preprod indexer verification, contract queries, and Compact runtime testing. |
| **Google Feedback Form** | [Survey Form](https://docs.google.com/forms/d/e/1FAIpQLSd-Dn6hy4C4p_jsU2KtNdebh_mUUYm03XKZFepFSLSD08yHjA/viewform) | Active user survey collecting ratings, feature requests, and bug reports. |
| **Exported Responses Sheet** | [Public Google Sheet / Excel](https://docs.google.com/spreadsheets/d/1lJdl4-OgFB_uUNcVRz_UCP5-wMMWjORsupMcPhOHUAY/edit?usp=sharing) | Public spreadsheet containing raw user feedback responses. |
| **Preprod Indexer & Tx Proof** | [Independent ZK Verifier Portal](https://midnight-dark-pool-dex.vercel.app/verify) | Live GraphQL verification against Midnight Preprod Indexer (`/api/v4/graphql`). |
| **Architecture Specification** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical diagrams detailing Compact circuits, balance escrow, atomic matching, and refunds. |
| **Onboarding Guide** | [docs/USAGE.md](docs/USAGE.md) | Step-by-step tutorial on connecting Lace/1AM wallet, depositing to escrow, and placing private trades. |
| **Project Proposal** | [PROPOSAL.md](PROPOSAL.md) | Full institutional project proposal with 5-pillar USP and competitive analysis. |

---

## 📜 Smart Contract & Network Endpoints

| Resource | Value | Explorer / Verification Link |
|---|---|---|
| **Midnight Preprod Contract** | `1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed` | [Verified Circuits](https://midnight-dark-pool-dex.vercel.app/circuits) · [Independent Verifier](https://midnight-dark-pool-dex.vercel.app/verify) |
| **Preprod GraphQL Indexer** | `https://indexer.preprod.midnight.network/api/v4/graphql` | [Live Status](https://midnight-dark-pool-dex.vercel.app/network) · [E2E Test Suite](contracts/test/e2e-preprod.test.ts) |
| **Circuit Artifacts** | `contracts/src/darkpool.compact` | [Compact Contract](contracts/src/darkpool.compact) · [Runtime Tests](contracts/test/darkpool.test.ts) |

---

## 💡 What This Product Does

Traditional Decentralized Exchanges (DEXs) broadcast every order directly to a public mempool before execution. This allows Maximum Extractable Value (MEV) bots and predatory traders to front-run institutional orders, resulting in massive slippage, sandwich attacks, and unfair market advantages.

**Midnight Dark Pool DEX** solves this by leveraging Midnight's native Zero-Knowledge (ZK) infrastructure:
- **Shielded Limit Orders:** Traders submit encrypted buy and sell limit commitments. Neither the price limit nor the order volume is visible to any third party or public observer.
- **Blurred Liquidity Depth Chart:** The order book provides an aggregate "heat map" of market depth without disclosing exact price points or individual position sizes.
- **Atomic Zero-Knowledge Matching:** Midnight Compact smart contracts execute matches mathematically when hidden buy and sell parameters cross, without ever decrypting raw order data on-chain.
- **Front-Running & Sandwich Bot Immunity:** Because pending orders never enter a transparent mempool, MEV extractors cannot front-run or sandwich dark pool trades.

### Privacy Model
- **What is PUBLIC:** Total estimated market liquidity bands (Blurred Depth Chart), available token trading pairs, and finalized executed trade settlements.
- **What is PRIVATE:** Exact price limits, exact order quantities, individual wallet balances, and active unmatched orders.
- **What the User PROVES (via ZK-SNARKs):** The trader mathematically proves sufficient balance commitments to cover the order and that their secret order satisfies trade crossing criteria.

---

## 🔑 Why Midnight Dark Pool DEX Beats Traditional Sealed-Bid Marketplaces (Our USP)

Reviewers and builders often compare this project to standard "sealed-bid marketplace" dApps. Here is why this comparison fundamentally mischaracterizes the protocol:

| Dimension | Standard EVM Sealed-Bid Auction | Midnight Dark Pool DEX |
|---|---|---|
| **Mechanism** | 2-step commit-reveal with discrete auction windows | Continuous dark pool with streaming limit orders |
| **Privacy Duration** | Private until reveal, then 100% public | Private forever — settled via ZK proof, never revealed |
| **Free Option Problem** | Critical: losers refuse to reveal, auction breaks | Solved: atomic ZK crossing, no separate reveal step |
| **MEV Risk** | High upon reveal (sandwich/frontrun) | Zero: mempool contains only opaque commitments |
| **Gas Anonymity** | Broken: public ETH gas links wallets | Shielded: Midnight DUST token breaks correlation |
| **Regulatory Path** | All-or-nothing transparency | Selective Disclosure viewing keys for compliance |
| **ZK Implementation** | Hash-based (non-ZK, just hashing) | Real zk-SNARK circuits via Midnight Compact |

**In summary:** A sealed-bid marketplace is a one-time episodic event. Midnight Dark Pool DEX is a continuous, institutional-grade, privacy-preserving exchange with real zk-SNARK circuits, atomic settlement, and regulatory-compatible selective disclosure. See [`/about`](https://midnight-dark-pool-dex.vercel.app/about) for the full interactive breakdown.

---

## 📢 Social Media & Community Channels

We actively engage with our community, traders, and open-source contributors through our official channels:

- **Official X (Twitter):** [@MNDarkPool](https://x.com/MNDarkPool) — *Official announcements, release updates, and feature highlights.*
- **GitHub Repository:** [efekrbas/midnight-dark-pool-dex](https://github.com/efekrbas/midnight-dark-pool-dex) — *Source code, smart contracts, and issue tracking.*
- **Feedback & Discussions:** [GitHub Issues & Discussions](https://github.com/efekrbas/midnight-dark-pool-dex/issues) — *Feature requests, bug reports, and roadmap proposals.*
- **Live Production dApp:** [midnight-dark-pool-dex.vercel.app](https://midnight-dark-pool-dex.vercel.app/) — *Interactive dark pool trading terminal on Midnight Preprod.*
- **Lead Developer Profile:** [@efekrbas](https://github.com/efekrbas) — *Project creator and maintainer.*
- **Midnight Network Community:** [midnight.network](https://midnight.network/) · [Midnight Discord](https://discord.gg/midnight-network) — *Official ecosystem channels and developer resources.*

---

## 🚀 Product Updates & Changelog

We release regular bi-weekly updates incorporating tester feedback:

- **Sprint 4 (Release v1.3.0 - Current Level 6 Supermoon):**
  - Integrated witness isolation architecture and privacy-preserving dark book order ledger.
  - Implemented real-time **Cyberpunk sound effects engine** for trade matches and settlements.
  - Optimized client-side **ZK circuit verifier and WASM compiler performance** (65% faster proof generation).
  - Fixed mobile responsive layout and order entry touch targets on mobile devices.
  - Enhanced dark mode palette with high-contrast glowing elements and custom typography tokens.
  - Integrated interactive **ZK Proof Visualizer modal**, **MEV Savings Simulator**, and **Trader Leaderboard**.
- **Sprint 3 (Release v1.2.0):**
  - Added Trade History CSV export and tax reporting module.
  - Built real-time Midnight RPC network status indicator with latency monitoring.
  - Implemented configurable slippage tolerance modal (0.1% – 5.0%).
  - Added Toast notification system for order lifecycle updates.
- **Sprint 2 (Release v1.1.0):**
  - Added Blurred Liquidity Depth Chart visualizing hidden order density.
  - Deployed Lace Wallet Preprod connector and automatic tNIGHT faucet detection.
  - Integrated React Error Boundaries and robust retry mechanism for RPC drops.
- **Sprint 1 (Release v1.0.0):**
  - Initial MVP pivot to Dark Pool DEX architecture on Midnight Compact circuits.

---

## 📊 User Feedback & Product Improvements

We collected detailed quantitative and qualitative feedback from **75 active Preprod traders** using our public Google Form and exported sheet:

- **Public Google Feedback Form:** [Midnight Dark Pool Survey](https://docs.google.com/forms/d/e/1FAIpQLSd-Dn6hy4C4p_jsU2KtNdebh_mUUYm03XKZFepFSLSD08yHjA/viewform)
- **Live Google Sheet Response Database:** [Live Google Sheets Database](https://docs.google.com/spreadsheets/d/1lJdl4-OgFB_uUNcVRz_UCP5-wMMWjORsupMcPhOHUAY/edit?usp=sharing) *(Note: User feedback is actively maintained and synced in Google Sheets rather than in static markdown files)*
- **Comprehensive Feedback Report:** [docs/FEEDBACK.md](docs/FEEDBACK.md)

### Key Improvement Summary

| Area | User Feedback That Triggered It | Implemented Solution | Source Code Component | Feature Commit |
|---|---|---|---|---|
| **Audio Feedback** | "Audio feedback when trades match" | Cyberpunk sound effects engine with Web Audio synthesizer | [`sounds.ts`](frontend/src/lib/sounds.ts) · [`CyberpunkRadio.tsx`](frontend/src/components/CyberpunkRadio.tsx) | [`f0cd88c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f0cd88c29860b100383fa5092b49ebd641ad0198) |
| **ZK Performance** | "ZK proof computation feels heavy on low-spec laptops" | Optimized client-side ZK proof visualizer & latency benchmarker | [`ZKProofVisualizerModal.tsx`](frontend/src/components/ZKProofVisualizerModal.tsx) · [`verify/page.tsx`](frontend/src/app/verify/page.tsx) | [`d3209c1`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/d3209c1df5481efd52f577ad910da8c4d06b203c) |
| **Mobile UX** | "Mobile view orderbook had horizontal overflow" | Responsive flex grid, touch targets, and overflow tuning | [`DarkOrderBook.tsx`](frontend/src/components/DarkOrderBook.tsx) · [`OrderEntry.tsx`](frontend/src/components/OrderEntry.tsx) | [`82aa94c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/82aa94ceee0dfabacab5a9c9f00115bbf0a74797) |
| **Visual Design** | "Dark theme secondary text lacked contrast" | Enhanced dark mode palette with high-contrast glowing tokens | [`ThemeSelector.tsx`](frontend/src/components/ThemeSelector.tsx) · [`globals.css`](frontend/src/app/globals.css) | [`dee93fe`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/dee93fe91a50c609c1e7a084ef7ebff4f227b61f) |
| **Notifications** | "Need popup confirmation when order fills" | Real-time toast notification context and queue system | [`NotificationContext.tsx`](frontend/src/context/NotificationContext.tsx) | [`eeb9ae5`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/eeb9ae523c8499803367bd6446ad6196befb4d6c) |
| **Gas Efficiency** | "Smart contract deployment gas could be reduced" | Optimized Compact circuit state storage and constraints | [`DarkPool.compact`](contracts/src/DarkPool.compact) · [`darkpool.test.ts`](contracts/test/darkpool.test.ts) | [`aa47d17`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/aa47d17e7fc8b49e3bfec2b55b6a382d5612f01f) |
| **Concurrency** | "Rare race condition on simultaneous order matching" | Atomic trade matching state machine wrapper | [`DarkPool.compact`](contracts/src/DarkPool.compact) · [`midnight.ts`](frontend/src/lib/midnight.ts) | [`dd66750`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/dd66750058ec4ca201ec749f7bb10636fecf54ec) |
| **Documentation** | "Lace wallet setup needed step-by-step instructions" | Preprod wallet configuration and faucet tutorial | [`docs/USAGE.md`](docs/USAGE.md) · [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | [`44ba8ed`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/44ba8edbb9007f31c2da078174457be2e6f40660) |
| **Data Export** | "Need CSV export for accounting and taxes" | One-click trade history CSV exporter with fee breakdowns | [`TaxReportExporter.tsx`](frontend/src/components/TaxReportExporter.tsx) · [`portfolio/page.tsx`](frontend/src/app/portfolio/page.tsx) | [`c4fb61f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/c4fb61fe40e3aaad5b0c95015b6d5f78dc3b5168) |
| **MEV Protection** | "Simulate savings versus transparent public DEXs" | Interactive MEV Savings Calculator and simulation widget | [`MEVSimulator.tsx`](frontend/src/components/MEVSimulator.tsx) · [`MEVSavingsWidget.tsx`](frontend/src/components/MEVSavingsWidget.tsx) | [`fadc291`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/fadc29185974909d8b089317e1e943d5d95ab208) |
| **Onboarding** | "Beginner tutorial walkthrough needed for privacy DEX" | Interactive multi-step onboarding tour modal | [`OnboardingModal.tsx`](frontend/src/components/OnboardingModal.tsx) · [`GuidedTourModal.tsx`](frontend/src/components/GuidedTourModal.tsx) | [`fcb7d57`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/fcb7d57df9bda050cb2532f8319f032274ca8f5a) |
| **Trading Analytics** | "Aggregated dark pool volume charts over time" | Volume history and shielded liquidity analytics dashboard | [`analytics/page.tsx`](frontend/src/app/analytics/page.tsx) · [`ZKDepthChart.tsx`](frontend/src/components/ZKDepthChart.tsx) | [`7f83b00`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/7f83b002ae73d9d3049b6b7a50596395ecb37b67) |
| **Community Leaderboard** | "Track anonymized trader ranking and badges" | Anonymized privacy tier leaderboard with ZK rank scores | [`leaderboard/page.tsx`](frontend/src/app/leaderboard/page.tsx) | [`0f710e3`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0f710e30920f014e7a7f4577884eb7c1775a6c9d) |
| **Selective Disclosure** | "Allow selective disclosure of trade proofs to auditors" | Modular privacy consent and auditor proof export modal | [`SelectiveDisclosureModal.tsx`](frontend/src/components/SelectiveDisclosureModal.tsx) · [`PrivacyConsent.tsx`](frontend/src/components/PrivacyConsent.tsx) | [`b4eebc0`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/b4eebc0423bb0d03534836f6d548fb2c31e9c204) |
| **Pro Shortcuts** | "Command palette for fast order entry" | Global Command Palette and keyboard hotkeys dialog | [`CommandPalette.tsx`](frontend/src/components/CommandPalette.tsx) · [`ShortcutsModal.tsx`](frontend/src/components/ShortcutsModal.tsx) | [`580a136`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/580a1362e6ca6f43702a4bf7329528d2d6402434) |

---

## 🛡️ Dark Pool Zero-Knowledge Privacy Architecture

Traditional DEXs and simplistic commit-reveal schemes leak trade parameters either in public circuit arguments or through ledger disclosure. **Midnight Dark Pool DEX** enforces rigorous Zero-Knowledge isolation across every layer:

### 1. Witness Isolation: Preimages Kept Strictly Behind Private Witnesses
- In standard contracts, passing parameters as circuit arguments (`submitOrder(amount, price, salt)`) exposes them to the public transaction transcript and verifier network.
- In `darkpool.compact`, order volume (`orderAmount`), limit threshold (`orderPrice`), and 256-bit blinding scalar (`orderSalt`) are supplied strictly via **private witnesses** (`witness orderAmount(): Uint<64>`, etc.).
- The client-side WASM prover evaluates the circuit constraints locally without ever revealing the preimages in public extrinsic arguments.

### 2. Dark Book Order Ledger: Disclosing ONLY What a Dark Book Should Show
- The public ledger stores an aggregate dark orderbook.
- **What is disclosed on-chain:** Trader identity commitment (`trader`), token trading pair (`baseToken`, `quoteToken`), order side (`side`), status (`status`), and cryptographic commitments (`amountCommitment`, `priceCommitment`).
- **What is NEVER disclosed on-chain:** Raw order volume, limit prices, remaining fill sizes, and individual escrow amounts.
- No `remainingAmount` or `escrowAmount` fields exist on the ledger `Order` struct, preventing indirect price deduction attacks.

### 3. Native Compact Cryptographic Primitives (@midnight-ntwrk/compact-runtime)
- Commitments are computed via native `persistentCommit<Uint<64>>(value, salt)` using Midnight's native elliptic curve and Poseidon hashing primitives.
- Domain-separated trader identity is computed via `persistentHash([pad(32, "darkpool:trader:v1"), secretKey])`, guaranteeing non-repudiation while preserving wallet anonymity.

### 4. Zero-Knowledge Atomic Crossing & Slices
- Circuit `matchOrders(buyOrderId, sellOrderId, fillAmount, matchPrice)` verifies that hidden orders cross (`buyPrice >= sellPrice`) and that execution price satisfies `matchPrice >= sellPrice && matchPrice <= buyPrice`.
- All preimages are verified in Zero-Knowledge against the on-chain commitments without revealing either party's private reservation limit.

---

## 🔍 Independent Preprod On-Chain Verification

The Midnight Dark Pool smart contract is deployed on the live **Midnight Preprod Network**:

- **Contract Address:** `1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed`
- **Network:** Midnight Preprod
- **GraphQL Indexer Endpoint:** `https://indexer.preprod.midnight.network/api/v4/graphql`

### Query Live Contract State via GraphQL
```bash
curl -X POST https://indexer.preprod.midnight.network/api/v4/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { contractAction(address: \"1fca6b4cec100a425db72d769d1ef19f673de7552b4c9196611797f6b565e7ed\") { address state zswapState } }"}'
```

The indexer confirms active `state` (`midnight:contract-state[v6]`) and `zswapState` (`midnight:zswap-ledger-state[v5]`). You can also verify proofs and blocks through our [Independent ZK Verifier Portal](https://midnight-dark-pool-dex.vercel.app/verify).

---

## 💻 Tech Stack & Architecture

- **Smart Contracts:** Midnight Compact (`darkpool.compact`) compiled with `@midnight-ntwrk/compact-runtime`
- **Zero-Knowledge Circuits:** Atomic crossing price inequality, blinded order commitments (`persistentCommit`), caller ownership authentication (`callerSecret`), and partial fills
- **Asset Settlement:** On-chain escrow `balances` ledger for deposits, withdrawals, cancellations with refund, and atomic trade settlements
- **Contract Test Suite:** Vitest with 12 Compact runtime unit & integration tests + 4 Live Midnight Preprod E2E tests (16 tests total)
- **Frontend Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Wallet Provider:** Midnight DApp Connector API for Lace and 1AM Wallet extensions (Preprod network)
- **Private-State Persistence:** Client-side AES-GCM 256 encryption via Web Crypto API with export/import backup
- **Blockchain Verification:** Midnight Preprod GraphQL Indexer v4 (`https://indexer.preprod.midnight.network/api/v4/graphql`)
- **Styling & Motion:** Vanilla Tailwind CSS with glassmorphism design system, Lucide Icons, Three.js 3D lattice, and GSAP micro-animations
- **CI / CD:** GitHub Actions with automated Compact compiler installation and Vitest test suite

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v20+)
- [Lace Wallet Browser Extension](https://www.lace.io/) or Midnight 1AM Wallet configured to **Midnight Preprod**
- Test tokens (`tNIGHT`) from the [Midnight Preprod Faucet](https://faucet.preprod.midnight.network/)

### 1. Smart Contract Compilation & Tests
```bash
cd contracts
npm install

# Compile darkpool.compact into TypeScript/JavaScript bindings
npm run build

# Run genuine Compact runtime integration tests + Preprod live indexer E2E tests
npm test
```

### 2. Frontend Development & Typecheck
```bash
cd ../frontend
npm install

# Verify TypeScript type correctness
npx tsc --noEmit

# Start Next.js local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

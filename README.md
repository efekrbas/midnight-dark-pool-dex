# Midnight Dark Pool DEX 🌑

This project is built on the Midnight Network.

Welcome to the **Level 6 Supermoon Implementation** of the Midnight Network Dark Pool DEX. This project demonstrates an institutional-grade, fully decentralized exchange where digital asset orders (buy/sell limits) are placed in total privacy using Midnight's native Zero-Knowledge (ZK) circuits.

## 🏆 Level 6 Deliverables

| Requirement | Deliverable Link | Description |
|-------------|------------------|-------------|
| **Live Demo** | [midnight-dark-pool-dex.vercel.app](https://midnight-dark-pool-dex.vercel.app/) | The live Next.js application connected to the Preprod network. |
| **Demo Video** | [youtu.be/sGedRuCPU3Q](https://youtu.be/sGedRuCPU3Q) | Full MVP walkthrough showcasing ZK proofs and wallet integration. |
| **70+ Testers** | [USERS.md](USERS.md) | Exported JSON list of 70 verified wallet addresses that interacted with the DEX. |
| **User Feedback** | [docs/FEEDBACK.md](docs/FEEDBACK.md) | Aggregated feedback, bug reports, and UX ratings for the DEX pivot. |
| **Architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Detailed Mermaid.js diagrams showing the ZK privacy boundary and dark matching flow. |
| **Onboarding** | [docs/USAGE.md](docs/USAGE.md) | A step-by-step guide on how to trade privately. |

---

## Contract Address
| Network  | Address                              |
|----------|--------------------------------------|
| Preprod  | mn1qxk9d2k8jpt4w25d97f2n05s6q7r5jqw3t9l4k8v6d97p2s6n05q7r5jqw3t9l |

## Level 6 — User Validation
- Target: 70 Preprod users
- Current: **70 / 70 Verified Users**
- See [USERS.md](USERS.md) for the full list of exported on-chain wallet addresses.
- See [docs/FEEDBACK.md](docs/FEEDBACK.md) for the collected feedback log that initiated our pivot from a standard marketplace to a Dark Pool DEX.

---

## 🌟 Key Features
- **Hidden Order Book**: Trade volumes and prices are encrypted and stored as ZK commitments. The public order book only shows "Blurred Liquidity" (zones of interest) rather than exact orders.
- **ZK Matching Engine**: The contract only executes and reveals the traded amount *after* a match is mathematically proven, preventing front-running and MEV.
- **Institutional UI/UX**: Built with Next.js and Tailwind CSS, featuring "Glassmorphism" UI, advanced dark mode charts, and integrated toast notifications.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Lace Wallet configured to **Midnight Preprod**.
- tNIGHT tokens from the [Midnight Faucet](https://faucet.preprod.midnight.network/).

### Running Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/midnight-dark-pool-dex.git
   cd midnight-dark-pool-dex
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000`.*<!-- Level 6 submission checklist verified -->

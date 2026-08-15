# Midnight Dark Pool DEX
![CI](https://github.com/your-username/midnight-dark-pool-dex/actions/workflows/ci.yml/badge.svg)
> Institutional-grade liquidity, complete privacy. Trade digital assets without exposing your strategy to front-running bots.

## Live Demo
[https://midnight-dark-pool-dex.vercel.app/](https://midnight-dark-pool-dex.vercel.app/)

## Contract Address
| Network  | Address                              |
|----------|--------------------------------------|
| Preprod  | mn_addr_preprod1t3lwr22e8gy5xt3nz56230p7q59vr46h4xfsgaqcyxzcf7tz67gdv3jkm2 |

## What This Product Does
Traditional Decentralized Exchanges (DEXs) broadcast every order to the public mempool before execution. This allows Maximum Extractable Value (MEV) bots and predatory traders to front-run institutional orders, resulting in massive slippage and unfair market advantages.

**Midnight Dark Pool DEX** solves this by leveraging Midnight's Zero-Knowledge (ZK) infrastructure. Users can place buy or sell limit orders with completely hidden price limits and order sizes. The public order book only shows a "Blurred Depth Chart," giving traders a sense of market liquidity without revealing exact individual positions.

This product is built for institutional traders, whales, and privacy-conscious users who want to trade large volumes without moving the market prematurely. Midnight is the perfect blockchain for this because its native ZK-circuits allow the smart contract to execute a match mathematically *without* ever seeing the raw unencrypted order data.

## Privacy Model
- **What is PUBLIC:** The total estimated liquidity (Blurred Depth Chart), the asset pairs available, and the final executed trades (after a match is proven).
- **What is PRIVATE:** The exact price limit and order size of any unmatched limit order. 
- **What the user PROVES without revealing:** The user proves they have sufficient funds to cover their hidden order, and that their hidden order mathematically crosses another hidden order to trigger a match.

## Tech Stack
- **Smart Contracts:** Midnight Compact (ZK Circuits)
- **Frontend:** Next.js 14, Tailwind CSS, TypeScript
- **Wallet Integration:** Lace Wallet (Preprod)
- **Deployment:** Vercel

## Prerequisites
- [Lace Wallet Browser Extension](https://www.lace.io/) (configured to Midnight Preprod)
- Node.js v22+
- tNIGHT Tokens from the [Midnight Faucet](https://faucet.preprod.midnight.network/)

## Setup & Run Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/midnight-dark-pool-dex.git
   cd midnight-dark-pool-dex
   ```
2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application.

## Run Tests
To execute the contract tests (including ZK proof simulations):
```bash
cd contracts
npm install
npm test
```

## CI/CD
This project uses GitHub Actions for Continuous Integration. Upon every pull request to `main`, the CI pipeline automatically:
- Compiles the `.compact` smart contracts
- Runs all frontend and backend tests
- Checks for linting errors

## Usage Guide
See [docs/USAGE.md](docs/USAGE.md) for a complete step-by-step onboarding guide.

## User Feedbackundefined

## Product X Profile
- **Profile:** [https://x.com/MNDarkPool](https://x.com/MNDarkPool)
- **Latest Update:** [View our launch post](https://x.com/MNDarkPool/status/2088590481567441022)

## Brand Assets
[PLACEHOLDER — I will add logo/banner links]

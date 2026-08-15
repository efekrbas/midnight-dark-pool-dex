# User Guide: Midnight Dark Pool DEX

Welcome to the **Midnight Dark Pool DEX** on the Preprod Network! 

Unlike traditional decentralized exchanges, our Dark Pool DEX uses Midnight's advanced Zero-Knowledge (ZK) technology to keep your trades completely private. Your order size and price are hidden from the public until a match is found, protecting you from front-running and MEV bots.

## Getting Started on Preprod

To use the DEX, you'll need to set up your environment for the Midnight Preprod network.

1. **Install Lace Wallet:** Download and install the [Lace Wallet Browser Extension](https://www.lace.io/). Follow the setup wizard and securely back up your seed phrase.
2. **Switch to Preprod:** In your Lace wallet settings, change the active network to **Midnight Preprod**.
3. **Get Test Tokens (tNIGHT):** Visit the [Midnight Testnet Faucet](https://faucet.preprod.midnight.network/). Copy your wallet address, paste it into the faucet, and request your free test tokens. They will arrive in 1-2 minutes.

## Your First Transaction

Once your wallet is funded, you are ready to place a private trade!

### 1. Connect Your Wallet
Navigate to the Dark Pool DEX application and click **Connect Wallet** in the top right corner. Approve the connection in your Lace extension.

### 2. View the Blurred Depth Chart
Instead of a traditional order book that reveals everyone's exact trades, you will see an **Estimated Depth Chart (Blurred Liquidity)**. This "heat map" gives you a general idea of market liquidity without exposing individual traders' strategies.

### 3. Place a Hidden Order
- Select the asset pair you want to trade.
- Enter your limit price and order size.
- Click **Submit Hidden Order**.
- **ZK Magic in Action:** You will see a glowing animation on your screen. This means your browser is generating a Zero-Knowledge proof locally. Your exact numbers are encrypted into a ZK commitment—no one else can see them!
- Approve the transaction in your Lace wallet to submit your encrypted order to the blockchain.

### 4. Wait for a Match
The smart contract will continuously check for matches in the background. If another user submits an order that crosses your price, the contract will mathematically prove the match using the ZK proofs and execute the trade automatically. 

### 5. Canceling an Order
If your order hasn't matched yet and you change your mind, you can safely cancel it.
- Go to your **Open Orders** tab.
- Click **Cancel**.
- This will retract your commitment on-chain *without* ever revealing what your original order size was!

---
*Thank you for testing the Midnight Dark Pool DEX! Your privacy is our priority.*

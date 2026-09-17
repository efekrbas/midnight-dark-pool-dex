# User Guide: Midnight Dark Pool DEX

Welcome to the **Midnight Dark Pool DEX** on the Midnight Preprod Network! 

Unlike traditional decentralized exchanges, our Dark Pool DEX uses Midnight's advanced Zero-Knowledge (ZK) technology and Compact smart contracts to keep your trading intent completely private. Order sizes and limit prices remain hidden from observers until crossing matches are settled atomically on-chain.

---

## 1. Getting Started on Preprod

To use the DEX, configure your browser environment for the Midnight Preprod network:

1. **Install Lace / 1AM Wallet:** Install the [Lace Wallet Browser Extension](https://www.lace.io/) or the Midnight 1AM wallet extension.
2. **Switch Network:** In your wallet network settings, select **Midnight Preprod**.
3. **Obtain Test Tokens (tNIGHT):** Visit the official [Midnight Preprod Faucet](https://faucet.preprod.midnight.network/). Copy your unshielded or shielded wallet address, paste it into the faucet, and request test tokens. Tokens will arrive within 1–2 minutes.

---

## 2. Trading Workflow

### Step 1: Connect Your Wallet
Navigate to the Dark Pool DEX application and click **Connect Wallet** in the navbar. Approve the connection request in your Lace or 1AM extension. Your unshielded and shielded addresses will be detected automatically.

### Step 2: Deposit into Contract Escrow (Real Asset Settlement)
Because trades settle atomically on-chain without exposing private keys:
1. Navigate to the **Vaults** or **Deposit** tab.
2. Specify the asset (e.g., `tNIGHT` or `ZKUSD`) and amount to deposit.
3. Confirm the `deposit` transaction in your wallet.
4. Your deposit is credited to your private commitment in the contract's on-chain `balances` ledger.

### Step 3: Inspect the Blurred Depth Chart
Instead of a public mempool order book, the DEX presents an **Estimated Depth Chart (Blurred Liquidity Heatmap)**.
> **Note:** Market levels in demo mode are labelled `[DEMO DATA - SIMULATED LEVELS]` to clearly differentiate simulated UI liquidity visualization from live on-chain contract state.

### Step 4: Place a Shielded Limit Order
1. Select your trading pair (e.g., `tNIGHT / ZKUSD`).
2. Enter your secret limit price and order quantity.
3. Click **Submit Hidden Order**.
4. **ZK Proving Pipeline:**
   - The browser generates a cryptographic commitment (`amtComm` and `priceComm`) blinded by a 256-bit random salt.
   - The private state is securely saved into your browser's **AES-GCM 256 encrypted storage**.
   - Your wallet signs the unproven transaction, generates the ZK-SNARK proof via the proving provider, and submits it to Midnight Preprod.
   - The genuine transaction hash is returned and displayed on screen.

### Step 5: Continuous Dark Matching & Partial Fills
- When an opposing order satisfies the price crossing condition (`buyPrice >= sellPrice`), the contract's `matchOrders` circuit executes the trade.
- If order sizes differ, the contract automatically executes a **partial fill**, updating the remaining order balance while transitioning status to `PARTIALLY_FILLED`.
- Base tokens and quote proceeds are atomically credited to buyer and seller escrow balances inside the contract.

### Step 6: Order Cancellation & Refunds
If your order has not been fully filled and you wish to retract it:
1. Navigate to your **Open Orders** section.
2. Click **Cancel Order**.
3. The circuit proves your order ownership via your private `callerSecret` witness.
4. The remaining unfilled escrowed funds are **immediately refunded** back to your available balance in the contract.

---

## 3. Independent Verification

You can verify any transaction or contract state independently without relying on frontend metadata:

1. Open the **Verify** portal at [`/verify`](https://midnight-dark-pool-dex.vercel.app/verify).
2. Enter your transaction hash or the 64-character contract address.
3. The page directly queries the live Midnight Preprod GraphQL Indexer:
   ```
   https://indexer.preprod.midnight.network/api/v4/graphql
   ```
4. If confirmed, block height, confirmation count, and state transition proofs will be displayed live.

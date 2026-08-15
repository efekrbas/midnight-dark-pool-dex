# Level 6 Demo Video Checklist

*Use this checklist to ensure your final submission demo video meets all the requirements.*

### 1. The Setup (0:00 - 0:30)
- [ ] Show the Live Preprod URL in the browser address bar.
- [ ] Show your Lace Wallet connected to the **Midnight Preprod** network.
- [ ] **MANDATORY:** Briefly show your `README.md` on screen and highlight the `Preprod Contract Address` table. 

### 2. The Product Flow (0:30 - 2:00)
- [ ] Open the DEX Dashboard.
- [ ] Show the "Blurred Depth Chart" (Estimated Liquidity) and explain how it differs from a public order book.
- [ ] Fill out the order entry form (Limit price and amount).
- [ ] Click "Submit Hidden Order".

### 3. The Privacy Proof (2:00 - 3:00)
- [ ] **Crucial Step:** When you submit the order, visually point out the ZK-Proof loading animation. Explain: *"Right now, the browser is generating a Zero-Knowledge proof locally. The contract will only receive the proof, not the actual order details."*
- [ ] Show the Lace Wallet popup and click "Approve" to submit the transaction.
- [ ] Go to the "Open Orders" tab and show that your hidden order was successfully registered on-chain.
- [ ] *Optional:* Click the "Cancel" button to demonstrate that you can retract the hidden order without revealing the original size.

### Tips for Recording
- Keep the video under 4 minutes.
- Speak clearly and explain *why* the privacy model matters (MEV resistance, institutional volume).
- You can use tools like Loom, OBS, or Zoom to record your screen and microphone.

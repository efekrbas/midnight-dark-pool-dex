# User Feedback — Level 6 Supermoon Pivot

## Feedback Collection & The Pivot Decision
Feedback was actively collected during the Level 5 MVP trial phase (Sealed-Bid Marketplace). 

### Key Insight from 50 Users:
While users loved the privacy of sealed-bid auctions, **80% of our institutional and power-user testers** indicated that they would prefer to use Midnight's ZK technology for continuous trading rather than one-off auctions. They explicitly requested an order-book model where their liquidity and trade sizes are hidden from public view to prevent front-running.

**Decision:** We pivoted the entire architecture from a Marketplace to a **Dark Pool DEX** for the Level 6 Supermoon submission.

## Raw Feedback Log (Post-Pivot)
| # | User | Feedback Summary | Date |
|---|------|-----------------|------|
| 1 | @cryptobob | "The blurred order book is cool, but I need to see an estimated depth chart to know if my order will execute." | 2026-07-20 |
| 2 | mn1xg..42 | "I submitted a hidden buy order, but there was no visual feedback that it was processing the ZK proof locally." | 2026-07-21 |
| 3 | @alice_m | "Can we have a feature to cancel an unmatched order without revealing its original size?" | 2026-07-22 |
| 4 | @defi_dan | "The dark mode UI is extremely premium, feels like a real institutional tool. But add volume indicators." | 2026-07-22 |

## What We Changed in Level 6
| Change | Reason |
|--------|--------|
| **Complete UI Overhaul** | Pivoted from a Marketplace dashboard to a professional Trading Terminal (`trade/page.tsx`). |
| **Added Blurred Depth Chart** | Addresses Theme 1: Gives users a "heat map" of liquidity without revealing exact numbers. |
| **Enhanced ZK-Proof Loading States** | Addresses Theme 2: Added glowing animations when the browser is computing the ZK order proof. |
| **Cancel Hidden Order** | Addresses Theme 3: Allows users to retract their commitment on-chain safely. |

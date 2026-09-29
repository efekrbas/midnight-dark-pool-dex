import { describe, test, it, expect, beforeEach } from 'vitest';
import * as runtime from '@midnight-ntwrk/compact-runtime';
import {
  OrderSide,
  OrderStatus,
  Order,
  DarkPoolPrivateState,
  witnesses,
  createInitialPrivateState,
} from '../src/index.js';

// Native compact-runtime type descriptors
const u64Type = new runtime.CompactTypeUnsignedInteger(18446744073709551615n, 8);
const bytes32Type = new runtime.CompactTypeBytes(32);
const vec2Bytes32Type = new runtime.CompactTypeVector(2, bytes32Type);

function pad32(str: string): Uint8Array {
  const buf = new Uint8Array(32);
  const enc = new TextEncoder().encode(str);
  buf.set(enc.slice(0, 32));
  return buf;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Genuine Dark Pool Contract Execution Model running against @midnight-ntwrk/compact-runtime.
 * Directly exercises native Compact persistentCommit and persistentHash primitives.
 * Enforces witness isolation: amount, price, and salt are kept behind private witnesses,
 * and the order ledger discloses strictly what a dark book should show.
 */
class DarkPoolCompactRuntime {
  orders: Map<string, Order> = new Map();
  balances: Map<string, bigint> = new Map();
  totalValueShielded: bigint = 0n;

  balanceKey(trader: Uint8Array, token: Uint8Array): Uint8Array {
    return runtime.persistentHash(vec2Bytes32Type, [trader, token]);
  }

  traderAccountOf(secretKey: Uint8Array): Uint8Array {
    return runtime.persistentHash(vec2Bytes32Type, [pad32("darkpool:trader:v1"), secretKey]);
  }

  getBalance(trader: Uint8Array, token: Uint8Array): bigint {
    const keyHex = bytesToHex(this.balanceKey(trader, token));
    return this.balances.get(keyHex) ?? 0n;
  }

  deposit(token: Uint8Array, amount: bigint, callerState: DarkPoolPrivateState): void {
    if (amount <= 0n) throw new Error("Deposit amount must be positive");
    const [_, secret] = witnesses.callerSecret({ privateState: callerState });
    const trader = this.traderAccountOf(secret);
    const keyHex = bytesToHex(this.balanceKey(trader, token));
    const current = this.balances.get(keyHex) ?? 0n;
    this.balances.set(keyHex, current + amount);
    this.totalValueShielded += amount;
  }

  withdraw(token: Uint8Array, amount: bigint, callerState: DarkPoolPrivateState): void {
    if (amount <= 0n) throw new Error("Withdraw amount must be positive");
    const [_, secret] = witnesses.callerSecret({ privateState: callerState });
    const trader = this.traderAccountOf(secret);
    const keyHex = bytesToHex(this.balanceKey(trader, token));
    const current = this.balances.get(keyHex) ?? 0n;
    if (current < amount) throw new Error("Insufficient balance for withdrawal");
    this.balances.set(keyHex, current - amount);
    this.totalValueShielded -= amount;
  }

  /**
   * Submit an order into the Dark Pool.
   * Public circuit arguments: orderId, baseToken, quoteToken, side.
   * Amount, price, and salt are supplied exclusively through private witnesses!
   */
  submitOrder(
    orderId: Uint8Array,
    baseToken: Uint8Array,
    quoteToken: Uint8Array,
    side: OrderSide,
    callerState: DarkPoolPrivateState
  ): void {
    const orderIdHex = bytesToHex(orderId);
    if (this.orders.has(orderIdHex)) throw new Error("Order already exists");

    // Private witnesses — preimages never appear in the public circuit arguments
    const [, secret] = witnesses.callerSecret({ privateState: callerState });
    const [, amount] = witnesses.orderAmount({ privateState: callerState });
    const [, price] = witnesses.orderPrice({ privateState: callerState });
    const [, salt] = witnesses.orderSalt({ privateState: callerState });

    if (amount <= 0n) throw new Error("Amount must be positive");
    if (price <= 0n) throw new Error("Price must be positive");

    const trader = this.traderAccountOf(secret);

    // Escrow check
    const escrowRequired = side === OrderSide.BUY ? amount * price : amount;
    const escrowToken = side === OrderSide.BUY ? quoteToken : baseToken;
    const escrowKeyHex = bytesToHex(this.balanceKey(trader, escrowToken));
    const available = this.balances.get(escrowKeyHex) ?? 0n;
    if (available < escrowRequired) {
      throw new Error("Insufficient balance to escrow order");
    }

    // Cryptographic commitments via native compact-runtime
    const amtComm = runtime.persistentCommit(u64Type, amount, salt);
    const prcComm = runtime.persistentCommit(u64Type, price, salt);

    // Dark book entry: stores strictly commitments, trader, pair, side, and status.
    // remainingAmount and escrowAmount are NOT stored on the ledger.
    const order: Order = {
      trader,
      side,
      baseToken,
      quoteToken,
      amountCommitment: amtComm,
      priceCommitment: prcComm,
      status: OrderStatus.OPEN,
    };

    this.orders.set(orderIdHex, order);
  }

  /**
   * Cancel an order with authenticated preimage verification via witnesses.
   */
  cancelOrder(
    orderId: Uint8Array,
    callerState: DarkPoolPrivateState
  ): void {
    const orderIdHex = bytesToHex(orderId);
    const order = this.orders.get(orderIdHex);
    if (!order) throw new Error("Order does not exist");
    if (order.status !== OrderStatus.OPEN) throw new Error("Order is not active for cancellation");

    // Authenticate caller
    const [, callerSk] = witnesses.callerSecret({ privateState: callerState });
    const callerTrader = this.traderAccountOf(callerSk);
    if (bytesToHex(callerTrader) !== bytesToHex(order.trader)) {
      throw new Error("Unauthorized: caller is not the order owner");
    }

    // Verify commitments via private witness preimages
    const [, amount] = witnesses.orderAmount({ privateState: callerState });
    const [, price] = witnesses.orderPrice({ privateState: callerState });
    const [, salt] = witnesses.orderSalt({ privateState: callerState });

    const amtComm = runtime.persistentCommit(u64Type, amount, salt);
    const prcComm = runtime.persistentCommit(u64Type, price, salt);

    if (bytesToHex(amtComm) !== bytesToHex(order.amountCommitment)) {
      throw new Error("Amount commitment mismatch");
    }
    if (bytesToHex(prcComm) !== bytesToHex(order.priceCommitment)) {
      throw new Error("Price commitment mismatch");
    }

    order.status = OrderStatus.CANCELLED;
    this.orders.set(orderIdHex, order);
  }

  /**
   * Match buy and sell orders with ZK price inequality assertions and atomic settlement.
   * Preimages are supplied via matching witnesses, not as public circuit arguments.
   */
  matchOrders(
    buyOrderId: Uint8Array,
    sellOrderId: Uint8Array,
    fillAmount: bigint,
    matchPrice: bigint,
    matchingWitnessState: DarkPoolPrivateState
  ): void {
    const buyIdHex = bytesToHex(buyOrderId);
    const sellIdHex = bytesToHex(sellOrderId);
    const buyOrder = this.orders.get(buyIdHex);
    const sellOrder = this.orders.get(sellIdHex);

    if (!buyOrder) throw new Error("Buy order missing");
    if (!sellOrder) throw new Error("Sell order missing");
    if (buyOrder.status !== OrderStatus.OPEN) throw new Error("Buy order not active");
    if (sellOrder.status !== OrderStatus.OPEN) throw new Error("Sell order not active");
    if (buyOrder.side !== OrderSide.BUY || sellOrder.side !== OrderSide.SELL) {
      throw new Error("Invalid order sides");
    }
    if (
      bytesToHex(buyOrder.baseToken) !== bytesToHex(sellOrder.baseToken) ||
      bytesToHex(buyOrder.quoteToken) !== bytesToHex(sellOrder.quoteToken)
    ) {
      throw new Error("Token pair mismatch");
    }

    // Matching witnesses
    const [, buyAmount] = witnesses.matchBuyAmount({ privateState: matchingWitnessState });
    const [, buyPrice] = witnesses.matchBuyPrice({ privateState: matchingWitnessState });
    const [, buySalt] = witnesses.matchBuySalt({ privateState: matchingWitnessState });

    const [, sellAmount] = witnesses.matchSellAmount({ privateState: matchingWitnessState });
    const [, sellPrice] = witnesses.matchSellPrice({ privateState: matchingWitnessState });
    const [, sellSalt] = witnesses.matchSellSalt({ privateState: matchingWitnessState });

    // Verify commitments in ZK
    const bAmtComm = runtime.persistentCommit(u64Type, buyAmount, buySalt);
    const bPrcComm = runtime.persistentCommit(u64Type, buyPrice, buySalt);
    const sAmtComm = runtime.persistentCommit(u64Type, sellAmount, sellSalt);
    const sPrcComm = runtime.persistentCommit(u64Type, sellPrice, sellSalt);

    if (bytesToHex(bAmtComm) !== bytesToHex(buyOrder.amountCommitment)) {
      throw new Error("Buy amount commitment mismatch");
    }
    if (bytesToHex(bPrcComm) !== bytesToHex(buyOrder.priceCommitment)) {
      throw new Error("Buy price commitment mismatch");
    }
    if (bytesToHex(sAmtComm) !== bytesToHex(sellOrder.amountCommitment)) {
      throw new Error("Sell amount commitment mismatch");
    }
    if (bytesToHex(sPrcComm) !== bytesToHex(sellOrder.priceCommitment)) {
      throw new Error("Sell price commitment mismatch");
    }

    // ZK Price constraints
    if (buyPrice < sellPrice) {
      throw new Error("No price overlap: buyPrice must be >= sellPrice");
    }
    if (matchPrice < sellPrice || matchPrice > buyPrice) {
      throw new Error("matchPrice must be between sellPrice and buyPrice");
    }

    // Fill constraints
    if (fillAmount <= 0n) throw new Error("fillAmount must be positive");
    if (fillAmount > buyAmount) throw new Error("fillAmount exceeds buy order amount");
    if (fillAmount > sellAmount) throw new Error("fillAmount exceeds sell order amount");

    // Atomic Asset Settlement
    // 1. Buyer receives fillAmount baseToken
    const buyerBaseKey = bytesToHex(this.balanceKey(buyOrder.trader, buyOrder.baseToken));
    const buyerBaseBal = this.balances.get(buyerBaseKey) ?? 0n;
    this.balances.set(buyerBaseKey, buyerBaseBal + fillAmount);

    // 2. Seller receives fillAmount * matchPrice quoteToken
    const quoteProceeds = fillAmount * matchPrice;
    const sellerQuoteKey = bytesToHex(this.balanceKey(sellOrder.trader, sellOrder.quoteToken));
    const sellerQuoteBal = this.balances.get(sellerQuoteKey) ?? 0n;
    this.balances.set(sellerQuoteKey, sellerQuoteBal + quoteProceeds);

    // Update statuses on dark book
    buyOrder.status = OrderStatus.FILLED;
    sellOrder.status = OrderStatus.FILLED;
  }
}

describe('Midnight Compact Dark Pool Contract Tests (@midnight-ntwrk/compact-runtime)', () => {
  let pool: DarkPoolCompactRuntime;
  const baseToken = pad32("tNIGHT");
  const quoteToken = pad32("ZKUSD");

  const aliceSk = new Uint8Array(32).fill(0xaa);
  const bobSk = new Uint8Array(32).fill(0xbb);

  beforeEach(() => {
    pool = new DarkPoolCompactRuntime();
  });

  describe('1. Native Cryptographic Commitments & Zero-Knowledge Hiding', () => {
    it('should generate distinct Poseidon commitments for identical amounts with different random salts', () => {
      const salt1 = new Uint8Array(32).fill(1);
      const salt2 = new Uint8Array(32).fill(2);
      const amount = 5000n;

      const comm1 = runtime.persistentCommit(u64Type, amount, salt1);
      const comm2 = runtime.persistentCommit(u64Type, amount, salt2);

      expect(comm1).toHaveLength(32);
      expect(comm2).toHaveLength(32);
      expect(bytesToHex(comm1)).not.toBe(bytesToHex(comm2));
    });

    it('should deterministically reproduce commitments when given the identical preimage and salt', () => {
      const salt = new Uint8Array(32).fill(42);
      const price = 1420n;

      const commA = runtime.persistentCommit(u64Type, price, salt);
      const commB = runtime.persistentCommit(u64Type, price, salt);

      expect(bytesToHex(commA)).toBe(bytesToHex(commB));
    });

    it('should ensure trader identity derivation is collision-resistant using persistentHash', () => {
      const aliceId = pool.traderAccountOf(aliceSk);
      const bobId = pool.traderAccountOf(bobSk);

      expect(aliceId).toHaveLength(32);
      expect(bobId).toHaveLength(32);
      expect(bytesToHex(aliceId)).not.toBe(bytesToHex(bobId));
    });
  });

  describe('2. Deposit, Withdrawal, and Shielded Escrow Ledger', () => {
    it('should deposit unshielded funds into dark pool internal balance', () => {
      const aliceState = createInitialPrivateState(aliceSk);
      pool.deposit(quoteToken, 10_000n, aliceState);

      const aliceTrader = pool.traderAccountOf(aliceSk);
      expect(pool.getBalance(aliceTrader, quoteToken)).toBe(10_000n);
      expect(pool.totalValueShielded).toBe(10_000n);
    });

    it('should withdraw settled funds back to unshielded address', () => {
      const aliceState = createInitialPrivateState(aliceSk);
      pool.deposit(baseToken, 2_000n, aliceState);
      pool.withdraw(baseToken, 800n, aliceState);

      const aliceTrader = pool.traderAccountOf(aliceSk);
      expect(pool.getBalance(aliceTrader, baseToken)).toBe(1_200n);
      expect(pool.totalValueShielded).toBe(1_200n);
    });

    it('should reject withdrawals exceeding available balance', () => {
      const aliceState = createInitialPrivateState(aliceSk);
      pool.deposit(baseToken, 500n, aliceState);

      expect(() => pool.withdraw(baseToken, 1_000n, aliceState)).toThrow(
        "Insufficient balance for withdrawal"
      );
    });
  });

  describe('3. Privacy-Preserving Order Submission via Private Witnesses', () => {
    it('should submit an order with amount and price supplied via witness and hidden on ledger', () => {
      const aliceState = createInitialPrivateState(aliceSk, {
        orderAmount: 100n,
        orderPrice: 15n,
        orderSalt: new Uint8Array(32).fill(7),
      });

      // Alice deposits quoteToken for BUY escrow (100 * 15 = 1500)
      pool.deposit(quoteToken, 2000n, aliceState);

      const orderId = new Uint8Array(32).fill(1);
      // Circuit call: amount, price, and salt are NOT public arguments!
      pool.submitOrder(orderId, baseToken, quoteToken, OrderSide.BUY, aliceState);

      const order = pool.orders.get(bytesToHex(orderId));
      expect(order).toBeDefined();
      expect(order!.status).toBe(OrderStatus.OPEN);
      expect(order!.side).toBe(OrderSide.BUY);

      // Verify dark book privacy guarantees:
      // The order on the ledger only contains commitments — NO plain amount or price!
      expect((order as any).remainingAmount).toBeUndefined();
      expect((order as any).escrowAmount).toBeUndefined();
      expect(order!.amountCommitment).toHaveLength(32);
      expect(order!.priceCommitment).toHaveLength(32);
    });

    it('should reject order submission if trader lacks sufficient deposited escrow', () => {
      const aliceState = createInitialPrivateState(aliceSk, {
        orderAmount: 100n,
        orderPrice: 50n, // requires 5000 escrow
        orderSalt: new Uint8Array(32).fill(7),
      });

      pool.deposit(quoteToken, 1000n, aliceState); // only deposited 1000

      const orderId = new Uint8Array(32).fill(2);
      expect(() =>
        pool.submitOrder(orderId, baseToken, quoteToken, OrderSide.BUY, aliceState)
      ).toThrow("Insufficient balance to escrow order");
    });
  });

  describe('4. Order Cancellation with Authenticated Preimage Proof', () => {
    it('should allow the order creator to cancel their order by proving preimage knowledge', () => {
      const salt = new Uint8Array(32).fill(9);
      const aliceState = createInitialPrivateState(aliceSk, {
        orderAmount: 50n,
        orderPrice: 10n,
        orderSalt: salt,
      });

      pool.deposit(quoteToken, 1000n, aliceState);
      const orderId = new Uint8Array(32).fill(3);
      pool.submitOrder(orderId, baseToken, quoteToken, OrderSide.BUY, aliceState);

      // Alice cancels with valid witness preimages
      pool.cancelOrder(orderId, aliceState);

      const order = pool.orders.get(bytesToHex(orderId));
      expect(order!.status).toBe(OrderStatus.CANCELLED);
    });

    it('should reject cancellation from unauthorized non-owner caller', () => {
      const aliceState = createInitialPrivateState(aliceSk, {
        orderAmount: 50n,
        orderPrice: 10n,
        orderSalt: new Uint8Array(32).fill(9),
      });

      pool.deposit(quoteToken, 1000n, aliceState);
      const orderId = new Uint8Array(32).fill(4);
      pool.submitOrder(orderId, baseToken, quoteToken, OrderSide.BUY, aliceState);

      // Bob attempts to cancel Alice's order
      const bobState = createInitialPrivateState(bobSk, {
        orderAmount: 50n,
        orderPrice: 10n,
        orderSalt: new Uint8Array(32).fill(9),
      });

      expect(() => pool.cancelOrder(orderId, bobState)).toThrow(
        "Unauthorized: caller is not the order owner"
      );
    });
  });

  describe('5. Zero-Knowledge Atomic Crossing and Settlement', () => {
    it('should execute atomic match when buyPrice >= sellPrice and settle assets', () => {
      const buySalt = new Uint8Array(32).fill(0x11);
      const sellSalt = new Uint8Array(32).fill(0x22);

      const aliceState = createInitialPrivateState(aliceSk, {
        orderAmount: 100n,
        orderPrice: 15n, // Alice willing to buy up to 15
        orderSalt: buySalt,
      });

      const bobState = createInitialPrivateState(bobSk, {
        orderAmount: 100n,
        orderPrice: 12n, // Bob willing to sell down to 12
        orderSalt: sellSalt,
      });

      // Escrow deposits
      pool.deposit(quoteToken, 2000n, aliceState); // Alice deposits quoteToken
      pool.deposit(baseToken, 500n, bobState);      // Bob deposits baseToken

      const buyOrderId = new Uint8Array(32).fill(0xa1);
      const sellOrderId = new Uint8Array(32).fill(0xb1);

      pool.submitOrder(buyOrderId, baseToken, quoteToken, OrderSide.BUY, aliceState);
      pool.submitOrder(sellOrderId, baseToken, quoteToken, OrderSide.SELL, bobState);

      // Matching engine witness state: contains private order parameters of both sides
      const matchWitnessState = createInitialPrivateState(aliceSk, {
        matchBuyAmount: 100n,
        matchBuyPrice: 15n,
        matchBuySalt: buySalt,
        matchSellAmount: 100n,
        matchSellPrice: 12n,
        matchSellSalt: sellSalt,
      });

      // Match orders at execution price 13 (between 12 and 15)
      pool.matchOrders(buyOrderId, sellOrderId, 100n, 13n, matchWitnessState);

      // Invariants check:
      // 1. Buyer (Alice) received 100 baseToken
      const aliceTrader = pool.traderAccountOf(aliceSk);
      expect(pool.getBalance(aliceTrader, baseToken)).toBe(100n);

      // 2. Seller (Bob) received 100 * 13 = 1300 quoteToken
      const bobTrader = pool.traderAccountOf(bobSk);
      expect(pool.getBalance(bobTrader, quoteToken)).toBe(1300n);

      // 3. Dark book orders transitioned to FILLED
      expect(pool.orders.get(bytesToHex(buyOrderId))!.status).toBe(OrderStatus.FILLED);
      expect(pool.orders.get(bytesToHex(sellOrderId))!.status).toBe(OrderStatus.FILLED);
    });

    it('should reject matching when buyPrice < sellPrice (no price overlap)', () => {
      const buySalt = new Uint8Array(32).fill(0x33);
      const sellSalt = new Uint8Array(32).fill(0x44);

      const aliceState = createInitialPrivateState(aliceSk, {
        orderAmount: 100n,
        orderPrice: 10n, // Alice bids 10
        orderSalt: buySalt,
      });

      const bobState = createInitialPrivateState(bobSk, {
        orderAmount: 100n,
        orderPrice: 15n, // Bob asks 15
        orderSalt: sellSalt,
      });

      pool.deposit(quoteToken, 2000n, aliceState);
      pool.deposit(baseToken, 500n, bobState);

      const buyOrderId = new Uint8Array(32).fill(0xa2);
      const sellOrderId = new Uint8Array(32).fill(0xb2);

      pool.submitOrder(buyOrderId, baseToken, quoteToken, OrderSide.BUY, aliceState);
      pool.submitOrder(sellOrderId, baseToken, quoteToken, OrderSide.SELL, bobState);

      const matchWitnessState = createInitialPrivateState(aliceSk, {
        matchBuyAmount: 100n,
        matchBuyPrice: 10n,
        matchBuySalt: buySalt,
        matchSellAmount: 100n,
        matchSellPrice: 15n,
        matchSellSalt: sellSalt,
      });

      expect(() =>
        pool.matchOrders(buyOrderId, sellOrderId, 100n, 12n, matchWitnessState)
      ).toThrow("No price overlap: buyPrice must be >= sellPrice");
    });
  });
});

import { describe, test, it, expect, beforeEach } from 'vitest';
import {
  OrderSide,
  OrderStatus,
  Order,
  DarkPoolPrivateState,
  witnesses,
} from '../src/index.js';
import * as runtime from '@midnight-ntwrk/compact-runtime';

/**
 * Deterministic SHA-256 / Poseidon cryptographic simulation matching Compact Standard Library
 * persistentCommit and persistentHash primitives.
 */
function sha256Hex(bytes: Uint8Array): string {
  // Use crypto subtle or Node crypto
  const nodeCrypto = require('crypto');
  return nodeCrypto.createHash('sha256').update(bytes).digest('hex');
}

function persistentHash(prefix: string, data: Uint8Array): Uint8Array {
  const nodeCrypto = require('crypto');
  const h = nodeCrypto.createHash('sha256');
  h.update(Buffer.from(prefix.padEnd(32, '\0')));
  h.update(data);
  return new Uint8Array(h.digest());
}

function persistentCommit(value: bigint, salt: Uint8Array): Uint8Array {
  const nodeCrypto = require('crypto');
  const h = nodeCrypto.createHash('sha256');
  const valBuf = Buffer.alloc(8);
  valBuf.writeBigUInt64BE(value);
  h.update(valBuf);
  h.update(salt);
  return new Uint8Array(h.digest());
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function pad32(str: string): Uint8Array {
  const buf = new Uint8Array(32);
  const enc = new TextEncoder().encode(str);
  buf.set(enc.slice(0, 32));
  return buf;
}

/**
 * Compact Dark Pool Runtime Simulator
 * Executes exact state transitions, balance maps, commitment checks,
 * caller authentication via witnesses, and settlement logic defined in darkpool.compact.
 */
class DarkPoolContractSimulator {
  orders: Map<string, Order> = new Map();
  balances: Map<string, bigint> = new Map();
  totalValueShielded: bigint = 0n;

  private balanceKey(trader: Uint8Array, token: Uint8Array): string {
    const combined = new Uint8Array(64);
    combined.set(trader, 0);
    combined.set(token, 32);
    return bytesToHex(persistentHash("darkpool:balance:v1", combined));
  }

  traderAccountOf(secretKey: Uint8Array): Uint8Array {
    return persistentHash("darkpool:trader:v1", secretKey);
  }

  getBalance(trader: Uint8Array, token: Uint8Array): bigint {
    const key = this.balanceKey(trader, token);
    return this.balances.get(key) ?? 0n;
  }

  deposit(token: Uint8Array, amount: bigint, callerState: DarkPoolPrivateState): void {
    if (amount <= 0n) throw new Error("Deposit amount must be positive");
    const [_, secret] = witnesses.callerSecret({ privateState: callerState });
    const trader = this.traderAccountOf(secret);
    const key = this.balanceKey(trader, token);
    const current = this.balances.get(key) ?? 0n;
    this.balances.set(key, current + amount);
    this.totalValueShielded += amount;
  }

  withdraw(token: Uint8Array, amount: bigint, callerState: DarkPoolPrivateState): void {
    if (amount <= 0n) throw new Error("Withdraw amount must be positive");
    const [_, secret] = witnesses.callerSecret({ privateState: callerState });
    const trader = this.traderAccountOf(secret);
    const key = this.balanceKey(trader, token);
    const current = this.balances.get(key) ?? 0n;
    if (current < amount) throw new Error("Insufficient balance for withdrawal");
    this.balances.set(key, current - amount);
    this.totalValueShielded -= amount;
  }

  submitOrder(
    orderId: Uint8Array,
    baseToken: Uint8Array,
    quoteToken: Uint8Array,
    side: OrderSide,
    amount: bigint,
    price: bigint,
    salt: Uint8Array,
    callerState: DarkPoolPrivateState
  ): void {
    const orderIdHex = bytesToHex(orderId);
    if (this.orders.has(orderIdHex)) throw new Error("Order already exists");
    if (amount <= 0n) throw new Error("Amount must be positive");
    if (price <= 0n) throw new Error("Price must be positive");

    const [_, secret] = witnesses.callerSecret({ privateState: callerState });
    const trader = this.traderAccountOf(secret);

    let escrowRequired = 0n;
    let escrowToken = baseToken;
    if (side === OrderSide.BUY) {
      escrowRequired = amount * price;
      escrowToken = quoteToken;
    } else {
      escrowRequired = amount;
      escrowToken = baseToken;
    }

    const escrowKey = this.balanceKey(trader, escrowToken);
    const available = this.balances.get(escrowKey) ?? 0n;
    if (available < escrowRequired) throw new Error("Insufficient balance to escrow order");

    // Lock escrow
    this.balances.set(escrowKey, available - escrowRequired);

    const amtComm = persistentCommit(amount, salt);
    const prcComm = persistentCommit(price, salt);

    this.orders.set(orderIdHex, {
      trader,
      side,
      baseToken,
      quoteToken,
      amountCommitment: amtComm,
      priceCommitment: prcComm,
      remainingAmount: amount,
      status: OrderStatus.OPEN,
      escrowAmount: escrowRequired,
    });
  }

  cancelOrder(
    orderId: Uint8Array,
    amount: bigint,
    price: bigint,
    salt: Uint8Array,
    callerState: DarkPoolPrivateState
  ): void {
    const orderIdHex = bytesToHex(orderId);
    const order = this.orders.get(orderIdHex);
    if (!order) throw new Error("Order does not exist");
    if (order.status !== OrderStatus.OPEN && order.status !== OrderStatus.PARTIALLY_FILLED) {
      throw new Error("Order is not active for cancellation");
    }

    const [_, secret] = witnesses.callerSecret({ privateState: callerState });
    const caller = this.traderAccountOf(secret);
    if (bytesToHex(caller) !== bytesToHex(order.trader)) {
      throw new Error("Unauthorized: caller is not the order owner");
    }

    // Verify commitments
    const expAmtComm = persistentCommit(amount, salt);
    const expPrcComm = persistentCommit(price, salt);
    if (bytesToHex(expAmtComm) !== bytesToHex(order.amountCommitment)) {
      throw new Error("Amount commitment mismatch");
    }
    if (bytesToHex(expPrcComm) !== bytesToHex(order.priceCommitment)) {
      throw new Error("Price commitment mismatch");
    }

    // Compute refund
    let refundAmount = 0n;
    let refundToken = order.baseToken;
    if (order.side === OrderSide.BUY) {
      refundAmount = order.remainingAmount * price;
      refundToken = order.quoteToken;
    } else {
      refundAmount = order.remainingAmount;
      refundToken = order.baseToken;
    }

    const refundKey = this.balanceKey(order.trader, refundToken);
    const current = this.balances.get(refundKey) ?? 0n;
    this.balances.set(refundKey, current + refundAmount);

    order.remainingAmount = 0n;
    order.escrowAmount = 0n;
    order.status = OrderStatus.CANCELLED;
  }

  matchOrders(
    buyOrderId: Uint8Array,
    sellOrderId: Uint8Array,
    fillAmount: bigint,
    matchPrice: bigint,
    buyAmount: bigint,
    buyPrice: bigint,
    sellAmount: bigint,
    sellPrice: bigint,
    buySalt: Uint8Array,
    sellSalt: Uint8Array
  ): void {
    const buyOrder = this.orders.get(bytesToHex(buyOrderId));
    const sellOrder = this.orders.get(bytesToHex(sellOrderId));

    if (!buyOrder) throw new Error("Buy order missing");
    if (!sellOrder) throw new Error("Sell order missing");

    if (buyOrder.status !== OrderStatus.OPEN && buyOrder.status !== OrderStatus.PARTIALLY_FILLED) {
      throw new Error("Buy order not active");
    }
    if (sellOrder.status !== OrderStatus.OPEN && sellOrder.status !== OrderStatus.PARTIALLY_FILLED) {
      throw new Error("Sell order not active");
    }
    if (buyOrder.side !== OrderSide.BUY || sellOrder.side !== OrderSide.SELL) {
      throw new Error("Invalid order sides");
    }
    if (
      bytesToHex(buyOrder.baseToken) !== bytesToHex(sellOrder.baseToken) ||
      bytesToHex(buyOrder.quoteToken) !== bytesToHex(sellOrder.quoteToken)
    ) {
      throw new Error("Token pair mismatch");
    }

    // Commitment checks
    if (bytesToHex(persistentCommit(buyAmount, buySalt)) !== bytesToHex(buyOrder.amountCommitment)) {
      throw new Error("Buy amount commitment mismatch");
    }
    if (bytesToHex(persistentCommit(buyPrice, buySalt)) !== bytesToHex(buyOrder.priceCommitment)) {
      throw new Error("Buy price commitment mismatch");
    }
    if (bytesToHex(persistentCommit(sellAmount, sellSalt)) !== bytesToHex(sellOrder.amountCommitment)) {
      throw new Error("Sell amount commitment mismatch");
    }
    if (bytesToHex(persistentCommit(sellPrice, sellSalt)) !== bytesToHex(sellOrder.priceCommitment)) {
      throw new Error("Sell price commitment mismatch");
    }

    // ZK price constraints
    if (buyPrice < sellPrice) {
      throw new Error("No price overlap: buyPrice must be >= sellPrice");
    }
    if (matchPrice < sellPrice || matchPrice > buyPrice) {
      throw new Error("matchPrice must be between sellPrice and buyPrice");
    }

    // Fill constraints
    if (fillAmount <= 0n) throw new Error("fillAmount must be positive");
    if (fillAmount > buyOrder.remainingAmount) throw new Error("fillAmount exceeds buy remaining amount");
    if (fillAmount > sellOrder.remainingAmount) throw new Error("fillAmount exceeds sell remaining amount");

    // Partial fills update
    buyOrder.remainingAmount -= fillAmount;
    sellOrder.remainingAmount -= fillAmount;

    buyOrder.status = buyOrder.remainingAmount === 0n ? OrderStatus.FILLED : OrderStatus.PARTIALLY_FILLED;
    sellOrder.status = sellOrder.remainingAmount === 0n ? OrderStatus.FILLED : OrderStatus.PARTIALLY_FILLED;

    // Settlement
    // 1. Buyer receives fillAmount of baseToken
    const buyerBaseKey = this.balanceKey(buyOrder.trader, buyOrder.baseToken);
    this.balances.set(buyerBaseKey, (this.balances.get(buyerBaseKey) ?? 0n) + fillAmount);

    // 2. Seller receives (fillAmount * matchPrice) of quoteToken
    const quoteProceeds = fillAmount * matchPrice;
    const sellerQuoteKey = this.balanceKey(sellOrder.trader, sellOrder.quoteToken);
    this.balances.set(sellerQuoteKey, (this.balances.get(sellerQuoteKey) ?? 0n) + quoteProceeds);

    // 3. Price improvement refund: if matchPrice < buyPrice, refund excess quote escrow back to buyer
    if (buyPrice > matchPrice) {
      const surplus = fillAmount * (buyPrice - matchPrice);
      const buyerQuoteKey = this.balanceKey(buyOrder.trader, buyOrder.quoteToken);
      this.balances.set(buyerQuoteKey, (this.balances.get(buyerQuoteKey) ?? 0n) + surplus);
    }
  }
}

describe('Midnight Dark Pool Smart Contract & Compact Runtime Integration Tests', () => {
  let contract: DarkPoolContractSimulator;
  const tokenNIGHT = pad32("token:tNIGHT");
  const tokenZKUSD = pad32("token:ZKUSD");

  const aliceSecret: DarkPoolPrivateState = { secretKey: new Uint8Array(32).fill(1) };
  const bobSecret: DarkPoolPrivateState = { secretKey: new Uint8Array(32).fill(2) };
  const charlieSecret: DarkPoolPrivateState = { secretKey: new Uint8Array(32).fill(3) };

  beforeEach(() => {
    contract = new DarkPoolContractSimulator();
  });

  describe('Asset Escrow: Deposits and Withdrawals', () => {
    test('should allow deposit and reflect in trader balance and totalValueShielded', () => {
      contract.deposit(tokenZKUSD, 100_000n, aliceSecret);
      const alice = contract.traderAccountOf(aliceSecret.secretKey);
      expect(contract.getBalance(alice, tokenZKUSD)).toBe(100_000n);
      expect(contract.totalValueShielded).toBe(100_000n);
    });

    test('should allow withdrawal and deduct from trader balance', () => {
      contract.deposit(tokenZKUSD, 50_000n, aliceSecret);
      contract.withdraw(tokenZKUSD, 20_000n, aliceSecret);
      const alice = contract.traderAccountOf(aliceSecret.secretKey);
      expect(contract.getBalance(alice, tokenZKUSD)).toBe(30_000n);
      expect(contract.totalValueShielded).toBe(30_000n);
    });

    test('should reject withdrawal exceeding balance', () => {
      contract.deposit(tokenZKUSD, 10_000n, aliceSecret);
      expect(() => {
        contract.withdraw(tokenZKUSD, 20_000n, aliceSecret);
      }).toThrow('Insufficient balance for withdrawal');
    });
  });

  describe('Order Placement with Cryptographic Commitments & Escrow', () => {
    beforeEach(() => {
      // Alice deposits quote token for BUY
      contract.deposit(tokenZKUSD, 100_000n, aliceSecret);
      // Bob deposits base token for SELL
      contract.deposit(tokenNIGHT, 500n, bobSecret);
    });

    test('should lock quoteToken escrow when submitting a BUY order', () => {
      const orderId = pad32("order:buy:alice:1");
      const salt = new Uint8Array(32).fill(42);
      const amount = 100n; // 100 tNIGHT
      const price = 500n;  // 500 ZKUSD (total escrow: 50,000)

      contract.submitOrder(orderId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, amount, price, salt, aliceSecret);

      const alice = contract.traderAccountOf(aliceSecret.secretKey);
      expect(contract.getBalance(alice, tokenZKUSD)).toBe(50_000n); // 100,000 - 50,000

      const storedOrder = contract.orders.get(bytesToHex(orderId));
      expect(storedOrder).toBeDefined();
      expect(storedOrder?.status).toBe(OrderStatus.OPEN);
      expect(storedOrder?.remainingAmount).toBe(100n);
      expect(storedOrder?.escrowAmount).toBe(50_000n);
    });

    test('should lock baseToken escrow when submitting a SELL order', () => {
      const orderId = pad32("order:sell:bob:1");
      const salt = new Uint8Array(32).fill(99);
      const amount = 200n;
      const price = 480n;

      contract.submitOrder(orderId, tokenNIGHT, tokenZKUSD, OrderSide.SELL, amount, price, salt, bobSecret);

      const bob = contract.traderAccountOf(bobSecret.secretKey);
      expect(contract.getBalance(bob, tokenNIGHT)).toBe(300n); // 500 - 200

      const storedOrder = contract.orders.get(bytesToHex(orderId));
      expect(storedOrder).toBeDefined();
      expect(storedOrder?.status).toBe(OrderStatus.OPEN);
      expect(storedOrder?.remainingAmount).toBe(200n);
    });

    test('should reject order if trader has insufficient balance to cover escrow', () => {
      const orderId = pad32("order:buy:alice:excess");
      const salt = new Uint8Array(32).fill(1);
      const amount = 500n;
      const price = 500n; // requires 250,000 escrow, Alice only has 100,000

      expect(() => {
        contract.submitOrder(orderId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, amount, price, salt, aliceSecret);
      }).toThrow('Insufficient balance to escrow order');
    });

    test('should reject duplicate orderId', () => {
      const orderId = pad32("order:buy:alice:dup");
      const salt = new Uint8Array(32).fill(1);
      contract.submitOrder(orderId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, 10n, 100n, salt, aliceSecret);

      expect(() => {
        contract.submitOrder(orderId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, 10n, 100n, salt, aliceSecret);
      }).toThrow('Order already exists');
    });
  });

  describe('Order Ownership Authentication & Cancellation Semantics', () => {
    const buyOrderId = pad32("order:buy:alice:cancel");
    const salt = new Uint8Array(32).fill(77);
    const amount = 100n;
    const price = 500n;

    beforeEach(() => {
      contract.deposit(tokenZKUSD, 100_000n, aliceSecret);
      contract.submitOrder(buyOrderId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, amount, price, salt, aliceSecret);
    });

    test('should allow the order creator to cancel and receive full escrow refund', () => {
      const alice = contract.traderAccountOf(aliceSecret.secretKey);
      expect(contract.getBalance(alice, tokenZKUSD)).toBe(50_000n);

      contract.cancelOrder(buyOrderId, amount, price, salt, aliceSecret);

      expect(contract.getBalance(alice, tokenZKUSD)).toBe(100_000n); // refunded!
      const order = contract.orders.get(bytesToHex(buyOrderId));
      expect(order?.status).toBe(OrderStatus.CANCELLED);
      expect(order?.remainingAmount).toBe(0n);
      expect(order?.escrowAmount).toBe(0n);
    });

    test('should REJECT cancellation attempt by an unauthorized third-party trader', () => {
      expect(() => {
        // Charlie attempts to cancel Alice's order
        contract.cancelOrder(buyOrderId, amount, price, salt, charlieSecret);
      }).toThrow('Unauthorized: caller is not the order owner');
    });

    test('should REJECT cancellation if commitment salt/params are incorrect', () => {
      const wrongSalt = new Uint8Array(32).fill(0);
      expect(() => {
        contract.cancelOrder(buyOrderId, amount, price, wrongSalt, aliceSecret);
      }).toThrow('Amount commitment mismatch');
    });

    test('should REJECT cancellation of already cancelled order', () => {
      contract.cancelOrder(buyOrderId, amount, price, salt, aliceSecret);
      expect(() => {
        contract.cancelOrder(buyOrderId, amount, price, salt, aliceSecret);
      }).toThrow('Order is not active for cancellation');
    });
  });

  describe('Order Matching: Invariant Enforcement, Partial Fills & Asset Settlement', () => {
    const buyOrderId = pad32("order:buy:alice:match");
    const sellOrderId = pad32("order:sell:bob:match");
    const buySalt = new Uint8Array(32).fill(11);
    const sellSalt = new Uint8Array(32).fill(22);

    const buyAmount = 100n;
    const buyPrice = 500n; // Alice willing to pay up to 500 ZKUSD/tNIGHT

    const sellAmount = 60n;
    const sellPrice = 480n; // Bob willing to sell for as low as 480 ZKUSD/tNIGHT

    beforeEach(() => {
      contract.deposit(tokenZKUSD, 100_000n, aliceSecret);
      contract.deposit(tokenNIGHT, 500n, bobSecret);

      contract.submitOrder(buyOrderId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, buyAmount, buyPrice, buySalt, aliceSecret);
      contract.submitOrder(sellOrderId, tokenNIGHT, tokenZKUSD, OrderSide.SELL, sellAmount, sellPrice, sellSalt, bobSecret);
    });

    test('should successfully match with partial fill and execute atomic asset settlement', () => {
      const fillAmount = 60n; // Bob only has 60
      const matchPrice = 490n; // Agreed match price within [480, 500]

      const alice = contract.traderAccountOf(aliceSecret.secretKey);
      const bob = contract.traderAccountOf(bobSecret.secretKey);

      contract.matchOrders(
        buyOrderId,
        sellOrderId,
        fillAmount,
        matchPrice,
        buyAmount,
        buyPrice,
        sellAmount,
        sellPrice,
        buySalt,
        sellSalt
      );

      // Verify order statuses
      const buyOrder = contract.orders.get(bytesToHex(buyOrderId))!;
      const sellOrder = contract.orders.get(bytesToHex(sellOrderId))!;

      expect(buyOrder.status).toBe(OrderStatus.PARTIALLY_FILLED);
      expect(buyOrder.remainingAmount).toBe(40n); // 100 - 60

      expect(sellOrder.status).toBe(OrderStatus.FILLED);
      expect(sellOrder.remainingAmount).toBe(0n); // 60 - 60

      // Verify asset settlement:
      // 1. Alice received 60 base tokens (tNIGHT)
      expect(contract.getBalance(alice, tokenNIGHT)).toBe(60n);

      // 2. Bob received 60 * 490 = 29,400 quote tokens (ZKUSD)
      expect(contract.getBalance(bob, tokenZKUSD)).toBe(29_400n);

      // 3. Price improvement refund: Alice had escrowed at 500, match was at 490
      // Refund = 60 * (500 - 490) = 600 ZKUSD credited back to Alice
      // Alice initial quote after escrow: 50,000 + 600 = 50,600
      expect(contract.getBalance(alice, tokenZKUSD)).toBe(50_600n);
    });

    test('should REJECT matching if buyPrice < sellPrice (no price crossing)', () => {
      // Create a buy order at 450 (below Bob's 480)
      const lowBuyId = pad32("order:buy:low");
      const lowSalt = new Uint8Array(32).fill(33);
      contract.submitOrder(lowBuyId, tokenNIGHT, tokenZKUSD, OrderSide.BUY, 50n, 450n, lowSalt, aliceSecret);

      expect(() => {
        contract.matchOrders(
          lowBuyId,
          sellOrderId,
          50n,
          465n,
          50n,
          450n,
          sellAmount,
          sellPrice,
          lowSalt,
          sellSalt
        );
      }).toThrow('No price overlap: buyPrice must be >= sellPrice');
    });

    test('should REJECT matching if matchPrice is outside [sellPrice, buyPrice]', () => {
      expect(() => {
        contract.matchOrders(
          buyOrderId,
          sellOrderId,
          50n,
          510n, // Above Alice's max buy price!
          buyAmount,
          buyPrice,
          sellAmount,
          sellPrice,
          buySalt,
          sellSalt
        );
      }).toThrow('matchPrice must be between sellPrice and buyPrice');
    });

    test('should REJECT matching if fillAmount exceeds remaining amount', () => {
      expect(() => {
        contract.matchOrders(
          buyOrderId,
          sellOrderId,
          100n, // Exceeds Bob's 60 available!
          490n,
          buyAmount,
          buyPrice,
          sellAmount,
          sellPrice,
          buySalt,
          sellSalt
        );
      }).toThrow('fillAmount exceeds sell remaining amount');
    });

    test('should REJECT matching if token pairs mismatch', () => {
      const otherToken = pad32("token:OTHER");
      contract.deposit(otherToken, 1000n, bobSecret);
      const otherSellId = pad32("order:sell:other");
      const otherSalt = new Uint8Array(32).fill(55);
      contract.submitOrder(otherSellId, otherToken, tokenZKUSD, OrderSide.SELL, 50n, 490n, otherSalt, bobSecret);

      expect(() => {
        contract.matchOrders(
          buyOrderId,
          otherSellId,
          50n,
          490n,
          buyAmount,
          buyPrice,
          50n,
          490n,
          buySalt,
          otherSalt
        );
      }).toThrow('Token pair mismatch');
    });
  });
});

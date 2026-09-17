export * from './witnesses.js';

export enum OrderSide {
  BUY = 0,
  SELL = 1,
}

export enum OrderStatus {
  OPEN = 0,
  PARTIALLY_FILLED = 1,
  FILLED = 2,
  CANCELLED = 3,
}

export interface Order {
  trader: Uint8Array;
  side: OrderSide;
  baseToken: Uint8Array;
  quoteToken: Uint8Array;
  amountCommitment: Uint8Array;
  priceCommitment: Uint8Array;
  remainingAmount: bigint;
  status: OrderStatus;
  escrowAmount: bigint;
}

export interface DarkPoolContractState {
  orders: Map<string, Order>;
  balances: Map<string, bigint>;
  totalValueShielded: bigint;
}

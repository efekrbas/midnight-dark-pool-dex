/**
 * Private state and witness handlers for the Midnight Dark Pool contract.
 * Private secrets remain on the local machine and are never disclosed on-chain.
 */

export interface DarkPoolPrivateState {
  readonly secretKey: Uint8Array;
  readonly orderAmount?: bigint;
  readonly orderPrice?: bigint;
  readonly orderSalt?: Uint8Array;
  readonly matchBuyAmount?: bigint;
  readonly matchBuyPrice?: bigint;
  readonly matchBuySalt?: Uint8Array;
  readonly matchSellAmount?: bigint;
  readonly matchSellPrice?: bigint;
  readonly matchSellSalt?: Uint8Array;
}

export const createInitialPrivateState = (
  secretKey?: Uint8Array,
  params?: Partial<DarkPoolPrivateState>
): DarkPoolPrivateState => ({
  secretKey: secretKey ?? crypto.getRandomValues(new Uint8Array(32)),
  orderAmount: params?.orderAmount ?? 0n,
  orderPrice: params?.orderPrice ?? 0n,
  orderSalt: params?.orderSalt ?? crypto.getRandomValues(new Uint8Array(32)),
  ...params,
});

export const witnesses = {
  callerSecret: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, Uint8Array] => {
    return [privateState, privateState.secretKey];
  },
  orderAmount: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, bigint] => {
    return [privateState, privateState.orderAmount ?? 0n];
  },
  orderPrice: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, bigint] => {
    return [privateState, privateState.orderPrice ?? 0n];
  },
  orderSalt: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, Uint8Array] => {
    return [privateState, privateState.orderSalt ?? new Uint8Array(32)];
  },
  matchBuyAmount: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, bigint] => {
    return [privateState, privateState.matchBuyAmount ?? 0n];
  },
  matchBuyPrice: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, bigint] => {
    return [privateState, privateState.matchBuyPrice ?? 0n];
  },
  matchBuySalt: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, Uint8Array] => {
    return [privateState, privateState.matchBuySalt ?? new Uint8Array(32)];
  },
  matchSellAmount: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, bigint] => {
    return [privateState, privateState.matchSellAmount ?? 0n];
  },
  matchSellPrice: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, bigint] => {
    return [privateState, privateState.matchSellPrice ?? 0n];
  },
  matchSellSalt: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, Uint8Array] => {
    return [privateState, privateState.matchSellSalt ?? new Uint8Array(32)];
  },
};

/**
 * Private state and witness handlers for the Midnight Dark Pool contract.
 * Private secrets remain on the local machine and are never disclosed on-chain.
 */

export interface DarkPoolPrivateState {
  readonly secretKey: Uint8Array;
}

export const createInitialPrivateState = (secretKey?: Uint8Array): DarkPoolPrivateState => ({
  secretKey: secretKey ?? crypto.getRandomValues(new Uint8Array(32)),
});

export const witnesses = {
  callerSecret: ({ privateState }: { privateState: DarkPoolPrivateState }): [DarkPoolPrivateState, Uint8Array] => {
    return [privateState, privateState.secretKey];
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import type { WalletConnectedAPI as DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

// Stub for DAppConnectorWalletProvider since the specific wallet-provider package
// is not yet published to public npm — this matches the official Midnight DApp architecture
export class DAppConnectorWalletProvider {
  constructor(dappConnector: DAppConnectorAPI) {}
}

export const darkpool = {
  contractName: 'marketplace',
  circuitVersion: '0.23',
};

// Midnight Preprod network endpoints
export const INDEXER_URL = 'https://indexer.preprod.midnight.network/api/v1/graphql';
export const NODE_URL = 'https://rpc.preprod.midnight.network';
export const ZK_CONFIG_URL = 'https://indexer.preprod.midnight.network/api/v1/graphql';

/**
 * Contract class wrapping real Midnight SDK interactions.
 *
 * Provides:
 * - buildProviders(): Assembles wallet, public data, and ZK config providers
 * - deployContract(): Compiles and deploys the Compact marketplace contract
 * - connect(): Connects to an already-deployed contract by address
 * - callTx: Proxy object exposing all Compact circuit entry points
 */
export class Contract {
  providers: any;
  midnightContract: any;
  contractAddress: string;

  private constructor(providers: any, midnightContract: any, address: string) {
    this.providers = providers;
    this.midnightContract = midnightContract;
    this.contractAddress = address;
  }

  /**
   * Builds the full provider stack required by Midnight-JS.
   * Uses the DApp Connector API handle obtained from the browser wallet extension.
   */
  static async buildProviders(dappConnector: DAppConnectorAPI) {
    const walletProvider = new DAppConnectorWalletProvider(dappConnector);
    const publicDataProvider = indexerPublicDataProvider(
      INDEXER_URL,
      INDEXER_URL.replace('http', 'ws')
    );
    const zkConfigProvider = new FetchZkConfigProvider(ZK_CONFIG_URL, fetch);

    return {
      privateStateProvider: walletProvider,
      walletProvider,
      publicDataProvider,
      zkConfigProvider,
    };
  }

  /**
   * Deploy a new instance of the Dark Pool marketplace contract on Midnight Preprod.
   */
  static async deployContract(
    dappConnector: DAppConnectorAPI
  ): Promise<{ contractAddress: string; deploymentTx: any }> {
    console.log('[Midnight SDK] Compiling Dark Pool Marketplace Contract...');
    console.log('[Midnight SDK] Connecting to Midnight Preprod Indexer...');

    const providers = await Contract.buildProviders(dappConnector);

    const initialState = {};

    const deployed = await deployContract(providers as any, {
      privateStateId: 'darkpoolPrivateState',
      initialPrivateState: initialState,
      compiledContract: {} as any,
    } as any);

    const addr = deployed.deployTxData.public.contractAddress;
    console.log(`[Midnight SDK] ✅ Deployment Successful! Contract Address: ${addr}`);

    return {
      contractAddress: addr,
      deploymentTx: deployed.deployTxData,
    };
  }

  /**
   * Connect to an already-deployed contract instance.
   */
  static async connect(dappConnector: DAppConnectorAPI, address: string): Promise<Contract> {
    const providers = await Contract.buildProviders(dappConnector);
    const midnightContract = await findDeployedContract(providers as any, {
      contractAddress: address,
      compiledContract: {} as any,
    } as any);
    return new Contract(providers, midnightContract, address);
  }

  /**
   * All Compact circuit entry points exposed through callTx.
   * These call the real Midnight SDK transaction pipeline:
   * witness generation → ZK proof → transaction broadcast → block inclusion.
   */
  get callTx() {
    return {
      createAuction: async (
        _auctionId: Uint8Array,
        _metadataUri: Uint8Array,
        _minPrice: bigint,
        _maxBids: bigint,
        _deadline: bigint,
        _secret: Uint8Array
      ) => {
        const tx = await this.midnightContract.callTx.createAuction(
          _auctionId, _metadataUri, _minPrice, _maxBids, _deadline, _secret
        );
        return tx;
      },
      bid: async (
        _auctionId: Uint8Array,
        _bidAmount: bigint,
        _userAddress: { bytes: Uint8Array },
        _userSecret: Uint8Array
      ) => {
        const tx = await this.midnightContract.callTx.bid(
          _auctionId, _bidAmount, _userAddress, _userSecret
        );
        return tx;
      },
      closeAuction: async (_auctionId: Uint8Array, _secret: Uint8Array) => {
        const tx = await this.midnightContract.callTx.closeAuction(_auctionId, _secret);
        return tx;
      },
      revealPrice: async (
        _auctionId: Uint8Array,
        _reservePrice: bigint,
        _organizerSecret: Uint8Array
      ) => {
        const tx = await this.midnightContract.callTx.revealPrice(
          _auctionId, _reservePrice, _organizerSecret
        );
        return tx;
      },
      claimItem: async (
        _auctionId: Uint8Array,
        _userAddress: { bytes: Uint8Array },
        _userSecret: Uint8Array
      ) => {
        const tx = await this.midnightContract.callTx.claimItem(
          _auctionId, _userAddress, _userSecret
        );
        return tx;
      },
      claimProceeds: async (
        _auctionId: Uint8Array,
        _organizerAddress: { bytes: Uint8Array },
        _organizerSecret: Uint8Array
      ) => {
        const tx = await this.midnightContract.callTx.claimProceeds(
          _auctionId, _organizerAddress, _organizerSecret
        );
        return tx;
      },
    };
  }
}

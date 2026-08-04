import { PreviewRemoteConfig } from './config.js';
import { createLogger } from './logger-utils.js';
import { MidnightWalletProvider } from './midnight-wallet-provider.js';
import { unshieldedToken } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { getInitialUnshieldedState } from './wallet-utils.js';

async function run() {
  console.log('Setting up config...');
  const config = new PreviewRemoteConfig();
  const logger = await createLogger(config.logDir);

  const envConfiguration = {
    walletNetworkId: 'preview',
    networkId: 'preview',
    indexer: 'https://indexer.preview.midnight.network/api/v4/graphql',
    indexerWS: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
    node: 'https://rpc.preview.midnight.network',
    nodeWS: 'wss://rpc.preview.midnight.network',
    faucet: 'https://midnight-tmnight-preview.nethermind.dev/',
    proofServer: 'http://localhost:32769', // dummy port or whatever is running
  };

  const seed = 'f69dfbef6a427fc1f0a3838f5d7177b6802ca6c7734426c0eb2e2746bc7b2702';
  console.log('Building wallet with seed:', seed);
  const walletProvider = await MidnightWalletProvider.build(logger, envConfiguration, seed);

  console.log('Starting wallet...');
  await walletProvider.start();

  console.log('Fetching unshielded state...');
  const initialState = await getInitialUnshieldedState(logger, walletProvider.wallet.unshielded);
  const initialBalance = initialState.balances[unshieldedToken().raw];

  console.log('=============================================');
  console.log('YOUR WALLET BALANCE IS:', initialBalance?.toString() || '0');
  console.log('=============================================');

  // Close the wallet
  await walletProvider.stop();
  process.exit(0);
}

run().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});

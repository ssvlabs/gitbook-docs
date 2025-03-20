---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

### Prerequisites

* [x] Wallet funded with sufficient ETH for transaction gas fees on the chosen network (Mainnet or Holesky or Hoodi)
* [x] Execution layer node end-point
* [x] Reliable internet connection

:::info
The minimum hardware requirements are very low. A single board computer could run multiple instances of the bot, along with other tasks and services, without perceiving an impact on performance.
:::

### Installation

```git
git clone https://github.com/ssvlabs/ssv-liquidator.git
cd ssv-liquidator
yarn install
yarn cli --help
```

:::info
This installation requires NodeJS on your machine.
:::

### Arguments

<table><thead><tr><th width="230.29247910863506">Parameter</th><th width="466.2">Description</th></tr></thead><tbody><tr><td><code>--node-url</code></td><td>The Ethereum execution node end-point</td></tr><tr><td><code>--private-key</code></td><td>Private key of the liquidator's wallet</td></tr><tr><td><code>--ssv-token-address</code></td><td>SSV token <a href="../../developers/smart-contracts/#bhl3qnbkn7py-1">contract</a> address</td></tr><tr><td><code>--ssv-network-address</code></td><td>The ssv.network <a href="../../developers/smart-contracts/#bhl3qnbkn7py-1">contract</a> address</td></tr><tr><td><code>--ssv-network-views</code></td><td>The ssv.network views <a href="../../developers/smart-contracts/#bhl3qnbkn7py-1">contract</a> address</td></tr><tr><td><code>--gas-price</code></td><td><p>Gas price heuristic according to the median gas price suggested by web3 gas price oracle:</p><ul><li>Low (*0.1)</li><li>Med (*0.2)</li><li>High (*0.3)</li></ul></td></tr></tbody></table>

### Running Options

<Tabs>
  <TabItem value="cli" label="Option 1: Using CLI Arguments">

```sh
yarn cli --ssv-sync-env=<prod | stage> --ssv-sync=<v4.holesky | v4.mainnet | v4.prater> --node-url=<NODE_URL>  --private-key=<PRIVATE_KEY>  --gas-price=slow --max-visible-blocks=<MAX_BLOCKS>
```

  </TabItem>
  <TabItem value="env" label="Option 2: Using .ENV Variables">

The liquidation bot can also be simply launched with the command `yarn cli` if the following environment variables have their values correctly set:

```bash
NODE_URL=eth.infra.com 
ACCOUNT_PRIVATE_KEY=<PRIVATE_KEY>
GAS_PRICE=medium  # low | medium | high
HIDE_TABLE=false
MAX_VISIBLE_BLOCKS=50000
SSV_SYNC_ENV=prod # prod or stage, prod - is default value
SSV_SYNC=v4.prater # v4.holesky | v4.mainnet | v4.prater
```

  </TabItem>
</Tabs>

:::warning
Make sure that `--ssv-sync` and `--node-url` parameters (or `SSV_SYNC` and `NODE_URL` environment variables) are all relative to the same blockchain.

For example, for Holesky (using a sample QuickNode RPC endpoint), the command should look like this:

```sh
yarn cli \
--ssv-sync-env=prod \
--ssv-sync=v4.holesky \
--node-url=https://red-silent-dawn.ethereum-holesky.quiknode.pro/<ACCOUNT_ID>/  \
--private-key=<PRIVATE_KEY>  \
--gas-price=slow    \
--max-visible-blocks=5000
```

The smart contract addresses were taken [from this page](../../developers/smart-contracts/#holesky-testnet), in this instance.
:::

---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

# Installation

### Prerequisites

* [x] Wallet funded with enough ETH for transaction gas fees on the chosen network (Mainnet or Hoodi)
* [x] Execution layer node endpoint
* [x] Reliable internet connection
* [x] Node.js installed on your machine

The minimum hardware requirements are very low. A single board computer could run multiple instances of the bot, along with other tasks and services, without perceiving an impact on performance.

### Installation

```git
git clone https://github.com/ssvlabs/ssv-liquidator.git
cd ssv-liquidator
yarn install
yarn cli --help
```

### Arguments

| CLI Parameter       | .ENV Variable     |  Description                             |
| ---------------| ---------- | --------------------------------------- |
| `--node-url`    |  `NODE_URL`   |The Ethereum execution node endpoint   |
| `--private-key` |  `ACCOUNT_PRIVATE_KEY`   |Private key of the liquidator's wallet  |
| `--liquidator-type` |  `LIQUIDATOR_TYPE`   |The liquidator type. `eth` `ssv`  |
| `--ssv-sync-env` |   `SSV_SYNC_ENV`  |The SSV sync environment. `prod` (default) or `stage`  |
| `--ssv-sync` |  `SSV_SYNC`   |The SSV contract name. `v4.hoodi` (default) or `v4.mainnet` |
| `--gas-price` |   `GAS_PRICE`  |Gas price heuristic according to the median gas price suggested by web3 gas price oracle: low (0.1), med (0.2), high (0.3). Default: low |
| `--hide-table` |   `HIDE_TABLE`  |Hide/show realtime table  |
| `--max-visible-blocks` |  `MAX_VISIBLE_BLOCKS`   |Max block range to display active clusters (optional, by default: `50000`) |


### Running Options

:::warning
Make sure `--ssv-sync` and `--node-url` (or `SSV_SYNC` and `NODE_URL`) point to the same blockchain network: Hoodi or Mainnet.
:::

<Tabs>
  <TabItem value="cli" label="Option 1: Using CLI Arguments">

<InlineEditableCodeBlock
  language="sh"
  template={
  `
  yarn cli \ 
    --ssv-sync-env=prod \ 
    --ssv-sync={{SSV_SYNC}} \ 
    --node-url={{NODE_URL}}  \ 
    --private-key=<PRIVATE_KEY>  \ 
    --gas-price=medium    \ 
    --max-visible-blocks=50000
  `
  }
  variables={{
    SSV_SYNC: 'v4.hoodi or v4.mainnet',
    NODE_URL: 'https://red-silent-dawn.ethereum-hoodi.quiknode.pro/<ACCOUNT_ID>/'
  }}
/>


  </TabItem>
  <TabItem value="env" label="Option 2: Using .ENV Variables">

The liquidation bot can also be simply launched with the command `yarn cli` if the following environment variables have their values correctly set:

<InlineEditableCodeBlock
  language="sh"
  template={
  `
  ACCOUNT_PRIVATE_KEY=<PRIVATE_KEY>
  NODE_URL={{NODE_URL}}
  GAS_PRICE={{GAS_PRICE}}  # low | medium | high
  SSV_SYNC={{SSV_SYNC}} # v4.hoodi - is the default
  SSV_SYNC_ENV=prod # prod or stage, prod - is default value
  HIDE_TABLE=false
  MAX_VISIBLE_BLOCKS=50000
  LIQUIDATOR_TYPE=eth # ssv
  `
  }
  variables={{
    SSV_SYNC: 'v4.mainnet',
    NODE_URL: 'https://red-silent-dawn.ethereum-hoodi.quiknode.pro/<ACCOUNT_ID>/',
    GAS_PRICE: 'medium'
  }}
/>

  </TabItem>
</Tabs>

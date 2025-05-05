---
title: BA SDK
sidebar_label: BA SDK
sidebar_position: 3
---

:::warning
The BA SDK is currently undergoing development and is subject to change.
:::


## Overview

The BA SDK is a TypeScript library that allows developers to work with the Based Applications. 

It provides a set of functions for creating and managing based applications by interacting with the [SSVBasedApps](../smart-contracts/SSVBasedApps) smart contract.

The SDK is structured into 3 modules:

- `api`: Functions for obtaining any on-chain data about based applications.
- `utils`: Utility functions such as calculating weights.
- `bam`: Functions for interacting with the SSVBasedApps smart contract.

Each module has a dedicated page in the [Module Reference section](./module-reference/).

## Installation

```bash
npm i @ssv-labs/bapps-sdk
```

### Initialization Parameters

| Input name | Input type | Optional |
|------------|------------|----------|
| beaconchainUrl | string | No |
| public_client | [Viem public client](https://viem.sh/docs/clients/public.html) | No |
| wallet_client | [Viem wallet client](https://viem.sh/docs/clients/wallet) | No |

## Example Usage

The `extendedConfig` parameter in th `BasedAppsSDK` constructor is optional, if not provided, the SDK will use the development endpoint. Bear in mind that this is rate limited, though, so it is strongly advised to use an API key with the free plan.
For more information regarding your subgraph API key, please refer to the [dedicated Subgraph page](../subgraph.md#based-application-subgraph).

```typescript
import { BasedAppsSDK } from "@ssv-labs/bapps-sdk";
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Setup viem clients
const chain = chains.mainnet // or chains.hoodi
const transport = http()

const publicClient = createPublicClient({
  chain,
  transport,
})

const account = privateKeyToAccount('0x...')
const walletClient = createWalletClient({
  account,
  chain,
  transport,
})

const sdk = new BasedAppsSDK({
   beaconchainUrl: 'https://example.com/beacon',
   publicClient,
   walletClient,
   extendedConfig: {
    subgraph: {
      apiKey: "<YOUR_SUBGRAPH_API_KEY>"
    }
  }
 })

async function main(): Promise<void> {

    const obligatedBalances = await sdk.api.getObligatedBalances({
      bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
    });
}

main();
```
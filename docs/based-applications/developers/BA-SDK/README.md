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

It provides a set of functions for creating and managing based applications by interacting with the [BasedAppManager](../smart-contracts/BasedAppManager) smart contract.

The SDK is structured into 3 modules:

- `api`: Functions for obtaining any on-chain data about based applications.
- `utils`: Utility functions such as calculating weights.
- `bam`: Functions for interacting with the BasedAppManager smart contract.

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

```typescript
import { BasedAppsSDK } from "@ssv-labs/bapps-sdk";
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Setup viem clients
const chain = chains.mainnet // or chains.holesky or chains.hoodi
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
 })

async function main(): Promise<void> {

    const obligatedBalances = await sdk.api.getObligatedBalances({
      bAppId: "0x64714cf5db177398729e37627be0fc08f43b17a6",
    });
}

main();
```